'use client';

import { TokenViewer } from '@/components/tokens/TokenViewer';
import { useState } from 'react';
import { getTokenCategories, getCategoryInfo } from '@/lib/token-ingestion';
import { Palette, Ruler, Type, Sun, Circle } from 'lucide-react';

export default function TokensPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const categories = getTokenCategories();

  const categoryIcons = {
    colors: Palette,
    spacing: Ruler,
    typography: Type,
    shadows: Sun,
    borderRadius: Circle,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="border-b bg-gradient-to-r from-qgba-maroon/5 to-qgba-navy/5">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl">
            <h1 className="mb-4 text-4xl font-bold">Design Tokens</h1>
            <p className="mb-6 text-xl text-muted-foreground">
              Explore and copy design tokens from the Qatar GBA design system.
              All tokens are available in both light and dark themes with live
              previews.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full border border-qgba-maroon/20 bg-qgba-maroon/10 px-3 py-1 text-sm font-medium text-qgba-maroon">
                Qatar GBA Colors
              </span>
              <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Live Previews
              </span>
              <span className="inline-flex items-center rounded-full border bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                Copy to Clipboard
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar Navigation */}
          <div className="flex-shrink-0 lg:w-64">
            <div className="sticky top-4 rounded-lg border bg-card p-4">
              <h3 className="mb-4 text-sm font-semibold">Categories</h3>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  All Tokens
                </button>
                {categories.map(category => {
                  const categoryInfo = getCategoryInfo(category);
                  const IconComponent =
                    categoryIcons[category as keyof typeof categoryIcons];

                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                        selectedCategory === category
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {IconComponent && <IconComponent className="h-4 w-4" />}
                      {categoryInfo?.name || category}
                    </button>
                  );
                })}
              </div>

              {/* Stats */}
              <div className="mt-6 border-t pt-4">
                <h4 className="mb-2 text-sm font-semibold">Token Stats</h4>
                <div className="space-y-2 text-sm">
                  {categories.map(category => {
                    const categoryInfo = getCategoryInfo(category);
                    const tokenCount = Object.keys(
                      categoryInfo?.tokens || {}
                    ).length;

                    return (
                      <div key={category} className="flex justify-between">
                        <span className="text-muted-foreground">
                          {categoryInfo?.name || category}
                        </span>
                        <span className="font-medium">{tokenCount}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <TokenViewer
              initialCategory={selectedCategory}
              showSearch={true}
              showFilters={true}
              showViewToggle={true}
            />
          </div>
        </div>
      </div>

      {/* Usage Guide Section */}
      <div className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-2xl font-bold">Using Design Tokens</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-3 text-lg font-semibold">CSS Variables</h3>
                <p className="mb-4 text-muted-foreground">
                  Use CSS variables for dynamic theming and consistent styling
                  across your application.
                </p>
                <pre className="overflow-x-auto rounded border bg-card p-4 text-sm">
                  <code>{`.my-component {
  color: var(--qgba-maroon);
  background: var(--background);
  padding: var(--spacing-4);
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
}`}</code>
                </pre>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-semibold">Tailwind Classes</h3>
                <p className="mb-4 text-muted-foreground">
                  Qatar GBA brand colors are available as Tailwind utilities for
                  rapid development.
                </p>
                <pre className="overflow-x-auto rounded border bg-card p-4 text-sm">
                  <code>{`<div className="
  bg-qgba-maroon
  text-qgba-gold
  p-4
  rounded-lg
  shadow-md
">
  Qatar GBA themed content
</div>`}</code>
                </pre>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-semibold">React/JSX</h3>
                <p className="mb-4 text-muted-foreground">
                  Use tokens directly in your React components for dynamic
                  styling.
                </p>
                <pre className="overflow-x-auto rounded border bg-card p-4 text-sm">
                  <code>{`const MyComponent = () => (
  <div style={{
    color: 'var(--qgba-maroon)',
    padding: 'var(--spacing-4)',
    borderRadius: 'var(--radius)'
  }}>
    Content
  </div>
)`}</code>
                </pre>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-semibold">Theme Support</h3>
                <p className="mb-4 text-muted-foreground">
                  All tokens automatically adapt to light and dark themes using
                  CSS variables.
                </p>
                <pre className="overflow-x-auto rounded border bg-card p-4 text-sm">
                  <code>{`:root {
  --qgba-maroon: 0 65% 51%;
}

.dark {
  --qgba-maroon: 0 65% 60%;
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
