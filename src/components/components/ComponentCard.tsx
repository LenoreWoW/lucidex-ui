'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Eye,
  Code2,
  Copy,
  Star,
  CheckCircle,
  AlertTriangle,
  Clock,
  Palette,
  Accessibility,
  Shield,
  Smartphone,
} from 'lucide-react';
import { Component, ComponentStatus } from '@/types/components';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

export interface ComponentCardProps {
  component: Component;
  viewMode: 'grid' | 'list' | 'detailed';
  searchScore?: number;
  matchedFields?: string[];
  highlights?: { [field: string]: string };
}

export function ComponentCard({
  component,
  viewMode,
  searchScore,
  matchedFields,
  highlights: _highlights,
}: ComponentCardProps) {
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { copyToClipboard } = useCopyToClipboard();

  const getStatusIcon = (status: ComponentStatus) => {
    switch (status) {
      case 'stable':
        return <CheckCircle className="h-3 w-3 text-green-500" />;
      case 'beta':
        return <AlertTriangle className="h-3 w-3 text-yellow-500" />;
      case 'experimental':
        return <Clock className="h-3 w-3 text-blue-500" />;
      case 'deprecated':
        return <AlertTriangle className="h-3 w-3 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: ComponentStatus) => {
    switch (status) {
      case 'stable':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'beta':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'experimental':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'deprecated':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const handleQuickActions = async (
    action: 'preview' | 'code' | 'copy',
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();

    switch (action) {
      case 'preview':
        router.push(`/components/${component.id}`);
        break;
      case 'code':
        router.push(`/components/${component.id}?tab=code`);
        break;
      case 'copy':
        // Copy the main React implementation
        const reactImpl = component.implementations.find(
          impl => impl.framework === 'react'
        );
        if (reactImpl) {
          await copyToClipboard(
            reactImpl.code,
            'Component code copied to clipboard!'
          );
        }
        break;
    }
  };

  const frameworkIcons = {
    react: '⚛️',
    nextjs: '▲',
    blazor: '🔥',
    html: '🌐',
    vue: '💚',
    angular: '🅰️',
  };

  if (viewMode === 'list') {
    return (
      <Link
        href={`/components/${component.id}`}
        className="group flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-accent"
      >
        {/* Thumbnail */}
        <div className="h-16 w-16 flex-none overflow-hidden rounded-md bg-muted">
          {component.thumbnail && !imageError ? (
            <img
              src={component.thumbnail}
              alt={`${component.displayName} preview`}
              className={`h-full w-full object-cover transition-opacity ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              <Palette className="h-6 w-6" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <h3 className="truncate font-semibold">{component.displayName}</h3>
            <div
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${getStatusColor(component.status)}`}
            >
              {getStatusIcon(component.status)}
              {component.status}
            </div>
          </div>
          <p className="line-clamp-1 text-sm text-muted-foreground">
            {component.description}
          </p>
          <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="capitalize">
              {component.category.replace('-', ' ')}
            </span>
            <span>{component.implementations.length} frameworks</span>
            {component.responsive && (
              <span className="flex items-center gap-1">
                <Smartphone className="h-3 w-3" />
                Responsive
              </span>
            )}
            {component.accessibility.screenReaderSupport && (
              <span className="flex items-center gap-1">
                <Accessibility className="h-3 w-3" />
                Accessible
              </span>
            )}
          </div>
        </div>

        {/* Framework Icons */}
        <div className="flex flex-none items-center gap-1">
          {component.implementations.slice(0, 4).map(impl => (
            <span
              key={impl.framework}
              className="text-lg"
              title={impl.framework}
            >
              {frameworkIcons[impl.framework] || '📦'}
            </span>
          ))}
          {component.implementations.length > 4 && (
            <span className="text-xs text-muted-foreground">
              +{component.implementations.length - 4}
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex-none opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex items-center gap-1">
            <button
              onClick={e => handleQuickActions('preview', e)}
              className="rounded p-1.5 hover:bg-background"
              title="Preview"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              onClick={e => handleQuickActions('code', e)}
              className="rounded p-1.5 hover:bg-background"
              title="View Code"
            >
              <Code2 className="h-4 w-4" />
            </button>
            <button
              onClick={e => handleQuickActions('copy', e)}
              className="rounded p-1.5 hover:bg-background"
              title="Copy Code"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Link>
    );
  }

  if (viewMode === 'detailed') {
    return (
      <div className="overflow-hidden rounded-lg border border-border transition-shadow hover:shadow-lg">
        <Link href={`/components/${component.id}`}>
          {/* Thumbnail */}
          <div className="relative aspect-video overflow-hidden bg-muted">
            {component.thumbnail && !imageError ? (
              <img
                src={component.thumbnail}
                alt={`${component.displayName} preview`}
                className={`h-full w-full object-cover transition-opacity ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                <Palette className="h-12 w-12" />
              </div>
            )}
            {searchScore && searchScore > 0 && (
              <div className="absolute right-2 top-2 rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground">
                {Math.round(searchScore * 100)}% match
              </div>
            )}
          </div>
        </Link>

        {/* Content */}
        <div className="p-4">
          <div className="mb-3 flex items-start justify-between">
            <div className="flex-1">
              <Link href={`/components/${component.id}`}>
                <h3 className="mb-1 font-semibold transition-colors hover:text-primary">
                  {component.displayName}
                </h3>
              </Link>
              <div className="mb-2 flex items-center gap-2">
                <div
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${getStatusColor(component.status)}`}
                >
                  {getStatusIcon(component.status)}
                  {component.status}
                </div>
                <span className="text-xs capitalize text-muted-foreground">
                  {component.category.replace('-', ' ')}
                </span>
              </div>
              <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                {component.description}
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="mb-3 flex flex-wrap gap-1">
            {component.responsive && (
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                <Smartphone className="h-3 w-3" />
                Responsive
              </span>
            )}
            {component.accessibility.screenReaderSupport && (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs text-green-800 dark:bg-green-900/20 dark:text-green-400">
                <Accessibility className="h-3 w-3" />
                Accessible
              </span>
            )}
            {component.qatarGBACompliance.brandColors && (
              <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
                <Shield className="h-3 w-3" />
                Qatar GBA
              </span>
            )}
          </div>

          {/* Frameworks */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Frameworks:</span>
              <div className="flex items-center gap-1">
                {component.implementations.slice(0, 5).map(impl => (
                  <span
                    key={impl.framework}
                    className="text-sm"
                    title={impl.framework}
                  >
                    {frameworkIcons[impl.framework] || '📦'}
                  </span>
                ))}
                {component.implementations.length > 5 && (
                  <span className="text-xs text-muted-foreground">
                    +{component.implementations.length - 5}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Tags */}
          {component.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1">
              {component.tags.slice(0, 4).map(tag => (
                <span
                  key={tag}
                  className="rounded bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
              {component.tags.length > 4 && (
                <span className="text-xs text-muted-foreground">
                  +{component.tags.length - 4} more
                </span>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link
                href={`/components/${component.id}`}
                className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Eye className="h-4 w-4" />
                Preview
              </Link>
              <Link
                href={`/components/${component.id}?tab=code`}
                className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm transition-colors hover:bg-accent"
              >
                <Code2 className="h-4 w-4" />
                Code
              </Link>
            </div>

            <button
              onClick={e => handleQuickActions('copy', e)}
              className="rounded-md p-2 transition-colors hover:bg-accent"
              title="Copy Code"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>

          {/* Matched Fields (for search results) */}
          {matchedFields && matchedFields.length > 0 && (
            <div className="mt-3 border-t border-border pt-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Matched:</span>
                <div className="flex flex-wrap gap-1">
                  {matchedFields.slice(0, 3).map(field => (
                    <span
                      key={field}
                      className="rounded bg-primary/10 px-2 py-0.5 text-xs text-primary"
                    >
                      {field.replace('_', ' ')}
                    </span>
                  ))}
                  {matchedFields.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{matchedFields.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default: Grid view
  return (
    <div className="group overflow-hidden rounded-lg border border-border transition-shadow hover:shadow-md">
      <Link href={`/components/${component.id}`}>
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          {component.thumbnail && !imageError ? (
            <img
              src={component.thumbnail}
              alt={`${component.displayName} preview`}
              className={`h-full w-full object-cover transition-opacity ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              <Palette className="h-8 w-8" />
            </div>
          )}

          {/* Quick Actions Overlay */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={e => handleQuickActions('preview', e)}
              className="rounded-md bg-white/20 p-2 text-white transition-colors hover:bg-white/30"
              title="Preview"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              onClick={e => handleQuickActions('code', e)}
              className="rounded-md bg-white/20 p-2 text-white transition-colors hover:bg-white/30"
              title="View Code"
            >
              <Code2 className="h-4 w-4" />
            </button>
            <button
              onClick={e => handleQuickActions('copy', e)}
              className="rounded-md bg-white/20 p-2 text-white transition-colors hover:bg-white/30"
              title="Copy Code"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>

          {/* Status Badge */}
          <div
            className={`absolute left-2 top-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${getStatusColor(component.status)}`}
          >
            {getStatusIcon(component.status)}
            {component.status}
          </div>

          {/* Search Score */}
          {searchScore && searchScore > 0 && (
            <div className="absolute right-2 top-2 rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground">
              {Math.round(searchScore * 100)}%
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-3">
        <Link href={`/components/${component.id}`}>
          <h3 className="mb-1 font-semibold transition-colors hover:text-primary">
            {component.displayName}
          </h3>
        </Link>
        <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">
          {component.description}
        </p>

        {/* Features */}
        <div className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
          <span className="capitalize">
            {component.category.replace('-', ' ')}
          </span>
          {component.responsive && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Smartphone className="h-3 w-3" />
                Responsive
              </span>
            </>
          )}
          {component.accessibility.screenReaderSupport && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Accessibility className="h-3 w-3" />
                Accessible
              </span>
            </>
          )}
        </div>

        {/* Frameworks */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {component.implementations.slice(0, 4).map(impl => (
              <span
                key={impl.framework}
                className="text-sm"
                title={impl.framework}
              >
                {frameworkIcons[impl.framework] || '📦'}
              </span>
            ))}
            {component.implementations.length > 4 && (
              <span className="text-xs text-muted-foreground">
                +{component.implementations.length - 4}
              </span>
            )}
          </div>

          {component.usageExamples.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3" />
              {component.usageExamples.length}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
