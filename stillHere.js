function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getDate() {
    var d = new Date();
    var hours = (d.getHours());
    var minutes = (d.getMinutes());
    var seconds = (d.getSeconds());
    var day = (d.getDate());
    var month = (d.getMonth());
    var year = (d.getFullYear());

    return `${year}-${month}-${day} - ${hours}:${minutes}:${seconds}`;
}

function clickYes(button) {
    button.click();
    console.log(`${getDate()}: [Still Here] - Successfully got rid of the confirm button`)
}

function youTubeCheckDialog() {
    const confirmButton = document.getElementById('confirm-button')

    if (confirmButton === null) {
        return false;
    }

    clickYes(confirmButton);
    return true;
}

function youTubeMusicCheckDialog() {
    const confirmButton = document.querySelector("body > ytmusic-app > ytmusic-popup-container > tp-yt-paper-dialog > ytmusic-you-there-renderer > div > yt-button-renderer")

    if (confirmButton === null) {
        return false;
    }

    clickYes(confirmButton);
    return true;
}

function changeVisibility() {
    Object.defineProperty(document, 'visibilityState', { value: 'visible', writable: false });
    Object.defineProperty(document, 'hidden', { value: false, writable: false });
    document.dispatchEvent(new Event("visibilitychange"));
}

async function start() {
    var clicked = false;

    while (true) {
        var site = window.location.hostname
        changeVisibility();

        if (site === "www.youtube.com") {
            clicked = youTubeCheckDialog();
        } else if (site === "music.youtube.com") {
            clicked = youTubeMusicCheckDialog();
        }

        if (clicked) {
            clicked = false;
            await sleep(600000);
        } else {
            await sleep(1000);
        }
    }
}

window.onload = start();
