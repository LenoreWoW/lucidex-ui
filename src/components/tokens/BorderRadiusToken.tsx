'use client';

import { DesignToken, getTokenValue } from '@/lib/token-ingestion';

interface BorderRadiusTokenProps {
  token: DesignToken;
  showLabel?: boolean;
}

export function BorderRadiusToken({
  token,
  showLabel = true,
}: BorderRadiusTokenProps) {
  const radiusValue = getTokenValue(token);

  const getPixelValue = (): string => {
    if (typeof token.value === 'object' && token.value && 'px' in token.value) {
      return token.value.px as string;
    }
    return radiusValue;
  };

  const getFallbackValue = (): string => {
    if (
      typeof token.value === 'object' &&
      token.value &&
      'fallback' in token.value
    ) {
      return token.value.fallback as string;
    }
    return '';
  };

  return (
    <div className="space-y-3">
      {showLabel && (
        <div>
          <div className="text-sm font-medium">{token.name}</div>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div className="font-mono">{getPixelValue()}</div>
            {getFallbackValue() && (
              <div className="font-mono text-muted-foreground/70">
                Fallback: {getFallbackValue()}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Visual preview */}
      <div className="space-y-2">
        <div className="text-xs font-medium text-muted-foreground">Preview</div>
        <div className="flex items-center justify-center rounded-lg bg-muted/20 p-6">
          <div
            className="h-12 w-20 border-2 border-primary/40 bg-primary/20"
            style={{ borderRadius: radiusValue }}
          />
        </div>
      </div>

      {/* Usage examples */}
      <div className="space-y-2">
        <div className="text-xs font-medium text-muted-foreground">
          Usage Examples
        </div>
        <div className="grid grid-cols-3 gap-3">
          {/* Button example */}
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Button</div>
            <button
              className="w-full bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
              style={{ borderRadius: radiusValue }}
            >
              Button
            </button>
          </div>

          {/* Card example */}
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Card</div>
            <div
              className="border bg-card p-3 text-xs"
              style={{ borderRadius: radiusValue }}
            >
              Card
            </div>
          </div>

          {/* Input example */}
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Input</div>
            <input
              className="w-full border px-2 py-1 text-xs"
              style={{ borderRadius: radiusValue }}
              placeholder="Input"
            />
          </div>
        </div>
      </div>

      {/* Badge/Chip examples for different radii */}
      {radiusValue !== '0' && radiusValue !== '0px' && (
        <div className="space-y-2">
          <div className="text-xs font-medium text-muted-foreground">
            Other Uses
          </div>
          <div className="flex flex-wrap gap-2">
            <span
              className="bg-secondary px-2 py-1 text-xs text-secondary-foreground"
              style={{ borderRadius: radiusValue }}
            >
              Badge
            </span>
            <span
              className="bg-muted px-3 py-1 text-xs text-muted-foreground"
              style={{ borderRadius: radiusValue }}
            >
              Tag
            </span>
            <span
              className="border bg-accent px-2 py-1 text-xs text-accent-foreground"
              style={{ borderRadius: radiusValue }}
            >
              Chip
            </span>
          </div>
        </div>
      )}

      {/* CSS Value */}
      <div className="space-y-2">
        <div className="text-xs font-medium text-muted-foreground">
          CSS Value
        </div>
        <div className="rounded bg-muted/30 p-3 font-mono text-xs">
          border-radius: {radiusValue}
        </div>
      </div>
    </div>
  );
}
