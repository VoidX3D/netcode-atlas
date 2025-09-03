const CACHE_NAME = 'netcode-atlas-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/css/global.css',
  '/src/css/navbar.css',
  '/src/css/footer.css',
  '/src/js/main.js',
  '/src/js/auth.js',
  '/src/js/charts.js',
  '/public/images/hero.webp',
  '/public/data/dns-latency.json',
  '/public/data/protocols-adoption.json',
  '/public/data/html-tags.csv',
  '/public/data/tld-share.json'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});