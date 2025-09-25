'use client';

import React from 'react';
import { NavigationSidebar } from './NavigationSidebar';
import { TableOfContents } from './TableOfContents';
import { DocumentationBreadcrumb } from './DocumentationBreadcrumb';

interface DocumentationLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  category?: string;
  showTOC?: boolean;
  showBreadcrumb?: boolean;
  className?: string;
}

export function DocumentationLayout({
  children,
  title,
  description,
  category,
  showTOC = true,
  showBreadcrumb = true,
  className = '',
}: DocumentationLayoutProps) {
  return (
    <div className={`min-h-screen bg-white dark:bg-gray-900 ${className}`}>
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8 py-8">
          {/* Sidebar Navigation */}
          <aside className="hidden w-64 flex-shrink-0 lg:block">
            <div className="sticky top-8">
              <NavigationSidebar currentCategory={category || ''} />
            </div>
          </aside>

          {/* Main Content */}
          <main className="min-w-0 flex-1">
            {showBreadcrumb && <DocumentationBreadcrumb category={category || ''} title={title || ''} />}

            {title && (
              <div className="mb-8">
                <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
                  {title}
                </h1>
                {description && (
                  <p className="text-xl text-gray-600 dark:text-gray-400">
                    {description}
                  </p>
                )}
              </div>
            )}

            <div className="prose prose-gray max-w-none dark:prose-invert">
              {children}
            </div>

            {/* Navigation between pages */}
            <div className="mt-16 border-t border-gray-200 pt-8 dark:border-gray-800">
              <div className="flex justify-between">
                <div>
                  {/* Previous page link would go here */}
                </div>
                <div>
                  {/* Next page link would go here */}
                </div>
              </div>
            </div>
          </main>

          {/* Table of Contents */}
          {showTOC && (
            <aside className="hidden w-64 flex-shrink-0 xl:block">
              <div className="sticky top-8">
                <TableOfContents />
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}

// Simplified layout for basic pages
export function SimpleDocumentationLayout({
  children,
  title,
  className = '',
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
}) {
  return (
    <div className={`min-h-screen bg-white dark:bg-gray-900 ${className}`}>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {title && (
          <h1 className="mb-8 text-4xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>
        )}

        <div className="prose prose-gray max-w-none dark:prose-invert">
          {children}
        </div>
      </div>
    </div>
  );
}