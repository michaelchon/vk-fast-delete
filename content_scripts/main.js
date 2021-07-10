chrome.storage.sync.get(["settings"], (result) => {
    const settings = result.settings;

    document.addEventListener("keydown", (e) => {
        const deleteKeyList = settings.deleteKey.split("|");
        for (deleteKey of deleteKeyList) {
            if (e.code === deleteKey) {
                if (document.querySelector(".im-mess_selected")) {
                    const $deleteButton = document.querySelector(
                        "button.im-page-action_delete"
                    );
                    $deleteButton.click();
                }
                break;
            }
        }
    });
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const $deleteButton = document.querySelectorAll(
            ".box_layout button.flat_button"
        )[1];
        if ($deleteButton) {
            $deleteButton.click();
        }
    }
});
