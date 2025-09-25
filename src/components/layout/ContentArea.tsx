'use client';

import React from 'react';
import { Menu, Code2, Eye, Settings, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContentAreaProps {
  selectedComponent: string | null;
  onMenuToggle: () => void;
  onCodePanelToggle: () => void;
  codePanelOpen: boolean;
  children?: React.ReactNode;
}

export function ContentArea({
  selectedComponent,
  onMenuToggle,
  onCodePanelToggle,
  codePanelOpen,
  children,
}: ContentAreaProps) {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>

          <div className="flex items-center space-x-2">
            <h2 className="font-semibold text-foreground">
              {selectedComponent || 'Welcome'}
            </h2>
            {selectedComponent && (
              <span className="rounded-full border border-qgba-gold/20 bg-qgba-gold/10 px-2 py-0.5 text-xs text-qgba-gold">
                Component
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* View Mode Toggle */}
          <div className="hidden items-center rounded-lg border border-border p-1 sm:flex">
            <button className="flex items-center space-x-1 rounded-md bg-accent px-3 py-1.5 text-xs text-accent-foreground">
              <Eye className="h-3 w-3" />
              <span>Preview</span>
            </button>
            <button className="flex items-center space-x-1 rounded-md px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
              <Settings className="h-3 w-3" />
              <span>Props</span>
            </button>
          </div>

          {/* Code Panel Toggle */}
          <button
            onClick={onCodePanelToggle}
            className={cn(
              'rounded-md p-2 transition-colors',
              codePanelOpen
                ? 'bg-qgba-gold text-white shadow-sm'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            )}
          >
            <Code2 className="h-4 w-4" />
          </button>

          {/* Fullscreen */}
          <button className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children || (
          <div className="flex h-full flex-col items-center justify-center p-8">
            {selectedComponent ? (
              <ComponentPreview component={selectedComponent} />
            ) : (
              <WelcomeScreen />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function WelcomeScreen() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 text-center">
      <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-qgba-gold to-qgba-maroon">
        <div className="h-10 w-10 rounded-lg bg-white shadow-inner"></div>
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome to Polaris UI Explorer
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Explore and interact with components from the Qatar GBA Design System.
          Select a component from the sidebar to get started.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50">
          <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-qgba-gold/10">
            <Eye className="h-4 w-4 text-qgba-gold" />
          </div>
          <h3 className="mb-1 font-medium text-foreground">Live Preview</h3>
          <p className="text-sm text-muted-foreground">
            See components in action with real-time updates
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50">
          <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-qgba-gold/10">
            <Code2 className="h-4 w-4 text-qgba-gold" />
          </div>
          <h3 className="mb-1 font-medium text-foreground">Code Examples</h3>
          <p className="text-sm text-muted-foreground">
            Copy-paste ready code snippets for every component
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50">
          <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-qgba-gold/10">
            <Settings className="h-4 w-4 text-qgba-gold" />
          </div>
          <h3 className="mb-1 font-medium text-foreground">Customizable</h3>
          <p className="text-sm text-muted-foreground">
            Adjust props and see changes instantly
          </p>
        </div>
      </div>
    </div>
  );
}

function ComponentPreview({ component }: { component: string }) {
  return (
    <div className="w-full max-w-4xl space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold text-foreground">{component}</h2>
        <p className="text-muted-foreground">
          Interactive preview and documentation for the {component} component
        </p>
      </div>

      {/* Preview Area */}
      <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-border bg-background">
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-qgba-gold/20 to-qgba-maroon/20">
            <div className="h-8 w-8 rounded-md bg-qgba-gold opacity-60"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-foreground">
              {component} Preview
            </h3>
            <p className="text-sm text-muted-foreground">
              Component preview will be rendered here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
