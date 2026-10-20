/* Template filled by build-offline.cjs; the cache version hashes the complete app shell. */
importScripts('/assets/ranking-config.js?v=9','/assets/ranking-store.js?v=9');
const CACHE = '__CACHE__';
const SHELL = __SHELL__;
const PAGES = ['/', '/attach/memoria/', '/attach/oportunidades/', '/attach/decide/', '/ranking/'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL.map(url => new Request(url, { cache: 'reload' })))));
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('paralelvr-attach-shell-') && key !== CACHE).map(key => caches.delete(key)));
    await clients.claim();
  })());
});
function canonical(path) {
  if (path.endsWith('/index.html')) path = path.slice(0, -10);
  if (PAGES.includes(path + '/')) path += '/';
  return path;
}
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== location.origin) return;
  const path = canonical(url.pathname);
  if (!SHELL.includes(path)) return;
  // Serve one complete version, including navigation, rather than mixing old JS and new HTML.
  event.respondWith(caches.open(CACHE).then(async cache => (await cache.match(path, { ignoreSearch: true })) || fetch(event.request)));
});
self.addEventListener('message', event => {
  if (event.data?.type === 'ATTACH_ACTIVATE_UPDATE') self.skipWaiting();
  if (event.data?.type === 'ATTACH_OFFLINE_READY') event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const found = await Promise.all(SHELL.map(path => cache.match(path, { ignoreSearch: true })));
    event.ports[0]?.postMessage({ ready: found.every(Boolean), version: CACHE });
  })());
});
self.addEventListener('sync', event => {
  if (event.tag !== 'attach-upload-scores') return;
  event.waitUntil((async () => {
    await AttachStore.flush();
    if ((await AttachStore.status()).pending) throw Error('Still waiting for a connection.');
    const windows = await clients.matchAll({ type: 'window' });
    windows.forEach(client => client.postMessage({ type: 'ATTACH_SCORES_SYNCED' }));
  })());
});
