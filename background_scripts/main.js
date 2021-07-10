const DEFAULT_SETTINGS = {
    deleteKey: "Delete",
};

const setDefaultSettings = () => {
    chrome.storage.sync.set({
        settings: DEFAULT_SETTINGS,
    });
};

chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === "install") {
        setDefaultSettings();
    }
});

chrome.runtime.onMessage.addListener((message) => {
    if (message.resetSettings === true) {
        setDefaultSettings();
    }
});
