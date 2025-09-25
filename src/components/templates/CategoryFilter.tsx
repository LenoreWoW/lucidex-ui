'use client';

import React from 'react';
import { TemplateCategory, TemplateCollection } from '@/types/templates';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface CategoryFilterProps {
  categories: TemplateCollection[];
  selectedCategories: TemplateCategory[];
  onCategoryChange: (categories: TemplateCategory[]) => void;
  statistics: {
    totalTemplates: number;
    categoryCounts: Record<TemplateCategory, number>;
  };
}

export function CategoryFilter({
  categories,
  selectedCategories,
  onCategoryChange,
  statistics,
}: CategoryFilterProps) {
  const [expandedCategories, setExpandedCategories] = React.useState<
    TemplateCategory[]
  >([]);

  const toggleCategory = (category: TemplateCategory) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const toggleExpanded = (category: TemplateCategory) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter(c => c !== category));
    } else {
      setExpandedCategories([...expandedCategories, category]);
    }
  };

  const selectAllCategories = () => {
    onCategoryChange(categories.map(c => c.category));
  };

  const clearAllCategories = () => {
    onCategoryChange([]);
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-neutral-900">Categories</h3>
        <div className="text-xs text-neutral-500">
          {statistics.totalTemplates} total
        </div>
      </div>

      {/* Select/Clear All */}
      <div className="mb-4 flex items-center space-x-2 border-b border-neutral-200 pb-4">
        <button
          onClick={selectAllCategories}
          className="text-primary-600 hover:text-primary-700 text-xs"
          disabled={selectedCategories.length === categories.length}
        >
          Select All
        </button>
        <span className="text-neutral-300">|</span>
        <button
          onClick={clearAllCategories}
          className="text-xs text-neutral-500 hover:text-neutral-700"
          disabled={selectedCategories.length === 0}
        >
          Clear
        </button>
      </div>

      {/* Category List */}
      <div className="space-y-2">
        {categories.map(collection => {
          const isSelected = selectedCategories.includes(collection.category);
          const isExpanded = expandedCategories.includes(collection.category);
          const count = statistics.categoryCounts[collection.category] || 0;

          return (
            <div key={collection.category} className="group">
              {/* Category Header */}
              <div className="flex items-center">
                <label className="flex flex-1 cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleCategory(collection.category)}
                    className="text-primary-600 focus:ring-primary-500 rounded border-neutral-300 focus:ring-offset-0"
                  />
                  <div className="ml-2 min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="truncate text-sm font-medium text-neutral-700">
                        {collection.name}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${
                          isSelected
                            ? 'bg-primary-100 text-primary-700'
                            : 'bg-neutral-100 text-neutral-500'
                        }`}
                      >
                        {count}
                      </span>
                    </div>
                  </div>
                </label>

                {/* Expand/Collapse Button */}
                <button
                  onClick={() => toggleExpanded(collection.category)}
                  className="ml-1 p-1 text-neutral-400 opacity-0 transition-opacity hover:text-neutral-600 group-hover:opacity-100"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                </button>
              </div>

              {/* Category Description (when expanded) */}
              {isExpanded && (
                <div className="ml-6 mt-2 pb-2">
                  <p className="text-xs leading-relaxed text-neutral-500">
                    {collection.description}
                  </p>

                  {/* Template List */}
                  {collection.templates.length > 0 && (
                    <div className="mt-3 space-y-1">
                      <div className="mb-1 text-xs font-medium text-neutral-600">
                        Templates:
                      </div>
                      {collection.templates.slice(0, 5).map(template => (
                        <div
                          key={template.id}
                          className="border-l-2 border-neutral-100 pl-2 text-xs text-neutral-500"
                        >
                          {template.name}
                        </div>
                      ))}
                      {collection.templates.length > 5 && (
                        <div className="pl-2 text-xs text-neutral-400">
                          +{collection.templates.length - 5} more templates
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary */}
      {selectedCategories.length > 0 && (
        <div className="mt-6 border-t border-neutral-200 pt-4">
          <div className="text-xs text-neutral-600">
            <div className="mb-1 font-medium">Selected Categories:</div>
            <div className="space-y-1">
              {selectedCategories.map(category => {
                const collection = categories.find(
                  c => c.category === category
                );
                const count = statistics.categoryCounts[category] || 0;
                return (
                  <div
                    key={category}
                    className="flex items-center justify-between"
                  >
                    <span className="truncate">{collection?.name}</span>
                    <span className="bg-primary-100 text-primary-700 rounded px-1.5 py-0.5 text-xs">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-2 border-t border-neutral-100 pt-2 font-medium">
              Total:{' '}
              {selectedCategories.reduce(
                (sum, category) =>
                  sum + (statistics.categoryCounts[category] || 0),
                0
              )}{' '}
              templates
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
