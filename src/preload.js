const { contextBridge, ipcRenderer } = require('electron');

function bind(channel, callback) {
  const handler = (_event, payload) => callback(payload);
  ipcRenderer.on(channel, handler);
  return () => ipcRenderer.off(channel, handler);
}

contextBridge.exposeInMainWorld('mediaDeck', {
  getSystemLocale: () => ipcRenderer.invoke('app:get-system-locale'),
  getDefaultDownloadDir: () => ipcRenderer.invoke('app:get-default-download-dir'),
  getRuntimeInfo: () => ipcRenderer.invoke('app:get-runtime-info'),
  getLegacyInfo: () => ipcRenderer.invoke('app:get-legacy-info'),
  chooseDirectory: () => ipcRenderer.invoke('dialog:choose-directory'),
  chooseTextFile: () => ipcRenderer.invoke('dialog:choose-text-file'),
  openExternal: (url) => ipcRenderer.invoke('app:open-external', url),
  openPath: (targetPath) => ipcRenderer.invoke('app:open-path', targetPath),
  showItemInFolder: (targetPath) => ipcRenderer.invoke('app:show-item-in-folder', targetPath),
  minimizeWindow: () => ipcRenderer.invoke('window:minimize'),
  toggleMaximizeWindow: () => ipcRenderer.invoke('window:toggle-maximize'),
  closeWindow: () => ipcRenderer.invoke('window:close'),
  resetBrowserSession: () => ipcRenderer.invoke('session:reset-browser'),
  setPreferredLanguage: (locale) => ipcRenderer.invoke('browser:set-preferred-language', locale),
  setAdBlockerEnabled: (enabled) => ipcRenderer.invoke('browser:set-ad-blocker-enabled', enabled),
  checkForUpdates: () => ipcRenderer.invoke('app:check-for-updates'),
  getMediaCandidates: (webContentsId = null) => ipcRenderer.invoke('media:get-candidates', webContentsId),
  clearMediaCandidates: (webContentsId = null) => ipcRenderer.invoke('media:clear-candidates', webContentsId),
  startDownload: (payload) => ipcRenderer.invoke('download:start', payload),
  cancelDownload: () => ipcRenderer.invoke('download:cancel'),
  onOpenNewTab: (callback) => bind('browser:open-new-tab', callback),
  onBrowserNavigate: (callback) => bind('browser:navigate', callback),
  onMediaCandidate: (callback) => bind('browser:media-candidate', callback),
  onDownloadEvent: (callback) => bind('download:event', callback),
  onDownloadState: (callback) => bind('download:state', callback),
});
