'use client';

import React, { Suspense, ComponentType } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface LazyWrapperProps {
  fallback?: React.ReactNode;
  error?: React.ReactNode;
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('LazyWrapper Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-6 text-center">
          <p className="text-destructive">Failed to load component</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-2 text-sm text-primary hover:underline"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export function LazyWrapper({
  fallback = <LoadingSpinner />,
  error,
  children
}: LazyWrapperProps) {
  return (
    <ErrorBoundary fallback={error}>
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}

// Higher-order component to wrap lazy components
export function withLazyLoading<P extends object>(
  Component: ComponentType<P>,
  loadingComponent?: React.ComponentType,
  errorComponent?: React.ComponentType
) {
  return function LazyComponent(props: P) {
    const LoadingComponent = loadingComponent || LoadingSpinner;

    return (
      <LazyWrapper
        fallback={<LoadingComponent />}
        error={errorComponent ? <errorComponent /> : undefined}
      >
        <Component {...props} />
      </LazyWrapper>
    );
  };
}