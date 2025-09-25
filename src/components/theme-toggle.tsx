'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { announceToScreenReader, KeyCodes } from '@/lib/accessibility';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-9 w-9 animate-pulse rounded-md border border-border bg-card" />
    );
  }

  const isDark = theme === 'dark';

  const handleThemeToggle = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
    announceToScreenReader(`Switched to ${newTheme} theme`, 'polite');
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === KeyCodes.ENTER || event.key === KeyCodes.SPACE) {
      event.preventDefault();
      handleThemeToggle();
    }
  };

  return (
    <button
      onClick={handleThemeToggle}
      onKeyDown={handleKeyDown as any}
      className="group relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card transition-all duration-200 ease-in-out hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-qgba-gold focus:ring-offset-2"
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      aria-pressed={isDark}
      role="switch"
      aria-describedby="theme-toggle-description"
    >
      <div className="relative h-4 w-4" aria-hidden="true">
        <Sun
          className={`absolute inset-0 h-4 w-4 transition-all duration-300 ease-in-out ${
            isDark
              ? 'rotate-90 scale-0 opacity-0'
              : 'rotate-0 scale-100 opacity-100'
          }`}
        />
        <Moon
          className={`absolute inset-0 h-4 w-4 transition-all duration-300 ease-in-out ${
            isDark
              ? 'rotate-0 scale-100 opacity-100'
              : '-rotate-90 scale-0 opacity-0'
          }`}
        />
      </div>
      <span id="theme-toggle-description" className="sr-only">
        Toggle between light and dark themes. Current theme: {isDark ? 'dark' : 'light'} mode.
      </span>
    </button>
  );
}
