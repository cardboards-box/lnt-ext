// Inject our override script into the page
console.log('Loading LNT-EXT Location Watcher script...');
const script = document.createElement('script');
script.src = chrome.runtime.getURL('inject.js');
document.documentElement.appendChild(script);
script.remove();
console.log('[LNT-EXT] Location Watcher injected script loaded.');
