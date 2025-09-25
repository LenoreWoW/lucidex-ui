export interface CodeSnippet {
  language: 'react' | 'nextjs' | 'blazor' | 'html' | 'typescript';
  code: string;
  filename?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  tags: string[];
  preview?: string;
  thumbnailUrl?: string;
  codeSnippets: CodeSnippet[];
  metadata: TemplateMetadata;
  responsive: boolean;
  accessible: boolean;
  qatarGBACompliant: boolean;
}

export interface TemplateMetadata {
  author?: string;
  version: string;
  lastUpdated: string;
  dependencies?: string[];
  complexity: 'simple' | 'intermediate' | 'advanced';
  estimatedImplementationTime?: string;
  usageNotes?: string;
  designTokensUsed?: string[];
}

export type TemplateCategory =
  | 'dashboard'
  | 'authentication'
  | 'landing-page'
  | 'error-page'
  | 'empty-state'
  | 'navigation'
  | 'forms'
  | 'data-display'
  | 'feedback'
  | 'layout';

export interface TemplateCollection {
  category: TemplateCategory;
  name: string;
  description: string;
  templates: Template[];
}

export interface TemplateSearchResult {
  template: Template;
  score: number;
  matchedFields: string[];
}

export interface TemplateFilters {
  category?: TemplateCategory;
  tags?: string[];
  complexity?: TemplateMetadata['complexity'];
  responsive?: boolean;
  accessible?: boolean;
  qatarGBACompliant?: boolean;
  language?: CodeSnippet['language'];
}

export interface QatarGBADesignTokens {
  colors: {
    primary: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    secondary: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    neutral: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  typography: {
    fontFamily: {
      sans: string[];
      serif: string[];
      mono: string[];
    };
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      '5xl': string;
      '6xl': string;
    };
    fontWeight: {
      thin: number;
      light: number;
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
      extrabold: number;
      black: number;
    };
    lineHeight: {
      tight: string;
      snug: string;
      normal: string;
      relaxed: string;
      loose: string;
    };
  };
  spacing: {
    px: string;
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    8: string;
    10: string;
    12: string;
    16: string;
    20: string;
    24: string;
    32: string;
    40: string;
    48: string;
    56: string;
    64: string;
  };
  borderRadius: {
    none: string;
    sm: string;
    base: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    full: string;
  };
  shadows: {
    sm: string;
    base: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    inner: string;
    none: string;
  };
}
