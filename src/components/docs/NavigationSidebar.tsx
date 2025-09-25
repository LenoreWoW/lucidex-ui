'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight, Book, Code, Palette, Settings, FileText, Lightbulb } from 'lucide-react';
import { clsx } from 'clsx';

interface NavigationItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
  children?: NavigationItem[];
}

const navigationItems: NavigationItem[] = [
  {
    title: 'Getting Started',
    href: '/docs/getting-started',
    icon: <Lightbulb className="h-4 w-4" />,
  },
  {
    title: 'Installation',
    href: '/docs/installation',
    icon: <Settings className="h-4 w-4" />,
  },
  {
    title: 'Frameworks',
    href: '/docs/frameworks',
    icon: <Code className="h-4 w-4" />,
    children: [
      { title: 'React', href: '/docs/frameworks/react' },
      { title: 'Next.js', href: '/docs/frameworks/nextjs' },
      { title: 'Blazor', href: '/docs/frameworks/blazor' },
      { title: 'HTML/CSS', href: '/docs/frameworks/html' },
      { title: 'TypeScript', href: '/docs/frameworks/typescript' },
    ],
  },
  {
    title: 'Components',
    href: '/docs/components',
    icon: <Book className="h-4 w-4" />,
    children: [
      { title: 'Overview', href: '/docs/components/overview' },
      { title: 'Button', href: '/docs/components/button' },
      { title: 'Card', href: '/docs/components/card' },
      { title: 'Form Elements', href: '/docs/components/forms' },
      { title: 'Navigation', href: '/docs/components/navigation' },
      { title: 'Layout', href: '/docs/components/layout' },
      { title: 'Feedback', href: '/docs/components/feedback' },
    ],
  },
  {
    title: 'Design Tokens',
    href: '/docs/design-tokens',
    icon: <Palette className="h-4 w-4" />,
    children: [
      { title: 'Colors', href: '/docs/design-tokens/colors' },
      { title: 'Typography', href: '/docs/design-tokens/typography' },
      { title: 'Spacing', href: '/docs/design-tokens/spacing' },
      { title: 'Shadows', href: '/docs/design-tokens/shadows' },
      { title: 'Border Radius', href: '/docs/design-tokens/border-radius' },
    ],
  },
  {
    title: 'Theming',
    href: '/docs/theming',
    icon: <Palette className="h-4 w-4" />,
    children: [
      { title: 'Overview', href: '/docs/theming/overview' },
      { title: 'Custom Themes', href: '/docs/theming/custom-themes' },
      { title: 'Dark Mode', href: '/docs/theming/dark-mode' },
      { title: 'CSS Variables', href: '/docs/theming/css-variables' },
    ],
  },
  {
    title: 'Examples',
    href: '/docs/examples',
    icon: <FileText className="h-4 w-4" />,
    children: [
      { title: 'Dashboard', href: '/docs/examples/dashboard' },
      { title: 'Forms', href: '/docs/examples/forms' },
      { title: 'E-commerce', href: '/docs/examples/ecommerce' },
      { title: 'Landing Page', href: '/docs/examples/landing' },
    ],
  },
];

interface NavigationSidebarProps {
  currentCategory?: string;
  className?: string;
}

export function NavigationSidebar({ currentCategory: _currentCategory, className = '' }: NavigationSidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>(() => {
    // Auto-expand current section
    const currentSection = navigationItems.find(item =>
      pathname?.startsWith(item.href) ||
      item.children?.some(child => pathname?.startsWith(child.href))
    );
    return currentSection ? [currentSection.title] : [];
  });

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => {
    if (href === '/docs' && pathname === '/docs') return true;
    if (href !== '/docs' && pathname?.startsWith(href)) return true;
    return false;
  };

  const renderNavItem = (item: NavigationItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.title);
    const active = isActive(item.href);

    return (
      <li key={item.href}>
        <div
          className={clsx(
            'flex items-center space-x-2 rounded-md px-3 py-2 text-sm transition-colors',
            depth === 0 ? 'font-medium' : 'font-normal',
            active
              ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
            depth > 0 && 'ml-4'
          )}
        >
          {hasChildren ? (
            <button
              onClick={() => toggleExpanded(item.title)}
              className="flex w-full items-center space-x-2"
            >
              {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
              <span className="flex-1 text-left">{item.title}</span>
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 flex-shrink-0" />
              ) : (
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
              )}
            </button>
          ) : (
            <Link href={item.href} className="flex w-full items-center space-x-2">
              {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
              <span className="flex-1">{item.title}</span>
            </Link>
          )}
        </div>

        {hasChildren && isExpanded && (
          <ul className="mt-1 space-y-1">
            {item.children!.map(child => renderNavItem(child, depth + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <nav className={`w-full ${className}`}>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Documentation
        </h2>
      </div>

      <ul className="space-y-1">
        {navigationItems.map(item => renderNavItem(item))}
      </ul>

      {/* Search section */}
      <div className="mt-8 border-t border-gray-200 pt-4 dark:border-gray-700">
        <div className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Quick Links
        </div>
        <ul className="space-y-1 text-sm">
          <li>
            <Link
              href="/changelog"
              className="block rounded px-3 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              Changelog
            </Link>
          </li>
          <li>
            <Link
              href="/contributing"
              className="block rounded px-3 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              Contributing
            </Link>
          </li>
          <li>
            <a
              href="https://github.com/polaris-ui/explorer"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded px-3 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              GitHub →
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

// Mobile navigation component
export function MobileNavigationSidebar({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="absolute left-0 top-0 h-full w-80 bg-white p-6 shadow-xl dark:bg-gray-900">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Documentation
          </h2>
          <button
            onClick={onClose}
            className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <span className="sr-only">Close navigation</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <NavigationSidebar />
      </div>
    </div>
  );
}