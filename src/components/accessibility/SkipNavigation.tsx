'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SkipNavigationProps {
  className?: string;
}

interface SkipLink {
  href: string;
  label: string;
}

const skipLinks: SkipLink[] = [
  { href: '#main-content', label: 'Skip to main content' },
  { href: '#sidebar-navigation', label: 'Skip to navigation' },
  { href: '#code-panel', label: 'Skip to code panel' },
  { href: '#search', label: 'Skip to search' },
];

export function SkipNavigation({ className }: SkipNavigationProps) {
  return (
    <div className={cn('sr-only focus-within:not-sr-only', className)}>
      <div className="fixed top-0 left-0 z-[100] flex flex-col space-y-1 p-2">
        {skipLinks.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className={cn(
              'rounded-md bg-qgba-gold px-4 py-2 text-sm font-medium text-white',
              'transform -translate-y-full opacity-0 transition-all duration-200',
              'focus:translate-y-0 focus:opacity-100',
              'hover:bg-qgba-gold/90',
              'outline-none ring-2 ring-qgba-gold ring-offset-2 ring-offset-white',
              'dark:ring-offset-gray-900'
            )}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default SkipNavigation;