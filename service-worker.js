// service-worker.js

const CACHE_NAME = 'bitcoin-price-monitor-v2';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/app.js',
    '/icon.png',  // Substitua isso com o caminho para seu ícone
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
