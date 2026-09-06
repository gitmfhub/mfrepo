const CACHE_NAME = 'xautchart-v1';
const urlsToCache = [
  'https://gitmfhub.github.io/xautchart/',
  'https://gitmfhub.github.io/xautchart/index.html',
  'https://gitmfhub.github.io/xautchart/manifest.json',
  'https://gitmfhub.github.io/xautchart/asset/MahmoudFouda.png'
  // يمكنك إضافة أي ملفات CSS أو JS أو صور أخرى تستخدمها في صفحتك هنا
];

// تثبيت الـ Service Worker وحفظ الملفات
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// جلب الملفات من الـ Cache أو من الشبكة
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // إذا وجدت الملف في الـ Cache أرجعه، وإلا اطلبه من الشبكة
        return response || fetch(event.request);
      })
  );
});

// تحديث الـ Service Worker عند وجود نسخة جديدة
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
