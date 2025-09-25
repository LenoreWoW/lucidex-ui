'use client';

import React, { useState, useCallback, useMemo } from 'react';
import {
  Code,
  Layers,
  FileCode,
  Globe,
  Type,
  Check,
  Badge,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { FrameworkType, Framework, Component } from '@/types';

interface FrameworkSwitcherProps {
  selectedComponent: Component | null;
  selectedFramework: FrameworkType;
  onFrameworkChange: (framework: FrameworkType) => void;
  className?: string;
}

const frameworks: Framework[] = [
  {
    id: 'react',
    name: 'react',
    displayName: 'React',
    icon: 'React',
    description: 'Pure React component with hooks and modern patterns',
    fileExtension: '.tsx',
    language: 'tsx',
    dependencies: ['react', '@types/react'],
    installCommand: 'npm install react @types/react',
    features: ['Hooks', 'TypeScript', 'Props validation', 'State management'],
    optimizations: ['React.memo', 'useCallback', 'useMemo'],
    bestPractices: [
      'Component composition',
      'Custom hooks',
      'Error boundaries',
    ],
  },
  {
    id: 'nextjs',
    name: 'nextjs',
    displayName: 'Next.js',
    icon: 'Layers',
    description: 'Next.js component with SSR/SSG optimizations',
    fileExtension: '.tsx',
    language: 'tsx',
    dependencies: ['next', 'react', '@types/react', '@types/node'],
    installCommand: 'npx create-next-app@latest',
    features: [
      'Server Components',
      'Client Components',
      'SEO optimized',
      'Image optimization',
    ],
    optimizations: [
      'Dynamic imports',
      'Code splitting',
      'Image optimization',
      'Font optimization',
    ],
    bestPractices: [
      'Server/Client boundaries',
      'Metadata API',
      'Route handlers',
    ],
  },
  {
    id: 'blazor',
    name: 'blazor',
    displayName: 'Blazor',
    icon: 'FileCode',
    description: 'Blazor Server/WASM component with C# code-behind',
    fileExtension: '.razor',
    language: 'razor',
    dependencies: [
      'Microsoft.AspNetCore.Components',
      'Microsoft.AspNetCore.Components.Web',
    ],
    installCommand: 'dotnet new blazorserver',
    features: [
      'Two-way binding',
      'Component lifecycle',
      'Dependency injection',
      'SignalR',
    ],
    optimizations: ['Virtualization', 'Prerendering', 'Lazy loading'],
    bestPractices: [
      'Component parameters',
      'Event callbacks',
      'State management',
    ],
  },
  {
    id: 'html',
    name: 'html',
    displayName: 'HTML',
    icon: 'Globe',
    description: 'Static HTML with Tailwind CSS styling',
    fileExtension: '.html',
    language: 'html',
    dependencies: ['tailwindcss'],
    installCommand: 'npm install -D tailwindcss',
    features: [
      'Semantic HTML',
      'Accessibility',
      'Tailwind utilities',
      'Responsive design',
    ],
    optimizations: ['Critical CSS', 'CSS purging', 'Minimal JavaScript'],
    bestPractices: [
      'Semantic markup',
      'ARIA labels',
      'Progressive enhancement',
    ],
  },
  {
    id: 'typescript',
    name: 'typescript',
    displayName: 'TypeScript',
    icon: 'Type',
    description: 'TypeScript interfaces and utility types',
    fileExtension: '.ts',
    language: 'typescript',
    dependencies: ['typescript'],
    installCommand: 'npm install -D typescript',
    features: ['Type safety', 'Interfaces', 'Generics', 'Utility types'],
    optimizations: ['Tree shaking', 'Type-only imports', 'Strict mode'],
    bestPractices: [
      'Strong typing',
      'Interface segregation',
      'Generic constraints',
    ],
  },
];

const iconMap = {
  React: Code,
  Layers: Layers,
  FileCode: FileCode,
  Globe: Globe,
  Type: Type,
} as const;

export function FrameworkSwitcher({
  selectedComponent,
  selectedFramework,
  onFrameworkChange,
  className,
}: FrameworkSwitcherProps) {
  const [showDetails, setShowDetails] = useState(false);

  const currentFramework = useMemo(
    () => frameworks.find(f => f.id === selectedFramework) || frameworks[0],
    [selectedFramework]
  );

  const handleFrameworkSelect = useCallback(
    (framework: FrameworkType) => {
      onFrameworkChange(framework);
    },
    [onFrameworkChange]
  );

  const toggleDetails = useCallback(() => {
    setShowDetails(prev => !prev);
  }, []);

  return (
    <div className={cn('space-y-4', className)}>
      {/* Framework Tabs */}
      <div className="flex flex-wrap gap-1 rounded-lg bg-muted/50 p-1">
        {frameworks.map(framework => {
          const Icon = iconMap[framework.icon as keyof typeof iconMap];
          const isSelected = framework.id === selectedFramework;

          return (
            <button
              key={framework.id}
              onClick={() => handleFrameworkSelect(framework.id)}
              className={cn(
                'flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium',
                'group relative transition-all duration-200',
                isSelected
                  ? 'bg-background text-qgba-gold shadow-sm'
                  : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{framework.displayName}</span>
              {isSelected && <Check className="h-3 w-3 text-qgba-gold" />}

              {/* Framework Badge */}
              {framework.id === 'nextjs' && (
                <Badge className="h-1.5 w-1.5 bg-blue-500" />
              )}
              {framework.id === 'blazor' && (
                <Badge className="h-1.5 w-1.5 bg-purple-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Framework Info Bar */}
      <div className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
        <div className="flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-qgba-gold/10">
            {React.createElement(
              iconMap[currentFramework.icon as keyof typeof iconMap],
              {
                className: 'h-4 w-4 text-qgba-gold',
              }
            )}
          </div>
          <div>
            <h4 className="font-medium text-foreground">
              {currentFramework.displayName}
            </h4>
            <p className="text-sm text-muted-foreground">
              {currentFramework.description}
            </p>
          </div>
        </div>

        <button
          onClick={toggleDetails}
          className="flex items-center space-x-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <Info className="h-4 w-4" />
          <span>{showDetails ? 'Hide' : 'Show'} Details</span>
        </button>
      </div>

      {/* Framework Details */}
      {showDetails && (
        <div className="space-y-4 rounded-lg border border-border bg-muted/30 p-4">
          {/* Features */}
          <div>
            <h5 className="mb-2 font-medium text-foreground">Features</h5>
            <div className="flex flex-wrap gap-1">
              {currentFramework.features.map((feature, index) => (
                <span
                  key={index}
                  className="rounded border border-border bg-background px-2 py-1 text-xs text-muted-foreground"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Dependencies */}
          <div>
            <h5 className="mb-2 font-medium text-foreground">Dependencies</h5>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1">
                {currentFramework.dependencies.map((dep, index) => (
                  <code
                    key={index}
                    className="rounded border border-border bg-background px-2 py-1 font-mono text-xs text-muted-foreground"
                  >
                    {dep}
                  </code>
                ))}
              </div>
              {currentFramework.installCommand && (
                <div className="rounded border border-border bg-background p-2">
                  <code className="font-mono text-xs text-muted-foreground">
                    {currentFramework.installCommand}
                  </code>
                </div>
              )}
            </div>
          </div>

          {/* Optimizations */}
          {currentFramework.optimizations &&
            currentFramework.optimizations.length > 0 && (
              <div>
                <h5 className="mb-2 font-medium text-foreground">
                  Optimizations
                </h5>
                <div className="flex flex-wrap gap-1">
                  {currentFramework.optimizations.map((optimization, index) => (
                    <span
                      key={index}
                      className="rounded border border-green-200 bg-green-50 px-2 py-1 text-xs text-green-700 dark:border-green-900 dark:bg-green-950/50 dark:text-green-300"
                    >
                      {optimization}
                    </span>
                  ))}
                </div>
              </div>
            )}

          {/* Best Practices */}
          {currentFramework.bestPractices &&
            currentFramework.bestPractices.length > 0 && (
              <div>
                <h5 className="mb-2 font-medium text-foreground">
                  Best Practices
                </h5>
                <div className="flex flex-wrap gap-1">
                  {currentFramework.bestPractices.map((practice, index) => (
                    <span
                      key={index}
                      className="rounded border border-blue-200 bg-blue-50 px-2 py-1 text-xs text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300"
                    >
                      {practice}
                    </span>
                  ))}
                </div>
              </div>
            )}
        </div>
      )}

      {/* Component Context */}
      {selectedComponent && (
        <div className="rounded-lg border border-qgba-gold/20 bg-qgba-gold/5 p-3">
          <div className="mb-2 flex items-center space-x-2">
            <Badge className="h-2 w-2 bg-qgba-gold" />
            <span className="text-sm font-medium text-foreground">
              Generating {currentFramework.displayName} code for{' '}
              {selectedComponent.name}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Code will be optimized for {currentFramework.displayName} with{' '}
            {currentFramework.features.slice(0, 2).join(' and ')}
          </p>
        </div>
      )}
    </div>
  );
}
