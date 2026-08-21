const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'src', 'renderer', 'index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'src', 'renderer', 'app.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'src', 'renderer', 'style.css'), 'utf8');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const ids = new Set(Array.from(html.matchAll(/id="([^"]+)"/g), (match) => match[1]));
const refs = Array.from(app.matchAll(/getElementById\('([^']+)'\)/g), (match) => match[1]);
const missing = Array.from(new Set(refs.filter((id) => !ids.has(id))));
assert(missing.length === 0, `Missing DOM ids: ${missing.join(', ')}`);

const expectedAssets = [
  'chzzk.ico',
  'dailymotion.ico',
  'facebook.png',
  'instagram.png',
  'kick.png',
  'niconico.ico',
  'reddit.ico',
  'rumble.ico',
  'snapchat.ico',
  'sooplive.ico',
  'tiktok.ico',
  'twitch.ico',
  'vimeo.ico',
  'x.ico',
  'youtube.ico',
];
const assetDir = path.join(root, 'src', 'renderer', 'assets');
for (const asset of expectedAssets) {
  const stat = fs.statSync(path.join(assetDir, asset));
  assert(stat.size > 0, `Icon asset is empty: ${asset}`);
  assert(app.includes(`./assets/${asset}`), `Icon asset is not referenced: ${asset}`);
}

const requiredCopy = ['浏览器', '主页', '下载', '历史', '收藏', '为视频而生', '搜索或输入网址', '套餐购买'];
for (const copy of requiredCopy) {
  assert(html.includes(copy) || app.includes(copy), `Required Chinese copy missing: ${copy}`);
}

const mojibakeMarkers = ['鈥', '脳', '鉁', '鎼', '璐', '鏃', '瑙', '绮'];
const combined = `${html}\n${app}`;
const badMarkers = mojibakeMarkers.filter((marker) => combined.includes(marker));
assert(badMarkers.length === 0, `Mojibake markers found: ${badMarkers.join(', ')}`);

const referenceStyleTokens = [
  '--app-bg',
  '--app-panel',
  '--app-accent',
  '#409eff',
  '.sidebar-btn',
  '.sidebar-btn[data-section="browser"]',
  '.browser-stage webview.browser-view',
  '.browser-stage webview.browser-view.is-active',
  '.browser-split.has-media-panel',
  '.browser-side[hidden]',
  '.download-badge',
  '.downloads-pagination',
  '.site-card',
  '.plan-card',
];
for (const token of referenceStyleTokens) {
  assert(css.includes(token), `Style token missing: ${token}`);
}

const requiredRuntimeTokens = [
  'download-badge',
  'data-section="browser"',
  'DOWNLOAD_PAGE_SIZE',
  'data-download-page="next"',
  'data-download-page="prev"',
  'getBrowserLayoutSnapshot',
  'viewHeight === secondLayout.stageHeight',
  'mediaPanelHeight',
  'viewInlineHeight',
  'scheduleActiveWebviewResize',
  'candidatesByTabId',
  'home:quick-site:youtube',
  'runBrowserYouTubeFlowTest',
  '__VIDOGO_RUN_BROWSER_YOUTUBE_FLOW_TEST',
  'browser:media-panel-close',
  'browser:media-panel-toggle-open',
  'updateDownloadBadge',
];
for (const token of requiredRuntimeTokens) {
  assert(html.includes(token) || app.includes(token), `Runtime token missing: ${token}`);
}

console.log(JSON.stringify({
  domRefs: refs.length,
  iconAssets: expectedAssets.length,
  copyChecks: requiredCopy.length,
  styleTokens: referenceStyleTokens.length,
  runtimeTokens: requiredRuntimeTokens.length,
}));
