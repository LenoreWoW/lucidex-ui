'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { CopyIcon } from './CopyButton';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
  showLineNumbers?: boolean;
  theme?: 'light' | 'dark' | 'auto';
  compact?: boolean;
  showCopyButton?: boolean;
  copyButtonPosition?: 'top-right' | 'top-left' | 'bottom-right';
  onCopySuccess?: () => void;
  onCopyError?: (error: string) => void;
}

export function CodeBlock({
  code,
  language = 'tsx',
  filename,
  className,
  showLineNumbers = false,
  theme = 'auto',
  compact = false,
  showCopyButton = true,
  copyButtonPosition = 'top-right',
  onCopySuccess,
  onCopyError,
}: CodeBlockProps) {
  const lines = code.split('\n');

  const themeClasses = {
    light: 'bg-gray-50 text-gray-900 border-gray-200',
    dark: 'bg-gray-900 text-gray-100 border-gray-700',
    auto: 'bg-muted text-foreground border-border',
  };

  const languageColors = {
    tsx: 'text-blue-600 dark:text-blue-400',
    jsx: 'text-blue-600 dark:text-blue-400',
    typescript: 'text-blue-600 dark:text-blue-400',
    javascript: 'text-yellow-600 dark:text-yellow-400',
    css: 'text-purple-600 dark:text-purple-400',
    html: 'text-orange-600 dark:text-orange-400',
    json: 'text-green-600 dark:text-green-400',
    bash: 'text-gray-600 dark:text-gray-400',
    shell: 'text-gray-600 dark:text-gray-400',
  };

  const copyButtonPositionClasses = {
    'top-right': 'top-2 right-2',
    'top-left': 'top-2 left-2',
    'bottom-right': 'bottom-2 right-2',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg border',
        themeClasses[theme],
        className
      )}
    >
      {/* Header with filename and language */}
      {(filename || language) && (
        <div
          className={cn(
            'flex items-center justify-between border-b px-4 py-2',
            'bg-muted/50 dark:bg-muted/30',
            compact && 'px-3 py-1.5'
          )}
        >
          <div className="flex items-center gap-2">
            {filename && (
              <span className="text-sm font-medium text-foreground">
                {filename}
              </span>
            )}
            {language && (
              <span
                className={cn(
                  'rounded-md px-2 py-0.5 text-xs font-medium uppercase',
                  'bg-accent/50 text-accent-foreground',
                  languageColors[language as keyof typeof languageColors] ||
                    'text-muted-foreground'
                )}
              >
                {language}
              </span>
            )}
          </div>

          {showCopyButton && copyButtonPosition !== 'top-right' && (
            <CopyIcon
              text={code}
              size="sm"
              {...(onCopySuccess && { onCopySuccess })}
              {...(onCopyError && { onCopyError })}
            />
          )}
        </div>
      )}

      {/* Code content */}
      <div className="relative">
        <pre
          className={cn(
            'overflow-x-auto p-4 font-mono text-sm leading-relaxed',
            compact && 'p-3 text-xs leading-normal',
            showLineNumbers && 'pl-12'
          )}
        >
          {showLineNumbers ? (
            <code className="block">
              {lines.map((line, index) => (
                <div key={index} className="flex">
                  <span className="absolute left-0 w-8 select-none text-right text-muted-foreground/60">
                    {index + 1}
                  </span>
                  <span className="flex-1">{line}</span>
                </div>
              ))}
            </code>
          ) : (
            <code className="text-current">{code}</code>
          )}
        </pre>

        {/* Copy button overlay */}
        {showCopyButton && (
          <div
            className={cn(
              'absolute z-10',
              copyButtonPositionClasses[copyButtonPosition]
            )}
          >
            <CopyIcon
              text={code}
              size="sm"
              className="opacity-60 transition-opacity hover:opacity-100"
              {...(onCopySuccess && { onCopySuccess })}
              {...(onCopyError && { onCopyError })}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// Inline code snippet component
export function InlineCode({
  children,
  className,
  copyable = false,
}: {
  children: React.ReactNode;
  className?: string;
  copyable?: boolean;
}) {
  const text = typeof children === 'string' ? children : '';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md bg-muted px-1.5 py-0.5',
        'font-mono text-sm text-foreground',
        className
      )}
    >
      <code>{children}</code>
      {copyable && text && (
        <CopyIcon
          text={text}
          size="sm"
          className="ml-1 opacity-60 transition-opacity hover:opacity-100"
        />
      )}
    </span>
  );
}

// Syntax highlighting helpers (basic regex-based highlighting)
export function highlightSyntax(
  code: string,
  language: string
): React.ReactNode[] {
  const lines = code.split('\n');

  return lines.map((line, lineIndex) => {
    let highlightedLine: React.ReactNode[] = [];

    if (language === 'tsx' || language === 'jsx' || language === 'typescript') {
      // Basic TypeScript/TSX syntax highlighting
      const parts = line.split(
        /(import|export|const|let|var|function|class|interface|type|return|if|else|for|while|try|catch|finally|async|await|=>|=|{|}|\[|\]|\(|\)|;|,|\.)/g
      );

      parts.forEach((part, partIndex) => {
        if (
          [
            'import',
            'export',
            'const',
            'let',
            'var',
            'function',
            'class',
          ].includes(part)
        ) {
          highlightedLine.push(
            <span key={partIndex} className="text-blue-600 dark:text-blue-400">
              {part}
            </span>
          );
        } else if (['interface', 'type'].includes(part)) {
          highlightedLine.push(
            <span
              key={partIndex}
              className="text-purple-600 dark:text-purple-400"
            >
              {part}
            </span>
          );
        } else if (
          [
            'return',
            'if',
            'else',
            'for',
            'while',
            'try',
            'catch',
            'finally',
          ].includes(part)
        ) {
          highlightedLine.push(
            <span key={partIndex} className="text-pink-600 dark:text-pink-400">
              {part}
            </span>
          );
        } else if (['async', 'await', '=>'].includes(part)) {
          highlightedLine.push(
            <span
              key={partIndex}
              className="text-indigo-600 dark:text-indigo-400"
            >
              {part}
            </span>
          );
        } else if (['{', '}', '[', ']', '(', ')'].includes(part)) {
          highlightedLine.push(
            <span key={partIndex} className="text-gray-600 dark:text-gray-400">
              {part}
            </span>
          );
        } else {
          highlightedLine.push(<span key={partIndex}>{part}</span>);
        }
      });
    } else {
      highlightedLine = [line];
    }

    return (
      <div key={lineIndex} className="block">
        {highlightedLine}
      </div>
    );
  });
}

// Enhanced CodeBlock with syntax highlighting
export function HighlightedCodeBlock(props: CodeBlockProps) {
  const { code, language = 'tsx', ...rest } = props;

  return <CodeBlock {...rest} code={code} language={language} />;
}
