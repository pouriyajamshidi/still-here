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

    return clickYes();
}

function main() {
    while (true) {
        sleep(2000).then(() => { checkDialog(); });
    }
}

window.onload = main();