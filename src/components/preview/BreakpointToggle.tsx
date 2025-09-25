'use client';

import React from 'react';
import { Monitor, Tablet, Smartphone, Maximize } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BREAKPOINTS } from './PreviewFrame';

interface BreakpointToggleProps {
  activeBreakpoint: string;
  onBreakpointChange: (breakpointId: string) => void;
  className?: string;
  showLabels?: boolean;
  compact?: boolean;
}

const BREAKPOINT_ICONS = {
  mobile: Smartphone,
  tablet: Tablet,
  desktop: Monitor,
  full: Maximize,
};

export function BreakpointToggle({
  activeBreakpoint,
  onBreakpointChange,
  className,
  showLabels = true,
  compact = false,
}: BreakpointToggleProps) {
  return (
    <div
      className={cn(
        'breakpoint-toggle flex items-center rounded-lg border border-border bg-background',
        compact ? 'p-1' : 'p-1.5',
        className
      )}
      role="tablist"
      aria-label="Device breakpoints"
    >
      {BREAKPOINTS.map(breakpoint => {
        const Icon =
          BREAKPOINT_ICONS[breakpoint.id as keyof typeof BREAKPOINT_ICONS];
        const isActive = activeBreakpoint === breakpoint.id;

        return (
          <button
            key={breakpoint.id}
            onClick={() => onBreakpointChange(breakpoint.id)}
            className={cn(
              'breakpoint-button group relative flex items-center justify-center transition-all duration-200 ease-out',
              compact ? 'h-8 px-2' : 'h-9 px-3',
              showLabels && !compact && 'min-w-[80px]',
              'rounded-md border border-transparent',
              isActive
                ? 'border-qgba-gold/20 bg-qgba-gold text-white shadow-sm'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              // Smooth transition for active state
              isActive && 'scale-[1.02]',
              // Add subtle animation
              'transform-gpu'
            )}
            role="tab"
            aria-selected={isActive}
            aria-label={`Switch to ${breakpoint.name} view (${breakpoint.width === 0 ? 'full width' : `${breakpoint.width}px`})`}
            title={`${breakpoint.name}${breakpoint.width > 0 ? ` (${breakpoint.width}px)` : ''}`}
          >
            {/* Icon */}
            <Icon
              className={cn(
                'transition-transform duration-200',
                compact ? 'h-3.5 w-3.5' : 'h-4 w-4',
                showLabels && !compact && 'mr-1.5',
                isActive && 'scale-110'
              )}
            />

            {/* Label */}
            {showLabels && !compact && (
              <span className="text-xs font-medium">{breakpoint.name}</span>
            )}

            {/* Active indicator dot */}
            {isActive && (
              <div className="absolute -right-1 -top-1 h-2 w-2 animate-pulse rounded-full bg-white shadow-sm" />
            )}

            {/* Width indicator on hover */}
            {!compact && breakpoint.width > 0 && (
              <div
                className={cn(
                  'pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border bg-popover px-2 py-1 text-xs text-popover-foreground opacity-0 shadow-md transition-opacity duration-200',
                  'group-hover:opacity-100',
                  // Delay for smooth interaction
                  'delay-300 group-hover:delay-0'
                )}
              >
                {breakpoint.width}×{breakpoint.height || 'auto'}px
                <div className="absolute -top-1 left-1/2 h-0 w-0 -translate-x-1/2 border-b-2 border-l-2 border-r-2 border-transparent border-b-popover" />
              </div>
            )}
          </button>
        );
      })}

      {/* Visual separator line */}
      <div className="absolute inset-y-2 left-0 w-px bg-gradient-to-b from-transparent via-border to-transparent opacity-50" />
    </div>
  );
}

// Responsive breakpoint toggle for mobile layouts
interface ResponsiveBreakpointToggleProps extends BreakpointToggleProps {
  isMobile?: boolean;
}

export function ResponsiveBreakpointToggle({
  isMobile = false,
  ...props
}: ResponsiveBreakpointToggleProps) {
  if (isMobile) {
    return (
      <div className="flex flex-wrap gap-1 p-1">
        {BREAKPOINTS.map(breakpoint => {
          const Icon =
            BREAKPOINT_ICONS[breakpoint.id as keyof typeof BREAKPOINT_ICONS];
          const isActive = props.activeBreakpoint === breakpoint.id;

          return (
            <button
              key={breakpoint.id}
              onClick={() => props.onBreakpointChange(breakpoint.id)}
              className={cn(
                'flex flex-1 flex-col items-center justify-center rounded-md border p-2 transition-all',
                isActive
                  ? 'border-qgba-gold bg-qgba-gold/10 text-qgba-gold'
                  : 'border-border text-muted-foreground hover:bg-accent'
              )}
            >
              <Icon className="mb-1 h-4 w-4" />
              <span className="text-xs font-medium">{breakpoint.name}</span>
              {breakpoint.width > 0 && (
                <span className="text-xs text-muted-foreground/70">
                  {breakpoint.width}px
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return <BreakpointToggle {...props} />;
}

// Hook for managing breakpoint state
export function useBreakpointToggle(initialBreakpoint = 'desktop') {
  const [activeBreakpoint, setActiveBreakpoint] =
    React.useState(initialBreakpoint);

  const handleBreakpointChange = React.useCallback((breakpointId: string) => {
    setActiveBreakpoint(breakpointId);
  }, []);

  const currentBreakpoint = React.useMemo(
    () => BREAKPOINTS.find(bp => bp.id === activeBreakpoint) || BREAKPOINTS[0],
    [activeBreakpoint]
  );

  return {
    activeBreakpoint,
    currentBreakpoint,
    handleBreakpointChange,
    setActiveBreakpoint,
  };
}
