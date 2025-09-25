'use client';

import React, { useState } from 'react';
import { ComponentPreview, ComponentStates } from '@/components/components';
import { Component } from '@/types';

// Sample component for testing
const sampleComponent: Component = {
  id: 'sample-button',
  name: 'Button',
  description: 'A versatile button component with multiple variants and states',
  category: 'Form Controls',
  tags: ['button', 'interactive', 'form'],
  code: `
    <button
      class="px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
      onclick="alert('Button clicked!')"
    >
      Click Me
    </button>
  `,
  props: [
    {
      name: 'variant',
      type: 'select',
      default: 'primary',
      required: false,
      description: 'Button variant style',
      examples: ['primary', 'secondary', 'destructive', 'outline', 'ghost'],
    },
    {
      name: 'size',
      type: 'select',
      default: 'md',
      required: false,
      description: 'Button size',
      examples: ['sm', 'md', 'lg', 'xl'],
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      required: false,
      description: 'Whether the button is disabled',
    },
    {
      name: 'loading',
      type: 'boolean',
      default: 'false',
      required: false,
      description: 'Show loading state',
    },
    {
      name: 'children',
      type: 'string',
      default: 'Click Me',
      required: true,
      description: 'Button text content',
    },
    {
      name: 'icon',
      type: 'string',
      default: '',
      required: false,
      description: 'Optional icon name',
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      default: 'false',
      required: false,
      description: 'Make button full width',
    },
  ],
  dependencies: ['lucide-react'],
  features: [
    'Accessible',
    'Keyboard Navigation',
    'Loading States',
    'Multiple Variants',
  ],
};

// Sample card component
const sampleCardComponent: Component = {
  id: 'sample-card',
  name: 'Card',
  description: 'A flexible card component for displaying content',
  category: 'Layout',
  tags: ['card', 'container', 'layout'],
  code: `
    <div class="rounded-lg border border-border bg-card text-card-foreground shadow-sm p-6">
      <div class="flex flex-col space-y-1.5">
        <h3 class="text-2xl font-semibold leading-none tracking-tight">Card Title</h3>
        <p class="text-sm text-muted-foreground">Card description goes here</p>
      </div>
      <div class="mt-6">
        <p class="text-sm">This is the card content area where you can put any content.</p>
      </div>
      <div class="flex items-center pt-6">
        <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          Action
        </button>
      </div>
    </div>
  `,
  props: [
    {
      name: 'title',
      type: 'string',
      default: 'Card Title',
      required: false,
      description: 'The card title',
    },
    {
      name: 'description',
      type: 'string',
      default: 'Card description goes here',
      required: false,
      description: 'The card description',
    },
    {
      name: 'content',
      type: 'string',
      default: 'This is the card content area where you can put any content.',
      required: false,
      description: 'The main card content',
    },
    {
      name: 'variant',
      type: 'select',
      default: 'default',
      required: false,
      description: 'Card style variant',
      examples: ['default', 'outlined', 'elevated', 'filled'],
    },
    {
      name: 'padding',
      type: 'select',
      default: 'md',
      required: false,
      description: 'Card padding size',
      examples: ['sm', 'md', 'lg', 'xl'],
    },
    {
      name: 'shadow',
      type: 'boolean',
      default: 'true',
      required: false,
      description: 'Whether to show card shadow',
    },
  ],
  features: ['Responsive', 'Customizable', 'Accessible'],
};

export default function ComponentsTestPage() {
  const [selectedComponent, setSelectedComponent] = useState(sampleComponent);
  const [activeView, setActiveView] = useState<'preview' | 'states'>('preview');

  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Component Rendering Engine Test</h1>
        <p className="text-muted-foreground">
          Test the component rendering engine with interactive previews and
          props editing.
        </p>
      </div>

      {/* Component Selector */}
      <div className="flex items-center space-x-4 rounded-lg border border-border bg-card p-4">
        <label className="font-medium">Test Component:</label>
        <select
          value={selectedComponent.id}
          onChange={e => {
            const component =
              e.target.value === 'sample-button'
                ? sampleComponent
                : sampleCardComponent;
            setSelectedComponent(component);
          }}
          className="rounded-md border border-border bg-background px-3 py-2"
        >
          <option value="sample-button">Button Component</option>
          <option value="sample-card">Card Component</option>
        </select>

        <div className="ml-auto flex items-center space-x-2">
          <button
            onClick={() => setActiveView('preview')}
            className={`rounded-md px-3 py-1 text-sm transition-colors ${
              activeView === 'preview'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            Interactive Preview
          </button>
          <button
            onClick={() => setActiveView('states')}
            className={`rounded-md px-3 py-1 text-sm transition-colors ${
              activeView === 'states'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            All States
          </button>
        </div>
      </div>

      {/* Component Preview or States */}
      <div className="overflow-hidden rounded-lg border border-border bg-background">
        {activeView === 'preview' ? (
          <ComponentPreview
            component={selectedComponent}
            framework="html"
            showDocumentation={true}
            showCodeSnippets={true}
            className="min-h-[600px]"
          />
        ) : (
          <div className="p-6">
            <ComponentStates
              component={selectedComponent}
              props={{}}
              framework="html"
              theme="light"
              showStateLabels={true}
              autoPlay={false}
            />
          </div>
        )}
      </div>

      {/* Features Overview */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="mb-2 font-semibold">Sandboxed Rendering</h3>
          <p className="text-sm text-muted-foreground">
            Components are rendered in isolated iframes with proper security
            restrictions.
          </p>
          <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
            <li>• Script execution control</li>
            <li>• Same-origin restrictions</li>
            <li>• Error boundary protection</li>
            <li>• Performance monitoring</li>
          </ul>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="mb-2 font-semibold">Real-time Props Editing</h3>
          <p className="text-sm text-muted-foreground">
            Interactive controls for all component properties with type
            validation.
          </p>
          <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
            <li>• Type-specific input controls</li>
            <li>• Real-time preview updates</li>
            <li>• Default value management</li>
            <li>• Code generation</li>
          </ul>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="mb-2 font-semibold">Multiple Component States</h3>
          <p className="text-sm text-muted-foreground">
            View and test all component states including hover, focus, and error
            states.
          </p>
          <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
            <li>• Default, hover, focus states</li>
            <li>• Disabled and loading states</li>
            <li>• Error state handling</li>
            <li>• State comparison</li>
          </ul>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="mb-2 font-semibold">Framework Support</h3>
          <p className="text-sm text-muted-foreground">
            Support for multiple frontend frameworks with framework-specific
            rendering.
          </p>
          <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
            <li>• React & Next.js</li>
            <li>• HTML & TypeScript</li>
            <li>• Framework switching</li>
            <li>• Code generation</li>
          </ul>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="mb-2 font-semibold">Design System Integration</h3>
          <p className="text-sm text-muted-foreground">
            Built-in Qatar GBA design tokens and theme support.
          </p>
          <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
            <li>• Qatar GBA color palette</li>
            <li>• Light/dark theme support</li>
            <li>• Responsive breakpoints</li>
            <li>• Design token variables</li>
          </ul>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="mb-2 font-semibold">Developer Experience</h3>
          <p className="text-sm text-muted-foreground">
            Tools and features to enhance the development workflow.
          </p>
          <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
            <li>• Code snippet generation</li>
            <li>• Configuration sharing</li>
            <li>• Error reporting</li>
            <li>• Performance metrics</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
