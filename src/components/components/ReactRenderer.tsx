'use client';

import React, { useMemo } from 'react';
import { Component, GeneratedCode } from '@/types';
import { CodeBlock, useCopySuccessToast } from '@/components/ui';
import { generateReactCode } from '@/lib/code-generators';
import {
  Package,
  Download,
  ExternalLink,
  Zap,
  Shield,
  Code,
} from 'lucide-react';

interface ReactRendererProps {
  component: Component;
  onCodeGenerated?: (code: GeneratedCode) => void;
}

export function ReactRenderer({
  component,
  onCodeGenerated,
}: ReactRendererProps) {
  const showCopySuccess = useCopySuccessToast();

  const generatedCode = useMemo(() => {
    const code = generateReactCode(component, {
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

  return (
    <div className="space-y-6">
      {/* React Features */}
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center space-x-1 rounded bg-blue-50 px-2 py-1 text-xs text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
          <Zap className="h-3 w-3" />
          <span>Hooks</span>
        </div>
        <div className="flex items-center space-x-1 rounded bg-green-50 px-2 py-1 text-xs text-green-700 dark:bg-green-950/50 dark:text-green-300">
          <Shield className="h-3 w-3" />
          <span>TypeScript</span>
        </div>
        <div className="flex items-center space-x-1 rounded bg-purple-50 px-2 py-1 text-xs text-purple-700 dark:bg-purple-950/50 dark:text-purple-300">
          <Code className="h-3 w-3" />
          <span>React.memo</span>
        </div>
        <div className="flex items-center space-x-1 rounded bg-orange-50 px-2 py-1 text-xs text-orange-700 dark:bg-orange-950/50 dark:text-orange-300">
          <Package className="h-3 w-3" />
          <span>forwardRef</span>
        </div>
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
              <span>Installation & Setup</span>
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

      {/* React Optimizations */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">React Optimizations</h4>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded border border-border bg-card p-4">
            <h5 className="mb-2 font-medium text-foreground">Performance</h5>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• React.memo for component memoization</li>
              <li>• forwardRef for ref forwarding</li>
              <li>• Optimized re-renders</li>
            </ul>
          </div>

          <div className="rounded border border-border bg-card p-4">
            <h5 className="mb-2 font-medium text-foreground">Development</h5>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• TypeScript for type safety</li>
              <li>• PropTypes validation</li>
              <li>• Component composition</li>
            </ul>
          </div>

          <div className="rounded border border-border bg-card p-4">
            <h5 className="mb-2 font-medium text-foreground">Styling</h5>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Tailwind CSS utilities</li>
              <li>• CSS-in-JS support</li>
              <li>• Theme customization</li>
            </ul>
          </div>

          <div className="rounded border border-border bg-card p-4">
            <h5 className="mb-2 font-medium text-foreground">Testing</h5>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• React Testing Library</li>
              <li>• Jest unit tests</li>
              <li>• Accessibility testing</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="rounded border border-qgba-gold/20 bg-qgba-gold/5 p-4">
        <h5 className="mb-2 font-medium text-foreground">
          React Best Practices
        </h5>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>• Use functional components with hooks</p>
          <p>• Implement proper error boundaries</p>
          <p>• Follow the single responsibility principle</p>
          <p>• Use custom hooks for reusable logic</p>
          <p>• Optimize bundle size with tree shaking</p>
        </div>
      </div>
    </div>
  );
}
