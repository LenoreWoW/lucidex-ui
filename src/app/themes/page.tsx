'use client';

import React, { useState } from 'react';
import {
  ThemeGenerator,
  type ThemeConfig,
  type GeneratedTheme
} from '@/lib/theme-generator';

const DEFAULT_CONFIG: ThemeConfig = {
  name: 'Custom Theme',
  description: 'A custom theme configuration',
  baseColors: {
    primary: '#3b82f6',
    secondary: '#6b7280',
    accent: '#8b5cf6',
    neutral: '#6b7280',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      serif: ['Georgia', 'serif'],
      mono: ['Fira Code', 'monospace'],
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
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  spacing: {
    '0': '0px',
    '1': '0.25rem',
    '2': '0.5rem',
    '4': '1rem',
    '8': '2rem',
    '16': '4rem',
  },
  borderRadius: {
    none: '0px',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    DEFAULT: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px rgba(0,0,0,0.1)',
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
import {
  Copy,
  Download,
  Palette,
  Save,
  Upload,
  Eye,
  Code,
  Paintbrush,
  Wand2
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ThemesPage() {
  const [config, setConfig] = useState<ThemeConfig>(DEFAULT_CONFIG);
  const [theme, setTheme] = useState<GeneratedTheme | null>(null);
  const [activeTab, setActiveTab] = useState<'generator' | 'preview' | 'code'>('generator');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateTheme = async () => {
    setIsGenerating(true);

    try {
      // Simulate generation time for better UX
      await new Promise(resolve => setTimeout(resolve, 500));

      const generatedTheme = ThemeGenerator.generateTheme(config);

      setTheme(generatedTheme);
      setActiveTab('preview');
    } catch (error) {
      console.error('Theme generation failed:', error);
      alert(`Theme generation failed: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async (content: string, type: string) => {
    try {
      await navigator.clipboard.writeText(content);
      // Could add toast notification here
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCSS = () => {
    if (!theme) return;
    const css = ThemeGenerator.generateCSSVariables(theme);
    downloadFile(css, 'theme.css', 'text/css');
  };

  const handleExportTailwind = () => {
    if (!theme) return;
    const tailwindConfig = ThemeGenerator.generateTailwindConfigExport(theme);
    const configContent = `/** @type {import('tailwindcss').Config} */
module.exports = ${JSON.stringify(tailwindConfig, null, 2)};`;
    downloadFile(configContent, 'tailwind.config.js', 'text/javascript');
  };

  const handleExportFigma = () => {
    if (!theme) return;
    const figmaTokens = ThemeGenerator.generateFigmaTokensExport(theme);
    downloadFile(JSON.stringify(figmaTokens, null, 2), 'figma-tokens.json', 'application/json');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="border-b bg-gradient-to-r from-qgba-maroon/5 to-qgba-navy/5">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl">
            <h1 className="mb-4 text-4xl font-bold">Theme Generator</h1>
            <p className="mb-6 text-xl text-muted-foreground">
              Create custom themes with accessible color palettes, typography scales, and design tokens.
              Export to CSS variables, Tailwind config, or Figma tokens.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full border border-qgba-maroon/20 bg-qgba-maroon/10 px-3 py-1 text-sm font-medium text-qgba-maroon">
                Accessible Colors
              </span>
              <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                WCAG Compliant
              </span>
              <span className="inline-flex items-center rounded-full border bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                Multiple Formats
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="mb-8 flex space-x-1 rounded-lg border bg-muted p-1">
          {[
            { id: 'generator', label: 'Configure', icon: Paintbrush },
            { id: 'preview', label: 'Preview', icon: Eye },
            { id: 'code', label: 'Export', icon: Code },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                'flex items-center space-x-2 rounded-md px-4 py-2 text-sm font-medium transition-all',
                activeTab === tab.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Configuration Panel */}
          {activeTab === 'generator' && (
            <>
              <div className="lg:col-span-4">
                <div className="sticky top-4 space-y-6">
                  <div className="rounded-lg border bg-card p-6">
                    <h3 className="mb-4 font-semibold">Theme Configuration</h3>

                    <div className="space-y-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium">Theme Name</label>
                        <input
                          type="text"
                          value={config.name}
                          onChange={(e) => setConfig({ ...config, name: e.target.value })}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          placeholder="My Custom Theme"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium">Primary Color</label>
                        <div className="flex space-x-2">
                          <input
                            type="color"
                            value={config.baseColors.primary}
                            onChange={(e) => setConfig({
                              ...config,
                              baseColors: { ...config.baseColors, primary: e.target.value }
                            })}
                            className="h-10 w-16 rounded border border-input"
                          />
                          <input
                            type="text"
                            value={config.baseColors.primary}
                            onChange={(e) => setConfig({
                              ...config,
                              baseColors: { ...config.baseColors, primary: e.target.value }
                            })}
                            className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="#000000"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium">Secondary Color</label>
                        <div className="flex space-x-2">
                          <input
                            type="color"
                            value={config.baseColors.secondary || '#6b7280'}
                            onChange={(e) => setConfig({
                              ...config,
                              baseColors: { ...config.baseColors, secondary: e.target.value }
                            })}
                            className="h-10 w-16 rounded border border-input"
                          />
                          <input
                            type="text"
                            value={config.baseColors.secondary || '#6b7280'}
                            onChange={(e) => setConfig({
                              ...config,
                              baseColors: { ...config.baseColors, secondary: e.target.value }
                            })}
                            className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="#6b7280"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium">Primary Font Family</label>
                        <select
                          value={config.typography.fontFamily.sans[0]}
                          onChange={(e) => setConfig({
                            ...config,
                            typography: {
                              ...config.typography,
                              fontFamily: {
                                ...config.typography.fontFamily,
                                sans: [e.target.value, 'system-ui', 'sans-serif']
                              }
                            }
                          })}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          <option value="Inter">Inter</option>
                          <option value="Roboto">Roboto</option>
                          <option value="Open Sans">Open Sans</option>
                          <option value="Lato">Lato</option>
                          <option value="Poppins">Poppins</option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium">Dark Mode</label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={config.darkMode}
                            onChange={(e) => setConfig({
                              ...config,
                              darkMode: e.target.checked
                            })}
                            className="mr-2 rounded border border-input"
                          />
                          <span className="text-sm">Enable dark mode variants</span>
                        </label>
                      </div>
                    </div>

                    <button
                      onClick={generateTheme}
                      disabled={isGenerating}
                      className={cn(
                        'mt-6 flex w-full items-center justify-center space-x-2 rounded-md px-4 py-3',
                        'bg-qgba-gold text-qgba-gold-foreground hover:bg-qgba-gold/90',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                        'transition-colors font-medium'
                      )}
                    >
                      {isGenerating ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      ) : (
                        <Wand2 className="h-4 w-4" />
                      )}
                      <span>{isGenerating ? 'Generating...' : 'Generate Theme'}</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8">
                {theme ? (
                  <div className="space-y-6">
                    <div className="rounded-lg border bg-card p-6">
                      <h3 className="mb-4 font-semibold">Generated Theme Preview</h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {theme.tokens.map((token) => (
                          <div key={token.name} className="space-y-2">
                            <h4 className="text-sm font-medium capitalize">{token.name}</h4>
                            <div className="grid grid-cols-5 gap-1">
                              {token.variants ? token.variants.map((variant) => (
                                <div
                                  key={variant.name}
                                  className="group relative h-12 rounded border border-border cursor-pointer"
                                  style={{ backgroundColor: variant.value }}
                                  title={`${token.name}-${variant.name}: ${variant.value}`}
                                  onClick={() => copyToClipboard(variant.value, 'color')}
                                >
                                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-xs font-mono text-white mix-blend-difference">
                                      {variant.name}
                                    </span>
                                  </div>
                                </div>
                              )) : (
                                <div
                                  className="group relative h-12 rounded border border-border cursor-pointer"
                                  style={{ backgroundColor: token.value }}
                                  title={`${token.name}: ${token.value}`}
                                  onClick={() => copyToClipboard(token.value, 'color')}
                                >
                                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-xs font-mono text-white mix-blend-difference">
                                      base
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-64 items-center justify-center rounded-lg border border-dashed">
                    <div className="text-center">
                      <Palette className="mx-auto h-12 w-12 text-muted-foreground/50" />
                      <h3 className="mt-2 text-lg font-medium">No theme generated</h3>
                      <p className="text-muted-foreground">Configure your theme and click generate to see the preview</p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Preview Tab */}
          {activeTab === 'preview' && (
            <div className="lg:col-span-12">
              {theme ? (
                <div className="space-y-6">
                  {/* Component Preview */}
                  <div className="rounded-lg border bg-card p-6">
                    <h3 className="mb-4 font-semibold">Component Preview</h3>
                    {/* Add component previews with generated theme */}
                    <div className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Sample components styled with the generated theme */}
                        <div className="space-y-2">
                          {(() => {
                            const primaryToken = theme.tokens.find(t => t.name === 'primary');
                            const primary500 = primaryToken?.variants?.find(v => v.name === '500')?.value || primaryToken?.value || '#3b82f6';
                            const primary100 = primaryToken?.variants?.find(v => v.name === '100')?.value || '#dbeafe';
                            return (
                              <>
                                <button
                                  className="w-full rounded-md px-4 py-2 text-sm font-medium text-white"
                                  style={{ backgroundColor: primary500 }}
                                >
                                  Primary Button
                                </button>
                                <button
                                  className="w-full rounded-md border px-4 py-2 text-sm font-medium bg-white"
                                  style={{ borderColor: primary500, color: primary500 }}
                                >
                                  Secondary Button
                                </button>
                                <div
                                  className="w-full rounded-md px-4 py-2 text-sm"
                                  style={{ backgroundColor: primary100, color: primary500 }}
                                >
                                  Info Card
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center rounded-lg border border-dashed">
                  <div className="text-center">
                    <Eye className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <h3 className="mt-2 text-lg font-medium">No theme to preview</h3>
                    <p className="text-muted-foreground">Generate a theme first to see the preview</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Export Tab */}
          {activeTab === 'code' && (
            <div className="lg:col-span-12">
              {theme ? (
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={handleExportCSS}
                      className="flex items-center space-x-2 rounded-md border px-4 py-2 text-sm hover:bg-accent"
                    >
                      <Download className="h-4 w-4" />
                      <span>Export CSS</span>
                    </button>
                    <button
                      onClick={handleExportTailwind}
                      className="flex items-center space-x-2 rounded-md border px-4 py-2 text-sm hover:bg-accent"
                    >
                      <Download className="h-4 w-4" />
                      <span>Export Tailwind Config</span>
                    </button>
                    <button
                      onClick={handleExportFigma}
                      className="flex items-center space-x-2 rounded-md border px-4 py-2 text-sm hover:bg-accent"
                    >
                      <Download className="h-4 w-4" />
                      <span>Export Figma Tokens</span>
                    </button>
                  </div>

                  <div className="rounded-lg border bg-card">
                    <div className="border-b p-4">
                      <h3 className="font-semibold">CSS Variables</h3>
                    </div>
                    <div className="relative">
                      <pre className="overflow-x-auto p-4 text-sm">
                        <code>{ThemeGenerator.generateCSSVariables(theme)}</code>
                      </pre>
                      <button
                        onClick={() => copyToClipboard(ThemeGenerator.generateCSSVariables(theme), 'CSS')}
                        className="absolute right-2 top-2 rounded p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center rounded-lg border border-dashed">
                  <div className="text-center">
                    <Code className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <h3 className="mt-2 text-lg font-medium">No theme to export</h3>
                    <p className="text-muted-foreground">Generate a theme first to see export options</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}