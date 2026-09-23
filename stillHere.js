// Still Here - keeps YouTube and YouTube Music playing by answering the
// "Video paused. Continue watching?" dialog and by never letting the page
// look idle in the first place.
//
// This script runs in the page's own JavaScript world (see "world" in
// manifest.json), which is what makes the overrides below visible to
// YouTube's own code.

const ACTIVITY_INTERVAL_MS = 60000;
const SAFETY_SCAN_MS = 5000;

function log(message) {
    console.log(`${new Date().toLocaleString()}: [Still Here] - ${message}`);
}

function isVisible(element) {
    return element !== null && element.getClientRects().length > 0;
}

// The "Video paused. Continue watching?" dialog is the only confirm dialog on
// YouTube that has no cancel button, so we recognize it by its shape instead
// of by its text or its CSS classes: the text is translated and the classes
// get renamed every few months.
function findYouTubeButton() {
    for (const dialog of document.querySelectorAll('yt-confirm-dialog-renderer')) {
        if (!isVisible(dialog) || isVisible(dialog.querySelector('#cancel-button'))) {
            continue;
        }

        const button = dialog.querySelector('#confirm-button button');

        if (isVisible(button)) {
            return button;
        }
    }

    return null;
}

// YouTube Music gives the dialog an element of its own, so finding it is easy.
function findYouTubeMusicButton() {
    for (const dialog of document.querySelectorAll('ytmusic-you-there-renderer')) {
        const button = dialog.querySelector('button');

        if (isVisible(button)) {
            return button;
        }
    }

    return null;
}

function dismissDialog() {
    const button = findYouTubeButton() || findYouTubeMusicButton();

    if (button === null) {
        return;
    }

    button.click();
    log('dismissed the "Continue watching?" dialog');
}

// YouTube decides that you left by looking at document.visibilityState and at
// window._lact, the time of your last mouse or keyboard activity.
function stayVisible() {
    Object.defineProperty(document, 'visibilityState', { get: () => 'visible', configurable: true });
    Object.defineProperty(document, 'hidden', { get: () => false, configurable: true });

    for (const event of ['visibilitychange', 'webkitvisibilitychange']) {
        document.addEventListener(event, (e) => e.stopImmediatePropagation(), true);
    }
}

function stayActive() {
    window._lact = Date.now();
}

// The dialog can show up at any time, so watch for it instead of polling hard.
// The interval is only a safety net for the cases where an existing, hidden
// dialog is simply shown again.
function watchForDialog() {
    let pending = false;

    const check = () => {
        if (pending) {
            return;
        }

        pending = true;

        setTimeout(() => {
            pending = false;
            dismissDialog();
        }, 200);
    };

    new MutationObserver(check).observe(document, { childList: true, subtree: true });
    setInterval(check, SAFETY_SCAN_MS);
}

stayVisible();
stayActive();
setInterval(stayActive, ACTIVITY_INTERVAL_MS);
watchForDialog();
// Embedded players get the same treatment, but only the main page says so.
if (window.top === window) {
    log('watching for the "Continue watching?" dialog');
}
