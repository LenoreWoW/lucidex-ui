'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import Fuse from 'fuse.js';

interface SearchResult {
  title: string;
  content: string;
  url: string;
  category: string;
}

// Mock search data - in a real app, this would come from your content
const searchData: SearchResult[] = [
  {
    title: 'Getting Started',
    content: 'Learn the basics and get your first components up and running',
    url: '/docs/getting-started',
    category: 'Guide',
  },
  {
    title: 'Installation',
    content: 'Install and configure Lucidex UI in your project',
    url: '/docs/installation',
    category: 'Guide',
  },
  {
    title: 'React Framework',
    content: 'Components and hooks for React applications',
    url: '/docs/frameworks/react',
    category: 'Framework',
  },
  {
    title: 'Button Component',
    content: 'A versatile button component with multiple variants',
    url: '/docs/components/button',
    category: 'Component',
  },
  {
    title: 'Design Tokens',
    content: 'Colors, typography, spacing, and design foundations',
    url: '/docs/design-tokens',
    category: 'Design',
  },
  {
    title: 'Theming',
    content: 'Customize the look and feel to match your brand',
    url: '/docs/theming',
    category: 'Design',
  },
];

const fuseOptions = {
  keys: [
    { name: 'title', weight: 2 },
    { name: 'content', weight: 1 },
    { name: 'category', weight: 0.5 },
  ],
  threshold: 0.3,
  includeScore: true,
};

interface DocumentationSearchProps {
  className?: string;
}

export function DocumentationSearch({ className = '' }: DocumentationSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const fuse = useRef<Fuse<SearchResult>>(new Fuse(searchData, fuseOptions));

  useEffect(() => {
    if (query.trim()) {
      const searchResults = fuse.current.search(query);
      setResults(searchResults.slice(0, 8)); // Limit to 8 results
      setSelectedIndex(0);
    } else {
      setResults([]);
      setSelectedIndex(0);
    }
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      } else if (isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter' && results[selectedIndex]) {
          window.location.href = results[selectedIndex].item.url;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
    setSelectedIndex(0);
  };

  const CategoryBadge = ({ category }: { category: string }) => {
    const colors = {
      Guide: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      Framework: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      Component: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      Design: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    };

    return (
      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
        colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
      }`}>
        {category}
      </span>
    );
  };

  return (
    <>
      {/* Search Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300 ${className}`}
      >
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4" />
          <span>Search documentation...</span>
        </div>
        <div className="flex items-center space-x-1">
          <kbd className="inline-flex h-5 min-w-[20px] items-center justify-center rounded border border-gray-300 bg-gray-100 px-1 font-mono text-xs text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
            ⌘
          </kbd>
          <kbd className="inline-flex h-5 min-w-[20px] items-center justify-center rounded border border-gray-300 bg-gray-100 px-1 font-mono text-xs text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
            /
          </kbd>
        </div>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-start justify-center px-4 pt-16">
            <div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm"
              onClick={handleClose}
            />

            <div
              ref={dialogRef}
              className="relative w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5 dark:bg-gray-900 dark:ring-white/10"
            >
              {/* Search Input */}
              <div className="flex items-center border-b border-gray-200 px-4 dark:border-gray-800">
                <Search className="h-5 w-5 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search documentation..."
                  className="flex-1 border-0 bg-transparent px-4 py-4 text-gray-900 placeholder-gray-400 focus:outline-none dark:text-white dark:placeholder-gray-500"
                />
                <button
                  onClick={handleClose}
                  className="rounded p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Search Results */}
              <div className="max-h-96 overflow-y-auto">
                {results.length > 0 ? (
                  <ul className="p-2">
                    {results.map((result, index) => (
                      <li key={result.item.url}>
                        <a
                          href={result.item.url}
                          className={`flex items-start justify-between rounded-lg p-3 transition-colors ${
                            index === selectedIndex
                              ? 'bg-blue-50 text-blue-900 dark:bg-blue-900/30 dark:text-blue-100'
                              : 'text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800'
                          }`}
                          onClick={handleClose}
                        >
                          <div className="min-w-0 flex-1">
                            <div className="mb-1 font-medium">
                              {result.item.title}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {result.item.content}
                            </div>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <CategoryBadge category={result.item.category} />
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : query.trim() ? (
                  <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                    <Search className="mx-auto mb-4 h-8 w-8" />
                    <p>No results found for "{query}"</p>
                    <p className="mt-1 text-sm">
                      Try searching with different keywords
                    </p>
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                    <Search className="mx-auto mb-4 h-8 w-8" />
                    <p>Start typing to search the documentation</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 px-4 py-3 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
                Use ↑↓ to navigate, ↵ to select, ESC to close
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}