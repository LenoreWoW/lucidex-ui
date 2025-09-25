'use client';

import { DesignToken, getTokenValue } from '@/lib/token-ingestion';

interface SpacingTokenProps {
  token: DesignToken;
  showLabel?: boolean;
  orientation?: 'horizontal' | 'vertical' | 'both';
}

export function SpacingToken({
  token,
  showLabel = true,
  orientation = 'horizontal',
}: SpacingTokenProps) {
  const spacingValue = getTokenValue(token);

  // Get pixel value if available
  const getPixelValue = (): string => {
    if (typeof token.value === 'object' && token.value && 'px' in token.value) {
      return token.value.px as string;
    }
    return spacingValue;
  };

  const getRemainingValue = (): string => {
    if (
      typeof token.value === 'object' &&
      token.value &&
      'rem' in token.value
    ) {
      return token.value.rem as string;
    }
    return spacingValue;
  };

  return (
    <div className="space-y-3">
      {showLabel && (
        <div>
          <div className="text-sm font-medium">{token.name}</div>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div className="font-mono">{getPixelValue()}</div>
            <div className="font-mono text-muted-foreground/70">
              {getRemainingValue()}
            </div>
          </div>
        </div>
      )}

      {/* Visual representation */}
      <div className="space-y-2">
        {(orientation === 'horizontal' || orientation === 'both') && (
          <div className="space-y-1">
            <div className="text-xs font-medium text-muted-foreground">
              Horizontal
            </div>
            <div className="flex items-center rounded bg-muted/30 p-2">
              <div
                className="h-6 flex-shrink-0 border-l-2 border-primary bg-primary/20"
                style={{ width: spacingValue }}
              />
              <div className="ml-2 font-mono text-xs text-muted-foreground">
                {getPixelValue()}
              </div>
            </div>
          </div>
        )}

        {(orientation === 'vertical' || orientation === 'both') && (
          <div className="space-y-1">
            <div className="text-xs font-medium text-muted-foreground">
              Vertical
            </div>
            <div className="flex rounded bg-muted/30 p-2">
              <div
                className="w-6 flex-shrink-0 border-t-2 border-primary bg-primary/20"
                style={{ height: spacingValue }}
              />
              <div className="ml-2 self-center font-mono text-xs text-muted-foreground">
                {getPixelValue()}
              </div>
            </div>
          </div>
        )}

        {/* Padding/Margin preview */}
        <div className="space-y-1">
          <div className="text-xs font-medium text-muted-foreground">
            As Padding
          </div>
          <div className="rounded bg-muted/30">
            <div
              className="flex min-h-[2rem] items-center justify-center border-2 border-dashed border-primary/30 bg-primary/10 text-xs text-muted-foreground"
              style={{ padding: spacingValue }}
            >
              Content with {getPixelValue()} padding
            </div>
          </div>
        </div>

        {/* Margin preview */}
        <div className="space-y-1">
          <div className="text-xs font-medium text-muted-foreground">
            As Margin
          </div>
          <div className="rounded bg-muted/30 p-2">
            <div
              className="flex min-h-[2rem] w-16 items-center justify-center border-2 border-dashed border-primary/30 bg-primary/10 text-xs text-muted-foreground"
              style={{ margin: spacingValue }}
            >
              Element
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
