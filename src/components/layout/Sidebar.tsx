'use client';

import React from 'react';
import { X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavMenu } from '../navigation/NavMenu';

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
            <h1 className="font-semibold text-foreground">Polaris UI</h1>
            <p className="text-xs text-muted-foreground">Component Explorer</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:hidden"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Search */}
      <div className="border-b border-border p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
          <input
            type="text"
            placeholder="Search components..."
            className={cn(
              'w-full rounded-lg py-2 pl-10 pr-4',
              'border border-input bg-background',
              'text-foreground placeholder:text-muted-foreground',
              'focus:border-transparent focus:outline-none focus:ring-2 focus:ring-qgba-gold',
              'transition-all duration-200'
            )}
          />
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
