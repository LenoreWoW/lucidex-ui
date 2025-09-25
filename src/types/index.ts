export interface Component {
  id: string;
  name: string;
  displayName?: string;
  description: string;
  category: string;
  tags: string[];
  preview?: string;
  code: string;
  props?: ComponentProp[];
  dependencies?: string[];
  features?: string[];
}

export interface ComponentCategory {
  id: string;
  name: string;
  description: string;
  components: Component[];
}

export interface SearchResult {
  component: Component;
  score: number;
}

export interface ComponentProp {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
  examples?: string[];
}

export type FrameworkType =
  | 'react'
  | 'nextjs'
  | 'blazor'
  | 'html'
  | 'typescript';

export interface Framework {
  id: FrameworkType;
  name: string;
  displayName: string;
  icon: string;
  description: string;
  fileExtension: string;
  language: string;
  dependencies: string[];
  installCommand?: string;
  features: string[];
  optimizations?: string[];
  bestPractices?: string[];
}

export interface GeneratedCode {
  framework: FrameworkType;
  filename: string;
  code: string;
  language: string;
  imports: string[];
  dependencies: string[];
  installationSteps?: string[];
  usageNotes?: string[];
}

export interface FrameworkContext {
  selectedFramework: FrameworkType;
  component: Component | null;
  generatedCode: GeneratedCode | null;
  setFramework: (framework: FrameworkType) => void;
  generateCode: (
    component: Component,
    framework: FrameworkType
  ) => GeneratedCode;
}

// Component rendering and preview types
export interface ComponentRenderer {
  id: string;
  name: string;
  version: string;
  supportedFrameworks: FrameworkType[];
  sandboxOptions?: SandboxOptions;
}

export interface SandboxOptions {
  allowScripts?: boolean;
  allowSameOrigin?: boolean;
  allowForms?: boolean;
  allowPopups?: boolean;
  allowModals?: boolean;
  timeout?: number;
}

export interface ComponentVariant {
  id: string;
  name: string;
  description: string;
  props: Record<string, any>;
  state?: string;
}

export interface ComponentExample {
  id: string;
  name: string;
  description: string;
  code: string;
  props: Record<string, any>;
  framework: FrameworkType;
  category: string;
}

export interface PreviewSettings {
  framework: FrameworkType;
  theme: 'light' | 'dark' | 'system';
  breakpoint: string;
  showStates: boolean;
  showProps: boolean;
  showCode: boolean;
  autoRefresh: boolean;
}

export type PropType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'array'
  | 'object'
  | 'function'
  | 'color'
  | 'select'
  | 'enum'
  | 'date'
  | 'file'
  | 'url';

export interface PropValidation {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: string;
  enum?: string[];
  custom?: (value: any) => boolean | string;
}
