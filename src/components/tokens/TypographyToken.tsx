'use client';

import { DesignToken, getTokenValue } from '@/lib/token-ingestion';

interface TypographyTokenProps {
  token: DesignToken;
  showLabel?: boolean;
}

export function TypographyToken({
  token,
  showLabel = true,
}: TypographyTokenProps) {
  const value = getTokenValue(token);

  const getPixelValue = (): string => {
    if (typeof token.value === 'object' && token.value && 'px' in token.value) {
      return token.value.px as string;
    }
    return value;
  };

  const getLineHeight = (): string => {
    if (
      typeof token.value === 'object' &&
      token.value &&
      'lineHeight' in token.value
    ) {
      return token.value.lineHeight as string;
    }
    return '';
  };

  // Determine the token type based on category for different displays
  const isFont = token.category.includes('font');
  const isFontSize = token.category === 'font-size';
  const isFontWeight = token.category === 'font-weight';
  const isFontFamily = token.category === 'font-family';
  const isLineHeight = token.category === 'line-height';

  const renderPreview = () => {
    if (isFontFamily) {
      return (
        <div className="space-y-2">
          <div
            className="rounded-md border bg-card p-3 text-lg leading-relaxed"
            style={{ fontFamily: value }}
          >
            The quick brown fox jumps over the lazy dog
          </div>
          <div className="font-mono text-sm text-muted-foreground">{value}</div>
        </div>
      );
    }

    if (isFontSize) {
      return (
        <div className="space-y-2">
          <div
            className="rounded-md border bg-card p-2 leading-tight"
            style={{
              fontSize: value,
              lineHeight: getLineHeight() || 'normal',
            }}
          >
            Sample text at {token.name.toLowerCase()}
          </div>
          <div className="flex gap-2 font-mono text-sm text-muted-foreground">
            <span>{getPixelValue()}</span>
            {getLineHeight() && (
              <>
                <span>•</span>
                <span>LH: {getLineHeight()}</span>
              </>
            )}
          </div>
        </div>
      );
    }

    if (isFontWeight) {
      return (
        <div className="space-y-2">
          <div
            className="rounded-md border bg-card p-3 text-lg leading-relaxed"
            style={{ fontWeight: value }}
          >
            Font weight example text
          </div>
          <div className="font-mono text-sm text-muted-foreground">{value}</div>
        </div>
      );
    }

    if (isLineHeight) {
      return (
        <div className="space-y-2">
          <div
            className="rounded-md border bg-card p-3 text-base"
            style={{ lineHeight: value }}
          >
            This is a sample paragraph to demonstrate line height. It contains
            multiple lines of text so you can see how the line height affects
            the vertical spacing between lines.
          </div>
          <div className="font-mono text-sm text-muted-foreground">{value}</div>
        </div>
      );
    }

    // Default fallback
    return (
      <div className="space-y-2">
        <div className="rounded-md border bg-card p-3 text-base leading-relaxed">
          Sample typography
        </div>
        <div className="font-mono text-sm text-muted-foreground">{value}</div>
      </div>
    );
  };

  return (
    <div className="space-y-3">
      {showLabel && (
        <div>
          <div className="text-sm font-medium">{token.name}</div>
          <div className="text-xs text-muted-foreground">
            {token.description}
          </div>
        </div>
      )}

      {renderPreview()}

      {/* CSS Classes Examples */}
      <div className="space-y-2">
        <div className="text-xs font-medium text-muted-foreground">
          Usage Examples
        </div>
        <div className="space-y-1 rounded bg-muted/30 p-3 font-mono text-xs">
          {isFontFamily && <div>font-family: {value}</div>}
          {isFontSize && (
            <>
              <div>font-size: {value}</div>
              {getLineHeight() && <div>line-height: {getLineHeight()}</div>}
            </>
          )}
          {isFontWeight && <div>font-weight: {value}</div>}
          {isLineHeight && <div>line-height: {value}</div>}
        </div>
      </div>
    </div>
  );
}
