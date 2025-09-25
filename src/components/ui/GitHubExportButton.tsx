'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  GitHubExporter,
  useGitHubExport,
  type GitHubExportConfig,
  type GitHubGistConfig,
  type GitHubRepositoryInfo,
  type GitHubGistInfo,
} from '@/lib/github-export';
import {
  Github,
  Download,
  Loader2,
  AlertTriangle,
  Check,
  ExternalLink,
  Settings,
  FileText,
  Folder,
} from 'lucide-react';
import { Component } from '@/types';
import { Template } from '@/types/templates';

export interface GitHubExportButtonProps {
  component?: Component;
  template?: Template;
  framework?: 'react' | 'nextjs';
  exportType?: 'repository' | 'gist' | 'both';
  variant?: 'button' | 'icon' | 'dropdown';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
  onExportComplete?: (result: GitHubRepositoryInfo | GitHubGistInfo) => void;
  onExportError?: (error: string) => void;
}

export function GitHubExportButton({
  component,
  template,
  framework = 'react',
  exportType = 'both',
  variant = 'button',
  size = 'md',
  showLabel = true,
  className,
  onExportComplete,
  onExportError,
}: GitHubExportButtonProps) {
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [repositoryName, setRepositoryName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [exportingAs, setExportingAs] = useState<'repository' | 'gist' | null>(null);

  const { exportAsRepository, exportAsGist, isExporting, error } = useGitHubExport();

  const getButtonSizes = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs';
      case 'lg':
        return 'px-4 py-2.5 text-sm';
      default:
        return 'px-3 py-2 text-sm';
    }
  };

  const getIconSizes = () => {
    switch (size) {
      case 'sm':
        return 'h-3 w-3';
      case 'lg':
        return 'h-5 w-5';
      default:
        return 'h-4 w-4';
    }
  };

  const generateDefaultRepositoryName = (): string => {
    const baseName = (component?.name || template?.name || 'lucidex-ui-export')
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    return baseName;
  };

  const generateDefaultDescription = (): string => {
    if (component) {
      return `${component.name} component from Lucidex UI`;
    }
    if (template) {
      return `${template.name} template from Lucidex UI`;
    }
    return 'Export from Lucidex UI';
  };

  const handleExportAsRepository = async () => {
    if (!token || !username) {
      setShowTokenInput(true);
      return;
    }

    setExportingAs('repository');

    try {
      const files = component
        ? GitHubExporter.generateComponentRepository(component, framework)
        : template
        ? GitHubExporter.generateTemplateRepository(template, framework)
        : {};

      const config: GitHubExportConfig = {
        token,
        username,
        repositoryName: repositoryName || generateDefaultRepositoryName(),
        description: generateDefaultDescription(),
        isPrivate,
        files,
        commitMessage: 'Initial commit from Lucidex UI',
      };

      const result = await exportAsRepository(config);
      if (result) {
        onExportComplete?.(result);
        setShowTokenInput(false);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Export failed';
      onExportError?.(errorMessage);
    } finally {
      setExportingAs(null);
    }
  };

  const handleExportAsGist = async () => {
    if (!token) {
      setShowTokenInput(true);
      return;
    }

    setExportingAs('gist');

    try {
      const filename = component
        ? `${component.name}.${framework === 'nextjs' ? 'tsx' : 'jsx'}`
        : template
        ? `${template.name.replace(/\s+/g, '-')}.${framework === 'nextjs' ? 'tsx' : 'jsx'}`
        : 'lucidex-export.jsx';

      const content = component
        ? component.code?.[framework] || component.code?.react || ''
        : template
        ? template.codeSnippets.find(s => s.language === framework || s.language === 'react')?.code || ''
        : '';

      const config: GitHubGistConfig = {
        token,
        filename,
        description: generateDefaultDescription(),
        isPublic: !isPrivate,
        content,
      };

      const result = await exportAsGist(config);
      if (result) {
        onExportComplete?.(result);
        setShowTokenInput(false);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Export failed';
      onExportError?.(errorMessage);
    } finally {
      setExportingAs(null);
    }
  };

  const renderTokenForm = () => (
    <div className="space-y-4 p-4 border rounded-lg bg-background">
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Settings className="h-4 w-4" />
        <span>GitHub Export Settings</span>
      </div>

      <div>
        <label htmlFor="github-token" className="block text-sm font-medium mb-1">
          GitHub Token <span className="text-destructive">*</span>
        </label>
        <input
          id="github-token"
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Create a{' '}
          <a
            href="https://github.com/settings/tokens/new?scopes=repo,gist"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            personal access token
          </a>{' '}
          with repo and gist permissions
        </p>
      </div>

      {(exportType === 'repository' || exportType === 'both') && (
        <>
          <div>
            <label htmlFor="github-username" className="block text-sm font-medium mb-1">
              Username <span className="text-destructive">*</span>
            </label>
            <input
              id="github-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="your-github-username"
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="repo-name" className="block text-sm font-medium mb-1">
              Repository Name
            </label>
            <input
              id="repo-name"
              type="text"
              value={repositoryName}
              onChange={(e) => setRepositoryName(e.target.value)}
              placeholder={generateDefaultRepositoryName()}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="is-private"
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
            />
            <label htmlFor="is-private" className="text-sm">
              Private repository
            </label>
          </div>
        </>
      )}

      {error && (
        <div className="flex items-center space-x-2 text-sm text-destructive">
          <AlertTriangle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex items-center space-x-2">
        {(exportType === 'repository' || exportType === 'both') && (
          <button
            onClick={handleExportAsRepository}
            disabled={isExporting || !token || !username}
            className={cn(
              'inline-flex items-center space-x-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              getButtonSizes()
            )}
          >
            {exportingAs === 'repository' ? (
              <Loader2 className={cn(getIconSizes(), 'animate-spin')} />
            ) : (
              <Folder className={getIconSizes()} />
            )}
            <span>Export as Repository</span>
          </button>
        )}

        {(exportType === 'gist' || exportType === 'both') && (
          <button
            onClick={handleExportAsGist}
            disabled={isExporting || !token}
            className={cn(
              'inline-flex items-center space-x-2 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              getButtonSizes()
            )}
          >
            {exportingAs === 'gist' ? (
              <Loader2 className={cn(getIconSizes(), 'animate-spin')} />
            ) : (
              <FileText className={getIconSizes()} />
            )}
            <span>Export as Gist</span>
          </button>
        )}

        <button
          onClick={() => setShowTokenInput(false)}
          className={cn(
            'rounded-md border bg-background text-muted-foreground hover:text-foreground',
            getButtonSizes()
          )}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  if (variant === 'icon') {
    return (
      <div className={cn('relative', className)}>
        <button
          onClick={() => setShowTokenInput(true)}
          className={cn(
            'rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          title="Export to GitHub"
        >
          <Github className={getIconSizes()} />
        </button>

        {showTokenInput && (
          <div className="absolute top-full right-0 z-50 w-80 mt-2">
            {renderTokenForm()}
          </div>
        )}
      </div>
    );
  }

  if (variant === 'dropdown') {
    return (
      <div className={cn('relative', className)}>
        {!showTokenInput ? (
          <button
            onClick={() => setShowTokenInput(true)}
            className={cn(
              'inline-flex items-center space-x-2 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              getButtonSizes()
            )}
          >
            <Github className={getIconSizes()} />
            {showLabel && <span>Export to GitHub</span>}
            <Download className="h-3 w-3" />
          </button>
        ) : (
          renderTokenForm()
        )}
      </div>
    );
  }

  // Default button variant
  return (
    <div className={cn('space-y-2', className)}>
      {!showTokenInput ? (
        <button
          onClick={() => setShowTokenInput(true)}
          className={cn(
            'inline-flex items-center space-x-2 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            getButtonSizes()
          )}
        >
          <Github className={getIconSizes()} />
          {showLabel && <span>Export to GitHub</span>}
        </button>
      ) : (
        renderTokenForm()
      )}
    </div>
  );
}

// Success notification component for when export completes
export function GitHubExportSuccess({
  result,
  onClose,
}: {
  result: GitHubRepositoryInfo | GitHubGistInfo;
  onClose: () => void;
}) {
  const isRepository = 'fullName' in result;

  return (
    <div className="rounded-lg border border-green-200 bg-green-50 p-4">
      <div className="flex items-start space-x-3">
        <Check className="h-5 w-5 text-green-600 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-medium text-green-800">
            Successfully exported to GitHub {isRepository ? 'repository' : 'gist'}!
          </h3>
          <p className="mt-1 text-sm text-green-600">
            {isRepository ? (
              <>Repository created: <code>{(result as GitHubRepositoryInfo).fullName}</code></>
            ) : (
              <>Gist created: <code>{(result as GitHubGistInfo).id}</code></>
            )}
          </p>
          <div className="mt-2 flex items-center space-x-2">
            <a
              href={isRepository ? (result as GitHubRepositoryInfo).url : (result as GitHubGistInfo).htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-sm text-green-700 hover:text-green-800"
            >
              <ExternalLink className="h-3 w-3" />
              <span>View on GitHub</span>
            </a>
            {isRepository && (
              <button
                onClick={() => navigator.clipboard.writeText((result as GitHubRepositoryInfo).cloneUrl)}
                className="text-sm text-green-700 hover:text-green-800"
              >
                Copy clone URL
              </button>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-green-400 hover:text-green-600"
        >
          ×
        </button>
      </div>
    </div>
  );
}

// Export specialized components for common use cases
export function GitHubRepositoryExportButton(props: Omit<GitHubExportButtonProps, 'exportType'>) {
  return <GitHubExportButton {...props} exportType="repository" />;
}

export function GitHubGistExportButton(props: Omit<GitHubExportButtonProps, 'exportType'>) {
  return <GitHubExportButton {...props} exportType="gist" />;
}