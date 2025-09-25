'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  LiveCodeGenerator,
  StackBlitzEnvironment,
  CodeSandboxEnvironment,
  useLiveCodeEnvironment,
  type LiveCodeEnvironmentConfig,
  type StackBlitzConfig,
  type CodeSandboxConfig
} from '@/lib/live-code-environments';
import {
  ExternalLink,
  Play,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { Component } from '@/types';
import { Template } from '@/types/templates';

export interface LiveCodeButtonProps {
  component?: Component;
  template?: Template;
  provider: 'stackblitz' | 'codesandbox' | 'both';
  framework?: 'react' | 'nextjs';
  title?: string;
  description?: string;
  className?: string;
  variant?: 'button' | 'icon' | 'dropdown';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function LiveCodeButton({
  component,
  template,
  provider = 'both',
  framework = 'react',
  title,
  description,
  className,
  variant = 'button',
  size = 'md',
  showLabel = true
}: LiveCodeButtonProps) {
  const [isCreating, setIsCreating] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<string | null>(null);
  const { createEnvironment, openInNewTab } = useLiveCodeEnvironment();

  const getButtonSizes = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs';
      case 'lg':
        return 'px-4 py-2.5 text-sm';
      default:
        return 'px-3 py-2 text-sm';
    }
  };

  const getIconSizes = () => {
    switch (size) {
      case 'sm':
        return 'h-3 w-3';
      case 'lg':
        return 'h-5 w-5';
      default:
        return 'h-4 w-4';
    }
  };

  const generateProjectTitle = (): string => {
    if (title) return title;
    if (component) return `Lucidex UI - ${component.name}`;
    if (template) return `Lucidex UI - ${template.name}`;
    return 'Lucidex UI Live Demo';
  };

  const generateProjectDescription = (): string => {
    if (description) return description;
    if (component) return component.description || `Interactive ${component.name} component from Lucidex UI`;
    if (template) return template.description || `${template.name} template from Lucidex UI`;
    return 'Live demo created with Lucidex UI';
  };

  const generateProjectFiles = (): Record<string, string> => {
    if (component) {
      const componentCode = component.code?.[framework] || component.code?.react || `
import React from 'react';

export function ${component.name}() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">${component.name}</h2>
      <p className="text-gray-600 mt-2">${component.description || 'Component preview'}</p>
    </div>
  );
}`;

      if (framework === 'nextjs') {
        return LiveCodeGenerator.generateNextJsProjectFiles(componentCode, component.name);
      } else {
        return LiveCodeGenerator.generateReactProjectFiles(componentCode, component.name);
      }
    }

    if (template) {
      const templateCode = template.codeSnippets.find(snippet =>
        snippet.language === framework ||
        snippet.language === 'react' ||
        snippet.language === 'tsx'
      )?.code || `
import React from 'react';

export default function ${template.name.replace(/[^a-zA-Z0-9]/g, '')}() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-4">${template.name}</h1>
      <p className="text-gray-600">${template.description}</p>
    </div>
  );
}`;

      return LiveCodeGenerator.generateTemplateProjectFiles(templateCode, template.name, framework);
    }

    return {};
  };

  const createLiveEnvironment = async (targetProvider: 'stackblitz' | 'codesandbox') => {
    const providerKey = targetProvider;
    setIsCreating(prev => ({ ...prev, [providerKey]: true }));
    setError(null);

    try {
      const files = generateProjectFiles();
      const projectTitle = generateProjectTitle();
      const projectDescription = generateProjectDescription();

      const baseConfig: LiveCodeEnvironmentConfig = {
        provider: targetProvider,
        template: framework,
        title: projectTitle,
        description: projectDescription,
        files,
        dependencies: {
          '@lucidex-ui/tokens': 'latest',
          'tailwindcss': '^3.4.0',
          'clsx': '^2.1.1',
        },
        settings: {
          compile: {
            trigger: 'auto',
            clearConsole: false,
          },
          hot: true,
          liveEdit: true,
        },
      };

      let config: StackBlitzConfig | CodeSandboxConfig;

      if (targetProvider === 'stackblitz') {
        config = {
          ...baseConfig,
          provider: 'stackblitz',
          openFile: component ? `src/components/${component.name}.tsx` : 'src/App.tsx',
          theme: 'dark',
          hideNavigation: false,
          hideDevTools: false,
          terminalHeight: 200,
        } as StackBlitzConfig;
      } else {
        config = {
          ...baseConfig,
          provider: 'codesandbox',
          view: 'split',
          theme: 'dark',
          hideNavigation: false,
          codemirror: 1,
          fontsize: 14,
          module: component ? `/src/components/${component.name}.tsx` : '/src/App.tsx',
        } as CodeSandboxConfig;
      }

      const url = await createEnvironment(config);
      openInNewTab(url);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create live environment';
      setError(errorMessage);
      console.error('Live environment creation failed:', err);
    } finally {
      setIsCreating(prev => ({ ...prev, [providerKey]: false }));
    }
  };

  if (variant === 'icon') {
    return (
      <div className={cn('flex items-center space-x-1', className)}>
        {(provider === 'stackblitz' || provider === 'both') && (
          <button
            onClick={() => createLiveEnvironment('stackblitz')}
            disabled={isCreating.stackblitz}
            className={cn(
              'rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
            title="Open in StackBlitz"
          >
            {isCreating.stackblitz ? (
              <Loader2 className={cn(getIconSizes(), 'animate-spin')} />
            ) : (
              <ExternalLink className={getIconSizes()} />
            )}
          </button>
        )}
        {(provider === 'codesandbox' || provider === 'both') && (
          <button
            onClick={() => createLiveEnvironment('codesandbox')}
            disabled={isCreating.codesandbox}
            className={cn(
              'rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
            title="Open in CodeSandbox"
          >
            {isCreating.codesandbox ? (
              <Loader2 className={cn(getIconSizes(), 'animate-spin')} />
            ) : (
              <Play className={getIconSizes()} />
            )}
          </button>
        )}
      </div>
    );
  }

  if (variant === 'dropdown') {
    return (
      <div className={cn('relative', className)}>
        <div className="flex flex-col space-y-1">
          {(provider === 'stackblitz' || provider === 'both') && (
            <button
              onClick={() => createLiveEnvironment('stackblitz')}
              disabled={isCreating.stackblitz}
              className={cn(
                'flex items-center space-x-2 rounded-md border bg-background px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              {isCreating.stackblitz ? (
                <Loader2 className={cn(getIconSizes(), 'animate-spin')} />
              ) : (
                <ExternalLink className={getIconSizes()} />
              )}
              {showLabel && <span>Open in StackBlitz</span>}
            </button>
          )}
          {(provider === 'codesandbox' || provider === 'both') && (
            <button
              onClick={() => createLiveEnvironment('codesandbox')}
              disabled={isCreating.codesandbox}
              className={cn(
                'flex items-center space-x-2 rounded-md border bg-background px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              {isCreating.codesandbox ? (
                <Loader2 className={cn(getIconSizes(), 'animate-spin')} />
              ) : (
                <Play className={getIconSizes()} />
              )}
              {showLabel && <span>Open in CodeSandbox</span>}
            </button>
          )}
        </div>
        {error && (
          <div className="mt-2 flex items-center space-x-2 rounded-md border border-destructive bg-destructive/10 p-2 text-sm text-destructive">
            <AlertTriangle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }

  // Default button variant
  if (provider === 'both') {
    return (
      <div className={cn('flex items-center space-x-2', className)}>
        <button
          onClick={() => createLiveEnvironment('stackblitz')}
          disabled={isCreating.stackblitz}
          className={cn(
            'inline-flex items-center space-x-2 rounded-md border bg-background transition-colors hover:bg-accent hover:text-accent-foreground',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            getButtonSizes()
          )}
        >
          {isCreating.stackblitz ? (
            <Loader2 className={cn(getIconSizes(), 'animate-spin')} />
          ) : (
            <ExternalLink className={getIconSizes()} />
          )}
          {showLabel && <span>StackBlitz</span>}
        </button>
        <button
          onClick={() => createLiveEnvironment('codesandbox')}
          disabled={isCreating.codesandbox}
          className={cn(
            'inline-flex items-center space-x-2 rounded-md border bg-background transition-colors hover:bg-accent hover:text-accent-foreground',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            getButtonSizes()
          )}
        >
          {isCreating.codesandbox ? (
            <Loader2 className={cn(getIconSizes(), 'animate-spin')} />
          ) : (
            <Play className={getIconSizes()} />
          )}
          {showLabel && <span>CodeSandbox</span>}
        </button>
        {error && (
          <div className="flex items-center space-x-1 text-sm text-destructive">
            <AlertTriangle className="h-4 w-4" />
            <span>Failed to create</span>
          </div>
        )}
      </div>
    );
  }

  // Single provider button
  return (
    <button
      onClick={() => createLiveEnvironment(provider)}
      disabled={isCreating[provider]}
      className={cn(
        'inline-flex items-center space-x-2 rounded-md border bg-background transition-colors hover:bg-accent hover:text-accent-foreground',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        getButtonSizes(),
        className
      )}
    >
      {isCreating[provider] ? (
        <Loader2 className={cn(getIconSizes(), 'animate-spin')} />
      ) : provider === 'stackblitz' ? (
        <ExternalLink className={getIconSizes()} />
      ) : (
        <Play className={getIconSizes()} />
      )}
      {showLabel && (
        <span>
          Open in {provider === 'stackblitz' ? 'StackBlitz' : 'CodeSandbox'}
        </span>
      )}
      {error && (
        <AlertTriangle className="ml-1 h-4 w-4 text-destructive" />
      )}
    </button>
  );
}

// Export a simpler component for common use cases
export function LiveCodeStackBlitzButton(props: Omit<LiveCodeButtonProps, 'provider'>) {
  return <LiveCodeButton {...props} provider="stackblitz" />;
}

export function LiveCodeSandboxButton(props: Omit<LiveCodeButtonProps, 'provider'>) {
  return <LiveCodeButton {...props} provider="codesandbox" />;
}