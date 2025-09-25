/**
 * Comprehensive TypeScript types for Component Gallery metadata
 * Lucidex UI Explorer - Qatar GBA Design System
 */

// Core Framework Types
export type FrameworkType =
  | 'react'
  | 'nextjs'
  | 'blazor'
  | 'html'
  | 'vue'
  | 'angular';

export type ComponentStatus = 'stable' | 'beta' | 'experimental' | 'deprecated';

export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type ComponentVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'destructive'
  | 'success'
  | 'warning'
  | 'info'
  | 'muted';

// Accessibility Information
export interface AccessibilityInfo {
  ariaLabel?: string;
  ariaDescribedBy?: string;
  role?: string;
  keyboardSupport: string[];
  screenReaderSupport: boolean;
  wcagCompliance: 'A' | 'AA' | 'AAA';
  colorContrastRatio?: number;
  focusManagement?: string;
  landmarks?: string[];
}

// Props Definition
export interface PropDefinition {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: any;
  description: string;
  options?: string[] | number[] | boolean[];
  deprecated?: boolean;
  since?: string;
  example?: string;
}

// Code Implementation for Different Frameworks
export interface CodeImplementation {
  framework: FrameworkType;
  language: string;
  code: string;
  dependencies?: string[];
  imports?: string[];
  exports?: string[];
  styling?: {
    type: 'css' | 'tailwind' | 'styled-components' | 'emotion' | 'scss';
    code: string;
  };
}

// Usage Examples
export interface UsageExample {
  title: string;
  description: string;
  code: CodeImplementation[];
  preview?: string; // Base64 encoded image or URL
  interactive?: boolean;
}

// Qatar GBA Design Compliance
export interface QatarGBACompliance {
  brandColors: boolean;
  typography: boolean;
  spacing: boolean;
  elevation: boolean;
  culturalAdaptation?: {
    rtlSupport: boolean;
    arabicTypography?: boolean;
    culturalColors?: boolean;
    localizedContent?: boolean;
  };
  governmentStandards?: {
    accessibilityCompliant: boolean;
    securityStandards?: string[];
    dataPrivacy?: boolean;
  };
}

// Component Documentation
export interface ComponentDocumentation {
  overview: string;
  whenToUse: string[];
  whenNotToUse: string[];
  bestPractices: string[];
  commonMistakes: string[];
  relatedComponents: string[];
  designTokens?: {
    [key: string]: string | number;
  };
}

// Component Testing Information
export interface ComponentTesting {
  unitTests: boolean;
  integrationTests: boolean;
  accessibilityTests: boolean;
  visualRegressionTests: boolean;
  testCoverage?: number;
  testExamples?: {
    framework: FrameworkType;
    code: string;
  }[];
}

// Main Component Interface
export interface Component {
  // Basic Information
  id: string;
  name: string;
  displayName: string;
  description: string;
  category: ComponentCategory;
  subcategory?: string;
  tags: string[];

  // Status and Versioning
  status: ComponentStatus;
  version: string;
  lastUpdated: string;
  author?: string;
  maintainers?: string[];

  // Visual and Behavioral Properties
  variants: ComponentVariant[];
  sizes: ComponentSize[];
  customizable: boolean;
  responsive: boolean;

  // Technical Implementation
  implementations: CodeImplementation[];
  props: PropDefinition[];
  events?: {
    name: string;
    description: string;
    payload?: string;
  }[];

  // Documentation and Examples
  documentation: ComponentDocumentation;
  usageExamples: UsageExample[];

  // Compliance and Standards
  accessibility: AccessibilityInfo;
  qatarGBACompliance: QatarGBACompliance;

  // Testing and Quality
  testing: ComponentTesting;

  // Media and Assets
  thumbnail?: string;
  screenshots?: string[];
  figmaUrl?: string;
  storybookUrl?: string;

  // Relationships
  dependencies: string[];
  dependents?: string[];
  composedOf?: string[]; // For composite components
}

// Component Categories
export enum ComponentCategory {
  // Interactive Elements
  BUTTONS = 'buttons',
  FORMS = 'forms',
  NAVIGATION = 'navigation',

  // Data Display
  DATA_DISPLAY = 'data-display',
  MEDIA = 'media',
  TYPOGRAPHY = 'typography',

  // Feedback
  FEEDBACK = 'feedback',
  OVERLAYS = 'overlays',

  // Layout
  LAYOUT = 'layout',
  CONTAINERS = 'containers',

  // Specialized
  CHARTS = 'charts',
  MAPS = 'maps',
  CALENDAR = 'calendar',

  // Qatar GBA Specific
  GOVERNMENT = 'government',
  CULTURAL = 'cultural',
  ARABIC = 'arabic',
}

// Category Metadata
export interface CategoryMetadata {
  id: ComponentCategory;
  name: string;
  description: string;
  icon?: string;
  color?: string;
  order: number;
  components: Component[];
}

// Search and Filtering
export interface ComponentFilter {
  categories?: ComponentCategory[];
  status?: ComponentStatus[];
  frameworks?: FrameworkType[];
  tags?: string[];
  accessibility?: boolean;
  qatarGBACompliant?: boolean;
  hasExamples?: boolean;
  responsive?: boolean;
}

export interface SearchResult {
  component: Component;
  score: number;
  matchedFields: string[];
  highlights?: {
    [field: string]: string;
  };
}

export interface SearchOptions {
  query?: string;
  filters?: ComponentFilter;
  sortBy?: 'name' | 'category' | 'lastUpdated' | 'popularity' | 'relevance';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

// Component Collection and Management
export interface ComponentCollection {
  id: string;
  name: string;
  description: string;
  components: Component[];
  categories: CategoryMetadata[];
  version: string;
  lastUpdated: string;
  metadata: {
    totalComponents: number;
    frameworkSupport: FrameworkType[];
    accessibilityCompliance: number; // Percentage
    qatarGBACompliance: number; // Percentage
  };
}

// Export Configuration for Different Formats
export interface ExportConfig {
  format: 'json' | 'yaml' | 'markdown' | 'pdf' | 'figma-tokens' | 'storybook';
  components: string[];
  includeCode: boolean;
  includeDocumentation: boolean;
  includeExamples: boolean;
  framework?: FrameworkType;
}

// Component Analytics and Usage
export interface ComponentAnalytics {
  componentId: string;
  usage: {
    downloads: number;
    implementations: number;
    stars: number;
    forks: number;
  };
  performance: {
    bundleSize?: number;
    renderTime?: number;
    memoryUsage?: number;
  };
  feedback: {
    rating: number;
    reviews: number;
    issues: number;
  };
  trends: {
    period: string;
    usage: number[];
    satisfaction: number[];
  };
}

// Component Builder Configuration
export interface ComponentBuilder {
  baseComponent: string;
  customizations: {
    props: { [key: string]: any };
    styles: { [key: string]: string };
    variants: ComponentVariant[];
  };
  generateCode: (framework: FrameworkType) => string;
  preview: () => string;
}

// Theme and Design Token Integration
export interface ComponentTheme {
  tokens: {
    colors: { [key: string]: string };
    typography: { [key: string]: string | number };
    spacing: { [key: string]: string | number };
    shadows: { [key: string]: string };
    borderRadius: { [key: string]: string | number };
    breakpoints: { [key: string]: string };
  };
  components: {
    [componentId: string]: {
      [variant: string]: { [property: string]: string };
    };
  };
}

// Validation and Quality Checks
export interface ComponentValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
  score: number; // 0-100
  checks: {
    accessibility: boolean;
    performance: boolean;
    documentation: boolean;
    testing: boolean;
    compliance: boolean;
  };
}
