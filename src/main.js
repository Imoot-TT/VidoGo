const { app, BrowserWindow, dialog, ipcMain, nativeImage, screen, session, shell, webContents } = require('electron');
const fs = require('fs/promises');
const path = require('path');
const { execFileSync, spawn } = require('child_process');

const APP_NAME = 'VidoGo';
const APP_ID = 'com.vidogo.desktop';
const STORAGE_NAMESPACE = 'VidoGo Runtime';
const RUNTIME_PROFILE = 'rebuild-v1';
const PARTITION_NAME = 'vidogo-rebuild-v1';
const BROWSER_PARTITION = `persist:${PARTITION_NAME}`;
const IS_SMOKE_TEST = process.env.ELECTRON_SMOKE_TEST === '1';
const USER_DATA_ROOT = path.join(app.getPath('appData'), STORAGE_NAMESPACE);
const USER_DATA_PATH = IS_SMOKE_TEST
  ? path.join(app.getPath('temp'), `${APP_NAME}-smoke-${process.pid}`)
  : path.join(USER_DATA_ROOT, RUNTIME_PROFILE);
const SESSION_DATA_PATH = path.join(USER_DATA_PATH, 'SessionData');
const PARTITIONS_PATH = path.join(USER_DATA_PATH, 'Partitions');
const ACCEPT_LANGUAGE_BY_LOCALE = {
  'zh-CN': 'zh-CN,zh;q=0.9,en;q=0.8',
  'zh-TW': 'zh-TW,zh;q=0.9,en;q=0.8',
  en: 'en-US,en;q=0.9',
};
const BLOCKED_HOST_PARTS = [
  'doubleclick.net',
  'googlesyndication.com',
  'googleadservices.com',
  'taboola.com',
  'outbrain.com',
  'scorecardresearch.com',
  'adnxs.com',
  'adsrvr.org',
  'criteo.com',
  'pubmatic.com',
  'rubiconproject.com',
];
const MEDIA_EXTENSIONS = new Set([
  '.mp4',
  '.m4v',
  '.webm',
  '.mkv',
  '.mov',
  '.avi',
  '.mp3',
  '.m4a',
  '.aac',
  '.ogg',
  '.wav',
  '.flac',
  '.m3u8',
  '.mpd',
]);
const MEDIA_MIME_PREFIXES = ['video/', 'audio/', 'application/vnd.apple.mpegurl', 'application/dash+xml'];

app.setPath('userData', USER_DATA_PATH);
app.setPath('sessionData', SESSION_DATA_PATH);

let mainWindow = null;
let downloadProcess = null;
let downloadStdoutBuffer = '';
let browserPopupWindows = new Set();
let browserPreferredLocale = 'zh-CN';
let browserAcceptLanguage = ACCEPT_LANGUAGE_BY_LOCALE[browserPreferredLocale];
let browserAdBlockerEnabled = true;
let requestFeaturesRegistered = false;
const mediaCandidates = new Map();

function createAppIcon() {
  const svg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#ff9a2f"/>
          <stop offset="1" stop-color="#1c2430"/>
        </linearGradient>
        <linearGradient id="h" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#ffe08a"/>
          <stop offset="1" stop-color="#6bd7ff"/>
        </linearGradient>
      </defs>
      <rect width="256" height="256" rx="56" fill="url(#g)"/>
      <circle cx="128" cy="128" r="80" fill="#111822" stroke="#ffb45c" stroke-width="8"/>
      <path d="M97 70l54 58-54 58h26l54-58-54-58z" fill="url(#h)"/>
    </svg>`
  ).toString('base64');
  const image = nativeImage.createFromDataURL(`data:image/svg+xml;base64,${svg}`);
  return image.isEmpty() ? undefined : image;
}

async function ensureUserDataPath() {
  await fs.mkdir(USER_DATA_PATH, { recursive: true });
  await fs.mkdir(SESSION_DATA_PATH, { recursive: true });
  await fs.mkdir(PARTITIONS_PATH, { recursive: true });
  return USER_DATA_PATH;
}

function getRuntimeInfo() {
  return {
    appName: APP_NAME,
    version: app.getVersion(),
    runtimeProfile: RUNTIME_PROFILE,
    browserPartition: BROWSER_PARTITION,
    userDataPath: USER_DATA_PATH,
    sessionDataPath: SESSION_DATA_PATH,
  };
}

function getLegacyInfo() {
  const appDataRoot = app.getPath('appData');
  const legacyDirs = [
    path.join(appDataRoot, 'VidBrowser'),
    path.join(appDataRoot, 'VidoGo'),
  ];

  let legacyProcess = null;
  try {
    const stdout = execFileSync('tasklist.exe', ['/FI', 'IMAGENAME eq VidBrowser.exe', '/FO', 'CSV', '/NH'], {
      encoding: 'utf8',
      windowsHide: true,
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (stdout && !stdout.startsWith('INFO:')) {
      const match = stdout.match(/^"([^"]+)","([^"]+)","([^"]+)","([^"]+)","([^"]+)"$/m);
      if (match) {
        legacyProcess = {
          name: match[1],
          pid: match[2],
          memory: match[5],
        };
      }
    }
  } catch {
    legacyProcess = null;
  }

  return {
    legacyDirs,
    legacyProcess,
  };
}

function createWindow(url = null) {
  const icon = createAppIcon();
  const { width: workAreaWidth, height: workAreaHeight } = screen.getPrimaryDisplay().workAreaSize;
  const width = Math.max(960, Math.min(1540, workAreaWidth - 48));
  const height = Math.max(640, Math.min(920, workAreaHeight - 48));
  mainWindow = new BrowserWindow({
    width,
    height,
    minWidth: 960,
    minHeight: 640,
    center: true,
    title: APP_NAME,
    frame: false,
    show: !IS_SMOKE_TEST,
    autoHideMenuBar: true,
    backgroundColor: '#0b1220',
    icon,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      webviewTag: true,
    },
  });

  mainWindow.webContents.on('will-attach-webview', (_event, webPreferences) => {
    webPreferences.preload = path.join(__dirname, 'webview-preload.js');
    webPreferences.contextIsolation = true;
    webPreferences.nodeIntegration = false;
    webPreferences.sandbox = false;
    webPreferences.partition = BROWSER_PARTITION;
  });
  if (url) {
    mainWindow.webContents.once('did-finish-load', () => {
      mainWindow.webContents.send('browser:navigate', url);
    });
  }

  if (IS_SMOKE_TEST) {
    let smokeStarted = false;
    const startSmoke = () => {
      if (smokeStarted || !mainWindow || mainWindow.isDestroyed()) return;
      smokeStarted = true;
      runSmokeTest(mainWindow).catch((error) => {
        console.error(error?.stack || error);
        void writeSmokeResult({ ok: false, result: { ok: false, reason: error?.stack || String(error) } })
          .finally(() => app.exit(1));
      });
    };
    mainWindow.webContents.once('did-finish-load', startSmoke);
    mainWindow.webContents.once('dom-ready', startSmoke);
    setTimeout(startSmoke, 1500);
  }

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function runSmokeTest(window) {
  const result = await window.webContents.executeJavaScript(`
    new Promise((resolve) => {
      const startedAt = Date.now();
      const check = () => {
        const bootError = window.__VIDOGO_BOOT_ERROR || null;
        if (bootError) {
          resolve({ ok: false, reason: bootError });
          return;
        }
        const requiredIds = [
          'window-title',
          'tab-strip',
          'home-search-input',
          'browser-stage',
          'candidate-list',
          'url-input',
          'download-body',
          'history-list',
          'favorites-content',
          'plan-table',
          'settings-reset-session',
          'settings-output-dir',
          'settings-search-engine'
        ];
        const missing = requiredIds.filter((id) => !document.getElementById(id));
        if (window.__VIDOGO_BOOTSTRAPPED && missing.length === 0) {
          const scenario = ${JSON.stringify(process.env.ELECTRON_SMOKE_SCENARIO || '')};
          const runnerName = scenario === 'browser-youtube-flow'
            ? '__VIDOGO_RUN_BROWSER_YOUTUBE_FLOW_TEST'
            : '__VIDOGO_RUN_SELF_TEST';
          const runnerLabel = scenario || 'self test';
          const runnerTimeoutMs = scenario === 'browser-youtube-flow' ? 45000 : 18000;
          const selfTestPromise = Promise.resolve(
            typeof window[runnerName] === 'function'
              ? window[runnerName]()
              : { ok: false, failures: [runnerLabel + ' function missing'] }
          );
          const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve({
            ok: false,
            failures: [runnerLabel + ' timed out'],
            progress: window.__VIDOGO_SELF_TEST_PROGRESS || null
          }), runnerTimeoutMs));
          Promise.race([selfTestPromise, timeoutPromise]).then((selfTest) => {
            const finalSection = ${JSON.stringify(process.env.ELECTRON_SMOKE_FINAL_SECTION || '')};
            if (finalSection && typeof window.__VIDOGO_SET_SECTION === 'function') {
              window.__VIDOGO_SET_SECTION(finalSection);
            }
            const finish = () => {
              const activePageIds = Array.from(document.querySelectorAll('.page.active')).map((page) => page.id);
              resolve({
                ok: Boolean(selfTest && selfTest.ok) && activePageIds.length === 1,
                selfTest,
                tabs: document.querySelectorAll('.tab').length,
                pages: document.querySelectorAll('.page').length,
                quickSites: document.querySelectorAll('.popular-site-button, .site-card').length,
                activePage: activePageIds[0] || null,
                activePageIds,
                browserLayout: typeof window.__VIDOGO_GET_BROWSER_LAYOUT === 'function'
                  ? window.__VIDOGO_GET_BROWSER_LAYOUT()
                  : null
              });
            };
            if (finalSection) setTimeout(finish, 800);
            else finish();
          });
          return;
        }
        if (Date.now() - startedAt > 7000) {
          resolve({
            ok: false,
            reason: 'Renderer bootstrap timed out',
            bootstrapped: Boolean(window.__VIDOGO_BOOTSTRAPPED),
            missing
          });
          return;
        }
        setTimeout(check, 100);
      };
      check();
    })
  `);

  if (!result?.ok) {
    await writeSmokeResult({ ok: false, result });
    console.error('Electron smoke test failed:', JSON.stringify(result));
    app.exit(1);
    return;
  }
  await writeSmokeResult({ ok: true, result });
  console.log('Electron smoke test passed:', JSON.stringify(result));
  app.exit(0);
}

async function writeSmokeResult(payload) {
  const resultPath = process.env.ELECTRON_SMOKE_RESULT;
  const screenshotPath = process.env.ELECTRON_SMOKE_SCREENSHOT;
  if (screenshotPath && mainWindow && !mainWindow.isDestroyed()) {
    try {
      if (!mainWindow.isVisible()) {
        mainWindow.showInactive();
      }
      await mainWindow.webContents.executeJavaScript(`
        document.body.dataset.theme = 'dark';
        document.body.dataset.resolvedTheme = 'dark';
        new Promise((resolve) => {
          let frames = 0;
          const tick = () => (++frames >= 6 ? resolve() : requestAnimationFrame(tick));
          requestAnimationFrame(tick);
        })
      `);
      const image = await Promise.race([
        mainWindow.webContents.capturePage(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Smoke screenshot timed out')), 3000)),
      ]);
      await fs.writeFile(screenshotPath, image.toPNG());
    } catch (error) {
      payload.screenshotError = error?.message || String(error);
    }
  }
  if (resultPath) {
    await fs.writeFile(resultPath, JSON.stringify(payload, null, 2), 'utf8');
  }
}

function createPopupWindow(url, partition = BROWSER_PARTITION) {
  const popup = new BrowserWindow({
    width: 1180,
    height: 820,
    autoHideMenuBar: true,
    title: APP_NAME,
    backgroundColor: '#0b1220',
    icon: createAppIcon(),
    webPreferences: {
      partition,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });
  popup.loadURL(url);
  browserPopupWindows.add(popup);
  popup.on('closed', () => browserPopupWindows.delete(popup));
  return popup;
}

function getBrowserSession() {
  return session.fromPartition(BROWSER_PARTITION);
}

function setHeader(headers, name, value) {
  for (const key of Object.keys(headers)) {
    if (key.toLowerCase() === name.toLowerCase()) delete headers[key];
  }
  headers[name] = value;
}

function getResponseHeader(headers, name) {
  if (!headers) return null;
  const match = Object.keys(headers).find((key) => key.toLowerCase() === name.toLowerCase());
  const value = match ? headers[match] : null;
  return Array.isArray(value) ? value[0] : value || null;
}

function classifyBrowserWindowOpen(url, openerUrl = '') {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return 'deny';
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return 'deny';
  const isGoogleOAuthPopup = parsed.hostname === 'accounts.google.com'
    && (parsed.pathname.startsWith('/o/oauth2/') || parsed.pathname.startsWith('/gsi/'))
    && parsed.searchParams.get('display') === 'popup';
  const isTelegramDownload = parsed.hostname === 'web.telegram.org'
    && /^\/(a|k)\/download\//.test(parsed.pathname)
    && String(openerUrl || '').includes('web.telegram.org');
  if (isTelegramDownload) return 'allow-hidden-popup';
  if (isGoogleOAuthPopup) return 'allow-popup';
  return 'open-app-tab';
}

function shouldBlockRequest(rawUrl, resourceType) {
  let parsed;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return false;
  }
  if (parsed.hostname.includes('youtube.com') || parsed.hostname.includes('googlevideo.com') || parsed.hostname.includes('ytimg.com')) {
    return false;
  }
  const host = parsed.hostname.toLowerCase();
  if (BLOCKED_HOST_PARTS.some((part) => host === part || host.endsWith(`.${part}`))) return true;
  if (resourceType === 'media' || resourceType === 'mainFrame') return false;
  return /\/(?:ad|ads|adserver|analytics|pixel|tracking|trackers?)(?:[/?#&_.=-]|$)/i.test(parsed.pathname)
    || /[?&](?:ad_id|ad_slot|ad_unit|adurl|gclid|fbclid)=/i.test(parsed.search);
}

function looksLikeMedia(details) {
  const mime = String(getResponseHeader(details.responseHeaders, 'content-type') || '').split(';')[0].trim().toLowerCase();
  if (MEDIA_MIME_PREFIXES.some((prefix) => mime.startsWith(prefix))) return true;
  try {
    const pathname = new URL(details.url).pathname.toLowerCase();
    return MEDIA_EXTENSIONS.has(path.extname(pathname));
  } catch {
    return false;
  }
}

function createMediaCandidate(details) {
  let parsed;
  try {
    parsed = new URL(details.url);
  } catch {
    return null;
  }
  const mime = String(getResponseHeader(details.responseHeaders, 'content-type') || '').split(';')[0].trim();
  const contentLength = Number(getResponseHeader(details.responseHeaders, 'content-length') || 0);
  const extension = path.extname(parsed.pathname).replace('.', '').toLowerCase();
  const id = Buffer.from(details.url).toString('base64url').slice(0, 48);
  return {
    id,
    url: details.url,
    host: parsed.hostname,
    title: decodeURIComponent(path.basename(parsed.pathname)) || parsed.hostname,
    mime,
    extension,
    size: Number.isFinite(contentLength) && contentLength > 0 ? contentLength : null,
    resourceType: details.resourceType,
    webContentsId: details.webContentsId,
    detectedAt: new Date().toISOString(),
  };
}

function rememberMediaCandidate(details) {
  if (!looksLikeMedia(details)) return;
  const candidate = createMediaCandidate(details);
  if (!candidate) return;
  mediaCandidates.set(candidate.id, candidate);
  if (mediaCandidates.size > 300) {
    const [oldest] = mediaCandidates.keys();
    mediaCandidates.delete(oldest);
  }
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('browser:media-candidate', candidate);
  }
}

function registerBrowserRequestFeatures() {
  if (requestFeaturesRegistered) return;
  requestFeaturesRegistered = true;
  const browserSession = getBrowserSession();
  browserSession.webRequest.onBeforeRequest({ urls: ['http://*/*', 'https://*/*'] }, (details, callback) => {
    callback({ cancel: browserAdBlockerEnabled && shouldBlockRequest(details.url, details.resourceType) });
  });
  browserSession.webRequest.onBeforeSendHeaders({ urls: ['http://*/*', 'https://*/*'] }, (details, callback) => {
    const requestHeaders = { ...details.requestHeaders };
    setHeader(requestHeaders, 'Accept-Language', browserAcceptLanguage);
    callback({ requestHeaders });
  });
  browserSession.webRequest.onHeadersReceived({ urls: ['http://*/*', 'https://*/*'] }, (details, callback) => {
    rememberMediaCandidate(details);
    callback({ responseHeaders: details.responseHeaders });
  });
}

async function resetBrowserSession() {
  const browserSession = getBrowserSession();
  await Promise.allSettled([
    browserSession.clearStorageData(),
    browserSession.clearCache(),
  ]);
  mediaCandidates.clear();
}

async function exportCookieJar(cookiePath) {
  const cookies = await getBrowserSession().cookies.get({});
  const lines = ['# Netscape HTTP Cookie File'];
  for (const cookie of cookies) {
    const domain = cookie.domain || '';
    const includeSubdomains = domain.startsWith('.') ? 'TRUE' : 'FALSE';
    const secure = cookie.secure ? 'TRUE' : 'FALSE';
    const expires = Number.isFinite(cookie.expirationDate)
      ? Math.floor(cookie.expirationDate)
      : Math.floor(Date.now() / 1000) + 31536000;
    const value = [
      domain,
      includeSubdomains,
      cookie.path || '/',
      secure,
      expires,
      cookie.name,
      cookie.value,
    ].join('\t');
    lines.push(value);
  }
  await fs.writeFile(cookiePath, lines.join('\n'), 'utf8');
}

function spawnDownloadWorker(task, cookiePath) {
  const workerPath = path.join(__dirname, '..', 'backend', 'download_worker.py');
  const python = process.env.PYTHON || 'python';
  const proc = spawn(python, [workerPath], {
    stdio: ['pipe', 'pipe', 'pipe'],
    windowsHide: true,
  });

  downloadProcess = proc;
  downloadStdoutBuffer = '';
  mainWindow?.webContents.send('download:state', { running: true });

  const forwardLine = (line) => {
    const trimmed = line.trim();
    if (!trimmed || !mainWindow || mainWindow.isDestroyed()) return;
    try {
      const payload = JSON.parse(trimmed);
      mainWindow.webContents.send('download:event', payload);
    } catch {
      mainWindow.webContents.send('download:event', { type: 'log', message: trimmed });
    }
  };

  proc.stdout.setEncoding('utf8');
  proc.stdout.on('data', (chunk) => {
    downloadStdoutBuffer += chunk;
    const parts = downloadStdoutBuffer.split(/\r?\n/);
    downloadStdoutBuffer = parts.pop() || '';
    for (const line of parts) forwardLine(line);
  });

  proc.stderr.setEncoding('utf8');
  proc.stderr.on('data', (chunk) => {
    const text = String(chunk).trim();
    if (text && mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('download:event', { type: 'log', message: text });
    }
  });

  proc.on('close', (code) => {
    if (downloadStdoutBuffer.trim()) {
      forwardLine(downloadStdoutBuffer);
    }
    downloadProcess = null;
    mainWindow?.webContents.send('download:state', { running: false });
    if (code !== 0 && mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('download:event', {
        type: 'error',
        message: `Download worker exited with code ${code}.`,
      });
    }
    void fs.unlink(cookiePath).catch(() => {});
  });

  proc.stdin.end(JSON.stringify({ ...task, cookieFile: cookiePath }));
}

function resolveUrl(input) {
  const trimmed = String(input || '').trim();
  if (!trimmed) return '';
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

app.setName(APP_NAME);
app.setAppUserModelId(APP_ID);
app.commandLine.appendSwitch('disable-features', 'CalculateNativeWinOcclusion');

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
}

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

app.on('web-contents-created', (_event, contents) => {
  if (contents.getType() !== 'webview') return;
  contents.setWindowOpenHandler(({ url }) => {
    const disposition = classifyBrowserWindowOpen(url, contents.getURL());
    if (disposition === 'allow-popup') return { action: 'allow' };
    if (disposition === 'allow-hidden-popup') {
      return { action: 'allow', overrideBrowserWindowOptions: { show: false, skipTaskbar: true } };
    }
    if (disposition === 'open-app-tab' && mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('browser:open-new-tab', url);
    }
    return { action: 'deny' };
  });
});

app.whenReady().then(async () => {
  await ensureUserDataPath();
  registerBrowserRequestFeatures();
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('app:get-system-locale', () => app.getLocale());

ipcMain.handle('app:get-default-download-dir', () => path.join(app.getPath('downloads'), APP_NAME));

ipcMain.handle('app:get-runtime-info', () => getRuntimeInfo());
ipcMain.handle('app:get-legacy-info', () => getLegacyInfo());

ipcMain.handle('session:reset-browser', async () => {
  await resetBrowserSession();
  return getRuntimeInfo();
});

ipcMain.handle('browser:set-preferred-language', (_event, locale) => {
  if (typeof locale !== 'string' || !ACCEPT_LANGUAGE_BY_LOCALE[locale]) {
    return browserAcceptLanguage;
  }
  browserPreferredLocale = locale;
  browserAcceptLanguage = ACCEPT_LANGUAGE_BY_LOCALE[locale];
  for (const contents of webContents.getAllWebContents()) {
    if (!contents.isDestroyed() && contents.getType() === 'webview') {
      contents.send('browser:preferred-locale-changed', browserPreferredLocale);
    }
  }
  return browserAcceptLanguage;
});

ipcMain.handle('browser:set-ad-blocker-enabled', (_event, enabled) => {
  browserAdBlockerEnabled = enabled !== false;
  return browserAdBlockerEnabled;
});

ipcMain.handle('app:check-for-updates', () => ({
  available: false,
  version: app.getVersion(),
  checkedAt: new Date().toISOString(),
}));

function filterMediaCandidates(webContentsId = null) {
  const id = Number(webContentsId);
  const candidates = Array.from(mediaCandidates.values());
  if (!Number.isFinite(id) || id <= 0) return candidates;
  return candidates.filter((candidate) => Number(candidate.webContentsId) === id);
}

ipcMain.handle('media:get-candidates', (_event, webContentsId = null) => filterMediaCandidates(webContentsId));

ipcMain.handle('media:clear-candidates', (_event, webContentsId = null) => {
  const id = Number(webContentsId);
  if (!Number.isFinite(id) || id <= 0) {
    mediaCandidates.clear();
    return [];
  }
  for (const [candidateId, candidate] of mediaCandidates.entries()) {
    if (Number(candidate.webContentsId) === id) mediaCandidates.delete(candidateId);
  }
  return filterMediaCandidates(webContentsId);
});

ipcMain.handle('dialog:choose-directory', async () => {
  if (IS_SMOKE_TEST) return path.join(USER_DATA_PATH, 'SmokeDownloads');
  if (!mainWindow) return null;
  const result = await dialog.showOpenDialog(mainWindow, {
    title: 'Select output folder',
    properties: ['openDirectory', 'createDirectory'],
  });
  return result.canceled ? null : result.filePaths[0];
});

ipcMain.handle('dialog:choose-text-file', async () => {
  if (IS_SMOKE_TEST) return 'https://example.com/smoke-video.mp4\nhttps://example.com/smoke-audio.mp3\n';
  if (!mainWindow) return null;
  const result = await dialog.showOpenDialog(mainWindow, {
    title: 'Import URL list',
    properties: ['openFile'],
    filters: [{ name: 'Text files', extensions: ['txt'] }, { name: 'All files', extensions: ['*'] }],
  });
  if (result.canceled) return null;
  return fs.readFile(result.filePaths[0], 'utf8');
});

ipcMain.handle('app:open-external', async (_event, url) => {
  if (typeof url !== 'string' || !url.trim()) return false;
  if (IS_SMOKE_TEST) return true;
  await shell.openExternal(url);
  return true;
});

ipcMain.handle('app:open-path', async (_event, targetPath) => {
  if (typeof targetPath !== 'string' || !targetPath.trim()) return false;
  if (IS_SMOKE_TEST) return true;
  const result = await shell.openPath(targetPath);
  return result === '';
});

ipcMain.handle('app:show-item-in-folder', (_event, targetPath) => {
  if (typeof targetPath !== 'string' || !targetPath.trim()) return false;
  if (IS_SMOKE_TEST) return true;
  shell.showItemInFolder(targetPath);
  return true;
});

ipcMain.handle('window:minimize', () => {
  if (!mainWindow) return false;
  if (IS_SMOKE_TEST) return true;
  mainWindow.minimize();
  return true;
});

ipcMain.handle('window:toggle-maximize', () => {
  if (!mainWindow) return false;
  if (IS_SMOKE_TEST) return true;
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
  return true;
});

ipcMain.handle('window:close', () => {
  if (!mainWindow) return false;
  if (IS_SMOKE_TEST) return true;
  mainWindow.close();
  return true;
});

ipcMain.handle('download:start', async (_event, task) => {
  if (downloadProcess) {
    throw new Error('A download task is already running.');
  }
  if (!task?.urls?.length) {
    throw new Error('No URLs provided.');
  }
  if (IS_SMOKE_TEST) {
    mainWindow?.webContents.send('download:state', { running: true });
    setTimeout(() => {
      if (!mainWindow || mainWindow.isDestroyed()) return;
      mainWindow.webContents.send('download:event', {
        type: 'progress',
        data: {
          item_index: 1,
          item_total: task.urls.length,
          percent: 50,
          status: 'downloading',
          filename: path.join(USER_DATA_PATH, 'SmokeDownloads', 'smoke-video.mp4'),
          downloaded_bytes: 1024,
          total_bytes: 2048,
          speed: 2048,
          eta: 1,
        },
      });
      mainWindow.webContents.send('download:event', {
        type: 'progress',
        data: {
          item_index: 1,
          item_total: task.urls.length,
          percent: 100,
          status: 'finished',
          filename: path.join(USER_DATA_PATH, 'SmokeDownloads', 'smoke-video.mp4'),
          downloaded_bytes: 2048,
          total_bytes: 2048,
          speed: 0,
          eta: 0,
        },
      });
      mainWindow.webContents.send('download:event', { type: 'done', downloaded: task.urls.length, failed: 0 });
      mainWindow.webContents.send('download:state', { running: false });
    }, 25);
    return { started: true, smoke: true };
  }
  const userData = app.getPath('userData');
  const cookieDir = path.join(userData, 'cookies');
  await fs.mkdir(cookieDir, { recursive: true });
  const cookiePath = path.join(cookieDir, 'browser-session.txt');
  await exportCookieJar(cookiePath);
  spawnDownloadWorker(
    {
      urls: task.urls,
      outputDir: task.outputDir,
      resolution: task.resolution,
      playlist: task.playlist,
      audioOnly: task.audioOnly,
      jsRuntime: task.jsRuntime || 'auto',
      ffmpegLocation: task.ffmpegLocation || null,
    },
    cookiePath
  );
  return { started: true };
});

ipcMain.handle('download:cancel', async () => {
  if (!downloadProcess) return { running: false };
  downloadProcess.kill();
  downloadProcess = null;
  mainWindow?.webContents.send('download:state', { running: false });
  return { running: false };
});
