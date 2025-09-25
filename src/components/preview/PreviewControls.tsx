'use client';

import React, { useState, useCallback } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  RefreshCw,
  Download,
  Share2,
  Grid3X3,
  Eye,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PreviewControlsProps {
  zoom: number;
  onZoomChange: (zoom: number) => void;
  onRefresh: () => void;
  onFullscreen?: () => void;
  isFullscreen?: boolean;
  onDownload?: () => void;
  onShare?: () => void;
  className?: string;
  showDeviceFrame?: boolean;
  onDeviceFrameToggle?: (show: boolean) => void;
  showGrid?: boolean;
  onGridToggle?: (show: boolean) => void;
}

const ZOOM_LEVELS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];
const DEFAULT_ZOOM = 1;

export function PreviewControls({
  zoom,
  onZoomChange,
  onRefresh,
  onFullscreen,
  isFullscreen = false,
  onDownload,
  onShare,
  className,
  showDeviceFrame = true,
  onDeviceFrameToggle,
  showGrid = false,
  onGridToggle,
}: PreviewControlsProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleZoomIn = useCallback(() => {
    const currentIndex = ZOOM_LEVELS.findIndex(level => level >= zoom);
    const nextIndex = Math.min(currentIndex + 1, ZOOM_LEVELS.length - 1);
    onZoomChange(ZOOM_LEVELS[nextIndex]);
  }, [zoom, onZoomChange]);

  const handleZoomOut = useCallback(() => {
    const currentIndex = ZOOM_LEVELS.findIndex(level => level >= zoom);
    const prevIndex = Math.max(currentIndex - 1, 0);
    onZoomChange(ZOOM_LEVELS[prevIndex]);
  }, [zoom, onZoomChange]);

  const handleZoomReset = useCallback(() => {
    onZoomChange(DEFAULT_ZOOM);
  }, [onZoomChange]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
      // Add a small delay for visual feedback
      setTimeout(() => setIsRefreshing(false), 300);
    } catch (error) {
      console.error('Error refreshing preview:', error);
      setIsRefreshing(false);
    }
  }, [onRefresh]);

  const canZoomIn = zoom < ZOOM_LEVELS[ZOOM_LEVELS.length - 1];
  const canZoomOut = zoom > ZOOM_LEVELS[0];
  const isDefaultZoom = Math.abs(zoom - DEFAULT_ZOOM) < 0.01;

  return (
    <div
      className={cn('preview-controls flex items-center space-x-1', className)}
    >
      {/* Zoom Controls */}
      <div className="flex items-center rounded-lg border border-border bg-background p-1">
        <button
          onClick={handleZoomOut}
          disabled={!canZoomOut}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-md transition-colors',
            canZoomOut
              ? 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              : 'cursor-not-allowed text-muted-foreground/50'
          )}
          title="Zoom out"
        >
          <ZoomOut className="h-4 w-4" />
        </button>

        <div className="flex items-center px-2">
          <span className="min-w-[3rem] text-center text-xs font-medium text-foreground">
            {Math.round(zoom * 100)}%
          </span>
        </div>

        <button
          onClick={handleZoomIn}
          disabled={!canZoomIn}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-md transition-colors',
            canZoomIn
              ? 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              : 'cursor-not-allowed text-muted-foreground/50'
          )}
          title="Zoom in"
        >
          <ZoomIn className="h-4 w-4" />
        </button>

        <div className="mx-1 h-4 w-px bg-border" />

        <button
          onClick={handleZoomReset}
          disabled={isDefaultZoom}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-md transition-colors',
            !isDefaultZoom
              ? 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              : 'cursor-not-allowed text-muted-foreground/50'
          )}
          title="Reset zoom to 100%"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* View Controls */}
      <div className="flex items-center rounded-lg border border-border bg-background p-1">
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-md transition-colors',
            'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
            isRefreshing && 'cursor-not-allowed'
          )}
          title="Refresh preview"
        >
          <RefreshCw
            className={cn('h-4 w-4', isRefreshing && 'animate-spin')}
          />
        </button>

        {onDeviceFrameToggle && (
          <button
            onClick={() => onDeviceFrameToggle(!showDeviceFrame)}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-md transition-colors',
              showDeviceFrame
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )}
            title={showDeviceFrame ? 'Hide device frame' : 'Show device frame'}
          >
            <Eye className="h-4 w-4" />
          </button>
        )}

        {onGridToggle && (
          <button
            onClick={() => onGridToggle(!showGrid)}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-md transition-colors',
              showGrid
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )}
            title={showGrid ? 'Hide grid' : 'Show grid'}
          >
            <Grid3X3 className="h-4 w-4" />
          </button>
        )}

        {onFullscreen && (
          <button
            onClick={onFullscreen}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {/* Action Controls */}
      {(onDownload || onShare) && (
        <div className="flex items-center rounded-lg border border-border bg-background p-1">
          {onShare && (
            <button
              onClick={onShare}
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              title="Share preview"
            >
              <Share2 className="h-4 w-4" />
            </button>
          )}

          {onDownload && (
            <button
              onClick={onDownload}
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              title="Download preview"
            >
              <Download className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Compact version for mobile or constrained spaces
interface CompactPreviewControlsProps {
  zoom: number;
  onZoomChange: (zoom: number) => void;
  onRefresh: () => void;
  onFullscreen?: () => void;
  isFullscreen?: boolean;
  className?: string;
}

export function CompactPreviewControls({
  zoom,
  onZoomChange,
  onRefresh,
  onFullscreen,
  isFullscreen = false,
  className,
}: CompactPreviewControlsProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleZoomToggle = useCallback(() => {
    const nextZoom = zoom >= 1 ? 0.75 : 1;
    onZoomChange(nextZoom);
  }, [zoom, onZoomChange]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
      setTimeout(() => setIsRefreshing(false), 300);
    } catch (error) {
      console.error('Error refreshing preview:', error);
      setIsRefreshing(false);
    }
  }, [onRefresh]);

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <button
        onClick={handleZoomToggle}
        className="flex items-center space-x-1 rounded-md bg-accent px-2 py-1 text-xs text-accent-foreground transition-colors hover:bg-accent/80"
        title={`Current zoom: ${Math.round(zoom * 100)}%`}
      >
        <ZoomIn className="h-3 w-3" />
        <span>{Math.round(zoom * 100)}%</span>
      </button>

      <button
        onClick={handleRefresh}
        disabled={isRefreshing}
        className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-accent-foreground transition-colors hover:bg-accent/80 disabled:cursor-not-allowed"
        title="Refresh preview"
      >
        <RefreshCw className={cn('h-3 w-3', isRefreshing && 'animate-spin')} />
      </button>

      {onFullscreen && (
        <button
          onClick={onFullscreen}
          className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-accent-foreground transition-colors hover:bg-accent/80"
          title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {isFullscreen ? (
            <Minimize2 className="h-3 w-3" />
          ) : (
            <Maximize2 className="h-3 w-3" />
          )}
        </button>
      )}
    </div>
  );
}

// Hook for managing preview controls state
export function usePreviewControls(initialZoom = 1) {
  const [zoom, setZoom] = useState(initialZoom);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showDeviceFrame, setShowDeviceFrame] = useState(true);
  const [showGrid, setShowGrid] = useState(false);

  const handleZoomChange = useCallback((newZoom: number) => {
    setZoom(
      Math.max(
        ZOOM_LEVELS[0],
        Math.min(newZoom, ZOOM_LEVELS[ZOOM_LEVELS.length - 1])
      )
    );
  }, []);

  const handleRefresh = useCallback(() => {
    // This should be implemented by the parent component
    return Promise.resolve();
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  const toggleDeviceFrame = useCallback((show: boolean) => {
    setShowDeviceFrame(show);
  }, []);

  const toggleGrid = useCallback((show: boolean) => {
    setShowGrid(show);
  }, []);

  return {
    zoom,
    isFullscreen,
    showDeviceFrame,
    showGrid,
    handleZoomChange,
    handleRefresh,
    toggleFullscreen,
    toggleDeviceFrame,
    toggleGrid,
  };
}
