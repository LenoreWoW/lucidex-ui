'use client';

import { useEffect } from 'react';
import { registerServiceWorker, collectPerformanceMetrics, storeMetricsForSync } from '@/lib/serviceWorker';

export function ServiceWorkerRegistration() {
  useEffect(() => {
    // Register service worker in both development and production
    // In development, we'll handle this more gracefully
    const isDevelopment = process.env.NODE_ENV === 'development';

    try {
      registerServiceWorker({
        onSuccess: (registration) => {
          console.log('Service Worker registered successfully');
        },
        onUpdate: (registration) => {
          console.log('Service Worker updated');
          // You could show a notification to the user here
        },
        onError: (error) => {
          if (isDevelopment) {
            // In development, just log the error without throwing
            console.warn('Service Worker registration failed in development:', error);
          } else {
            // In production, log the error but don't crash
            console.error('Service Worker registration failed:', error);
          }
        },
      });

      // Only collect performance metrics in production
      if (!isDevelopment) {
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
    } catch (error) {
      console.warn('Service Worker initialization failed:', error);
    }
  }, []);

  // This component doesn't render anything
  return null;
}