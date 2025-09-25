'use client';

import React, { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CodeSnippet } from '@/types/templates';
import { templateService } from '@/lib/template-service';
import {
  ArrowLeft,
  Copy,
  Download,
  Eye,
  Code,
  Smartphone,
  Monitor,
  CheckCircle,
  Tag,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { CodeBlock } from '@/components/ui';
import { PreviewSystem } from '@/components/preview/PreviewSystem';

export default function TemplatePage() {
  const params = useParams();
  const router = useRouter();
  const templateId = params?.slug as string;

  const [selectedLanguage, setSelectedLanguage] =
    useState<CodeSnippet['language']>('react');
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'docs'>(
    'preview'
  );

  // Get template data
  const template = useMemo(() => {
    return templateService.getTemplateById(templateId);
  }, [templateId]);

  // Get recommended templates
  const recommendedTemplates = useMemo(() => {
    if (!template) return [];
    return templateService.getRecommendedTemplates(template.id, 3);
  }, [template]);

  // Handle copy to clipboard
  const handleCopyCode = async () => {
    if (!template) return;

    const codeSnippet = template.codeSnippets.find(
      s => s.language === selectedLanguage
    );
    if (codeSnippet) {
      try {
        await navigator.clipboard.writeText(codeSnippet.code);
        // You could show a toast notification here
        console.log('Code copied to clipboard');
      } catch (error) {
        console.error('Failed to copy code:', error);
      }
    }
  };

  // Handle download
  const handleDownload = () => {
    if (!template) return;

    const codeSnippet = template.codeSnippets.find(
      s => s.language === selectedLanguage
    );
    if (codeSnippet) {
      const blob = new Blob([codeSnippet.code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download =
        codeSnippet.filename ||
        `${template.name.toLowerCase().replace(/\s+/g, '-')}.${codeSnippet.language}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  if (!template) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-neutral-200">
            <Code className="h-8 w-8 text-neutral-400" />
          </div>
          <h2 className="mb-2 text-xl font-semibold text-neutral-900">
            Template Not Found
          </h2>
          <p className="mb-4 text-neutral-600">
            The template you're looking for doesn't exist.
          </p>
          <button
            onClick={() => router.push('/templates')}
            className="bg-primary-600 hover:bg-primary-700 inline-flex items-center rounded-lg px-4 py-2 text-white transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Templates
          </button>
        </div>
      </div>
    );
  }

  const currentCodeSnippet = template.codeSnippets.find(
    s => s.language === selectedLanguage
  );
  const availableLanguages = template.codeSnippets.map(s => s.language);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/templates')}
                className="rounded-md p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-neutral-900">
                  {template.name}
                </h1>
                <p className="mt-1 text-neutral-600">{template.description}</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handleCopyCode}
                className="inline-flex items-center rounded-lg bg-neutral-100 px-4 py-2 text-neutral-700 transition-colors hover:bg-neutral-200"
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </button>
              <button
                onClick={handleDownload}
                className="inline-flex items-center rounded-lg bg-neutral-100 px-4 py-2 text-neutral-700 transition-colors hover:bg-neutral-200"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className="bg-primary-600 hover:bg-primary-700 inline-flex items-center rounded-lg px-4 py-2 text-white transition-colors"
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </button>
            </div>
          </div>

          {/* Template Meta */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {/* Category */}
            <span className="bg-primary-100 text-primary-700 inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-medium">
              {template.category}
            </span>

            {/* Complexity */}
            <span
              className={`inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-medium ${
                template.metadata.complexity === 'simple'
                  ? 'bg-success text-white'
                  : template.metadata.complexity === 'intermediate'
                    ? 'bg-warning text-white'
                    : 'bg-error text-white'
              }`}
            >
              {template.metadata.complexity}
            </span>

            {/* Features */}
            <div className="flex items-center space-x-3 text-sm text-neutral-600">
              {template.responsive && (
                <div className="flex items-center space-x-1" title="Responsive">
                  <Smartphone className="h-4 w-4" />
                  <Monitor className="h-4 w-4" />
                  <span>Responsive</span>
                </div>
              )}
              {template.accessible && (
                <div className="flex items-center space-x-1" title="Accessible">
                  <CheckCircle className="h-4 w-4" />
                  <span>Accessible</span>
                </div>
              )}
              {template.qatarGBACompliant && (
                <span
                  className="text-primary-600 font-medium"
                  title="Qatar GBA Compliant"
                >
                  GBA Compliant
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-4">
          {/* Main Content */}
          <div className="xl:col-span-3">
            {/* Tabs */}
            <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
              <div className="border-b border-neutral-200">
                <nav className="flex">
                  {[
                    { id: 'preview', label: 'Preview', icon: Eye },
                    { id: 'code', label: 'Code', icon: Code },
                    { id: 'docs', label: 'Documentation', icon: ExternalLink },
                  ].map(tab => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center border-b-2 px-6 py-3 text-sm font-medium transition-colors ${
                          activeTab === tab.id
                            ? 'border-primary-500 text-primary-600 bg-primary-50'
                            : 'border-transparent text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700'
                        }`}
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'preview' && (
                  <div className="min-h-96">
                    {currentCodeSnippet ? (
                      <PreviewSystem
                        content={currentCodeSnippet.code}
                        title={template.name}
                        description={template.description}
                        framework={
                          currentCodeSnippet.language === 'react'
                            ? 'react'
                            : currentCodeSnippet.language === 'nextjs'
                              ? 'react'
                              : currentCodeSnippet.language === 'typescript'
                                ? 'react'
                                : currentCodeSnippet.language === 'blazor'
                                  ? 'angular'
                                  : 'html'
                        }
                        showHeader={true}
                        compact={false}
                      />
                    ) : (
                      <div className="flex min-h-96 items-center justify-center rounded-lg bg-neutral-100 p-8">
                        <div className="text-center">
                          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-white shadow-sm">
                            <Eye className="h-8 w-8 text-neutral-400" />
                          </div>
                          <h3 className="mb-2 text-lg font-medium text-neutral-900">
                            No Preview Available
                          </h3>
                          <p className="max-w-md text-neutral-600">
                            No code snippet found for the selected language.
                            Please select a different language from the code
                            tab.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'code' && (
                  <div>
                    {/* Language Selector */}
                    {availableLanguages.length > 1 && (
                      <div className="mb-4 flex items-center space-x-2">
                        <span className="text-sm font-medium text-neutral-700">
                          Language:
                        </span>
                        <div className="flex items-center space-x-1">
                          {availableLanguages.map(language => (
                            <button
                              key={language}
                              onClick={() => setSelectedLanguage(language)}
                              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                                selectedLanguage === language
                                  ? 'bg-primary-100 text-primary-700'
                                  : 'text-neutral-600 hover:bg-neutral-100'
                              }`}
                            >
                              {language}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Code Block */}
                    {currentCodeSnippet && (
                      <CodeBlock
                        code={currentCodeSnippet.code}
                        language={currentCodeSnippet.language}
                        {...(currentCodeSnippet.filename && {
                          filename: currentCodeSnippet.filename,
                        })}
                        showCopyButton={true}
                      />
                    )}
                  </div>
                )}

                {activeTab === 'docs' && (
                  <div className="prose prose-neutral max-w-none">
                    <h3>Implementation Notes</h3>
                    {template.metadata.usageNotes ? (
                      <div className="mb-6 rounded-lg bg-neutral-50 p-4">
                        <p className="leading-relaxed text-neutral-700">
                          {template.metadata.usageNotes}
                        </p>
                      </div>
                    ) : (
                      <p className="text-neutral-600">
                        No specific implementation notes available for this
                        template.
                      </p>
                    )}

                    {template.metadata.dependencies &&
                      template.metadata.dependencies.length > 0 && (
                        <div>
                          <h4>Dependencies</h4>
                          <ul className="list-inside list-disc space-y-1 text-neutral-700">
                            {template.metadata.dependencies.map(
                              (dep, index) => (
                                <li key={index}>
                                  <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm">
                                    {dep}
                                  </code>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                    {template.metadata.designTokensUsed &&
                      template.metadata.designTokensUsed.length > 0 && (
                        <div>
                          <h4>Design Tokens Used</h4>
                          <div className="flex flex-wrap gap-2">
                            {template.metadata.designTokensUsed.map(
                              (token, index) => (
                                <span
                                  key={index}
                                  className="bg-primary-100 text-primary-700 inline-block rounded px-2 py-1 text-xs font-medium"
                                >
                                  {token}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {template.metadata.estimatedImplementationTime && (
                      <div className="bg-info/10 border-info/20 rounded-lg border p-4">
                        <div className="text-info flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span className="font-medium">
                            Estimated Implementation Time
                          </span>
                        </div>
                        <p className="text-info/80 mt-1">
                          {template.metadata.estimatedImplementationTime}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 xl:col-span-1">
            {/* Template Info */}
            <div className="rounded-lg border border-neutral-200 bg-white p-6">
              <h3 className="mb-4 text-lg font-semibold text-neutral-900">
                Template Info
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Version</span>
                  <span className="text-sm font-medium text-neutral-900">
                    {template.metadata.version}
                  </span>
                </div>

                {template.metadata.author && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">Author</span>
                    <span className="text-sm font-medium text-neutral-900">
                      {template.metadata.author}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Updated</span>
                  <span className="text-sm font-medium text-neutral-900">
                    {new Date(
                      template.metadata.lastUpdated
                    ).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Languages</span>
                  <div className="flex items-center space-x-1">
                    {template.codeSnippets.map((snippet, index) => (
                      <span
                        key={index}
                        className="rounded bg-neutral-100 px-2 py-1 font-mono text-xs text-neutral-700"
                      >
                        {snippet.language}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            {template.tags.length > 0 && (
              <div className="rounded-lg border border-neutral-200 bg-white p-6">
                <div className="mb-4 flex items-center space-x-2">
                  <Tag className="h-4 w-4 text-neutral-600" />
                  <h3 className="text-lg font-semibold text-neutral-900">
                    Tags
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block rounded bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Recommended Templates */}
            {recommendedTemplates.length > 0 && (
              <div className="rounded-lg border border-neutral-200 bg-white p-6">
                <h3 className="mb-4 text-lg font-semibold text-neutral-900">
                  Similar Templates
                </h3>

                <div className="space-y-4">
                  {recommendedTemplates.map(recTemplate => (
                    <div
                      key={recTemplate.id}
                      className="flex cursor-pointer items-start space-x-3 rounded-lg bg-neutral-50 p-3 transition-colors hover:bg-neutral-100"
                      onClick={() =>
                        router.push(`/templates/${recTemplate.id}`)
                      }
                    >
                      <div className="flex h-8 w-12 flex-shrink-0 items-center justify-center rounded bg-neutral-200">
                        <Code className="h-4 w-4 text-neutral-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate text-sm font-medium text-neutral-900">
                          {recTemplate.name}
                        </h4>
                        <p className="mt-1 line-clamp-2 text-xs text-neutral-600">
                          {recTemplate.description}
                        </p>
                        <span className="bg-primary-100 text-primary-700 mt-2 inline-block rounded px-2 py-0.5 text-xs">
                          {recTemplate.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
