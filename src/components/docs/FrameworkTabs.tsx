'use client';

import React, { useState, Children } from 'react';
import { clsx } from 'clsx';

interface FrameworkTabsProps {
  children: React.ReactNode;
  defaultFramework?: string;
  className?: string;
}

// interface FrameworkTabProps {
//   'data-framework': string;
//   children: React.ReactNode;
// }

const frameworkLabels = {
  react: 'React',
  nextjs: 'Next.js',
  blazor: 'Blazor',
  html: 'HTML',
  typescript: 'TypeScript',
  vue: 'Vue',
  angular: 'Angular',
  svelte: 'Svelte',
};

const frameworkIcons = {
  react: '⚛️',
  nextjs: '▲',
  blazor: '🔥',
  html: '🌐',
  typescript: '📘',
  vue: '💚',
  angular: '🅰️',
  svelte: '🧡',
};

export function FrameworkTabs({
  children,
  defaultFramework = 'react',
  className = '',
}: FrameworkTabsProps) {
  // Extract frameworks from children
  const frameworks = Children.toArray(children)
    .filter(child => React.isValidElement(child))
    .map(child => {
      if (React.isValidElement(child)) {
        return child.props['data-framework'];
      }
      return null;
    })
    .filter(Boolean);

  const [activeFramework, setActiveFramework] = useState(
    frameworks.includes(defaultFramework) ? defaultFramework : frameworks[0]
  );

  const activeChild = Children.toArray(children)
    .filter(child => React.isValidElement(child))
    .find(child => {
      if (React.isValidElement(child)) {
        return child.props['data-framework'] === activeFramework;
      }
      return false;
    });

  return (
    <div className={`mb-6 ${className}`}>
      {/* Tab Navigation */}
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {frameworks.map((framework) => {
            const label = frameworkLabels[framework as keyof typeof frameworkLabels] || framework;
            const icon = frameworkIcons[framework as keyof typeof frameworkIcons] || '📦';

            return (
              <button
                key={framework}
                onClick={() => setActiveFramework(framework)}
                className={clsx(
                  'flex items-center space-x-2 whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition-colors',
                  activeFramework === framework
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                )}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[200px]">
        {activeChild}
      </div>
    </div>
  );
}