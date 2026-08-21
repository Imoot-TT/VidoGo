# VidoGo Development Handoff

Read this file first when continuing development. The current project is the Electron desktop client only. The management platform and promotional website are separate future web projects and must not be built into this Electron app.

## Current Product Scope

- App name: VidoGo.
- Runtime: Electron desktop shell with a Python `yt-dlp` download worker.
- Reference product: parsed VidBrowser artifacts in the local `legacy_reference/` directory.
- Primary target: match VidBrowser behavior, layout, icons, and interactions page by page.
- Current priority from the user: browser home, tab behavior, webview full-height rendering, media sniffing panel, download page parity, and full interaction testing.
- Current explicit user constraint: do not guess at VidBrowser behavior. Inspect VidBrowser itself and/or the parsed reference before changing layout, icons, or interactions.
- Settings can remain as VidoGo-specific unless it blocks tests. All other visible desktop pages should converge toward VidBrowser.

## Important Local Reference Files

These files are intentionally ignored by git because they are extracted reference/build artifacts, but they are the authoritative local reference when available:

- `legacy_reference/out/renderer/assets/index-gYpwNu8G.js`
- `legacy_reference/out/renderer/assets/index-Cyk2skq-.css`
- `legacy_reference/out/preload/webview.js`
- `legacy_reference/out/main/index.js`

Key VidBrowser areas already inspected:

- Browser home component: `index-gYpwNu8G.js` around `70474`.
- Tab bar and empty home tab model: `index-gYpwNu8G.js` around `71920` and `72350`.
- Webview stack: `index-gYpwNu8G.js` around `71998`.
- Browser shell and media panel wiring: `index-gYpwNu8G.js` around `78321`.
- Browser/home CSS: `index-Cyk2skq-.css` around `432`.
- Webview and media panel CSS: `index-Cyk2skq-.css` around `1183`.

## Current Implementation Map

- Main process: `src/main.js`
- Preload bridge: `src/preload.js`
- Webview preload helpers: `src/webview-preload.js`
- Renderer HTML: `src/renderer/index.html`
- Renderer logic: `src/renderer/app.js`
- Renderer styles: `src/renderer/style.css`
- Download worker: `backend/download_worker.py`
- Download core: `backend/downloader_core.py`
- Smoke runner: `tests/run_electron_smoke.js`
- Renderer static verifier: `tests/verify_renderer_assets.js`
- Backend verifier: `tests/verify_backend.py`

## Current Browser Decisions

- Empty browser state should show the home page first, like VidBrowser.
- Clicking a home shortcut such as YouTube should keep the Home tab at the front and open a browser tab after it.
- The app defaults to dark mode so webview-height regressions are easier to see in screenshots.
- Webview rendering must be full height. Do not rely only on outer DOM dimensions; visually inspect screenshots when changing layout.
- Media candidates are scoped per browser tab, not global.
- The media sniffing panel is visible by default on browser pages and can be closed/reopened.
- VidBrowser keeps YouTube's native page layout inside the webview. On a YouTube watch page, YouTube's own right-side recommendation column remains inside the webview; VidBrowser's media sniffer is an additional app-side panel outside that webview.
- Do not solve the YouTube video page by hiding or replacing YouTube's native recommendations. Match VidBrowser's outer shell and sniffer panel behavior instead.

## Known Issue History

The user reported that after clicking YouTube, the webview content rendered only in the upper part of the page while the bottom showed the app background. Earlier checks only proved the outer `webview` element had full height; that was insufficient. The current fix direction is:

- `.main` is a flex column.
- `.tabbar` is fixed height.
- `.page` must take the remaining flex space with `flex: 1 1 auto; min-height: 0`.
- Active webviews use a VidBrowser-like flow model, not an absolute overlay.
- Active webview resize is scheduled after tab changes, panel changes, load events, and window resize.

Always validate this with a screenshot, not only JSON layout values.

Latest verified evidence:

- `npm.cmd run smoke` passed with `viewHeight === stageHeight === 790`, `sideWidth === 300`, and media panel height `790`.
- Targeted YouTube flow passed with Home first, YouTube second, active webview `1176x790`, and media panel `300x790`.
- The YouTube guest page reported `innerHeight === 790`, `clientHeight === 790`, and `ytd-app.height === 790`.
- Dark screenshot copied to `C:\Users\admin\AppData\Local\Temp\vidogo-youtube-flow-vidbrowser-structure-dark.png`.

## Current Browser Home Status

The home page now carries the VidBrowser reference structure/class names while keeping existing VidoGo IDs for logic:

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

Tests now require these tokens and verify all 15 popular site icons render under `.browser-home .popular-site-button`.

## Current Browser Media Panel Status

The browser page now uses the VidBrowser media sniffer structure instead of the older VidoGo summary card:

- `media-panel generic-media-panel`
- `media-count`
- `media-resolution-filter`
- `media-resolution-select`
- `sniffer-resource-list`
- `sniffer-resource-row`
- `sniffer-resource-main`
- `sniffer-resource-thumbnail`
- `sniffer-resource-content`
- `sniffer-resource-title`
- `sniffer-resource-meta`
- `sniffer-resource-footer`
- `sniffer-resource-size`
- `sniffer-resource-download-actions`
- `sniffer-resource-download`

The current implementation still uses VidoGo's existing network-resource sniffing and download worker. Dedicated VidBrowser provider strategies and full candidate enrichment should be implemented later from `legacy_reference/out/renderer/assets/index-gYpwNu8G.js` around the media candidate handling area.

Additional YouTube video-page target from user screenshots:

- On `youtube.com/watch`, the recommended media candidate should be the actual video, with thumbnail/title and resolution/codec variants similar to VidBrowser, not random audio/network fragments.
- Candidate rows should match VidBrowser's right-panel buttons/icons: copy, download, split/variant expansion, header refresh, clear, and close.
- A proposed implementation path is to enrich the active page using `yt-dlp` metadata and prepend a normalized `yt-dlp` candidate before raw sniffed network resources.
- This WIP should not be committed as product-complete until `npm.cmd run check`, `npm.cmd run check:backend`, `npm.cmd run smoke`, and the targeted YouTube smoke pass.

## Current Worktree Warning

As of this handoff update, there are uncommitted browser/media-panel WIP edits in:

- `src/main.js`
- `src/preload.js`
- `src/renderer/app.js`
- `src/renderer/index.html`
- `src/renderer/style.css`

Before committing those code changes, first run `npm.cmd run check`. The renderer file has previously shown a syntax failure around localized quality strings, so do not assume the current WIP can launch until syntax checks pass.

## Git Notes

- GitHub repository: `https://github.com/Imoot-TT/VidoGo`.
- Local default branch: `main`.
- Remote: `origin https://github.com/Imoot-TT/VidoGo.git`.
- The user provided a GitHub profile URL, not a repository URL: `https://github.com/Imoot-TT`.
- Do not commit `node_modules/`, `dist/`, `build/`, or `legacy_reference/`.
- Do not commit unrelated untracked files such as temporary icon extractions or unrelated markdown drafts.
