'use client';

import { useEffect } from 'react';
import { registerServiceWorker, collectPerformanceMetrics, storeMetricsForSync } from '@/lib/serviceWorker';

export function ServiceWorkerRegistration() {
  useEffect(() => {
    // Only register service worker in production
    if (process.env.NODE_ENV === 'production') {
      registerServiceWorker({
        onSuccess: (registration) => {
          console.log('Service Worker registered successfully');
        },
        onUpdate: (registration) => {
          console.log('Service Worker updated');
          // You could show a notification to the user here
        },
        onError: (error) => {
          console.error('Service Worker registration failed:', error);
        },
      });

      // Collect and store performance metrics for background sync
      const collectMetrics = () => {
        const metrics = collectPerformanceMetrics();
        if (metrics) {
          storeMetricsForSync(metrics);
        }
      };

      // Collect metrics after page load
      if (document.readyState === 'complete') {
        collectMetrics();
      } else {
        window.addEventListener('load', collectMetrics);
      }

      // Cleanup
      return () => {
        window.removeEventListener('load', collectMetrics);
      };
    }
  }, []);

  // This component doesn't render anything
  return null;
}