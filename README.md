# VidoGo

VidoGo is a rebuilt Electron desktop shell with an embedded browser and a Python download worker.

## What This Rebuild Changes

- Uses a dedicated `VidoGo Runtime\\rebuild-v1` profile instead of the old VidBrowser browser data.
- Uses its own persistent browser partition for login state reuse during downloads.
- Recreates the main VidBrowser-style workspace: home shortcuts, browser tabs, media side panel, downloads, history, favorites, plans, account, theme, and language controls.
- Adds local browser enhancements for popup routing, preferred language headers, basic ad/tracker blocking, cosmetic ad hiding, YouTube ad-skip assistance, and media resource sniffing.
- Exposes a session reset action in the UI so browser login state can be cleared explicitly.
- Keeps download settings and records locally, including output directory, resolution, playlist mode, audio-only mode, progress, status, file/folder actions, and clear-finished controls.
- Does not connect to any legacy VidBrowser membership or billing endpoint.

## Run

Install dependencies:

```powershell
npm install
python -m pip install -r requirements.txt
```

Start the desktop app:

```powershell
npm start
```

## Download Worker

The Electron UI launches [`backend/download_worker.py`](C:/Users/admin/Documents/New%20project%204/backend/download_worker.py), which uses `yt-dlp` for downloads and can reuse cookies exported from the embedded browser session.

## Notes

- 4K downloads usually require `ffmpeg` so separate audio/video streams can be merged.
- Browser login state is stored only in the new `VidoGo Runtime\\rebuild-v1` profile.
- Old unpacked VidBrowser artifacts in this workspace are reference material only and are not the current runtime entrypoint.

## Development Handoff

Before continuing feature work, read:

- [`docs/HANDOFF.md`](docs/HANDOFF.md)
- [`docs/VIDBROWSER_PARITY.md`](docs/VIDBROWSER_PARITY.md)
- [`docs/TESTING.md`](docs/TESTING.md)
