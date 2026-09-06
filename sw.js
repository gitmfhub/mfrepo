const CACHE_NAME = 'xaut-pwa-v1';
const ASSETS_TO_CACHE = [
  '/mfrepo/xaut.html',
  '/mfrepo/manifest.json',
  '/mfrepo/asset/MahmoudFouda.png',
  'https://unpkg.com/lightweight-charts@4.1.3/dist/lightweight-charts.standalone.production.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('/mfrepo/xaut.html');
        }
      });
    })
  );
});
