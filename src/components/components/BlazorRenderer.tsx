'use client';

import React, { useMemo } from 'react';
import { Component, GeneratedCode } from '@/types';
import { CodeBlock, useCopySuccessToast } from '@/components/ui';
import { generateBlazorCode } from '@/lib/code-generators';
import {
  Package,
  Download,
  ExternalLink,
  FileCode,
  Server,
  Zap,
  Database,
  Globe,
} from 'lucide-react';

interface BlazorRendererProps {
  component: Component;
  onCodeGenerated?: (code: GeneratedCode) => void;
}

export function BlazorRenderer({
  component,
  onCodeGenerated,
}: BlazorRendererProps) {
  const showCopySuccess = useCopySuccessToast();

  const generatedCode = useMemo(() => {
    const code = generateBlazorCode(component, {
      includeProps: true,
      includeTypes: true,
      includeComments: true,
      includeImports: true,
      styleFramework: 'tailwind',
      typescript: false, // Blazor uses C#
    });

    onCodeGenerated?.(code);
    return code;
  }, [component, onCodeGenerated]);

  return (
    <div className="space-y-6">
      {/* Blazor Features */}
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center space-x-1 rounded bg-purple-50 px-2 py-1 text-xs text-purple-700 dark:bg-purple-950/50 dark:text-purple-300">
          <FileCode className="h-3 w-3" />
          <span>Razor Syntax</span>
        </div>
        <div className="flex items-center space-x-1 rounded bg-blue-50 px-2 py-1 text-xs text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
          <Server className="h-3 w-3" />
          <span>Server/WASM</span>
        </div>
        <div className="flex items-center space-x-1 rounded bg-green-50 px-2 py-1 text-xs text-green-700 dark:bg-green-950/50 dark:text-green-300">
          <Zap className="h-3 w-3" />
          <span>Two-way Binding</span>
        </div>
        <div className="flex items-center space-x-1 rounded bg-orange-50 px-2 py-1 text-xs text-orange-700 dark:bg-orange-950/50 dark:text-orange-300">
          <Database className="h-3 w-3" />
          <span>Dependency Injection</span>
        </div>
        <div className="flex items-center space-x-1 rounded bg-teal-50 px-2 py-1 text-xs text-teal-700 dark:bg-teal-950/50 dark:text-teal-300">
          <Globe className="h-3 w-3" />
          <span>SignalR</span>
        </div>
      </div>

      {/* Blazor Hosting Models */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/20">
          <div className="mb-2 flex items-center space-x-2">
            <Server className="h-4 w-4 text-blue-600" />
            <h5 className="font-medium text-blue-800 dark:text-blue-200">
              Blazor Server
            </h5>
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Components run on the server with real-time UI updates via SignalR.
          </p>
          <ul className="mt-2 space-y-1 text-xs text-blue-600 dark:text-blue-400">
            <li>• Small client-side footprint</li>
            <li>• Full .NET runtime on server</li>
            <li>• Real-time communication</li>
          </ul>
        </div>

        <div className="rounded border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/20">
          <div className="mb-2 flex items-center space-x-2">
            <Globe className="h-4 w-4 text-green-600" />
            <h5 className="font-medium text-green-800 dark:text-green-200">
              Blazor WebAssembly
            </h5>
          </div>
          <p className="text-sm text-green-700 dark:text-green-300">
            Components run in the browser using WebAssembly.
          </p>
          <ul className="mt-2 space-y-1 text-xs text-green-600 dark:text-green-400">
            <li>• Client-side execution</li>
            <li>• Offline capabilities</li>
            <li>• Progressive Web App</li>
          </ul>
        </div>
      </div>

      {/* Component Code */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-foreground">Razor Component</h4>
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
              <span>Blazor Setup</span>
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

      {/* NuGet Packages */}
      <div className="space-y-3">
        <h4 className="flex items-center space-x-2 font-medium text-foreground">
          <Package className="h-4 w-4 text-qgba-gold" />
          <span>NuGet Packages</span>
        </h4>

        <div className="grid grid-cols-1 gap-3">
          {generatedCode.dependencies.map((dep, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded border border-border bg-card p-3"
            >
              <div className="flex items-center space-x-2">
                <Package className="h-4 w-4 text-purple-500" />
                <code className="font-mono text-sm text-foreground">{dep}</code>
              </div>
              <ExternalLink className="h-3 w-3 text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>

      {/* Blazor Features */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Blazor Features</h4>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded border border-border bg-card p-4">
            <h5 className="mb-2 font-medium text-foreground">
              Component Model
            </h5>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Component parameters</li>
              <li>• Event callbacks</li>
              <li>• Child content</li>
              <li>• Cascading parameters</li>
            </ul>
          </div>

          <div className="rounded border border-border bg-card p-4">
            <h5 className="mb-2 font-medium text-foreground">Data Binding</h5>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• One-way binding (@)</li>
              <li>• Two-way binding (@bind)</li>
              <li>• Event binding (@onclick)</li>
              <li>• Attribute binding</li>
            </ul>
          </div>

          <div className="rounded border border-border bg-card p-4">
            <h5 className="mb-2 font-medium text-foreground">Lifecycle</h5>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• OnInitialized</li>
              <li>• OnParametersSet</li>
              <li>• OnAfterRender</li>
              <li>• Dispose</li>
            </ul>
          </div>

          <div className="rounded border border-border bg-card p-4">
            <h5 className="mb-2 font-medium text-foreground">Services</h5>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Dependency injection</li>
              <li>• HTTP client</li>
              <li>• Navigation manager</li>
              <li>• JavaScript interop</li>
            </ul>
          </div>
        </div>
      </div>

      {/* C# Language Features */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">C# Language Features</h4>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded border border-border bg-card p-3">
            <h6 className="mb-1 text-sm font-medium text-foreground">
              Strong Typing
            </h6>
            <p className="text-xs text-muted-foreground">
              Compile-time type safety
            </p>
          </div>

          <div className="rounded border border-border bg-card p-3">
            <h6 className="mb-1 text-sm font-medium text-foreground">LINQ</h6>
            <p className="text-xs text-muted-foreground">
              Powerful query expressions
            </p>
          </div>

          <div className="rounded border border-border bg-card p-3">
            <h6 className="mb-1 text-sm font-medium text-foreground">
              Async/Await
            </h6>
            <p className="text-xs text-muted-foreground">
              Asynchronous programming
            </p>
          </div>

          <div className="rounded border border-border bg-card p-3">
            <h6 className="mb-1 text-sm font-medium text-foreground">
              Records
            </h6>
            <p className="text-xs text-muted-foreground">
              Immutable data types
            </p>
          </div>

          <div className="rounded border border-border bg-card p-3">
            <h6 className="mb-1 text-sm font-medium text-foreground">
              Pattern Matching
            </h6>
            <p className="text-xs text-muted-foreground">
              Advanced switch expressions
            </p>
          </div>

          <div className="rounded border border-border bg-card p-3">
            <h6 className="mb-1 text-sm font-medium text-foreground">
              Nullable Reference Types
            </h6>
            <p className="text-xs text-muted-foreground">Null safety</p>
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
          Blazor Best Practices
        </h5>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>• Use component parameters for data passing</p>
          <p>• Implement proper disposal for subscriptions</p>
          <p>• Use EventCallback for parent-child communication</p>
          <p>• Leverage dependency injection for services</p>
          <p>• Optimize rendering with ShouldRender override</p>
          <p>• Use StateHasChanged judiciously</p>
        </div>
      </div>
    </div>
  );
}
