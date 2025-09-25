'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import {
  createTokenCollection,
  searchTokens,
  getTokenCategories,
  getCategoryInfo,
  TokenType,
} from '@/lib/token-ingestion';
import { TokenCard } from './TokenCard';

type ViewMode = 'grid' | 'list';

interface TokenViewerProps {
  initialCategory?: string;
  showSearch?: boolean;
  showFilters?: boolean;
  showViewToggle?: boolean;
  compact?: boolean;
}

export function TokenViewer({
  initialCategory,
  showSearch = true,
  showFilters = true,
  showViewToggle = true,
  compact = false,
}: TokenViewerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || 'all'
  );
  const [selectedType, setSelectedType] = useState<TokenType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const tokenCollection = createTokenCollection();
  const categories = getTokenCategories();

  const filteredTokens = useMemo(() => {
    if (searchQuery.trim()) {
      // Use search functionality
      const searchResults = searchTokens(searchQuery, {
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        type: selectedType !== 'all' ? selectedType : undefined,
      });

      return Object.entries(searchResults).map(([tokenId, entry]) => ({
        tokenId,
        token: entry.token,
        category: entry.category,
      }));
    }

    // Filter by category and type
    let allTokens: Array<{ tokenId: string; token: any; category: string }> =
      [];

    for (const [categoryKey, category] of Object.entries(tokenCollection)) {
      if (selectedCategory !== 'all' && selectedCategory !== categoryKey) {
        continue;
      }

      for (const [tokenKey, token] of Object.entries(category.tokens)) {
        if (selectedType !== 'all' && token.type !== selectedType) {
          continue;
        }

        allTokens.push({
          tokenId: `${categoryKey}:${tokenKey}`,
          token,
          category: categoryKey,
        });
      }
    }

    return allTokens;
  }, [searchQuery, selectedCategory, selectedType, tokenCollection]);

  const tokenTypes: Array<{ value: TokenType | 'all'; label: string }> = [
    { value: 'all', label: 'All Types' },
    { value: 'color', label: 'Colors' },
    { value: 'spacing', label: 'Spacing' },
    { value: 'typography', label: 'Typography' },
    { value: 'shadow', label: 'Shadows' },
    { value: 'border-radius', label: 'Border Radius' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Design Tokens</h2>
            <p className="text-muted-foreground">
              Explore and copy design tokens from the Qatar GBA design system
            </p>
          </div>

          {showViewToggle && (
            <div className="flex items-center gap-1 rounded-md border p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`rounded p-2 ${
                  viewMode === 'grid'
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
                title="Grid view"
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`rounded p-2 ${
                  viewMode === 'list'
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
                title="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-4 sm:flex-row">
          {showSearch && (
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tokens..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full rounded-md border bg-background py-2 pl-10 pr-4"
              />
            </div>
          )}

          {showFilters && (
            <div className="flex gap-3">
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="rounded-md border bg-background px-3 py-2"
              >
                <option value="all">All Categories</option>
                {categories.map(category => {
                  const categoryInfo = getCategoryInfo(category);
                  return (
                    <option key={category} value={category}>
                      {categoryInfo?.name || category}
                    </option>
                  );
                })}
              </select>

              <select
                value={selectedType}
                onChange={e =>
                  setSelectedType(e.target.value as TokenType | 'all')
                }
                className="rounded-md border bg-background px-3 py-2"
              >
                {tokenTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="h-4 w-4" />
          <span>
            Showing {filteredTokens.length} token
            {filteredTokens.length !== 1 ? 's' : ''}
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory !== 'all' &&
              ` in ${getCategoryInfo(selectedCategory)?.name || selectedCategory}`}
            {selectedType !== 'all' && ` of type ${selectedType}`}
          </span>
        </div>
      </div>

      {/* Tokens Grid/List */}
      {filteredTokens.length > 0 ? (
        <div
          className={
            viewMode === 'grid'
              ? `grid gap-6 ${
                  compact
                    ? 'grid-cols-1 md:grid-cols-2'
                    : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                }`
              : 'space-y-4'
          }
        >
          {filteredTokens.map(({ tokenId, token, category }) => {
            const [, tokenKey] = tokenId.split(':');
            return (
              <TokenCard
                key={tokenId}
                token={token}
                tokenKey={tokenKey}
                category={category}
                showCategory={
                  selectedCategory === 'all' || searchQuery.trim() !== ''
                }
              />
            );
          })}
        </div>
      ) : (
        <div className="py-12 text-center">
          <div className="text-muted-foreground">
            {searchQuery ? (
              <>
                No tokens found for "{searchQuery}"
                {(selectedCategory !== 'all' || selectedType !== 'all') && (
                  <> with the current filters</>
                )}
                .
              </>
            ) : (
              <>No tokens found with the current filters.</>
            )}
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedType('all');
            }}
            className="mt-2 text-sm text-primary hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
