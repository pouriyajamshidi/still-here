function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getDate() {
    return new Date().toISOString().slice(0, 10)
}

function clickYes(button) {
    button.click();
    console.log(`${getDate()}: [Still Here] - Successfully got rid of the confirm button`)
}

function youTubeCheckDialog() {
    var confirmButton = document.getElementById('confirm-button')

    if (confirmButton === null) {
        return false;
    }

    clickYes(confirmButton);
    return true;
}

function youTubeMusicCheckDialog() {
    var confirmButton = document.querySelector("body > ytmusic-app > ytmusic-popup-container > tp-yt-paper-dialog > ytmusic-you-there-renderer > div > yt-button-renderer")

    if (confirmButton === null) {
        return false;
    }

    clickYes(confirmButton);
    return true;
}

async function start() {
    let clicked = false;

    while (true) {
        let site = window.location.hostname

        if (site === "www.youtube.com") {
            clicked = youTubeCheckDialog();
        } else if (site === "music.youtube.com") {
            clicked = youTubeMusicCheckDialog();
        }

        if (clicked) {
            clicked = false;
            await sleep(600000);
        } else {
            await sleep(2000);
        }
    }
}

window.onload = start();
