'use client';

import React, { useState } from 'react';
import { CodeBlock, CopyButton, InlineCode } from '@/components/ui';

const sampleCode = `import React from 'react';
import { useState } from 'react';

const Button = ({ children, onClick, variant = 'primary' }) => {
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50'
  };

  return (
    <button
      className={\`\${baseClasses} \${variantClasses[variant]}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;`;

const cssCode = `.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
}

.button--primary {
  background-color: #3b82f6;
  color: white;
}

.button--primary:hover {
  background-color: #2563eb;
}`;

const jsonCode = `{
  "name": "polaris-ui-explorer",
  "version": "1.0.0",
  "description": "UI component explorer for the Qatar GBA design system",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "react": "^18.0.0",
    "lucide-react": "^0.544.0",
    "tailwindcss": "^3.4.1"
  }
}`;

export default function TestCopyPage() {
  const [copiedText, setCopiedText] = useState<string>('');

  const handleCopySuccess = () => {
    setCopiedText('Copy successful!');
    console.log('Copy successful!');
  };

  const handleCopyError = (error: string) => {
    console.error('Copy failed:', error);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground">
            Copy-to-Clipboard Functionality Test
          </h1>
          <p className="text-muted-foreground">
            Test the copy functionality across different components and content
            types.
          </p>
        </div>

        {/* Copy Button Tests */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            Copy Buttons
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-border p-4">
              <h3 className="mb-2 font-medium">Default Button</h3>
              <CopyButton
                text="Hello, World!"
                onCopySuccess={handleCopySuccess}
                onCopyError={handleCopyError}
              />
            </div>

            <div className="rounded-lg border border-border p-4">
              <h3 className="mb-2 font-medium">Ghost Variant</h3>
              <CopyButton
                text="This is a ghost button test"
                variant="ghost"
                onCopySuccess={handleCopySuccess}
                onCopyError={handleCopyError}
              />
            </div>

            <div className="rounded-lg border border-border p-4">
              <h3 className="mb-2 font-medium">Large Size</h3>
              <CopyButton
                text="Large copy button with more text content to test"
                size="lg"
                onCopySuccess={handleCopySuccess}
                onCopyError={handleCopyError}
              />
            </div>
          </div>
        </section>

        {/* CodeBlock Tests */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            Code Blocks
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="mb-2 font-medium">React Component</h3>
              <CodeBlock
                code={sampleCode}
                language="tsx"
                filename="Button.tsx"
                showLineNumbers={false}
                onCopySuccess={handleCopySuccess}
                onCopyError={handleCopyError}
              />
            </div>

            <div>
              <h3 className="mb-2 font-medium">CSS Styles (Compact)</h3>
              <CodeBlock
                code={cssCode}
                language="css"
                filename="button.css"
                compact={true}
                onCopySuccess={handleCopySuccess}
                onCopyError={handleCopyError}
              />
            </div>

            <div>
              <h3 className="mb-2 font-medium">JSON Configuration</h3>
              <CodeBlock
                code={jsonCode}
                language="json"
                filename="package.json"
                showLineNumbers={true}
                copyButtonPosition="top-left"
                onCopySuccess={handleCopySuccess}
                onCopyError={handleCopyError}
              />
            </div>
          </div>
        </section>

        {/* Inline Code Tests */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            Inline Code
          </h2>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p>
              Use the <InlineCode copyable>useState</InlineCode> hook to manage
              component state. You can also copy npm commands like{' '}
              <InlineCode copyable>npm install react</InlineCode> directly.
            </p>
            <p>
              For environment variables, use{' '}
              <InlineCode copyable>process.env.NODE_ENV</InlineCode>. File paths
              like{' '}
              <InlineCode copyable>/src/components/ui/Button.tsx</InlineCode>{' '}
              are also copyable.
            </p>
          </div>
        </section>

        {/* Test Results */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            Test Results
          </h2>
          <div className="rounded-lg bg-muted p-4">
            <h3 className="mb-2 font-medium">Testing Instructions:</h3>
            <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
              <li>Click on any copy button or code block copy icon</li>
              <li>Check that the icon changes from copy to checkmark</li>
              <li>Verify the tooltip updates to "Copied!"</li>
              <li>Paste the content elsewhere to confirm it was copied</li>
              <li>Check the browser console for success/error logs</li>
              <li>
                Test with different browsers (Chrome, Firefox, Safari, Edge)
              </li>
              <li>Test on mobile devices if available</li>
              <li>Verify toast notifications appear (if implemented)</li>
            </ol>
          </div>

          {copiedText && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/10">
              <h4 className="font-medium text-green-900 dark:text-green-100">
                Last Copied Content:
              </h4>
              <pre className="mt-2 whitespace-pre-wrap text-sm text-green-800 dark:text-green-200">
                {copiedText}
              </pre>
            </div>
          )}
        </section>

        {/* Browser Support Info */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            Browser Support
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-border p-4">
              <h3 className="mb-2 font-medium text-green-600">✅ Supported</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>Chrome 66+</li>
                <li>Firefox 63+</li>
                <li>Safari 13.1+</li>
                <li>Edge 79+</li>
                <li>Opera 53+</li>
              </ul>
            </div>
            <div className="rounded-lg border border-border p-4">
              <h3 className="mb-2 font-medium text-yellow-600">⚠️ Fallback</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>Older browsers: Shows error message</li>
                <li>HTTP contexts: May not work</li>
                <li>Some mobile browsers: Limited support</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
