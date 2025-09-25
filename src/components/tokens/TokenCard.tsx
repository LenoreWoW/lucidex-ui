'use client';

import { useState } from 'react';
import { Copy, Check, Eye, Code } from 'lucide-react';
import {
  DesignToken,
  getCSSVariable,
  getTokenValue,
} from '@/lib/token-ingestion';
import { ColorToken } from './ColorToken';
import { SpacingToken } from './SpacingToken';
import { TypographyToken } from './TypographyToken';
import { ShadowToken } from './ShadowToken';
import { BorderRadiusToken } from './BorderRadiusToken';
import { useTheme } from 'next-themes';

interface TokenCardProps {
  token: DesignToken;
  tokenKey: string;
  category: string;
  showCategory?: boolean;
}

export function TokenCard({
  token,
  tokenKey,
  category,
  showCategory = false,
}: TokenCardProps) {
  const [copiedVariable, setCopiedVariable] = useState(false);
  const [copiedValue, setCopiedValue] = useState(false);
  const [showUsage, setShowUsage] = useState(false);
  const { theme } = useTheme();
  const currentTheme = (theme as 'light' | 'dark') || 'light';

  const copyToClipboard = async (text: string, type: 'variable' | 'value') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'variable') {
        setCopiedVariable(true);
        setTimeout(() => setCopiedVariable(false), 2000);
      } else {
        setCopiedValue(true);
        setTimeout(() => setCopiedValue(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const cssVariable = getCSSVariable(token);
  const tokenValue = getTokenValue(token, currentTheme);

  const renderTokenPreview = () => {
    if (!token.type) return null;

    switch (token.type) {
      case 'color':
        return <ColorToken token={token} size="lg" showLabel={false} />;
      case 'spacing':
        return <SpacingToken token={token} showLabel={false} />;
      case 'typography':
        return <TypographyToken token={token} showLabel={false} />;
      case 'shadow':
        return <ShadowToken token={token} showLabel={false} />;
      case 'border-radius':
        return <BorderRadiusToken token={token} showLabel={false} />;
      default:
        return null;
    }
  };

  const getUsageExamples = (): { framework: string; code: string }[] => {
    const examples = [];

    // CSS
    examples.push({
      framework: 'CSS',
      code: `/* Using CSS variable */
.my-element {
  ${
    token.type === 'color'
      ? 'color'
      : token.type === 'spacing'
        ? 'padding'
        : token.type === 'shadow'
          ? 'box-shadow'
          : token.type === 'border-radius'
            ? 'border-radius'
            : 'font-size'
  }: ${cssVariable};
}

/* Using direct value */
.my-element {
  ${
    token.type === 'color'
      ? 'color'
      : token.type === 'spacing'
        ? 'padding'
        : token.type === 'shadow'
          ? 'box-shadow'
          : token.type === 'border-radius'
            ? 'border-radius'
            : 'font-size'
  }: ${tokenValue};
}`,
    });

    // Tailwind
    if (token.type === 'color' && token.category === 'brand') {
      examples.push({
        framework: 'Tailwind CSS',
        code: `<!-- Using Tailwind utility -->
<div class="bg-qgba-${tokenKey} text-white">
  Qatar GBA themed content
</div>`,
      });
    }

    // React/JSX
    examples.push({
      framework: 'React/JSX',
      code: `// Using CSS variable
<div style={{ ${
        token.type === 'color'
          ? 'color'
          : token.type === 'spacing'
            ? 'padding'
            : token.type === 'shadow'
              ? 'boxShadow'
              : token.type === 'border-radius'
                ? 'borderRadius'
                : 'fontSize'
      }: '${cssVariable}' }}>
  Content
</div>

// Using direct value
<div style={{ ${
        token.type === 'color'
          ? 'color'
          : token.type === 'spacing'
            ? 'padding'
            : token.type === 'shadow'
              ? 'boxShadow'
              : token.type === 'border-radius'
                ? 'borderRadius'
                : 'fontSize'
      }: '${tokenValue}' }}>
  Content
</div>`,
    });

    return examples;
  };

  return (
    <div className="space-y-4 rounded-lg border bg-card p-6 transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold">{token.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {token.description}
          </p>
          {showCategory && (
            <div className="mt-2 flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
                {category}
              </span>
              <span className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                {token.category}
              </span>
            </div>
          )}
        </div>
        <div className="ml-4 flex items-center gap-2">
          <button
            onClick={() => setShowUsage(!showUsage)}
            className="rounded-md p-2 transition-colors hover:bg-muted"
            title={showUsage ? 'Hide usage examples' : 'Show usage examples'}
          >
            {showUsage ? (
              <Eye className="h-4 w-4" />
            ) : (
              <Code className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Token Preview */}
      <div className="rounded-lg border bg-muted/30 p-4">
        {renderTokenPreview()}
      </div>

      {/* Copy Actions */}
      <div className="flex gap-3">
        <div className="flex-1">
          <div className="mb-2 text-xs font-medium text-muted-foreground">
            CSS Variable
          </div>
          <div className="flex items-center gap-2">
            <code className="flex-1 truncate rounded bg-muted px-3 py-2 font-mono text-sm">
              {cssVariable}
            </code>
            <button
              onClick={() => copyToClipboard(cssVariable, 'variable')}
              className="rounded-md p-2 transition-colors hover:bg-muted"
              title="Copy CSS variable"
            >
              {copiedVariable ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-2 text-xs font-medium text-muted-foreground">
            Value
          </div>
          <div className="flex items-center gap-2">
            <code className="flex-1 truncate rounded bg-muted px-3 py-2 font-mono text-sm">
              {tokenValue}
            </code>
            <button
              onClick={() => copyToClipboard(tokenValue, 'value')}
              className="rounded-md p-2 transition-colors hover:bg-muted"
              title="Copy token value"
            >
              {copiedValue ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      {showUsage && (
        <div className="space-y-4 border-t pt-4">
          <h4 className="text-sm font-medium">Usage Examples</h4>
          {getUsageExamples().map((example, index) => (
            <div key={index} className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground">
                {example.framework}
              </div>
              <pre className="overflow-x-auto rounded bg-muted/60 p-3 text-xs">
                <code>{example.code}</code>
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
