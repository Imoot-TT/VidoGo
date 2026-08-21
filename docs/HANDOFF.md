# VidoGo Development Handoff

Read this file first when continuing development. The current project is the Electron desktop client only. The management platform and promotional website are separate future web projects and must not be built into this Electron app.

## Current Product Scope

- App name: VidoGo.
- Runtime: Electron desktop shell with a Python `yt-dlp` download worker.
- Reference product: parsed VidBrowser artifacts in the local `legacy_reference/` directory.
- Primary target: match VidBrowser behavior, layout, icons, and interactions page by page.
- Current priority from the user: browser home, tab behavior, webview full-height rendering, media sniffing panel, download page parity, and full interaction testing.

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
- Webview rendering must be full height. Do not rely only on outer DOM dimensions; visually inspect screenshots when changing layout.
- Media candidates are scoped per browser tab, not global.
- The media sniffing panel is visible by default on browser pages and can be closed/reopened.

## Known Issue History

The user reported that after clicking YouTube, the webview content rendered only in the upper part of the page while the bottom showed the app background. Earlier checks only proved the outer `webview` element had full height; that was insufficient. The current fix direction is:

- `.main` is a flex column.
- `.tabbar` is fixed height.
- `.page` must take the remaining flex space with `flex: 1 1 auto; min-height: 0`.
- Active webviews use a VidBrowser-like flow model, not an absolute overlay.
- Active webview resize is scheduled after tab changes, panel changes, load events, and window resize.

Always validate this with a screenshot, not only JSON layout values.

## Git Notes

- The repository currently had no commits when this handoff document was created.
- There was no git remote configured.
- The user provided a GitHub profile URL, not a repository URL: `https://github.com/Imoot-TT`.
- Do not commit `node_modules/`, `dist/`, `build/`, or `legacy_reference/`.

