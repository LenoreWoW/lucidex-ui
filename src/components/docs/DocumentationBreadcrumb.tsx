'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface DocumentationBreadcrumbProps {
  category?: string;
  title?: string;
  customItems?: BreadcrumbItem[];
  className?: string;
}

export function DocumentationBreadcrumb({
  category,
  title,
  customItems,
  className = '',
}: DocumentationBreadcrumbProps) {
  const items: BreadcrumbItem[] = customItems || [
    { label: 'Home', href: '/' },
    { label: 'Docs', href: '/docs' },
    ...(category ? [{ label: category, href: `/docs/${category.toLowerCase()}` }] : []),
    ...(title ? [{ label: title }] : []),
  ];

  return (
    <nav className={`mb-6 ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index === 0 && (
              <Home className="mr-2 h-4 w-4" aria-hidden="true" />
            )}

            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-gray-700 dark:hover:text-gray-300"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-gray-900 dark:text-white">
                {item.label}
              </span>
            )}

            {index < items.length - 1 && (
              <ChevronRight className="mx-2 h-4 w-4" aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}