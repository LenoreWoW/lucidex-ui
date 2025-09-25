'use client';

import React, { useState, useMemo } from 'react';
import { TemplateCategory, Template, TemplateFilters } from '@/types/templates';
import { templateService } from '@/lib/template-service';
import { CategoryFilter } from './CategoryFilter';
import { TemplateGrid } from './TemplateGrid';
import { Search, Grid, List, Filter } from 'lucide-react';

interface TemplateBrowserProps {
  initialCategory?: TemplateCategory;
  onTemplateSelect?: (template: Template) => void;
}

type ViewMode = 'grid' | 'list';

export function TemplateBrowser({
  initialCategory,
  onTemplateSelect,
}: TemplateBrowserProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<
    TemplateCategory[]
  >(initialCategory ? [initialCategory] : []);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [additionalFilters, setAdditionalFilters] = useState<
    Omit<TemplateFilters, 'category' | 'tags'>
  >({});

  // Get all templates and collections
  const allTemplates = useMemo(() => templateService.getAllTemplates(), []);
  const templateCollections = useMemo(
    () => templateService.getTemplateCollections(),
    []
  );
  const allTags = useMemo(() => templateService.getAllTags(), []);

  // Filter templates based on current criteria
  const filteredTemplates = useMemo(() => {
    let templates = allTemplates;

    // Apply search
    if (searchQuery.trim()) {
      const searchResults = templateService.searchTemplates(searchQuery);
      templates = searchResults.map(result => result.template);
    }

    // Apply filters
    const filters: TemplateFilters = {
      ...additionalFilters,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
    };

    if (selectedCategories.length > 0) {
      templates = templates.filter(template =>
        selectedCategories.includes(template.category)
      );
    }

    if (
      Object.keys(filters).some(
        key => filters[key as keyof TemplateFilters] !== undefined
      )
    ) {
      templates = templateService.filterTemplates(filters);
    }

    return templates;
  }, [
    allTemplates,
    searchQuery,
    selectedCategories,
    selectedTags,
    additionalFilters,
  ]);

  // Get statistics for the filter sidebar
  const statistics = useMemo(() => templateService.getStatistics(), []);

  return (
    <div className="flex h-full bg-neutral-50">
      {/* Sidebar with categories and filters */}
      <div
        className={`flex w-80 flex-col border-r border-neutral-200 bg-white transition-all duration-200 ${
          showFilters ? 'translate-x-0' : '-translate-x-80 lg:translate-x-0'
        }`}
      >
        <div className="border-b border-neutral-200 p-6">
          <h2 className="mb-4 text-lg font-semibold text-neutral-900">
            Template Library
          </h2>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-neutral-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-lg border border-neutral-300 py-2 pl-10 pr-4 text-sm focus:ring-2"
            />
          </div>

          {/* View mode toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`rounded-md p-2 ${
                viewMode === 'grid'
                  ? 'bg-primary-100 text-primary-600'
                  : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`rounded-md p-2 ${
                viewMode === 'list'
                  ? 'bg-primary-100 text-primary-600'
                  : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <CategoryFilter
            categories={templateCollections}
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
            statistics={statistics}
          />

          {/* Additional Filters */}
          <div className="border-t border-neutral-200 p-6">
            <h3 className="mb-4 text-sm font-medium text-neutral-900">
              Filters
            </h3>

            {/* Tags Filter */}
            <div className="mb-4">
              <label className="mb-2 block text-xs font-medium text-neutral-700">
                Tags
              </label>
              <div className="max-h-32 space-y-2 overflow-y-auto">
                {allTags.slice(0, 10).map(tag => (
                  <label key={tag} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag)}
                      onChange={e => {
                        if (e.target.checked) {
                          setSelectedTags([...selectedTags, tag]);
                        } else {
                          setSelectedTags(selectedTags.filter(t => t !== tag));
                        }
                      }}
                      className="text-primary-600 focus:ring-primary-500 rounded border-neutral-300"
                    />
                    <span className="ml-2 text-xs text-neutral-600">{tag}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Complexity Filter */}
            <div className="mb-4">
              <label className="mb-2 block text-xs font-medium text-neutral-700">
                Complexity
              </label>
              <select
                value={additionalFilters.complexity || ''}
                onChange={e =>
                  setAdditionalFilters({
                    ...additionalFilters,
                    complexity: (e.target.value as any) || undefined,
                  })
                }
                className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-neutral-300 px-3 py-1.5 text-xs focus:ring-2"
              >
                <option value="">All Complexities</option>
                <option value="simple">Simple</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Feature Filters */}
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={additionalFilters.responsive || false}
                  onChange={e =>
                    setAdditionalFilters({
                      ...additionalFilters,
                      responsive: e.target.checked || undefined,
                    })
                  }
                  className="text-primary-600 focus:ring-primary-500 rounded border-neutral-300"
                />
                <span className="ml-2 text-xs text-neutral-600">
                  Responsive
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={additionalFilters.accessible || false}
                  onChange={e =>
                    setAdditionalFilters({
                      ...additionalFilters,
                      accessible: e.target.checked || undefined,
                    })
                  }
                  className="text-primary-600 focus:ring-primary-500 rounded border-neutral-300"
                />
                <span className="ml-2 text-xs text-neutral-600">
                  Accessible
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={additionalFilters.qatarGBACompliant || false}
                  onChange={e =>
                    setAdditionalFilters({
                      ...additionalFilters,
                      qatarGBACompliant: e.target.checked || undefined,
                    })
                  }
                  className="text-primary-600 focus:ring-primary-500 rounded border-neutral-300"
                />
                <span className="ml-2 text-xs text-neutral-600">
                  Qatar GBA Compliant
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="border-b border-neutral-200 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="rounded-md p-2 text-neutral-400 hover:text-neutral-600 lg:hidden"
              >
                <Filter className="h-4 w-4" />
              </button>
              <h1 className="text-xl font-semibold text-neutral-900">
                Templates
                {filteredTemplates.length > 0 && (
                  <span className="ml-2 text-sm font-normal text-neutral-500">
                    ({filteredTemplates.length}{' '}
                    {filteredTemplates.length === 1 ? 'template' : 'templates'})
                  </span>
                )}
              </h1>
            </div>

            {/* Clear filters */}
            {(selectedCategories.length > 0 ||
              selectedTags.length > 0 ||
              searchQuery ||
              Object.keys(additionalFilters).some(
                key => additionalFilters[key as keyof typeof additionalFilters]
              )) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategories([]);
                  setSelectedTags([]);
                  setAdditionalFilters({});
                }}
                className="text-primary-600 hover:text-primary-700 text-sm"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Active filters */}
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedCategories.map(category => {
              const collection = templateCollections.find(
                c => c.category === category
              );
              return (
                <span
                  key={category}
                  className="bg-primary-100 text-primary-700 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium"
                >
                  {collection?.name || category}
                  <button
                    onClick={() =>
                      setSelectedCategories(
                        selectedCategories.filter(c => c !== category)
                      )
                    }
                    className="text-primary-500 hover:text-primary-700 ml-1"
                  >
                    ×
                  </button>
                </span>
              );
            })}
            {selectedTags.map(tag => (
              <span
                key={tag}
                className="bg-secondary-100 text-secondary-700 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium"
              >
                {tag}
                <button
                  onClick={() =>
                    setSelectedTags(selectedTags.filter(t => t !== tag))
                  }
                  className="text-secondary-500 hover:text-secondary-700 ml-1"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Templates grid */}
        <div className="flex-1 overflow-y-auto">
          <TemplateGrid
            templates={filteredTemplates}
            viewMode={viewMode}
            onTemplateSelect={onTemplateSelect}
          />
        </div>
      </div>
    </div>
  );
}
