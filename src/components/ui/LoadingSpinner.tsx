'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

export function LoadingSpinner({
  size = 'md',
  className,
  text = 'Loading...'
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className={cn('flex flex-col items-center justify-center space-y-2', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-2 border-muted border-t-primary',
          sizeClasses[size]
        )}
        role="status"
        aria-label={text}
      />
      {text && (
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {text}
        </p>
      )}
    </div>
  );
}

export function ComponentLoadingSkeleton() {
  return (
    <div className="space-y-4 p-6" aria-label="Loading component">
      <div className="h-6 bg-muted rounded animate-pulse" />
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
        <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
      </div>
      <div className="h-32 bg-muted rounded animate-pulse" />
    </div>
  );
}

export function GridLoadingSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Loading grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="border rounded-lg p-4 space-y-3">
          <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
          <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
          <div className="h-24 bg-muted rounded animate-pulse" />
          <div className="flex space-x-2">
            <div className="h-6 bg-muted rounded animate-pulse flex-1" />
            <div className="h-6 bg-muted rounded animate-pulse w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}