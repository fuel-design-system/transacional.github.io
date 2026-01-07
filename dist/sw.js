const CACHE_NAME = 'fretebras-v19';

// Detect base path automatically based on the location
const getBasePath = () => {
  const pathname = self.location.pathname;
  // If we're on GitHub Pages, pathname will be like /transacional.github.io/sw.js
  // If we're on localhost or custom domain, pathname will be like /sw.js
  const match = pathname.match(/^(\/[^\/]+\.github\.io)/);
  return match ? match[1] : '';
};

const BASE_PATH = getBasePath();
console.log('[ServiceWorker] Base path detected:', BASE_PATH || '(root)');

// URLs to cache
const urlsToCache = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/index.html`,
  `${BASE_PATH}/404.html`,
  `${BASE_PATH}/manifest.json`,
  `${BASE_PATH}/icon-192.svg`,
  `${BASE_PATH}/icon-512.svg`,
  `${BASE_PATH}/apple-touch-icon.svg`
];

self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Installing with base path:', BASE_PATH || '(root)');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(urlsToCache).catch((err) => {
          console.error('[ServiceWorker] Error caching:', err);
          // Don't fail the install if caching fails
          return Promise.resolve();
        });
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          console.log('[ServiceWorker] Serving from cache:', event.request.url);
          return response;
        }
        
        console.log('[ServiceWorker] Fetching:', event.request.url);
        return fetch(event.request).then((response) => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch((error) => {
        console.error('[ServiceWorker] Fetch failed:', error);
        // If both cache and network fail, return the index.html from cache for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match(`${BASE_PATH}/index.html`);
        }
        throw error;
      })
  );
});
