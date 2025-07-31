const CACHE_NAME = 'flappy-tron-cache-v1';
const FILES_TO_CACHE = [
  '/Flappy-Tron/',
  '/Flappy-Tron/index.html',
  '/Flappy-Tron/style.css',
  '/Flappy-Tron/main.js',
  '/Flappy-Tron/manifest.json',
  '/Flappy-Tron/icons/icon-192x192.png',
  '/Flappy-Tron/icons/icon-512x512.png',
  // Ajoute ici d'autres fichiers à mettre en cache (images, sons, etc.)
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});
