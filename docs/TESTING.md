# VidoGo Testing

Use PowerShell on Windows. Use `npm.cmd`, not bare `npm`, because PowerShell script policy can block `npm`.

## Required Checks

```powershell
npm.cmd run check
npm.cmd run check:backend
npm.cmd run smoke
```

Do not commit browser/media-panel code changes unless these checks pass. If the user asks only to record documentation, stage and commit the documentation separately from unstable source WIP.

## Browser YouTube Flow

Use this targeted smoke scenario when validating the user-reported YouTube half-height problem:

```powershell
$env:ELECTRON_SMOKE_SCENARIO='browser-youtube-flow'
$env:ELECTRON_SMOKE_FINAL_SECTION='browser'
npm.cmd run smoke
Copy-Item "$env:TEMP\vidogo-smoke-home.png" "$env:TEMP\vidogo-youtube-flow.png" -Force
Remove-Item Env:\ELECTRON_SMOKE_SCENARIO
Remove-Item Env:\ELECTRON_SMOKE_FINAL_SECTION
```

Then visually inspect:

```text
C:\Users\admin\AppData\Local\Temp\vidogo-youtube-flow.png
```

For the dark-mode inspection used to verify the reported half-height issue, keep a named copy:

```powershell
Copy-Item "$env:TEMP\vidogo-smoke-home.png" "$env:TEMP\vidogo-youtube-flow-vidbrowser-structure-dark.png" -Force
```

The screenshot must show:

- Top tab bar with Home first and YouTube after it.
- Browser toolbar visible.
- YouTube content/webview occupying the full browser stage height.
- On a YouTube watch page, YouTube's native recommendation column should remain inside the webview.
- Right media sniffing panel full height.
- The targeted flow waits for YouTube guest content before taking the screenshot; do not accept an early blank-page screenshot as visual proof.
- The targeted flow forces both the VidoGo shell and YouTube guest page into dark rendering before screenshot capture.

The current passing target is not just visual: the smoke JSON must report `viewHeight === stageHeight`, no inline webview sizing, and `mediaPanelHeight === stageHeight`.

## Smoke Coverage

The renderer smoke test currently exercises:

- Window buttons.
- Sidebar navigation.
- Empty browser/home state.
- Home search.
- Home YouTube shortcut.
- Media panel close/reopen.
- Theme and language switches.
- Browser tab add/switch/close.
- Browser favorite/favorites popover and media panel toggle.
- Media refresh, clear, recommended/all tabs.
- Download start/cancel, filters, ranges, pagination, open file/folder, remove, retry, clear finished, import, output selection.
- History item open/remove/clear.
- Favorites open/add/remove.
- Plan selection and payment-channel interactions.
- Account register/login/logout/change-password/order interactions.
- Settings output directory, concurrency, search engine, ad blocker, session reset, update check.

## Cleanup If Electron Hangs

```powershell
Get-Process electron -ErrorAction SilentlyContinue |
  Where-Object { $_.Path -eq 'C:\Users\admin\Documents\New project 4\node_modules\electron\dist\electron.exe' } |
  ForEach-Object { try { Stop-Process -Id $_.Id -Force -ErrorAction Stop } catch {} }
```
