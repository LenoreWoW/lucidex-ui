/**
 * Component Service - Discovery, filtering, and search functionality
 * Lucidex UI Explorer - Qatar GBA Design System
 */

import {
  Component,
  ComponentCategory,
  ComponentFilter,
  ComponentStatus,
  FrameworkType,
  SearchOptions,
  SearchResult,
  ComponentCollection,
  CategoryMetadata,
  ComponentAnalytics,
  ComponentValidation,
} from '../types/components';

// Import component data
import { primaryButton } from '../data/components/buttons/primary-button';
import { secondaryButton } from '../data/components/buttons/secondary-button';
import { textInput } from '../data/components/forms/text-input';
import { card } from '../data/components/data-display/card';
import { alert } from '../data/components/feedback/alert';
import { container } from '../data/components/layout/container';

export class ComponentService {
  private static instance: ComponentService;
  private components: Map<string, Component> = new Map();
  private categories: Map<ComponentCategory, CategoryMetadata> = new Map();
  private searchIndex: Map<string, Component[]> = new Map();

  private constructor() {
    this.initializeComponents();
    this.initializeCategories();
    this.buildSearchIndex();
  }

  public static getInstance(): ComponentService {
    if (!ComponentService.instance) {
      ComponentService.instance = new ComponentService();
    }
    return ComponentService.instance;
  }

  /**
   * Initialize component registry with all available components
   */
  private initializeComponents(): void {
    const componentList = [
      primaryButton,
      secondaryButton,
      textInput,
      card,
      alert,
      container,
    ];

    componentList.forEach(component => {
      this.components.set(component.id, component);
    });
  }

  /**
   * Initialize category metadata
   */
  private initializeCategories(): void {
    const categoriesData: CategoryMetadata[] = [
      {
        id: ComponentCategory.BUTTONS,
        name: 'Buttons',
        description: 'Interactive button components for actions and navigation',
        icon: 'button',
        color: '#8b1538',
        order: 1,
        components: [],
      },
      {
        id: ComponentCategory.FORMS,
        name: 'Form Elements',
        description: 'Input fields, selects, and form controls',
        icon: 'form',
        color: '#2563eb',
        order: 2,
        components: [],
      },
      {
        id: ComponentCategory.DATA_DISPLAY,
        name: 'Data Display',
        description: 'Components for displaying and organizing data',
        icon: 'table',
        color: '#059669',
        order: 3,
        components: [],
      },
      {
        id: ComponentCategory.NAVIGATION,
        name: 'Navigation',
        description: 'Navigation and wayfinding components',
        icon: 'navigation',
        color: '#7c3aed',
        order: 4,
        components: [],
      },
      {
        id: ComponentCategory.FEEDBACK,
        name: 'Feedback',
        description: 'Alerts, toasts, and user feedback components',
        icon: 'bell',
        color: '#dc2626',
        order: 5,
        components: [],
      },
      {
        id: ComponentCategory.LAYOUT,
        name: 'Layout',
        description: 'Layout and structural components',
        icon: 'grid',
        color: '#6b7280',
        order: 6,
        components: [],
      },
    ];

    categoriesData.forEach(category => {
      // Get components for this category
      const categoryComponents = Array.from(this.components.values()).filter(
        component => component.category === category.id
      );

      category.components = categoryComponents;
      this.categories.set(category.id, category);
    });
  }

  /**
   * Build search index for fast text search
   */
  private buildSearchIndex(): void {
    const indexMap = new Map<string, Set<Component>>();

    this.components.forEach(component => {
      // Index by name, description, tags
      const searchTerms = [
        component.name.toLowerCase(),
        component.displayName.toLowerCase(),
        component.description.toLowerCase(),
        ...component.tags.map(tag => tag.toLowerCase()),
        component.category.toLowerCase(),
        component.subcategory?.toLowerCase() || '',
      ].filter(Boolean);

      searchTerms.forEach(term => {
        const words = term.split(/\s+/);
        words.forEach(word => {
          if (word.length > 2) {
            // Only index words longer than 2 characters
            if (!indexMap.has(word)) {
              indexMap.set(word, new Set());
            }
            indexMap.get(word)!.add(component);
          }
        });
      });
    });

    // Convert Sets to Arrays for easier processing
    indexMap.forEach((componentSet, term) => {
      this.searchIndex.set(term, Array.from(componentSet));
    });
  }

  /**
   * Get all components
   */
  public getAllComponents(): Component[] {
    return Array.from(this.components.values());
  }

  /**
   * Get component by ID
   */
  public getComponent(id: string): Component | undefined {
    return this.components.get(id);
  }

  /**
   * Get components by category
   */
  public getComponentsByCategory(category: ComponentCategory): Component[] {
    return Array.from(this.components.values())
      .filter(component => component.category === category)
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  /**
   * Get all categories with metadata
   */
  public getCategories(): CategoryMetadata[] {
    return Array.from(this.categories.values()).sort(
      (a, b) => a.order - b.order
    );
  }

  /**
   * Get category metadata by ID
   */
  public getCategory(
    categoryId: ComponentCategory
  ): CategoryMetadata | undefined {
    return this.categories.get(categoryId);
  }

  /**
   * Search components with advanced filtering
   */
  public searchComponents(options: SearchOptions): SearchResult[] {
    let results: SearchResult[] = [];

    if (options.query) {
      results = this.performTextSearch(options.query);
    } else {
      // No query, return all components with score 1
      results = Array.from(this.components.values()).map(component => ({
        component,
        score: 1,
        matchedFields: [],
      }));
    }

    // Apply filters
    if (options.filters) {
      results = this.applyFilters(results, options.filters);
    }

    // Sort results
    results = this.sortResults(
      results,
      options.sortBy || 'relevance',
      options.sortOrder || 'desc'
    );

    // Apply pagination
    if (options.limit || options.offset) {
      const offset = options.offset || 0;
      const limit = options.limit || results.length;
      results = results.slice(offset, offset + limit);
    }

    return results;
  }

  /**
   * Perform text-based search
   */
  private performTextSearch(query: string): SearchResult[] {
    const searchTerms = query
      .toLowerCase()
      .split(/\s+/)
      .filter(term => term.length > 0);
    const componentScores = new Map<
      string,
      { component: Component; score: number; matchedFields: string[] }
    >();

    searchTerms.forEach(term => {
      // Exact matches
      if (this.searchIndex.has(term)) {
        this.searchIndex.get(term)!.forEach(component => {
          const existing = componentScores.get(component.id);
          const score = (existing?.score || 0) + 2; // Higher score for exact matches
          const matchedFields = [
            ...(existing?.matchedFields || []),
            'exact_match',
          ];
          componentScores.set(component.id, {
            component,
            score,
            matchedFields,
          });
        });
      }

      // Partial matches
      Array.from(this.searchIndex.keys())
        .filter(indexTerm => indexTerm.includes(term) && indexTerm !== term)
        .forEach(indexTerm => {
          this.searchIndex.get(indexTerm)!.forEach(component => {
            const existing = componentScores.get(component.id);
            const score = (existing?.score || 0) + 1; // Lower score for partial matches
            const matchedFields = [
              ...(existing?.matchedFields || []),
              'partial_match',
            ];
            componentScores.set(component.id, {
              component,
              score,
              matchedFields,
            });
          });
        });
    });

    return Array.from(componentScores.values()).map(
      ({ component, score, matchedFields }) => ({
        component,
        score: score / searchTerms.length, // Normalize by number of search terms
        matchedFields: [...new Set(matchedFields)], // Remove duplicates
      })
    );
  }

  /**
   * Apply filters to search results
   */
  private applyFilters(
    results: SearchResult[],
    filters: ComponentFilter
  ): SearchResult[] {
    return results.filter(result => {
      const { component } = result;

      // Category filter
      if (filters.categories && filters.categories.length > 0) {
        if (!filters.categories.includes(component.category)) {
          return false;
        }
      }

      // Status filter
      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(component.status)) {
          return false;
        }
      }

      // Framework filter
      if (filters.frameworks && filters.frameworks.length > 0) {
        const componentFrameworks = component.implementations.map(
          impl => impl.framework
        );
        if (
          !filters.frameworks.some(framework =>
            componentFrameworks.includes(framework)
          )
        ) {
          return false;
        }
      }

      // Tags filter
      if (filters.tags && filters.tags.length > 0) {
        if (!filters.tags.some(tag => component.tags.includes(tag))) {
          return false;
        }
      }

      // Accessibility filter
      if (filters.accessibility !== undefined) {
        if (
          filters.accessibility &&
          !component.accessibility.screenReaderSupport
        ) {
          return false;
        }
      }

      // Qatar GBA compliance filter
      if (filters.qatarGBACompliant !== undefined) {
        if (
          filters.qatarGBACompliant &&
          !component.qatarGBACompliance.brandColors
        ) {
          return false;
        }
      }

      // Has examples filter
      if (filters.hasExamples !== undefined) {
        if (filters.hasExamples && component.usageExamples.length === 0) {
          return false;
        }
      }

      // Responsive filter
      if (filters.responsive !== undefined) {
        if (filters.responsive && !component.responsive) {
          return false;
        }
      }

      return true;
    });
  }

  /**
   * Sort search results
   */
  private sortResults(
    results: SearchResult[],
    sortBy: string,
    sortOrder: 'asc' | 'desc'
  ): SearchResult[] {
    const multiplier = sortOrder === 'asc' ? 1 : -1;

    return results.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.component.name.localeCompare(b.component.name) * multiplier;

        case 'category':
          return (
            a.component.category.localeCompare(b.component.category) *
            multiplier
          );

        case 'lastUpdated':
          return (
            (new Date(a.component.lastUpdated).getTime() -
              new Date(b.component.lastUpdated).getTime()) *
            multiplier
          );

        case 'relevance':
        default:
          return (b.score - a.score) * multiplier;
      }
    });
  }

  /**
   * Get component statistics
   */
  public getComponentStats() {
    const components = Array.from(this.components.values());
    const totalComponents = components.length;

    const statusCount = components.reduce(
      (acc, component) => {
        acc[component.status] = (acc[component.status] || 0) + 1;
        return acc;
      },
      {} as Record<ComponentStatus, number>
    );

    const categoryCount = components.reduce(
      (acc, component) => {
        acc[component.category] = (acc[component.category] || 0) + 1;
        return acc;
      },
      {} as Record<ComponentCategory, number>
    );

    const frameworkSupport = components.reduce(
      (acc, component) => {
        component.implementations.forEach(impl => {
          acc[impl.framework] = (acc[impl.framework] || 0) + 1;
        });
        return acc;
      },
      {} as Record<FrameworkType, number>
    );

    const accessibilityCompliant = components.filter(
      c =>
        c.accessibility.wcagCompliance === 'AA' ||
        c.accessibility.wcagCompliance === 'AAA'
    ).length;

    const qatarGBACompliant = components.filter(
      c => c.qatarGBACompliance.brandColors && c.qatarGBACompliance.typography
    ).length;

    return {
      totalComponents,
      statusDistribution: statusCount,
      categoryDistribution: categoryCount,
      frameworkSupport,
      accessibilityCompliance: Math.round(
        (accessibilityCompliant / totalComponents) * 100
      ),
      qatarGBACompliance: Math.round(
        (qatarGBACompliant / totalComponents) * 100
      ),
      averageTestCoverage: Math.round(
        components.reduce((sum, c) => sum + (c.testing.testCoverage || 0), 0) /
          totalComponents
      ),
    };
  }

  /**
   * Get popular tags
   */
  public getPopularTags(
    limit: number = 20
  ): Array<{ tag: string; count: number }> {
    const tagCount = new Map<string, number>();

    this.components.forEach(component => {
      component.tags.forEach(tag => {
        tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
      });
    });

    return Array.from(tagCount.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

  /**
   * Validate component data
   */
  public validateComponent(component: Component): ComponentValidation {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    // Required fields validation
    if (!component.id) errors.push('Component ID is required');
    if (!component.name) errors.push('Component name is required');
    if (!component.description)
      errors.push('Component description is required');
    if (!component.category) errors.push('Component category is required');

    // Implementation validation
    if (component.implementations.length === 0) {
      errors.push('At least one implementation is required');
    }

    // Props validation
    if (component.props.length === 0) {
      warnings.push('No props defined - consider documenting component props');
    }

    // Documentation validation
    if (!component.documentation.overview) {
      warnings.push('Missing documentation overview');
    }

    if (component.documentation.usageExamples.length === 0) {
      warnings.push('No usage examples provided');
    }

    // Accessibility validation
    if (!component.accessibility.screenReaderSupport) {
      errors.push(
        'Screen reader support is required for accessibility compliance'
      );
    }

    if (component.accessibility.wcagCompliance === 'A') {
      suggestions.push('Consider improving to WCAG AA compliance');
    }

    // Qatar GBA compliance validation
    if (!component.qatarGBACompliance.brandColors) {
      warnings.push('Component should follow Qatar GBA brand colors');
    }

    if (!component.qatarGBACompliance.culturalAdaptation?.rtlSupport) {
      warnings.push('RTL support is recommended for Qatar GBA compliance');
    }

    // Testing validation
    if (!component.testing.unitTests) {
      suggestions.push('Add unit tests for better quality assurance');
    }

    if ((component.testing.testCoverage || 0) < 80) {
      suggestions.push('Improve test coverage to at least 80%');
    }

    const score = Math.max(
      0,
      100 - errors.length * 20 - warnings.length * 10 - suggestions.length * 5
    );

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      suggestions,
      score,
      checks: {
        accessibility:
          component.accessibility.screenReaderSupport &&
          component.accessibility.wcagCompliance !== undefined,
        performance: component.implementations.length > 0,
        documentation:
          component.documentation.overview !== '' &&
          component.documentation.usageExamples.length > 0,
        testing:
          component.testing.unitTests &&
          (component.testing.testCoverage || 0) >= 70,
        compliance:
          component.qatarGBACompliance.brandColors &&
          component.qatarGBACompliance.typography,
      },
    };
  }

  /**
   * Get component collection
   */
  public getComponentCollection(): ComponentCollection {
    const components = Array.from(this.components.values());
    const categories = Array.from(this.categories.values());

    const frameworkSupport = [
      ...new Set(
        components.flatMap(c => c.implementations.map(impl => impl.framework))
      ),
    ] as FrameworkType[];

    const accessibilityCompliant = components.filter(
      c =>
        c.accessibility.wcagCompliance === 'AA' ||
        c.accessibility.wcagCompliance === 'AAA'
    ).length;

    const qatarGBACompliant = components.filter(
      c => c.qatarGBACompliance.brandColors && c.qatarGBACompliance.typography
    ).length;

    return {
      id: 'polaris-ui-components',
      name: 'Lucidex UI Component Library',
      description: 'Comprehensive Qatar GBA design system component library',
      components,
      categories,
      version: '1.0.0',
      lastUpdated: new Date().toISOString(),
      metadata: {
        totalComponents: components.length,
        frameworkSupport,
        accessibilityCompliance: Math.round(
          (accessibilityCompliant / components.length) * 100
        ),
        qatarGBACompliance: Math.round(
          (qatarGBACompliant / components.length) * 100
        ),
      },
    };
  }

  /**
   * Register a new component (for dynamic addition)
   */
  public registerComponent(component: Component): void {
    const validation = this.validateComponent(component);
    if (!validation.isValid) {
      throw new Error(`Invalid component: ${validation.errors.join(', ')}`);
    }

    this.components.set(component.id, component);
    this.rebuildIndexes();
  }

  /**
   * Rebuild search indexes after component changes
   */
  private rebuildIndexes(): void {
    this.searchIndex.clear();
    this.initializeCategories();
    this.buildSearchIndex();
  }

  /**
   * Get component dependencies graph
   */
  public getDependencyGraph(): { [componentId: string]: string[] } {
    const graph: { [componentId: string]: string[] } = {};

    this.components.forEach(component => {
      graph[component.id] = component.dependencies || [];
    });

    return graph;
  }

  /**
   * Find components that depend on a given component
   */
  public findDependents(componentId: string): Component[] {
    return Array.from(this.components.values()).filter(
      component =>
        (component.dependencies || []).includes(componentId) ||
        (component.dependents || []).includes(componentId)
    );
  }
}

// Export singleton instance
export const componentService = ComponentService.getInstance();
