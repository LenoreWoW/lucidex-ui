'use client';

import { useState, useEffect, useMemo } from 'react';
import { Grid3X3, List, MoreHorizontal, Filter, X } from 'lucide-react';
import { componentService } from '@/lib/component-service';
import {
  ComponentCategory,
  ComponentFilter,
  SearchOptions,
  SearchResult,
} from '@/types/components';
import { ComponentCard } from './ComponentCard';
import { ComponentSearch } from './ComponentSearch';
import { ComponentFilters } from './ComponentFilters';

type ViewMode = 'grid' | 'list' | 'detailed';

export interface ComponentBrowserProps {
  initialCategory?: ComponentCategory;
  showFilters?: boolean;
  viewMode?: ViewMode;
  maxResults?: number;
}

export function ComponentBrowser({
  initialCategory,
  showFilters = true,
  viewMode: initialViewMode = 'grid',
  maxResults = 50,
}: ComponentBrowserProps) {
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [activeFilters, setActiveFilters] = useState<ComponentFilter>({
    categories: initialCategory ? [initialCategory] : [],
    status: [],
    frameworks: [],
    tags: [],
  });
  const [viewMode, setViewMode] = useState<ViewMode>(initialViewMode);
  const [loading, setLoading] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Component statistics
  const componentStats = useMemo(
    () => componentService.getComponentStats(),
    []
  );
  const categories = useMemo(() => componentService.getCategories(), []);
  const popularTags = useMemo(() => componentService.getPopularTags(20), []);

  // Perform search and filtering
  useEffect(() => {
    setLoading(true);

    const searchOptions: SearchOptions = {
      query: searchQuery,
      filters: activeFilters,
      sortBy: searchQuery ? 'relevance' : 'name',
      sortOrder: 'desc',
      limit: maxResults,
    };

    const results = componentService.searchComponents(searchOptions);
    setSearchResults(results);
    setLoading(false);
  }, [searchQuery, activeFilters, maxResults]);

  // Filter manipulation
  const updateFilters = (newFilters: Partial<ComponentFilter>) => {
    setActiveFilters(prev => ({
      ...prev,
      ...newFilters,
    }));
  };

  const clearFilters = () => {
    setActiveFilters({
      categories: initialCategory ? [initialCategory] : [],
      status: [],
      frameworks: [],
      tags: [],
    });
    setSearchQuery('');
  };

  const hasActiveFilters = useMemo(() => {
    return (
      searchQuery ||
      (activeFilters.categories &&
        activeFilters.categories.length > (initialCategory ? 1 : 0)) ||
      (activeFilters.status && activeFilters.status.length > 0) ||
      (activeFilters.frameworks && activeFilters.frameworks.length > 0) ||
      (activeFilters.tags && activeFilters.tags.length > 0) ||
      activeFilters.accessibility !== undefined ||
      activeFilters.qatarGBACompliant !== undefined ||
      activeFilters.hasExamples !== undefined ||
      activeFilters.responsive !== undefined
    );
  }, [searchQuery, activeFilters, initialCategory]);

  // Get view mode classes
  const getGridClasses = () => {
    switch (viewMode) {
      case 'grid':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4';
      case 'list':
        return 'space-y-2';
      case 'detailed':
        return 'space-y-6';
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4';
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex-none border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="p-4 lg:p-6">
          {/* Title and Stats */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {initialCategory
                  ? categories.find(c => c.id === initialCategory)?.name ||
                    'Components'
                  : 'Component Browser'}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {searchResults.length} of {componentStats.totalComponents}{' '}
                components
              </p>
            </div>

            {/* View Mode Controls */}
            <div className="flex items-center gap-2">
              <div className="hidden items-center rounded-lg border border-border p-1 md:flex">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`rounded p-1.5 ${
                    viewMode === 'grid'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`rounded p-1.5 ${
                    viewMode === 'list'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  aria-label="List view"
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('detailed')}
                  className={`rounded p-1.5 ${
                    viewMode === 'detailed'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  aria-label="Detailed view"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>

              {showFilters && (
                <button
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="flex items-center gap-2 rounded-md border border-border px-3 py-2 hover:bg-accent md:hidden"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                  {hasActiveFilters && (
                    <span className="rounded-full bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">
                      •
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <ComponentSearch
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search components by name, description, or tags..."
              suggestions={popularTags.slice(0, 8).map(tag => tag.tag)}
              results={searchResults.slice(0, 5)}
            />
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Active filters:
              </span>

              {/* Category filters */}
              {activeFilters.categories
                ?.filter(cat => !initialCategory || cat !== initialCategory)
                .map(category => (
                  <div
                    key={category}
                    className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                  >
                    <span>
                      {categories.find(c => c.id === category)?.name ||
                        category}
                    </span>
                    <button
                      onClick={() =>
                        updateFilters({
                          categories:
                            activeFilters.categories?.filter(
                              c => c !== category
                            ) || [],
                        })
                      }
                      className="rounded-sm p-0.5 hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}

              {/* Status filters */}
              {activeFilters.status?.map(status => (
                <div
                  key={status}
                  className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                >
                  <span className="capitalize">{status}</span>
                  <button
                    onClick={() =>
                      updateFilters({
                        status:
                          activeFilters.status?.filter(s => s !== status) || [],
                      })
                    }
                    className="rounded-sm p-0.5 hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}

              {/* Framework filters */}
              {activeFilters.frameworks?.map(framework => (
                <div
                  key={framework}
                  className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                >
                  <span className="capitalize">{framework}</span>
                  <button
                    onClick={() =>
                      updateFilters({
                        frameworks:
                          activeFilters.frameworks?.filter(
                            f => f !== framework
                          ) || [],
                      })
                    }
                    className="rounded-sm p-0.5 hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}

              {/* Clear all button */}
              <button
                onClick={clearFilters}
                className="text-xs text-muted-foreground underline hover:text-foreground"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Sidebar Filters */}
        {showFilters && (
          <div
            className={`w-64 flex-none border-r border-border bg-muted/50 ${showMobileFilters ? 'block' : 'hidden md:block'}`}
          >
            <div className="sticky top-0 h-full overflow-y-auto">
              <ComponentFilters
                filters={activeFilters}
                onFiltersChange={updateFilters}
                onClearFilters={clearFilters}
                categories={categories}
                popularTags={popularTags}
                componentStats={componentStats}
              />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="py-12 text-center">
                <div className="mb-4 text-6xl">🔍</div>
                <h3 className="mb-2 text-lg font-semibold">
                  No components found
                </h3>
                <p className="mb-4 text-muted-foreground">
                  {searchQuery || hasActiveFilters
                    ? 'Try adjusting your search or filters'
                    : 'No components available in this category'}
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center rounded-md border border-border px-4 py-2 hover:bg-accent"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              <div className={getGridClasses()}>
                {searchResults.map(result => (
                  <ComponentCard
                    key={result.component.id}
                    component={result.component}
                    viewMode={viewMode}
                    searchScore={result.score}
                    matchedFields={result.matchedFields}
                    highlights={result.highlights || {}}
                  />
                ))}
              </div>
            )}

            {/* Load More (if needed) */}
            {searchResults.length === maxResults && (
              <div className="mt-8 text-center">
                <p className="mb-4 text-sm text-muted-foreground">
                  Showing first {maxResults} results. Try refining your search
                  for more specific results.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {showMobileFilters && (
        <div
          className="fixed inset-0 z-50 bg-black/50 md:hidden"
          onClick={() => setShowMobileFilters(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-80 border-l border-border bg-background"
            onClick={e => e.stopPropagation()}
          >
            <div className="border-b border-border p-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Filters</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="rounded-md p-2 hover:bg-accent"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="h-full overflow-y-auto pb-20">
              <ComponentFilters
                filters={activeFilters}
                onFiltersChange={updateFilters}
                onClearFilters={clearFilters}
                categories={categories}
                popularTags={popularTags}
                componentStats={componentStats}
                isMobile={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
