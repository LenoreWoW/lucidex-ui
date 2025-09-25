'use client';

import React, { useState, useMemo } from 'react';
import { Template } from '@/types/templates';
import { TemplateCard } from './TemplateCard';
import {
  ChevronLeft,
  ChevronRight,
  Grid,
  Layers,
  ArrowUpDown,
} from 'lucide-react';

interface TemplateGridProps {
  templates: Template[];
  viewMode: 'grid' | 'list';
  onTemplateSelect?: (template: Template) => void;
  itemsPerPage?: number;
  enablePagination?: boolean;
  enableInfiniteScroll?: boolean;
}

type SortOption = 'name' | 'category' | 'complexity' | 'updated';
type SortDirection = 'asc' | 'desc';

export function TemplateGrid({
  templates,
  viewMode,
  onTemplateSelect,
  itemsPerPage = 12,
  enablePagination = true,
  enableInfiniteScroll = false,
}: TemplateGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [displayedItems, setDisplayedItems] = useState(itemsPerPage);

  // Handle template actions
  const handlePreview = (template: Template) => {
    onTemplateSelect?.(template);
  };

  const handleCopy = async (template: Template) => {
    try {
      // Get the React code snippet by default, or the first available
      const reactSnippet = template.codeSnippets.find(
        s => s.language === 'react'
      );
      const codeSnippet = reactSnippet || template.codeSnippets[0];

      if (codeSnippet) {
        await navigator.clipboard.writeText(codeSnippet.code);
        // You could show a toast notification here
        console.log('Code copied to clipboard');
      }
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  const handleDownload = (template: Template) => {
    // Create a zip file or just download the primary code snippet
    const reactSnippet = template.codeSnippets.find(
      s => s.language === 'react'
    );
    const codeSnippet = reactSnippet || template.codeSnippets[0];

    if (codeSnippet) {
      const blob = new Blob([codeSnippet.code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download =
        codeSnippet.filename ||
        `${template.name.toLowerCase().replace(/\s+/g, '-')}.${codeSnippet.language}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  // Sort templates
  const sortedTemplates = useMemo(() => {
    const sorted = [...templates].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'category':
          aValue = a.category;
          bValue = b.category;
          break;
        case 'complexity':
          const complexityOrder = { simple: 1, intermediate: 2, advanced: 3 };
          aValue = complexityOrder[a.metadata.complexity];
          bValue = complexityOrder[b.metadata.complexity];
          break;
        case 'updated':
          aValue = new Date(a.metadata.lastUpdated).getTime();
          bValue = new Date(b.metadata.lastUpdated).getTime();
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [templates, sortBy, sortDirection]);

  // Paginate templates
  const paginatedTemplates = useMemo(() => {
    if (enableInfiniteScroll) {
      return sortedTemplates.slice(0, displayedItems);
    } else if (enablePagination) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      return sortedTemplates.slice(startIndex, startIndex + itemsPerPage);
    } else {
      return sortedTemplates;
    }
  }, [
    sortedTemplates,
    currentPage,
    itemsPerPage,
    enablePagination,
    enableInfiniteScroll,
    displayedItems,
  ]);

  // Pagination calculations
  const totalPages = enablePagination
    ? Math.ceil(sortedTemplates.length / itemsPerPage)
    : 1;
  const startIndex = enablePagination
    ? (currentPage - 1) * itemsPerPage + 1
    : 1;
  const endIndex = enablePagination
    ? Math.min(currentPage * itemsPerPage, sortedTemplates.length)
    : sortedTemplates.length;

  // Handle sort change
  const handleSortChange = (option: SortOption) => {
    if (sortBy === option) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(option);
      setSortDirection('asc');
    }
  };

  // Handle infinite scroll
  const loadMore = () => {
    if (enableInfiniteScroll && displayedItems < sortedTemplates.length) {
      setDisplayedItems(prev =>
        Math.min(prev + itemsPerPage, sortedTemplates.length)
      );
    }
  };

  // Empty state
  if (templates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-16">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-neutral-100">
          <Layers className="h-8 w-8 text-neutral-400" />
        </div>
        <h3 className="mb-2 text-lg font-medium text-neutral-900">
          No templates found
        </h3>
        <p className="max-w-md text-center text-neutral-500">
          Try adjusting your search criteria or filters to find the templates
          you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header with sorting */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-neutral-600">
            <span>
              Showing {startIndex}-{endIndex} of {sortedTemplates.length}{' '}
              templates
            </span>
          </div>
        </div>

        {/* Sort controls */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-neutral-600">Sort by:</span>
          <div className="flex items-center space-x-1">
            {[
              { value: 'name', label: 'Name' },
              { value: 'category', label: 'Category' },
              { value: 'complexity', label: 'Complexity' },
              { value: 'updated', label: 'Updated' },
            ].map(option => (
              <button
                key={option.value}
                onClick={() => handleSortChange(option.value as SortOption)}
                className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                  sortBy === option.value
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-neutral-600 hover:bg-neutral-100'
                } flex items-center space-x-1`}
              >
                <span>{option.label}</span>
                {sortBy === option.value && (
                  <ArrowUpDown
                    className={`h-3 w-3 transform transition-transform ${
                      sortDirection === 'desc' ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Templates Grid/List */}
      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'space-y-4'
        }
      >
        {paginatedTemplates.map(template => (
          <TemplateCard
            key={template.id}
            template={template}
            viewMode={viewMode}
            onPreview={handlePreview}
            onCopy={handleCopy}
            onDownload={handleDownload}
          />
        ))}
      </div>

      {/* Infinite scroll load more button */}
      {enableInfiniteScroll && displayedItems < sortedTemplates.length && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={loadMore}
            className="bg-primary-600 hover:bg-primary-700 rounded-lg px-6 py-2 text-white transition-colors"
          >
            Load More Templates
          </button>
        </div>
      )}

      {/* Pagination */}
      {enablePagination && totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between border-t border-neutral-200 pt-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-neutral-600">
              Page {currentPage} of {totalPages}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Previous button */}
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="rounded-md border border-neutral-300 p-2 text-neutral-600 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Page numbers */}
            <div className="flex items-center space-x-1">
              {/* First page */}
              {currentPage > 3 && (
                <>
                  <button
                    onClick={() => setCurrentPage(1)}
                    className="rounded-md px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100"
                  >
                    1
                  </button>
                  {currentPage > 4 && (
                    <span className="text-neutral-400">...</span>
                  )}
                </>
              )}

              {/* Current page range */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum =
                  Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                if (pageNum > totalPages) return null;

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`rounded-md px-3 py-1.5 text-sm ${
                      currentPage === pageNum
                        ? 'bg-primary-600 text-white'
                        : 'text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* Last page */}
              {currentPage < totalPages - 2 && (
                <>
                  {currentPage < totalPages - 3 && (
                    <span className="text-neutral-400">...</span>
                  )}
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className="rounded-md px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            {/* Next button */}
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="rounded-md border border-neutral-300 p-2 text-neutral-600 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
