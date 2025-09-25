'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Eye,
  Code2,
  FileText,
  Settings,
  ExternalLink,
  Share2,
  Copy,
  Check,
  AlertTriangle,
  CheckCircle,
  Clock,
  Smartphone,
  Accessibility,
  Shield,
  Star,
} from 'lucide-react';
import { componentService } from '@/lib/component-service';
import { Component } from '@/types/components';
import { Component as PreviewComponent } from '@/types';
import { ComponentPreview } from '@/components/components/ComponentPreview';
import { ComponentRenderer } from '@/components/components/ComponentRenderer';
import { PropsPanel } from '@/components/components/PropsPanel';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

type TabType = 'preview' | 'code' | 'docs' | 'props';

// Convert Component from component service to PreviewComponent
const convertToPreviewComponent = (comp: Component): PreviewComponent => {
  const reactImpl = comp.implementations?.find(
    impl => impl.framework === 'react'
  );
  return {
    id: comp.id,
    name: comp.name,
    displayName: comp.displayName || comp.name,
    description: comp.description,
    category: 'uncategorized',
    tags: comp.tags,
    code: reactImpl?.code || '',
    props: comp.props,
  } as PreviewComponent;
};

export default function ComponentDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const componentId = params?.id as string;
  const initialTab = (searchParams?.get('tab') as TabType) || 'preview';

  const [component, setComponent] = useState<Component | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  // Load component data
  useEffect(() => {
    if (!componentId) return;

    setLoading(true);
    setError(null);

    try {
      const comp = componentService.getComponent(componentId);
      if (!comp) {
        setError('Component not found');
        setComponent(null);
      } else {
        setComponent(comp);
      }
    } catch (err) {
      setError('Failed to load component');
      setComponent(null);
    } finally {
      setLoading(false);
    }
  }, [componentId]);

  const handleCopyComponentCode = async () => {
    if (!component) return;

    const reactImpl = component.implementations.find(
      impl => impl.framework === 'react'
    );
    if (reactImpl) {
      await copyToClipboard(
        reactImpl.code,
        'Component code copied to clipboard!'
      );
    }
  };

  const handleShareComponent = async () => {
    if (navigator.share && component) {
      try {
        await navigator.share({
          title: `${component.displayName} - Lucidex UI`,
          text: component.description,
          url: window.location.href,
        });
      } catch (err) {
        // Fallback to copying URL
        await copyToClipboard(
          window.location.href,
          'Component URL copied to clipboard!'
        );
      }
    } else {
      await copyToClipboard(
        window.location.href,
        'Component URL copied to clipboard!'
      );
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'stable':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'beta':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'experimental':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'deprecated':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading component...</p>
        </div>
      </div>
    );
  }

  if (error || !component) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mb-4 text-6xl">❌</div>
          <h1 className="mb-2 text-2xl font-bold">Component Not Found</h1>
          <p className="mb-6 text-muted-foreground">
            The component "{componentId}" could not be found.
          </p>
          <Link
            href="/components"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Components
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'preview', label: 'Preview', icon: Eye },
    { id: 'code', label: 'Code', icon: Code2 },
    { id: 'docs', label: 'Documentation', icon: FileText },
    { id: 'props', label: 'Props', icon: Settings },
  ] as const;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="flex items-center justify-between py-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-4">
              <Link
                href="/components"
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Components
              </Link>
              <div className="text-muted-foreground">/</div>
              <h1 className="text-lg font-semibold">{component.displayName}</h1>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleShareComponent}
                className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm hover:bg-accent"
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>
              <button
                onClick={handleCopyComponentCode}
                className="flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground hover:bg-primary/90"
              >
                {isCopied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {isCopied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
          </div>

          {/* Component Meta */}
          <div className="pb-4">
            <div className="mb-3 flex items-center gap-4">
              <div
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm ${getStatusColor(component.status)}`}
              >
                {getStatusIcon(component.status)}
                {component.status}
              </div>
              <span className="text-sm capitalize text-muted-foreground">
                {component.category.replace('-', ' ')}
              </span>
              <span className="text-sm text-muted-foreground">
                v{component.version}
              </span>
            </div>

            <p className="mb-4 max-w-2xl text-muted-foreground">
              {component.description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-2">
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
              {component.usageExamples.length > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                  <Star className="h-3 w-3" />
                  {component.usageExamples.length} Examples
                </span>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 border-b border-border">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
        {activeTab === 'preview' && (
          <ComponentPreview component={convertToPreviewComponent(component)} />
        )}

        {activeTab === 'code' && (
          <ComponentRenderer
            componentName={component.name}
            componentCode={component.implementations?.find(impl => impl.framework === 'react')?.code || ''}
            props={{}}
            activeState="default"
            framework="react"
            theme="light"
          />
        )}

        {activeTab === 'docs' && (
          <div className="max-w-4xl">
            {/* Overview */}
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-bold">Overview</h2>
              <p className="mb-6 text-muted-foreground">
                {component.documentation.overview || component.description}
              </p>
            </div>

            {/* When to Use */}
            {component.documentation.whenToUse.length > 0 && (
              <div className="mb-8">
                <h3 className="mb-3 text-xl font-semibold">When to Use</h3>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  {component.documentation.whenToUse.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* When NOT to Use */}
            {component.documentation.whenNotToUse.length > 0 && (
              <div className="mb-8">
                <h3 className="mb-3 text-xl font-semibold">When NOT to Use</h3>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  {component.documentation.whenNotToUse.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Best Practices */}
            {component.documentation.bestPractices.length > 0 && (
              <div className="mb-8">
                <h3 className="mb-3 text-xl font-semibold">Best Practices</h3>
                <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/20">
                  <ul className="list-inside list-disc space-y-2 text-green-800 dark:text-green-400">
                    {component.documentation.bestPractices.map(
                      (item, index) => (
                        <li key={index}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            )}

            {/* Common Mistakes */}
            {component.documentation.commonMistakes.length > 0 && (
              <div className="mb-8">
                <h3 className="mb-3 text-xl font-semibold">Common Mistakes</h3>
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/20">
                  <ul className="list-inside list-disc space-y-2 text-red-800 dark:text-red-400">
                    {component.documentation.commonMistakes.map(
                      (item, index) => (
                        <li key={index}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            )}

            {/* Accessibility */}
            <div className="mb-8">
              <h3 className="mb-3 text-xl font-semibold">Accessibility</h3>
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/20">
                <div className="grid gap-4 text-sm md:grid-cols-2">
                  <div>
                    <div className="mb-2 font-medium text-blue-800 dark:text-blue-400">
                      WCAG Compliance
                    </div>
                    <div className="text-blue-700 dark:text-blue-300">
                      {component.accessibility.wcagCompliance}
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 font-medium text-blue-800 dark:text-blue-400">
                      Screen Reader Support
                    </div>
                    <div className="text-blue-700 dark:text-blue-300">
                      {component.accessibility.screenReaderSupport
                        ? 'Yes'
                        : 'No'}
                    </div>
                  </div>
                  {component.accessibility.keyboardSupport.length > 0 && (
                    <div className="md:col-span-2">
                      <div className="mb-2 font-medium text-blue-800 dark:text-blue-400">
                        Keyboard Support
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {component.accessibility.keyboardSupport.map(
                          (key, index) => (
                            <span
                              key={index}
                              className="rounded bg-blue-200 px-2 py-1 text-xs text-blue-800 dark:bg-blue-800 dark:text-blue-200"
                            >
                              {key}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Related Components */}
            {component.documentation.relatedComponents.length > 0 && (
              <div className="mb-8">
                <h3 className="mb-3 text-xl font-semibold">
                  Related Components
                </h3>
                <div className="flex flex-wrap gap-2">
                  {component.documentation.relatedComponents.map(
                    (relatedId, index) => {
                      const relatedComponent =
                        componentService.getComponent(relatedId);
                      if (!relatedComponent) return null;

                      return (
                        <Link
                          key={index}
                          href={`/components/${relatedId}`}
                          className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm hover:bg-accent"
                        >
                          {relatedComponent.displayName}
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      );
                    }
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'props' && (
          <PropsPanel
            componentName={component.name}
            props={component.props || []}
            values={{}}
            onChange={() => {}}
          />
        )}
      </div>
    </div>
  );
}
