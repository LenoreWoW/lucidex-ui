/**
 * Service Worker registration and management utilities
 * Handles offline functionality and caching strategies
 */

import React from 'react';

export interface ServiceWorkerConfig {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
  onError?: (error: Error) => void;
}

const isLocalhost = typeof window !== 'undefined' ? Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
) : false;

export function registerServiceWorker(config?: ServiceWorkerConfig) {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return;

  if ('serviceWorker' in navigator) {
    const publicUrl = new URL(
      process.env.PUBLIC_URL || '/',
      window.location.href
    );

    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/sw.js`;

      if (isLocalhost) {
        checkValidServiceWorker(swUrl, config);
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service worker.'
          );
        });
      } else {
        registerValidServiceWorker(swUrl, config);
      }
    });
  }
}

async function registerValidServiceWorker(swUrl: string, config?: ServiceWorkerConfig) {
  try {
    const registration = await navigator.serviceWorker.register(swUrl);

    registration.addEventListener('updatefound', () => {
      const installingWorker = registration.installing;

      if (installingWorker) {
        installingWorker.addEventListener('statechange', () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log('New content available; please refresh.');
              config?.onUpdate?.(registration);
            } else {
              console.log('Content cached for offline use.');
              config?.onSuccess?.(registration);
            }
          }
        });
      }
    });
  } catch (error) {
    console.error('Error during service worker registration:', error);
    config?.onError?.(error as Error);
  }
}

async function checkValidServiceWorker(swUrl: string, config?: ServiceWorkerConfig) {
  try {
    const response = await fetch(swUrl, {
      headers: { 'Service-Worker': 'script' },
    });

    const contentType = response.headers.get('content-type');

    if (
      response.status === 404 ||
      (contentType != null && contentType.indexOf('javascript') === -1)
    ) {
      const registration = await navigator.serviceWorker.ready;
      await registration.unregister();
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    } else {
      registerValidServiceWorker(swUrl, config);
    }
  } catch (error) {
    console.log('No internet connection found. App running in offline mode.');
  }
}

export function unregisterServiceWorker() {
  if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        registration.unregister();
      })
      .catch(error => {
        console.error(error.message);
      });
  }
}

// Service Worker communication utilities
export class ServiceWorkerMessenger {
  private static instance: ServiceWorkerMessenger;

  static getInstance(): ServiceWorkerMessenger {
    if (!ServiceWorkerMessenger.instance) {
      ServiceWorkerMessenger.instance = new ServiceWorkerMessenger();
    }
    return ServiceWorkerMessenger.instance;
  }

  async sendMessage(type: string, data?: any): Promise<any> {
    if (typeof navigator === 'undefined') {
      throw new Error('Service Worker not available');
    }

    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      return new Promise((resolve, reject) => {
        const messageChannel = new MessageChannel();

        messageChannel.port1.onmessage = (event) => {
          if (event.data.error) {
            reject(new Error(event.data.error));
          } else {
            resolve(event.data);
          }
        };

        navigator.serviceWorker.controller.postMessage(
          { type, data },
          [messageChannel.port2]
        );

        // Timeout after 10 seconds
        setTimeout(() => {
          reject(new Error('Service Worker message timeout'));
        }, 10000);
      });
    }

    throw new Error('Service Worker not available');
  }

  async getCacheInfo() {
    return this.sendMessage('GET_CACHE_INFO');
  }

  async clearCache() {
    return this.sendMessage('CLEAR_CACHE');
  }

  async prefetchRoutes(routes: string[]) {
    return this.sendMessage('PREFETCH_ROUTES', { routes });
  }

  skipWaiting() {
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
    }
  }
}

// Hook for React components to use Service Worker features
export function useServiceWorker() {
  const messenger = ServiceWorkerMessenger.getInstance();

  const updateAvailable = React.useState(false);
  const [isOffline, setIsOffline] = React.useState(
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  );

  React.useEffect(() => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return;

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Listen for service worker updates
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data.type === 'UPDATE_AVAILABLE') {
          updateAvailable[1](true);
        }
      });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return {
    isOffline,
    updateAvailable: updateAvailable[0],
    messenger,
    skipWaiting: messenger.skipWaiting.bind(messenger),
    clearCache: messenger.clearCache.bind(messenger),
    prefetchRoutes: messenger.prefetchRoutes.bind(messenger),
  };
}

// Performance metrics collection for background sync
export function collectPerformanceMetrics() {
  if (typeof window === 'undefined' || !('performance' in window)) {
    return null;
  }

  if ('performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const resources = performance.getEntriesByType('resource');

    return {
      timestamp: Date.now(),
      url: window.location.href,
      loadTime: navigation.loadEventEnd - navigation.loadEventStart,
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
      firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
      resourceCount: resources.length,
      totalResourceSize: resources.reduce((total, resource) => {
        return total + (resource as PerformanceResourceTiming).transferSize || 0;
      }, 0),
    };
  }

  return null;
}

// Store metrics for background sync
export function storeMetricsForSync(metrics: any) {
  if (typeof window === 'undefined' || !('localStorage' in window)) {
    return;
  }

  if ('localStorage' in window) {
    const storedMetrics = JSON.parse(localStorage.getItem('performance-metrics') || '[]');
    storedMetrics.push(metrics);

    // Keep only last 50 metrics
    if (storedMetrics.length > 50) {
      storedMetrics.splice(0, storedMetrics.length - 50);
    }

    localStorage.setItem('performance-metrics', JSON.stringify(storedMetrics));

    // Trigger background sync if available
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      navigator.serviceWorker.ready.then(registration => {
        return (registration as any).sync.register('performance-metrics');
      });
    }
  }
}