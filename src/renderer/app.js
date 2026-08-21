const HOME_URL = 'https://www.youtube.com/';
const SEARCH_ENGINES = {
  google: 'https://www.google.com/search?q=',
  bing: 'https://www.bing.com/search?q=',
  duckduckgo: 'https://duckduckgo.com/?q=',
};
const FALLBACK_PARTITION = 'persist:vidogo-rebuild-v1';
const STORAGE_KEYS = {
  theme: 'vidogo:theme',
  locale: 'vidogo:locale',
  settings: 'vidogo:settings',
  history: 'vidogo:history',
  favorites: 'vidogo:favorites',
  downloads: 'vidogo:downloads',
  account: 'vidogo:account',
  users: 'vidogo:users',
  orders: 'vidogo:orders',
};

const PLAN_CATALOG = {
  free: { price: 'US$0.00', monthly: null, yearly: null, lifetime: null, quota: '3 / day', concurrency: 1 },
  pro: { monthly: 'US$4.90 / month', yearly: 'US$39.00 / year', lifetime: null, quota: '30 / day', concurrency: 2 },
  flagship: { monthly: 'US$9.90 / month', yearly: 'US$59.00 / year', lifetime: null, quota: 'Unlimited', concurrency: 3 },
  lifetime: { monthly: null, yearly: null, lifetime: 'US$149.00 one-time', quota: 'Unlimited', concurrency: 3 },
};

const QUICK_SITES = {
  video: [
    { name: 'YouTube', url: 'https://www.youtube.com/', icon: './assets/youtube.ico', color: '#ff0033', short: 'YT' },
    { name: 'TikTok', url: 'https://www.tiktok.com/', icon: './assets/tiktok.ico', color: '#101317', short: 'TT' },
    { name: 'Vimeo', url: 'https://vimeo.com/', icon: './assets/vimeo.ico', color: '#1ab7ea', short: 'V' },
    { name: 'Dailymotion', url: 'https://www.dailymotion.com/', icon: './assets/dailymotion.ico', color: '#0050ff', short: 'DM' },
    { name: 'Rumble', url: 'https://rumble.com/', icon: './assets/rumble.ico', color: '#093a20', short: 'R' },
  ],
  social: [
    { name: 'Instagram', url: 'https://www.instagram.com/', icon: './assets/instagram.png', color: '#e1306c', short: 'IG' },
    { name: 'Facebook', url: 'https://www.facebook.com/', icon: './assets/facebook.png', color: '#1877f2', short: 'FB' },
    { name: 'X/Twitter', url: 'https://x.com/', icon: './assets/x.ico', color: '#111111', short: 'X' },
    { name: 'Reddit', url: 'https://www.reddit.com/', icon: './assets/reddit.ico', color: '#ff4500', short: 'RD' },
    { name: 'Snapchat', url: 'https://www.snapchat.com/', icon: './assets/snapchat.ico', color: '#fffc00', short: 'SC', darkText: true },
  ],
  live: [
    { name: 'Twitch', url: 'https://www.twitch.tv/', icon: './assets/twitch.ico', color: '#9146ff', short: 'TW' },
    { name: 'Kick', url: 'https://kick.com/', icon: './assets/kick.png', color: '#53fc18', short: 'K', darkText: true },
    { name: 'SoopLive', url: 'https://www.sooplive.com/', icon: './assets/sooplive.ico', color: '#00c2ff', short: 'SL' },
    { name: 'Chzzk', url: 'https://chzzk.naver.com/', icon: './assets/chzzk.ico', color: '#22cc88', short: 'CZ' },
    { name: 'Niconico', url: 'https://www.nicovideo.jp/', icon: './assets/niconico.ico', color: '#666666', short: 'NC' },
  ],
};

const QUALITY_OPTIONS = [
  { value: 'best', zh: '最高画质', en: 'Best available' },
  { value: '2160', zh: '最高 4K', en: 'Up to 4K' },
  { value: '1440', zh: '最高 1440p', en: 'Up to 1440p' },
  { value: '1080', zh: '最高 1080p', en: 'Up to 1080p' },
  { value: '720', zh: '最高 720p', en: 'Up to 720p' },
  { value: '480', zh: '最高 480p', en: 'Up to 480p' },
];
const DOWNLOAD_PAGE_SIZE = 50;

const TEXT = {
  zh: {
    title: 'VidoGo',
    home: '主页',
    browser: '浏览器',
    downloads: '下载',
    history: '历史',
    favorites: '收藏',
    plans: '套餐',
    account: '账户',
    settings: '设置',
    newTab: '新标签页',
    search: '搜索或输入网址',
    open: '打开',
    visit: '访问',
    popular: '热门',
    video: '视频',
    social: '社交',
    live: '直播',
    browserAddress: '输入网址',
    mediaPanel: '视频媒体',
    noMedia: '未检测到媒体',
    noMediaHint: '打开视频页面后自动嗅探',
    openPanel: '打开媒体面板',
    closePanel: '关闭媒体面板',
    recommend: '推荐',
    all: '全部',
    outputFolder: '输出目录',
    browse: '浏览',
    quality: '分辨率',
    allowPlaylists: '允许播放列表',
    audioOnly: '仅音频',
    importList: '导入列表',
    cancel: '停止',
    download: '下载',
    startDownload: '开始下载',
    allTime: '全部时间',
    today: '今天',
    yesterday: '昨天',
    last7: '最近 7 天',
    last30: '最近 30 天',
    clearFinished: '清除已结束',
    previousPage: '上一页',
    nextPage: '下一页',
    pageStatus: '第 {current} / {total} 页',
    fileName: '文件名',
    progress: '进度',
    downloaded: '已下载',
    fileSize: '文件大小',
    downloadTime: '下载时间',
    downloadStatus: '下载状态',
    savePath: '保存地址',
    action: '操作',
    completed: '已完成',
    queued: '等待下载',
    waiting: '等待下载',
    downloading: '下载中',
    error: '下载失败',
    failed: '下载失败',
    cancelled: '已停止',
    canceled: '已停止',
    noDownloads: '暂无下载记录',
    addDownloadTask: '新增下载任务',
    openFile: '打开文件',
    openFolder: '打开文件夹',
    remove: '删除',
    retry: '重试',
    unknownPath: '未知路径',
    clear: '清空',
    noHistory: '暂无浏览记录',
    noFavorites: '暂无收藏',
    favoritesTitle: '收藏夹',
    plansTitle: '套餐购买',
    plansSubtitle: '选择套餐和支付方式，购买记录会显示在账户订单中。',
    free: '免费版',
    pro: '专业版',
    flagship: '旗舰版',
    lifetime: '终身版',
    included: '默认包含',
    month: '月',
    year: '年',
    once: '一次性',
    purchaseTitle: '购买支付方式',
    purchase: '登录后购买',
    accountTitle: '账户',
    accountSubtitle: '登录后查看套餐、订单和购买状态。',
    login: '登录账户',
    loginSubtitle: '使用本地账户继续。',
    email: '邮箱',
    password: '密码',
    emailPlaceholder: '输入邮箱地址',
    passwordPlaceholder: '输入密码',
    register: '注册',
    confirmPassword: '确认密码',
    confirmPasswordPlaceholder: '再次输入密码',
    backToLogin: '返回登录',
    logout: '退出登录',
    refresh: '刷新',
    signedInDescription: '已登录，可查看套餐和订单。',
    signedOutDescription: '登录后查看套餐、订单和购买状态。',
    profileTitle: '账户信息',
    profileSubtitle: '本地登录状态和套餐信息。',
    currentPlan: '当前套餐',
    todayDownloads: '今日下载',
    ordersTitle: '订单',
    ordersSubtitle: '查看本地购买记录和支付状态。',
    noOrders: '暂无订单',
    loginSuccess: '登录成功',
    registerSuccess: '注册成功',
    logoutSuccess: '已退出登录',
    invalidEmail: '请输入有效邮箱。',
    passwordRequired: '请输入密码。',
    passwordMismatch: '两次输入的密码不一致。',
    paymentStarted: '已创建本地订单',
    paymentContinued: '订单已标记为已支付',
    orderRemoved: '订单已删除',
    payNow: '立即购买',
    viewPlans: '查看套餐',
    changePassword: '修改密码',
    passwordTitle: '修改密码',
    passwordSubtitle: '更新当前本地账户密码。',
    oldPassword: '当前密码',
    newPassword: '新密码',
    savePassword: '保存密码',
    wrongPassword: '当前密码不正确。',
    passwordChanged: '密码已更新',
    loginFailed: '账户或密码不正确。',
    continuePayment: '继续支付',
    paid: '已支付',
    created: '已创建',
    addCurrentFavorite: '收藏当前页',
    noActivePage: '当前没有可收藏页面。',
    historyRemoved: '历史记录已删除',
    adBlocker: '广告拦截',
    adBlockerDescription: '拦截广告、统计和跟踪请求。',
    on: '开启',
    off: '关闭',
    updates: '软件更新',
    updatesDescription: '检查当前版本是否有可用更新。',
    checkUpdates: '检查更新',
    updateUnavailable: '当前已是最新版本',
    stripe: 'Stripe',
    payssion: 'Payssion',
    theme: '主题',
    system: '跟随系统',
    light: '浅色',
    dark: '深色',
    language: '语言',
    chinese: '中文',
    english: 'English',
    browserSession: '浏览器',
    resetSession: '清除浏览器登录状态',
    sessionReset: '浏览器登录状态已清除',
    started: '下载已开始',
    stopped: '下载已停止',
    noUrls: '请先输入视频链接。',
    imported: '已导入链接列表',
    downloadDone: '完成：成功 {success} 个，失败 {failed} 个。',
    downloadError: '错误：{message}',
    loadFailed: '页面加载失败',
    accountPending: '请先登录账户再购买套餐。',
    tableFeature: '功能',
    featureQuality: '最高画质下载',
    featureBatch: '批量下载',
    featurePlaylist: '播放列表',
    featureBrowser: '内置浏览器',
    featureSupport: '优先支持',
    settingsTitle: '设置',
    settingsThemeDescription: '选择界面显示模式。',
    settingsLanguageDescription: '选择应用界面语言。',
    settingsDownloadDir: '下载目录',
    settingsDownloadDirDescription: '视频和音频会保存到此文件夹。',
    chooseDownloadDirectory: '选择目录',
    resetDownloadDirectory: '恢复默认',
    maxConcurrentDownloads: '并发下载',
    maxConcurrentDownloadsDescription: '控制本地下载任务并发上限。',
    defaultSearchEngine: '默认搜索引擎',
    defaultSearchEngineDescription: '地址栏输入关键词时使用的搜索引擎。',
    currentVersion: '当前版本',
    currentVersionDescription: '本地应用运行信息。',
    saved: '已保存',
  },
  en: {
    title: 'VidoGo',
    home: 'Home',
    browser: 'Browser',
    downloads: 'Downloads',
    history: 'History',
    favorites: 'Favorites',
    plans: 'Plans',
    account: 'Account',
    settings: 'Settings',
    newTab: 'New tab',
    search: 'Search or enter URL',
    open: 'Open',
    visit: 'Visit',
    popular: 'Popular',
    video: 'Video',
    social: 'Social',
    live: 'Live',
    browserAddress: 'Enter URL',
    mediaPanel: 'Video media',
    noMedia: 'No media detected',
    noMediaHint: 'Open a video page to sniff media',
    openPanel: 'Open media panel',
    closePanel: 'Close media panel',
    recommend: 'Recommended',
    all: 'All',
    outputFolder: 'Output folder',
    browse: 'Browse',
    quality: 'Resolution',
    allowPlaylists: 'Allow playlists',
    audioOnly: 'Audio only',
    importList: 'Import list',
    cancel: 'Stop',
    download: 'Download',
    startDownload: 'Start download',
    allTime: 'All time',
    today: 'Today',
    yesterday: 'Yesterday',
    last7: 'Last 7 days',
    last30: 'Last 30 days',
    clearFinished: 'Clear finished',
    previousPage: 'Previous page',
    nextPage: 'Next page',
    pageStatus: 'Page {current} of {total}',
    fileName: 'File name',
    progress: 'Progress',
    downloaded: 'Downloaded',
    fileSize: 'File size',
    downloadTime: 'Download time',
    downloadStatus: 'Status',
    savePath: 'Save path',
    action: 'Action',
    completed: 'Completed',
    queued: 'Queued',
    waiting: 'Waiting',
    downloading: 'Downloading',
    error: 'Failed',
    failed: 'Failed',
    cancelled: 'Stopped',
    canceled: 'Stopped',
    noDownloads: 'No download records',
    addDownloadTask: 'Add download task',
    openFile: 'Open file',
    openFolder: 'Open folder',
    remove: 'Remove',
    retry: 'Retry',
    unknownPath: 'Unknown path',
    clear: 'Clear',
    noHistory: 'No browsing history',
    noFavorites: 'No favorites',
    favoritesTitle: 'Favorites',
    plansTitle: 'Plans',
    plansSubtitle: 'Choose a plan and payment method. Purchases appear in account orders.',
    free: 'Free',
    pro: 'Pro',
    flagship: 'Flagship',
    lifetime: 'Lifetime',
    included: 'Included by default',
    month: 'month',
    year: 'year',
    once: 'one-time',
    purchaseTitle: 'Payment method',
    purchase: 'Purchase after login',
    accountTitle: 'Account',
    accountSubtitle: 'Sign in to view plans, orders, and purchase status.',
    login: 'Sign in',
    loginSubtitle: 'Continue with a local account.',
    email: 'Email',
    password: 'Password',
    emailPlaceholder: 'Enter email address',
    passwordPlaceholder: 'Enter password',
    register: 'Register',
    confirmPassword: 'Confirm password',
    confirmPasswordPlaceholder: 'Enter password again',
    backToLogin: 'Back to sign in',
    logout: 'Sign out',
    refresh: 'Refresh',
    signedInDescription: 'Signed in. Plans and orders are available.',
    signedOutDescription: 'Sign in to view plans, orders, and purchase status.',
    profileTitle: 'Account info',
    profileSubtitle: 'Local sign-in state and plan information.',
    currentPlan: 'Current plan',
    todayDownloads: 'Today downloads',
    ordersTitle: 'Orders',
    ordersSubtitle: 'View local purchase records and payment status.',
    noOrders: 'No orders',
    loginSuccess: 'Signed in',
    registerSuccess: 'Registered',
    logoutSuccess: 'Signed out',
    invalidEmail: 'Enter a valid email.',
    passwordRequired: 'Enter a password.',
    passwordMismatch: 'Passwords do not match.',
    paymentStarted: 'Local order created',
    paymentContinued: 'Order marked as paid',
    orderRemoved: 'Order removed',
    payNow: 'Buy now',
    viewPlans: 'View plans',
    changePassword: 'Change password',
    passwordTitle: 'Change password',
    passwordSubtitle: 'Update the current local account password.',
    oldPassword: 'Current password',
    newPassword: 'New password',
    savePassword: 'Save password',
    wrongPassword: 'Current password is incorrect.',
    passwordChanged: 'Password updated',
    loginFailed: 'Account or password is incorrect.',
    continuePayment: 'Continue payment',
    paid: 'paid',
    created: 'created',
    addCurrentFavorite: 'Add current page',
    noActivePage: 'There is no active page to favorite.',
    historyRemoved: 'History entry removed',
    adBlocker: 'Ad blocker',
    adBlockerDescription: 'Block advertising, analytics, and tracking requests.',
    on: 'On',
    off: 'Off',
    updates: 'Updates',
    updatesDescription: 'Check whether a newer version is available.',
    checkUpdates: 'Check updates',
    updateUnavailable: 'You are on the latest version',
    stripe: 'Stripe',
    payssion: 'Payssion',
    theme: 'Theme',
    system: 'Follow system',
    light: 'Light',
    dark: 'Dark',
    language: 'Language',
    chinese: '中文',
    english: 'English',
    browserSession: 'Browser',
    resetSession: 'Clear browser login state',
    sessionReset: 'Browser login state cleared',
    started: 'Download started',
    stopped: 'Download stopped',
    noUrls: 'Paste at least one video URL first.',
    imported: 'URL list imported',
    downloadDone: 'Completed: {success} succeeded, {failed} failed.',
    downloadError: 'Error: {message}',
    loadFailed: 'Page load failed',
    accountPending: 'Sign in before purchasing a plan.',
    tableFeature: 'Feature',
    featureQuality: 'Best quality downloads',
    featureBatch: 'Batch downloads',
    featurePlaylist: 'Playlists',
    featureBrowser: 'Built-in browser',
    featureSupport: 'Priority support',
    settingsTitle: 'Settings',
    settingsThemeDescription: 'Choose the interface appearance.',
    settingsLanguageDescription: 'Choose the application language.',
    settingsDownloadDir: 'Download directory',
    settingsDownloadDirDescription: 'Video and audio downloads are saved to this folder.',
    chooseDownloadDirectory: 'Choose directory',
    resetDownloadDirectory: 'Reset default',
    maxConcurrentDownloads: 'Concurrent downloads',
    maxConcurrentDownloadsDescription: 'Control the local download concurrency limit.',
    defaultSearchEngine: 'Default search engine',
    defaultSearchEngineDescription: 'Used when address bar text is not a URL.',
    currentVersion: 'Current version',
    currentVersionDescription: 'Local application runtime information.',
    saved: 'Saved',
  },
};

const els = {
  body: document.body,
  title: document.getElementById('window-title'),
  min: document.getElementById('win-min'),
  max: document.getElementById('win-max'),
  close: document.getElementById('win-close'),
  sidebar: Array.from(document.querySelectorAll('.sidebar-btn')),
  downloadBadge: document.getElementById('download-badge'),
  pages: Object.fromEntries(Array.from(document.querySelectorAll('.page')).map((page) => [page.id.replace('page-', ''), page])),
  tabStrip: document.getElementById('tab-strip'),
  tabAdd: document.getElementById('tab-add'),
  homeTagline: document.getElementById('home-tagline'),
  homeSearch: document.getElementById('home-search-input'),
  homeSearchGo: document.getElementById('home-search-go'),
  popularTitle: document.getElementById('popular-title'),
  labels: {
    video: document.getElementById('quick-video-label'),
    social: document.getElementById('quick-social-label'),
    live: document.getElementById('quick-live-label'),
  },
  browserStage: document.getElementById('browser-stage'),
  browserSplit: document.getElementById('browser-split'),
  browserSide: document.getElementById('browser-side'),
  back: document.getElementById('nav-back'),
  forward: document.getElementById('nav-forward'),
  reload: document.getElementById('nav-reload'),
  address: document.getElementById('address-input'),
  addressGo: document.getElementById('address-go'),
  browserSideTitle: document.getElementById('browser-side-title'),
  recommend: document.querySelector('[data-side-tab="recommend"]'),
  allMedia: document.querySelector('[data-side-tab="all"]'),
  recommendCount: document.getElementById('recommend-count'),
  allCount: document.getElementById('all-count'),
  browserQualityLabel: document.getElementById('browser-quality-label'),
  browserQuality: document.getElementById('browser-quality'),
  downloadQuality: document.getElementById('download-quality'),
  cardTitle: document.getElementById('browser-card-title'),
  cardMeta: document.getElementById('browser-card-meta'),
  cardSize: document.getElementById('browser-card-size'),
  candidateList: document.getElementById('candidate-list'),
  browserDownload: document.getElementById('browser-download'),
  browserDownloadMenu: document.getElementById('browser-download-menu'),
  pageFavorite: document.getElementById('page-favorite'),
  pageMediaToggle: document.getElementById('page-media-toggle'),
  pagePin: document.getElementById('page-pin'),
  sideRefresh: document.getElementById('side-refresh'),
  sideClose: document.getElementById('side-close'),
  sideTrash: document.getElementById('side-trash'),
  urlInput: document.getElementById('url-input'),
  outputDir: document.getElementById('output-dir'),
  chooseOutput: document.getElementById('choose-output'),
  importUrls: document.getElementById('import-urls'),
  startDownload: document.getElementById('start-download'),
  cancelDownload: document.getElementById('cancel-download'),
  playlistToggle: document.getElementById('playlist-toggle'),
  audioToggle: document.getElementById('audio-toggle'),
  downloadBody: document.getElementById('download-body'),
  downloadRange: document.getElementById('download-range'),
  clearFinished: document.getElementById('clear-finished'),
  downloadFilters: document.getElementById('download-filters'),
  historyList: document.getElementById('history-list'),
  historyRange: document.getElementById('history-range'),
  historyClear: document.getElementById('history-clear'),
  favoritesCount: document.getElementById('favorites-count'),
  favoritesTitle: document.getElementById('favorites-title'),
  favoritesAddCurrent: document.getElementById('favorites-add-current'),
  planTable: document.getElementById('plan-table'),
  planCards: document.getElementById('plan-cards'),
  purchaseButton: document.getElementById('purchase-button'),
  purchasePrice: document.getElementById('purchase-price'),
  paymentChannels: Array.from(document.querySelectorAll('[data-payment-channel]')),
  payssionMethod: document.getElementById('payssion-method'),
  accountRefresh: document.getElementById('account-refresh'),
  accountAuthPanel: document.getElementById('account-auth-panel'),
  accountProfilePanel: document.getElementById('account-profile-panel'),
  loginModeButton: document.getElementById('login-mode-button'),
  registerModeButton: document.getElementById('register-mode-button'),
  loginButton: document.getElementById('login-button'),
  registerButton: document.getElementById('register-button'),
  loginEmail: document.getElementById('login-email'),
  loginPassword: document.getElementById('login-password'),
  confirmPasswordField: document.getElementById('confirm-password-field'),
  confirmPassword: document.getElementById('confirm-password'),
  logoutButton: document.getElementById('logout-button'),
  accountViewPlans: document.getElementById('account-view-plans'),
  accountChangePasswordToggle: document.getElementById('account-change-password-toggle'),
  accountPasswordPanel: document.getElementById('account-password-panel'),
  oldPassword: document.getElementById('old-password'),
  newPassword: document.getElementById('new-password'),
  savePasswordButton: document.getElementById('save-password-button'),
  cancelPasswordButton: document.getElementById('cancel-password-button'),
  ordersList: document.getElementById('orders-list'),
  themeChips: Array.from(document.querySelectorAll('.chip[data-theme]')),
  langChips: Array.from(document.querySelectorAll('.chip[data-lang]')),
  adBlockChips: Array.from(document.querySelectorAll('.chip[data-adblock]')),
  settingsTitle: document.getElementById('settings-title'),
  settingsOutputDir: document.getElementById('settings-output-dir'),
  settingsChooseOutput: document.getElementById('settings-choose-output'),
  settingsResetOutput: document.getElementById('settings-reset-output'),
  settingsConcurrency: document.getElementById('settings-concurrency'),
  settingsSearchEngine: document.getElementById('settings-search-engine'),
  settingsResetSession: document.getElementById('settings-reset-session'),
  settingsCheckUpdate: document.getElementById('settings-check-update'),
  settingsVersion: document.getElementById('settings-version'),
  toastRegion: document.getElementById('toast-region'),
};

const state = {
  theme: localStorage.getItem(STORAGE_KEYS.theme) || 'system',
  locale: localStorage.getItem(STORAGE_KEYS.locale) || 'zh-CN',
  section: 'browser',
  navSection: 'browser',
  browserSideTab: 'recommend',
  mediaPanelVisible: true,
  tabs: [],
  activeTabId: null,
  tabCounter: 0,
  running: false,
  activeDownloadStatus: 'all',
  downloadPage: 1,
  accountMode: 'login',
  passwordPanelOpen: false,
  account: readObject(STORAGE_KEYS.account),
  users: readArray(STORAGE_KEYS.users),
  orders: readArray(STORAGE_KEYS.orders),
  selectedPlan: 'flagship_month',
  paymentChannel: 'stripe',
  queue: readArray(STORAGE_KEYS.downloads),
  downloadRange: 'all',
  historyRange: 'all',
  history: readArray(STORAGE_KEYS.history),
  favorites: readArray(STORAGE_KEYS.favorites),
  candidatesByTabId: {},
  selectedCandidateIdsByTabId: {},
  settings: {
    outputDir: '',
    resolution: 'best',
    playlist: false,
    audioOnly: false,
    maxConcurrentDownloads: 1,
    searchEngine: 'google',
    adBlocker: true,
  },
  runtimeInfo: null,
};

let webviewResizeFrame = 0;

function readArray(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function readObject(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '{}');
    return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  } catch {
    return {};
  }
}

function text(key, vars = {}) {
  const table = TEXT[state.locale === 'zh-CN' ? 'zh' : 'en'];
  return String(table[key] || TEXT.en[key] || key).replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? '');
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[char]));
}

function saveState() {
  localStorage.setItem(STORAGE_KEYS.theme, state.theme);
  localStorage.setItem(STORAGE_KEYS.locale, state.locale);
  localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(state.settings));
  localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(state.history.slice(0, 150)));
  localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(state.favorites.slice(0, 150)));
  localStorage.setItem(STORAGE_KEYS.downloads, JSON.stringify(state.queue.slice(0, 300)));
  localStorage.setItem(STORAGE_KEYS.account, JSON.stringify(state.account || {}));
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(state.users.slice(0, 300)));
  localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(state.orders.slice(0, 300)));
}

function resolveTheme() {
  if (state.theme !== 'system') return state.theme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme() {
  els.body.dataset.theme = state.theme;
  els.body.dataset.resolvedTheme = resolveTheme();
  els.themeChips.forEach((chip) => chip.classList.toggle('active', chip.dataset.theme === state.theme));
}

function applyLocale() {
  const isZh = state.locale === 'zh-CN';
  document.documentElement.lang = state.locale;
  document.title = text('title');
  els.title.textContent = text('title');
  els.homeTagline.textContent = isZh ? '为视频而生' : 'Built for video browsing';
  els.homeSearch.placeholder = text('search');
  els.homeSearchGo.textContent = text('open');
  els.popularTitle.textContent = text('popular');
  els.labels.video.textContent = text('video');
  els.labels.social.textContent = text('social');
  els.labels.live.textContent = text('live');
  els.address.placeholder = text('browserAddress');
  els.addressGo.textContent = text('visit');
  els.pageMediaToggle.title = state.mediaPanelVisible ? text('closePanel') : text('openPanel');
  els.pageMediaToggle.setAttribute('aria-label', state.mediaPanelVisible ? text('closePanel') : text('openPanel'));
  els.browserSideTitle.textContent = text('mediaPanel');
  els.sideClose.title = text('closePanel');
  els.sideClose.setAttribute('aria-label', text('closePanel'));
  els.browserQualityLabel.textContent = text('quality');
  els.browserDownload.textContent = text('download');
  document.getElementById('download-url-summary').textContent = text('addDownloadTask');
  document.getElementById('output-dir-label').textContent = text('outputFolder');
  document.getElementById('download-quality-label').textContent = text('quality');
  document.getElementById('playlist-label').textContent = text('allowPlaylists');
  document.getElementById('audio-label').textContent = text('audioOnly');
  els.chooseOutput.textContent = text('browse');
  els.importUrls.textContent = text('importList');
  els.cancelDownload.textContent = text('cancel');
  els.startDownload.textContent = text('startDownload');
  els.clearFinished.textContent = text('clearFinished');
  document.getElementById('head-file').textContent = text('fileName');
  document.getElementById('head-progress').textContent = text('progress');
  document.getElementById('head-downloaded').textContent = text('downloaded');
  document.getElementById('head-size').textContent = text('fileSize');
  document.getElementById('head-time').textContent = text('downloadTime');
  document.getElementById('head-status').textContent = text('downloadStatus');
  document.getElementById('head-path').textContent = text('savePath');
  document.getElementById('head-action').textContent = text('action');
  els.historyClear.textContent = text('clear');
  els.favoritesTitle.textContent = text('favoritesTitle');
  els.favoritesAddCurrent.textContent = text('addCurrentFavorite');
  document.getElementById('plans-title').textContent = text('plansTitle');
  document.getElementById('plans-subtitle').textContent = text('plansSubtitle');
  document.getElementById('purchase-title').textContent = text('purchaseTitle');
  els.purchaseButton.textContent = text('purchase');
  updateAccountCopy();
  updateSettingsCopy();
  renderQualitySelect(els.browserQuality);
  renderQualitySelect(els.downloadQuality);
  renderRangeSelect(els.downloadRange, state.downloadRange);
  renderRangeSelect(els.historyRange, state.historyRange);
  els.sidebar.forEach((button) => {
    const label = text(button.dataset.section);
    button.title = label;
    button.setAttribute('aria-label', label);
  });
  els.langChips.forEach((chip) => chip.classList.toggle('active', chip.dataset.lang === state.locale));
  void window.mediaDeck?.setPreferredLanguage?.(state.locale);
  renderTabs();
  renderCandidates();
  renderDownloads();
  renderHistory();
  renderFavorites();
  renderPlans();
}

function updateSettingsCopy() {
  els.settingsTitle.textContent = text('settingsTitle');
  document.getElementById('settings-theme-title').textContent = text('theme');
  document.getElementById('settings-theme-description').textContent = text('settingsThemeDescription');
  document.getElementById('settings-language-title').textContent = text('language');
  document.getElementById('settings-language-description').textContent = text('settingsLanguageDescription');
  document.getElementById('settings-download-dir-title').textContent = text('settingsDownloadDir');
  document.getElementById('settings-download-dir-description').textContent = text('settingsDownloadDirDescription');
  els.settingsChooseOutput.textContent = text('chooseDownloadDirectory');
  els.settingsResetOutput.textContent = text('resetDownloadDirectory');
  document.getElementById('settings-concurrency-title').textContent = text('maxConcurrentDownloads');
  document.getElementById('settings-concurrency-description').textContent = text('maxConcurrentDownloadsDescription');
  document.getElementById('settings-search-title').textContent = text('defaultSearchEngine');
  document.getElementById('settings-search-description').textContent = text('defaultSearchEngineDescription');
  document.getElementById('settings-adblock-title').textContent = text('adBlocker');
  document.getElementById('settings-adblock-description').textContent = text('adBlockerDescription');
  els.adBlockChips.forEach((chip) => {
    chip.textContent = text(chip.dataset.adblock === 'on' ? 'on' : 'off');
  });
  document.getElementById('settings-session-title').textContent = text('browserSession');
  document.getElementById('settings-session-description').textContent = text('resetSession');
  els.settingsResetSession.textContent = text('resetSession');
  document.getElementById('settings-update-title').textContent = text('updates');
  document.getElementById('settings-update-description').textContent = text('updatesDescription');
  els.settingsCheckUpdate.textContent = text('checkUpdates');
  document.getElementById('settings-version-title').textContent = text('currentVersion');
  document.getElementById('settings-version-description').textContent = text('currentVersionDescription');
}

function renderQualitySelect(select) {
  select.innerHTML = QUALITY_OPTIONS.map((option) => {
    const label = option[state.locale === 'zh-CN' ? 'zh' : 'en'];
    return `<option value="${option.value}">${escapeHtml(label)}</option>`;
  }).join('');
  select.value = state.settings.resolution;
}

function renderRangeSelect(select, selected) {
  select.innerHTML = [
    { value: 'all', label: text('allTime') },
    { value: 'today', label: text('today') },
    { value: 'yesterday', label: text('yesterday') },
    { value: 'last7', label: text('last7') },
    { value: 'last30', label: text('last30') },
  ].map((option) => `<option value="${option.value}">${escapeHtml(option.label)}</option>`).join('');
  select.value = selected;
}

function syncSettingsControls() {
  els.outputDir.value = state.settings.outputDir || '';
  els.settingsOutputDir.value = state.settings.outputDir || '';
  els.browserQuality.value = state.settings.resolution;
  els.downloadQuality.value = state.settings.resolution;
  els.playlistToggle.checked = state.settings.playlist;
  els.audioToggle.checked = state.settings.audioOnly;
  els.settingsConcurrency.value = String(state.settings.maxConcurrentDownloads || 1);
  els.settingsSearchEngine.value = state.settings.searchEngine || 'google';
  els.adBlockChips.forEach((chip) => {
    const enabled = state.settings.adBlocker !== false;
    chip.classList.toggle('active', (chip.dataset.adblock === 'on') === enabled);
  });
  els.settingsVersion.textContent = `${state.runtimeInfo?.appName || text('title')} ${state.runtimeInfo?.version || '-'}`;
}

function updateDownloadBadge() {
  const hasActiveDownloads = state.running || state.queue.some((item) => {
    const status = normalizeDownloadState(item.status || item.state);
    return status === 'queued' || status === 'downloading';
  });
  els.downloadBadge.hidden = !hasActiveDownloads;
}

function syncMediaPanelVisibility() {
  const visible = state.section === 'browser' && state.mediaPanelVisible;
  els.browserSplit.classList.toggle('has-media-panel', visible);
  els.browserSide.hidden = !visible;
  els.pageMediaToggle.classList.toggle('active', visible);
  els.pageMediaToggle.title = visible ? text('closePanel') : text('openPanel');
  els.pageMediaToggle.setAttribute('aria-label', visible ? text('closePanel') : text('openPanel'));
  scheduleActiveWebviewResize();
}

function resizeActiveWebview() {
  webviewResizeFrame = 0;
  const tab = activeTab();
  if (!tab || state.section !== 'browser') return;
  const rect = els.browserStage.getBoundingClientRect();
  const width = Math.max(1, Math.round(rect.width));
  const height = Math.max(1, Math.round(rect.height));
  if (width <= 1 || height <= 1) return;
  state.tabs.forEach((item) => {
    if (item.id === tab.id) {
      item.webview.style.width = `${width}px`;
      item.webview.style.height = `${height}px`;
    } else {
      item.webview.style.width = '';
      item.webview.style.height = '';
    }
  });
}

function scheduleActiveWebviewResize() {
  if (webviewResizeFrame) cancelAnimationFrame(webviewResizeFrame);
  webviewResizeFrame = requestAnimationFrame(() => {
    resizeActiveWebview();
    requestAnimationFrame(resizeActiveWebview);
  });
}

function setSection(section) {
  const requestedSection = section;
  if (section === 'browser' && !state.tabs.length) section = 'home';
  state.section = section;
  state.navSection = requestedSection === 'home' ? 'browser' : requestedSection;
  Object.entries(els.pages).forEach(([key, page]) => page.classList.toggle('active', key === section));
  els.sidebar.forEach((button) => button.classList.toggle('active', button.dataset.section === state.navSection));
  if (!els.sidebar.some((button) => button.dataset.section === state.navSection) && document.activeElement?.classList?.contains('sidebar-btn')) {
    document.activeElement.blur();
  }
  renderTabs();
  setVisibleWebviews();
  syncMediaPanelVisibility();
  renderCandidates();
  updateBrowserControls();
}

function createTab(url = HOME_URL, title = text('newTab')) {
  const webview = document.createElement('webview');
  const tab = { id: `tab-${++state.tabCounter}`, url, title, webview, ready: false, webContentsId: null };
  webview.className = 'browser-view';
  webview.setAttribute('partition', FALLBACK_PARTITION);
  webview.setAttribute('allowpopups', 'true');
  webview.src = url;
  els.browserStage.appendChild(webview);
  attachWebviewEvents(tab);
  state.tabs.push(tab);
  state.activeTabId = tab.id;
  renderTabs();
  setVisibleWebviews();
  updateBrowserControls();
  scheduleActiveWebviewResize();
  return tab;
}

function activeTab() {
  return state.tabs.find((tab) => tab.id === state.activeTabId) || null;
}

function attachWebviewEvents(tab) {
  const rememberWebContentsId = () => {
    try {
      const id = Number(tab.webview.getWebContentsId?.());
      if (Number.isFinite(id) && id > 0) tab.webContentsId = id;
    } catch {
      // The webview id is only available after Electron attaches the guest.
    }
  };
  const sync = () => {
    rememberWebContentsId();
    tab.url = tab.webview.getURL() || tab.url;
    if (tab.id === state.activeTabId) updateBrowserControls();
  };
  tab.webview.addEventListener('did-attach', rememberWebContentsId);
  tab.webview.addEventListener('dom-ready', () => {
    tab.ready = true;
    sync();
    scheduleActiveWebviewResize();
  });
  tab.webview.addEventListener('did-start-loading', sync);
  tab.webview.addEventListener('did-navigate', () => {
    sync();
    addHistory(tab.title || tab.url, tab.url);
  });
  tab.webview.addEventListener('did-navigate-in-page', sync);
  tab.webview.addEventListener('did-stop-loading', () => {
    sync();
    scheduleActiveWebviewResize();
  });
  tab.webview.addEventListener('page-title-updated', (event) => {
    tab.title = event.title || tab.title;
    renderTabs();
    if (tab.id === state.activeTabId) updateBrowserControls();
  });
  tab.webview.addEventListener('did-fail-load', (event) => {
    if (event.isMainFrame && event.errorCode !== -3) toast(`${text('loadFailed')}: ${event.validatedURL || tab.url}`);
  });
}

function renderTabs() {
  els.tabStrip.innerHTML = '';
  const home = document.createElement('button');
  home.className = `tab ${state.section === 'home' ? 'active' : ''}`;
  home.type = 'button';
  home.innerHTML = '<span class="tab-icon">⌂</span><span class="tab-title"></span>';
  home.querySelector('.tab-title').textContent = text('home');
  home.addEventListener('click', () => setSection('home'));
  els.tabStrip.appendChild(home);

  state.tabs.forEach((tab) => {
    const button = document.createElement('button');
    button.className = `tab ${state.section === 'browser' && tab.id === state.activeTabId ? 'active' : ''}`;
    button.type = 'button';
    button.dataset.tabId = tab.id;
    button.innerHTML = `<span class="tab-icon">●</span><span class="tab-title">${escapeHtml(tab.title || text('newTab'))}</span><span class="tab-close">×</span>`;
    button.addEventListener('click', (event) => {
      if (event.target.classList.contains('tab-close')) {
        closeTab(tab.id);
        return;
      }
      state.activeTabId = tab.id;
      setSection('browser');
    });
    els.tabStrip.appendChild(button);
  });
}

function closeTab(id) {
  const index = state.tabs.findIndex((tab) => tab.id === id);
  if (index < 0) return;
  state.tabs[index].webview.remove();
  state.tabs.splice(index, 1);
  if (state.activeTabId === id) state.activeTabId = state.tabs[index]?.id || state.tabs[index - 1]?.id || null;
  delete state.candidatesByTabId[id];
  delete state.selectedCandidateIdsByTabId[id];
  if (!state.tabs.length) {
    state.section = 'home';
    renderTabs();
    setVisibleWebviews();
    renderCandidates();
    updateBrowserControls();
    return;
  }
  renderTabs();
  setVisibleWebviews();
  renderCandidates();
  updateBrowserControls();
  scheduleActiveWebviewResize();
}

function setVisibleWebviews() {
  state.tabs.forEach((tab) => {
    tab.webview.classList.toggle('is-active', state.section === 'browser' && tab.id === state.activeTabId);
  });
  scheduleActiveWebviewResize();
}

function getVisibleWebviews() {
  return state.tabs.filter((tab) => tab.webview.classList.contains('is-active'));
}

function getBrowserLayoutSnapshot() {
  resizeActiveWebview();
  const activePageIds = Array.from(document.querySelectorAll('.page.active')).map((page) => page.id);
  const stageRect = els.browserStage.getBoundingClientRect();
  const splitRect = document.querySelector('.browser-split')?.getBoundingClientRect();
  const sideRect = document.querySelector('.browser-side')?.getBoundingClientRect();
  const activeView = activeTab()?.webview || null;
  const activeViewRect = activeView?.getBoundingClientRect();
  const activeViewStyle = activeView ? getComputedStyle(activeView) : null;
  const activeCandidates = mediaCandidatesForTab();
  return {
    activePageIds,
    visibleWebviews: getVisibleWebviews().length,
    stageWidth: Math.round(stageRect.width),
    stageHeight: Math.round(stageRect.height),
    splitWidth: Math.round(splitRect?.width || 0),
    sideWidth: Math.round(sideRect?.width || 0),
    viewWidth: Math.round(activeViewRect?.width || 0),
    viewHeight: Math.round(activeViewRect?.height || 0),
    viewPosition: activeViewStyle?.position || '',
    viewDisplay: activeViewStyle?.display || '',
    viewVisibility: activeViewStyle?.visibility || '',
    viewInlineHeight: activeView?.style.height || '',
    viewInlineWidth: activeView?.style.width || '',
    mediaPanelVisible: Boolean(els.browserSide && getComputedStyle(els.browserSide).display !== 'none'),
    mediaPanelHeight: Math.round(sideRect?.height || 0),
    activeMediaCandidates: activeCandidates.length,
    activeMediaTab: state.browserSideTab,
  };
}

function updateBrowserControls() {
  const tab = activeTab();
  const view = tab?.webview;
  const ready = Boolean(tab?.ready && view);
  els.back.disabled = !ready || !view.canGoBack();
  els.forward.disabled = !ready || !view.canGoForward();
  els.reload.disabled = !view;
  els.address.disabled = !view;
  els.addressGo.disabled = !view;
  els.address.value = tab?.url || '';
  syncFavoriteButton();
}

function normalizeUrl(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(raw)) return raw;
  if (/^[\w.-]+\.[a-z]{2,}(\/.*)?$/i.test(raw)) return `https://${raw}`;
  const searchPrefix = SEARCH_ENGINES[state.settings.searchEngine] || SEARCH_ENGINES.google;
  return `${searchPrefix}${encodeURIComponent(raw)}`;
}

function openUrl(value, title = text('newTab')) {
  const url = normalizeUrl(value);
  if (!url) return;
  createTab(url, title);
  setSection('browser');
}

function navigateActive(value) {
  const url = normalizeUrl(value);
  if (!url) return;
  const tab = activeTab();
  if (!tab) return openUrl(url);
  tab.webview.loadURL(url);
}

function addHistory(title, url) {
  if (!url || url === 'about:blank') return;
  state.history = [{ title: title || url, url, time: new Date().toISOString() }, ...state.history.filter((item) => item.url !== url)].slice(0, 150);
  saveState();
  renderHistory();
}

function removeHistory(url) {
  state.history = state.history.filter((item) => item.url !== url);
  saveState();
  renderHistory();
  toast(text('historyRemoved'));
}

function siteIcon(url) {
  try {
    const host = new URL(url).hostname;
    return Object.values(QUICK_SITES).flat().find((item) => host.includes(new URL(item.url).hostname.replace('www.', '')))
      || { color: '#2b3440', short: '●' };
  } catch {
    return { color: '#2b3440', short: '●' };
  }
}

function renderQuickSites() {
  Object.entries(QUICK_SITES).forEach(([group, sites]) => {
    const grid = document.querySelector(`.quick-cards[data-group="${group}"]`);
    if (!grid) return;
    grid.innerHTML = '';
    sites.forEach((site) => {
      const button = document.createElement('button');
      button.className = 'site-card';
      button.type = 'button';
      button.innerHTML = `<span class="site-icon"><img src="${escapeHtml(site.icon)}" alt="" /></span><span class="site-name">${escapeHtml(site.name)}</span>`;
      button.addEventListener('click', () => openUrl(site.url, site.name));
      grid.appendChild(button);
    });
  });
}

function formatTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';
  return new Intl.DateTimeFormat(state.locale === 'zh-CN' ? 'zh-CN' : 'en-US', {
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
  }).format(date);
}

function getFileName(value) {
  const raw = String(value || '');
  if (!raw) return '';
  const normalized = raw.replace(/\\/g, '/').split('/').filter(Boolean).pop() || raw;
  try {
    return decodeURIComponent(normalized);
  } catch {
    return normalized;
  }
}

function normalizeDownloadState(status) {
  const value = String(status || 'queued').toLowerCase();
  if (value === 'waiting') return 'queued';
  if (value === 'failed') return 'error';
  if (value === 'canceled') return 'cancelled';
  if (value === 'finished') return 'completed';
  if (['queued', 'downloading', 'completed', 'error', 'cancelled'].includes(value)) return value;
  return 'queued';
}

function isTerminalDownloadState(status) {
  return ['completed', 'error', 'cancelled'].includes(normalizeDownloadState(status));
}

function formatBytes(value) {
  const size = Number(value);
  if (!Number.isFinite(size) || size <= 0) return '-';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let next = size;
  for (const unit of units) {
    if (next < 1024 || unit === units[units.length - 1]) return `${next.toFixed(next >= 10 ? 0 : 1)} ${unit}`;
    next /= 1024;
  }
  return '-';
}

function isInRange(time, range) {
  if (range === 'all') return true;
  const date = new Date(time);
  if (Number.isNaN(date.getTime())) return false;
  const now = new Date();
  const startOf = (target) => {
    const next = new Date(target);
    next.setHours(0, 0, 0, 0);
    return next.getTime();
  };
  const todayStart = startOf(now);
  const dateStart = startOf(date);
  const dayMs = 24 * 60 * 60 * 1000;
  if (range === 'today') return dateStart === todayStart;
  if (range === 'yesterday') return dateStart === todayStart - dayMs;
  if (range === 'last7') return dateStart >= todayStart - 6 * dayMs;
  if (range === 'last30') return dateStart >= todayStart - 29 * dayMs;
  return true;
}

function tabForWebContentsId(webContentsId) {
  const id = Number(webContentsId);
  if (!Number.isFinite(id) || id <= 0) return null;
  return state.tabs.find((tab) => Number(tab.webContentsId) === id) || null;
}

function mediaTabIdForCandidate(candidate) {
  return tabForWebContentsId(candidate?.webContentsId)?.id || state.activeTabId;
}

function mediaCandidatesForTab(tabId = state.activeTabId) {
  return tabId ? state.candidatesByTabId[tabId] || [] : [];
}

function setMediaCandidatesForTab(tabId, candidates) {
  if (!tabId) return;
  const nextCandidates = Array.isArray(candidates) ? candidates.slice(0, 80) : [];
  state.candidatesByTabId[tabId] = nextCandidates;
  const selectedId = state.selectedCandidateIdsByTabId[tabId];
  state.selectedCandidateIdsByTabId[tabId] = nextCandidates.some((item) => item.id === selectedId)
    ? selectedId
    : nextCandidates[0]?.id || null;
}

function clearMediaCandidatesForTab(tabId = state.activeTabId) {
  if (!tabId) return;
  state.candidatesByTabId[tabId] = [];
  state.selectedCandidateIdsByTabId[tabId] = null;
}

function addCandidate(candidate) {
  if (!candidate?.url) return;
  const tabId = mediaTabIdForCandidate(candidate);
  if (!tabId) return;
  const current = mediaCandidatesForTab(tabId);
  setMediaCandidatesForTab(tabId, [candidate, ...current.filter((item) => item.url !== candidate.url)]);
  if (tabId === state.activeTabId) renderCandidates();
}

function selectedCandidate() {
  const candidates = mediaCandidatesForTab();
  const selectedId = state.selectedCandidateIdsByTabId[state.activeTabId];
  return candidates.find((item) => item.id === selectedId) || candidates[0] || null;
}

function renderCandidates() {
  const activeCandidates = mediaCandidatesForTab();
  const rows = state.browserSideTab === 'recommend' ? activeCandidates.slice(0, 1) : activeCandidates;
  const selected = selectedCandidate();
  els.recommend.childNodes[0].textContent = `${text('recommend')} `;
  els.allMedia.childNodes[0].textContent = `${text('all')} `;
  els.recommendCount.textContent = activeCandidates.length ? '1' : '0';
  els.allCount.textContent = String(activeCandidates.length);
  els.recommend.classList.toggle('active', state.browserSideTab === 'recommend');
  els.allMedia.classList.toggle('active', state.browserSideTab === 'all');
  if (!selected) {
    els.cardTitle.textContent = text('noMedia');
    els.cardMeta.textContent = text('noMediaHint');
    els.cardSize.textContent = '-';
    els.browserDownload.disabled = true;
  } else {
    els.cardTitle.textContent = selected.title || selected.host || selected.url;
    els.cardMeta.textContent = [selected.extension || selected.mime || selected.resourceType, selected.host].filter(Boolean).join(' · ');
    els.cardSize.textContent = formatBytes(selected.size);
    els.browserDownload.disabled = false;
  }
  if (!rows.length) {
    els.candidateList.innerHTML = `<div class="empty-state small"><div class="empty-icon">◇</div><div class="empty-title">${text('noMedia')}</div></div>`;
    return;
  }
  els.candidateList.innerHTML = rows.map((item) => `
    <button class="candidate-item${item.id === selected?.id ? ' active' : ''}" type="button" data-candidate="${escapeHtml(item.id)}">
      <span class="candidate-kind">${escapeHtml((item.extension || item.resourceType || 'media').toUpperCase())}</span>
      <span class="candidate-main">
        <strong>${escapeHtml(item.title || item.host || item.url)}</strong>
        <small>${escapeHtml(item.host || '')} · ${escapeHtml(formatBytes(item.size))}</small>
      </span>
    </button>
  `).join('');
  els.candidateList.querySelectorAll('[data-candidate]').forEach((button) => {
    button.addEventListener('click', () => {
      state.selectedCandidateIdsByTabId[state.activeTabId] = button.dataset.candidate;
      renderCandidates();
    });
  });
}

function setFavorite(url, title, enabled) {
  if (!url) return;
  const exists = state.favorites.some((item) => item.url === url);
  if (enabled && !exists) state.favorites.unshift({ title: title || url, url, time: new Date().toISOString() });
  if (!enabled && exists) state.favorites = state.favorites.filter((item) => item.url !== url);
  saveState();
  renderFavorites();
  syncFavoriteButton();
}

function addCurrentFavorite() {
  const tab = activeTab();
  if (!tab?.url) return toast(text('noActivePage'));
  setFavorite(tab.url, tab.title || tab.url, true);
  toast(text('saved'));
}

function syncFavoriteButton() {
  const tab = activeTab();
  const isFavorite = Boolean(tab) && state.favorites.some((item) => item.url === tab.url);
  els.pageFavorite.classList.toggle('active', isFavorite);
  els.pageFavorite.textContent = isFavorite ? '★' : '☆';
}

function readUrls() {
  return els.urlInput.value.split(/\r?\n/).map((item) => item.trim()).filter(Boolean);
}

function queueUrls(urls) {
  const now = new Date().toISOString();
  const existing = new Set(state.queue.map((item) => item.url));
  const rows = urls.filter((url) => !existing.has(url)).map((url) => ({
    id: `dl-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    downloadId: `dl-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    url,
    title: url,
    fileName: getFileName(url) || url,
    percent: 0,
    downloaded: '-',
    speed: '-',
    size: '-',
    time: now,
    createdAt: Date.now(),
    status: 'queued',
    state: 'queued',
    path: state.settings.outputDir,
    savePath: state.settings.outputDir,
  }));
  state.queue = [...rows, ...state.queue].slice(0, 300);
  state.downloadPage = 1;
  saveState();
  updateDownloadBadge();
  renderDownloads();
}

async function startDownload() {
  const urls = readUrls();
  if (!urls.length) {
    toast(text('noUrls'));
    return;
  }
  queueUrls(urls);
  const activeUrls = [...new Set(urls)];
  state.queue.forEach((item) => {
    if (activeUrls.includes(item.url)) {
      item.status = 'downloading';
      item.state = 'downloading';
      item.percent = item.percent || 0;
      item.path = state.settings.outputDir;
      item.savePath = item.savePath || state.settings.outputDir;
      item.fileName = item.fileName || getFileName(item.title || item.url) || item.url;
      item.createdAt = item.createdAt || new Date(item.time || Date.now()).getTime();
    }
  });
  saveState();
  updateDownloadBadge();
  renderDownloads();
  try {
    await window.mediaDeck.startDownload({
      urls: activeUrls,
      outputDir: state.settings.outputDir,
      resolution: state.settings.resolution,
      playlist: state.settings.playlist,
      audioOnly: state.settings.audioOnly,
      jsRuntime: 'auto',
      ffmpegLocation: null,
    });
    state.running = true;
    updateDownloadBadge();
    toast(text('started'));
  } catch (error) {
    markActiveDownloads('failed');
    toast(error?.message || String(error));
  }
}

function markActiveDownloads(status) {
  const normalizedStatus = normalizeDownloadState(status);
  state.queue.forEach((item) => {
    if (normalizeDownloadState(item.status || item.state) === 'downloading') {
      item.status = normalizedStatus;
      item.state = normalizedStatus;
    }
  });
  saveState();
  updateDownloadBadge();
  renderDownloads();
}

function renderDownloads() {
  const normalizedQueue = state.queue.map((item) => ({
    ...item,
    state: normalizeDownloadState(item.state || item.status),
    status: normalizeDownloadState(item.status || item.state),
    createdAt: item.createdAt || new Date(item.time || Date.now()).getTime(),
    time: item.time || new Date(item.createdAt || Date.now()).toISOString(),
    fileName: item.fileName || getFileName(item.title || item.path || item.url) || item.url,
    savePath: item.savePath || item.path || state.settings.outputDir,
    path: item.path || item.savePath || state.settings.outputDir,
  }));
  state.queue = normalizedQueue;
  updateDownloadBadge();
  const counts = {
    all: normalizedQueue.length,
    queued: normalizedQueue.filter((item) => item.state === 'queued').length,
    downloading: normalizedQueue.filter((item) => item.state === 'downloading').length,
    completed: normalizedQueue.filter((item) => item.state === 'completed').length,
    error: normalizedQueue.filter((item) => item.state === 'error').length,
  };
  els.clearFinished.disabled = normalizedQueue.every((item) => !isTerminalDownloadState(item.state));
  els.downloadFilters.querySelectorAll('.downloads-tab').forEach((button) => {
    const status = button.dataset.status;
    button.classList.toggle('is-active', status === state.activeDownloadStatus);
    button.setAttribute('aria-selected', String(status === state.activeDownloadStatus));
    button.firstChild.textContent = `${text(status === 'all' ? 'all' : status)} `;
    button.querySelector('.downloads-tab-count').textContent = String(counts[status] || 0);
  });
  const rows = normalizedQueue
    .filter((item) => state.activeDownloadStatus === 'all' || item.state === state.activeDownloadStatus)
    .filter((item) => isInRange(item.time, state.downloadRange));
  if (!rows.length) {
    els.downloadBody.innerHTML = `<div class="downloads-empty"><div class="downloads-empty-icon">↓</div><p>${text('noDownloads')}</p></div>`;
    return;
  }
  const totalPages = Math.max(1, Math.ceil(rows.length / DOWNLOAD_PAGE_SIZE));
  state.downloadPage = Math.max(1, Math.min(state.downloadPage || 1, totalPages));
  const startIndex = (state.downloadPage - 1) * DOWNLOAD_PAGE_SIZE;
  const visibleRows = rows.slice(startIndex, startIndex + DOWNLOAD_PAGE_SIZE);
  const pagination = totalPages > 1 ? `
    <nav class="downloads-pagination" aria-label="${escapeHtml(text('downloads'))}">
      <button class="downloads-pagination-button el-button is-previous" type="button" data-download-page="prev" ${state.downloadPage <= 1 ? 'disabled' : ''} aria-label="${escapeHtml(text('previousPage'))}">
        ${escapeHtml(text('previousPage'))}
      </button>
      <span class="downloads-pagination-status">${escapeHtml(text('pageStatus', { current: state.downloadPage, total: totalPages }))}</span>
      <button class="downloads-pagination-button el-button is-next" type="button" data-download-page="next" ${state.downloadPage >= totalPages ? 'disabled' : ''} aria-label="${escapeHtml(text('nextPage'))}">
        ${escapeHtml(text('nextPage'))}
      </button>
    </nav>
  ` : '';
  els.downloadBody.innerHTML = visibleRows.map((item) => {
    const percent = Math.max(0, Math.min(100, Number(item.percent || 0)));
    const id = escapeHtml(item.id || item.downloadId);
    const canOpen = item.state === 'completed' && item.path && item.path !== state.settings.outputDir;
    const canRetry = ['error', 'cancelled'].includes(item.state);
    const thumbnail = item.thumbnailUrl
      ? `<span class="download-thumbnail has-thumbnail"><img src="${escapeHtml(item.thumbnailUrl)}" alt="${escapeHtml(item.fileName)}" loading="lazy" /></span>`
      : '<span class="download-thumbnail" aria-hidden="true">▶</span>';
    const actionButtons = [
      canOpen ? `<button class="el-button" type="button" title="${text('openFile')}" aria-label="${text('openFile')}" data-open="${id}">↗</button>` : '',
      item.savePath ? `<button class="el-button" type="button" title="${text('openFolder')}" aria-label="${text('openFolder')}" data-folder="${id}">□</button>` : '',
      canRetry ? `<button class="el-button" type="button" title="${text('retry')}" aria-label="${text('retry')}" data-retry="${id}">↻</button>` : '',
      `<button class="el-button" type="button" title="${text('remove')}" aria-label="${text('remove')}" data-remove="${id}">×</button>`,
    ].filter(Boolean).join('');
    return `
      <article class="downloads-row download-item-row">
        <div class="download-title-cell">
          ${thumbnail}
          <span class="download-file-name" title="${escapeHtml(item.fileName)}"><bdi>${escapeHtml(item.fileName)}</bdi></span>
        </div>
        <div class="download-progress-cell">
          <div class="download-list-progress"><div class="download-progress-track"><span style="width:${percent}%"></span></div></div>
          <div class="download-progress-meta">
            <span class="download-progress-speed"><bdi>${escapeHtml(item.speed || item.downloaded || '-')}</bdi></span>
            <span class="download-progress-ratio"><bdi>${item.state === 'completed' ? '100' : Math.round(percent)}%</bdi></span>
          </div>
        </div>
        <div class="download-text-cell download-size-cell"><bdi>${escapeHtml(item.downloaded || '0 B')}</bdi></div>
        <div class="download-text-cell download-size-cell"><bdi>${escapeHtml(item.size || '-')}</bdi></div>
        <div class="download-text-cell download-time-cell" title="${escapeHtml(formatTime(item.time))}">${escapeHtml(formatTime(item.time))}</div>
        <div class="download-status-cell is-${escapeHtml(item.state)}">${escapeHtml(text(item.state))}</div>
        <div class="download-path-cell" title="${escapeHtml(item.savePath || item.path || '')}"><bdi>${escapeHtml(item.savePath || item.path || text('unknownPath'))}</bdi></div>
        <div class="download-actions-cell">${actionButtons}</div>
      </article>
    `;
  }).join('') + pagination;
  els.downloadBody.querySelectorAll('[data-download-page]').forEach((button) => {
    button.addEventListener('click', () => {
      const direction = button.dataset.downloadPage;
      state.downloadPage += direction === 'next' ? 1 : -1;
      renderDownloads();
    });
  });
  els.downloadBody.querySelectorAll('[data-open]').forEach((button) => {
    button.addEventListener('click', () => {
      const item = state.queue.find((row) => (row.id || row.downloadId) === button.dataset.open);
      if (item?.path) void window.mediaDeck.openPath(item.path);
    });
  });
  els.downloadBody.querySelectorAll('[data-folder]').forEach((button) => {
    button.addEventListener('click', () => {
      const item = state.queue.find((row) => (row.id || row.downloadId) === button.dataset.folder);
      const target = item?.path && item.path !== item.savePath ? item.path : item?.savePath;
      if (target) void window.mediaDeck.showItemInFolder(target);
    });
  });
  els.downloadBody.querySelectorAll('[data-retry]').forEach((button) => {
    button.addEventListener('click', () => {
      const item = state.queue.find((row) => (row.id || row.downloadId) === button.dataset.retry);
      if (!item?.url) return;
      els.urlInput.value = item.url;
      void startDownload();
    });
  });
  els.downloadBody.querySelectorAll('[data-remove]').forEach((button) => {
    button.addEventListener('click', () => {
      state.queue = state.queue.filter((item) => (item.id || item.downloadId) !== button.dataset.remove);
      saveState();
      updateDownloadBadge();
      renderDownloads();
    });
  });
}

function renderHistory() {
  const rows = state.history.filter((item) => isInRange(item.time, state.historyRange));
  if (!rows.length) {
    els.historyList.innerHTML = `<div class="history-empty"><div class="history-empty-icon">○</div><p>${text('noHistory')}</p></div>`;
    return;
  }
  els.historyList.innerHTML = rows.map((item) => {
    const icon = siteIcon(item.url);
    return `<div class="history-row"><div class="favorite-site-icon" style="background:${icon.color};color:#fff">${icon.short}</div><button class="history-open history-content" type="button" data-url="${escapeHtml(item.url)}"><div class="history-title">${escapeHtml(item.title)}</div><div class="history-url">${escapeHtml(item.url)}</div></button><time class="history-time">${escapeHtml(formatTime(item.time))}</time><button class="ghost-button history-remove" type="button" data-history-remove="${escapeHtml(item.url)}">${text('remove')}</button></div>`;
  }).join('');
  els.historyList.querySelectorAll('.history-open').forEach((button) => {
    button.addEventListener('click', () => openUrl(button.dataset.url));
  });
  els.historyList.querySelectorAll('[data-history-remove]').forEach((button) => {
    button.addEventListener('click', () => removeHistory(button.dataset.historyRemove));
  });
}

function renderFavorites() {
  els.favoritesCount.textContent = String(state.favorites.length);
  const content = document.getElementById('favorites-content');
  if (!state.favorites.length) {
    content.innerHTML = `<div class="favorites-empty favorites-view-empty"><div class="favorites-empty-icon">☆</div><p>${text('noFavorites')}</p></div>`;
    return;
  }
  content.innerHTML = `<div class="favorites-view-list favorite-list">${state.favorites.map((item) => {
    const icon = siteIcon(item.url);
    return `<div class="history-row favorite-row favorites-view-row"><div class="favorite-site-icon" style="background:${icon.color};color:#fff">${icon.short}</div><button type="button" class="history-open history-content" data-url="${escapeHtml(item.url)}"><div class="history-title">${escapeHtml(item.title)}</div><div class="history-url">${escapeHtml(item.url)}</div></button><button class="ghost-button favorite-remove-button" type="button" data-favorite-remove="${escapeHtml(item.url)}">${text('remove')}</button></div>`;
  }).join('')}</div>`;
  content.querySelectorAll('.history-open').forEach((button) => button.addEventListener('click', () => openUrl(button.dataset.url)));
  content.querySelectorAll('[data-favorite-remove]').forEach((button) => {
    button.addEventListener('click', () => setFavorite(button.dataset.favoriteRemove, '', false));
  });
}

function renderPlans() {
  const selected = getSelectedPlan();
  els.planCards.innerHTML = `
    <div class="account-plan-grid-label">${text('tableFeature')}</div>
    ${['free', 'pro', 'flagship', 'lifetime'].map((level) => {
      const plan = PLAN_CATALOG[level];
      const selectedLevel = selected.level === level;
      const choices = [
        plan.monthly ? { code: `${level}_month`, label: text('month'), value: plan.monthly } : null,
        plan.yearly ? { code: `${level}_year`, label: text('year'), value: plan.yearly } : null,
        plan.lifetime ? { code: 'lifetime', label: text('once'), value: plan.lifetime } : null,
      ].filter(Boolean);
      return `
        <article class="account-plan-card${selectedLevel ? ' is-selected' : ''}${state.account?.plan === level ? ' is-current' : ''}">
          <div class="account-plan-card-header"><span>${escapeHtml(text(level))}</span><strong>${escapeHtml(plan.monthly || plan.lifetime || plan.price)}</strong></div>
          ${state.account?.plan === level ? `<span class="account-current-plan">${text('currentPlan')}</span>` : ''}
          ${choices.length ? `<div class="account-plan-options">${choices.map((choice) => `<button class="account-plan-option${state.selectedPlan === choice.code ? ' is-active' : ''}" data-plan-code="${escapeHtml(choice.code)}" type="button"><span>${escapeHtml(choice.label)}</span><bdi>${escapeHtml(choice.value)}</bdi></button>`).join('')}</div>` : `<span class="plan-tag">${text('included')}</span>`}
        </article>
      `;
    }).join('')}
  `;
  document.getElementById('purchase-current').textContent = `${text(selected.level)} · ${selected.billingLabel}`;
  els.purchasePrice.textContent = selected.price;
  els.purchaseButton.textContent = state.account?.email ? text('payNow') : text('purchase');
  els.paymentChannels.forEach((button) => button.classList.toggle('is-active', button.dataset.paymentChannel === state.paymentChannel));
  els.payssionMethod.classList.toggle('hidden', state.paymentChannel !== 'payssion');
  els.planTable.innerHTML = `
    <div class="account-comparison-row account-comparison-header"><div>${text('tableFeature')}</div><div>${text('free')}</div><div>${text('pro')}</div><div>${text('flagship')}</div><div>${text('lifetime')}</div></div>
    ${[
      ['featureQuality', '1080p', '4K', '4K', '4K'],
      ['featureBatch', '-', '✓', '✓', '✓'],
      ['featurePlaylist', '-', '✓', '✓', '✓'],
      ['maxConcurrentDownloads', '1', '2', '3', '3'],
      ['featureBrowser', '✓', '✓', '✓', '✓'],
      ['featureSupport', '-', '-', '✓', '✓'],
    ].map(([key, ...values]) => `<div class="account-comparison-row"><div>${text(key)}</div>${values.map((value, index) => `<div class="${['free', 'pro', 'flagship', 'lifetime'][index] === selected.level ? 'is-selected-plan' : ''}">${value}</div>`).join('')}</div>`).join('')}
  `;
  els.planCards.querySelectorAll('[data-plan-code]').forEach((button) => {
    button.addEventListener('click', () => {
      state.selectedPlan = button.dataset.planCode;
      renderPlans();
      saveState();
    });
  });
}

function findLocalUser(email) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  return state.users.find((user) => String(user.email || '').toLowerCase() === normalizedEmail) || null;
}

function upsertLocalUser(user) {
  const normalizedEmail = String(user.email || '').trim().toLowerCase();
  state.users = [
    { ...user, email: normalizedEmail, updatedAt: new Date().toISOString() },
    ...state.users.filter((item) => String(item.email || '').toLowerCase() !== normalizedEmail),
  ].slice(0, 300);
}

function getSelectedPlan() {
  const code = state.selectedPlan || 'flagship_month';
  if (code === 'lifetime') return { code, level: 'lifetime', billingLabel: text('once'), price: PLAN_CATALOG.lifetime.lifetime };
  const [level, billing] = code.split('_');
  const plan = PLAN_CATALOG[level] ? level : 'flagship';
  const isYear = billing === 'year';
  return {
    code: `${plan}_${isYear ? 'year' : 'month'}`,
    level: plan,
    billingLabel: text(isYear ? 'year' : 'month'),
    price: PLAN_CATALOG[plan][isYear ? 'yearly' : 'monthly'] || PLAN_CATALOG.flagship.monthly,
  };
}

function updateAccountCopy() {
  document.getElementById('account-title').textContent = text('accountTitle');
  document.getElementById('account-subtitle').textContent = state.account?.email ? text('signedInDescription') : text('signedOutDescription');
  const page = els.pages.account;
  page.querySelector('.login-title').textContent = text('login');
  page.querySelector('.login-subtitle').textContent = state.accountMode === 'login' ? text('loginSubtitle') : text('accountSubtitle');
  const labels = page.querySelectorAll('.field span');
  labels[0].textContent = text('email');
  labels[1].textContent = text('password');
  document.getElementById('confirm-password-label').textContent = text('confirmPassword');
  els.loginEmail.placeholder = text('emailPlaceholder');
  els.loginPassword.placeholder = text('passwordPlaceholder');
  els.confirmPassword.placeholder = text('confirmPasswordPlaceholder');
  els.loginButton.textContent = text('login');
  els.registerButton.textContent = text('register');
  els.accountRefresh.textContent = text('refresh');
  els.logoutButton.textContent = text('logout');
  els.accountViewPlans.textContent = text('viewPlans');
  els.accountChangePasswordToggle.textContent = text('changePassword');
  document.getElementById('password-title').textContent = text('passwordTitle');
  document.getElementById('password-subtitle').textContent = text('passwordSubtitle');
  document.getElementById('old-password-label').textContent = text('oldPassword');
  document.getElementById('new-password-label').textContent = text('newPassword');
  els.savePasswordButton.textContent = text('savePassword');
  els.cancelPasswordButton.textContent = text('cancel');
  document.getElementById('profile-title').textContent = text('profileTitle');
  document.getElementById('profile-subtitle').textContent = text('profileSubtitle');
  document.getElementById('profile-email-label').textContent = text('email');
  document.getElementById('profile-plan-label').textContent = text('currentPlan');
  document.getElementById('profile-quota-label').textContent = text('todayDownloads');
  document.getElementById('orders-title').textContent = text('ordersTitle');
  document.getElementById('orders-subtitle').textContent = text('ordersSubtitle');
  renderAccount();
}

function renderAccount() {
  const signedIn = Boolean(state.account?.email);
  els.accountAuthPanel.classList.toggle('hidden', signedIn);
  els.accountProfilePanel.classList.toggle('hidden', !signedIn);
  els.accountRefresh.disabled = !signedIn;
  els.loginModeButton.classList.toggle('is-active', state.accountMode === 'login');
  els.registerModeButton.classList.toggle('is-active', state.accountMode === 'register');
  els.confirmPasswordField.classList.toggle('hidden', state.accountMode !== 'register');
  els.loginButton.classList.toggle('hidden', state.accountMode !== 'login');
  els.registerButton.classList.toggle('hidden', state.accountMode !== 'register');
  els.accountPasswordPanel.classList.toggle('hidden', !signedIn || !state.passwordPanelOpen);
  if (signedIn) {
    document.getElementById('profile-email').textContent = state.account.email;
    document.getElementById('profile-plan').textContent = text(state.account.plan || 'free');
    const quota = PLAN_CATALOG[state.account.plan || 'free']?.quota || PLAN_CATALOG.free.quota;
    document.getElementById('profile-quota').textContent = `0 / ${quota.replace(' / day', '')}`;
  }
  renderOrders();
}

function renderOrders() {
  const visibleOrders = state.account?.email
    ? state.orders.filter((order) => String(order.email || '').toLowerCase() === String(state.account.email).toLowerCase())
    : state.orders;
  if (!visibleOrders.length) {
    els.ordersList.innerHTML = `<div class="account-empty">${text('noOrders')}</div>`;
    return;
  }
  els.ordersList.innerHTML = visibleOrders.map((order) => `
    <div class="account-order-row">
      <div><strong>${escapeHtml(text(order.plan))}</strong><span>${escapeHtml(order.channel)} · ${escapeHtml(order.method || 'card')}</span></div>
      <bdi>${escapeHtml(order.amount)}</bdi>
      <time>${escapeHtml(formatTime(order.time))}</time>
      <span class="account-order-status">${escapeHtml(text(order.status) || order.status)}</span>
      <div class="account-order-actions">
        <button class="ghost-button" type="button" data-order-pay="${escapeHtml(order.id)}">${text('continuePayment')}</button>
        <button class="ghost-button" type="button" data-order-remove="${escapeHtml(order.id)}">${text('remove')}</button>
      </div>
    </div>
  `).join('');
  els.ordersList.querySelectorAll('[data-order-pay]').forEach((button) => {
    button.addEventListener('click', () => continueLocalPayment(button.dataset.orderPay));
  });
  els.ordersList.querySelectorAll('[data-order-remove]').forEach((button) => {
    button.addEventListener('click', () => removeLocalOrder(button.dataset.orderRemove));
  });
}

function setAccountMode(mode) {
  state.accountMode = mode === 'register' ? 'register' : 'login';
  renderAccount();
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
}

function submitLocalLogin() {
  const email = els.loginEmail.value.trim();
  if (!isEmail(email)) return toast(text('invalidEmail'));
  if (!els.loginPassword.value) return toast(text('passwordRequired'));
  const user = findLocalUser(email);
  if (user && user.password !== els.loginPassword.value) return toast(text('loginFailed'));
  const plan = user?.plan || state.account?.plan || 'free';
  if (!user) {
    upsertLocalUser({ email, password: els.loginPassword.value, plan, createdAt: new Date().toISOString() });
  }
  state.account = { email: email.toLowerCase(), plan, signedInAt: new Date().toISOString() };
  els.loginPassword.value = '';
  saveState();
  updateAccountCopy();
  toast(text('loginSuccess'));
}

function submitLocalRegister() {
  const email = els.loginEmail.value.trim();
  if (!isEmail(email)) return toast(text('invalidEmail'));
  if (!els.loginPassword.value) return toast(text('passwordRequired'));
  if (els.loginPassword.value !== els.confirmPassword.value) return toast(text('passwordMismatch'));
  upsertLocalUser({ email, password: els.loginPassword.value, plan: 'free', createdAt: new Date().toISOString() });
  state.account = { email: email.toLowerCase(), plan: 'free', signedInAt: new Date().toISOString(), localRegistered: true };
  els.loginPassword.value = '';
  els.confirmPassword.value = '';
  state.accountMode = 'login';
  saveState();
  updateAccountCopy();
  toast(text('registerSuccess'));
}

function submitLocalPurchase() {
  if (!state.account?.email) {
    setSection('account');
    return toast(text('accountPending'));
  }
  const selected = getSelectedPlan();
  state.account.plan = selected.level;
  const user = findLocalUser(state.account.email);
  if (user) upsertLocalUser({ ...user, plan: selected.level });
  state.orders.unshift({
    id: `order-${Date.now()}`,
    email: state.account.email,
    plan: selected.level,
    amount: selected.price,
    channel: state.paymentChannel,
    method: state.paymentChannel === 'payssion' ? els.payssionMethod.value : 'card',
    status: 'created',
    time: new Date().toISOString(),
    paymentUrl: `https://www.vidbrowser.net/?plan=${encodeURIComponent(selected.code)}&channel=${encodeURIComponent(state.paymentChannel)}`,
  });
  saveState();
  renderPlans();
  updateAccountCopy();
  toast(text('paymentStarted'));
}

async function continueLocalPayment(orderId) {
  const order = state.orders.find((item) => item.id === orderId);
  if (!order) return;
  await window.mediaDeck.openExternal(order.paymentUrl || 'https://www.vidbrowser.net/');
  order.status = 'paid';
  if (state.account?.email && order.email === state.account.email) {
    state.account.plan = order.plan;
    const user = findLocalUser(order.email);
    if (user) upsertLocalUser({ ...user, plan: order.plan });
  }
  saveState();
  updateAccountCopy();
  renderPlans();
  toast(text('paymentContinued'));
}

function removeLocalOrder(orderId) {
  state.orders = state.orders.filter((order) => order.id !== orderId);
  saveState();
  renderOrders();
  toast(text('orderRemoved'));
}

function submitPasswordChange() {
  if (!state.account?.email) return;
  const user = findLocalUser(state.account.email);
  if (!els.oldPassword.value || !els.newPassword.value) return toast(text('passwordRequired'));
  if (user && user.password !== els.oldPassword.value) return toast(text('wrongPassword'));
  upsertLocalUser({
    ...(user || { email: state.account.email, plan: state.account.plan || 'free', createdAt: new Date().toISOString() }),
    password: els.newPassword.value,
  });
  els.oldPassword.value = '';
  els.newPassword.value = '';
  state.passwordPanelOpen = false;
  saveState();
  renderAccount();
  toast(text('passwordChanged'));
}

function toast(message) {
  const item = document.createElement('div');
  item.className = 'toast';
  item.textContent = String(message || '');
  els.toastRegion.appendChild(item);
  setTimeout(() => item.remove(), 3800);
}

function bindEvents() {
  els.min.addEventListener('click', () => window.mediaDeck.minimizeWindow());
  els.max.addEventListener('click', () => window.mediaDeck.toggleMaximizeWindow());
  els.close.addEventListener('click', () => window.mediaDeck.closeWindow());
  els.sidebar.forEach((button) => button.addEventListener('click', () => setSection(button.dataset.section)));
  els.tabAdd.addEventListener('click', () => setSection('home'));
  els.homeSearchGo.addEventListener('click', () => openUrl(els.homeSearch.value));
  els.homeSearch.addEventListener('keydown', (event) => { if (event.key === 'Enter') openUrl(els.homeSearch.value); });
  els.back.addEventListener('click', () => activeTab()?.webview.goBack());
  els.forward.addEventListener('click', () => activeTab()?.webview.goForward());
  els.reload.addEventListener('click', () => activeTab()?.webview.reload());
  els.addressGo.addEventListener('click', () => navigateActive(els.address.value));
  els.address.addEventListener('keydown', (event) => { if (event.key === 'Enter') navigateActive(els.address.value); });
  els.browserDownload.addEventListener('click', () => {
    const candidate = selectedCandidate();
    const targetUrl = candidate?.url || activeTab()?.url;
    if (!targetUrl) return;
    els.urlInput.value = targetUrl;
    setSection('downloads');
    void startDownload();
  });
  els.browserDownloadMenu.addEventListener('click', () => {
    state.browserSideTab = state.browserSideTab === 'recommend' ? 'all' : 'recommend';
    renderCandidates();
  });
  els.browserQuality.addEventListener('change', () => {
    state.settings.resolution = els.browserQuality.value;
    syncSettingsControls();
    saveState();
  });
  els.downloadQuality.addEventListener('change', () => {
    state.settings.resolution = els.downloadQuality.value;
    syncSettingsControls();
    saveState();
  });
  els.playlistToggle.addEventListener('change', () => {
    state.settings.playlist = els.playlistToggle.checked;
    saveState();
  });
  els.audioToggle.addEventListener('change', () => {
    state.settings.audioOnly = els.audioToggle.checked;
    saveState();
  });
  els.chooseOutput.addEventListener('click', async () => {
    const dir = await window.mediaDeck.chooseDirectory();
    if (!dir) return;
    state.settings.outputDir = dir;
    syncSettingsControls();
    saveState();
  });
  els.settingsChooseOutput.addEventListener('click', async () => {
    const dir = await window.mediaDeck.chooseDirectory();
    if (!dir) return;
    state.settings.outputDir = dir;
    syncSettingsControls();
    saveState();
    toast(text('saved'));
  });
  els.settingsResetOutput.addEventListener('click', async () => {
    state.settings.outputDir = await window.mediaDeck.getDefaultDownloadDir();
    syncSettingsControls();
    saveState();
    toast(text('saved'));
  });
  els.settingsConcurrency.addEventListener('change', () => {
    state.settings.maxConcurrentDownloads = Number(els.settingsConcurrency.value) || 1;
    saveState();
    toast(text('saved'));
  });
  els.settingsSearchEngine.addEventListener('change', () => {
    state.settings.searchEngine = els.settingsSearchEngine.value;
    saveState();
    toast(text('saved'));
  });
  els.adBlockChips.forEach((chip) => chip.addEventListener('click', async () => {
    state.settings.adBlocker = chip.dataset.adblock === 'on';
    await window.mediaDeck.setAdBlockerEnabled(state.settings.adBlocker);
    syncSettingsControls();
    saveState();
    toast(text('saved'));
  }));
  els.importUrls.addEventListener('click', async () => {
    const textFile = await window.mediaDeck.chooseTextFile();
    if (!textFile) return;
    els.urlInput.value = textFile;
    toast(text('imported'));
  });
  els.startDownload.addEventListener('click', () => void startDownload());
  els.cancelDownload.addEventListener('click', async () => {
    await window.mediaDeck.cancelDownload();
    state.running = false;
    markActiveDownloads('cancelled');
    toast(text('stopped'));
  });
  els.pageFavorite.addEventListener('click', () => {
    const tab = activeTab();
    if (!tab) return;
    const exists = state.favorites.some((item) => item.url === tab.url);
    setFavorite(tab.url, tab.title, !exists);
  });
  els.pageMediaToggle.addEventListener('click', () => {
    state.mediaPanelVisible = !state.mediaPanelVisible;
    syncMediaPanelVisibility();
  });
  els.pagePin.addEventListener('click', () => {
    const url = activeTab()?.url;
    if (!url) return;
    els.urlInput.value = url;
    const panel = document.querySelector('.downloads-url-panel');
    if (panel) panel.open = true;
    setSection('downloads');
  });
  els.sideRefresh.addEventListener('click', async () => {
    const tab = activeTab();
    const candidates = await window.mediaDeck.getMediaCandidates(tab?.webContentsId || null);
    setMediaCandidatesForTab(tab?.id, Array.isArray(candidates) ? candidates.reverse() : []);
    renderCandidates();
  });
  els.sideClose.addEventListener('click', () => {
    state.mediaPanelVisible = false;
    syncMediaPanelVisibility();
  });
  els.sideTrash.addEventListener('click', async () => {
    const tab = activeTab();
    await window.mediaDeck.clearMediaCandidates(tab?.webContentsId || null);
    clearMediaCandidatesForTab(tab?.id);
    renderCandidates();
  });
  document.querySelectorAll('.side-pill').forEach((button) => {
    button.addEventListener('click', () => {
      state.browserSideTab = button.dataset.sideTab || 'recommend';
      renderCandidates();
    });
  });
  els.clearFinished.addEventListener('click', () => {
    state.queue = state.queue.filter((item) => !isTerminalDownloadState(item.status || item.state));
    state.downloadPage = 1;
    saveState();
    renderDownloads();
  });
  els.downloadFilters.querySelectorAll('.downloads-tab').forEach((button) => {
    button.addEventListener('click', () => {
      state.activeDownloadStatus = button.dataset.status || 'all';
      state.downloadPage = 1;
      renderDownloads();
    });
  });
  els.downloadRange.addEventListener('change', () => {
    state.downloadRange = els.downloadRange.value;
    state.downloadPage = 1;
    renderDownloads();
  });
  els.historyRange.addEventListener('change', () => {
    state.historyRange = els.historyRange.value;
    renderHistory();
  });
  els.historyClear.addEventListener('click', () => {
    state.history = [];
    saveState();
    renderHistory();
  });
  els.favoritesAddCurrent.addEventListener('click', () => addCurrentFavorite());
  els.purchaseButton.addEventListener('click', () => submitLocalPurchase());
  els.paymentChannels.forEach((button) => {
    button.addEventListener('click', () => {
      state.paymentChannel = button.dataset.paymentChannel || 'stripe';
      renderPlans();
    });
  });
  els.loginModeButton.addEventListener('click', () => setAccountMode('login'));
  els.registerModeButton.addEventListener('click', () => setAccountMode('register'));
  els.loginButton.addEventListener('click', () => submitLocalLogin());
  els.registerButton.addEventListener('click', () => submitLocalRegister());
  els.accountRefresh.addEventListener('click', () => {
    updateAccountCopy();
    toast(text('saved'));
  });
  els.logoutButton.addEventListener('click', () => {
    state.account = {};
    state.passwordPanelOpen = false;
    saveState();
    updateAccountCopy();
    renderPlans();
    toast(text('logoutSuccess'));
  });
  els.accountViewPlans.addEventListener('click', () => setSection('plans'));
  els.accountChangePasswordToggle.addEventListener('click', () => {
    state.passwordPanelOpen = !state.passwordPanelOpen;
    renderAccount();
  });
  els.savePasswordButton.addEventListener('click', () => submitPasswordChange());
  els.cancelPasswordButton.addEventListener('click', () => {
    state.passwordPanelOpen = false;
    els.oldPassword.value = '';
    els.newPassword.value = '';
    renderAccount();
  });
  els.settingsResetSession.addEventListener('click', async () => {
    await window.mediaDeck.resetBrowserSession();
    state.candidatesByTabId = {};
    state.selectedCandidateIdsByTabId = {};
    renderCandidates();
    toast(text('sessionReset'));
  });
  els.settingsCheckUpdate.addEventListener('click', async () => {
    await window.mediaDeck.checkForUpdates();
    toast(text('updateUnavailable'));
  });
  els.themeChips.forEach((chip) => chip.addEventListener('click', () => {
    state.theme = chip.dataset.theme;
    applyTheme();
    saveState();
  }));
  els.langChips.forEach((chip) => chip.addEventListener('click', () => {
    state.locale = chip.dataset.lang;
    applyLocale();
    saveState();
  }));
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (state.theme === 'system') applyTheme();
  });
  window.addEventListener('resize', scheduleActiveWebviewResize);
  window.mediaDeck.onOpenNewTab((url) => openUrl(url));
  window.mediaDeck.onBrowserNavigate((url) => openUrl(url));
  window.mediaDeck.onMediaCandidate((candidate) => addCandidate(candidate));
  window.mediaDeck.onDownloadState((payload) => {
    state.running = Boolean(payload?.running);
    updateDownloadBadge();
  });
  window.mediaDeck.onDownloadEvent((payload) => {
    if (!payload) return;
    if (payload.type === 'log') {
      toast(payload.message);
      return;
    }
    if (payload.type === 'progress') {
      const data = payload.data || {};
      const index = Math.max(0, Number(data.item_index || 1) - 1);
      const activeRows = state.queue.filter((item) => normalizeDownloadState(item.status || item.state) === 'downloading');
      const row = activeRows[index];
      if (row) {
        row.percent = Number(data.percent || 0);
        row.title = data.filename || row.title;
        row.fileName = getFileName(data.filename || row.fileName || row.title || row.url);
        row.downloaded = formatBytes(data.downloaded_bytes) || row.downloaded || '0 B';
        row.size = formatBytes(data.total_bytes) || row.size || '-';
        row.speed = data.speed ? `${formatBytes(data.speed)}/s` : '-';
        row.status = data.status === 'finished' ? 'completed' : 'downloading';
        row.state = row.status;
        row.path = data.filename || row.path;
        row.savePath = row.savePath || row.path;
        saveState();
        renderDownloads();
      }
    }
    if (payload.type === 'done') {
      state.running = false;
      state.queue.forEach((item) => {
        if (normalizeDownloadState(item.status || item.state) === 'downloading') {
          item.percent = 100;
          item.status = 'completed';
          item.state = 'completed';
        }
      });
      saveState();
      updateDownloadBadge();
      renderDownloads();
      toast(text('downloadDone', { success: payload.downloaded || 0, failed: payload.failed || 0 }));
    }
    if (payload.type === 'error') {
      markActiveDownloads('error');
      toast(text('downloadError', { message: payload.message || 'download failed' }));
    }
  });
}

async function bootstrap() {
  state.settings = { ...state.settings, ...readObject(STORAGE_KEYS.settings) };
  const [systemLocale, defaultDir, candidates, runtimeInfo] = await Promise.all([
    window.mediaDeck.getSystemLocale(),
    window.mediaDeck.getDefaultDownloadDir(),
    window.mediaDeck.getMediaCandidates(),
    window.mediaDeck.getRuntimeInfo(),
  ]);
  if (!localStorage.getItem(STORAGE_KEYS.locale)) {
    state.locale = String(systemLocale).toLowerCase().startsWith('zh') ? 'zh-CN' : 'en';
  }
  state.settings.outputDir = state.settings.outputDir || defaultDir;
  state.runtimeInfo = runtimeInfo || null;
  await window.mediaDeck.setAdBlockerEnabled(state.settings.adBlocker !== false);
  applyTheme();
  renderQuickSites();
  bindEvents();
  applyLocale();
  syncSettingsControls();
  const initialCandidates = Array.isArray(candidates) ? candidates.reverse() : [];
  if (initialCandidates.length) {
    const initialTab = createTab(HOME_URL, text('newTab'));
    setMediaCandidatesForTab(initialTab.id, initialCandidates.filter((candidate) => !candidate.webContentsId));
  }
  setSection(state.tabs.length ? 'browser' : 'home');
  setVisibleWebviews();
  window.__VIDOGO_SET_SECTION = setSection;
  window.__VIDOGO_GET_BROWSER_LAYOUT = getBrowserLayoutSnapshot;
  window.__VIDOGO_RUN_SELF_TEST = runRendererSelfTest;
  window.__VIDOGO_RUN_BROWSER_YOUTUBE_FLOW_TEST = runBrowserYouTubeFlowTest;
  window.__VIDOGO_BOOTSTRAPPED = true;
}

async function runRendererSelfTest() {
  const failures = [];
  const clicked = [];
  window.__VIDOGO_SELF_TEST_PROGRESS = 'started';
  const assert = (condition, message) => {
    if (!condition) failures.push(message);
  };
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const previousSettings = { ...state.settings };
  const previousTheme = state.theme;
  const previousLocale = state.locale;
  const previousHistory = [...state.history];
  const previousFavorites = [...state.favorites];
  const previousAccount = { ...state.account };
  const previousUsers = [...state.users];
  const previousOrders = [...state.orders];
  const previousSelectedPlan = state.selectedPlan;
  const previousPaymentChannel = state.paymentChannel;
  const clickControl = async (label, control) => {
    window.__VIDOGO_SELF_TEST_PROGRESS = label;
    if (!control) {
      failures.push(`Missing clickable control: ${label}`);
      return;
    }
    if (control.disabled) {
      failures.push(`Clickable control disabled: ${label}`);
      return;
    }
    control.click();
    clicked.push(label);
    await wait(20);
  };

  const requiredApiMethods = [
    'getSystemLocale',
    'getDefaultDownloadDir',
    'getRuntimeInfo',
    'getLegacyInfo',
    'chooseDirectory',
    'chooseTextFile',
    'openExternal',
    'openPath',
    'showItemInFolder',
    'minimizeWindow',
    'toggleMaximizeWindow',
    'closeWindow',
    'resetBrowserSession',
    'setPreferredLanguage',
    'setAdBlockerEnabled',
    'checkForUpdates',
    'getMediaCandidates',
    'clearMediaCandidates',
    'startDownload',
    'cancelDownload',
    'onOpenNewTab',
    'onBrowserNavigate',
    'onMediaCandidate',
    'onDownloadState',
    'onDownloadEvent',
  ];
  const missingApiMethods = requiredApiMethods.filter((name) => typeof window.mediaDeck?.[name] !== 'function');
  assert(missingApiMethods.length === 0, `Missing mediaDeck API methods: ${missingApiMethods.join(', ')}`);

  const runtimeInfo = await window.mediaDeck.getRuntimeInfo();
  assert(runtimeInfo?.appName === 'VidoGo', 'Runtime info app name mismatch');
  assert(String(runtimeInfo?.browserPartition || '').startsWith('persist:'), 'Runtime browser partition missing');

  const legacyInfo = await window.mediaDeck.getLegacyInfo();
  assert(Array.isArray(legacyInfo?.legacyDirs), 'Legacy info dirs missing');

  const acceptLanguage = await window.mediaDeck.setPreferredLanguage('en');
  assert(String(acceptLanguage).includes('en-US'), 'Preferred language IPC did not return English header');
  const adBlockerState = await window.mediaDeck.setAdBlockerEnabled(false);
  assert(adBlockerState === false, 'Ad blocker IPC did not disable blocking');
  await window.mediaDeck.setAdBlockerEnabled(true);
  const updateState = await window.mediaDeck.checkForUpdates();
  assert(updateState && updateState.available === false, 'Update check IPC did not return expected state');

  const candidatesBeforeClear = await window.mediaDeck.clearMediaCandidates();
  assert(Array.isArray(candidatesBeforeClear), 'Clear media candidates did not return an array');
  const candidatesAfterClear = await window.mediaDeck.getMediaCandidates();
  assert(Array.isArray(candidatesAfterClear) && candidatesAfterClear.length === 0, 'Media candidates were not cleared');

  const cancelState = await window.mediaDeck.cancelDownload();
  assert(cancelState?.running === false, 'Cancel download should report not running');

  let emptyDownloadRejected = false;
  try {
    await window.mediaDeck.startDownload({ urls: [] });
  } catch {
    emptyDownloadRejected = true;
  }
  assert(emptyDownloadRejected, 'Empty download task should be rejected');

  await clickControl('window:minimize', els.min);
  await clickControl('window:maximize', els.max);
  await clickControl('window:close', els.close);

  await clickControl('sidebar:browser-empty-home', document.querySelector('.sidebar-btn[data-section="browser"]'));
  assert(els.pages.home?.classList.contains('active'), 'Browser sidebar should show home when no browser tab is loaded');
  assert(getVisibleWebviews().length === 0, 'Empty home state should not expose a browser webview');

  for (const section of ['downloads', 'history', 'favorites', 'plans', 'account', 'settings']) {
    await clickControl(`sidebar:${section}`, document.querySelector(`.sidebar-btn[data-section="${section}"]`));
    assert(els.pages[section]?.classList.contains('active'), `section not active: ${section}`);
    assert(document.querySelector(`.sidebar-btn[data-section="${section}"]`)?.classList.contains('active'), `sidebar item not active: ${section}`);
  }

  setSection('home');
  await wait(250);
  const siteImages = Array.from(document.querySelectorAll('.site-card img'));
  await Promise.allSettled(siteImages.map((image) => {
    if (image.complete && image.naturalWidth > 0) return Promise.resolve();
    return image.decode ? image.decode() : new Promise((resolve) => {
      image.addEventListener('load', resolve, { once: true });
      image.addEventListener('error', resolve, { once: true });
    });
  }));
  const unloadedImages = siteImages.filter((image) => !image.complete || image.naturalWidth <= 0);
  assert(siteImages.length === 15, `Expected 15 platform icon images, got ${siteImages.length}`);
  assert(unloadedImages.length === 0, `Platform icons failed to load: ${unloadedImages.map((image) => image.getAttribute('src')).join(', ')}`);
  const homeTabButton = document.querySelector('.tab:first-child');
  assert(homeTabButton?.textContent.includes(text('home')), 'Home tab should be the first tab before opening a site');
  els.homeSearch.value = 'example.com';
  await clickControl('home:search', els.homeSearchGo);
  assert(state.section === 'browser', 'Home search did not open the browser page');
  assert(state.tabs.at(-1)?.url === 'https://example.com', 'Home search did not create a browser tab for example.com');
  const tabsAfterSearch = state.tabs.length;
  const quickYouTube = Array.from(document.querySelectorAll('.site-card')).find((button) => button.textContent.includes('YouTube'));
  setSection('home');
  await clickControl('home:quick-site:youtube', quickYouTube);
  assert(state.tabs.length === tabsAfterSearch + 1, 'YouTube quick site did not create a new browser tab');
  assert(activeTab()?.title === 'YouTube', 'YouTube quick site did not label the opened tab');
  assert(activeTab()?.url === 'https://www.youtube.com/', 'YouTube quick site did not open the expected URL');
  assert(document.querySelector('.tab:first-child')?.textContent.includes(text('home')), 'Home tab should remain before browser tabs after opening YouTube');
  assert(document.querySelector('.tab.active')?.textContent.includes('YouTube'), 'Opened YouTube tab was not active in the top tab strip');
  const mediaPanelRect = els.browserSide.getBoundingClientRect();
  assert(mediaPanelRect.height > 500 && mediaPanelRect.width >= 260, `Media sniffing panel has invalid size: ${Math.round(mediaPanelRect.width)}x${Math.round(mediaPanelRect.height)}`);
  assert(els.browserSideTitle.textContent === text('mediaPanel'), 'Media sniffing panel title did not render');
  assert(els.recommendCount.textContent === '0' && els.allCount.textContent === '0', 'New YouTube tab should start with empty media candidates');
  const panelOpenLayout = getBrowserLayoutSnapshot();
  await clickControl('browser:media-panel-close', els.sideClose);
  const panelClosedLayout = getBrowserLayoutSnapshot();
  assert(panelClosedLayout.mediaPanelVisible === false && panelClosedLayout.sideWidth === 0, 'Media panel close button did not hide the sniffing panel');
  assert(panelClosedLayout.stageWidth > panelOpenLayout.stageWidth, 'Browser stage did not expand after closing the media panel');
  await clickControl('browser:media-panel-toggle-open', els.pageMediaToggle);
  const panelReopenedLayout = getBrowserLayoutSnapshot();
  assert(panelReopenedLayout.mediaPanelVisible === true && panelReopenedLayout.mediaPanelHeight > 500, 'Toolbar media panel toggle did not reopen the sniffing panel');

  state.locale = 'en';
  applyLocale();
  assert(document.documentElement.lang === 'en', 'English locale not applied');
  assert(els.homeSearch.placeholder === TEXT.en.search, 'English copy not applied');

  state.locale = 'zh-CN';
  applyLocale();
  assert(document.documentElement.lang === 'zh-CN', 'Chinese locale not applied');
  assert(els.homeSearch.placeholder === TEXT.zh.search, 'Chinese copy not applied');

  state.theme = 'light';
  applyTheme();
  assert(els.body.dataset.resolvedTheme === 'light', 'Light theme not applied');

  state.theme = 'dark';
  applyTheme();
  assert(els.body.dataset.resolvedTheme === 'dark', 'Dark theme not applied');
  await clickControl('theme:light', document.querySelector('.chip[data-theme="light"]'));
  await clickControl('theme:dark', document.querySelector('.chip[data-theme="dark"]'));
  await clickControl('language:en', document.querySelector('.chip[data-lang="en"]'));
  await clickControl('language:zh', document.querySelector('.chip[data-lang="zh-CN"]'));

  setSection('browser');
  assert(els.pages.browser?.classList.contains('active'), 'section not active: browser');
  assert(document.querySelector('.sidebar-btn[data-section="browser"]')?.classList.contains('active'), 'Browser sidebar item should be active');
  const initialActiveTabId = state.activeTabId;
  const initialTabCount = state.tabs.length;
  assert(getVisibleWebviews().length === 1, 'Exactly one webview should be visible before tab switching');
  await clickControl('tab:add', els.tabAdd);
  assert(state.section === 'home', 'Tab add should open the home/new-tab page');
  assert(state.tabs.length === initialTabCount, 'Home/new-tab button should not create a browser webview until navigation');
  assert(getVisibleWebviews().length === 0, 'Home/new-tab page should hide all webviews');
  openUrl('https://example.com/added-tab', 'Example Domain');
  const addedTabId = state.activeTabId;
  assert(addedTabId && addedTabId !== initialActiveTabId, 'Opening a URL from the new-tab page did not select the new browser tab');
  assert(state.tabs.length === initialTabCount + 1, 'Opening a URL from the new-tab page did not create a browser tab');
  assert(getVisibleWebviews().length === 1, 'Exactly one webview should be visible after adding a tab');
  const firstBrowserTabButton = document.querySelector(`.tab[data-tab-id="${initialActiveTabId}"]`);
  await clickControl('tab:switch-first', firstBrowserTabButton);
  assert(state.activeTabId === initialActiveTabId, 'Switching to first browser tab did not update active tab');
  assert(getVisibleWebviews()[0]?.id === initialActiveTabId, 'First browser tab webview was not the only visible webview');
  const firstLayout = getBrowserLayoutSnapshot();
  assert(firstLayout.activePageIds.length === 1 && firstLayout.activePageIds[0] === 'page-browser', `Browser tab switch left invalid active pages: ${firstLayout.activePageIds.join(', ')}`);
  assert(firstLayout.stageWidth > 600, `Browser stage width too small after tab switch: ${firstLayout.stageWidth}`);
  assert(firstLayout.viewWidth === firstLayout.stageWidth && firstLayout.viewHeight === firstLayout.stageHeight, 'Active webview does not fill browser stage');
  assert(firstLayout.viewDisplay === 'flex' && firstLayout.viewVisibility === 'visible', 'Active webview should be visible in the browser frame flow');
  assert(firstLayout.viewInlineHeight === `${firstLayout.stageHeight}px`, `Active webview did not receive explicit guest height: ${firstLayout.viewInlineHeight}`);
  const addedTabButton = document.querySelector(`.tab[data-tab-id="${addedTabId}"]`);
  await clickControl('tab:switch-added', addedTabButton);
  assert(state.activeTabId === addedTabId, 'Switching back to added tab did not update active tab');
  const secondLayout = getBrowserLayoutSnapshot();
  assert(secondLayout.visibleWebviews === 1, 'Exactly one webview should be visible after switching back');
  assert(secondLayout.viewHeight === secondLayout.stageHeight && secondLayout.viewHeight > 500, `Later tab webview height is not full-height: view=${secondLayout.viewHeight}, stage=${secondLayout.stageHeight}`);
  assert(secondLayout.sideWidth >= 260 && secondLayout.splitWidth > secondLayout.sideWidth, 'Browser media panel should stay right-side, not stacked into half-screen layout');
  const activeClose = document.querySelector('.tab.active .tab-close');
  await clickControl('tab:close-active', activeClose);
  assert(!state.tabs.some((tab) => tab.id === addedTabId), 'Closing active tab did not remove it');
  assert(state.activeTabId === initialActiveTabId, 'Closing active tab did not select neighboring tab');

  const tab = activeTab();
  assert(Boolean(tab), 'No active browser tab');
  if (tab) {
    setSection('browser');
    await clickControl('browser:favorite', els.pageFavorite);
    await clickControl('browser:pin-download', els.pagePin);
    setSection('browser');
    await clickControl('browser:media-refresh', els.sideRefresh);
    await clickControl('browser:media-clear', els.sideTrash);
    setFavorite(tab.url, tab.title, true);
    assert(state.favorites.some((item) => item.url === tab.url), 'Favorite was not added');
    renderFavorites();
    assert(Number(els.favoritesCount.textContent) >= 1, 'Favorite count did not update');
    setFavorite(tab.url, tab.title, false);
  }

  const previousQueue = [...state.queue];
  const previousInput = els.urlInput.value;
  const previousStatus = state.activeDownloadStatus;
  const previousRange = state.downloadRange;
  const previousPage = state.downloadPage;
  state.queue = [];
  state.downloadPage = 1;
  setSection('downloads');
  const urlPanel = document.querySelector('.downloads-url-panel');
  urlPanel.open = true;
  assert(urlPanel.open, 'Download URL panel did not open');
  els.urlInput.value = 'https://example.com/video.mp4';
  await clickControl('downloads:start', els.startDownload);
  await wait(120);
  assert(state.queue.length === 1, 'Download queue did not add URL');
  assert(els.downloadBody.querySelectorAll('.download-item-row').length >= 1, 'Download item row did not render');
  assert(els.downloadBody.querySelector('.download-status-cell.is-completed'), 'Completed download status did not render');
  state.queue[0].status = 'downloading';
  state.queue[0].state = 'downloading';
  updateDownloadBadge();
  assert(els.downloadBadge.hidden === false, 'Download badge did not show for active download');
  state.queue[0].status = 'completed';
  state.queue[0].state = 'completed';
  state.running = false;
  updateDownloadBadge();
  assert(els.downloadBadge.hidden === true, 'Download badge did not hide after downloads finished');
  renderDownloads();
  for (const status of ['all', 'queued', 'downloading', 'completed', 'error']) {
    await clickControl(`downloads:filter:${status}`, els.downloadFilters.querySelector(`[data-status="${status}"]`));
  }
  for (const range of ['all', 'today', 'yesterday', 'last7', 'last30']) {
    els.downloadRange.value = range;
    els.downloadRange.dispatchEvent(new Event('change'));
    clicked.push(`downloads:range:${range}`);
  }
  state.activeDownloadStatus = 'all';
  state.downloadRange = 'all';
  renderDownloads();
  await clickControl('downloads:open-file', els.downloadBody.querySelector('[data-open]'));
  await clickControl('downloads:open-folder', els.downloadBody.querySelector('[data-folder]'));
  await clickControl('downloads:remove', els.downloadBody.querySelector('[data-remove]'));
  state.queue = [{
    id: 'self-test-error-download',
    downloadId: 'self-test-error-download',
    url: 'https://example.com/retry.mp4',
    fileName: 'retry.mp4',
    title: 'retry.mp4',
    percent: 12,
    downloaded: '12 KB',
    size: '100 KB',
    speed: '-',
    time: new Date().toISOString(),
    createdAt: Date.now(),
    status: 'error',
    state: 'error',
    path: state.settings.outputDir,
    savePath: state.settings.outputDir,
  }];
  renderDownloads();
  await clickControl('downloads:retry', els.downloadBody.querySelector('[data-retry]'));
  await wait(120);
  state.queue = Array.from({ length: DOWNLOAD_PAGE_SIZE + 1 }, (_, index) => ({
    id: `self-test-page-download-${index}`,
    downloadId: `self-test-page-download-${index}`,
    url: `https://example.com/page-${index}.mp4`,
    fileName: `page-${index}.mp4`,
    title: `page-${index}.mp4`,
    percent: 100,
    downloaded: '1 MB',
    size: '1 MB',
    speed: '-',
    time: new Date().toISOString(),
    createdAt: Date.now() - index,
    status: 'completed',
    state: 'completed',
    path: `C:\\self-test\\page-${index}.mp4`,
    savePath: 'C:\\self-test',
  }));
  state.activeDownloadStatus = 'all';
  state.downloadRange = 'all';
  state.downloadPage = 1;
  renderDownloads();
  assert(Boolean(els.downloadBody.querySelector('.downloads-pagination')), 'Download pagination did not render');
  await clickControl('downloads:next-page', els.downloadBody.querySelector('[data-download-page="next"]'));
  assert(state.downloadPage === 2, 'Download next page did not advance');
  await clickControl('downloads:previous-page', els.downloadBody.querySelector('[data-download-page="prev"]'));
  assert(state.downloadPage === 1, 'Download previous page did not go back');
  await clickControl('downloads:clear-finished', els.clearFinished);
  await clickControl('downloads:import-list', els.importUrls);
  await clickControl('downloads:choose-output', els.chooseOutput);
  await clickControl('downloads:cancel', els.cancelDownload);
  state.queue = previousQueue;
  els.urlInput.value = previousInput;
  state.activeDownloadStatus = previousStatus;
  state.downloadRange = previousRange;
  state.downloadPage = previousPage;

  const mediaTestTabId = state.activeTabId;
  setMediaCandidatesForTab(mediaTestTabId, [{
    id: 'self-test-candidate',
    url: 'https://example.com/video.mp4',
    host: 'example.com',
    title: 'video.mp4',
    mime: 'video/mp4',
    extension: 'mp4',
    size: 1024,
    resourceType: 'media',
    detectedAt: new Date().toISOString(),
  }]);
  state.selectedCandidateIdsByTabId[mediaTestTabId] = 'self-test-candidate';
  renderCandidates();
  assert(els.candidateList.querySelectorAll('.candidate-item').length >= 1, 'Candidate row did not render');
  await clickControl('browser:media-tab-all', els.allMedia);
  assert(state.browserSideTab === 'all', 'All media tab did not activate');
  await clickControl('browser:media-tab-recommend', els.recommend);
  assert(state.browserSideTab === 'recommend', 'Recommend media tab did not activate');
  const isolatedTab = createTab('https://example.com/isolated', 'Isolated tab');
  setSection('browser');
  assert(mediaCandidatesForTab(isolatedTab.id).length === 0, 'New browser tab inherited another tab media candidates');
  addCandidate({
    id: 'isolated-candidate',
    url: 'https://example.com/isolated.mp4',
    host: 'example.com',
    title: 'isolated.mp4',
    extension: 'mp4',
    size: 2048,
    resourceType: 'media',
    webContentsId: isolatedTab.webContentsId,
    detectedAt: new Date().toISOString(),
  });
  assert(mediaCandidatesForTab(isolatedTab.id).length === 1, 'Candidate was not stored on the active browser tab');
  const mediaTestTabButton = document.querySelector(`.tab[data-tab-id="${mediaTestTabId}"]`);
  await clickControl('tab:switch-media-test', mediaTestTabButton);
  assert(selectedCandidate()?.id === 'self-test-candidate', 'Switching tabs did not restore that tab media candidate selection');
  clearMediaCandidatesForTab(mediaTestTabId);
  clearMediaCandidatesForTab(isolatedTab.id);
  closeTab(isolatedTab.id);

  addHistory('Self test history', 'https://example.com/history');
  setSection('history');
  await clickControl('history:item', els.historyList.querySelector('.history-open'));
  setSection('history');
  await clickControl('history:remove', els.historyList.querySelector('[data-history-remove]'));
  addHistory('Self test history', 'https://example.com/history');
  setSection('history');
  await clickControl('history:clear', els.historyClear);

  setFavorite('https://example.com/favorite', 'Self test favorite', true);
  setSection('favorites');
  await clickControl('favorites:item', document.querySelector('.favorite-list .history-open'));
  setSection('favorites');
  await clickControl('favorites:add-current', els.favoritesAddCurrent);
  setSection('favorites');
  await clickControl('favorites:remove', document.querySelector('.favorite-list [data-favorite-remove]'));

  setSection('plans');
  await clickControl('plans:select-pro-year', document.querySelector('[data-plan-code="pro_year"]'));
  await clickControl('plans:payment-payssion', document.querySelector('[data-payment-channel="payssion"]'));
  await clickControl('plans:purchase-needs-login', els.purchaseButton);
  setSection('account');
  await clickControl('account:register-mode', els.registerModeButton);
  els.loginEmail.value = 'selftest@example.com';
  els.loginPassword.value = 'password123';
  els.confirmPassword.value = 'password123';
  await clickControl('account:register', els.registerButton);
  assert(state.account?.email === 'selftest@example.com', 'Local register did not sign in');
  await clickControl('account:view-plans', els.accountViewPlans);
  assert(els.pages.plans?.classList.contains('active'), 'View plans did not switch to plans');
  setSection('account');
  await clickControl('account:change-password-toggle', els.accountChangePasswordToggle);
  els.oldPassword.value = 'password123';
  els.newPassword.value = 'password456';
  await clickControl('account:save-password', els.savePasswordButton);
  assert(findLocalUser('selftest@example.com')?.password === 'password456', 'Local password was not changed');
  await clickControl('account:logout', els.logoutButton);
  await clickControl('account:login-mode', els.loginModeButton);
  els.loginEmail.value = 'selftest@example.com';
  els.loginPassword.value = 'password456';
  await clickControl('account:login', els.loginButton);
  assert(state.account?.email === 'selftest@example.com', 'Local login did not sign in');
  setSection('plans');
  await clickControl('plans:purchase', els.purchaseButton);
  assert(state.orders.length > previousOrders.length, 'Local purchase did not create an order');
  setSection('account');
  await clickControl('account:continue-payment', els.ordersList.querySelector('[data-order-pay]'));
  assert(state.orders[0]?.status === 'paid', 'Continue payment did not mark order paid');
  await clickControl('account:remove-order', els.ordersList.querySelector('[data-order-remove]'));

  setSection('settings');
  await clickControl('settings:theme-light', document.querySelector('#settings-theme-control .chip[data-theme="light"]'));
  await clickControl('settings:language-en', document.querySelector('#settings-language-control .chip[data-lang="en"]'));
  await clickControl('settings:choose-output', els.settingsChooseOutput);
  await clickControl('settings:reset-output', els.settingsResetOutput);
  els.settingsConcurrency.value = '2';
  els.settingsConcurrency.dispatchEvent(new Event('change'));
  clicked.push('settings:concurrency');
  els.settingsSearchEngine.value = 'bing';
  els.settingsSearchEngine.dispatchEvent(new Event('change'));
  clicked.push('settings:search-engine');
  assert(normalizeUrl('vidogo test').startsWith(SEARCH_ENGINES.bing), 'Search engine setting was not applied');
  await clickControl('settings:adblock-off', document.querySelector('#settings-adblock-control .chip[data-adblock="off"]'));
  assert(state.settings.adBlocker === false, 'Ad blocker setting did not disable');
  await clickControl('settings:adblock-on', document.querySelector('#settings-adblock-control .chip[data-adblock="on"]'));
  assert(state.settings.adBlocker === true, 'Ad blocker setting did not enable');
  await clickControl('settings:reset-session', els.settingsResetSession);
  await clickControl('settings:check-update', els.settingsCheckUpdate);
  assert(els.settingsVersion.textContent.includes('VidoGo'), 'Settings version did not render');

  state.settings = previousSettings;
  state.history = previousHistory;
  state.favorites = previousFavorites;
  state.account = previousAccount;
  state.users = previousUsers;
  state.orders = previousOrders;
  state.selectedPlan = previousSelectedPlan;
  state.paymentChannel = previousPaymentChannel;
  els.loginEmail.value = '';
  els.loginPassword.value = '';
  els.confirmPassword.value = '';
  els.oldPassword.value = '';
  els.newPassword.value = '';
  state.passwordPanelOpen = false;
  state.theme = previousTheme;
  state.locale = previousLocale;
  state.activeDownloadStatus = 'all';
  applyTheme();
  applyLocale();
  syncSettingsControls();
  await wait(220);
  document.querySelector('.downloads-url-panel')?.removeAttribute('open');
  setSection('browser');
  await wait(120);
  els.toastRegion.innerHTML = '';
  const finalLayout = getBrowserLayoutSnapshot();
  assert(finalLayout.activePageIds.length === 1 && finalLayout.activePageIds[0] === 'page-browser', `Final layout left invalid active pages: ${finalLayout.activePageIds.join(', ')}`);
  assert(finalLayout.visibleWebviews === 1, 'Final layout should leave exactly one visible webview');
  saveState();

  return {
    ok: failures.length === 0,
    failures,
    pages: Object.keys(els.pages).length,
    quickSites: document.querySelectorAll('.site-card img').length,
    tabs: state.tabs.length,
    clicked,
  };
}

async function runBrowserYouTubeFlowTest() {
  const failures = [];
  const clicked = [];
  window.__VIDOGO_SELF_TEST_PROGRESS = 'browser-youtube-flow:started';
  const assert = (condition, message) => {
    if (!condition) failures.push(message);
  };
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const clickControl = async (label, control) => {
    window.__VIDOGO_SELF_TEST_PROGRESS = label;
    if (!control) {
      failures.push(`Missing clickable control: ${label}`);
      return;
    }
    if (control.disabled) {
      failures.push(`Clickable control disabled: ${label}`);
      return;
    }
    control.click();
    clicked.push(label);
    await wait(60);
  };

  state.tabs.forEach((tab) => tab.webview.remove());
  state.tabs = [];
  state.activeTabId = null;
  state.candidatesByTabId = {};
  state.selectedCandidateIdsByTabId = {};
  state.mediaPanelVisible = true;
  setSection('home');
  await wait(250);
  assert(document.querySelector('.tab:first-child')?.textContent.includes(text('home')), 'Home tab should be first before opening YouTube');
  assert(getVisibleWebviews().length === 0, 'Home page should not show any webview before opening YouTube');

  const quickYouTube = Array.from(document.querySelectorAll('.site-card')).find((button) => button.textContent.includes('YouTube'));
  await clickControl('home:quick-site:youtube', quickYouTube);
  await wait(250);
  assert(state.tabs.length === 1, `YouTube flow should create one browser tab, got ${state.tabs.length}`);
  assert(activeTab()?.title === 'YouTube', 'YouTube tab title was not preserved from the quick site label');
  assert(activeTab()?.url === 'https://www.youtube.com/', 'YouTube quick site opened an unexpected URL');
  assert(document.querySelector('.tab:first-child')?.textContent.includes(text('home')), 'Home tab should remain before the YouTube browser tab');
  assert(document.querySelector('.tab.active')?.textContent.includes('YouTube'), 'YouTube browser tab should be active');
  const layout = getBrowserLayoutSnapshot();
  assert(layout.activePageIds.length === 1 && layout.activePageIds[0] === 'page-browser', 'YouTube flow did not switch to browser page');
  assert(layout.visibleWebviews === 1, 'YouTube flow should show exactly one webview');
  assert(layout.viewHeight === layout.stageHeight && layout.viewHeight > 500, `YouTube webview is not full-height: view=${layout.viewHeight}, stage=${layout.stageHeight}`);
  assert(layout.mediaPanelVisible === true && layout.mediaPanelHeight === layout.stageHeight, 'YouTube flow did not show the full-height media sniffing panel');
  assert(els.recommendCount.textContent === '0' && els.allCount.textContent === '0', 'Fresh YouTube tab should start with empty media candidates');
  window.__VIDOGO_SELF_TEST_PROGRESS = 'browser-youtube-flow:done';
  return { ok: failures.length === 0, failures, clicked, layout };
}

bootstrap().catch((error) => {
  const message = error?.stack || String(error);
  window.__VIDOGO_BOOT_ERROR = message;
  document.body.insertAdjacentHTML('beforeend', `<pre style="position:fixed;inset:0;padding:24px;color:#f99;background:#111;z-index:99;white-space:pre-wrap">${escapeHtml(message)}</pre>`);
});
