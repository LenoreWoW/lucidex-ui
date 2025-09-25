'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, X, Clock, Hash, TrendingUp } from 'lucide-react';
import { SearchResult } from '@/types/components';

export interface ComponentSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  suggestions?: string[];
  results?: SearchResult[];
  onResultSelect?: (result: SearchResult) => void;
  className?: string;
}

export function ComponentSearch({
  value,
  onChange,
  placeholder = 'Search components...',
  suggestions = [],
  results = [],
  onResultSelect,
  className = '',
}: ComponentSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('polaris-search-history');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch {
        // Ignore errors
      }
    }
  }, []);

  // Save search to history
  const saveSearch = (query: string) => {
    if (query.trim().length < 2) return;

    const newHistory = [
      query,
      ...recentSearches.filter(s => s !== query),
    ].slice(0, 10);

    setRecentSearches(newHistory);
    localStorage.setItem('polaris-search-history', JSON.stringify(newHistory));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setFocusedIndex(-1);

    if (newValue.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputBlur = () => {
    // Delay closing to allow for clicks on dropdown items
    setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    const totalItems =
      value.length === 0
        ? recentSearches.length + suggestions.length
        : results.length + suggestions.length;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => Math.min(prev + 1, totalItems - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => Math.max(prev - 1, -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0) {
          if (value.length === 0) {
            // Handle recent searches and suggestions
            if (focusedIndex < recentSearches.length) {
              const selectedSearch = recentSearches[focusedIndex];
              onChange(selectedSearch);
              saveSearch(selectedSearch);
            } else {
              const suggestionIndex = focusedIndex - recentSearches.length;
              const selectedSuggestion = suggestions[suggestionIndex];
              onChange(selectedSuggestion);
              saveSearch(selectedSuggestion);
            }
          } else {
            // Handle search results
            if (focusedIndex < results.length && onResultSelect) {
              onResultSelect(results[focusedIndex]);
            } else {
              const suggestionIndex = focusedIndex - results.length;
              if (
                suggestionIndex >= 0 &&
                suggestionIndex < suggestions.length
              ) {
                onChange(suggestions[suggestionIndex]);
                saveSearch(suggestions[suggestionIndex]);
              }
            }
          }
        } else if (value) {
          saveSearch(value);
        }
        setIsOpen(false);
        inputRef.current?.blur();
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleClear = () => {
    onChange('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    saveSearch(suggestion);
    setIsOpen(false);
  };

  const handleResultClick = (result: SearchResult) => {
    if (onResultSelect) {
      onResultSelect(result);
    }
    saveSearch(value);
    setIsOpen(false);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('polaris-search-history');
  };

  // Filter suggestions to exclude current value and recent searches
  const filteredSuggestions = suggestions.filter(
    suggestion =>
      suggestion.toLowerCase().includes(value.toLowerCase()) &&
      suggestion.toLowerCase() !== value.toLowerCase() &&
      !recentSearches.includes(suggestion)
  );

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-10 text-foreground placeholder:text-muted-foreground focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
          autoComplete="off"
          spellCheck={false}
        />
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 transform rounded-sm p-0.5 hover:bg-accent"
          >
            <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute left-0 right-0 top-full z-50 mt-1 max-h-96 overflow-y-auto rounded-lg border border-border bg-background shadow-lg"
        >
          {value.length === 0 ? (
            // Show recent searches and popular suggestions when no query
            <div>
              {recentSearches.length > 0 && (
                <div className="px-3 py-2">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">
                        Recent Searches
                      </span>
                    </div>
                    <button
                      onClick={clearRecentSearches}
                      className="text-xs text-muted-foreground underline hover:text-foreground"
                    >
                      Clear
                    </button>
                  </div>
                  {recentSearches.slice(0, 5).map((search, index) => (
                    <button
                      key={search}
                      onClick={() => handleSuggestionClick(search)}
                      className={`w-full rounded px-2 py-1.5 text-left text-sm hover:bg-accent ${
                        index === focusedIndex ? 'bg-accent' : ''
                      }`}
                    >
                      {search}
                    </button>
                  ))}
                </div>
              )}

              {suggestions.length > 0 && (
                <div className="border-t border-border px-3 py-2">
                  <div className="mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Popular Tags
                    </span>
                  </div>
                  {suggestions.slice(0, 8).map((suggestion, index) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm hover:bg-accent ${
                        index + recentSearches.length === focusedIndex
                          ? 'bg-accent'
                          : ''
                      }`}
                    >
                      <Hash className="h-3 w-3 text-muted-foreground" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {recentSearches.length === 0 && suggestions.length === 0 && (
                <div className="px-3 py-4 text-center text-sm text-muted-foreground">
                  Start typing to search components...
                </div>
              )}
            </div>
          ) : (
            // Show search results and filtered suggestions
            <div>
              {results.length > 0 && (
                <div className="px-3 py-2">
                  <div className="mb-2 flex items-center gap-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Components ({results.length})
                    </span>
                  </div>
                  {results.slice(0, 5).map((result, index) => (
                    <button
                      key={result.component.id}
                      onClick={() => handleResultClick(result)}
                      className={`w-full rounded px-2 py-2 text-left text-sm hover:bg-accent ${
                        index === focusedIndex ? 'bg-accent' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">
                            {result.component.displayName}
                          </div>
                          <div className="line-clamp-1 text-xs text-muted-foreground">
                            {result.component.description}
                          </div>
                          <div className="mt-0.5 text-xs capitalize text-muted-foreground">
                            {result.component.category.replace('-', ' ')}
                            {result.matchedFields.length > 0 && (
                              <span className="text-primary">
                                {' '}
                                • Matched: {result.matchedFields.join(', ')}
                              </span>
                            )}
                          </div>
                        </div>
                        {result.score > 0 && (
                          <div className="text-xs text-muted-foreground">
                            {Math.round(result.score * 100)}%
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                  {results.length > 5 && (
                    <div className="mt-1 border-t border-border px-2 py-1 text-center text-xs text-muted-foreground">
                      +{results.length - 5} more components
                    </div>
                  )}
                </div>
              )}

              {filteredSuggestions.length > 0 && (
                <div className="border-t border-border px-3 py-2">
                  <div className="mb-2 flex items-center gap-2">
                    <Hash className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Suggestions
                    </span>
                  </div>
                  {filteredSuggestions.slice(0, 4).map((suggestion, index) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm hover:bg-accent ${
                        index + results.length === focusedIndex
                          ? 'bg-accent'
                          : ''
                      }`}
                    >
                      <Hash className="h-3 w-3 text-muted-foreground" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {results.length === 0 && filteredSuggestions.length === 0 && (
                <div className="px-3 py-4 text-center">
                  <div className="mb-2 text-sm text-muted-foreground">
                    No components found for "{value}"
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Try different keywords or check the filters
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Search Tips */}
          <div className="border-t border-border bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Press ↵ to search • ↑↓ to navigate • ⎋ to close</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
