const CACHE_NAME = 'fretebras-v21';

// Detect base path automatically
const getBasePath = () => {
  // Get the path where sw.js is located
  const swPath = self.location.pathname;
  // Remove /sw.js to get the base path
  const basePath = swPath.replace(/\/sw\.js$/, '');
  return basePath || '';
};

const BASE_PATH = getBasePath();
console.log('[ServiceWorker] Base path detected:', BASE_PATH || '(root)');
console.log('[ServiceWorker] Full location:', self.location.href);

// URLs to cache - only cache static assets, not JS/CSS bundles with hashes
const urlsToCache = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/index.html`,
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

  const url = new URL(event.request.url);

  // Don't cache JS/CSS files with hashes (they change every build)
  const isHashedAsset = /\.(js|css)$/.test(url.pathname) && /-[a-zA-Z0-9]{8,}\.(js|css)$/.test(url.pathname);

  // For hashed assets, always fetch from network
  if (isHashedAsset) {
    event.respondWith(
      fetch(event.request).catch((error) => {
        console.error('[ServiceWorker] Failed to fetch hashed asset:', event.request.url, error);
        throw error;
      })
    );
    return;
  }

  // For other requests, use cache-first strategy
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          console.log('[ServiceWorker] Serving from cache:', event.request.url);
          // For HTML files, still fetch in background to update cache
          if (event.request.mode === 'navigate') {
            fetch(event.request).then((fetchResponse) => {
              if (fetchResponse && fetchResponse.status === 200) {
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(event.request, fetchResponse);
                });
              }
            }).catch(() => {});
          }
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

          // Only cache static assets (not API calls)
          if (event.request.method === 'GET') {
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
          }

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
