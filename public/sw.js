// Service Worker for Lucidex UI
// Provides offline functionality and performance optimizations

const CACHE_NAME = 'lucidex-ui-v1';
const OFFLINE_URL = '/offline.html';

// Assets to cache immediately on install
const STATIC_CACHE_URLS = [
  '/',
  '/offline.html',
  '/components',
  '/templates',
  '/tokens',
  '/_next/static/css/app/layout.css',
  '/_next/static/chunks/main.js',
  '/_next/static/chunks/pages/_app.js'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('Service Worker installing...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_CACHE_URLS.map(url => new Request(url, { mode: 'no-cors' })));
      })
      .then(() => {
        // Force activation of new service worker
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Error caching static assets:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker activating...');

  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // Take control of all clients
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) return;

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Handle different types of requests with appropriate strategies
  if (url.pathname.startsWith('/_next/static/')) {
    // Static assets: Cache First strategy
    event.respondWith(cacheFirstStrategy(request));
  } else if (url.pathname.startsWith('/api/')) {
    // API requests: Network First strategy
    event.respondWith(networkFirstStrategy(request));
  } else if (isNavigationRequest(request)) {
    // Navigation requests: Stale While Revalidate
    event.respondWith(staleWhileRevalidateStrategy(request));
  } else {
    // Other requests: Cache First with network fallback
    event.respondWith(cacheFirstStrategy(request));
  }
});

// Cache First strategy - good for static assets
async function cacheFirstStrategy(request) {
  try {
    const cacheResponse = await caches.match(request);
    if (cacheResponse) {
      return cacheResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.error('Cache First strategy failed:', error);
    // Return offline page for navigation requests
    if (isNavigationRequest(request)) {
      return caches.match(OFFLINE_URL);
    }
    throw error;
  }
}

// Network First strategy - good for API requests
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);

    if (networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache for:', request.url);
    const cacheResponse = await caches.match(request);
    if (cacheResponse) {
      return cacheResponse;
    }
    throw error;
  }
}

// Stale While Revalidate strategy - good for pages
async function staleWhileRevalidateStrategy(request) {
  const cache = await caches.open(CACHE_NAME);
  const cacheResponse = await cache.match(request);

  // Always try to fetch from network in background
  const fetchPromise = fetch(request)
    .then(networkResponse => {
      if (networkResponse.status === 200) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch(error => {
      console.error('Network fetch failed:', error);
    });

  // Return cache immediately if available, otherwise wait for network
  if (cacheResponse) {
    // Update cache in background
    fetchPromise;
    return cacheResponse;
  }

  try {
    return await fetchPromise;
  } catch (error) {
    // Return offline page as fallback
    return caches.match(OFFLINE_URL);
  }
}

// Helper function to check if request is navigation
function isNavigationRequest(request) {
  return request.mode === 'navigate' ||
         (request.method === 'GET' && request.headers.get('accept').includes('text/html'));
}

// Background sync for analytics and usage tracking
self.addEventListener('sync', event => {
  if (event.tag === 'performance-metrics') {
    event.waitUntil(syncPerformanceMetrics());
  }
});

async function syncPerformanceMetrics() {
  try {
    // Get stored metrics from IndexedDB or localStorage
    const metrics = await getStoredMetrics();

    if (metrics.length > 0) {
      // Send metrics to analytics endpoint
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ metrics }),
      });

      // Clear stored metrics after successful sync
      await clearStoredMetrics();
    }
  } catch (error) {
    console.error('Failed to sync performance metrics:', error);
  }
}

// Message handling for runtime communication
self.addEventListener('message', event => {
  const { type, data } = event.data;

  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;

    case 'GET_CACHE_INFO':
      getCacheInfo().then(info => {
        event.ports[0].postMessage(info);
      });
      break;

    case 'CLEAR_CACHE':
      clearAllCaches().then(() => {
        event.ports[0].postMessage({ success: true });
      });
      break;

    case 'PREFETCH_ROUTES':
      prefetchRoutes(data.routes);
      break;

    default:
      console.log('Unknown message type:', type);
  }
});

async function getCacheInfo() {
  const cacheNames = await caches.keys();
  const cacheInfo = await Promise.all(
    cacheNames.map(async name => {
      const cache = await caches.open(name);
      const keys = await cache.keys();
      return {
        name,
        size: keys.length,
        urls: keys.map(request => request.url)
      };
    })
  );

  return cacheInfo;
}

async function clearAllCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(cacheNames.map(name => caches.delete(name)));
}

async function prefetchRoutes(routes) {
  const cache = await caches.open(CACHE_NAME);

  for (const route of routes) {
    try {
      const response = await fetch(route);
      if (response.status === 200) {
        await cache.put(route, response);
      }
    } catch (error) {
      console.log('Failed to prefetch route:', route, error);
    }
  }
}

// Placeholder functions for metric storage (implement with IndexedDB in real app)
async function getStoredMetrics() {
  return []; // Implement with IndexedDB
}

async function clearStoredMetrics() {
  // Implement with IndexedDB
}