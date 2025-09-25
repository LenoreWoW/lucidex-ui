'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface CodeExampleProps {
  title?: string;
  language: string;
  code: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  className?: string;
}

export function CodeExample({
  title,
  language,
  code,
  showLineNumbers = true,
  highlightLines = [],
  className = '',
}: CodeExampleProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  return (
    <div className={`mb-6 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 ${className}`}>
      {title && (
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-800 dark:bg-gray-800">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
            {title}
          </h4>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {language}
            </span>
            <CopyToClipboard text={code} onCopy={handleCopy}>
              <button className="flex items-center space-x-1 rounded px-2 py-1 text-xs text-gray-600 transition-colors hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700">
                {isCopied ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
                <span>{isCopied ? 'Copied!' : 'Copy'}</span>
              </button>
            </CopyToClipboard>
          </div>
        </div>
      )}

      <div className="relative">
        <pre className="overflow-x-auto bg-gray-900 p-4 text-sm">
          <code className={`language-${language}`}>
            {showLineNumbers ? (
              lines.map((line, index) => {
                const lineNumber = index + 1;
                const isHighlighted = highlightLines.includes(lineNumber);

                return (
                  <div
                    key={index}
                    className={`flex ${
                      isHighlighted
                        ? 'bg-blue-500/20 dark:bg-blue-500/30'
                        : ''
                    }`}
                  >
                    <span className="mr-4 select-none text-gray-500 dark:text-gray-400">
                      {lineNumber.toString().padStart(3, ' ')}
                    </span>
                    <span className="text-gray-100">
                      {line || ' '}
                    </span>
                  </div>
                );
              })
            ) : (
              <span className="text-gray-100">{code}</span>
            )}
          </code>
        </pre>

        {!title && (
          <div className="absolute right-2 top-2">
            <CopyToClipboard text={code} onCopy={handleCopy}>
              <button className="flex items-center space-x-1 rounded bg-gray-800/50 px-2 py-1 text-xs text-gray-300 backdrop-blur-sm transition-colors hover:bg-gray-800/75">
                {isCopied ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
                <span>{isCopied ? 'Copied!' : 'Copy'}</span>
              </button>
            </CopyToClipboard>
          </div>
        )}
      </div>
    </div>
  );
}