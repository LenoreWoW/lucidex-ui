'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { PreviewFrame } from './PreviewFrame';
import {
  BreakpointToggle,
  ResponsiveBreakpointToggle,
  useBreakpointToggle,
} from './BreakpointToggle';
import {
  PreviewControls,
  CompactPreviewControls,
  usePreviewControls,
} from './PreviewControls';

interface PreviewSystemProps {
  content: string;
  title?: string;
  description?: string;
  framework?: 'react' | 'vue' | 'angular' | 'html';
  className?: string;
  onContentChange?: (content: string) => void;
  showHeader?: boolean;
  compact?: boolean;
}

export function PreviewSystem({
  content,
  title,
  description,
  framework = 'react',
  className,
  showHeader = true,
  compact = false,
}: PreviewSystemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Use custom hooks for state management
  const { activeBreakpoint, currentBreakpoint, handleBreakpointChange } =
    useBreakpointToggle('desktop');

  const {
    zoom,
    isFullscreen,
    showDeviceFrame,
    showGrid,
    handleZoomChange,
    handleRefresh,
    toggleFullscreen,
    toggleDeviceFrame,
    toggleGrid,
  } = usePreviewControls(1);

  // Enhanced refresh function
  const enhancedRefresh = useCallback(async () => {
    setRefreshKey(prev => prev + 1);
    await handleRefresh();
  }, [handleRefresh]);

  // Responsive detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey) {
        switch (event.key) {
          case '1':
            event.preventDefault();
            handleBreakpointChange('mobile');
            break;
          case '2':
            event.preventDefault();
            handleBreakpointChange('tablet');
            break;
          case '3':
            event.preventDefault();
            handleBreakpointChange('desktop');
            break;
          case '0':
            event.preventDefault();
            handleBreakpointChange('full');
            break;
          case 'r':
            event.preventDefault();
            enhancedRefresh();
            break;
          case 'f':
            event.preventDefault();
            toggleFullscreen();
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleBreakpointChange, enhancedRefresh, toggleFullscreen]);

  // Download functionality
  const handleDownload = useCallback(() => {
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title || 'component'}-preview.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [content, title]);

  // Share functionality
  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${title} - Component Preview`,
          text: description || 'Component preview',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        // You could add a toast notification here
        console.log('URL copied to clipboard');
      } catch (error) {
        console.error('Error copying to clipboard:', error);
      }
    }
  }, [title, description]);

  const fullscreenClass = isFullscreen
    ? 'fixed inset-0 z-50 bg-background'
    : '';

  return (
    <div
      ref={containerRef}
      className={cn(
        'preview-system flex h-full flex-col transition-all duration-300',
        fullscreenClass,
        className
      )}
    >
      {/* Header */}
      {showHeader && (
        <div className="preview-header flex flex-col space-y-3 border-b border-border bg-background/95 p-4 backdrop-blur-sm">
          {/* Title and Description */}
          {(title || description) && (
            <div className="space-y-1">
              {title && (
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {title}
                  </h3>
                  <span className="rounded-full border border-qgba-gold/20 bg-qgba-gold/10 px-2 py-0.5 text-xs capitalize text-qgba-gold">
                    {framework}
                  </span>
                </div>
              )}
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
            </div>
          )}

          {/* Controls Row */}
          <div className="flex flex-col space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            {/* Breakpoint Toggle */}
            <div className="flex-1">
              {isMobile ? (
                <ResponsiveBreakpointToggle
                  activeBreakpoint={activeBreakpoint}
                  onBreakpointChange={handleBreakpointChange}
                  isMobile={true}
                />
              ) : (
                <BreakpointToggle
                  activeBreakpoint={activeBreakpoint}
                  onBreakpointChange={handleBreakpointChange}
                  compact={compact}
                />
              )}
            </div>

            {/* Preview Controls */}
            <div className="flex items-center justify-end">
              {compact || isMobile ? (
                <CompactPreviewControls
                  zoom={zoom}
                  onZoomChange={handleZoomChange}
                  onRefresh={enhancedRefresh}
                  onFullscreen={toggleFullscreen}
                  isFullscreen={isFullscreen}
                />
              ) : (
                <PreviewControls
                  zoom={zoom}
                  onZoomChange={handleZoomChange}
                  onRefresh={enhancedRefresh}
                  onFullscreen={toggleFullscreen}
                  isFullscreen={isFullscreen}
                  onDownload={handleDownload}
                  onShare={handleShare}
                  showDeviceFrame={showDeviceFrame}
                  onDeviceFrameToggle={toggleDeviceFrame}
                  showGrid={showGrid}
                  onGridToggle={toggleGrid}
                />
              )}
            </div>
          </div>

          {/* Keyboard Shortcuts Hint */}
          {!compact && !isMobile && (
            <div className="text-xs text-muted-foreground/70">
              <span className="hidden lg:inline">
                Shortcuts: ⌘1-3 (breakpoints), ⌘0 (full), ⌘R (refresh), ⌘F
                (fullscreen)
              </span>
            </div>
          )}
        </div>
      )}

      {/* Preview Area */}
      <div className="preview-area relative flex-1 overflow-hidden">
        {/* Grid Background */}
        {showGrid && (
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
                linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
            }}
          />
        )}

        {/* Main Preview Frame */}
        <div className="h-full overflow-auto p-4">
          <PreviewFrame
            key={refreshKey}
            content={content}
            activeBreakpoint={activeBreakpoint}
            zoom={zoom}
            showDeviceFrame={showDeviceFrame}
            onLoad={() => {
              // Handle preview load completion
              console.log('Preview loaded successfully');
            }}
            className="mx-auto"
          />
        </div>

        {/* Breakpoint Indicator (Mobile) */}
        {isMobile && activeBreakpoint !== 'full' && (
          <div className="absolute bottom-4 left-4 rounded-md border bg-background/90 px-2 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm">
            {currentBreakpoint.name} • {currentBreakpoint.width}px
          </div>
        )}

        {/* Loading State */}
        {!content && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <div className="space-y-2 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-qgba-gold border-t-transparent"></div>
              <p className="text-sm text-muted-foreground">
                Loading preview...
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar (optional) */}
      {!compact && (
        <div className="preview-status flex items-center justify-between border-t border-border bg-background/95 px-4 py-2 text-xs text-muted-foreground backdrop-blur-sm">
          <div className="flex items-center space-x-4">
            <span>Framework: {framework}</span>
            <span>•</span>
            <span>{currentBreakpoint.name}</span>
            {currentBreakpoint.width > 0 && (
              <>
                <span>•</span>
                <span>
                  {currentBreakpoint.width}×{currentBreakpoint.height || 'auto'}
                  px
                </span>
              </>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span>Zoom: {Math.round(zoom * 100)}%</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Enhanced Preview System with more features
interface EnhancedPreviewSystemProps extends PreviewSystemProps {
  presets?: Array<{
    id: string;
    name: string;
    content: string;
    description?: string;
  }>;
  onPresetChange?: (presetId: string) => void;
}

export function EnhancedPreviewSystem({
  presets = [],
  onPresetChange,
  ...props
}: EnhancedPreviewSystemProps) {
  const [selectedPreset, setSelectedPreset] = useState<string>('');

  const handlePresetChange = useCallback(
    (presetId: string) => {
      setSelectedPreset(presetId);
      onPresetChange?.(presetId);
    },
    [onPresetChange]
  );

  return (
    <div className="enhanced-preview-system h-full">
      {/* Preset Selector */}
      {presets.length > 0 && (
        <div className="preset-selector border-b border-border bg-background p-3">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-foreground">
              Preset:
            </label>
            <select
              value={selectedPreset}
              onChange={e => handlePresetChange(e.target.value)}
              className="rounded-md border border-border bg-background px-2 py-1 text-sm text-foreground focus:border-qgba-gold focus:outline-none focus:ring-1 focus:ring-qgba-gold/20"
            >
              <option value="">Select a preset...</option>
              {presets.map(preset => (
                <option key={preset.id} value={preset.id}>
                  {preset.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Main Preview System */}
      <div className="flex-1">
        <PreviewSystem {...props} />
      </div>
    </div>
  );
}
