# VidBrowser Parity Notes

This document records the expected VidoGo behavior derived from the parsed VidBrowser reference.

## Browser Home

VidBrowser home structure uses these concepts:

- `browser-home`
- `browser-home-content`
- `browser-home-brand`
- `browser-home-logo`
- `logo-vid`
- `logo-browser`
- `home-address-input`
- `popular-sites`
- `popular-site-groups`
- `popular-site-group`
- `popular-site-list`
- `popular-site-button`

Home behavior:

- Start at a home/new-tab state with no active webview.
- Search input focuses on home load.
- Pressing Enter in the home search opens a new browser tab.
- Clicking a popular site opens a new browser tab.
- The Home tab remains before browser tabs in the top tab bar.

Current VidoGo still needs additional cleanup to fully match VidBrowser home class names and Element Plus style structure. Do not invent a new visual direction; copy the parsed reference structure and CSS as closely as practical.

## Browser Tabs

VidBrowser model:

- A Home button/tab exists first.
- Browser tabs are created when a URL is opened.
- A new tab action creates/selects a home/new-tab state before navigation.
- Closing the last browser tab returns to the home state.

VidoGo target:

- Preserve this model.
- Avoid preloading YouTube at startup.
- Keep exactly one visible active webview when a browser tab is selected.

## Webview Height

Requirement:

- YouTube and later tabs must render full height, not only report full outer DOM height.

Evidence required:

- Smoke layout must show `viewHeight === stageHeight`.
- Screenshot must show the webview content area occupying the full browser stage.
- When debugging, inspect both host DOM and guest page dimensions.

Important: a pass from `getBoundingClientRect()` alone is not enough if the screenshot still shows half rendering.

## Media Sniffing Panel

VidBrowser model:

- Media panel visible by default on active browser pages.
- Toolbar button toggles the media panel.
- Panel close action hides it.
- Candidates are associated with the active browser tab.
- Recommended/all tabs and resolution filtering are part of the panel interaction.

VidoGo target:

- Do not make media candidates global.
- Refresh/clear should apply to the active tab/webContents where possible.
- Closing the panel should expand the browser webview area.
- Reopening the panel should restore the right-side panel without causing webview height regression.

## Downloads

Current target:

- Match VidBrowser download list page behavior before adding new unrelated features.
- Keep URL import, output directory, quality, playlist, audio-only, start/cancel, status filters, date filters, pagination, retry, remove, open file/folder, and clear-finished interactions covered by tests.

## Future Separate Projects

Do not put these into the Electron desktop app:

- Web management platform for login users and recharge/payment data.
- Promotional website similar to `https://www.vidbrowser.net/`.

Those should be separate web apps that can later be deployed to a server.

