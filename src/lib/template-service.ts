import Fuse from 'fuse.js';
import {
  Template,
  TemplateCategory,
  TemplateCollection,
  TemplateSearchResult,
  TemplateFilters,
  QatarGBADesignTokens,
  CodeSnippet,
} from '@/types/templates';

// Import all templates
import { dashboardLayoutTemplate } from '@/data/templates/dashboard-layout';
import { loginLayoutTemplate } from '@/data/templates/login-layout';
import { landingLayoutTemplate } from '@/data/templates/landing-layout';
import { error404LayoutTemplate } from '@/data/templates/error-404-layout';
import { emptyStateLayoutTemplate } from '@/data/templates/empty-state-layout';

// Qatar GBA Design Tokens
export const qatarGBADesignTokens: QatarGBADesignTokens = {
  colors: {
    primary: {
      50: '#fdf2f8',
      100: '#fce7f3',
      200: '#fbcfe8',
      300: '#f9a8d4',
      400: '#f472b6',
      500: '#ec4899',
      600: '#db2777',
      700: '#be185d',
      800: '#9d174d',
      900: '#831843',
    },
    secondary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      serif: ['Georgia', 'Times New Roman', 'serif'],
      mono: ['Monaco', 'Menlo', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
    },
    fontWeight: {
      thin: 100,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    lineHeight: {
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
  },
  spacing: {
    px: '1px',
    0: '0px',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
    40: '10rem',
    48: '12rem',
    56: '14rem',
    64: '16rem',
  },
  borderRadius: {
    none: '0px',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: '0 0 #0000',
  },
};

class TemplateService {
  private templates: Template[] = [
    dashboardLayoutTemplate,
    loginLayoutTemplate,
    landingLayoutTemplate,
    error404LayoutTemplate,
    emptyStateLayoutTemplate,
  ];

  private fuse: Fuse<Template>;

  constructor() {
    // Initialize Fuse.js for search functionality
    this.fuse = new Fuse(this.templates, {
      keys: [
        'name',
        'description',
        'tags',
        'category',
        'metadata.usageNotes',
        'metadata.designTokensUsed',
      ],
      threshold: 0.3,
      includeScore: true,
    });
  }

  /**
   * Get all templates
   */
  getAllTemplates(): Template[] {
    return this.templates;
  }

  /**
   * Get template by ID
   */
  getTemplateById(id: string): Template | undefined {
    return this.templates.find(template => template.id === id);
  }

  /**
   * Get templates by category
   */
  getTemplatesByCategory(category: TemplateCategory): Template[] {
    return this.templates.filter(template => template.category === category);
  }

  /**
   * Get all template categories with their templates
   */
  getTemplateCollections(): TemplateCollection[] {
    const categories = this.getCategories();

    return categories.map(category => ({
      category,
      name: this.getCategoryDisplayName(category),
      description: this.getCategoryDescription(category),
      templates: this.getTemplatesByCategory(category),
    }));
  }

  /**
   * Search templates
   */
  searchTemplates(query: string): TemplateSearchResult[] {
    if (!query.trim()) {
      return this.templates.map(template => ({
        template,
        score: 1,
        matchedFields: [],
      }));
    }

    const results = this.fuse.search(query);

    return results.map(result => ({
      template: result.item,
      score: 1 - (result.score || 0),
      matchedFields: result.matches?.map(match => match.key || '') || [],
    }));
  }

  /**
   * Filter templates based on criteria
   */
  filterTemplates(filters: TemplateFilters): Template[] {
    return this.templates.filter(template => {
      // Category filter
      if (filters.category && template.category !== filters.category) {
        return false;
      }

      // Tags filter
      if (filters.tags && filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.some(tag =>
          template.tags.includes(tag)
        );
        if (!hasMatchingTag) {
          return false;
        }
      }

      // Complexity filter
      if (
        filters.complexity &&
        template.metadata.complexity !== filters.complexity
      ) {
        return false;
      }

      // Responsive filter
      if (
        filters.responsive !== undefined &&
        template.responsive !== filters.responsive
      ) {
        return false;
      }

      // Accessible filter
      if (
        filters.accessible !== undefined &&
        template.accessible !== filters.accessible
      ) {
        return false;
      }

      // Qatar GBA compliant filter
      if (
        filters.qatarGBACompliant !== undefined &&
        template.qatarGBACompliant !== filters.qatarGBACompliant
      ) {
        return false;
      }

      // Language filter
      if (filters.language) {
        const hasLanguage = template.codeSnippets.some(
          snippet => snippet.language === filters.language
        );
        if (!hasLanguage) {
          return false;
        }
      }

      return true;
    });
  }

  /**
   * Get all unique tags from templates
   */
  getAllTags(): string[] {
    const tags = new Set<string>();
    this.templates.forEach(template => {
      template.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }

  /**
   * Get all unique categories
   */
  getCategories(): TemplateCategory[] {
    const categories = new Set<TemplateCategory>();
    this.templates.forEach(template => {
      categories.add(template.category);
    });
    return Array.from(categories).sort();
  }

  /**
   * Get code snippet by template ID and language
   */
  getCodeSnippet(
    templateId: string,
    language: CodeSnippet['language']
  ): CodeSnippet | undefined {
    const template = this.getTemplateById(templateId);
    return template?.codeSnippets.find(
      snippet => snippet.language === language
    );
  }

  /**
   * Get all available languages for a template
   */
  getAvailableLanguages(templateId: string): CodeSnippet['language'][] {
    const template = this.getTemplateById(templateId);
    return template?.codeSnippets.map(snippet => snippet.language) || [];
  }

  /**
   * Get templates by complexity
   */
  getTemplatesByComplexity(
    complexity: 'simple' | 'intermediate' | 'advanced'
  ): Template[] {
    return this.templates.filter(
      template => template.metadata.complexity === complexity
    );
  }

  /**
   * Get recommended templates based on a template
   */
  getRecommendedTemplates(templateId: string, limit: number = 3): Template[] {
    const template = this.getTemplateById(templateId);
    if (!template) return [];

    // Find templates with similar tags or category
    const candidates = this.templates.filter(t => t.id !== templateId);

    const scored = candidates.map(candidate => {
      let score = 0;

      // Same category gets higher score
      if (candidate.category === template.category) {
        score += 10;
      }

      // Shared tags get points
      const sharedTags = candidate.tags.filter(tag =>
        template.tags.includes(tag)
      );
      score += sharedTags.length * 2;

      // Same complexity gets points
      if (candidate.metadata.complexity === template.metadata.complexity) {
        score += 3;
      }

      // Same design tokens get points
      const sharedTokens =
        candidate.metadata.designTokensUsed?.filter(token =>
          template.metadata.designTokensUsed?.includes(token)
        ) || [];
      score += sharedTokens.length;

      return { template: candidate, score };
    });

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.template);
  }

  /**
   * Get template statistics
   */
  getStatistics() {
    const totalTemplates = this.templates.length;
    const categoryCounts = this.getCategories().reduce(
      (acc, category) => {
        acc[category] = this.getTemplatesByCategory(category).length;
        return acc;
      },
      {} as Record<TemplateCategory, number>
    );

    const complexityCounts = {
      simple: this.getTemplatesByComplexity('simple').length,
      intermediate: this.getTemplatesByComplexity('intermediate').length,
      advanced: this.getTemplatesByComplexity('advanced').length,
    };

    const languageCounts = {} as Record<CodeSnippet['language'], number>;
    this.templates.forEach(template => {
      template.codeSnippets.forEach(snippet => {
        languageCounts[snippet.language] =
          (languageCounts[snippet.language] || 0) + 1;
      });
    });

    return {
      totalTemplates,
      categoryCounts,
      complexityCounts,
      languageCounts,
      responsiveTemplates: this.templates.filter(t => t.responsive).length,
      accessibleTemplates: this.templates.filter(t => t.accessible).length,
      qatarGBACompliantTemplates: this.templates.filter(
        t => t.qatarGBACompliant
      ).length,
    };
  }

  /**
   * Get design tokens
   */
  getDesignTokens(): QatarGBADesignTokens {
    return qatarGBADesignTokens;
  }

  /**
   * Validate template structure
   */
  validateTemplate(template: Partial<Template>): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!template.id) errors.push('Template ID is required');
    if (!template.name) errors.push('Template name is required');
    if (!template.description) errors.push('Template description is required');
    if (!template.category) errors.push('Template category is required');
    if (!template.codeSnippets || template.codeSnippets.length === 0) {
      errors.push('At least one code snippet is required');
    }

    if (template.codeSnippets) {
      template.codeSnippets.forEach((snippet, index) => {
        if (!snippet.language)
          errors.push(`Code snippet ${index + 1}: language is required`);
        if (!snippet.code)
          errors.push(`Code snippet ${index + 1}: code is required`);
      });
    }

    if (!template.metadata) {
      errors.push('Template metadata is required');
    } else {
      if (!template.metadata.version)
        errors.push('Template version is required');
      if (!template.metadata.lastUpdated)
        errors.push('Template lastUpdated is required');
      if (!template.metadata.complexity)
        errors.push('Template complexity is required');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Get category display name
   */
  private getCategoryDisplayName(category: TemplateCategory): string {
    const names: Record<TemplateCategory, string> = {
      dashboard: 'Dashboard Layouts',
      authentication: 'Authentication Pages',
      'landing-page': 'Landing Pages',
      'error-page': 'Error Pages',
      'empty-state': 'Empty States',
      navigation: 'Navigation Components',
      forms: 'Form Layouts',
      'data-display': 'Data Display',
      feedback: 'Feedback Components',
      layout: 'Layout Templates',
    };

    return names[category] || category;
  }

  /**
   * Get category description
   */
  private getCategoryDescription(category: TemplateCategory): string {
    const descriptions: Record<TemplateCategory, string> = {
      dashboard:
        'Comprehensive dashboard layouts with navigation, headers, and content areas',
      authentication:
        'Secure and accessible authentication pages including login, register, and password reset',
      'landing-page':
        'Marketing and informational landing pages with hero sections and call-to-actions',
      'error-page':
        'User-friendly error pages with helpful navigation and recovery options',
      'empty-state':
        'Clean empty state designs for when content is unavailable or loading',
      navigation:
        'Navigation components including menus, breadcrumbs, and sidebars',
      forms: 'Form layouts for data collection and user input',
      'data-display':
        'Components for displaying data including tables, cards, and lists',
      feedback:
        'User feedback components like alerts, notifications, and confirmations',
      layout: 'General layout templates and page structures',
    };

    return descriptions[category] || '';
  }
}

// Export singleton instance
export const templateService = new TemplateService();

// Export common utility functions
export const getTemplateById = (id: string) =>
  templateService.getTemplateById(id);

export const searchTemplates = (query: string) =>
  templateService.searchTemplates(query);

export const filterTemplates = (filters: TemplateFilters) =>
  templateService.filterTemplates(filters);

export const getTemplateCollections = () =>
  templateService.getTemplateCollections();

export const getAllTags = () => templateService.getAllTags();

export const getDesignTokens = () => templateService.getDesignTokens();

export default templateService;
