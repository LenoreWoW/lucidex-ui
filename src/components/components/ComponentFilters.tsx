'use client';

import { useState } from 'react';
import {
  Filter,
  ChevronDown,
  ChevronUp,
  X,
  CheckCircle,
  AlertTriangle,
  Clock,
  Palette,
  Smartphone,
  Accessibility,
  Shield,
  Star,
  Hash,
} from 'lucide-react';
import {
  ComponentFilter,
  ComponentCategory,
  ComponentStatus,
  FrameworkType,
  CategoryMetadata,
} from '@/types/components';

export interface ComponentFiltersProps {
  filters: ComponentFilter;
  onFiltersChange: (filters: Partial<ComponentFilter>) => void;
  onClearFilters: () => void;
  categories: CategoryMetadata[];
  popularTags: Array<{ tag: string; count: number }>;
  componentStats: {
    totalComponents: number;
    statusDistribution: Record<ComponentStatus, number>;
    categoryDistribution: Record<ComponentCategory, number>;
    frameworkSupport: Record<FrameworkType, number>;
    accessibilityCompliance: number;
    qatarGBACompliance: number;
  };
  isMobile?: boolean;
}

interface FilterSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  count?: number;
}

function FilterSection({
  title,
  icon,
  children,
  defaultExpanded = true,
  count,
}: FilterSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between p-4 transition-colors hover:bg-accent/50"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium">{title}</span>
          {count !== undefined && (
            <span className="text-xs text-muted-foreground">({count})</span>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      {isExpanded && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

export function ComponentFilters({
  filters,
  onFiltersChange,
  onClearFilters,
  categories,
  popularTags,
  componentStats,
  isMobile = false,
}: ComponentFiltersProps) {
  // Category filter handlers
  const handleCategoryToggle = (category: ComponentCategory) => {
    const currentCategories = filters.categories || [];
    const isSelected = currentCategories.includes(category);

    if (isSelected) {
      onFiltersChange({
        categories: currentCategories.filter(c => c !== category),
      });
    } else {
      onFiltersChange({
        categories: [...currentCategories, category],
      });
    }
  };

  // Status filter handlers
  const handleStatusToggle = (status: ComponentStatus) => {
    const currentStatuses = filters.status || [];
    const isSelected = currentStatuses.includes(status);

    if (isSelected) {
      onFiltersChange({
        status: currentStatuses.filter(s => s !== status),
      });
    } else {
      onFiltersChange({
        status: [...currentStatuses, status],
      });
    }
  };

  // Framework filter handlers
  const handleFrameworkToggle = (framework: FrameworkType) => {
    const currentFrameworks = filters.frameworks || [];
    const isSelected = currentFrameworks.includes(framework);

    if (isSelected) {
      onFiltersChange({
        frameworks: currentFrameworks.filter(f => f !== framework),
      });
    } else {
      onFiltersChange({
        frameworks: [...currentFrameworks, framework],
      });
    }
  };

  // Tag filter handlers
  const handleTagToggle = (tag: string) => {
    const currentTags = filters.tags || [];
    const isSelected = currentTags.includes(tag);

    if (isSelected) {
      onFiltersChange({
        tags: currentTags.filter(t => t !== tag),
      });
    } else {
      onFiltersChange({
        tags: [...currentTags, tag],
      });
    }
  };

  // Feature filter handlers
  const handleFeatureToggle = (
    feature: keyof ComponentFilter,
    value?: boolean
  ) => {
    onFiltersChange({
      [feature]: filters[feature] === value ? undefined : value,
    });
  };

  // Helper functions
  const getStatusIcon = (status: ComponentStatus) => {
    switch (status) {
      case 'stable':
        return <CheckCircle className="h-3 w-3 text-green-500" />;
      case 'beta':
        return <AlertTriangle className="h-3 w-3 text-yellow-500" />;
      case 'experimental':
        return <Clock className="h-3 w-3 text-blue-500" />;
      case 'deprecated':
        return <AlertTriangle className="h-3 w-3 text-red-500" />;
    }
  };

  const getFrameworkIcon = (framework: FrameworkType) => {
    const icons = {
      react: '⚛️',
      nextjs: '▲',
      blazor: '🔥',
      html: '🌐',
      vue: '💚',
      angular: '🅰️',
    };
    return icons[framework] || '📦';
  };

  const hasActiveFilters =
    (filters.categories && filters.categories.length > 0) ||
    (filters.status && filters.status.length > 0) ||
    (filters.frameworks && filters.frameworks.length > 0) ||
    (filters.tags && filters.tags.length > 0) ||
    filters.accessibility !== undefined ||
    filters.qatarGBACompliant !== undefined ||
    filters.hasExamples !== undefined ||
    filters.responsive !== undefined;

  return (
    <div
      className={`bg-background ${isMobile ? '' : 'sticky top-0'} h-full overflow-y-auto`}
    >
      {/* Header */}
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold">Filters</h2>
          </div>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-xs text-muted-foreground underline hover:text-foreground"
            >
              Clear all
            </button>
          )}
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          {componentStats.totalComponents} total components
        </p>
      </div>

      {/* Categories */}
      <FilterSection
        title="Categories"
        icon={<Palette className="h-4 w-4 text-muted-foreground" />}
        count={categories.length}
      >
        <div className="space-y-2">
          {categories.map(category => (
            <label
              key={category.id}
              className="-mx-2 flex cursor-pointer items-center gap-3 rounded px-2 py-1 hover:bg-accent/50"
            >
              <input
                type="checkbox"
                checked={filters.categories?.includes(category.id) || false}
                onChange={() => handleCategoryToggle(category.id)}
                className="rounded border-border"
              />
              <div className="flex flex-1 items-center justify-between">
                <span className="text-sm">{category.name}</span>
                <span className="text-xs text-muted-foreground">
                  {componentStats.categoryDistribution[category.id] || 0}
                </span>
              </div>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Status */}
      <FilterSection
        title="Status"
        icon={<CheckCircle className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="space-y-2">
          {Object.entries(componentStats.statusDistribution).map(
            ([status, count]) => (
              <label
                key={status}
                className="-mx-2 flex cursor-pointer items-center gap-3 rounded px-2 py-1 hover:bg-accent/50"
              >
                <input
                  type="checkbox"
                  checked={
                    filters.status?.includes(status as ComponentStatus) || false
                  }
                  onChange={() => handleStatusToggle(status as ComponentStatus)}
                  className="rounded border-border"
                />
                <div className="flex flex-1 items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(status as ComponentStatus)}
                    <span className="text-sm capitalize">{status}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{count}</span>
                </div>
              </label>
            )
          )}
        </div>
      </FilterSection>

      {/* Frameworks */}
      <FilterSection
        title="Frameworks"
        icon={<span className="text-sm">⚛️</span>}
      >
        <div className="space-y-2">
          {Object.entries(componentStats.frameworkSupport).map(
            ([framework, count]) => (
              <label
                key={framework}
                className="-mx-2 flex cursor-pointer items-center gap-3 rounded px-2 py-1 hover:bg-accent/50"
              >
                <input
                  type="checkbox"
                  checked={
                    filters.frameworks?.includes(framework as FrameworkType) ||
                    false
                  }
                  onChange={() =>
                    handleFrameworkToggle(framework as FrameworkType)
                  }
                  className="rounded border-border"
                />
                <div className="flex flex-1 items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">
                      {getFrameworkIcon(framework as FrameworkType)}
                    </span>
                    <span className="text-sm capitalize">{framework}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{count}</span>
                </div>
              </label>
            )
          )}
        </div>
      </FilterSection>

      {/* Features */}
      <FilterSection
        title="Features"
        icon={<Star className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="space-y-3">
          <label className="-mx-2 flex cursor-pointer items-center gap-3 rounded px-2 py-1 hover:bg-accent/50">
            <input
              type="checkbox"
              checked={filters.responsive === true}
              onChange={() => handleFeatureToggle('responsive', true)}
              className="rounded border-border"
            />
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Responsive Design</span>
            </div>
          </label>

          <label className="-mx-2 flex cursor-pointer items-center gap-3 rounded px-2 py-1 hover:bg-accent/50">
            <input
              type="checkbox"
              checked={filters.accessibility === true}
              onChange={() => handleFeatureToggle('accessibility', true)}
              className="rounded border-border"
            />
            <div className="flex items-center gap-2">
              <Accessibility className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Accessibility Support</span>
            </div>
          </label>

          <label className="-mx-2 flex cursor-pointer items-center gap-3 rounded px-2 py-1 hover:bg-accent/50">
            <input
              type="checkbox"
              checked={filters.qatarGBACompliant === true}
              onChange={() => handleFeatureToggle('qatarGBACompliant', true)}
              className="rounded border-border"
            />
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Qatar GBA Compliant</span>
            </div>
          </label>

          <label className="-mx-2 flex cursor-pointer items-center gap-3 rounded px-2 py-1 hover:bg-accent/50">
            <input
              type="checkbox"
              checked={filters.hasExamples === true}
              onChange={() => handleFeatureToggle('hasExamples', true)}
              className="rounded border-border"
            />
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Has Usage Examples</span>
            </div>
          </label>
        </div>
      </FilterSection>

      {/* Popular Tags */}
      <FilterSection
        title="Popular Tags"
        icon={<Hash className="h-4 w-4 text-muted-foreground" />}
        defaultExpanded={false}
        count={popularTags.length}
      >
        <div className="space-y-2">
          {popularTags.slice(0, 10).map(({ tag, count }) => (
            <label
              key={tag}
              className="-mx-2 flex cursor-pointer items-center gap-3 rounded px-2 py-1 hover:bg-accent/50"
            >
              <input
                type="checkbox"
                checked={filters.tags?.includes(tag) || false}
                onChange={() => handleTagToggle(tag)}
                className="rounded border-border"
              />
              <div className="flex flex-1 items-center justify-between">
                <span className="text-sm">#{tag}</span>
                <span className="text-xs text-muted-foreground">{count}</span>
              </div>
            </label>
          ))}
          {popularTags.length > 10 && (
            <div className="pt-2 text-center text-xs text-muted-foreground">
              +{popularTags.length - 10} more tags available
            </div>
          )}
        </div>
      </FilterSection>

      {/* Compliance Stats */}
      <div className="border-t border-border bg-muted/30 p-4">
        <div className="space-y-1 text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>Accessibility Compliance</span>
            <span>{componentStats.accessibilityCompliance}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Qatar GBA Compliance</span>
            <span>{componentStats.qatarGBACompliance}%</span>
          </div>
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="border-t border-border bg-primary/5 p-4">
          <div className="mb-2 text-xs text-muted-foreground">
            Active Filters:
          </div>
          <div className="flex flex-wrap gap-1">
            {filters.categories?.map(category => (
              <div
                key={category}
                className="flex items-center gap-1 rounded bg-primary/10 px-2 py-1 text-xs text-primary"
              >
                <span>{categories.find(c => c.id === category)?.name}</span>
                <button
                  onClick={() => handleCategoryToggle(category)}
                  className="rounded-sm p-0.5 hover:bg-primary/20"
                >
                  <X className="h-2 w-2" />
                </button>
              </div>
            ))}
            {filters.status?.map(status => (
              <div
                key={status}
                className="flex items-center gap-1 rounded bg-primary/10 px-2 py-1 text-xs text-primary"
              >
                <span className="capitalize">{status}</span>
                <button
                  onClick={() => handleStatusToggle(status)}
                  className="rounded-sm p-0.5 hover:bg-primary/20"
                >
                  <X className="h-2 w-2" />
                </button>
              </div>
            ))}
            {filters.frameworks?.map(framework => (
              <div
                key={framework}
                className="flex items-center gap-1 rounded bg-primary/10 px-2 py-1 text-xs text-primary"
              >
                <span className="capitalize">{framework}</span>
                <button
                  onClick={() => handleFrameworkToggle(framework)}
                  className="rounded-sm p-0.5 hover:bg-primary/20"
                >
                  <X className="h-2 w-2" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
