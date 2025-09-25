/**
 * Theme Generator and Customization
 * Creates custom themes by modifying design tokens and generating color palettes
 */

export interface ColorToken {
  name: string;
  value: string;
  hsl: HSLColor;
  rgb: RGBColor;
  variants?: ColorVariant[];
}

export interface ColorVariant {
  name: string;
  value: string;
  lightness: number;
}

export interface HSLColor {
  h: number;
  s: number;
  l: number;
}

export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export interface ThemeConfig {
  name: string;
  description?: string;
  baseColors: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: string;
    success: string;
    warning: string;
    error: string;
  };
  typography: {
    fontFamily: {
      sans: string[];
      serif: string[];
      mono: string[];
    };
    fontSize: Record<string, { size: string; lineHeight: string }>;
    fontWeight: Record<string, number>;
  };
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
  shadows: Record<string, string>;
  breakpoints: Record<string, string>;
  darkMode: boolean;
}

export interface GeneratedTheme {
  config: ThemeConfig;
  tokens: ColorToken[];
  css: string;
  tailwindConfig: Record<string, any>;
  figmaTokens?: Record<string, any>;
}

// Predefined color palettes
export const COLOR_PALETTES = {
  qatar: {
    name: 'Qatar GBA',
    primary: '#8B1538', // Maroon
    secondary: '#C4A656', // Gold
    accent: '#00A651', // Green
    neutral: '#333333',
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
  },
  blue: {
    name: 'Ocean Blue',
    primary: '#0EA5E9',
    secondary: '#06B6D4',
    accent: '#8B5CF6',
    neutral: '#64748B',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
  },
  green: {
    name: 'Forest Green',
    primary: '#059669',
    secondary: '#65A30D',
    accent: '#0891B2',
    neutral: '#6B7280',
    success: '#10B981',
    warning: '#D97706',
    error: '#DC2626',
  },
  purple: {
    name: 'Royal Purple',
    primary: '#7C3AED',
    secondary: '#A855F7',
    accent: '#EC4899',
    neutral: '#6B7280',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
  },
  monochrome: {
    name: 'Monochrome',
    primary: '#000000',
    secondary: '#404040',
    accent: '#808080',
    neutral: '#606060',
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
  },
};

export class ThemeGenerator {
  static hexToHsl(hex: string): HSLColor {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) throw new Error('Invalid hex color');

    const r = parseInt(result[1], 16) / 255;
    const g = parseInt(result[2], 16) / 255;
    const b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;

    let h: number;
    let s: number;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
        default:
          h = 0;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  }

  static hslToHex(hsl: HSLColor): string {
    const { h, s, l } = hsl;
    const hNorm = h / 360;
    const sNorm = s / 100;
    const lNorm = l / 100;

    const hueToRgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = lNorm < 0.5 ? lNorm * (1 + sNorm) : lNorm + sNorm - lNorm * sNorm;
    const p = 2 * lNorm - q;

    const r = hueToRgb(p, q, hNorm + 1 / 3);
    const g = hueToRgb(p, q, hNorm);
    const b = hueToRgb(p, q, hNorm - 1 / 3);

    const toHex = (c: number) => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  static hexToRgb(hex: string): RGBColor {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) throw new Error('Invalid hex color');

    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };
  }

  static generateColorVariants(baseColor: string, name: string): ColorToken {
    const hsl = this.hexToHsl(baseColor);
    const rgb = this.hexToRgb(baseColor);

    const variants: ColorVariant[] = [
      { name: '50', value: this.hslToHex({ ...hsl, l: 95 }), lightness: 95 },
      { name: '100', value: this.hslToHex({ ...hsl, l: 90 }), lightness: 90 },
      { name: '200', value: this.hslToHex({ ...hsl, l: 80 }), lightness: 80 },
      { name: '300', value: this.hslToHex({ ...hsl, l: 70 }), lightness: 70 },
      { name: '400', value: this.hslToHex({ ...hsl, l: 60 }), lightness: 60 },
      { name: '500', value: baseColor, lightness: hsl.l },
      { name: '600', value: this.hslToHex({ ...hsl, l: Math.max(hsl.l - 10, 10) }), lightness: Math.max(hsl.l - 10, 10) },
      { name: '700', value: this.hslToHex({ ...hsl, l: Math.max(hsl.l - 20, 5) }), lightness: Math.max(hsl.l - 20, 5) },
      { name: '800', value: this.hslToHex({ ...hsl, l: Math.max(hsl.l - 30, 5) }), lightness: Math.max(hsl.l - 30, 5) },
      { name: '900', value: this.hslToHex({ ...hsl, l: Math.max(hsl.l - 40, 5) }), lightness: Math.max(hsl.l - 40, 5) },
      { name: '950', value: this.hslToHex({ ...hsl, l: Math.max(hsl.l - 45, 2) }), lightness: Math.max(hsl.l - 45, 2) },
    ];

    return {
      name,
      value: baseColor,
      hsl,
      rgb,
      variants,
    };
  }

  static generateComplementaryColors(baseColor: string): string[] {
    const hsl = this.hexToHsl(baseColor);

    return [
      this.hslToHex({ ...hsl, h: (hsl.h + 180) % 360 }), // Complementary
      this.hslToHex({ ...hsl, h: (hsl.h + 120) % 360 }), // Triadic 1
      this.hslToHex({ ...hsl, h: (hsl.h + 240) % 360 }), // Triadic 2
      this.hslToHex({ ...hsl, h: (hsl.h + 30) % 360 }), // Analogous 1
      this.hslToHex({ ...hsl, h: (hsl.h - 30 + 360) % 360 }), // Analogous 2
    ];
  }

  static generateTheme(config: ThemeConfig): GeneratedTheme {
    const tokens: ColorToken[] = [];

    // Generate color tokens
    Object.entries(config.baseColors).forEach(([name, color]) => {
      tokens.push(this.generateColorVariants(color, name));
    });

    // Generate CSS variables
    const css = this.generateCssVariables(tokens, config);

    // Generate Tailwind config
    const tailwindConfig = this.generateTailwindConfig(tokens, config);

    // Generate Figma tokens
    const figmaTokens = this.generateFigmaTokens(tokens, config);

    return {
      config,
      tokens,
      css,
      tailwindConfig,
      figmaTokens,
    };
  }

  private static generateCssVariables(tokens: ColorToken[], config: ThemeConfig): string {
    let css = ':root {\n';

    // Color variables
    tokens.forEach(token => {
      css += `  --color-${token.name}: ${token.value};\n`;
      css += `  --color-${token.name}-rgb: ${token.rgb.r}, ${token.rgb.g}, ${token.rgb.b};\n`;
      css += `  --color-${token.name}-hsl: ${token.hsl.h}, ${token.hsl.s}%, ${token.hsl.l}%;\n`;

      if (token.variants) {
        token.variants.forEach(variant => {
          css += `  --color-${token.name}-${variant.name}: ${variant.value};\n`;
        });
      }
    });

    // Typography variables
    Object.entries(config.typography.fontSize).forEach(([name, fontSizeData]) => {
      const { size, lineHeight } = fontSizeData;
      css += `  --font-size-${name}: ${size};\n`;
      css += `  --line-height-${name}: ${lineHeight};\n`;
    });

    Object.entries(config.typography.fontWeight).forEach(([name, weight]) => {
      css += `  --font-weight-${name}: ${weight};\n`;
    });

    // Spacing variables
    Object.entries(config.spacing).forEach(([name, value]) => {
      css += `  --spacing-${name}: ${value};\n`;
    });

    // Border radius variables
    Object.entries(config.borderRadius).forEach(([name, value]) => {
      css += `  --border-radius-${name}: ${value};\n`;
    });

    // Shadow variables
    Object.entries(config.shadows).forEach(([name, value]) => {
      css += `  --shadow-${name}: ${value};\n`;
    });

    css += '}\n';

    // Dark mode variables
    if (config.darkMode) {
      css += '\n[data-theme="dark"] {\n';
      tokens.forEach(token => {
        if (token.variants) {
          // Reverse the color scale for dark mode
          const reversedVariants = [...token.variants].reverse();
          reversedVariants.forEach((variant, index) => {
            const originalVariant = token.variants![index];
            css += `  --color-${token.name}-${originalVariant.name}: ${variant.value};\n`;
          });
        }
      });
      css += '}\n';
    }

    return css;
  }

  private static generateTailwindConfig(tokens: ColorToken[], config: ThemeConfig): Record<string, any> {
    const colors: Record<string, any> = {};

    tokens.forEach(token => {
      if (token.variants) {
        colors[token.name] = {};
        token.variants.forEach(variant => {
          colors[token.name][variant.name] = variant.value;
        });
      } else {
        colors[token.name] = token.value;
      }
    });

    return {
      theme: {
        extend: {
          colors,
          fontFamily: config.typography.fontFamily,
          fontSize: Object.fromEntries(
            Object.entries(config.typography.fontSize).map(([name, { size, lineHeight }]) => [
              name,
              [size, lineHeight],
            ])
          ),
          fontWeight: config.typography.fontWeight,
          spacing: config.spacing,
          borderRadius: config.borderRadius,
          boxShadow: config.shadows,
          screens: config.breakpoints,
        },
      },
      darkMode: config.darkMode ? 'class' : false,
    };
  }

  private static generateFigmaTokens(tokens: ColorToken[], config: ThemeConfig): Record<string, any> {
    const figmaTokens: Record<string, any> = {
      global: {
        colors: {},
        typography: {},
        spacing: {},
        borderRadius: {},
        shadows: {},
      },
    };

    // Colors
    tokens.forEach(token => {
      if (token.variants) {
        figmaTokens.global.colors[token.name] = {};
        token.variants.forEach(variant => {
          figmaTokens.global.colors[token.name][variant.name] = {
            value: variant.value,
            type: 'color',
            description: `${token.name} ${variant.name} variant`,
          };
        });
      } else {
        figmaTokens.global.colors[token.name] = {
          value: token.value,
          type: 'color',
          description: `${token.name} base color`,
        };
      }
    });

    // Typography
    Object.entries(config.typography.fontSize).forEach(([name, { size, lineHeight }]) => {
      figmaTokens.global.typography[name] = {
        value: {
          fontSize: size,
          lineHeight,
          fontFamily: config.typography.fontFamily.sans[0],
          fontWeight: config.typography.fontWeight.normal || 400,
        },
        type: 'typography',
        description: `${name} text style`,
      };
    });

    // Spacing
    Object.entries(config.spacing).forEach(([name, value]) => {
      figmaTokens.global.spacing[name] = {
        value,
        type: 'spacing',
        description: `${name} spacing`,
      };
    });

    return figmaTokens;
  }

  static generateAccessiblePalette(baseColor: string): ColorToken {
    const hsl = this.hexToHsl(baseColor);

    // Generate variants with better accessibility contrast
    const variants: ColorVariant[] = [
      { name: '50', value: this.hslToHex({ ...hsl, s: Math.max(hsl.s - 40, 5), l: 97 }), lightness: 97 },
      { name: '100', value: this.hslToHex({ ...hsl, s: Math.max(hsl.s - 30, 10), l: 92 }), lightness: 92 },
      { name: '200', value: this.hslToHex({ ...hsl, s: Math.max(hsl.s - 20, 20), l: 82 }), lightness: 82 },
      { name: '300', value: this.hslToHex({ ...hsl, s: Math.max(hsl.s - 10, 30), l: 72 }), lightness: 72 },
      { name: '400', value: this.hslToHex({ ...hsl, s: hsl.s, l: 62 }), lightness: 62 },
      { name: '500', value: baseColor, lightness: hsl.l },
      { name: '600', value: this.hslToHex({ ...hsl, s: Math.min(hsl.s + 10, 90), l: Math.max(hsl.l - 15, 25) }), lightness: Math.max(hsl.l - 15, 25) },
      { name: '700', value: this.hslToHex({ ...hsl, s: Math.min(hsl.s + 15, 95), l: Math.max(hsl.l - 25, 20) }), lightness: Math.max(hsl.l - 25, 20) },
      { name: '800', value: this.hslToHex({ ...hsl, s: Math.min(hsl.s + 20, 95), l: Math.max(hsl.l - 35, 15) }), lightness: Math.max(hsl.l - 35, 15) },
      { name: '900', value: this.hslToHex({ ...hsl, s: Math.min(hsl.s + 25, 95), l: Math.max(hsl.l - 45, 10) }), lightness: Math.max(hsl.l - 45, 10) },
      { name: '950', value: this.hslToHex({ ...hsl, s: Math.min(hsl.s + 30, 95), l: Math.max(hsl.l - 50, 5) }), lightness: Math.max(hsl.l - 50, 5) },
    ];

    return {
      name: 'accessible',
      value: baseColor,
      hsl,
      rgb: this.hexToRgb(baseColor),
      variants,
    };
  }

  static calculateContrastRatio(color1: string, color2: string): number {
    const rgb1 = this.hexToRgb(color1);
    const rgb2 = this.hexToRgb(color2);

    const luminance1 = this.calculateLuminance(rgb1);
    const luminance2 = this.calculateLuminance(rgb2);

    const lighter = Math.max(luminance1, luminance2);
    const darker = Math.min(luminance1, luminance2);

    return (lighter + 0.05) / (darker + 0.05);
  }

  private static calculateLuminance(rgb: RGBColor): number {
    const { r, g, b } = rgb;

    const [rSRGB, gSRGB, bSRGB] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rSRGB + 0.7152 * gSRGB + 0.0722 * bSRGB;
  }

  static getDefaultThemeConfig(): ThemeConfig {
    return {
      name: 'Lucidex UI Default',
      description: 'Default theme for Lucidex UI with Qatar GBA colors',
      baseColors: COLOR_PALETTES.qatar,
      typography: {
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
          serif: ['Georgia', 'Times New Roman', 'serif'],
          mono: ['Fira Code', 'Monaco', 'monospace'],
        },
        fontSize: {
          xs: { size: '0.75rem', lineHeight: '1rem' },
          sm: { size: '0.875rem', lineHeight: '1.25rem' },
          base: { size: '1rem', lineHeight: '1.5rem' },
          lg: { size: '1.125rem', lineHeight: '1.75rem' },
          xl: { size: '1.25rem', lineHeight: '1.75rem' },
          '2xl': { size: '1.5rem', lineHeight: '2rem' },
          '3xl': { size: '1.875rem', lineHeight: '2.25rem' },
          '4xl': { size: '2.25rem', lineHeight: '2.5rem' },
        },
        fontWeight: {
          thin: 100,
          light: 300,
          normal: 400,
          medium: 500,
          semibold: 600,
          bold: 700,
          extrabold: 800,
        },
      },
      spacing: {
        px: '1px',
        0: '0px',
        0.5: '0.125rem',
        1: '0.25rem',
        1.5: '0.375rem',
        2: '0.5rem',
        2.5: '0.625rem',
        3: '0.75rem',
        3.5: '0.875rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
        11: '2.75rem',
        12: '3rem',
        14: '3.5rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        28: '7rem',
        32: '8rem',
        36: '9rem',
        40: '10rem',
        44: '11rem',
        48: '12rem',
        52: '13rem',
        56: '14rem',
        60: '15rem',
        64: '16rem',
        72: '18rem',
        80: '20rem',
        96: '24rem',
      },
      borderRadius: {
        none: '0px',
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
      },
      shadows: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      },
      breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      darkMode: true,
    };
  }

  // Public method wrappers for the UI
  static generateCSSVariables(theme: GeneratedTheme): string {
    return this.generateCssVariables(theme.tokens, theme.config);
  }

  static generateTailwindConfigExport(theme: GeneratedTheme): Record<string, any> {
    return this.generateTailwindConfig(theme.tokens, theme.config);
  }

  static generateFigmaTokensExport(theme: GeneratedTheme): Record<string, any> {
    return this.generateFigmaTokens(theme.tokens, theme.config);
  }
}

