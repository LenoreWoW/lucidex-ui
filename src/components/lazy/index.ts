/**
 * Lazy-loaded components for better performance
 * These components will be loaded on-demand to reduce initial bundle size
 */

import { lazy } from 'react';

// Heavy components that should be lazy-loaded
export const PreviewSystem = lazy(() =>
  import('@/components/preview/PreviewSystem').then(module => ({
    default: module.PreviewSystem
  }))
);

export const ComponentRenderer = lazy(() =>
  import('@/components/components/ComponentRenderer').then(module => ({
    default: module.ComponentRenderer
  }))
);

export const ComponentPreview = lazy(() =>
  import('@/components/components/ComponentPreview').then(module => ({
    default: module.ComponentPreview
  }))
);

export const PropsPanel = lazy(() =>
  import('@/components/components/PropsPanel').then(module => ({
    default: module.PropsPanel
  }))
);

export const TemplateBrowser = lazy(() =>
  import('@/components/templates/TemplateBrowser').then(module => ({
    default: module.TemplateBrowser
  }))
);

export const TemplateGrid = lazy(() =>
  import('@/components/templates/TemplateGrid').then(module => ({
    default: module.TemplateGrid
  }))
);

export const ComponentBrowser = lazy(() =>
  import('@/components/components/ComponentBrowser').then(module => ({
    default: module.ComponentBrowser
  }))
);

export const TokenViewer = lazy(() =>
  import('@/components/tokens/TokenViewer').then(module => ({
    default: module.TokenViewer
  }))
);

export const AccessibilityChecker = lazy(() =>
  import('@/components/accessibility/AccessibilityChecker').then(module => ({
    default: module.AccessibilityChecker
  }))
);

export const DocumentationSearch = lazy(() =>
  import('@/components/docs/DocumentationSearch').then(module => ({
    default: module.DocumentationSearch
  }))
);