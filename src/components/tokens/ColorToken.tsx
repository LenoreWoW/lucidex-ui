'use client';

import { DesignToken, getTokenValue } from '@/lib/token-ingestion';
import { useTheme } from 'next-themes';

interface ColorTokenProps {
  token: DesignToken;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function ColorToken({
  token,
  size = 'md',
  showLabel = true,
}: ColorTokenProps) {
  const { theme } = useTheme();
  const currentTheme = (theme as 'light' | 'dark') || 'light';

  const colorValue = getTokenValue(token, currentTheme);

  // Parse HSL value to get a contrasting text color
  const getContrastColor = (hslValue: string): string => {
    // Extract lightness from HSL value
    const lightnessMatch = hslValue.match(
      /\d+(?:\.\d+)?%?\s+\d+(?:\.\d+)?%?\s+(\d+(?:\.\d+)?)%?/
    );
    if (lightnessMatch) {
      const lightness = parseFloat(lightnessMatch[1]);
      return lightness > 50 ? '#000000' : '#ffffff';
    }
    return '#ffffff'; // default to white
  };

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const hasThemeVariants =
    typeof token.value === 'object' &&
    token.value !== null &&
    'light' in token.value &&
    'dark' in token.value;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <div
          className={`${sizeClasses[size]} flex items-center justify-center overflow-hidden rounded-md border-2 border-border`}
          style={{ backgroundColor: colorValue }}
        >
          {size === 'lg' && (
            <span
              className={`${textSizeClasses[size]} font-medium`}
              style={{ color: getContrastColor(colorValue) }}
            >
              Aa
            </span>
          )}
        </div>

        {showLabel && (
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium">{token.name}</div>
            <div className="truncate font-mono text-xs text-muted-foreground">
              {colorValue}
            </div>
          </div>
        )}
      </div>

      {hasThemeVariants && size === 'lg' && (
        <div className="grid grid-cols-2 gap-2 pt-2">
          <div className="space-y-1">
            <div className="text-xs font-medium text-muted-foreground">
              Light
            </div>
            <div className="flex items-center gap-2">
              <div
                className="h-6 w-6 rounded border border-border"
                style={{ backgroundColor: getTokenValue(token, 'light') }}
              />
              <span className="font-mono text-xs text-muted-foreground">
                {getTokenValue(token, 'light')}
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-medium text-muted-foreground">
              Dark
            </div>
            <div className="flex items-center gap-2">
              <div
                className="h-6 w-6 rounded border border-border"
                style={{ backgroundColor: getTokenValue(token, 'dark') }}
              />
              <span className="font-mono text-xs text-muted-foreground">
                {getTokenValue(token, 'dark')}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
