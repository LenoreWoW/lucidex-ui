'use client';

import React from 'react';
import { Menu, Code2, Eye, Settings, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PreviewSystem } from '@/components/preview';

interface ContentAreaProps {
  selectedComponent: string | null;
  onMenuToggle: () => void;
  onCodePanelToggle: () => void;
  codePanelOpen: boolean;
  children?: React.ReactNode;
}

export function ContentArea({
  selectedComponent,
  onMenuToggle,
  onCodePanelToggle,
  codePanelOpen,
  children,
}: ContentAreaProps) {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>

          <div className="flex items-center space-x-2">
            <h2 className="font-semibold text-foreground">
              {selectedComponent || 'Welcome'}
            </h2>
            {selectedComponent && (
              <span className="rounded-full border border-qgba-gold/20 bg-qgba-gold/10 px-2 py-0.5 text-xs text-qgba-gold">
                Component
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* View Mode Toggle */}
          <div className="hidden items-center rounded-lg border border-border p-1 sm:flex">
            <button className="flex items-center space-x-1 rounded-md bg-accent px-3 py-1.5 text-xs text-accent-foreground">
              <Eye className="h-3 w-3" />
              <span>Preview</span>
            </button>
            <button className="flex items-center space-x-1 rounded-md px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
              <Settings className="h-3 w-3" />
              <span>Props</span>
            </button>
          </div>

          {/* Code Panel Toggle */}
          <button
            onClick={onCodePanelToggle}
            className={cn(
              'rounded-md p-2 transition-colors',
              codePanelOpen
                ? 'bg-qgba-gold text-white shadow-sm'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            )}
          >
            <Code2 className="h-4 w-4" />
          </button>

          {/* Fullscreen */}
          <button className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {children || (
          <div className="h-full">
            {selectedComponent ? (
              <ComponentPreview component={selectedComponent} />
            ) : (
              <div className="flex h-full flex-col items-center justify-center p-8">
                <WelcomeScreen />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function WelcomeScreen() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 text-center">
      <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-qgba-gold to-qgba-maroon">
        <div className="h-10 w-10 rounded-lg bg-white shadow-inner"></div>
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome to Lucidex UI
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Bring clarity to your design system with cross-framework component exploration.
          Select a component from the sidebar to get started with instant code generation.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50">
          <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-qgba-gold/10">
            <Eye className="h-4 w-4 text-qgba-gold" />
          </div>
          <h3 className="mb-1 font-medium text-foreground">Live Preview</h3>
          <p className="text-sm text-muted-foreground">
            See components in action with real-time updates
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50">
          <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-qgba-gold/10">
            <Code2 className="h-4 w-4 text-qgba-gold" />
          </div>
          <h3 className="mb-1 font-medium text-foreground">Code Examples</h3>
          <p className="text-sm text-muted-foreground">
            Copy-paste ready code snippets for every component
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50">
          <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-qgba-gold/10">
            <Settings className="h-4 w-4 text-qgba-gold" />
          </div>
          <h3 className="mb-1 font-medium text-foreground">Customizable</h3>
          <p className="text-sm text-muted-foreground">
            Adjust props and see changes instantly
          </p>
        </div>
      </div>
    </div>
  );
}

function ComponentPreview({ component }: { component: string }) {
  // Generate sample content based on component type
  const getSampleContent = (componentName: string) => {
    const samples = {
      Button: `
        <div style="display: flex; gap: 12px; align-items: center;">
          <button style="background: #B8860B; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer;">
            Primary Button
          </button>
          <button style="background: transparent; color: #B8860B; border: 2px solid #B8860B; padding: 6px 14px; border-radius: 6px; cursor: pointer;">
            Secondary Button
          </button>
          <button style="background: #f5f5f5; color: #666; border: 1px solid #ddd; padding: 6px 14px; border-radius: 6px; cursor: pointer;">
            Disabled Button
          </button>
        </div>
      `,
      Card: `
        <div style="max-width: 320px; background: white; border: 1px solid #e5e5e5; border-radius: 8px; padding: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <h3 style="margin: 0 0 8px 0; color: #1a1a1a; font-size: 18px; font-weight: 600;">Card Title</h3>
          <p style="margin: 0 0 16px 0; color: #666; font-size: 14px; line-height: 1.4;">
            This is a sample card component with some content to demonstrate the preview system.
          </p>
          <button style="background: #B8860B; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 12px;">
            Action
          </button>
        </div>
      `,
      Input: `
        <div style="max-width: 280px; space-y: 12px;">
          <div>
            <label style="display: block; margin-bottom: 4px; color: #374151; font-size: 14px; font-weight: 500;">Email</label>
            <input type="email" placeholder="Enter your email" style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px;" />
          </div>
          <div style="margin-top: 16px;">
            <label style="display: block; margin-bottom: 4px; color: #374151; font-size: 14px; font-weight: 500;">Message</label>
            <textarea placeholder="Your message..." rows="3" style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; resize: vertical;"></textarea>
          </div>
        </div>
      `,
      default: `
        <div style="display: flex; flex-direction: column; align-items: center; padding: 40px 20px; text-align: center;">
          <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #B8860B, #8B0000); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
            <div style="width: 32px; height: 32px; background: rgba(255,255,255,0.8); border-radius: 6px;"></div>
          </div>
          <h3 style="margin: 0 0 8px 0; color: #1a1a1a; font-size: 20px; font-weight: 600;">${component}</h3>
          <p style="margin: 0; color: #666; font-size: 14px;">
            Interactive preview for the ${component} component will be rendered here.
          </p>
        </div>
      `,
    };

    return samples[componentName as keyof typeof samples] || samples.default;
  };

  return (
    <div className="h-full w-full">
      <PreviewSystem
        content={getSampleContent(component)}
        title={component}
        description={`Interactive preview and documentation for the ${component} component`}
        framework="react"
        showHeader={true}
      />
    </div>
  );
}
