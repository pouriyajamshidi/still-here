function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function clickYes() {
    document.getElementById('confirm-button').click();
    console.log(`[Still Here] Successfully got rid of the confirm button at ${Date.now()}`)
}

function checkDialog() {
    let confirmButton = document.getElementById('confirm-button')

    if (confirmButton === null) {
        return false;
    }

    clickYes();
    return true;
}

async function start() {
    let clicked = false;

    while (true) {
        await sleep(2000);
        clicked = checkDialog();

        if (clicked) {
            await sleep(600000);
            clicked = false;
        }
    }
}

window.onload = start;