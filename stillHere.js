const nixLog = "/tmp/stillHere.log"
const winLog = ""

function detectOS() {
    let currentOS = { isWin: false, isNix: false };
    const OS = navigator.appVersion;

    if (OS.indexOf("Win") != -1) currentOS.isWin = true;
    else currentOS.isNix = true;

    return currentOS;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function clickYes() {
    document.getElementById('confirm-button').click();
    console.log("Successfully clicked confirm button")
}

function checkDialog() {
    let confirmButton = document.getElementById('confirm-button')

    if (confirmButton === null) {
        console.log("No dialog box detected")
        return false;
    }

    clickYes();
}

async function start() {
    while (true) {
        await sleep(2000);
        checkDialog();
    }
}

window.onload = start;