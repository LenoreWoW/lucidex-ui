'use client';

import { Palette, Hammer, Brush, Layers, Boxes } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { useEffect } from 'react';
import { manageFocusForRouteChange } from '@/lib/accessibility';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();

  useEffect(() => {
    // Announce page changes to screen readers
    const handleRouteChange = () => {
      setTimeout(() => manageFocusForRouteChange(), 100);
    };

    // Listen for navigation events
    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', handleRouteChange);
      return () => window.removeEventListener('popstate', handleRouteChange);
    }
  }, []);

  const navItems = [
    {
      href: '/templates',
      label: 'Templates',
      icon: Layers,
      description: 'Layout templates'
    },
    {
      href: '/components',
      label: 'Components',
      icon: Boxes,
      description: 'UI components'
    },
    {
      href: '/tokens',
      label: 'Tokens',
      icon: Palette,
      description: 'Design tokens'
    },
    {
      href: '/builder',
      label: 'Builder',
      icon: Hammer,
      description: 'Layout builder'
    },
    {
      href: '/docs',
      label: 'Docs',
      icon: 'text',
      description: 'Documentation'
    }
  ];

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div
            className="rounded-lg bg-primary/10 p-2"
            role="img"
            aria-label="Lucidex UI brand logo"
          >
            <Palette className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold leading-none" id="site-title">
              Lucidex UI
            </h1>
            <p className="text-xs text-muted-foreground" aria-describedby="site-title">
              Bring clarity to your design system
            </p>
          </div>
        </div>

        <nav
          className="hidden items-center space-x-1 text-sm font-medium md:flex"
          role="navigation"
          aria-label="Main navigation"
        >
          {navItems.map(item => {
            const isActive = pathname === item.href || (item.href === '/' && pathname === '/');
            const Icon = typeof item.icon === 'string' ? null : item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center space-x-2 rounded-md px-3 py-2 transition-all duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-qgba-gold focus:ring-offset-2',
                  isActive
                    ? 'bg-qgba-gold/10 text-qgba-gold border border-qgba-gold/20'
                    : 'text-foreground/60 hover:text-foreground hover:bg-accent'
                )}
                aria-current={isActive ? 'page' : undefined}
                title={item.description}
              >
                {Icon && (
                  <Icon className={cn(
                    'h-4 w-4',
                    isActive ? 'text-qgba-gold' : 'text-muted-foreground'
                  )} aria-hidden="true" />
                )}
                <span>{item.label}</span>
                {item.label === 'Builder' && (
                  <span className="rounded-full bg-qgba-maroon/10 px-2 py-0.5 text-xs font-medium text-qgba-maroon">
                    New
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden rounded-md p-2 text-foreground/60 hover:text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-qgba-gold focus:ring-offset-2"
            aria-label="Open menu"
            // Add mobile menu functionality if needed
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Theme Generator Button */}
          <Link
            href="/themes"
            className={cn(
              'hidden sm:flex items-center space-x-2 rounded-md border px-3 py-2 text-sm',
              'transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-qgba-gold focus:ring-offset-2',
              pathname === '/themes'
                ? 'border-qgba-gold bg-qgba-gold/10 text-qgba-gold'
                : 'border-border text-foreground/60 hover:text-foreground'
            )}
          >
            <Brush className="h-4 w-4" />
            <span>Theme Generator</span>
          </Link>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
