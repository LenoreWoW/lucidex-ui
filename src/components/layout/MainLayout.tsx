'use client';

import React, { useState, useMemo, useRef, useEffect, useCallback, memo } from 'react';
import { cn } from '@/lib/utils';
import { Sidebar } from './Sidebar';
import { ContentArea } from './ContentArea';
import { Component } from '@/types';
import { Header } from '../header';
import { LazyWrapper } from '@/components/ui/LazyWrapper';
import { ComponentLoadingSkeleton } from '@/components/ui/LoadingSpinner';
import { usePerformanceMonitoring } from '@/lib/performance';
import {
  announceToScreenReader,
  KeyCodes
} from '@/lib/accessibility';

// Lazy load the CodePanel since it's heavy and not always visible
const CodePanel = React.lazy(() =>
  import('./CodePanel').then(module => ({ default: module.CodePanel }))
);

interface MainLayoutProps {
  children?: React.ReactNode;
}

export const MainLayout = memo(function MainLayout({ children }: MainLayoutProps) {
  // Initialize performance monitoring
  usePerformanceMonitoring('MainLayout');

  const [selectedComponentName, setSelectedComponentName] = useState<
    string | null
  >(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [codePanelOpen, setCodePanelOpen] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const codePanelRef = useRef<HTMLDivElement>(null);

  // Handle escape key to close panels
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === KeyCodes.ESCAPE) {
        if (sidebarOpen) {
          setSidebarOpen(false);
          announceToScreenReader('Sidebar closed');
        } else if (codePanelOpen && window.innerWidth < 1024) {
          setCodePanelOpen(false);
          announceToScreenReader('Code panel closed');
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen, codePanelOpen]);

  // Memoized callbacks for better performance
  const handleSidebarToggle = useCallback(() => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);
    announceToScreenReader(newState ? 'Sidebar opened' : 'Sidebar closed');
  }, [sidebarOpen]);

  const handleCodePanelToggle = useCallback(() => {
    const newState = !codePanelOpen;
    setCodePanelOpen(newState);
    announceToScreenReader(newState ? 'Code panel opened' : 'Code panel closed');
  }, [codePanelOpen]);

  const handleComponentSelect = useCallback((componentName: string) => {
    setSelectedComponentName(componentName);
  }, []);

  const handleSidebarClose = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  // Convert component name to Component object for the CodePanel
  const selectedComponent = useMemo<Component | null>(() => {
    if (!selectedComponentName) return null;

    return {
      id: selectedComponentName.toLowerCase().replace(/\s+/g, '-'),
      name: selectedComponentName,
      description: `${selectedComponentName} component with customizable props and styling options.`,
      category: 'UI Components',
      tags: ['ui', 'component', 'react'],
      code: '',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes to apply to the component',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          required: false,
          description: 'Child elements to render inside the component',
        },
        {
          name: 'variant',
          type: "'default' | 'outline' | 'ghost'",
          required: false,
          description: 'Visual style variant of the component',
          default: 'default',
        },
        {
          name: 'size',
          type: "'sm' | 'md' | 'lg'",
          required: false,
          description: 'Size of the component',
          default: 'md',
        },
      ],
      dependencies: ['react', '@types/react'],
      features: ['Customizable styling', 'TypeScript support', 'Accessibility'],
    };
  }, [selectedComponentName]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => {
            if (e.key === KeyCodes.ENTER || e.key === KeyCodes.SPACE) {
              e.preventDefault();
              setSidebarOpen(false);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Close sidebar overlay"
        />
      )}

      <div className="flex h-screen">
        {/* Left Sidebar - Navigation */}
        <aside
          ref={sidebarRef}
          className={cn(
            'fixed inset-y-0 left-0 z-50 lg:static',
            'w-72 border-r border-border bg-card',
            'transform transition-transform duration-300 ease-in-out lg:transform-none',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          )}
          role="complementary"
          aria-label="Component navigation"
          id="sidebar-navigation"
        >
          <Sidebar
            onComponentSelect={handleComponentSelect}
            selectedComponent={selectedComponentName}
            onClose={handleSidebarClose}
          />
        </aside>

        {/* Main Content Area */}
        <main
          ref={mainRef}
          className={cn('flex flex-1 flex-col lg:flex-row', 'overflow-hidden')}
          role="main"
          id="main-content"
          tabIndex={-1}
        >
          {/* Content Area */}
          <div
            className={cn(
              'flex-1 overflow-auto',
              codePanelOpen ? 'lg:w-2/3' : 'w-full'
            )}
            role="region"
            aria-label="Component explorer"
          >
            <ContentArea
              selectedComponent={selectedComponentName}
              onMenuToggle={handleSidebarToggle}
              onCodePanelToggle={handleCodePanelToggle}
              codePanelOpen={codePanelOpen}
            >
              {children}
            </ContentArea>
          </div>

          {/* Right Panel - Code */}
          {codePanelOpen && (
            <section
              ref={codePanelRef}
              className={cn(
                'w-full border-l border-border bg-card lg:w-1/3',
                'flex-shrink-0'
              )}
              role="complementary"
              aria-label="Component code and documentation"
              id="code-panel"
            >
              <LazyWrapper fallback={<ComponentLoadingSkeleton />}>
                <CodePanel
                  selectedComponent={selectedComponent}
                  onClose={handleCodePanelToggle}
                />
              </LazyWrapper>
            </section>
          )}
        </main>
      </div>
    </div>
  );
});
