'use client';

import React, { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Component } from '@/types';
import { ComponentRenderer, COMPONENT_STATES } from './ComponentRenderer';
import { PropValue } from './PropsPanel';
import {
  Grid3X3,
  List,
  Play,
  Pause,
  RotateCcw,
  Eye,
  EyeOff,
  Download,
} from 'lucide-react';

export interface ComponentStatesProps {
  component: Component;
  props: PropValue;
  framework?: 'react' | 'vue' | 'angular' | 'html';
  theme?: 'light' | 'dark';
  className?: string;
  showStateLabels?: boolean;
  autoPlay?: boolean;
  onStateChange?: (state: string) => void;
}

type ViewLayout = 'grid' | 'list';

interface StateRenderProps {
  state: (typeof COMPONENT_STATES)[0];
  component: Component;
  props: PropValue;
  framework: 'react' | 'vue' | 'angular' | 'html';
  theme: 'light' | 'dark';
  showLabels: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

function StateRenderer({
  state,
  component,
  props,
  framework,
  theme,
  showLabels,
  isActive,
  onClick,
}: StateRenderProps) {
  const [renderError, setRenderError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div
      className={cn(
        'state-renderer group relative overflow-hidden rounded-lg border border-border bg-card transition-all duration-200 hover:shadow-md',
        isActive && 'ring-2 ring-primary ring-offset-2',
        onClick && 'cursor-pointer'
      )}
      onClick={onClick}
    >
      {/* State Label */}
      {showLabels && (
        <div className="absolute left-2 top-2 z-10 rounded-md bg-background/90 px-2 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm">
          {state.name}
        </div>
      )}

      {/* Error Indicator */}
      {renderError && (
        <div className="absolute right-2 top-2 z-10 rounded-full bg-destructive p-1">
          <div className="h-2 w-2 rounded-full bg-white"></div>
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent text-primary"></div>
        </div>
      )}

      {/* Component Renderer */}
      <div className="relative aspect-video">
        <ComponentRenderer
          componentName={component.name}
          componentCode={component.code}
          props={props}
          activeState={state.id}
          framework={framework}
          theme={theme}
          onRenderError={error => setRenderError(error.message)}
          onRenderSuccess={() => {
            setRenderError(null);
            setIsLoading(false);
          }}
          className="h-full w-full"
        />
      </div>

      {/* Hover Overlay */}
      {onClick && (
        <div className="absolute inset-0 bg-primary/0 transition-colors group-hover:bg-primary/5" />
      )}

      {/* State Description */}
      {showLabels && getStateDescription(state.id) && (
        <div className="border-t border-border bg-muted/30 p-2">
          <p className="text-xs text-muted-foreground">
            {getStateDescription(state.id)}
          </p>
        </div>
      )}
    </div>
  );
}

function getStateDescription(stateId: string): string {
  const descriptions: Record<string, string> = {
    default: 'Default appearance and behavior',
    hover: 'Appears when user hovers over the component',
    focus: 'Visible when component receives keyboard focus',
    active: 'Shown when component is being pressed or activated',
    disabled: 'Non-interactive state, typically with reduced opacity',
    loading: 'Indicates component is processing or fetching data',
    error: 'Displays when component encounters an error state',
  };
  return descriptions[stateId] || '';
}

export function ComponentStates({
  component,
  props,
  framework = 'react',
  theme = 'light',
  className,
  showStateLabels = true,
  autoPlay = false,
  onStateChange,
}: ComponentStatesProps) {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [viewLayout, setViewLayout] = useState<ViewLayout>('grid');
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentAutoState, setCurrentAutoState] = useState(0);
  const [showOnlyInteractive, setShowOnlyInteractive] = useState(false);

  // Filter states based on preferences
  const displayStates = useMemo(() => {
    if (showOnlyInteractive) {
      return COMPONENT_STATES.filter(state =>
        ['default', 'hover', 'focus', 'active'].includes(state.id)
      );
    }
    return COMPONENT_STATES;
  }, [showOnlyInteractive]);

  // Auto-play functionality
  React.useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentAutoState(prev => {
        const nextState = (prev + 1) % displayStates.length;
        onStateChange?.(displayStates[nextState].id);
        return nextState;
      });
    }, 2000); // Change state every 2 seconds

    return () => clearInterval(interval);
  }, [isPlaying, displayStates, onStateChange]);

  const handleStateClick = (stateId: string) => {
    setSelectedState(selectedState === stateId ? null : stateId);
    onStateChange?.(stateId);
    if (isPlaying) {
      setIsPlaying(false);
    }
  };

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setCurrentAutoState(0);
      onStateChange?.(displayStates[0].id);
    }
  };

  const handleReset = () => {
    setSelectedState(null);
    setIsPlaying(false);
    setCurrentAutoState(0);
    onStateChange?.('default');
  };

  const exportStates = async () => {
    // Logic to export all state screenshots
    console.log('Exporting component states...');
  };

  return (
    <div className={cn('component-states space-y-4', className)}>
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold">Component States</h2>
          <span className="text-sm text-muted-foreground">
            {displayStates.length} states
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Interactive States Filter */}
          <button
            onClick={() => setShowOnlyInteractive(!showOnlyInteractive)}
            className={cn(
              'rounded-md px-3 py-1 text-xs font-medium transition-colors',
              showOnlyInteractive
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            )}
          >
            {showOnlyInteractive ? (
              <Eye className="mr-1 h-3 w-3" />
            ) : (
              <EyeOff className="mr-1 h-3 w-3" />
            )}
            Interactive Only
          </button>

          {/* View Layout Toggle */}
          <div className="flex items-center rounded-md border border-border">
            <button
              onClick={() => setViewLayout('grid')}
              className={cn(
                'rounded-l-md px-2 py-1 transition-colors',
                viewLayout === 'grid'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewLayout('list')}
              className={cn(
                'rounded-r-md px-2 py-1 transition-colors',
                viewLayout === 'list'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          {/* Auto-play Control */}
          <button
            onClick={handlePlayToggle}
            className="rounded-md border border-border bg-background p-2 text-muted-foreground hover:text-foreground"
            title={isPlaying ? 'Pause auto-play' : 'Start auto-play'}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </button>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="rounded-md border border-border bg-background p-2 text-muted-foreground hover:text-foreground"
            title="Reset to default state"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          {/* Export */}
          <button
            onClick={exportStates}
            className="rounded-md border border-border bg-background p-2 text-muted-foreground hover:text-foreground"
            title="Export all states"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Auto-play Progress */}
      {isPlaying && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-primary">
              Auto-playing: {displayStates[currentAutoState]?.name}
            </span>
            <div className="flex items-center space-x-2">
              <div className="h-1 w-24 overflow-hidden rounded-full bg-secondary">
                <div
                  className="duration-2000 h-full bg-primary transition-all ease-linear"
                  style={{
                    width: `${((currentAutoState + 1) / displayStates.length) * 100}%`,
                  }}
                />
              </div>
              <span className="text-xs text-muted-foreground">
                {currentAutoState + 1}/{displayStates.length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* States Grid/List */}
      <div
        className={cn(
          'states-container',
          viewLayout === 'grid'
            ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'space-y-4'
        )}
      >
        {displayStates.map(state => (
          <StateRenderer
            key={state.id}
            state={state}
            component={component}
            props={props}
            framework={framework}
            theme={theme}
            showLabels={showStateLabels}
            isActive={
              selectedState === state.id ||
              (isPlaying && displayStates[currentAutoState]?.id === state.id)
            }
            onClick={() => handleStateClick(state.id)}
          />
        ))}
      </div>

      {/* Selected State Details */}
      {selectedState && (
        <div className="selected-state-details rounded-lg border border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-medium">
              {COMPONENT_STATES.find(s => s.id === selectedState)?.name} State
            </h3>
            <button
              onClick={() => setSelectedState(null)}
              className="text-muted-foreground hover:text-foreground"
            >
              ×
            </button>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">
              {getStateDescription(selectedState)}
            </p>
            {COMPONENT_STATES.find(s => s.id === selectedState)?.className && (
              <div>
                <span className="font-medium">CSS Class: </span>
                <code className="rounded bg-muted px-1 py-0.5 text-xs">
                  {
                    COMPONENT_STATES.find(s => s.id === selectedState)
                      ?.className
                  }
                </code>
              </div>
            )}
            {COMPONENT_STATES.find(s => s.id === selectedState)
              ?.pseudoClass && (
              <div>
                <span className="font-medium">Pseudo-class: </span>
                <code className="rounded bg-muted px-1 py-0.5 text-xs">
                  {
                    COMPONENT_STATES.find(s => s.id === selectedState)
                      ?.pseudoClass
                  }
                </code>
              </div>
            )}
          </div>
        </div>
      )}

      {/* State Comparison Mode */}
      {selectedState && (
        <div className="comparison-mode">
          <h3 className="mb-3 font-medium">Compare with Default</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <StateRenderer
              state={COMPONENT_STATES[0]} // Default state
              component={component}
              props={props}
              framework={framework}
              theme={theme}
              showLabels={true}
            />
            <StateRenderer
              state={COMPONENT_STATES.find(s => s.id === selectedState)!}
              component={component}
              props={props}
              framework={framework}
              theme={theme}
              showLabels={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}
