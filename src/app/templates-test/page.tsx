'use client';

import { useEffect, useState } from 'react';
import { templateService } from '@/lib/template-service';
import { runTemplateTests } from '@/lib/template-test';
import { Template } from '@/types/templates';

export default function TemplatesTestPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [testResults, setTestResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Load all templates
      const allTemplates = templateService.getAllTemplates();
      setTemplates(allTemplates);

      // Run template tests
      const results = runTemplateTests();
      setTestResults(results);

      setLoading(false);
    } catch (error) {
      console.error('Error loading templates:', error);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading templates...</p>
        </div>
      </div>
    );
  }

  const statistics = templateService.getStatistics();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">
            Lucidex UI Explorer - Templates Test
          </h1>
          <p className="text-gray-600">
            Testing the layout templates architecture and data model
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            Statistics
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-lg bg-blue-50 p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">
                {statistics.totalTemplates}
              </div>
              <div className="text-sm text-blue-600">Total Templates</div>
            </div>
            <div className="rounded-lg bg-green-50 p-4 text-center">
              <div className="text-3xl font-bold text-green-600">
                {statistics.responsiveTemplates}
              </div>
              <div className="text-sm text-green-600">Responsive</div>
            </div>
            <div className="rounded-lg bg-purple-50 p-4 text-center">
              <div className="text-3xl font-bold text-purple-600">
                {statistics.accessibleTemplates}
              </div>
              <div className="text-sm text-purple-600">Accessible</div>
            </div>
            <div className="rounded-lg bg-red-50 p-4 text-center">
              <div className="text-3xl font-bold text-red-600">
                {statistics.qatarGBACompliantTemplates}
              </div>
              <div className="text-sm text-red-600">Qatar GBA</div>
            </div>
          </div>
        </div>

        {/* Test Results */}
        {testResults && (
          <div className="mb-8 rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              Test Results
            </h2>
            <div className="mb-4 flex items-center space-x-6">
              <div
                className={`text-lg font-medium ${testResults.failedTemplates === 0 ? 'text-green-600' : 'text-red-600'}`}
              >
                {testResults.failedTemplates === 0
                  ? '✅ All tests passed!'
                  : `❌ ${testResults.failedTemplates} tests failed`}
              </div>
              <div className="text-sm text-gray-600">
                {testResults.passedTemplates}/{testResults.totalTemplates}{' '}
                templates passed
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {testResults.results.map((result: any, index: number) => (
                <div
                  key={index}
                  className={`rounded-lg border p-4 ${result.passed ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">
                      {result.templateName}
                    </h3>
                    <span
                      className={`text-sm font-medium ${result.passed ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {result.passed ? 'PASSED' : 'FAILED'}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    {result.tests.filter((t: any) => t.passed).length}/
                    {result.tests.length} checks passed
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Templates List */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            Available Templates
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {templates.map(template => (
              <div
                key={template.id}
                className="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md"
              >
                <div className="mb-3 flex items-start justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    {template.name}
                  </h3>
                  <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600">
                    {template.category}
                  </span>
                </div>

                <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                  {template.description}
                </p>

                <div className="mb-3 flex flex-wrap gap-1">
                  {template.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-600"
                    >
                      {tag}
                    </span>
                  ))}
                  {template.tags.length > 3 && (
                    <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600">
                      +{template.tags.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{template.codeSnippets.length} snippets</span>
                  <span className="flex items-center space-x-2">
                    {template.responsive && <span title="Responsive">📱</span>}
                    {template.accessible && <span title="Accessible">♿</span>}
                    {template.qatarGBACompliant && (
                      <span title="Qatar GBA Compliant">🇶🇦</span>
                    )}
                  </span>
                </div>

                <div className="mt-3 text-xs text-gray-600">
                  <div>
                    Complexity:{' '}
                    <span className="font-medium">
                      {template.metadata.complexity}
                    </span>
                  </div>
                  <div>
                    Est. time:{' '}
                    <span className="font-medium">
                      {template.metadata.estimatedImplementationTime}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mt-8 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            Categories
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {templateService.getCategories().map(category => (
              <div
                key={category}
                className="rounded-lg border border-gray-200 p-4 text-center"
              >
                <div className="text-lg font-medium capitalize text-gray-900">
                  {category.replace('-', ' ')}
                </div>
                <div className="text-sm text-gray-600">
                  {templateService.getTemplatesByCategory(category).length}{' '}
                  templates
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="mt-8 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            Code Languages
          </h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(statistics.languageCounts).map(
              ([language, count]) => (
                <span
                  key={language}
                  className="rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700"
                >
                  {language} ({count})
                </span>
              )
            )}
          </div>
        </div>

        {/* Sample Code Snippet */}
        <div className="mt-8 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            Sample Code Snippet
          </h2>
          {templates.length > 0 && (
            <div>
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                {templates[0].name} - React
              </h3>
              <div className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100">
                <pre className="text-sm">
                  <code>
                    {(() => {
                      const reactSnippet = templates[0].codeSnippets.find(
                        snippet => snippet.language === 'react'
                      );
                      if (!reactSnippet) return 'No React snippet found';
                      const lines = reactSnippet.code.split('\n');
                      return (
                        lines.slice(0, 20).join('\n') +
                        (lines.length > 20 ? '\n...' : '')
                      );
                    })()}
                  </code>
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
