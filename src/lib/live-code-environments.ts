/**
 * Live Code Environment Integration
 * Supports StackBlitz and CodeSandbox for interactive code editing
 */

export interface LiveCodeEnvironmentConfig {
  provider: 'stackblitz' | 'codesandbox';
  template: 'react' | 'nextjs' | 'vanilla';
  title: string;
  description?: string;
  files: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  settings?: {
    compile?: {
      trigger?: 'auto' | 'keystroke' | 'save';
      clearConsole?: boolean;
    };
    hot?: boolean;
    liveEdit?: boolean;
  };
}

export interface StackBlitzConfig extends LiveCodeEnvironmentConfig {
  provider: 'stackblitz';
  openFile?: string;
  hideNavigation?: boolean;
  hideDevTools?: boolean;
  terminalHeight?: number;
  theme?: 'light' | 'dark';
}

export interface CodeSandboxConfig extends LiveCodeEnvironmentConfig {
  provider: 'codesandbox';
  view?: 'editor' | 'split' | 'preview';
  hideNavigation?: boolean;
  codemirror?: 0 | 1;
  fontsize?: number;
  highlights?: string[];
  initialpath?: string;
  module?: string;
  theme?: 'dark' | 'light';
}

/**
 * StackBlitz API integration
 */
export class StackBlitzEnvironment {
  static generateEmbedUrl(config: StackBlitzConfig): string {
    const params = new URLSearchParams();

    if (config.openFile) params.set('file', config.openFile);
    if (config.hideNavigation) params.set('hideNavigation', '1');
    if (config.hideDevTools) params.set('hideDevTools', '1');
    if (config.terminalHeight) params.set('terminalHeight', config.terminalHeight.toString());
    if (config.theme) params.set('theme', config.theme);
    if (config.settings?.compile?.trigger) params.set('startScript', config.settings.compile.trigger);

    const baseUrl = 'https://stackblitz.com/github';
    return `${baseUrl}?${params.toString()}`;
  }

  static async createProject(config: StackBlitzConfig): Promise<string> {
    const projectData = {
      title: config.title,
      description: config.description || '',
      template: this.getStackBlitzTemplate(config.template),
      files: config.files,
      dependencies: {
        ...this.getDefaultDependencies(config.template),
        ...config.dependencies,
      },
      devDependencies: config.devDependencies || {},
      settings: config.settings || {},
    };

    try {
      const response = await fetch('https://stackblitz.com/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error('Failed to create StackBlitz project');
      }

      const result = await response.json();
      return result.url;
    } catch (error) {
      console.error('StackBlitz creation failed:', error);
      throw error;
    }
  }

  private static getStackBlitzTemplate(template: string): string {
    switch (template) {
      case 'react':
        return 'react-ts';
      case 'nextjs':
        return 'nextjs';
      case 'vanilla':
        return 'typescript';
      default:
        return 'react-ts';
    }
  }

  private static getDefaultDependencies(template: string): Record<string, string> {
    const common = {
      '@lucidex-ui/tokens': 'latest',
      'tailwindcss': '^3.4.0',
      'clsx': '^2.1.1',
    };

    switch (template) {
      case 'react':
        return {
          ...common,
          'react': '^18.2.0',
          'react-dom': '^18.2.0',
          '@types/react': '^18.2.0',
          '@types/react-dom': '^18.2.0',
        };
      case 'nextjs':
        return {
          ...common,
          'next': '^14.2.0',
          'react': '^18.2.0',
          'react-dom': '^18.2.0',
        };
      case 'vanilla':
        return common;
      default:
        return common;
    }
  }
}

/**
 * CodeSandbox API integration
 */
export class CodeSandboxEnvironment {
  static generateEmbedUrl(config: CodeSandboxConfig): string {
    const params = new URLSearchParams();

    if (config.view) params.set('view', config.view);
    if (config.hideNavigation) params.set('hidenavigation', '1');
    if (config.codemirror !== undefined) params.set('codemirror', config.codemirror.toString());
    if (config.fontsize) params.set('fontsize', config.fontsize.toString());
    if (config.highlights) params.set('highlights', config.highlights.join(','));
    if (config.initialpath) params.set('initialpath', config.initialpath);
    if (config.module) params.set('module', config.module);
    if (config.theme) params.set('theme', config.theme);

    const baseUrl = 'https://codesandbox.io/embed';
    return `${baseUrl}?${params.toString()}`;
  }

  static async createSandbox(config: CodeSandboxConfig): Promise<string> {
    const sandboxData = {
      files: this.formatFiles(config.files),
      template: this.getCodeSandboxTemplate(config.template),
      title: config.title,
      description: config.description || '',
    };

    try {
      const response = await fetch('https://codesandbox.io/api/v1/sandboxes/define?json=1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sandboxData),
      });

      if (!response.ok) {
        throw new Error('Failed to create CodeSandbox');
      }

      const result = await response.json();
      return `https://codesandbox.io/s/${result.sandbox_id}`;
    } catch (error) {
      console.error('CodeSandbox creation failed:', error);
      throw error;
    }
  }

  private static getCodeSandboxTemplate(template: string): string {
    switch (template) {
      case 'react':
        return 'react-ts';
      case 'nextjs':
        return 'nextjs';
      case 'vanilla':
        return 'vanilla-ts';
      default:
        return 'react-ts';
    }
  }

  private static formatFiles(files: Record<string, string>): Record<string, { content: string }> {
    const formatted: Record<string, { content: string }> = {};

    Object.entries(files).forEach(([path, content]) => {
      formatted[path] = { content };
    });

    return formatted;
  }
}

/**
 * Utility functions for generating live code environments
 */
export class LiveCodeGenerator {
  static generateReactProjectFiles(componentCode: string, componentName: string): Record<string, string> {
    return {
      'src/App.tsx': `import React from 'react';
import { ${componentName} } from './components/${componentName}';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Lucidex UI - ${componentName}</h1>
        <div className="component-preview">
          <${componentName} />
        </div>
      </header>
    </div>
  );
}

export default App;`,

      [`src/components/${componentName}.tsx`]: componentCode,

      'src/App.css': `body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.App {
  text-align: center;
}

.App-header {
  background-color: #282c34;
  padding: 20px;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.component-preview {
  margin-top: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  color: #333;
  max-width: 800px;
}`,

      'public/index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Lucidex UI Component Preview" />
    <title>Lucidex UI - ${componentName}</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>`,

      'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f3',
          100: '#dcf2e5',
          200: '#bce5cf',
          300: '#8dd0b0',
          400: '#57b389',
          500: '#339968',
          600: '#257a53',
          700: '#1f6244',
          800: '#1c4f37',
          900: '#18412f',
          950: '#0c2419',
        },
        accent: {
          50: '#f1f5f9',
          100: '#e2e8f0',
          200: '#cbd5e1',
          300: '#94a3b8',
          400: '#64748b',
          500: '#475569',
          600: '#334155',
          700: '#1e293b',
          800: '#0f172a',
          900: '#020617',
          950: '#003865',
        },
      },
    },
  },
  plugins: [],
}`,
    };
  }

  static generateNextJsProjectFiles(componentCode: string, componentName: string): Record<string, string> {
    return {
      'pages/_app.tsx': `import type { AppProps } from 'next/app'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}`,

      'pages/index.tsx': `import React from 'react';
import { ${componentName} } from '../components/${componentName}';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Lucidex UI - ${componentName}
          </h1>
          <p className="text-gray-600 mt-2">
            Interactive component preview with Next.js
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <${componentName} />
        </div>
      </div>
    </div>
  )
}`,

      [`components/${componentName}.tsx`]: componentCode,

      'styles/globals.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}`,

      'next.config.js': `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig`,

      'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f3',
          100: '#dcf2e5',
          200: '#bce5cf',
          300: '#8dd0b0',
          400: '#57b389',
          500: '#339968',
          600: '#257a53',
          700: '#1f6244',
          800: '#1c4f37',
          900: '#18412f',
          950: '#0c2419',
        },
      },
    },
  },
  plugins: [],
}`,

      'tsconfig.json': `{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}`,
    };
  }

  static generateTemplateProjectFiles(templateCode: string, templateName: string, framework: 'react' | 'nextjs'): Record<string, string> {
    if (framework === 'nextjs') {
      return {
        'pages/index.tsx': templateCode,
        ...this.getCommonNextJsFiles(),
      };
    } else {
      return {
        'src/App.tsx': templateCode,
        'src/index.tsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
        ...this.getCommonReactFiles(),
      };
    }
  }

  private static getCommonReactFiles(): Record<string, string> {
    return {
      'src/index.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}`,
      'public/index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <title>Lucidex UI Template Preview</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
    };
  }

  private static getCommonNextJsFiles(): Record<string, string> {
    return {
      'styles/globals.css': `@tailwind base;
@tailwind components;
@tailwind utilities;`,
      'next.config.js': `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
module.exports = nextConfig`,
    };
  }
}

/**
 * Hook for managing live code environments
 */
export function useLiveCodeEnvironment() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const createEnvironment = async (config: LiveCodeEnvironmentConfig): Promise<string> => {
    setLoading(true);
    setError(null);

    try {
      let url: string;

      if (config.provider === 'stackblitz') {
        url = await StackBlitzEnvironment.createProject(config as StackBlitzConfig);
      } else {
        url = await CodeSandboxEnvironment.createSandbox(config as CodeSandboxConfig);
      }

      return url;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create live environment';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return {
    createEnvironment,
    openInNewTab,
    loading,
    error,
  };
}

// Import React for the hook
import React from 'react';