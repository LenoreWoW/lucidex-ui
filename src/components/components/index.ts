// Component Browser System
export { ComponentBrowser } from './ComponentBrowser';
export type { ComponentBrowserProps } from './ComponentBrowser';

export { ComponentCard } from './ComponentCard';
export type { ComponentCardProps } from './ComponentCard';

export { ComponentSearch } from './ComponentSearch';
export type { ComponentSearchProps } from './ComponentSearch';

export { ComponentFilters } from './ComponentFilters';
export type { ComponentFiltersProps } from './ComponentFilters';

// Component Rendering Engine
export { ComponentRenderer, COMPONENT_STATES } from './ComponentRenderer';
export type {
  ComponentRendererProps,
  ComponentState,
  ComponentProps,
} from './ComponentRenderer';

export { PropsPanel } from './PropsPanel';
export type { PropsPanelProps, PropValue } from './PropsPanel';

export { ComponentPreview } from './ComponentPreview';
export type { ComponentPreviewProps } from './ComponentPreview';

export { ComponentStates } from './ComponentStates';
export type { ComponentStatesProps } from './ComponentStates';

// Framework Switcher and Renderers
export { FrameworkSwitcher } from './FrameworkSwitcher';
export { ReactRenderer } from './ReactRenderer';
export { NextRenderer } from './NextRenderer';
export { BlazorRenderer } from './BlazorRenderer';
export { HTMLRenderer } from './HTMLRenderer';
export { TypeScriptRenderer } from './TypeScriptRenderer';

// Component rendering types
export interface ComponentRenderError {
  componentName: string;
  error: string;
  timestamp: number;
  framework?: string;
  props?: Record<string, any>;
}

export interface ComponentMetrics {
  renderTime: number;
  errorCount: number;
  successCount: number;
  lastRender: number;
}

export interface SandboxConfig {
  allowScripts: boolean;
  allowSameOrigin: boolean;
  allowForms: boolean;
  allowPopups: boolean;
  allowModals: boolean;
}

export interface FrameworkConfig {
  id: string;
  name: string;
  version: string;
  cdnUrls: string[];
  dependencies: string[];
  setupScript?: string;
  teardownScript?: string;
}

// Utility functions
export const createDefaultProps = (props: any[]): Record<string, any> => {
  const defaults: Record<string, any> = {};
  props.forEach(prop => {
    if (prop.default !== undefined) {
      defaults[prop.name] = prop.default;
    }
  });
  return defaults;
};

export const validatePropValue = (value: any, type: string): boolean => {
  switch (type.toLowerCase()) {
    case 'string':
      return typeof value === 'string';
    case 'number':
    case 'integer':
      return typeof value === 'number' && !isNaN(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'array':
      return Array.isArray(value);
    case 'object':
      return typeof value === 'object' && value !== null;
    case 'function':
      return typeof value === 'function';
    default:
      return true; // Allow unknown types
  }
};

export const generateComponentId = (
  name: string,
  props: Record<string, any>
): string => {
  const propsHash = btoa(JSON.stringify(props)).slice(0, 8);
  return `${name.toLowerCase().replace(/\s+/g, '-')}-${propsHash}`;
};
