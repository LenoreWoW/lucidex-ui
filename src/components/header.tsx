'use client';

import { Palette } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="rounded-lg bg-primary/10 p-2">
            <Palette className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold leading-none">Polaris UI</h1>
            <p className="text-xs text-muted-foreground">Explorer</p>
          </div>
        </div>

        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
          <a
            href="#components"
            className="text-foreground/60 transition-colors hover:text-foreground"
          >
            Components
          </a>
          <a
            href="#patterns"
            className="text-foreground/60 transition-colors hover:text-foreground"
          >
            Patterns
          </a>
          <a
            href="#examples"
            className="text-foreground/60 transition-colors hover:text-foreground"
          >
            Examples
          </a>
          <a
            href="#docs"
            className="text-foreground/60 transition-colors hover:text-foreground"
          >
            Documentation
          </a>
        </nav>

        <div className="flex items-center space-x-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
