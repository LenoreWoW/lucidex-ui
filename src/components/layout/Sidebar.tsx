'use client';

import React from 'react';
import { X, Search, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavMenu } from '../navigation/NavMenu';
import Link from 'next/link';

interface SidebarProps {
  onComponentSelect: (component: string) => void;
  selectedComponent: string | null;
  onClose: () => void;
}

export function Sidebar({
  onComponentSelect,
  selectedComponent,
  onClose,
}: SidebarProps) {
  return (
    <div className="flex h-full flex-col bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-6">
        <div className="flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-qgba-gold to-qgba-maroon">
            <div className="h-4 w-4 rounded-sm bg-white"></div>
          </div>
          <div>
            <h1 className="font-semibold text-foreground">Lucidex UI</h1>
            <p className="text-xs text-muted-foreground">Design System Explorer</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:hidden focus:outline-none focus:ring-2 focus:ring-qgba-gold focus:ring-offset-2"
          aria-label="Close sidebar"
          tabIndex={0}
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3 border-b border-border p-4">
        {/* Design Tokens Link */}
        <Link
          href="/tokens"
          className={cn(
            'flex w-full items-center gap-3 rounded-lg px-3 py-2',
            'bg-gradient-to-r from-qgba-gold/10 to-qgba-maroon/10',
            'border border-qgba-gold/20',
            'text-foreground hover:from-qgba-gold/20 hover:to-qgba-maroon/20',
            'group transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-qgba-gold focus:ring-offset-2'
          )}
          aria-describedby="design-tokens-description"
        >
          <Palette className="h-4 w-4 text-qgba-gold transition-colors group-hover:text-qgba-maroon" aria-hidden="true" />
          <span className="text-sm font-medium">Design Tokens</span>
          <span id="design-tokens-description" className="sr-only">
            Explore design tokens including colors, typography, spacing, and shadows
          </span>
        </Link>

        {/* Search */}
        <div className="relative">
          <label htmlFor="search" className="sr-only">
            Search components and patterns
          </label>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" aria-hidden="true" />
          <input
            id="search"
            type="text"
            placeholder="Search components..."
            className={cn(
              'w-full rounded-lg py-2 pl-10 pr-4',
              'border border-input bg-background',
              'text-foreground placeholder:text-muted-foreground',
              'focus:border-transparent focus:outline-none focus:ring-2 focus:ring-qgba-gold',
              'transition-all duration-200'
            )}
            aria-describedby="search-help"
          />
          <div id="search-help" className="sr-only">
            Type to search through components, patterns, and design tokens. Use arrow keys to navigate results.
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-auto">
        <NavMenu
          onComponentSelect={onComponentSelect}
          selectedComponent={selectedComponent}
        />
      </div>

      {/* Footer */}
      <div className="border-t border-border bg-muted/30 p-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Qatar GBA Design System</span>
          <span className="rounded-full bg-qgba-gold/10 px-2 py-1 font-medium text-qgba-gold">
            v1.0.0
          </span>
        </div>
      </div>
    </div>
  );
}
