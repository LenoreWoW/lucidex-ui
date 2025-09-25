'use client';

import React, { useMemo } from 'react';
import { Component, GeneratedCode } from '@/types';
import { CodeBlock, useCopySuccessToast } from '@/components/ui';
import { generateHtmlCode } from '@/lib/code-generators';
import {
  Package,
  Download,
  ExternalLink,
  Globe,
  Palette,
  Zap,
  Shield,
  Monitor,
} from 'lucide-react';

interface HTMLRendererProps {
  component: Component;
  onCodeGenerated?: (code: GeneratedCode) => void;
}

export function HTMLRenderer({
  component,
  onCodeGenerated,
}: HTMLRendererProps) {
  const showCopySuccess = useCopySuccessToast();

  const generatedCode = useMemo(() => {
    const code = generateHtmlCode(component, {
      includeProps: true,
      includeTypes: false, // HTML doesn't use types
      includeComments: true,
      includeImports: true,
      styleFramework: 'tailwind',
      typescript: false,
    });

    onCodeGenerated?.(code);
    return code;
  }, [component, onCodeGenerated]);

  const isFullDocument = generatedCode.code.includes('<!DOCTYPE html>');

  return (
    <div className="space-y-6">
      {/* HTML Features */}
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center space-x-1 rounded bg-orange-50 px-2 py-1 text-xs text-orange-700 dark:bg-orange-950/50 dark:text-orange-300">
          <Globe className="h-3 w-3" />
          <span>Semantic HTML</span>
        </div>
        <div className="flex items-center space-x-1 rounded bg-blue-50 px-2 py-1 text-xs text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
          <Palette className="h-3 w-3" />
          <span>Tailwind CSS</span>
        </div>
        <div className="flex items-center space-x-1 rounded bg-green-50 px-2 py-1 text-xs text-green-700 dark:bg-green-950/50 dark:text-green-300">
          <Shield className="h-3 w-3" />
          <span>Accessible</span>
        </div>
        <div className="flex items-center space-x-1 rounded bg-purple-50 px-2 py-1 text-xs text-purple-700 dark:bg-purple-950/50 dark:text-purple-300">
          <Monitor className="h-3 w-3" />
          <span>Responsive</span>
        </div>
        <div className="flex items-center space-x-1 rounded bg-teal-50 px-2 py-1 text-xs text-teal-700 dark:bg-teal-950/50 dark:text-teal-300">
          <Zap className="h-3 w-3" />
          <span>Progressive Enhancement</span>
        </div>
      </div>

      {/* HTML Standards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/20">
          <div className="mb-2 flex items-center space-x-2">
            <Shield className="h-4 w-4 text-green-600" />
            <h5 className="font-medium text-green-800 dark:text-green-200">
              Accessibility
            </h5>
          </div>
          <ul className="space-y-1 text-xs text-green-600 dark:text-green-400">
            <li>• ARIA attributes</li>
            <li>• Semantic markup</li>
            <li>• Screen reader support</li>
            <li>• Keyboard navigation</li>
          </ul>
        </div>

        <div className="rounded border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/20">
          <div className="mb-2 flex items-center space-x-2">
            <Monitor className="h-4 w-4 text-blue-600" />
            <h5 className="font-medium text-blue-800 dark:text-blue-200">
              Responsive
            </h5>
          </div>
          <ul className="space-y-1 text-xs text-blue-600 dark:text-blue-400">
            <li>• Mobile-first design</li>
            <li>• Flexbox/Grid layouts</li>
            <li>• Viewport meta tag</li>
            <li>• Responsive images</li>
          </ul>
        </div>

        <div className="rounded border border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-950/20">
          <div className="mb-2 flex items-center space-x-2">
            <Zap className="h-4 w-4 text-purple-600" />
            <h5 className="font-medium text-purple-800 dark:text-purple-200">
              Performance
            </h5>
          </div>
          <ul className="space-y-1 text-xs text-purple-600 dark:text-purple-400">
            <li>• Minimal JavaScript</li>
            <li>• Critical CSS</li>
            <li>• Optimized images</li>
            <li>• Fast loading</li>
          </ul>
        </div>
      </div>

      {/* Component Code */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-foreground">
            {isFullDocument ? 'HTML Document' : 'HTML Template'}
          </h4>
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
              <span>Setup Instructions</span>
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
              <div className="flex items-center space-x-2">
                <Palette className="h-4 w-4 text-blue-500" />
                <code className="font-mono text-sm text-foreground">{dep}</code>
              </div>
              <ExternalLink className="h-3 w-3 text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>

      {/* Tailwind CSS Features */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Tailwind CSS Features</h4>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded border border-border bg-card p-4">
            <h5 className="mb-2 font-medium text-foreground">
              Utility Classes
            </h5>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Spacing (margin, padding)</li>
              <li>• Typography (fonts, sizes)</li>
              <li>• Colors (background, text)</li>
              <li>• Layout (flexbox, grid)</li>
            </ul>
          </div>

          <div className="rounded border border-border bg-card p-4">
            <h5 className="mb-2 font-medium text-foreground">
              Responsive Design
            </h5>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Breakpoint prefixes</li>
              <li>• Mobile-first approach</li>
              <li>• Container queries</li>
              <li>• Responsive variants</li>
            </ul>
          </div>

          <div className="rounded border border-border bg-card p-4">
            <h5 className="mb-2 font-medium text-foreground">State Variants</h5>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Hover effects</li>
              <li>• Focus states</li>
              <li>• Active states</li>
              <li>• Disabled states</li>
            </ul>
          </div>

          <div className="rounded border border-border bg-card p-4">
            <h5 className="mb-2 font-medium text-foreground">Dark Mode</h5>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Dark variant classes</li>
              <li>• System preference</li>
              <li>• Manual toggle</li>
              <li>• Color scheme support</li>
            </ul>
          </div>
        </div>
      </div>

      {/* HTML5 Features */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">HTML5 Features</h4>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded border border-border bg-card p-3">
            <h6 className="mb-1 text-sm font-medium text-foreground">
              Semantic Elements
            </h6>
            <p className="text-xs text-muted-foreground">
              header, main, section, article
            </p>
          </div>

          <div className="rounded border border-border bg-card p-3">
            <h6 className="mb-1 text-sm font-medium text-foreground">
              Form Controls
            </h6>
            <p className="text-xs text-muted-foreground">
              input types, validation
            </p>
          </div>

          <div className="rounded border border-border bg-card p-3">
            <h6 className="mb-1 text-sm font-medium text-foreground">
              Media Elements
            </h6>
            <p className="text-xs text-muted-foreground">
              audio, video, canvas
            </p>
          </div>

          <div className="rounded border border-border bg-card p-3">
            <h6 className="mb-1 text-sm font-medium text-foreground">APIs</h6>
            <p className="text-xs text-muted-foreground">
              localStorage, geolocation
            </p>
          </div>

          <div className="rounded border border-border bg-card p-3">
            <h6 className="mb-1 text-sm font-medium text-foreground">
              Meta Tags
            </h6>
            <p className="text-xs text-muted-foreground">
              viewport, charset, SEO
            </p>
          </div>

          <div className="rounded border border-border bg-card p-3">
            <h6 className="mb-1 text-sm font-medium text-foreground">
              Progressive Web App
            </h6>
            <p className="text-xs text-muted-foreground">
              manifest, service worker
            </p>
          </div>
        </div>
      </div>

      {/* Browser Compatibility */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Browser Support</h4>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded border border-border bg-card p-3 text-center">
            <div className="text-sm font-medium text-foreground">Chrome</div>
            <div className="text-xs text-green-600 dark:text-green-400">
              ✓ Latest
            </div>
          </div>
          <div className="rounded border border-border bg-card p-3 text-center">
            <div className="text-sm font-medium text-foreground">Firefox</div>
            <div className="text-xs text-green-600 dark:text-green-400">
              ✓ Latest
            </div>
          </div>
          <div className="rounded border border-border bg-card p-3 text-center">
            <div className="text-sm font-medium text-foreground">Safari</div>
            <div className="text-xs text-green-600 dark:text-green-400">
              ✓ Latest
            </div>
          </div>
          <div className="rounded border border-border bg-card p-3 text-center">
            <div className="text-sm font-medium text-foreground">Edge</div>
            <div className="text-xs text-green-600 dark:text-green-400">
              ✓ Latest
            </div>
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
          HTML Best Practices
        </h5>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>• Use semantic HTML elements for better accessibility</p>
          <p>• Include proper meta tags for SEO and responsive design</p>
          <p>• Optimize images with appropriate formats and sizes</p>
          <p>• Minimize HTTP requests and use efficient CSS</p>
          <p>• Test across different browsers and devices</p>
          <p>• Validate HTML markup for standards compliance</p>
        </div>
      </div>
    </div>
  );
}
