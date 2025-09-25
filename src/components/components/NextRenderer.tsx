'use client';

import React, { useMemo } from 'react';
import { Component, GeneratedCode } from '@/types';
import { CodeBlock, useCopySuccessToast } from '@/components/ui';
import { generateNextjsCode } from '@/lib/code-generators';
import {
  Package,
  Download,
  ExternalLink,
  Layers,
  Server,
  Globe,
  Zap,
} from 'lucide-react';

interface NextRendererProps {
  component: Component;
  onCodeGenerated?: (code: GeneratedCode) => void;
}

export function NextRenderer({
  component,
  onCodeGenerated,
}: NextRendererProps) {
  const showCopySuccess = useCopySuccessToast();

  const generatedCode = useMemo(() => {
    const code = generateNextjsCode(component, {
      includeProps: true,
      includeTypes: true,
      includeComments: true,
      includeImports: true,
      styleFramework: 'tailwind',
      typescript: true,
    });

    onCodeGenerated?.(code);
    return code;
  }, [component, onCodeGenerated]);

  const isClientComponent = generatedCode.code.includes("'use client';");

  return (
    <div className="space-y-6">
      {/* Next.js Features */}
      <div className="flex flex-wrap gap-2">
        <div
          className={`flex items-center space-x-1 rounded px-2 py-1 text-xs ${
            isClientComponent
              ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300'
              : 'bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-300'
          }`}
        >
          {isClientComponent ? (
            <Globe className="h-3 w-3" />
          ) : (
            <Server className="h-3 w-3" />
          )}
          <span>
            {isClientComponent ? 'Client Component' : 'Server Component'}
          </span>
        </div>
        <div className="flex items-center space-x-1 rounded bg-purple-50 px-2 py-1 text-xs text-purple-700 dark:bg-purple-950/50 dark:text-purple-300">
          <Layers className="h-3 w-3" />
          <span>App Router</span>
        </div>
        <div className="flex items-center space-x-1 rounded bg-orange-50 px-2 py-1 text-xs text-orange-700 dark:bg-orange-950/50 dark:text-orange-300">
          <Zap className="h-3 w-3" />
          <span>SSR/SSG</span>
        </div>
        <div className="flex items-center space-x-1 rounded bg-teal-50 px-2 py-1 text-xs text-teal-700 dark:bg-teal-950/50 dark:text-teal-300">
          <Globe className="h-3 w-3" />
          <span>SEO Optimized</span>
        </div>
      </div>

      {/* Component Type Info */}
      <div
        className={`rounded border p-4 ${
          isClientComponent
            ? 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20'
            : 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20'
        }`}
      >
        <div className="mb-2 flex items-center space-x-2">
          {isClientComponent ? (
            <Globe className="h-4 w-4" />
          ) : (
            <Server className="h-4 w-4" />
          )}
          <h5 className="font-medium">
            {isClientComponent ? 'Client Component' : 'Server Component'}
          </h5>
        </div>
        <p className="text-sm text-muted-foreground">
          {isClientComponent
            ? 'This component runs in the browser and can use hooks, event handlers, and browser APIs.'
            : 'This component runs on the server and is rendered at build time or request time for better performance and SEO.'}
        </p>
      </div>

      {/* Component Code */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-foreground">Component Code</h4>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">
              {generatedCode.filename}
            </span>
          </div>
        </div>

        <CodeBlock
          code={generatedCode.code}
          language={generatedCode.language}
          filename={generatedCode.filename}
          onCopySuccess={showCopySuccess}
          showLineNumbers={true}
          compact={false}
        />
      </div>

      {/* Installation & Setup */}
      {generatedCode.installationSteps &&
        generatedCode.installationSteps.length > 0 && (
          <div className="space-y-3">
            <h4 className="flex items-center space-x-2 font-medium text-foreground">
              <Download className="h-4 w-4 text-qgba-gold" />
              <span>Next.js Setup</span>
            </h4>

            <div className="space-y-2">
              {generatedCode.installationSteps.map((step, index) => (
                <div
                  key={index}
                  className="rounded border border-border bg-muted/50 p-3"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-qgba-gold/10 text-xs font-medium text-qgba-gold">
                      {index + 1}
                    </div>
                    <code className="flex-1 font-mono text-sm text-muted-foreground">
                      {step}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Dependencies */}
      <div className="space-y-3">
        <h4 className="flex items-center space-x-2 font-medium text-foreground">
          <Package className="h-4 w-4 text-qgba-gold" />
          <span>Dependencies</span>
        </h4>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {generatedCode.dependencies.map((dep, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded border border-border bg-card p-3"
            >
              <code className="font-mono text-sm text-foreground">{dep}</code>
              <ExternalLink className="h-3 w-3 text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>

      {/* Next.js Optimizations */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Next.js Optimizations</h4>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded border border-border bg-card p-4">
            <h5 className="mb-2 font-medium text-foreground">Performance</h5>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Automatic code splitting</li>
              <li>• Image optimization</li>
              <li>• Font optimization</li>
              <li>• Bundle analyzer</li>
            </ul>
          </div>

          <div className="rounded border border-border bg-card p-4">
            <h5 className="mb-2 font-medium text-foreground">SEO</h5>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Metadata API</li>
              <li>• Open Graph tags</li>
              <li>• JSON-LD structured data</li>
              <li>• Sitemap generation</li>
            </ul>
          </div>

          <div className="rounded border border-border bg-card p-4">
            <h5 className="mb-2 font-medium text-foreground">Rendering</h5>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Static Site Generation (SSG)</li>
              <li>• Server Side Rendering (SSR)</li>
              <li>• Incremental Static Regeneration (ISR)</li>
              <li>• Streaming</li>
            </ul>
          </div>

          <div className="rounded border border-border bg-card p-4">
            <h5 className="mb-2 font-medium text-foreground">Development</h5>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Fast refresh</li>
              <li>• TypeScript support</li>
              <li>• Built-in ESLint</li>
              <li>• Error overlay</li>
            </ul>
          </div>
        </div>
      </div>

      {/* App Router Features */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">App Router Features</h4>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded border border-border bg-card p-3">
            <h6 className="mb-1 text-sm font-medium text-foreground">
              Layouts
            </h6>
            <p className="text-xs text-muted-foreground">
              Shared UI between routes
            </p>
          </div>

          <div className="rounded border border-border bg-card p-3">
            <h6 className="mb-1 text-sm font-medium text-foreground">
              Loading UI
            </h6>
            <p className="text-xs text-muted-foreground">
              Instant loading states
            </p>
          </div>

          <div className="rounded border border-border bg-card p-3">
            <h6 className="mb-1 text-sm font-medium text-foreground">
              Error Boundaries
            </h6>
            <p className="text-xs text-muted-foreground">
              Automatic error handling
            </p>
          </div>

          <div className="rounded border border-border bg-card p-3">
            <h6 className="mb-1 text-sm font-medium text-foreground">
              Route Groups
            </h6>
            <p className="text-xs text-muted-foreground">
              Organize routes without affecting URL
            </p>
          </div>

          <div className="rounded border border-border bg-card p-3">
            <h6 className="mb-1 text-sm font-medium text-foreground">
              Parallel Routes
            </h6>
            <p className="text-xs text-muted-foreground">
              Multiple pages in one layout
            </p>
          </div>

          <div className="rounded border border-border bg-card p-3">
            <h6 className="mb-1 text-sm font-medium text-foreground">
              Intercepting Routes
            </h6>
            <p className="text-xs text-muted-foreground">
              Override route behavior
            </p>
          </div>
        </div>
      </div>

      {/* Usage Notes */}
      {generatedCode.usageNotes && generatedCode.usageNotes.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Usage Notes</h4>
          <div className="space-y-2">
            {generatedCode.usageNotes.map((note, index) => (
              <div
                key={index}
                className="flex items-start space-x-2 text-sm text-muted-foreground"
              >
                <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-qgba-gold/60" />
                <span>{note}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Best Practices */}
      <div className="rounded border border-qgba-gold/20 bg-qgba-gold/5 p-4">
        <h5 className="mb-2 font-medium text-foreground">
          Next.js Best Practices
        </h5>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>
            • Use Server Components by default, Client Components when needed
          </p>
          <p>• Implement proper error boundaries and loading states</p>
          <p>• Optimize images with next/image component</p>
          <p>• Use dynamic imports for code splitting</p>
          <p>• Implement proper SEO with metadata API</p>
          <p>• Follow the app directory structure conventions</p>
        </div>
      </div>
    </div>
  );
}
