/**
 * Performance monitoring utilities for Lucidex UI Explorer
 * Provides hooks and utilities for measuring performance metrics
 */

import React, { useEffect, useRef, useCallback } from 'react';

// Performance metrics interface
export interface PerformanceMetrics {
  renderTime: number;
  bundleSize: number;
  memoryUsage: number;
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
}

// Core Web Vitals measurement
export function measureWebVitals(): Promise<Partial<PerformanceMetrics>> {
  return new Promise((resolve) => {
    const metrics: Partial<PerformanceMetrics> = {};

    // Measure LCP (Largest Contentful Paint)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      metrics.lcp = lastEntry.startTime;
      lcpObserver.disconnect();
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

    // Measure FID (First Input Delay)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name === 'first-input') {
          metrics.fid = entry.processingStart - entry.startTime;
        }
      });
      fidObserver.disconnect();
    });
    fidObserver.observe({ type: 'first-input', buffered: true });

    // Measure CLS (Cumulative Layout Shift)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      metrics.cls = clsValue;
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });

    // Measure TTFB (Time to First Byte)
    const navigationEntries = performance.getEntriesByType('navigation');
    if (navigationEntries.length > 0) {
      const nav = navigationEntries[0] as PerformanceNavigationTiming;
      metrics.ttfb = nav.responseStart - nav.fetchStart;
    }

    // Resolve after a short delay to collect metrics
    setTimeout(() => {
      clsObserver.disconnect();
      resolve(metrics);
    }, 3000);
  });
}

// Hook for measuring component render time
export function useRenderTime(componentName: string) {
  const renderStartTime = useRef<number>(0);

  useEffect(() => {
    renderStartTime.current = performance.now();

    return () => {
      const renderTime = performance.now() - renderStartTime.current;
      console.log(`[Performance] ${componentName} render time: ${renderTime.toFixed(2)}ms`);

      // Send to analytics if needed
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('event', 'timing_complete', {
          name: 'component_render',
          value: Math.round(renderTime),
          custom_parameter: componentName,
        });
      }
    };
  });
}

// Hook for measuring memory usage
export function useMemoryUsage() {
  const measureMemory = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit,
      };
    }
    return null;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const memory = measureMemory();
      if (memory) {
        console.log('[Performance] Memory usage:', {
          used: `${(memory.used / 1024 / 1024).toFixed(2)} MB`,
          total: `${(memory.total / 1024 / 1024).toFixed(2)} MB`,
          limit: `${(memory.limit / 1024 / 1024).toFixed(2)} MB`,
        });
      }
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, [measureMemory]);

  return measureMemory;
}

// Bundle size tracking utility
export function trackBundleSize() {
  if (typeof window !== 'undefined') {
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));

    let totalSize = 0;
    const resources: { name: string; size: number; type: 'js' | 'css' }[] = [];

    // Use Resource Timing API to get actual transfer sizes
    const resourceEntries = performance.getEntriesByType('resource');

    resourceEntries.forEach((entry) => {
      const resource = entry as PerformanceResourceTiming;
      if (resource.transferSize > 0) {
        totalSize += resource.transferSize;

        const isJS = resource.name.includes('.js') || resource.name.includes('/_next/static/chunks/');
        const isCSS = resource.name.includes('.css');

        if (isJS || isCSS) {
          resources.push({
            name: resource.name.split('/').pop() || resource.name,
            size: resource.transferSize,
            type: isJS ? 'js' : 'css',
          });
        }
      }
    });

    console.log('[Performance] Bundle Analysis:', {
      totalSize: `${(totalSize / 1024).toFixed(2)} KB`,
      resources: resources.sort((a, b) => b.size - a.size),
    });

    return { totalSize, resources };
  }
  return null;
}

// Performance observer for long tasks
export function observeLongTasks() {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.warn(`[Performance] Long task detected: ${entry.duration.toFixed(2)}ms`);

        // Send to analytics
        if (typeof window !== 'undefined' && 'gtag' in window) {
          (window as any).gtag('event', 'timing_complete', {
            name: 'long_task',
            value: Math.round(entry.duration),
          });
        }
      });
    });

    try {
      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      console.warn('[Performance] Long task observer not supported');
    }

    return () => observer.disconnect();
  }
  return () => {};
}

// Hook for performance monitoring initialization
export function usePerformanceMonitoring(componentName?: string) {
  const memoryMeasure = useMemoryUsage();

  useEffect(() => {
    // Initialize performance monitoring
    const cleanup = observeLongTasks();

    // Track initial bundle size
    setTimeout(() => {
      trackBundleSize();
    }, 1000);

    // Measure Web Vitals
    measureWebVitals().then((metrics) => {
      console.log('[Performance] Web Vitals:', metrics);
    });

    return cleanup;
  }, []);

  // Component-specific render time tracking
  if (componentName) {
    useRenderTime(componentName);
  }

  return {
    measureMemory: memoryMeasure,
    measureWebVitals,
    trackBundleSize,
  };
}

// Utility to create performance marks and measures
export function createPerformanceMark(name: string, detail?: any) {
  if ('performance' in window && 'mark' in performance) {
    performance.mark(name, { detail });
  }
}

export function measurePerformance(name: string, startMark: string, endMark?: string) {
  if ('performance' in window && 'measure' in performance) {
    try {
      if (endMark) {
        performance.measure(name, startMark, endMark);
      } else {
        performance.measure(name, startMark);
      }

      const entries = performance.getEntriesByName(name);
      if (entries.length > 0) {
        const entry = entries[entries.length - 1];
        console.log(`[Performance] ${name}: ${entry.duration.toFixed(2)}ms`);
        return entry.duration;
      }
    } catch (e) {
      console.warn(`[Performance] Failed to measure ${name}:`, e);
    }
  }
  return 0;
}

// Debounced performance logger
export function createPerformanceLogger() {
  let logTimeout: NodeJS.Timeout;
  const logs: Array<{ timestamp: number; message: string; data?: any }> = [];

  return {
    log: (message: string, data?: any) => {
      logs.push({ timestamp: Date.now(), message, data });

      clearTimeout(logTimeout);
      logTimeout = setTimeout(() => {
        if (logs.length > 0) {
          console.group('[Performance] Batch Logs');
          logs.forEach((log) => {
            console.log(log.message, log.data || '');
          });
          console.groupEnd();
          logs.length = 0; // Clear logs
        }
      }, 1000);
    },
    flush: () => {
      clearTimeout(logTimeout);
      if (logs.length > 0) {
        console.group('[Performance] Final Logs');
        logs.forEach((log) => {
          console.log(log.message, log.data || '');
        });
        console.groupEnd();
        logs.length = 0;
      }
    }
  };
}

// React Profiler component wrapper for performance tracking
export function withPerformanceTracking<P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
) {
  return function PerformanceWrapper(props: P) {
    useRenderTime(componentName);
    // @ts-ignore - JSX syntax issue in function
    return React.createElement(Component, props);
  };
}