'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Component, FrameworkType } from '@/types';
import { ComponentRenderer, COMPONENT_STATES } from './ComponentRenderer';
import { PropsPanel, PropValue } from './PropsPanel';
import {
  Code2,
  Eye,
  Settings,
  Share2,
  RefreshCw,
  Maximize2,
  Minimize2,
  Monitor,
  Smartphone,
  Tablet,
  BookOpen,
  AlertCircle,
} from 'lucide-react';
import { LiveCodeButton } from '@/components/ui/LiveCodeButton';
import { GitHubExportButton } from '@/components/ui/GitHubExportButton';

export interface ComponentPreviewProps {
  component: Component;
  framework?: FrameworkType;
  initialProps?: PropValue;
  className?: string;
  showDocumentation?: boolean;
  showCodeSnippets?: boolean;
  onPropsChange?: (props: PropValue) => void;
  onFrameworkChange?: (framework: FrameworkType) => void;
}

type ViewMode = 'split' | 'preview-only' | 'props-only';
type Layout = 'horizontal' | 'vertical';

const FRAMEWORKS: Array<{ id: FrameworkType; name: string; icon: string }> = [
  { id: 'react', name: 'React', icon: '⚛️' },
  { id: 'nextjs', name: 'Next.js', icon: '▲' },
  { id: 'html', name: 'HTML', icon: '🌐' },
  { id: 'typescript', name: 'TypeScript', icon: '🔷' },
];

const BREAKPOINTS = [
  { id: 'mobile', name: 'Mobile', icon: Smartphone, width: 375 },
  { id: 'tablet', name: 'Tablet', icon: Tablet, width: 768 },
  { id: 'desktop', name: 'Desktop', icon: Monitor, width: 1200 },
];

export function ComponentPreview({
  component,
  framework = 'react',
  initialProps = {},
  className,
  showDocumentation = true,
  showCodeSnippets = true,
  onPropsChange,
  onFrameworkChange,
}: ComponentPreviewProps) {
  const [props, setProps] = useState<PropValue>(initialProps);
  const [activeState, setActiveState] = useState('default');
  const [selectedFramework, setSelectedFramework] =
    useState<FrameworkType>(framework);
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [layout] = useState<Layout>('horizontal');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeBreakpoint, setActiveBreakpoint] = useState('desktop');
  const [theme] = useState<'light' | 'dark'>('light');
  const [showAdvancedProps] = useState(false);
  const [renderKey, setRenderKey] = useState(0);
  const [renderError, setRenderError] = useState<string | null>(null);
  // const [isLoading] = useState(false); // Removed unused variable

  const componentProps = useMemo(() => {
    return component.props || [];
  }, [component.props]);

  // Handle props change
  const handlePropsChange = useCallback(
    (newProps: PropValue) => {
      setProps(newProps);
      onPropsChange?.(newProps);
    },
    [onPropsChange]
  );

  // Handle framework change
  const handleFrameworkChange = useCallback(
    (newFramework: FrameworkType) => {
      setSelectedFramework(newFramework);
      onFrameworkChange?.(newFramework);
      setRenderKey(prev => prev + 1); // Force re-render
    },
    [onFrameworkChange]
  );

  // Generate code snippet for current configuration
  const generateCodeSnippet = useCallback(() => {
    const propsString = Object.entries(props)
      .filter(
        ([_, value]) => value !== undefined && value !== null && value !== ''
      )
      .map(([key, value]) => {
        if (typeof value === 'boolean') {
          return value ? key : `${key}={false}`;
        } else if (typeof value === 'string') {
          return `${key}="${value}"`;
        } else {
          return `${key}={${JSON.stringify(value)}}`;
        }
      })
      .join('\n  ');

    const imports = component.dependencies?.join(', ') || component.name;
    const componentTag = propsString
      ? `<${component.name}\n  ${propsString}\n/>`
      : `<${component.name} />`;

    switch (selectedFramework) {
      case 'react':
      case 'nextjs':
        return `import { ${imports} } from '@/components';\n\n${componentTag}`;
      case 'html':
        return componentTag.replace(/([a-zA-Z]+)={([^}]+)}/g, '$1="$2"');
      case 'typescript':
        return `import { ${imports} } from '@/components';\n\nconst example = (\n  ${componentTag}\n);`;
      default:
        return componentTag;
    }
  }, [component, props, selectedFramework]);

  // Copy code to clipboard
  const handleCopyCode = useCallback(async () => {
    const code = generateCodeSnippet();
    try {
      await navigator.clipboard.writeText(code);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  }, [generateCodeSnippet]);

  // Share component configuration
  const handleShare = useCallback(async () => {
    const config = {
      component: component.id,
      props,
      framework: selectedFramework,
      state: activeState,
    };
    const url = `${window.location.origin}${window.location.pathname}?config=${encodeURIComponent(JSON.stringify(config))}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch (error) {
      console.error('Failed to copy URL:', error);
    }
  }, [component.id, props, selectedFramework, activeState]);

  // Reset to defaults
  const handleReset = useCallback(() => {
    const defaultProps: PropValue = {};
    componentProps.forEach(prop => {
      if (prop.default !== undefined) {
        defaultProps[prop.name] = prop.default;
      }
    });
    setProps(defaultProps);
    setActiveState('default');
    setRenderKey(prev => prev + 1);
  }, [componentProps]);

  const renderToolbar = () => (
    <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2">
      <div className="flex items-center space-x-4">
        {/* Component Title */}
        <div className="flex items-center space-x-2">
          <h1 className="font-semibold text-foreground">{component.name}</h1>
          <span className="text-xs text-muted-foreground">
            {component.category}
          </span>
        </div>

        {/* Framework Selector */}
        <select
          value={selectedFramework}
          onChange={e => handleFrameworkChange(e.target.value as FrameworkType)}
          className="rounded-md border border-border bg-background px-3 py-1 text-sm"
        >
          {FRAMEWORKS.map(fw => (
            <option key={fw.id} value={fw.id}>
              {fw.icon} {fw.name}
            </option>
          ))}
        </select>

        {/* Component State */}
        <select
          value={activeState}
          onChange={e => setActiveState(e.target.value)}
          className="rounded-md border border-border bg-background px-3 py-1 text-sm"
        >
          {COMPONENT_STATES.map(state => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2">
        {/* Breakpoint Toggle */}
        <div className="flex items-center space-x-1">
          {BREAKPOINTS.map(bp => (
            <button
              key={bp.id}
              onClick={() => setActiveBreakpoint(bp.id)}
              className={cn(
                'rounded-md p-1.5 text-xs transition-colors',
                activeBreakpoint === bp.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              title={`${bp.name} (${bp.width}px)`}
            >
              <bp.icon className="h-3 w-3" />
            </button>
          ))}
        </div>

        <div className="h-4 w-px bg-border" />

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setViewMode('preview-only')}
            className={cn(
              'rounded-md p-1.5 text-xs transition-colors',
              viewMode === 'preview-only'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
            title="Preview Only"
          >
            <Eye className="h-3 w-3" />
          </button>
          <button
            onClick={() => setViewMode('split')}
            className={cn(
              'rounded-md p-1.5 text-xs transition-colors',
              viewMode === 'split'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
            title="Split View"
          >
            <Monitor className="h-3 w-3" />
          </button>
          <button
            onClick={() => setViewMode('props-only')}
            className={cn(
              'rounded-md p-1.5 text-xs transition-colors',
              viewMode === 'props-only'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
            title="Props Only"
          >
            <Settings className="h-3 w-3" />
          </button>
        </div>

        <div className="h-4 w-px bg-border" />

        {/* Action Buttons */}
        <button
          onClick={handleReset}
          className="rounded-md p-1.5 text-muted-foreground hover:text-foreground"
          title="Reset to defaults"
        >
          <RefreshCw className="h-3 w-3" />
        </button>
        <button
          onClick={handleCopyCode}
          className="rounded-md p-1.5 text-muted-foreground hover:text-foreground"
          title="Copy code"
        >
          <Code2 className="h-3 w-3" />
        </button>
        <button
          onClick={handleShare}
          className="rounded-md p-1.5 text-muted-foreground hover:text-foreground"
          title="Share configuration"
        >
          <Share2 className="h-3 w-3" />
        </button>

        <div className="h-4 w-px bg-border" />

        <LiveCodeButton
          component={component}
          framework={selectedFramework === 'nextjs' ? 'nextjs' : 'react'}
          provider="both"
          variant="icon"
          size="sm"
          showLabel={false}
          className="flex-shrink-0"
        />

        <GitHubExportButton
          component={component}
          framework={selectedFramework === 'nextjs' ? 'nextjs' : 'react'}
          exportType="both"
          variant="icon"
          size="sm"
          showLabel={false}
          className="flex-shrink-0"
        />

        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="rounded-md p-1.5 text-muted-foreground hover:text-foreground"
          title="Toggle fullscreen"
        >
          {isFullscreen ? (
            <Minimize2 className="h-3 w-3" />
          ) : (
            <Maximize2 className="h-3 w-3" />
          )}
        </button>
      </div>
    </div>
  );

  const renderDocumentation = () =>
    showDocumentation && (
      <div className="border-b border-border bg-muted/20 p-4">
        <div className="flex items-start space-x-3">
          <BookOpen className="mt-0.5 h-4 w-4 text-muted-foreground" />
          <div className="flex-1">
            <p className="mb-2 text-sm text-foreground">
              {component.description}
            </p>
            {component.features && component.features.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {component.features.map(feature => (
                  <span
                    key={feature}
                    className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );

  const renderErrorState = () =>
    renderError && (
      <div className="m-4 flex items-center space-x-3 rounded-lg border border-destructive bg-destructive/10 p-4">
        <AlertCircle className="h-5 w-5 text-destructive" />
        <div>
          <h3 className="font-medium text-destructive">Render Error</h3>
          <p className="text-sm text-muted-foreground">{renderError}</p>
        </div>
        <button
          onClick={() => {
            setRenderError(null);
            setRenderKey(prev => prev + 1);
          }}
          className="rounded-md bg-primary px-3 py-1 text-sm text-primary-foreground hover:bg-primary/90"
        >
          Retry
        </button>
      </div>
    );

  const renderContent = () => {
    if (viewMode === 'props-only') {
      return (
        <PropsPanel
          componentName={component.name}
          props={componentProps}
          values={props}
          onChange={handlePropsChange}
          showAdvanced={showAdvancedProps}
          showCode={showCodeSnippets}
          className="h-full"
        />
      );
    }

    if (viewMode === 'preview-only') {
      return (
        <div className="flex-1 p-4">
          <ComponentRenderer
            key={renderKey}
            componentName={component.name}
            componentCode={component.code}
            props={props}
            activeState={activeState}
            framework={
              selectedFramework === 'nextjs' ||
              selectedFramework === 'typescript'
                ? 'react'
                : (selectedFramework as 'react' | 'html')
            }
            theme={theme}
            onRenderError={error => setRenderError(error.message)}
            onRenderSuccess={() => setRenderError(null)}
            className="h-full"
          />
        </div>
      );
    }

    // Split view
    const isHorizontal = layout === 'horizontal';
    return (
      <div
        className={cn('flex flex-1', isHorizontal ? 'flex-row' : 'flex-col')}
      >
        <div className={cn('bg-background', isHorizontal ? 'w-2/3' : 'h-2/3')}>
          <div className="h-full p-4">
            <ComponentRenderer
              key={renderKey}
              componentName={component.name}
              componentCode={component.code}
              props={props}
              activeState={activeState}
              framework={
                selectedFramework === 'nextjs' ||
                selectedFramework === 'typescript'
                  ? 'react'
                  : (selectedFramework as 'react' | 'html')
              }
              theme={theme}
              onRenderError={error => setRenderError(error.message)}
              onRenderSuccess={() => setRenderError(null)}
              className="h-full"
            />
          </div>
        </div>

        <div
          className={cn(
            'border-border bg-card',
            isHorizontal ? 'w-1/3 border-l' : 'h-1/3 border-t'
          )}
        >
          <PropsPanel
            componentName={component.name}
            props={componentProps}
            values={props}
            onChange={handlePropsChange}
            showAdvanced={showAdvancedProps}
            showCode={showCodeSnippets}
            className="h-full"
          />
        </div>
      </div>
    );
  };

  return (
    <div
      className={cn(
        'component-preview flex flex-col bg-background',
        isFullscreen && 'fixed inset-0 z-50',
        className
      )}
    >
      {renderToolbar()}
      {renderDocumentation()}
      {renderErrorState()}
      {renderContent()}
    </div>
  );
}
