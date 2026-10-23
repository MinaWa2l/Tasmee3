const CACHE_NAME = 'tasmee3-v2';
const ASSETS = [
  './',
  './index.html',
  './logo_hifz_192.png',
  './logo_hifz_512app.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
