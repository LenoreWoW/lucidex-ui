'use client';

import { DesignToken, getTokenValue } from '@/lib/token-ingestion';

interface ShadowTokenProps {
  token: DesignToken;
  showLabel?: boolean;
}

export function ShadowToken({ token, showLabel = true }: ShadowTokenProps) {
  const shadowValue = getTokenValue(token);

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

      {/* Shadow preview */}
      <div className="space-y-2">
        <div className="text-xs font-medium text-muted-foreground">Preview</div>
        <div className="flex items-center justify-center rounded-lg bg-muted/20 p-8">
          <div
            className="flex h-16 w-24 items-center justify-center rounded-lg border bg-card text-sm text-muted-foreground"
            style={{ boxShadow: shadowValue }}
          >
            Card
          </div>
        </div>
      </div>

      {/* Multiple examples */}
      <div className="space-y-2">
        <div className="text-xs font-medium text-muted-foreground">
          Usage Examples
        </div>
        <div className="grid grid-cols-3 gap-3">
          {/* Button example */}
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Button</div>
            <button
              className="w-full rounded bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
              style={{ boxShadow: shadowValue }}
            >
              Click me
            </button>
          </div>

          {/* Card example */}
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Card</div>
            <div
              className="rounded border bg-card p-3 text-xs"
              style={{ boxShadow: shadowValue }}
            >
              Card content
            </div>
          </div>

          {/* Input example */}
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Input</div>
            <input
              className="w-full rounded border px-2 py-1 text-xs"
              style={{ boxShadow: shadowValue }}
              placeholder="Input field"
            />
          </div>
        </div>
      </div>

      {/* CSS Value */}
      <div className="space-y-2">
        <div className="text-xs font-medium text-muted-foreground">
          CSS Value
        </div>
        <div className="break-all rounded bg-muted/30 p-3 font-mono text-xs">
          box-shadow: {shadowValue}
        </div>
      </div>

      {/* Shadow breakdown if it contains multiple shadows */}
      {shadowValue.includes(',') && (
        <div className="space-y-2">
          <div className="text-xs font-medium text-muted-foreground">
            Shadow Layers
          </div>
          <div className="space-y-1">
            {shadowValue.split(',').map((shadow, index) => (
              <div
                key={index}
                className="rounded bg-muted/30 p-2 font-mono text-xs"
              >
                {shadow.trim()}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
