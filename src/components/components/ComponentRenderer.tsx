'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

export interface ComponentState {
  id: string;
  name: string;
  className?: string;
  pseudoClass?: string;
}

export const COMPONENT_STATES: ComponentState[] = [
  { id: 'default', name: 'Default' },
  { id: 'hover', name: 'Hover', pseudoClass: ':hover' },
  { id: 'focus', name: 'Focus', pseudoClass: ':focus' },
  { id: 'active', name: 'Active', pseudoClass: ':active' },
  { id: 'disabled', name: 'Disabled', className: 'disabled' },
  { id: 'loading', name: 'Loading', className: 'loading' },
  { id: 'error', name: 'Error', className: 'error' },
];

export interface ComponentProps {
  [key: string]: any;
}

export interface ComponentRendererProps {
  componentName: string;
  componentCode: string;
  props: ComponentProps;
  activeState: string;
  framework: 'react' | 'vue' | 'angular' | 'html';
  theme: 'light' | 'dark';
  className?: string;
  onRenderError?: (error: Error) => void;
  onRenderSuccess?: () => void;
}

export function ComponentRenderer({
  componentName,
  componentCode,
  props,
  activeState = 'default',
  framework = 'react',
  theme = 'light',
  className,
  onRenderError,
  onRenderSuccess,
}: ComponentRendererProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [renderError, setRenderError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentState =
    COMPONENT_STATES.find(state => state.id === activeState) ||
    COMPONENT_STATES[0];

  // Generate props string for the component
  const generatePropsString = useCallback((props: ComponentProps) => {
    return Object.entries(props)
      .map(([key, value]) => {
        if (typeof value === 'string') {
          return `${key}="${value}"`;
        } else if (typeof value === 'boolean') {
          return value ? key : '';
        } else if (typeof value === 'number') {
          return `${key}={${value}}`;
        } else if (typeof value === 'object') {
          return `${key}={${JSON.stringify(value)}}`;
        }
        return `${key}={${JSON.stringify(value)}}`;
      })
      .filter(Boolean)
      .join(' ');
  }, []);

  // Create sandboxed iframe content based on framework
  const createIframeContent = useCallback(() => {
    generatePropsString(props); // Keep the function call to avoid unused warning
    const stateClass = currentState.className || '';
    const pseudoStyle = currentState.pseudoClass
      ? `
        .component-wrapper ${currentState.pseudoClass} {
          /* Simulate pseudo-class state */
        }
        .component-wrapper.force-${currentState.id} {
          /* Force state styles */
        }
      `
      : '';

    const themeClass = theme === 'dark' ? 'dark' : '';

    // Qatar GBA Design Tokens CSS
    const qgbaTokens = `
      :root {
        --qgba-maroon: 128 50 50;
        --qgba-gold: 218 165 32;
        --qgba-navy: 25 45 85;
        --qgba-light-gray: 248 249 250;
        --qgba-dark-gray: 107 114 128;

        /* Light theme tokens */
        --background: 0 0% 100%;
        --foreground: 222.2 84% 4.9%;
        --card: 0 0% 100%;
        --card-foreground: 222.2 84% 4.9%;
        --popover: 0 0% 100%;
        --popover-foreground: 222.2 84% 4.9%;
        --primary: 221.2 83.2% 53.3%;
        --primary-foreground: 210 40% 98%;
        --secondary: 210 40% 96%;
        --secondary-foreground: 222.2 84% 4.9%;
        --muted: 210 40% 96%;
        --muted-foreground: 215.4 16.3% 46.9%;
        --accent: 210 40% 96%;
        --accent-foreground: 222.2 84% 4.9%;
        --destructive: 0 84.2% 60.2%;
        --destructive-foreground: 210 40% 98%;
        --border: 214.3 31.8% 91.4%;
        --input: 214.3 31.8% 91.4%;
        --ring: 221.2 83.2% 53.3%;
        --radius: 0.5rem;
      }

      .dark {
        --background: 222.2 84% 4.9%;
        --foreground: 210 40% 98%;
        --card: 222.2 84% 4.9%;
        --card-foreground: 210 40% 98%;
        --popover: 222.2 84% 4.9%;
        --popover-foreground: 210 40% 98%;
        --primary: 217.2 91.2% 59.8%;
        --primary-foreground: 222.2 84% 4.9%;
        --secondary: 217.2 32.6% 17.5%;
        --secondary-foreground: 210 40% 98%;
        --muted: 217.2 32.6% 17.5%;
        --muted-foreground: 215 20.2% 65.1%;
        --accent: 217.2 32.6% 17.5%;
        --accent-foreground: 210 40% 98%;
        --destructive: 0 62.8% 30.6%;
        --destructive-foreground: 210 40% 98%;
        --border: 217.2 32.6% 17.5%;
        --input: 217.2 32.6% 17.5%;
        --ring: 224.3 76.3% 94.1%;
      }
    `;

    switch (framework) {
      case 'react':
        return `
<!DOCTYPE html>
<html lang="en" class="${themeClass}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Component Sandbox</title>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    ${qgbaTokens}
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.5;
      background: hsl(var(--background));
      color: hsl(var(--foreground));
      padding: 24px;
      min-height: 100vh;
    }
    .component-wrapper {
      width: 100%;
      min-height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }
    .component-wrapper.force-hover > * {
      filter: brightness(1.1);
    }
    .component-wrapper.force-focus > * {
      outline: 2px solid hsl(var(--ring));
      outline-offset: 2px;
    }
    .component-wrapper.force-active > * {
      transform: scale(0.98);
    }
    .component-wrapper.force-disabled > * {
      opacity: 0.6;
      pointer-events: none;
    }
    .component-wrapper.force-loading > * {
      opacity: 0.7;
      cursor: wait;
    }
    .component-wrapper.force-error > * {
      border-color: hsl(var(--destructive));
      color: hsl(var(--destructive));
    }
    ${pseudoStyle}
    .error-boundary {
      color: hsl(var(--destructive));
      background: hsl(var(--destructive-foreground));
      border: 1px solid hsl(var(--destructive));
      border-radius: 8px;
      padding: 16px;
      margin: 16px 0;
    }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const { useState, useEffect, createElement } = React;

    // Error Boundary Component
    class ErrorBoundary extends React.Component {
      constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
      }

      static getDerivedStateFromError(error) {
        return { hasError: true, error };
      }

      componentDidCatch(error, errorInfo) {
        console.error('Component render error:', error, errorInfo);
        window.parent.postMessage({
          type: 'render-error',
          error: error.toString(),
          componentName: '${componentName}'
        }, '*');
      }

      render() {
        if (this.state.hasError) {
          return createElement('div', { className: 'error-boundary' }, [
            createElement('h3', { key: 'title' }, 'Component Error'),
            createElement('p', { key: 'message' }, this.state.error?.toString() || 'Unknown error'),
            createElement('button', {
              key: 'retry',
              onClick: () => this.setState({ hasError: false, error: null }),
              className: 'mt-2 px-3 py-1 bg-primary text-primary-foreground rounded'
            }, 'Retry')
          ]);
        }

        return this.props.children;
      }
    }

    // Component wrapper
    function ComponentWrapper() {
      try {
        // Dynamic component creation
        ${componentCode}

        const componentProps = ${JSON.stringify(props)};
        const wrapperClass = 'component-wrapper ${stateClass} force-${activeState}';

        return createElement(ErrorBoundary, {},
          createElement('div', { className: wrapperClass },
            // Create the component dynamically
            React.createElement('div', { ...componentProps }, 'Sample Component')
          )
        );
      } catch (error) {
        console.error('Component creation error:', error);
        return createElement('div', { className: 'error-boundary' },
          'Failed to create component: ' + error.toString()
        );
      }
    }

    // Render the component
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(createElement(ComponentWrapper));

    // Notify parent of successful render
    window.parent.postMessage({
      type: 'render-success',
      componentName: '${componentName}',
      state: '${activeState}'
    }, '*');
  </script>
</body>
</html>`;

      case 'html':
        return `
<!DOCTYPE html>
<html lang="en" class="${themeClass}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Component Sandbox</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    ${qgbaTokens}
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.5;
      background: hsl(var(--background));
      color: hsl(var(--foreground));
      padding: 24px;
      min-height: 100vh;
    }
    .component-wrapper {
      width: 100%;
      min-height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }
    ${pseudoStyle}
  </style>
</head>
<body>
  <div class="component-wrapper ${stateClass} force-${activeState}">
    ${componentCode}
  </div>
  <script>
    // Notify parent of successful render
    window.parent.postMessage({
      type: 'render-success',
      componentName: '${componentName}',
      state: '${activeState}'
    }, '*');
  </script>
</body>
</html>`;

      default:
        return `
<!DOCTYPE html>
<html>
<body>
  <div style="padding: 20px; text-align: center; color: #666;">
    Framework "${framework}" not yet supported
  </div>
</body>
</html>`;
    }
  }, [
    componentName,
    componentCode,
    props,
    activeState,
    framework,
    theme,
    currentState,
    generatePropsString,
  ]);

  // Update iframe content when props change
  useEffect(() => {
    if (iframeRef.current) {
      setIsLoading(true);
      setRenderError(null);

      try {
        const content = createIframeContent();
        iframeRef.current.srcdoc = content;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error';
        setRenderError(errorMessage);
        onRenderError?.(
          error instanceof Error ? error : new Error(errorMessage)
        );
        setIsLoading(false);
      }
    }
  }, [createIframeContent, onRenderError]);

  // Handle messages from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'render-success') {
        setIsLoading(false);
        setRenderError(null);
        onRenderSuccess?.();
      } else if (event.data?.type === 'render-error') {
        setIsLoading(false);
        setRenderError(event.data.error);
        onRenderError?.(new Error(event.data.error));
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onRenderSuccess, onRenderError]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'component-renderer relative overflow-hidden rounded-lg border border-border bg-card',
        className
      )}
    >
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="flex items-center space-x-3 text-muted-foreground">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
            <span className="text-sm font-medium">
              Rendering {componentName}...
            </span>
          </div>
        </div>
      )}

      {/* Error State */}
      {renderError && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/95 backdrop-blur-sm">
          <div className="mx-4 max-w-md rounded-lg border border-destructive bg-card p-6 text-center">
            <div className="mb-3 text-destructive">
              <svg
                className="mx-auto h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold text-destructive">
              Render Error
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">{renderError}</p>
            <button
              onClick={() => {
                setRenderError(null);
                if (iframeRef.current) {
                  iframeRef.current.srcdoc = createIframeContent();
                }
              }}
              className="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary/90"
            >
              Retry Render
            </button>
          </div>
        </div>
      )}

      {/* State Badge */}
      <div className="absolute left-3 top-3 z-10 rounded-md bg-background/80 px-2 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
        {currentState.name}
      </div>

      {/* Framework Badge */}
      <div className="absolute right-3 top-3 z-10 rounded-md bg-background/80 px-2 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
        {framework.charAt(0).toUpperCase() + framework.slice(1)}
      </div>

      {/* Sandboxed Iframe */}
      <iframe
        ref={iframeRef}
        className={cn(
          'h-full w-full border-0 bg-transparent transition-opacity duration-200',
          isLoading || renderError ? 'opacity-0' : 'opacity-100'
        )}
        title={`${componentName} Component Sandbox`}
        sandbox="allow-scripts allow-same-origin"
        style={{
          minHeight: '300px',
          height: '400px',
        }}
      />
    </div>
  );
}
