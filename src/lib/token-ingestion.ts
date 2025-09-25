import colorsData from '@/core/tokens/colors.json';
import spacingData from '@/core/tokens/spacing.json';
import typographyData from '@/core/tokens/typography.json';
import shadowsData from '@/core/tokens/shadows.json';
import borderRadiusData from '@/core/tokens/borderRadius.json';

export interface TokenValue {
  light?: string;
  dark?: string;
  value?: string;
  px?: string;
  rem?: string;
  hex?: {
    light: string;
    dark: string;
  };
  lineHeight?: string;
  fallback?: string;
}

export interface DesignToken {
  name: string;
  description: string;
  value: TokenValue | string;
  variable: string;
  category: string;
  type?: string;
}

export interface TokenCategory {
  name: string;
  description: string;
  tokens: Record<string, DesignToken>;
}

export interface TokenCollection {
  [key: string]: TokenCategory;
}

export type TokenType =
  | 'color'
  | 'spacing'
  | 'typography'
  | 'shadow'
  | 'border-radius';

// Helper function to determine token type based on category
export function getTokenType(category: string): TokenType {
  if (['semantic', 'brand', 'neutral'].includes(category)) return 'color';
  if (category === 'spacing') return 'spacing';
  if (
    ['font-family', 'font-size', 'font-weight', 'line-height'].includes(
      category
    )
  )
    return 'typography';
  if (category === 'shadow') return 'shadow';
  if (category === 'border-radius') return 'border-radius';
  return 'color'; // default fallback
}

// Parse and normalize token data
function parseTokens(data: any, type: TokenType): Record<string, DesignToken> {
  const tokens: Record<string, DesignToken> = {};

  function processTokenGroup(group: any, groupKey: string = '') {
    for (const [key, token] of Object.entries(group)) {
      if (token && typeof token === 'object' && 'name' in token) {
        const tokenKey = groupKey ? `${groupKey}-${key}` : key;
        tokens[tokenKey] = {
          ...(token as DesignToken),
          type,
        };
      } else if (token && typeof token === 'object') {
        // Nested group, process recursively
        processTokenGroup(token, groupKey ? `${groupKey}-${key}` : key);
      }
    }
  }

  // Handle different data structures
  if (data.colors) {
    processTokenGroup(data.colors);
  } else if (data.spacing) {
    processTokenGroup(data.spacing);
  } else if (data.typography) {
    processTokenGroup(data.typography);
  } else if (data.shadows) {
    processTokenGroup(data.shadows);
  } else if (data.borderRadius) {
    processTokenGroup(data.borderRadius);
  } else {
    processTokenGroup(data);
  }

  return tokens;
}

// Create token collection from all data sources
export function createTokenCollection(): TokenCollection {
  const collection: TokenCollection = {};

  // Process colors
  const colorTokens = parseTokens(colorsData, 'color');
  collection.colors = {
    name: 'Colors',
    description:
      'Color tokens including semantic colors and Qatar GBA brand colors',
    tokens: colorTokens,
  };

  // Process spacing
  const spacingTokens = parseTokens(spacingData, 'spacing');
  collection.spacing = {
    name: 'Spacing',
    description: 'Spacing tokens for consistent layout and padding',
    tokens: spacingTokens,
  };

  // Process typography
  const typographyTokens = parseTokens(typographyData, 'typography');
  collection.typography = {
    name: 'Typography',
    description:
      'Typography tokens including fonts, sizes, weights, and line heights',
    tokens: typographyTokens,
  };

  // Process shadows
  const shadowTokens = parseTokens(shadowsData, 'shadow');
  collection.shadows = {
    name: 'Shadows',
    description: 'Shadow tokens for depth and elevation effects',
    tokens: shadowTokens,
  };

  // Process border radius
  const borderRadiusTokens = parseTokens(borderRadiusData, 'border-radius');
  collection.borderRadius = {
    name: 'Border Radius',
    description: 'Border radius tokens for consistent corner styling',
    tokens: borderRadiusTokens,
  };

  return collection;
}

// Create searchable token index
export interface TokenIndex {
  [tokenId: string]: {
    token: DesignToken;
    category: string;
    path: string;
  };
}

export function createTokenIndex(): TokenIndex {
  const collection = createTokenCollection();
  const index: TokenIndex = {};

  for (const [categoryKey, category] of Object.entries(collection)) {
    for (const [tokenKey, token] of Object.entries(category.tokens)) {
      const tokenId = `${categoryKey}:${tokenKey}`;
      index[tokenId] = {
        token,
        category: categoryKey,
        path: `${categoryKey}.${tokenKey}`,
      };
    }
  }

  return index;
}

// Search tokens by query
export function searchTokens(
  query: string,
  filters?: {
    category?: string;
    type?: TokenType;
  }
): TokenIndex {
  const index = createTokenIndex();
  const results: TokenIndex = {};

  const lowerQuery = query.toLowerCase();

  for (const [tokenId, entry] of Object.entries(index)) {
    const { token, category } = entry;

    // Apply category filter
    if (filters?.category && category !== filters.category) {
      continue;
    }

    // Apply type filter
    if (filters?.type && token.type !== filters.type) {
      continue;
    }

    // Search in token name, description, variable, and category
    const searchText = [
      token.name,
      token.description,
      token.variable,
      category,
      tokenId,
    ]
      .join(' ')
      .toLowerCase();

    if (searchText.includes(lowerQuery)) {
      results[tokenId] = entry;
    }
  }

  return results;
}

// Get tokens by category
export function getTokensByCategory(
  categoryKey: string
): Record<string, DesignToken> {
  const collection = createTokenCollection();
  return collection[categoryKey]?.tokens || {};
}

// Get tokens by type
export function getTokensByType(type: TokenType): Record<string, DesignToken> {
  const index = createTokenIndex();
  const tokens: Record<string, DesignToken> = {};

  for (const [tokenId, entry] of Object.entries(index)) {
    if (entry.token.type === type) {
      tokens[tokenId] = entry.token;
    }
  }

  return tokens;
}

// Validate token structure
export function validateToken(token: any): token is DesignToken {
  return (
    typeof token === 'object' &&
    typeof token.name === 'string' &&
    typeof token.description === 'string' &&
    typeof token.variable === 'string' &&
    typeof token.category === 'string' &&
    (token.value !== undefined || token.value !== null)
  );
}

// Get token value for current theme
export function getTokenValue(
  token: DesignToken,
  theme: 'light' | 'dark' = 'light'
): string {
  if (typeof token.value === 'string') {
    return token.value;
  }

  if (typeof token.value === 'object' && token.value !== null) {
    if ('light' in token.value && 'dark' in token.value) {
      return token.value[theme] || token.value.light || '';
    }

    if ('value' in token.value && token.value.value) {
      return token.value.value;
    }
  }

  return '';
}

// Get CSS variable reference
export function getCSSVariable(token: DesignToken): string {
  return `var(${token.variable})`;
}

// Get all available categories
export function getTokenCategories(): string[] {
  const collection = createTokenCollection();
  return Object.keys(collection);
}

// Get category information
export function getCategoryInfo(categoryKey: string): TokenCategory | null {
  const collection = createTokenCollection();
  return collection[categoryKey] || null;
}
