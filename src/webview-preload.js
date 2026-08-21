const COSMETIC_AD_CSS = `
iframe[src*="doubleclick.net" i],
iframe[src*="googlesyndication.com" i],
iframe[src*="googleadservices.com" i],
iframe[src*="taboola.com" i],
iframe[src*="outbrain.com" i],
iframe[src*="/ads/" i],
iframe[src*="/adserver/" i],
.adsbygoogle,
[id="ad" i],
[id^="ad-" i],
[id^="ad_" i],
[id$="-ad" i],
[id*="-ad-" i],
[id*="_ad_" i],
[class="ad" i],
[class^="ad-" i],
[class^="ad_" i],
[class*=" ad-" i],
[class*=" ad_" i],
[class*=" ads " i],
[class*=" advert" i],
[class*=" banner-ad" i],
[class*=" sponsored" i],
[data-ad],
[data-ad-client],
[data-ad-slot],
[aria-label="Advertisement" i],
[aria-label="Sponsored" i] {
  display: none !important;
  visibility: hidden !important;
  pointer-events: none !important;
}
`;

function injectCosmeticAdCss() {
  if (document.getElementById('__vidogo_cosmetic_ad_css')) return;
  const style = document.createElement('style');
  style.id = '__vidogo_cosmetic_ad_css';
  style.textContent = COSMETIC_AD_CSS;
  document.documentElement.appendChild(style);
}

function clickFirstVisible(selectors) {
  for (const selector of selectors) {
    for (const element of document.querySelectorAll(selector)) {
      const rect = element.getBoundingClientRect();
      const style = window.getComputedStyle(element);
      if (rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none') {
        element.click();
        return true;
      }
    }
  }
  return false;
}

function installYouTubeAdHelper() {
  if (!location.hostname.includes('youtube.com') || window.__vidogoYouTubeAdHelper) return;
  window.__vidogoYouTubeAdHelper = true;
  const skipSelectors = [
    '.ytp-ad-skip-button',
    '.ytp-ad-skip-button-modern',
    '.ytp-skip-ad-button',
    'button.ytp-ad-skip-button',
    'button.ytp-ad-skip-button-modern',
  ];
  const closeSelectors = [
    '.ytp-ad-overlay-close-button',
    '.ytp-ad-image-overlay-close-button',
    '.ytp-ad-text-overlay-close-button',
    'button[aria-label="Close"]',
    'button[aria-label="Dismiss"]',
  ];
  window.setInterval(() => {
    clickFirstVisible(closeSelectors);
    if (clickFirstVisible(skipSelectors)) return;
    const player = document.querySelector('.html5-video-player');
    const video = document.querySelector('video');
    const adShowing = player && (
      player.classList.contains('ad-showing')
      || player.classList.contains('ad-interrupting')
      || player.querySelector('.video-ads .ytp-ad-module')
    );
    if (adShowing && video && Number.isFinite(video.duration) && video.duration > 0) {
      video.muted = true;
      video.playbackRate = Math.max(video.playbackRate, 8);
      video.currentTime = Math.max(video.duration - 0.2, 0);
    }
  }, 500);
}

function boot() {
  injectCosmeticAdCss();
  installYouTubeAdHelper();
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
