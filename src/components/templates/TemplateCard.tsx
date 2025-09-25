'use client';

import React from 'react';
import { Template } from '@/types/templates';
import {
  Eye,
  Copy,
  Download,
  Code,
  Smartphone,
  Monitor,
  CheckCircle,
  Tag,
} from 'lucide-react';
import { LiveCodeButton } from '@/components/ui/LiveCodeButton';
import { GitHubExportButton } from '@/components/ui/GitHubExportButton';

interface TemplateCardProps {
  template: Template;
  viewMode?: 'grid' | 'list';
  onPreview?: (template: Template) => void;
  onCopy?: (template: Template) => void;
  onDownload?: (template: Template) => void;
  onLiveCode?: (template: Template) => void;
}

export function TemplateCard({
  template,
  viewMode = 'grid',
  onPreview,
  onCopy,
  onDownload,
  onLiveCode,
}: TemplateCardProps) {
  const getCategoryDisplayName = (category: string) => {
    const names: Record<string, string> = {
      dashboard: 'Dashboard',
      authentication: 'Auth',
      'landing-page': 'Landing',
      'error-page': 'Error',
      'empty-state': 'Empty State',
      navigation: 'Navigation',
      forms: 'Forms',
      'data-display': 'Data Display',
      feedback: 'Feedback',
      layout: 'Layout',
    };
    return names[category] || category;
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple':
        return 'bg-success text-white';
      case 'intermediate':
        return 'bg-warning text-white';
      case 'advanced':
        return 'bg-error text-white';
      default:
        return 'bg-neutral-500 text-white';
    }
  };

  const getComplexityLabel = (complexity: string) => {
    return complexity.charAt(0).toUpperCase() + complexity.slice(1);
  };

  if (viewMode === 'list') {
    return (
      <div className="rounded-lg border border-neutral-200 bg-white p-6 transition-colors hover:border-neutral-300">
        <div className="flex items-start space-x-4">
          {/* Thumbnail */}
          <div className="flex h-16 w-24 flex-shrink-0 items-center justify-center rounded-lg bg-neutral-100">
            {template.thumbnailUrl ? (
              <img
                src={template.thumbnailUrl}
                alt={template.name}
                className="h-full w-full rounded-lg object-cover"
              />
            ) : (
              <Code className="h-8 w-8 text-neutral-400" />
            )}
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-lg font-medium text-neutral-900">
                  {template.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-neutral-600">
                  {template.description}
                </p>
              </div>

              {/* Actions */}
              <div className="ml-4 flex items-center space-x-2">
                {onPreview && (
                  <button
                    onClick={() => onPreview(template)}
                    className="rounded-md p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
                    title="Preview"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                )}
                {onCopy && (
                  <button
                    onClick={() => onCopy(template)}
                    className="rounded-md p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
                    title="Copy Code"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                )}
                <LiveCodeButton
                  template={template}
                  framework="react"
                  provider="both"
                  variant="icon"
                  size="sm"
                  showLabel={false}
                />
                <GitHubExportButton
                  template={template}
                  framework="react"
                  exportType="both"
                  variant="icon"
                  size="sm"
                  showLabel={false}
                />
                {onDownload && (
                  <button
                    onClick={() => onDownload(template)}
                    className="rounded-md p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
                    title="Download"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Metadata */}
            <div className="mt-3 flex items-center space-x-4">
              {/* Category */}
              <span className="bg-primary-100 text-primary-700 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium">
                {getCategoryDisplayName(template.category)}
              </span>

              {/* Complexity */}
              <span
                className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getComplexityColor(template.metadata.complexity)}`}
              >
                {getComplexityLabel(template.metadata.complexity)}
              </span>

              {/* Features */}
              <div className="flex items-center space-x-2 text-xs text-neutral-500">
                {template.responsive && (
                  <div
                    className="flex items-center space-x-1"
                    title="Responsive"
                  >
                    <Smartphone className="h-3 w-3" />
                    <Monitor className="h-3 w-3" />
                  </div>
                )}
                {template.accessible && (
                  <CheckCircle className="h-3 w-3" title="Accessible" />
                )}
                {template.qatarGBACompliant && (
                  <span
                    className="text-primary-600 font-medium"
                    title="Qatar GBA Compliant"
                  >
                    GBA
                  </span>
                )}
              </div>

              {/* Languages */}
              <div className="flex items-center space-x-1 text-xs text-neutral-500">
                {template.codeSnippets.map((snippet, index) => (
                  <span
                    key={index}
                    className="rounded bg-neutral-200 px-1.5 py-0.5"
                  >
                    {snippet.language}
                  </span>
                ))}
              </div>
            </div>

            {/* Tags */}
            {template.tags.length > 0 && (
              <div className="mt-2 flex items-center space-x-1">
                <Tag className="h-3 w-3 text-neutral-400" />
                <div className="flex flex-wrap gap-1">
                  {template.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="rounded bg-neutral-100 px-1.5 py-0.5 text-xs text-neutral-500"
                    >
                      {tag}
                    </span>
                  ))}
                  {template.tags.length > 3 && (
                    <span className="text-xs text-neutral-400">
                      +{template.tags.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div className="group rounded-lg border border-neutral-200 bg-white transition-all duration-200 hover:border-neutral-300 hover:shadow-md">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden rounded-t-lg bg-neutral-100">
        {template.thumbnailUrl ? (
          <img
            src={template.thumbnailUrl}
            alt={template.name}
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Code className="h-12 w-12 text-neutral-400" />
          </div>
        )}

        {/* Overlay actions */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 opacity-0 transition-all duration-200 group-hover:bg-opacity-40 group-hover:opacity-100">
          <div className="flex items-center space-x-2">
            {onPreview && (
              <button
                onClick={() => onPreview(template)}
                className="rounded-md bg-white p-2 text-neutral-700 transition-colors hover:bg-neutral-100"
                title="Preview"
              >
                <Eye className="h-4 w-4" />
              </button>
            )}
            {onCopy && (
              <button
                onClick={() => onCopy(template)}
                className="rounded-md bg-white p-2 text-neutral-700 transition-colors hover:bg-neutral-100"
                title="Copy Code"
              >
                <Copy className="h-4 w-4" />
              </button>
            )}
            <div className="rounded-md bg-white p-1">
              <LiveCodeButton
                template={template}
                framework="react"
                provider="both"
                variant="icon"
                size="sm"
                showLabel={false}
                className="text-neutral-700"
              />
            </div>
            <div className="rounded-md bg-white p-1">
              <GitHubExportButton
                template={template}
                framework="react"
                exportType="both"
                variant="icon"
                size="sm"
                showLabel={false}
                className="text-neutral-700"
              />
            </div>
            {onDownload && (
              <button
                onClick={() => onDownload(template)}
                className="rounded-md bg-white p-2 text-neutral-700 transition-colors hover:bg-neutral-100"
                title="Download"
              >
                <Download className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Feature badges */}
        <div className="absolute left-3 top-3 flex items-center space-x-1">
          {template.responsive && (
            <div className="flex items-center space-x-1 rounded bg-white bg-opacity-90 px-1.5 py-0.5 text-xs font-medium text-neutral-700 backdrop-blur-sm">
              <Smartphone className="h-3 w-3" />
              <Monitor className="h-3 w-3" />
            </div>
          )}
          {template.qatarGBACompliant && (
            <span className="bg-primary-600 rounded px-2 py-0.5 text-xs font-medium text-white">
              GBA
            </span>
          )}
        </div>

        {/* Complexity badge */}
        <div className="absolute right-3 top-3">
          <span
            className={`rounded px-2 py-0.5 text-xs font-medium ${getComplexityColor(template.metadata.complexity)}`}
          >
            {getComplexityLabel(template.metadata.complexity)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="mb-2 flex items-start justify-between">
          <h3 className="line-clamp-1 flex-1 font-medium text-neutral-900">
            {template.name}
          </h3>
          <span className="bg-primary-100 text-primary-700 ml-2 inline-flex flex-shrink-0 items-center rounded px-2 py-0.5 text-xs font-medium">
            {getCategoryDisplayName(template.category)}
          </span>
        </div>

        {/* Description */}
        <p className="mb-3 line-clamp-2 text-sm text-neutral-600">
          {template.description}
        </p>

        {/* Tags */}
        {template.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {template.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="rounded bg-neutral-100 px-1.5 py-0.5 text-xs text-neutral-500"
              >
                {tag}
              </span>
            ))}
            {template.tags.length > 2 && (
              <span className="text-xs text-neutral-400">
                +{template.tags.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Languages */}
          <div className="flex items-center space-x-1">
            {template.codeSnippets.slice(0, 3).map((snippet, index) => (
              <span
                key={index}
                className="rounded bg-neutral-200 px-1.5 py-0.5 font-mono text-xs text-neutral-700"
              >
                {snippet.language}
              </span>
            ))}
            {template.codeSnippets.length > 3 && (
              <span className="text-xs text-neutral-400">
                +{template.codeSnippets.length - 3}
              </span>
            )}
          </div>

          {/* Features */}
          <div className="flex items-center space-x-1 text-neutral-400">
            {template.accessible && (
              <CheckCircle className="h-3 w-3" title="Accessible" />
            )}
          </div>
        </div>

        {/* Metadata */}
        <div className="mt-2 flex items-center justify-between border-t border-neutral-100 pt-2 text-xs text-neutral-500">
          <span>v{template.metadata.version}</span>
          {template.metadata.author && (
            <span>by {template.metadata.author}</span>
          )}
        </div>
      </div>
    </div>
  );
}
