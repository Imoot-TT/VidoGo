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

Current VidoGo home now exposes the VidBrowser class structure above while preserving VidoGo IDs for existing logic and tests. Do not invent a new visual direction; continue copying the parsed reference structure and CSS as closely as practical.

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
- The user-reported problem is height, not width. Screenshots must be checked for bottom-half blank/background areas after the page has actually loaded.

Evidence required:

- Smoke layout must show `viewHeight === stageHeight`.
- Screenshot must show the webview content area occupying the full browser stage.
- When debugging, inspect both host DOM and guest page dimensions.
- For YouTube specifically, wait until the guest page reports loaded content before screenshotting. The targeted smoke test records guest `innerHeight`, `clientHeight`, and `ytd-app` rect height.

Important: a pass from `getBoundingClientRect()` alone is not enough if the screenshot still shows half rendering.

## Media Sniffing Panel

VidBrowser model:

- Media panel visible by default on active browser pages.
- Toolbar button toggles the media panel.
- Panel close action hides it.
- Candidates are associated with the active browser tab.
- Recommended/all tabs and resolution filtering are part of the panel interaction.
- Header action icons are refresh, clear/delete, and close.
- Browser toolbar icons around the address bar should follow VidBrowser: back, forward, refresh, favorites popover, and media panel toggle. Do not add unrelated toolbar buttons.

VidoGo target:

- Do not make media candidates global.
- Refresh/clear should apply to the active tab/webContents where possible.
- Closing the panel should expand the browser webview area.
- Reopening the panel should restore the right-side panel without causing webview height regression.
- Use the VidBrowser panel/list structure: `media-panel generic-media-panel`, `media-count`, `media-resolution-filter`, `sniffer-resource-list`, and `sniffer-resource-row`.
- Resource rows should expose title, kind/format/resolution metadata, size, copy action, and download action in the panel itself.

Remaining deeper parity work:

- Port dedicated provider strategies and candidate enrichment from the parsed VidBrowser media code.
- Add variant expansion for multi-resolution candidates once the worker/main process supplies variant metadata.

## YouTube Watch Page

Observed VidBrowser behavior:

- Clicking YouTube from the home page opens a browser tab after Home.
- Opening a specific YouTube video keeps YouTube's own watch-page layout inside the webview, including YouTube's native right-side recommendation column.
- VidBrowser adds its own media sniffer panel outside the webview on the far right. That panel does not replace YouTube's recommendation column.
- The panel's recommended resource is the actual video item, with thumbnail/title and selectable variants such as resolution/codec rows.
- Raw network resources can exist, but they should not dominate the recommended tab when a real video candidate is available.

VidoGo target:

- Preserve the webview's full-height YouTube page.
- Keep the app-side sniffer panel fixed to the right of the webview.
- Enrich YouTube watch pages with a normalized video candidate, ideally from `yt-dlp` metadata plus exported browser cookies.
- Render variant rows and split download controls in the same visual hierarchy as VidBrowser.
- Test copy, download, split expansion, refresh, clear, close, tab switching, and panel reopen behavior.

## Downloads

Current target:

- Match VidBrowser download list page behavior before adding new unrelated features.
- Keep URL import, output directory, quality, playlist, audio-only, start/cancel, status filters, date filters, pagination, retry, remove, open file/folder, and clear-finished interactions covered by tests.
- Empty downloads should show the VidBrowser-style empty state and should not render a table header.
- Table headers should render only when rows exist.
- Missing completed files should show a missing-file state and should not offer an open-file action.

## Future Separate Projects

Do not put these into the Electron desktop app:

- Web management platform for login users and recharge/payment data.
- Promotional website similar to `https://www.vidbrowser.net/`.

Those should be separate web apps that can later be deployed to a server.

When future work starts, create those as separate web projects/repositories or separate top-level app directories, not as Electron pages inside VidoGo.
