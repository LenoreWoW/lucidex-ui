'use client';

import React, { useState } from 'react';
import { Copy, Check, X, FileText, Package, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodePanelProps {
  selectedComponent: string | null;
  onClose: () => void;
}

type TabType = 'tsx' | 'props' | 'usage';

export function CodePanel({ selectedComponent, onClose }: CodePanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('tsx');
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const tabs = [
    { id: 'tsx' as TabType, label: 'Code', icon: FileText },
    { id: 'props' as TabType, label: 'Props', icon: Package },
    { id: 'usage' as TabType, label: 'Usage', icon: Eye },
  ];

  return (
    <div className="flex h-full flex-col bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center space-x-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-qgba-gold/10">
            <FileText className="h-3 w-3 text-qgba-gold" />
          </div>
          <h3 className="font-medium text-foreground">
            {selectedComponent ? `${selectedComponent} Code` : 'Code Panel'}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border bg-muted/30">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center space-x-2 px-4 py-2.5 text-sm font-medium transition-all duration-200',
                'border-b-2 border-transparent hover:bg-accent/50',
                activeTab === tab.id
                  ? 'border-qgba-gold bg-background text-qgba-gold'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {selectedComponent ? (
          <div className="space-y-4 p-4">
            {activeTab === 'tsx' && (
              <TSXContent
                component={selectedComponent}
                onCopy={handleCopy}
                copiedStates={copiedStates}
              />
            )}
            {activeTab === 'props' && (
              <PropsContent component={selectedComponent} />
            )}
            {activeTab === 'usage' && (
              <UsageContent
                component={selectedComponent}
                onCopy={handleCopy}
                copiedStates={copiedStates}
              />
            )}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}

function TSXContent({
  component,
  onCopy,
  copiedStates,
}: {
  component: string;
  onCopy: (text: string, key: string) => void;
  copiedStates: Record<string, boolean>;
}) {
  const code = `import React from 'react';
import { cn } from '@/lib/utils';

interface ${component}Props {
  className?: string;
  children?: React.ReactNode;
}

export function ${component}({
  className,
  children,
  ...props
}: ${component}Props) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-6",
        "shadow-sm hover:shadow-md transition-shadow",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}`;

  const copyKey = `tsx-${component}`;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-foreground">{component}.tsx</h4>
        <button
          onClick={() => onCopy(code, copyKey)}
          className={cn(
            'flex items-center space-x-1.5 rounded-md px-2.5 py-1.5 text-xs',
            'transition-colors duration-200',
            copiedStates[copyKey]
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-accent text-muted-foreground hover:bg-accent/80 hover:text-foreground'
          )}
        >
          {copiedStates[copyKey] ? (
            <Check className="h-3 w-3" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
          <span>{copiedStates[copyKey] ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>

      <div className="relative">
        <pre className="overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 text-xs">
          <code className="text-foreground">{code}</code>
        </pre>
      </div>
    </div>
  );
}

function PropsContent({ component }: { component: string }) {
  const props = [
    {
      name: 'className',
      type: 'string',
      default: '-',
      description: 'Additional CSS classes to apply to the component',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      default: '-',
      description: 'Child elements to render inside the component',
    },
    {
      name: 'variant',
      type: "'default' | 'outline' | 'ghost'",
      default: "'default'",
      description: 'Visual style variant of the component',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Size of the component',
    },
  ];

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-foreground">{component} Props</h4>

      <div className="space-y-3">
        {props.map(prop => (
          <div
            key={prop.name}
            className="rounded-lg border border-border bg-background p-3"
          >
            <div className="mb-2 flex items-start justify-between">
              <span className="font-mono text-sm font-medium text-qgba-gold">
                {prop.name}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                {prop.type}
              </span>
            </div>
            <p className="mb-2 text-sm text-muted-foreground">
              {prop.description}
            </p>
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-muted-foreground">Default:</span>
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono">
                {prop.default}
              </code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UsageContent({
  component,
  onCopy,
  copiedStates,
}: {
  component: string;
  onCopy: (text: string, key: string) => void;
  copiedStates: Record<string, boolean>;
}) {
  const usageExamples = [
    {
      title: 'Basic Usage',
      code: `import { ${component} } from '@/components/ui/${component.toLowerCase()}';

export function Example() {
  return (
    <${component}>
      Hello World
    </${component}>
  );
}`,
    },
    {
      title: 'With Custom Styling',
      code: `import { ${component} } from '@/components/ui/${component.toLowerCase()}';

export function Example() {
  return (
    <${component} className="max-w-md mx-auto">
      Custom styled component
    </${component}>
  );
}`,
    },
  ];

  return (
    <div className="space-y-6">
      <h4 className="font-medium text-foreground">Usage Examples</h4>

      {usageExamples.map((example, index) => {
        const copyKey = `usage-${component}-${index}`;
        return (
          <div key={index} className="space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="text-sm font-medium text-foreground">
                {example.title}
              </h5>
              <button
                onClick={() => onCopy(example.code, copyKey)}
                className={cn(
                  'flex items-center space-x-1.5 rounded-md px-2.5 py-1.5 text-xs',
                  'transition-colors duration-200',
                  copiedStates[copyKey]
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-accent text-muted-foreground hover:bg-accent/80 hover:text-foreground'
                )}
              >
                {copiedStates[copyKey] ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
                <span>{copiedStates[copyKey] ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <pre className="overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 text-xs">
              <code className="text-foreground">{example.code}</code>
            </pre>
          </div>
        );
      })}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
        <FileText className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mb-2 font-medium text-foreground">
        No Component Selected
      </h3>
      <p className="max-w-sm text-sm text-muted-foreground">
        Select a component from the sidebar to view its code, props, and usage
        examples.
      </p>
    </div>
  );
}
