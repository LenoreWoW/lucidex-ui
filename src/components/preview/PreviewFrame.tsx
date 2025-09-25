'use client';

import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export interface Breakpoint {
  id: string;
  name: string;
  width: number;
  height?: number;
  deviceFrame?: 'mobile' | 'tablet' | 'desktop';
}

export const BREAKPOINTS: Breakpoint[] = [
  {
    id: 'mobile',
    name: 'Mobile',
    width: 375,
    height: 667,
    deviceFrame: 'mobile',
  },
  {
    id: 'tablet',
    name: 'Tablet',
    width: 768,
    height: 1024,
    deviceFrame: 'tablet',
  },
  {
    id: 'desktop',
    name: 'Desktop',
    width: 1280,
    height: 800,
    deviceFrame: 'desktop',
  },
  { id: 'full', name: 'Full Width', width: 0 },
];

interface PreviewFrameProps {
  content: string;
  activeBreakpoint: string;
  zoom: number;
  className?: string;
  showDeviceFrame?: boolean;
  onLoad?: () => void;
}

export function PreviewFrame({
  content,
  activeBreakpoint,
  zoom = 1,
  className,
  showDeviceFrame = true,
  onLoad,
}: PreviewFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const breakpoint =
    BREAKPOINTS.find(bp => bp.id === activeBreakpoint) || BREAKPOINTS[0];
  const isFullWidth = breakpoint.id === 'full';

  // Create iframe content with isolated styles
  const iframeContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.5;
      background: transparent;
      padding: 16px;
    }
    .preview-container {
      width: 100%;
      min-height: calc(100vh - 32px);
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }
  </style>
</head>
<body>
  <div class="preview-container">
    ${content}
  </div>
  <script>
    // Post message when content changes
    window.parent.postMessage({ type: 'preview-loaded' }, '*');

    // Handle dynamic content updates
    const observer = new MutationObserver(() => {
      window.parent.postMessage({ type: 'content-changed' }, '*');
    });
    observer.observe(document.body, { childList: true, subtree: true });
  </script>
</body>
</html>`;

  useEffect(() => {
    if (iframeRef.current) {
      setIsLoading(true);
      const iframe = iframeRef.current;
      iframe.srcdoc = iframeContent;
    }
  }, [content, iframeContent]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'preview-loaded') {
        setIsLoading(false);
        onLoad?.();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onLoad]);

  const frameWidth = isFullWidth ? '100%' : `${breakpoint.width}px`;
  const frameHeight = isFullWidth
    ? '100%'
    : breakpoint.height
      ? `${breakpoint.height}px`
      : 'auto';

  const deviceFrameClass =
    showDeviceFrame && breakpoint.deviceFrame
      ? `device-frame device-frame--${breakpoint.deviceFrame}`
      : '';

  return (
    <div
      ref={containerRef}
      className={cn(
        'preview-frame-container flex items-center justify-center transition-all duration-300 ease-out',
        className
      )}
      style={{ transform: `scale(${zoom})`, transformOrigin: 'center top' }}
    >
      <div
        className={cn(
          'preview-frame-wrapper relative transition-all duration-300 ease-out',
          deviceFrameClass,
          isFullWidth && 'h-full w-full',
          !isFullWidth && 'overflow-hidden rounded-lg shadow-xl'
        )}
        style={{
          width: frameWidth,
          height: frameHeight,
          minHeight: isFullWidth ? '100%' : '400px',
        }}
      >
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
              <span className="text-sm">Loading preview...</span>
            </div>
          </div>
        )}

        {/* Device Frame Decorations */}
        {showDeviceFrame && breakpoint.deviceFrame === 'mobile' && (
          <div className="device-chrome absolute inset-x-0 top-0 flex h-6 items-center justify-center rounded-t-lg bg-black">
            <div className="h-1 w-12 rounded-full bg-gray-300"></div>
          </div>
        )}

        {showDeviceFrame && breakpoint.deviceFrame === 'desktop' && (
          <div className="device-chrome absolute inset-x-0 top-0 flex h-8 items-center space-x-2 border-b bg-gray-200 px-3">
            <div className="flex space-x-1">
              <div className="h-3 w-3 rounded-full bg-red-400"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
              <div className="h-3 w-3 rounded-full bg-green-400"></div>
            </div>
            <div className="flex-1 text-center">
              <div className="max-w-48 truncate rounded bg-white px-2 py-0.5 text-xs text-gray-600">
                Preview
              </div>
            </div>
          </div>
        )}

        {/* Iframe */}
        <iframe
          ref={iframeRef}
          className={cn(
            'preview-iframe h-full w-full border-0 bg-white transition-opacity duration-200',
            showDeviceFrame &&
              breakpoint.deviceFrame === 'mobile' &&
              'rounded-b-lg rounded-t-none',
            showDeviceFrame && breakpoint.deviceFrame === 'desktop' && 'mt-8',
            showDeviceFrame &&
              breakpoint.deviceFrame === 'tablet' &&
              'rounded-lg',
            !showDeviceFrame && 'rounded-lg',
            isLoading && 'opacity-0'
          )}
          title="Component Preview"
          sandbox="allow-scripts allow-same-origin"
          style={{
            minHeight: isFullWidth ? '100%' : '400px',
          }}
        />

        {/* Breakpoint Label */}
        <div className="absolute -top-8 left-0 flex items-center space-x-2 text-xs text-muted-foreground">
          <span className="font-medium">{breakpoint.name}</span>
          {!isFullWidth && (
            <span className="text-muted-foreground/70">
              {breakpoint.width}×{breakpoint.height || 'auto'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// Device frame styles
const deviceFrameStyles = `
  .device-frame {
    position: relative;
  }

  .device-frame--mobile {
    border-radius: 12px;
    border: 3px solid #1f1f1f;
    background: #1f1f1f;
    padding: 6px 3px 3px 3px;
  }

  .device-frame--tablet {
    border-radius: 16px;
    border: 4px solid #2d2d2d;
    background: #2d2d2d;
    padding: 8px;
  }

  .device-frame--desktop {
    border-radius: 8px;
    border: 2px solid #e5e7eb;
    background: #f9fafb;
    padding: 0;
    overflow: hidden;
  }
`;

// Inject styles if not already present
if (
  typeof document !== 'undefined' &&
  !document.getElementById('device-frame-styles')
) {
  const styleElement = document.createElement('style');
  styleElement.id = 'device-frame-styles';
  styleElement.textContent = deviceFrameStyles;
  document.head.appendChild(styleElement);
}
