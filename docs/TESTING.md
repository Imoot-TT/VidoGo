# VidoGo Testing

Use PowerShell on Windows. Use `npm.cmd`, not bare `npm`, because PowerShell script policy can block `npm`.

## Required Checks

```powershell
npm.cmd run check
npm.cmd run check:backend
npm.cmd run smoke
```

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

The screenshot must show:

- Top tab bar with Home first and YouTube after it.
- Browser toolbar visible.
- YouTube content/webview occupying the full browser stage height.
- Right media sniffing panel full height.

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
- Browser favorite and pin-to-download.
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

