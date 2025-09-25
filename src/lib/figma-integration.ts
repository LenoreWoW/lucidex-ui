/**
 * Figma Integration Bridge
 * Syncs design tokens, components, and layouts between Figma and Lucidex UI
 */

import React from 'react';

export interface FigmaConfig {
  accessToken: string;
  fileKey: string;
  nodeId?: string;
}

export interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
  style?: FigmaStyle;
  fills?: FigmaFill[];
  strokes?: FigmaStroke[];
  effects?: FigmaEffect[];
  constraints?: FigmaConstraints;
  absoluteBoundingBox?: FigmaBoundingBox;
  exportSettings?: FigmaExportSetting[];
}

export interface FigmaStyle {
  fontFamily?: string;
  fontPostScriptName?: string;
  fontWeight?: number;
  fontSize?: number;
  textAlignHorizontal?: 'LEFT' | 'CENTER' | 'RIGHT' | 'JUSTIFIED';
  textAlignVertical?: 'TOP' | 'CENTER' | 'BOTTOM';
  letterSpacing?: number;
  lineHeightPx?: number;
  lineHeightPercent?: number;
}

export interface FigmaFill {
  type: 'SOLID' | 'GRADIENT_LINEAR' | 'GRADIENT_RADIAL' | 'GRADIENT_ANGULAR' | 'GRADIENT_DIAMOND' | 'IMAGE';
  color?: FigmaColor;
  gradientStops?: FigmaGradientStop[];
  opacity?: number;
  visible?: boolean;
}

export interface FigmaColor {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export interface FigmaGradientStop {
  color: FigmaColor;
  position: number;
}

export interface FigmaStroke {
  type: string;
  color?: FigmaColor;
  opacity?: number;
}

export interface FigmaEffect {
  type: 'DROP_SHADOW' | 'INNER_SHADOW' | 'LAYER_BLUR' | 'BACKGROUND_BLUR';
  color?: FigmaColor;
  offset?: { x: number; y: number };
  radius?: number;
  visible?: boolean;
}

export interface FigmaConstraints {
  vertical: 'TOP' | 'BOTTOM' | 'CENTER' | 'TOP_BOTTOM' | 'SCALE';
  horizontal: 'LEFT' | 'RIGHT' | 'CENTER' | 'LEFT_RIGHT' | 'SCALE';
}

export interface FigmaBoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface FigmaExportSetting {
  suffix: string;
  format: 'JPG' | 'PNG' | 'SVG' | 'PDF';
  constraint: {
    type: 'SCALE' | 'WIDTH' | 'HEIGHT';
    value: number;
  };
}

export interface FigmaFile {
  name: string;
  lastModified: string;
  thumbnailUrl: string;
  version: string;
  document: FigmaNode;
  components: Record<string, FigmaComponent>;
  styles: Record<string, FigmaStyle>;
  schemaVersion: number;
}

export interface FigmaComponent {
  key: string;
  name: string;
  description: string;
  componentSetId?: string;
  documentationLinks: FigmaDocumentationLink[];
}

export interface FigmaDocumentationLink {
  uri: string;
}

export interface DesignToken {
  name: string;
  type: 'color' | 'typography' | 'spacing' | 'border-radius' | 'shadow' | 'opacity';
  value: string | number;
  description?: string;
  figmaNodeId?: string;
}

export interface SyncedComponent {
  id: string;
  name: string;
  type: 'component' | 'variant';
  figmaNodeId: string;
  lastSynced: string;
  properties: Record<string, any>;
  assets?: {
    thumbnail?: string;
    svg?: string;
  };
}

export class FigmaIntegration {
  private static readonly API_BASE = 'https://api.figma.com/v1';

  static async getFile(config: FigmaConfig): Promise<FigmaFile> {
    const response = await fetch(`${this.API_BASE}/files/${config.fileKey}`, {
      headers: {
        'X-Figma-Token': config.accessToken,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Figma file: ${response.statusText}`);
    }

    return response.json();
  }

  static async getNode(config: FigmaConfig, nodeId: string): Promise<FigmaNode> {
    const response = await fetch(
      `${this.API_BASE}/files/${config.fileKey}/nodes?ids=${nodeId}`,
      {
        headers: {
          'X-Figma-Token': config.accessToken,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch Figma node: ${response.statusText}`);
    }

    const data = await response.json();
    return data.nodes[nodeId]?.document;
  }

  static async getFileImages(config: FigmaConfig, nodeIds: string[]): Promise<Record<string, string>> {
    const response = await fetch(
      `${this.API_BASE}/images/${config.fileKey}?ids=${nodeIds.join(',')}&format=svg`,
      {
        headers: {
          'X-Figma-Token': config.accessToken,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch Figma images: ${response.statusText}`);
    }

    const data = await response.json();
    return data.images;
  }

  static async getFileStyles(config: FigmaConfig): Promise<Record<string, any>> {
    const response = await fetch(`${this.API_BASE}/files/${config.fileKey}/styles`, {
      headers: {
        'X-Figma-Token': config.accessToken,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Figma styles: ${response.statusText}`);
    }

    return response.json();
  }

  static extractDesignTokens(figmaFile: FigmaFile): DesignToken[] {
    const tokens: DesignToken[] = [];

    // Extract color tokens from styles
    Object.entries(figmaFile.styles).forEach(([styleId, style]) => {
      if (style.styleType === 'FILL') {
        const node = this.findNodeById(figmaFile.document, styleId);
        if (node?.fills?.[0]) {
          const fill = node.fills[0];
          if (fill.type === 'SOLID' && fill.color) {
            tokens.push({
              name: this.normalizeTokenName(node.name),
              type: 'color',
              value: this.figmaColorToCss(fill.color),
              description: node.name,
              figmaNodeId: styleId,
            });
          }
        }
      } else if (style.styleType === 'TEXT') {
        const node = this.findNodeById(figmaFile.document, styleId);
        if (node?.style) {
          tokens.push({
            name: this.normalizeTokenName(node.name),
            type: 'typography',
            value: this.figmaTypographyToCss(node.style),
            description: node.name,
            figmaNodeId: styleId,
          });
        }
      }
    });

    // Extract spacing tokens from components
    this.extractSpacingTokens(figmaFile.document, tokens);

    return tokens;
  }

  static extractComponents(figmaFile: FigmaFile): SyncedComponent[] {
    const components: SyncedComponent[] = [];

    Object.entries(figmaFile.components).forEach(([componentId, component]) => {
      const node = this.findNodeById(figmaFile.document, componentId);
      if (node) {
        components.push({
          id: componentId,
          name: component.name,
          type: component.componentSetId ? 'variant' : 'component',
          figmaNodeId: componentId,
          lastSynced: new Date().toISOString(),
          properties: this.extractComponentProperties(node),
        });
      }
    });

    return components;
  }

  private static findNodeById(node: FigmaNode, id: string): FigmaNode | null {
    if (node.id === id) return node;

    if (node.children) {
      for (const child of node.children) {
        const found = this.findNodeById(child, id);
        if (found) return found;
      }
    }

    return null;
  }

  private static normalizeTokenName(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private static figmaColorToCss(color: FigmaColor): string {
    const r = Math.round(color.r * 255);
    const g = Math.round(color.g * 255);
    const b = Math.round(color.b * 255);
    const a = color.a !== undefined ? color.a : 1;

    return a === 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  private static figmaTypographyToCss(style: FigmaStyle): string {
    const properties = [];

    if (style.fontFamily) properties.push(`font-family: ${style.fontFamily}`);
    if (style.fontWeight) properties.push(`font-weight: ${style.fontWeight}`);
    if (style.fontSize) properties.push(`font-size: ${style.fontSize}px`);
    if (style.letterSpacing) properties.push(`letter-spacing: ${style.letterSpacing}px`);
    if (style.lineHeightPx) properties.push(`line-height: ${style.lineHeightPx}px`);

    return properties.join('; ');
  }

  private static extractSpacingTokens(node: FigmaNode, tokens: DesignToken[]): void {
    if (node.name.toLowerCase().includes('spacing') || node.name.toLowerCase().includes('padding')) {
      if (node.absoluteBoundingBox) {
        const value = Math.min(node.absoluteBoundingBox.width, node.absoluteBoundingBox.height);
        if (value > 0) {
          tokens.push({
            name: this.normalizeTokenName(node.name),
            type: 'spacing',
            value: `${value}px`,
            description: node.name,
            figmaNodeId: node.id,
          });
        }
      }
    }

    if (node.children) {
      node.children.forEach(child => this.extractSpacingTokens(child, tokens));
    }
  }

  private static extractComponentProperties(node: FigmaNode): Record<string, any> {
    const properties: Record<string, any> = {};

    if (node.absoluteBoundingBox) {
      properties.width = node.absoluteBoundingBox.width;
      properties.height = node.absoluteBoundingBox.height;
    }

    if (node.fills?.[0]?.color) {
      properties.backgroundColor = this.figmaColorToCss(node.fills[0].color);
    }

    if (node.strokes?.[0]?.color) {
      properties.borderColor = this.figmaColorToCss(node.strokes[0].color);
    }

    if (node.style) {
      if (node.style.fontSize) properties.fontSize = `${node.style.fontSize}px`;
      if (node.style.fontFamily) properties.fontFamily = node.style.fontFamily;
      if (node.style.fontWeight) properties.fontWeight = node.style.fontWeight;
    }

    return properties;
  }

  static generateCssVariables(tokens: DesignToken[]): string {
    const cssVariables = tokens
      .map(token => `  --${token.name}: ${token.value};`)
      .join('\n');

    return `:root {
${cssVariables}
}`;
  }

  static generateTailwindConfig(tokens: DesignToken[]): Record<string, any> {
    const config: Record<string, any> = {
      theme: {
        extend: {
          colors: {},
          fontSize: {},
          spacing: {},
          borderRadius: {},
          boxShadow: {},
        },
      },
    };

    tokens.forEach(token => {
      switch (token.type) {
        case 'color':
          config.theme.extend.colors[token.name] = token.value;
          break;
        case 'spacing':
          config.theme.extend.spacing[token.name] = token.value;
          break;
        case 'border-radius':
          config.theme.extend.borderRadius[token.name] = token.value;
          break;
        case 'shadow':
          config.theme.extend.boxShadow[token.name] = token.value;
          break;
      }
    });

    return config;
  }

  static async syncWithFigma(config: FigmaConfig): Promise<{
    tokens: DesignToken[];
    components: SyncedComponent[];
  }> {
    try {
      const figmaFile = await this.getFile(config);
      const tokens = this.extractDesignTokens(figmaFile);
      const components = this.extractComponents(figmaFile);

      return { tokens, components };
    } catch (error) {
      console.error('Failed to sync with Figma:', error);
      throw error;
    }
  }
}

// Hook for React components to use Figma integration
export function useFigmaIntegration() {
  const [isConnected, setIsConnected] = React.useState(false);
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [lastSync, setLastSync] = React.useState<Date | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [tokens, setTokens] = React.useState<DesignToken[]>([]);
  const [components, setComponents] = React.useState<SyncedComponent[]>([]);

  const connect = React.useCallback(async (config: FigmaConfig) => {
    try {
      setError(null);
      setIsSyncing(true);

      // Test connection by fetching file
      await FigmaIntegration.getFile(config);
      setIsConnected(true);

      // Store config in localStorage
      localStorage.setItem('figma-config', JSON.stringify(config));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect to Figma';
      setError(errorMessage);
      setIsConnected(false);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  const disconnect = React.useCallback(() => {
    setIsConnected(false);
    setTokens([]);
    setComponents([]);
    setLastSync(null);
    localStorage.removeItem('figma-config');
  }, []);

  const sync = React.useCallback(async () => {
    const configStr = localStorage.getItem('figma-config');
    if (!configStr) {
      setError('No Figma configuration found');
      return;
    }

    try {
      setError(null);
      setIsSyncing(true);

      const config = JSON.parse(configStr);
      const { tokens: newTokens, components: newComponents } = await FigmaIntegration.syncWithFigma(config);

      setTokens(newTokens);
      setComponents(newComponents);
      setLastSync(new Date());

      // Store synced data
      localStorage.setItem('figma-tokens', JSON.stringify(newTokens));
      localStorage.setItem('figma-components', JSON.stringify(newComponents));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sync with Figma';
      setError(errorMessage);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  const exportToCss = React.useCallback(() => {
    const css = FigmaIntegration.generateCssVariables(tokens);

    // Download as CSS file
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'figma-tokens.css';
    a.click();
    URL.revokeObjectURL(url);

    return css;
  }, [tokens]);

  const exportToTailwind = React.useCallback(() => {
    const config = FigmaIntegration.generateTailwindConfig(tokens);
    const configJs = `/** @type {import('tailwindcss').Config} */
module.exports = ${JSON.stringify(config, null, 2)};`;

    // Download as JS file
    const blob = new Blob([configJs], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tailwind.config.js';
    a.click();
    URL.revokeObjectURL(url);

    return config;
  }, [tokens]);

  // Load stored data on mount
  React.useEffect(() => {
    const configStr = localStorage.getItem('figma-config');
    const tokensStr = localStorage.getItem('figma-tokens');
    const componentsStr = localStorage.getItem('figma-components');

    if (configStr) {
      setIsConnected(true);
    }

    if (tokensStr) {
      try {
        setTokens(JSON.parse(tokensStr));
      } catch (error) {
        console.error('Failed to parse stored tokens:', error);
      }
    }

    if (componentsStr) {
      try {
        setComponents(JSON.parse(componentsStr));
      } catch (error) {
        console.error('Failed to parse stored components:', error);
      }
    }
  }, []);

  return {
    isConnected,
    isSyncing,
    lastSync,
    error,
    tokens,
    components,
    connect,
    disconnect,
    sync,
    exportToCss,
    exportToTailwind,
  };
}