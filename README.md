# Still Here

<img src="icons/icon128.png" alt="Still Here" width="96" align="right">

This extension gets rid of the annoying YouTube and YouTube Music `Video paused. Continue watching?` dialog box, so your playlists keep playing.

## How it works

Two things, both running in the page itself:

- **It answers the dialog.** The dialog is found by its shape rather than by its text or its CSS classes — on YouTube it is the only confirm dialog with no cancel button, and on YouTube Music it has an element of its own. YouTube renames its classes and translates its text regularly, so matching on either is what used to break this extension.
- **It keeps the page from looking idle.** YouTube decides you left by looking at the page's visibility and at the time of your last mouse or keyboard activity, so both are kept fresh.

## Install

- [Mozilla Firefox](https://addons.mozilla.org/en-US/firefox/addon/youtube-still-here/) — requires Firefox 128 or newer
- [Microsoft Edge](https://microsoftedge.microsoft.com/addons/detail/youtube-still-here/pkfgkcldniiineoelnemkcieglbcikbk)
- [Opera](https://addons.opera.com/en/extensions/details/youtube-still-here/)
- [Google Chrome](https://chrome.google.com/webstore/detail/youtube-still-here/kplemiekakilaiiciopjlgcdklpfcmii?hl=en) — removed by Google in 2023 after the whole adblock fiasco

Or clone this repository, head to your browser's extension settings, enable developer mode, click on `Load unpacked` and select the directory containing this repository.

## Troubleshooting

The extension is silent by default apart from one line. Open the console on a YouTube tab (F12) and you should see:

```
[Still Here] - watching for the "Continue watching?" dialog
```

Every time it answers the dialog for you, it logs that too. If you see the first line but the dialog still interrupts you, please [open an issue](https://github.com/pouriyajamshidi/still-here/issues) with the dialog's HTML — YouTube changes its markup often, and that is exactly what is needed to fix it.

## Sponsor me

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/pouriyajamshidi)  
[![sponsor](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/pouriyajamshidi)  
![GitHub Sponsor](https://img.shields.io/github/sponsors/pouriyajamshidi?label=Sponsor&logo=GitHub)
