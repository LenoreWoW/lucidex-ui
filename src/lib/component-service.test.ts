/**
 * Component Service Tests
 * Tests for component discovery, filtering, and search functionality
 */

import { ComponentService } from './component-service';
import {
  ComponentCategory,
  ComponentStatus,
  FrameworkType,
} from '../types/components';

describe('ComponentService', () => {
  let service: ComponentService;

  beforeEach(() => {
    service = ComponentService.getInstance();
  });

  describe('Component Management', () => {
    it('should load all components', () => {
      const components = service.getAllComponents();
      expect(components.length).toBeGreaterThan(0);
      console.log(`Loaded ${components.length} components`);
    });

    it('should get component by ID', () => {
      const component = service.getComponent('primary-button');
      expect(component).toBeDefined();
      expect(component?.name).toBe('PrimaryButton');
    });

    it('should return undefined for non-existent component', () => {
      const component = service.getComponent('non-existent');
      expect(component).toBeUndefined();
    });
  });

  describe('Category Management', () => {
    it('should get all categories', () => {
      const categories = service.getCategories();
      expect(categories.length).toBeGreaterThan(0);
      expect(categories[0]).toHaveProperty('name');
      expect(categories[0]).toHaveProperty('components');
    });

    it('should get components by category', () => {
      const buttonComponents = service.getComponentsByCategory(
        ComponentCategory.BUTTONS
      );
      expect(buttonComponents.length).toBeGreaterThan(0);
      expect(
        buttonComponents.every(c => c.category === ComponentCategory.BUTTONS)
      ).toBe(true);
    });

    it('should get category metadata', () => {
      const category = service.getCategory(ComponentCategory.BUTTONS);
      expect(category).toBeDefined();
      expect(category?.name).toBe('Buttons');
    });
  });

  describe('Search Functionality', () => {
    it('should search components by name', () => {
      const results = service.searchComponents({ query: 'button' });
      expect(results.length).toBeGreaterThan(0);
      expect(
        results.some(r => r.component.name.toLowerCase().includes('button'))
      ).toBe(true);
    });

    it('should search components by description', () => {
      const results = service.searchComponents({ query: 'Qatar GBA' });
      expect(results.length).toBeGreaterThan(0);
      expect(
        results.some(r => r.component.description.includes('Qatar GBA'))
      ).toBe(true);
    });

    it('should return all components with no query', () => {
      const results = service.searchComponents({});
      const allComponents = service.getAllComponents();
      expect(results.length).toBe(allComponents.length);
    });

    it('should score search results correctly', () => {
      const results = service.searchComponents({ query: 'primary button' });
      expect(results.length).toBeGreaterThan(0);
      // Results should be sorted by relevance (score)
      for (let i = 0; i < results.length - 1; i++) {
        expect(results[i].score).toBeGreaterThanOrEqual(results[i + 1].score);
      }
    });
  });

  describe('Filtering', () => {
    it('should filter by category', () => {
      const results = service.searchComponents({
        filters: {
          categories: [ComponentCategory.BUTTONS],
        },
      });
      expect(
        results.every(r => r.component.category === ComponentCategory.BUTTONS)
      ).toBe(true);
    });

    it('should filter by status', () => {
      const results = service.searchComponents({
        filters: {
          status: [ComponentStatus.STABLE],
        },
      });
      expect(
        results.every(r => r.component.status === ComponentStatus.STABLE)
      ).toBe(true);
    });

    it('should filter by framework support', () => {
      const results = service.searchComponents({
        filters: {
          frameworks: ['react' as FrameworkType],
        },
      });
      expect(
        results.every(r =>
          r.component.implementations.some(impl => impl.framework === 'react')
        )
      ).toBe(true);
    });

    it('should filter by accessibility', () => {
      const results = service.searchComponents({
        filters: {
          accessibility: true,
        },
      });
      expect(
        results.every(r => r.component.accessibility.screenReaderSupport)
      ).toBe(true);
    });

    it('should filter by Qatar GBA compliance', () => {
      const results = service.searchComponents({
        filters: {
          qatarGBACompliant: true,
        },
      });
      expect(
        results.every(r => r.component.qatarGBACompliance.brandColors)
      ).toBe(true);
    });

    it('should combine multiple filters', () => {
      const results = service.searchComponents({
        filters: {
          categories: [ComponentCategory.BUTTONS, ComponentCategory.FORMS],
          status: [ComponentStatus.STABLE],
          accessibility: true,
        },
      });

      expect(
        results.every(
          r =>
            [ComponentCategory.BUTTONS, ComponentCategory.FORMS].includes(
              r.component.category
            ) &&
            r.component.status === ComponentStatus.STABLE &&
            r.component.accessibility.screenReaderSupport
        )
      ).toBe(true);
    });
  });

  describe('Sorting and Pagination', () => {
    it('should sort by name', () => {
      const results = service.searchComponents({
        sortBy: 'name',
        sortOrder: 'asc',
      });
      for (let i = 0; i < results.length - 1; i++) {
        expect(
          results[i].component.name.localeCompare(results[i + 1].component.name)
        ).toBeLessThanOrEqual(0);
      }
    });

    it('should sort by category', () => {
      const results = service.searchComponents({
        sortBy: 'category',
        sortOrder: 'asc',
      });
      for (let i = 0; i < results.length - 1; i++) {
        expect(
          results[i].component.category.localeCompare(
            results[i + 1].component.category
          )
        ).toBeLessThanOrEqual(0);
      }
    });

    it('should apply pagination', () => {
      const allResults = service.searchComponents({});
      const pagedResults = service.searchComponents({
        limit: 2,
        offset: 1,
      });

      expect(pagedResults.length).toBe(Math.min(2, allResults.length - 1));
      if (allResults.length > 1) {
        expect(pagedResults[0].component.id).toBe(allResults[1].component.id);
      }
    });
  });

  describe('Statistics', () => {
    it('should provide component statistics', () => {
      const stats = service.getComponentStats();
      expect(stats).toHaveProperty('totalComponents');
      expect(stats).toHaveProperty('statusDistribution');
      expect(stats).toHaveProperty('categoryDistribution');
      expect(stats).toHaveProperty('frameworkSupport');
      expect(stats).toHaveProperty('accessibilityCompliance');
      expect(stats).toHaveProperty('qatarGBACompliance');
      expect(stats.totalComponents).toBeGreaterThan(0);
    });

    it('should provide popular tags', () => {
      const tags = service.getPopularTags();
      expect(Array.isArray(tags)).toBe(true);
      if (tags.length > 0) {
        expect(tags[0]).toHaveProperty('tag');
        expect(tags[0]).toHaveProperty('count');
        // Tags should be sorted by count (descending)
        for (let i = 0; i < tags.length - 1; i++) {
          expect(tags[i].count).toBeGreaterThanOrEqual(tags[i + 1].count);
        }
      }
    });
  });

  describe('Component Validation', () => {
    it('should validate existing components', () => {
      const component = service.getComponent('primary-button');
      expect(component).toBeDefined();

      if (component) {
        const validation = service.validateComponent(component);
        expect(validation).toHaveProperty('isValid');
        expect(validation).toHaveProperty('errors');
        expect(validation).toHaveProperty('warnings');
        expect(validation).toHaveProperty('suggestions');
        expect(validation).toHaveProperty('score');
        expect(validation.score).toBeGreaterThanOrEqual(0);
        expect(validation.score).toBeLessThanOrEqual(100);
      }
    });
  });

  describe('Component Collection', () => {
    it('should provide component collection metadata', () => {
      const collection = service.getComponentCollection();
      expect(collection).toHaveProperty('id');
      expect(collection).toHaveProperty('name');
      expect(collection).toHaveProperty('components');
      expect(collection).toHaveProperty('categories');
      expect(collection).toHaveProperty('metadata');
      expect(collection.components.length).toBeGreaterThan(0);
      expect(collection.categories.length).toBeGreaterThan(0);
    });
  });

  describe('Dependencies', () => {
    it('should provide dependency graph', () => {
      const graph = service.getDependencyGraph();
      expect(typeof graph).toBe('object');
      const componentIds = service.getAllComponents().map(c => c.id);
      componentIds.forEach(id => {
        expect(graph).toHaveProperty(id);
        expect(Array.isArray(graph[id])).toBe(true);
      });
    });
  });
});

// Manual test function for development
export function testComponentService() {
  const service = ComponentService.getInstance();

  console.log('=== Component Service Test Results ===');

  // Test basic functionality
  const components = service.getAllComponents();
  console.log(`✓ Loaded ${components.length} components`);

  // Test categories
  const categories = service.getCategories();
  console.log(`✓ Found ${categories.length} categories:`);
  categories.forEach(cat => {
    console.log(`  - ${cat.name}: ${cat.components.length} components`);
  });

  // Test search
  const searchResults = service.searchComponents({ query: 'button' });
  console.log(`✓ Search for 'button' returned ${searchResults.length} results`);

  // Test filtering
  const buttonComponents = service.searchComponents({
    filters: { categories: [ComponentCategory.BUTTONS] },
  });
  console.log(
    `✓ Button category filter returned ${buttonComponents.length} components`
  );

  // Test statistics
  const stats = service.getComponentStats();
  console.log(
    `✓ Statistics: ${stats.accessibilityCompliance}% accessible, ${stats.qatarGBACompliance}% Qatar GBA compliant`
  );

  // Test validation
  const primaryButton = service.getComponent('primary-button');
  if (primaryButton) {
    const validation = service.validateComponent(primaryButton);
    console.log(`✓ Primary button validation score: ${validation.score}/100`);
    if (validation.errors.length > 0) {
      console.log(`  Errors: ${validation.errors.join(', ')}`);
    }
    if (validation.warnings.length > 0) {
      console.log(`  Warnings: ${validation.warnings.join(', ')}`);
    }
  }

  console.log('=== Test Complete ===');
  return { success: true, componentCount: components.length };
}
