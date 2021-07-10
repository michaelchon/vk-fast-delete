var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BulmaClasses = function BulmaClasses() {
    _classCallCheck(this, BulmaClasses);
};

BulmaClasses.active = "is-active";

var KeySelect = function (_React$Component) {
    _inherits(KeySelect, _React$Component);

    function KeySelect(props) {
        _classCallCheck(this, KeySelect);

        return _possibleConstructorReturn(this, (KeySelect.__proto__ || Object.getPrototypeOf(KeySelect)).call(this, props));
    }

    _createClass(KeySelect, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "select" },
                React.createElement(
                    "select",
                    {
                        name: this.props.name,
                        value: this.props.value,
                        onChange: this.props.onChange
                    },
                    React.createElement(
                        "option",
                        { value: "Delete" },
                        "Delete (Del)"
                    ),
                    React.createElement(
                        "option",
                        { value: "Backspace" },
                        "Backspace (\u2190)"
                    ),
                    React.createElement(
                        "option",
                        { value: "Minus|NumpadSubtract" },
                        "Subtract (-)"
                    )
                )
            );
        }
    }]);

    return KeySelect;
}(React.Component);

var Settings = function (_React$Component2) {
    _inherits(Settings, _React$Component2);

    function Settings(props) {
        _classCallCheck(this, Settings);

        var _this2 = _possibleConstructorReturn(this, (Settings.__proto__ || Object.getPrototypeOf(Settings)).call(this, props));

        _this2.state = {
            isDataReady: false
        };

        _this2.loadData = _this2.loadData.bind(_this2);
        _this2.handleChange = _this2.handleChange.bind(_this2);
        _this2.handleSubmit = _this2.handleSubmit.bind(_this2);
        _this2.confirmReset = _this2.confirmReset.bind(_this2);
        _this2.handleReset = _this2.handleReset.bind(_this2);
        return _this2;
    }

    _createClass(Settings, [{
        key: "loadData",
        value: function loadData() {
            var _this3 = this;

            chrome.storage.sync.get(["settings"], function (result) {
                console.log(result.settings);
                _this3.setState(Object.assign(result.settings, { isDataReady: true }));
            });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.loadData();
        }
    }, {
        key: "handleChange",
        value: function handleChange(event) {
            var target = event.target;
            var value = target.type === "checkbox" ? target.checked : target.value;
            var name = target.name;

            this.setState(_defineProperty({}, name, value));
        }
    }, {
        key: "handleSubmit",
        value: function handleSubmit(event) {
            chrome.storage.sync.set({
                settings: {
                    deleteKey: this.state.deleteKey
                }
            });

            this.props.setStateProperty("alertMessage", "All changes saved.");
            this.props.setStateProperty("isAlertModalActive", true);

            event.preventDefault();
        }
    }, {
        key: "confirmReset",
        value: function confirmReset(event) {
            this.props.setStateProperty("confirmCallback", this.handleReset);
            this.props.setStateProperty("isConfirmModalActive", true);

            event.preventDefault();
        }
    }, {
        key: "handleReset",
        value: function handleReset() {
            var _this4 = this;

            chrome.runtime.sendMessage({ resetSettings: true });
            setTimeout(function () {
                _this4.loadData();
            }, 100);
        }
    }, {
        key: "render",
        value: function render() {
            if (!this.state.isDataReady) {
                return React.createElement("div", null);
            }

            return React.createElement(
                "div",
                { className: "settings" },
                React.createElement(
                    "form",
                    { onSubmit: this.handleSubmit },
                    React.createElement(
                        "div",
                        { className: "field mb-6" },
                        React.createElement(
                            "label",
                            { className: "label" },
                            "Delete Key"
                        ),
                        React.createElement(
                            "div",
                            { className: "control" },
                            React.createElement(KeySelect, {
                                name: "deleteKey",
                                value: this.state.deleteKey,
                                onChange: this.handleChange
                            })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "field is-grouped" },
                        React.createElement(
                            "div",
                            { className: "control" },
                            React.createElement(
                                "button",
                                {
                                    className: "button is-link is-light",
                                    type: "submit"
                                },
                                "Save Changes"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "control" },
                            React.createElement(
                                "button",
                                {
                                    className: "button is-light",
                                    onClick: this.confirmReset
                                },
                                "Reset To Default"
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Settings;
}(React.Component);

var Title = function (_React$Component3) {
    _inherits(Title, _React$Component3);

    function Title() {
        _classCallCheck(this, Title);

        return _possibleConstructorReturn(this, (Title.__proto__ || Object.getPrototypeOf(Title)).apply(this, arguments));
    }

    _createClass(Title, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "page-title mb-6" },
                React.createElement(
                    "h1",
                    { className: "title has-text-centered" },
                    "VK Fast Delete"
                )
            );
        }
    }]);

    return Title;
}(React.Component);

var ConfirmModal = function (_React$Component4) {
    _inherits(ConfirmModal, _React$Component4);

    function ConfirmModal(props) {
        _classCallCheck(this, ConfirmModal);

        var _this6 = _possibleConstructorReturn(this, (ConfirmModal.__proto__ || Object.getPrototypeOf(ConfirmModal)).call(this, props));

        _this6.close = _this6.close.bind(_this6);
        _this6.handleYes = _this6.handleYes.bind(_this6);
        return _this6;
    }

    _createClass(ConfirmModal, [{
        key: "close",
        value: function close(event) {
            this.props.setStateProperty("isConfirmModalActive", false);

            event.preventDefault();
        }
    }, {
        key: "handleYes",
        value: function handleYes() {
            this.props.confirmCallback();
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                {
                    className: "confirm modal " + (this.props.isConfirmModalActive ? BulmaClasses.active : "")
                },
                React.createElement("div", { className: "modal-background", onClick: this.close }),
                React.createElement(
                    "div",
                    { className: "modal-content" },
                    React.createElement(
                        "div",
                        { className: "box" },
                        React.createElement(
                            "div",
                            { className: "mb-4" },
                            "Are you sure you want to perform this action?"
                        ),
                        React.createElement(
                            "form",
                            { onSubmit: this.close },
                            React.createElement(
                                "div",
                                { className: "field is-grouped is-grouped-right" },
                                React.createElement(
                                    "div",
                                    { className: "control" },
                                    React.createElement(
                                        "button",
                                        { className: "button is-danger is-light" },
                                        "No"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "control" },
                                    React.createElement(
                                        "button",
                                        {
                                            className: "button is-success is-light",
                                            onClick: this.handleYes
                                        },
                                        "Yes"
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return ConfirmModal;
}(React.Component);

var AlertModal = function (_React$Component5) {
    _inherits(AlertModal, _React$Component5);

    function AlertModal(props) {
        _classCallCheck(this, AlertModal);

        var _this7 = _possibleConstructorReturn(this, (AlertModal.__proto__ || Object.getPrototypeOf(AlertModal)).call(this, props));

        _this7.close = _this7.close.bind(_this7);
        return _this7;
    }

    _createClass(AlertModal, [{
        key: "close",
        value: function close(event) {
            this.props.setStateProperty("isAlertModalActive", false);

            event.preventDefault();
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                {
                    className: "alert modal " + (this.props.isAlertModalActive ? BulmaClasses.active : "")
                },
                React.createElement("div", { className: "modal-background", onClick: this.close }),
                React.createElement(
                    "div",
                    { className: "modal-content" },
                    React.createElement(
                        "div",
                        { className: "box pb-6" },
                        React.createElement(
                            "div",
                            { className: "mb-4" },
                            this.props.alertMessage
                        ),
                        React.createElement(
                            "form",
                            { onSubmit: this.close },
                            React.createElement(
                                "div",
                                { className: "field is-pulled-right" },
                                React.createElement(
                                    "div",
                                    { className: "control " },
                                    React.createElement(
                                        "button",
                                        {
                                            className: "button is-light",
                                            type: "submit"
                                        },
                                        "OK"
                                    )
                                )
                            )
                        )
                    )
                ),
                React.createElement("button", {
                    className: "modal-close is-large",
                    onClick: this.close
                })
            );
        }
    }]);

    return AlertModal;
}(React.Component);

var App = function (_React$Component6) {
    _inherits(App, _React$Component6);

    function App(props) {
        _classCallCheck(this, App);

        var _this8 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this8.state = {
            isAlertModalActive: false,
            alertMessage: "",
            isConfirmModalActive: false,
            confirmCallback: function confirmCallback() {
                // pass
            }
        };

        _this8.setStateProperty = _this8.setStateProperty.bind(_this8);
        return _this8;
    }

    _createClass(App, [{
        key: "setStateProperty",
        value: function setStateProperty(name, value) {
            this.setState(_defineProperty({}, name, value));
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "section",
                { className: "section" },
                React.createElement(
                    "div",
                    { className: "container" },
                    React.createElement(AlertModal, {
                        isAlertModalActive: this.state.isAlertModalActive,
                        alertMessage: this.state.alertMessage,
                        setStateProperty: this.setStateProperty
                    }),
                    React.createElement(ConfirmModal, {
                        isConfirmModalActive: this.state.isConfirmModalActive,
                        confirmCallback: this.state.confirmCallback,
                        setStateProperty: this.setStateProperty
                    }),
                    React.createElement(Title, null),
                    React.createElement(Settings, { setStateProperty: this.setStateProperty })
                )
            );
        }
    }]);

    return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));