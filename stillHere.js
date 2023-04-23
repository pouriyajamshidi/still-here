function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getDate() {
    let d = new Date();
    let hours = (d.getHours());
    let minutes = (d.getMinutes());
    let seconds = (d.getSeconds());
    let day = (d.getDate());
    let month = (d.getMonth());
    let year = (d.getFullYear());

    return `${year}-${month}-${day} - ${hours}:${minutes}:${seconds}`;
}

function youTubeCheckDialog() {
    // const confirmButton = document.getElementById('confirm-button')
    // const confirmButton = document.querySelector("ytd-popup-container")

    // const confirmButton = document.querySelector('[aria-label="Yes"]');

    // if (confirmButton === null) {
    //     return false;
    // }

    // confirmButton.click();
    let button = document.querySelector('button.yt-spec-button-shape-next[aria-label="Yes"]');

    if (button) {
        button.click();
        let parent = button.parentNode;
        parent.removeChild(button);
        console.log(`${getDate()}: [Still Here] - Successfully got rid of the confirm button`)
    }

    button = null;

    return true;
}

function youTubeMusicCheckDialog() {
    // const confirmButton = document.querySelector("body > ytmusic-app > ytmusic-popup-container > tp-yt-paper-dialog > ytmusic-you-there-renderer > div > yt-button-renderer")
    // const confirmButton = document.querySelector("ytmusic-popup-container")
    // let confirmButton = document.getElementsByClassName("style-scope yt-button-renderer style-blue-text").button;
    let button = document.getElementsByClassName("text style-scope ytmusic-you-there-renderer");

    if (button === null) {
        return false;
    }

    button.click();

    return true;
}

function changeVisibility() {
    Object.defineProperty(document, 'visibilityState', { value: 'visible', writable: false });
    Object.defineProperty(document, 'hidden', { value: false, writable: false });
    document.dispatchEvent(new Event("visibilitychange"));
}

function changeWindowLastActiveTime() {
    window._lact = Date.now();
}

function hookEventListeners() {
    document.addEventListener("visibilitychange", function () {
        if (document.visibilityState === "hidden") {
            changeVisibility();
        }
    });
}

async function start() {
    hookEventListeners();
    changeVisibility();

    setInterval(changeWindowLastActiveTime, 180000)

    let clicked = false;

    while (true) {
        let site = window.location.hostname;

        if (site === "www.youtube.com") {
            clicked = youTubeCheckDialog();
        } else if (site === "music.youtube.com") {
            clicked = youTubeMusicCheckDialog();
        }

        if (clicked) {
            clicked = false;
            await sleep(60000);
        } else {
            await sleep(1000);
            changeVisibility();
        }
    }
}

window.onload = start();
