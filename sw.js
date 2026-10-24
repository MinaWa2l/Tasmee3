const CACHE_NAME = 'tasmee3-v7'; // Update this number on every new deployment
const ASSETS = [
  './',
  './index.html',
  './logo_hifz_192app.png',
  './logo_hifz_512app.png'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Forces the new version to take over immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    }).then(() => self.clients.claim()) // Instantly controls all open tabs/apps
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
