'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Sidebar } from './Sidebar';
import { ContentArea } from './ContentArea';
import { CodePanel } from './CodePanel';

interface MainLayoutProps {
  children?: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [codePanelOpen, setCodePanelOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex h-screen">
        {/* Left Sidebar - Navigation */}
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-50 lg:static',
            'w-72 border-r border-border bg-card',
            'transform transition-transform duration-300 ease-in-out lg:transform-none',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          )}
        >
          <Sidebar
            onComponentSelect={setSelectedComponent}
            selectedComponent={selectedComponent}
            onClose={() => setSidebarOpen(false)}
          />
        </aside>

        {/* Main Content Area */}
        <main
          className={cn('flex flex-1 flex-col lg:flex-row', 'overflow-hidden')}
        >
          {/* Content Area */}
          <div
            className={cn(
              'flex-1 overflow-auto',
              codePanelOpen ? 'lg:w-2/3' : 'w-full'
            )}
          >
            <ContentArea
              selectedComponent={selectedComponent}
              onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
              onCodePanelToggle={() => setCodePanelOpen(!codePanelOpen)}
              codePanelOpen={codePanelOpen}
            >
              {children}
            </ContentArea>
          </div>

          {/* Right Panel - Code */}
          {codePanelOpen && (
            <div
              className={cn(
                'w-full border-l border-border bg-card lg:w-1/3',
                'flex-shrink-0'
              )}
            >
              <CodePanel
                selectedComponent={selectedComponent}
                onClose={() => setCodePanelOpen(false)}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
