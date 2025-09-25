# Design Token System Implementation

This document outlines the Phase 3 implementation of the design token ingestion system and viewer for the Lucidex UI.

## Overview

The design token system provides a comprehensive way to view, explore, and copy design tokens from the Qatar GBA design system with live previews and copy functionality.

## Architecture

### Core Components

#### 1. Token Data Structure (`src/core/tokens/`)

- **colors.json**: Semantic colors and Qatar GBA brand colors with light/dark theme variants
- **spacing.json**: Spacing tokens with pixel and rem values
- **typography.json**: Font families, sizes, weights, and line heights
- **shadows.json**: Shadow tokens for depth and elevation
- **borderRadius.json**: Border radius tokens for consistent corner styling

#### 2. Token Ingestion System (`src/lib/token-ingestion.ts`)

- **createTokenCollection()**: Processes all token files into a unified collection
- **createTokenIndex()**: Creates searchable index of all tokens
- **searchTokens()**: Full-text search across token names, descriptions, and categories
- **getTokenValue()**: Theme-aware value extraction (light/dark)
- **getCSSVariable()**: Returns CSS variable reference format

#### 3. Token Viewer Components (`src/components/tokens/`)

##### TokenViewer (`TokenViewer.tsx`)

- Main component for browsing all tokens
- Search and filtering functionality
- Category navigation
- Grid/list view toggle
- Results count and status

##### TokenCard (`TokenCard.tsx`)

- Individual token display
- Live preview rendering
- Copy functionality for CSS variables and values
- Usage examples for different frameworks

##### Token-Specific Viewers

- **ColorToken**: Color swatches with contrast text and theme variants
- **SpacingToken**: Visual spacing indicators with padding/margin previews
- **TypographyToken**: Font samples with different properties
- **ShadowToken**: Shadow previews on various elements
- **BorderRadiusToken**: Corner radius previews on UI elements

### 4. Tokens Page (`src/app/tokens/page.tsx`)

- Comprehensive tokens browser
- Hero section with Qatar GBA branding
- Category sidebar navigation
- Usage guide with code examples
- Responsive design

## Features

### 1. Live Previews

- **Colors**: Color swatches with automatic contrast text
- **Spacing**: Visual spacing boxes and padding/margin examples
- **Typography**: Font samples at actual sizes and weights
- **Shadows**: Shadow effects on realistic UI elements
- **Border Radius**: Corner radius on buttons, cards, and inputs

### 2. Copy Functionality

- One-click copy for CSS variables (`var(--token-name)`)
- One-click copy for raw values (`hsl(0 65% 51%)`)
- Visual feedback with checkmark icons
- Framework-specific code examples (CSS, Tailwind, React/JSX)

### 3. Theme Support

- Automatic light/dark theme token values
- Theme-aware previews
- CSS variable fallbacks

### 4. Search and Filtering

- Full-text search across token names and descriptions
- Category filtering (colors, spacing, typography, shadows, border-radius)
- Type filtering
- Real-time results

### 5. Qatar GBA Integration

- Official Qatar GBA colors (maroon, gold, navy)
- Brand-consistent styling
- Tailwind CSS utility class examples

## Usage

### Accessing Tokens

1. Navigate to `/tokens` or click "Design Tokens" in the sidebar
2. Browse by category or use search
3. Click copy buttons to copy CSS variables or values
4. View usage examples by clicking the code icon

### Integration Examples

#### CSS Variables

```css
.my-component {
  color: var(--qgba-maroon);
  background: var(--background);
  padding: var(--spacing-4);
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
}
```

#### Tailwind CSS

```html
<div class="rounded-lg bg-qgba-maroon p-4 text-qgba-gold shadow-md">
  Qatar GBA themed content
</div>
```

#### React/JSX

```jsx
<div
  style={{
    color: 'var(--qgba-maroon)',
    padding: 'var(--spacing-4)',
    borderRadius: 'var(--radius)',
  }}
>
  Content
</div>
```

## Token Categories

### Colors

- **Semantic**: Background, foreground, primary, secondary, etc.
- **Qatar GBA Brand**: Official Qatar colors (maroon, gold, navy)
- **Neutral**: Light and dark grays

### Spacing

- Consistent spacing scale from 0 to 24 (0px to 96px)
- Available in pixels, rem, and CSS variables

### Typography

- **Font Families**: Sans-serif and monospace
- **Font Sizes**: From xs (12px) to 6xl (60px)
- **Font Weights**: From thin (100) to black (900)
- **Line Heights**: From none (1) to loose (2)

### Shadows

- Shadow scale from small to 2xl
- Multiple shadow layers supported
- Inner shadow support

### Border Radius

- From none (0px) to full (9999px)
- CSS variable fallbacks
- Consistent with design system

## File Structure

```
src/
├── core/tokens/
│   ├── colors.json
│   ├── spacing.json
│   ├── typography.json
│   ├── shadows.json
│   └── borderRadius.json
├── lib/
│   └── token-ingestion.ts
├── components/tokens/
│   ├── TokenViewer.tsx
│   ├── TokenCard.tsx
│   ├── ColorToken.tsx
│   ├── SpacingToken.tsx
│   ├── TypographyToken.tsx
│   ├── ShadowToken.tsx
│   ├── BorderRadiusToken.tsx
│   └── index.ts
└── app/tokens/
    └── page.tsx
```

## Navigation Integration

The design tokens page is integrated into the main navigation through the sidebar with a prominent "Design Tokens" button that uses Qatar GBA brand colors.

## Testing

The system includes:

- Type safety with TypeScript interfaces
- Responsive design testing
- Copy functionality testing
- Theme switching validation
- Search and filter functionality

## Future Enhancements

Potential improvements include:

- Token export functionality
- Custom token creation
- Token usage tracking
- Animation tokens
- Component-specific token sets
