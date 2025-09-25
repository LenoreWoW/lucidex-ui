'use client';

import React, { useMemo } from 'react';
import { Component, GeneratedCode } from '@/types';
import { CodeBlock, useCopySuccessToast } from '@/components/ui';
import { generateTypeScriptCode } from '@/lib/code-generators';
import {
  Package,
  Download,
  ExternalLink,
  Type,
  Shield,
  Zap,
  Code,
  FileText,
} from 'lucide-react';

interface TypeScriptRendererProps {
  component: Component;
  onCodeGenerated?: (code: GeneratedCode) => void;
}

export function TypeScriptRenderer({
  component,
  onCodeGenerated,
}: TypeScriptRendererProps) {
  const showCopySuccess = useCopySuccessToast();

  const generatedCode = useMemo(() => {
    const code = generateTypeScriptCode(component, {
      includeProps: true,
      includeTypes: true,
      includeComments: true,
      includeImports: true,
      typescript: true, // Always true for TypeScript
    });

    onCodeGenerated?.(code);
    return code;
  }, [component, onCodeGenerated]);

  const codeLines = generatedCode.code.split('\n');
  const interfaceCount = (generatedCode.code.match(/interface\s+/g) || [])
    .length;
  const typeCount = (generatedCode.code.match(/type\s+\w+\s*=/g) || []).length;
  const functionCount = (generatedCode.code.match(/function\s+\w+/g) || [])
    .length;
  const constantCount = (generatedCode.code.match(/const\s+\w+/g) || []).length;

  return (
    <div className="space-y-6">
      {/* TypeScript Features */}
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center space-x-1 rounded bg-blue-50 px-2 py-1 text-xs text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
          <Type className="h-3 w-3" />
          <span>Strong Typing</span>
        </div>
        <div className="flex items-center space-x-1 rounded bg-green-50 px-2 py-1 text-xs text-green-700 dark:bg-green-950/50 dark:text-green-300">
          <Shield className="h-3 w-3" />
          <span>Type Safety</span>
        </div>
        <div className="flex items-center space-x-1 rounded bg-purple-50 px-2 py-1 text-xs text-purple-700 dark:bg-purple-950/50 dark:text-purple-300">
          <Code className="h-3 w-3" />
          <span>IntelliSense</span>
        </div>
        <div className="flex items-center space-x-1 rounded bg-orange-50 px-2 py-1 text-xs text-orange-700 dark:bg-orange-950/50 dark:text-orange-300">
          <Zap className="h-3 w-3" />
          <span>Compile-time Checks</span>
        </div>
      </div>

      {/* Type Definitions Overview */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/20">
          <div className="mb-1 flex items-center justify-between">
            <FileText className="h-4 w-4 text-blue-600" />
            <span className="text-lg font-semibold text-blue-700 dark:text-blue-300">
              {interfaceCount}
            </span>
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400">
            Interfaces
          </div>
        </div>

        <div className="rounded border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/20">
          <div className="mb-1 flex items-center justify-between">
            <Type className="h-4 w-4 text-green-600" />
            <span className="text-lg font-semibold text-green-700 dark:text-green-300">
              {typeCount}
            </span>
          </div>
          <div className="text-xs text-green-600 dark:text-green-400">
            Type Aliases
          </div>
        </div>

        <div className="rounded border border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-950/20">
          <div className="mb-1 flex items-center justify-between">
            <Code className="h-4 w-4 text-purple-600" />
            <span className="text-lg font-semibold text-purple-700 dark:text-purple-300">
              {functionCount}
            </span>
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-400">
            Helper Functions
          </div>
        </div>

        <div className="rounded border border-orange-200 bg-orange-50 p-4 dark:border-orange-800 dark:bg-orange-950/20">
          <div className="mb-1 flex items-center justify-between">
            <Zap className="h-4 w-4 text-orange-600" />
            <span className="text-lg font-semibold text-orange-700 dark:text-orange-300">
              {constantCount}
            </span>
          </div>
          <div className="text-xs text-orange-600 dark:text-orange-400">
            Constants
          </div>
        </div>
      </div>

      {/* Component Code */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-foreground">
            TypeScript Definitions
          </h4>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">
              {generatedCode.filename}
            </span>
            <span className="text-xs text-muted-foreground">
              {codeLines.length} lines
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
              <span>TypeScript Setup</span>
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

        <div className="grid grid-cols-1 gap-3">
          {generatedCode.dependencies.map((dep, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded border border-border bg-card p-3"
            >
              <div className="flex items-center space-x-2">
                <Type className="h-4 w-4 text-blue-500" />
                <code className="font-mono text-sm text-foreground">{dep}</code>
              </div>
              <ExternalLink className="h-3 w-3 text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>

      {/* TypeScript Features */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">TypeScript Features</h4>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded border border-border bg-card p-4">
            <h5 className="mb-2 font-medium text-foreground">Type System</h5>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Interface definitions</li>
              <li>• Type aliases</li>
              <li>• Union types</li>
              <li>• Generic constraints</li>
            </ul>
          </div>

          <div className="rounded border border-border bg-card p-4">
            <h5 className="mb-2 font-medium text-foreground">Utility Types</h5>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Partial&lt;T&gt;</li>
              <li>• Pick&lt;T, K&gt;</li>
              <li>• Omit&lt;T, K&gt;</li>
              <li>• Record&lt;K, T&gt;</li>
            </ul>
          </div>

          <div className="rounded border border-border bg-card p-4">
            <h5 className="mb-2 font-medium text-foreground">Advanced Types</h5>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Conditional types</li>
              <li>• Mapped types</li>
              <li>• Template literals</li>
              <li>• Index signatures</li>
            </ul>
          </div>

          <div className="rounded border border-border bg-card p-4">
            <h5 className="mb-2 font-medium text-foreground">Validation</h5>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Type guards</li>
              <li>• Runtime validation</li>
              <li>• Schema validation</li>
              <li>• Error handling</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Compiler Options */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">
          Recommended tsconfig.json
        </h4>
        <CodeBlock
          code={`{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}`}
          language="json"
          filename="tsconfig.json"
          onCopySuccess={showCopySuccess}
          compact={true}
        />
      </div>

      {/* Framework Integration */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Framework Integration</h4>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded border border-border bg-card p-3">
            <h6 className="mb-1 text-sm font-medium text-foreground">React</h6>
            <p className="text-xs text-muted-foreground">
              Component props, JSX types
            </p>
          </div>

          <div className="rounded border border-border bg-card p-3">
            <h6 className="mb-1 text-sm font-medium text-foreground">Vue</h6>
            <p className="text-xs text-muted-foreground">
              Composition API, ref types
            </p>
          </div>

          <div className="rounded border border-border bg-card p-3">
            <h6 className="mb-1 text-sm font-medium text-foreground">
              Angular
            </h6>
            <p className="text-xs text-muted-foreground">
              Component metadata, services
            </p>
          </div>

          <div className="rounded border border-border bg-card p-3">
            <h6 className="mb-1 text-sm font-medium text-foreground">
              Node.js
            </h6>
            <p className="text-xs text-muted-foreground">
              Express types, middleware
            </p>
          </div>

          <div className="rounded border border-border bg-card p-3">
            <h6 className="mb-1 text-sm font-medium text-foreground">
              Next.js
            </h6>
            <p className="text-xs text-muted-foreground">
              Page props, API routes
            </p>
          </div>

          <div className="rounded border border-border bg-card p-3">
            <h6 className="mb-1 text-sm font-medium text-foreground">Svelte</h6>
            <p className="text-xs text-muted-foreground">
              Component types, stores
            </p>
          </div>
        </div>
      </div>

      {/* Development Tools */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Development Tools</h4>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded border border-border bg-card p-4">
            <h5 className="mb-2 font-medium text-foreground">IDE Support</h5>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• IntelliSense</li>
              <li>• Auto-completion</li>
              <li>• Error highlighting</li>
              <li>• Refactoring tools</li>
            </ul>
          </div>

          <div className="rounded border border-border bg-card p-4">
            <h5 className="mb-2 font-medium text-foreground">Build Tools</h5>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Type checking</li>
              <li>• Declaration files</li>
              <li>• Source maps</li>
              <li>• Bundle analysis</li>
            </ul>
          </div>

          <div className="rounded border border-border bg-card p-4">
            <h5 className="mb-2 font-medium text-foreground">Testing</h5>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Jest types</li>
              <li>• Testing Library</li>
              <li>• Mock types</li>
              <li>• Type coverage</li>
            </ul>
          </div>

          <div className="rounded border border-border bg-card p-4">
            <h5 className="mb-2 font-medium text-foreground">Linting</h5>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• ESLint TypeScript</li>
              <li>• Prettier integration</li>
              <li>• Type-aware rules</li>
              <li>• Import sorting</li>
            </ul>
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
          TypeScript Best Practices
        </h5>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>• Use strict mode for maximum type safety</p>
          <p>• Prefer interfaces over type aliases for object shapes</p>
          <p>• Use generic constraints to create flexible yet safe APIs</p>
          <p>• Implement proper error handling with typed exceptions</p>
          <p>• Document complex types with JSDoc comments</p>
          <p>• Use utility types to derive new types from existing ones</p>
        </div>
      </div>
    </div>
  );
}
