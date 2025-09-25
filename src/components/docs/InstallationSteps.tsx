'use client';

import React from 'react';
import { CheckCircle, Terminal, Package } from 'lucide-react';

interface InstallationStepsProps {
  title: string;
  steps: string[];
  variant?: 'default' | 'compact';
  showIcons?: boolean;
  className?: string;
}

export function InstallationSteps({
  title,
  steps,
  variant = 'default',
  showIcons = true,
  className = '',
}: InstallationStepsProps) {
  const getStepIcon = (step: string, _index: number) => {
    if (!showIcons) return null;

    if (step.toLowerCase().includes('npm') || step.toLowerCase().includes('dotnet add') || step.toLowerCase().includes('yarn')) {
      return <Package className="h-4 w-4 text-green-600 dark:text-green-400" />;
    }

    if (step.toLowerCase().includes('import') || step.toLowerCase().includes('configure') || step.toLowerCase().includes('setup')) {
      return <Terminal className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
    }

    return <CheckCircle className="h-4 w-4 text-gray-600 dark:text-gray-400" />;
  };

  return (
    <div className={`mb-6 ${className}`}>
      <h4 className="mb-3 text-lg font-medium text-gray-900 dark:text-white">
        {title}
      </h4>

      <div className={`space-y-${variant === 'compact' ? '2' : '3'}`}>
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-start space-x-3 ${
              variant === 'compact' ? 'py-1' : 'py-2'
            }`}
          >
            <div className="flex-shrink-0 mt-1">
              {showIcons ? (
                getStepIcon(step, index)
              ) : (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {index + 1}
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1">
              {step.startsWith('npm ') ||
               step.startsWith('yarn ') ||
               step.startsWith('dotnet ') ||
               step.startsWith('pip ') ? (
                <div className="rounded-md bg-gray-100 p-3 dark:bg-gray-800">
                  <code className="text-sm font-mono text-gray-900 dark:text-gray-100">
                    {step}
                  </code>
                </div>
              ) : (
                <p className="text-gray-700 dark:text-gray-300">
                  {step}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {variant === 'default' && (
        <div className="mt-4 rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Tip:</strong> Make sure to restart your development server after making configuration changes.
          </p>
        </div>
      )}
    </div>
  );
}