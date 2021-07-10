class BulmaClasses {
    static active = "is-active";
}

class KeySelect extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="select">
                <select
                    name={this.props.name}
                    value={this.props.value}
                    onChange={this.props.onChange}
                >
                    <option value="Delete">Delete (Del)</option>
                    <option value="Backspace">Backspace (←)</option>
                    <option value="Minus|NumpadSubtract">Subtract (-)</option>
                </select>
            </div>
        );
    }
}

class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDataReady: false,
        };

        this.loadData = this.loadData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.confirmReset = this.confirmReset.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    loadData() {
        chrome.storage.sync.get(["settings"], (result) => {
            this.setState(
                Object.assign(result.settings, { isDataReady: true })
            );
        });
    }

    componentDidMount() {
        this.loadData();
    }

    handleChange(event) {
        const target = event.target;
        const value =
            target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    handleSubmit(event) {
        chrome.storage.sync.set({
            settings: {
                deleteKey: this.state.deleteKey,
            },
        });

        this.props.setStateProperty("alertMessage", "All changes saved.");
        this.props.setStateProperty("isAlertModalActive", true);

        event.preventDefault();
    }

    confirmReset(event) {
        this.props.setStateProperty("confirmCallback", this.handleReset);
        this.props.setStateProperty("isConfirmModalActive", true);

        event.preventDefault();
    }

    handleReset() {
        chrome.runtime.sendMessage({ resetSettings: true });
        setTimeout(() => {
            this.loadData();
        }, 100);
    }

    render() {
        if (!this.state.isDataReady) {
            return <div></div>;
        }

        return (
            <div className="settings">
                <form onSubmit={this.handleSubmit}>
                    <div className="field mb-6">
                        <label className="label">Delete Key</label>
                        <div className="control">
                            <KeySelect
                                name="deleteKey"
                                value={this.state.deleteKey}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>

                    <div className="field is-grouped">
                        <div className="control">
                            <button
                                className="button is-link is-light"
                                type="submit"
                            >
                                Save Changes
                            </button>
                        </div>
                        <div className="control">
                            <button
                                className="button is-light"
                                onClick={this.confirmReset}
                            >
                                Reset To Default
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

class Title extends React.Component {
    render() {
        return (
            <div className="page-title mb-6">
                <h1 className="title has-text-centered">VK Fast Delete</h1>
            </div>
        );
    }
}

class ConfirmModal extends React.Component {
    constructor(props) {
        super(props);

        this.close = this.close.bind(this);
        this.handleYes = this.handleYes.bind(this);
    }

    close(event) {
        this.props.setStateProperty("isConfirmModalActive", false);

        event.preventDefault();
    }

    handleYes() {
        this.props.confirmCallback();
    }

    render() {
        return (
            <div
                className={
                    "confirm modal " +
                    (this.props.isConfirmModalActive ? BulmaClasses.active : "")
                }
            >
                <div className="modal-background" onClick={this.close}></div>
                <div className="modal-content">
                    <div className="box">
                        <div className="mb-4">
                            Are you sure you want to perform this action?
                        </div>
                        <form onSubmit={this.close}>
                            <div className="field is-grouped is-grouped-right">
                                <div className="control">
                                    <button className="button is-danger is-light">
                                        No
                                    </button>
                                </div>
                                <div className="control">
                                    <button
                                        className="button is-success is-light"
                                        onClick={this.handleYes}
                                    >
                                        Yes
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

class AlertModal extends React.Component {
    constructor(props) {
        super(props);

        this.close = this.close.bind(this);
    }

    close(event) {
        this.props.setStateProperty("isAlertModalActive", false);

        event.preventDefault();
    }

    render() {
        return (
            <div
                className={
                    "alert modal " +
                    (this.props.isAlertModalActive ? BulmaClasses.active : "")
                }
            >
                <div className="modal-background" onClick={this.close}></div>
                <div className="modal-content">
                    <div className="box pb-6">
                        <div className="mb-4">{this.props.alertMessage}</div>
                        <form onSubmit={this.close}>
                            <div className="field is-pulled-right">
                                <div className="control ">
                                    <button
                                        className="button is-light"
                                        type="submit"
                                    >
                                        OK
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <button
                    className="modal-close is-large"
                    onClick={this.close}
                ></button>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isAlertModalActive: false,
            alertMessage: "",
            isConfirmModalActive: false,
            confirmCallback: () => {
                // pass
            },
        };

        this.setStateProperty = this.setStateProperty.bind(this);
    }

    setStateProperty(name, value) {
        this.setState({
            [name]: value,
        });
    }

    render() {
        return (
            <section className="section">
                <div className="container">
                    <AlertModal
                        isAlertModalActive={this.state.isAlertModalActive}
                        alertMessage={this.state.alertMessage}
                        setStateProperty={this.setStateProperty}
                    />

                    <ConfirmModal
                        isConfirmModalActive={this.state.isConfirmModalActive}
                        confirmCallback={this.state.confirmCallback}
                        setStateProperty={this.setStateProperty}
                    />

                    <Title />

                    <Settings setStateProperty={this.setStateProperty} />
                </div>
            </section>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
