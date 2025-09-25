// Test file for Framework Switcher functionality
// This file demonstrates how to use the framework switcher components

import React, { useState } from 'react';
import { Component, FrameworkType } from './types';
import {
  FrameworkSwitcher,
  ReactRenderer,
  NextRenderer,
  BlazorRenderer,
  HTMLRenderer,
  TypeScriptRenderer,
} from './components/components';

// Mock component data for testing
const testComponent: Component = {
  id: 'button',
  name: 'Button',
  description:
    'A customizable button component with multiple variants and sizes.',
  category: 'Form',
  tags: ['interactive', 'form', 'ui'],
  code: '',
  props: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'The button content',
    },
    {
      name: 'variant',
      type: "'primary' | 'secondary' | 'outline' | 'ghost'",
      required: false,
      description: 'The button style variant',
      default: 'primary',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      required: false,
      description: 'The button size',
      default: 'md',
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      description: 'Whether the button is disabled',
      default: 'false',
    },
    {
      name: 'onClick',
      type: '(event: MouseEvent) => void',
      required: false,
      description: 'Click event handler',
    },
  ],
  dependencies: ['react', '@types/react'],
  features: [
    'Multiple variants',
    'Responsive sizing',
    'Accessibility support',
    'TypeScript types',
  ],
};

export function TestFrameworkSwitcher() {
  const [selectedFramework, setSelectedFramework] =
    useState<FrameworkType>('react');

  const handleFrameworkChange = (framework: FrameworkType) => {
    setSelectedFramework(framework);
  };

  const renderFrameworkContent = () => {
    const rendererProps = { component: testComponent };

    switch (selectedFramework) {
      case 'react':
        return <ReactRenderer {...rendererProps} />;
      case 'nextjs':
        return <NextRenderer {...rendererProps} />;
      case 'blazor':
        return <BlazorRenderer {...rendererProps} />;
      case 'html':
        return <HTMLRenderer {...rendererProps} />;
      case 'typescript':
        return <TypeScriptRenderer {...rendererProps} />;
      default:
        return <ReactRenderer {...rendererProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Framework Switcher Test
          </h1>
          <p className="text-gray-600">
            Testing the framework switcher with the Button component across
            different frameworks.
          </p>
        </div>

        {/* Framework Switcher */}
        <div className="mb-8">
          <FrameworkSwitcher
            selectedComponent={testComponent}
            selectedFramework={selectedFramework}
            onFrameworkChange={handleFrameworkChange}
          />
        </div>

        {/* Framework Content */}
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-semibold">
            {selectedFramework.charAt(0).toUpperCase() +
              selectedFramework.slice(1)}{' '}
            Implementation
          </h2>
          {renderFrameworkContent()}
        </div>

        {/* Framework Summary */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white p-4 shadow">
            <h3 className="mb-2 font-semibold">Features Tested</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>✓ Framework switching</li>
              <li>✓ Code generation</li>
              <li>✓ Props handling</li>
              <li>✓ TypeScript support</li>
              <li>✓ Dependencies management</li>
            </ul>
          </div>

          <div className="rounded-lg bg-white p-4 shadow">
            <h3 className="mb-2 font-semibold">Supported Frameworks</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• React (.tsx)</li>
              <li>• Next.js (.tsx)</li>
              <li>• Blazor (.razor)</li>
              <li>• HTML (.html)</li>
              <li>• TypeScript (.ts)</li>
            </ul>
          </div>

          <div className="rounded-lg bg-white p-4 shadow">
            <h3 className="mb-2 font-semibold">Generated Code</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Component interfaces</li>
              <li>• Installation steps</li>
              <li>• Usage examples</li>
              <li>• Best practices</li>
              <li>• Framework optimizations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestFrameworkSwitcher;
