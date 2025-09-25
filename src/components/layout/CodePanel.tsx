'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { X, Code, Settings, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Component, FrameworkType } from '@/types';
import {
  FrameworkSwitcher,
  ReactRenderer,
  NextRenderer,
  BlazorRenderer,
  HTMLRenderer,
  TypeScriptRenderer,
} from '@/components/components';

interface CodePanelProps {
  selectedComponent: Component | null;
  onClose: () => void;
}

type TabType = 'code' | 'settings';

export function CodePanel({ selectedComponent, onClose }: CodePanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('code');
  const [selectedFramework, setSelectedFramework] =
    useState<FrameworkType>('react');

  const tabs = [
    { id: 'code' as TabType, label: 'Code', icon: Code },
    { id: 'settings' as TabType, label: 'Settings', icon: Settings },
  ];

  const handleFrameworkChange = useCallback((framework: FrameworkType) => {
    setSelectedFramework(framework);
  }, []);

  const renderFrameworkContent = useMemo(() => {
    if (!selectedComponent) return null;

    const rendererProps = {
      component: selectedComponent,
    };

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
  }, [selectedComponent, selectedFramework]);

  return (
    <div className="flex h-full flex-col bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center space-x-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-qgba-gold/10">
            <FileText className="h-3 w-3 text-qgba-gold" />
          </div>
          <h3 className="font-medium text-foreground">
            {selectedComponent
              ? `${selectedComponent.name} Code`
              : 'Code Panel'}
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
          <div className="h-full">
            {activeTab === 'code' && (
              <div className="h-full overflow-auto">
                {renderFrameworkContent}
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="p-4">
                <FrameworkSwitcher
                  selectedComponent={selectedComponent}
                  selectedFramework={selectedFramework}
                  onFrameworkChange={handleFrameworkChange}
                />
              </div>
            )}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
        <Code className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mb-2 font-medium text-foreground">
        No Component Selected
      </h3>
      <p className="max-w-sm text-sm text-muted-foreground">
        Select a component from the sidebar to view code examples across
        multiple frameworks including React, Next.js, Blazor, HTML, and
        TypeScript.
      </p>
    </div>
  );
}
