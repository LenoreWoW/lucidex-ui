/**
 * GitHub Export Integration
 * Exports components and templates as GitHub repositories or Gists
 */

import { Component } from '@/types';
import { Template } from '@/types/templates';
import { LiveCodeGenerator } from './live-code-environments';

export interface GitHubExportConfig {
  token?: string; // GitHub Personal Access Token
  username?: string; // GitHub username
  repositoryName?: string;
  description?: string;
  isPrivate?: boolean;
  files: Record<string, string>;
  commitMessage?: string;
}

export interface GitHubGistConfig {
  token?: string; // GitHub Personal Access Token
  filename: string;
  description?: string;
  isPublic?: boolean;
  content: string;
}

export interface GitHubRepositoryInfo {
  name: string;
  fullName: string;
  url: string;
  cloneUrl: string;
  sshUrl: string;
  description?: string;
  isPrivate: boolean;
}

export interface GitHubGistInfo {
  id: string;
  url: string;
  htmlUrl: string;
  description?: string;
  isPublic: boolean;
  files: Record<string, { filename: string; content: string }>;
}

export class GitHubExporter {
  private static readonly API_BASE = 'https://api.github.com';

  static async createRepository(config: GitHubExportConfig): Promise<GitHubRepositoryInfo> {
    const { token, username, repositoryName, description, isPrivate = false, files, commitMessage = 'Initial commit from Lucidex UI' } = config;

    if (!token || !username || !repositoryName) {
      throw new Error('GitHub token, username, and repository name are required');
    }

    try {
      // Create repository
      const createRepoResponse = await fetch(`${this.API_BASE}/user/repos`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github+json',
          'Content-Type': 'application/json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
        body: JSON.stringify({
          name: repositoryName,
          description: description || 'Exported from Lucidex UI',
          private: isPrivate,
          auto_init: false,
        }),
      });

      if (!createRepoResponse.ok) {
        const error = await createRepoResponse.json();
        throw new Error(`Failed to create repository: ${error.message || createRepoResponse.statusText}`);
      }

      const repository = await createRepoResponse.json();

      // Create files in repository
      await this.createRepositoryFiles(token, username, repositoryName, files, commitMessage);

      return {
        name: repository.name,
        fullName: repository.full_name,
        url: repository.html_url,
        cloneUrl: repository.clone_url,
        sshUrl: repository.ssh_url,
        description: repository.description,
        isPrivate: repository.private,
      };
    } catch (error) {
      console.error('GitHub repository creation failed:', error);
      throw error;
    }
  }

  static async createGist(config: GitHubGistConfig): Promise<GitHubGistInfo> {
    const { token, filename, description, isPublic = true, content } = config;

    if (!token || !filename || !content) {
      throw new Error('GitHub token, filename, and content are required');
    }

    try {
      const response = await fetch(`${this.API_BASE}/gists`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github+json',
          'Content-Type': 'application/json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
        body: JSON.stringify({
          description: description || 'Exported from Lucidex UI',
          public: isPublic,
          files: {
            [filename]: {
              content,
            },
          },
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Failed to create gist: ${error.message || response.statusText}`);
      }

      const gist = await response.json();

      return {
        id: gist.id,
        url: gist.url,
        htmlUrl: gist.html_url,
        description: gist.description,
        isPublic: gist.public,
        files: gist.files,
      };
    } catch (error) {
      console.error('GitHub gist creation failed:', error);
      throw error;
    }
  }

  private static async createRepositoryFiles(
    token: string,
    username: string,
    repositoryName: string,
    files: Record<string, string>,
    commitMessage: string
  ): Promise<void> {
    // Get the default branch (usually 'main' or 'master')
    const branchResponse = await fetch(`${this.API_BASE}/repos/${username}/${repositoryName}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    if (!branchResponse.ok) {
      throw new Error('Failed to get repository information');
    }

    const repoInfo = await branchResponse.json();
    const defaultBranch = repoInfo.default_branch || 'main';

    // Create files using the Contents API
    for (const [path, content] of Object.entries(files)) {
      await this.createOrUpdateFile(token, username, repositoryName, path, content, commitMessage, defaultBranch);
    }
  }

  private static async createOrUpdateFile(
    token: string,
    username: string,
    repositoryName: string,
    path: string,
    content: string,
    commitMessage: string,
    branch: string
  ): Promise<void> {
    const encodedContent = btoa(unescape(encodeURIComponent(content)));

    const response = await fetch(`${this.API_BASE}/repos/${username}/${repositoryName}/contents/${path}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      body: JSON.stringify({
        message: commitMessage,
        content: encodedContent,
        branch,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to create file ${path}: ${error.message || response.statusText}`);
    }
  }

  static generateComponentRepository(component: Component, framework: 'react' | 'nextjs' = 'react'): Record<string, string> {
    const files = LiveCodeGenerator.generateReactProjectFiles(
      component.code?.[framework] || component.code?.react || '',
      component.name
    );

    // Add additional files
    files['README.md'] = this.generateComponentReadme(component, framework);
    files['package.json'] = JSON.stringify(this.generatePackageJson(component.name, 'component'), null, 2);
    files['.gitignore'] = this.generateGitignore();
    files['LICENSE'] = this.generateLicense(component.name);

    return files;
  }

  static generateTemplateRepository(template: Template, framework: 'react' | 'nextjs' = 'react'): Record<string, string> {
    const mainSnippet = template.codeSnippets.find(
      snippet => snippet.language === framework || snippet.language === 'react' || snippet.language === 'tsx'
    );

    const files = LiveCodeGenerator.generateTemplateProjectFiles(
      mainSnippet?.code || '',
      template.name,
      framework
    );

    // Add additional files
    files['README.md'] = this.generateTemplateReadme(template, framework);
    files['package.json'] = JSON.stringify(this.generatePackageJson(template.name, 'template'), null, 2);
    files['.gitignore'] = this.generateGitignore();
    files['LICENSE'] = this.generateLicense(template.name);

    // Add all code snippets as examples
    template.codeSnippets.forEach((snippet, index) => {
      const extension = this.getFileExtension(snippet.language);
      files[`examples/${snippet.language}-example${extension}`] = snippet.code;
    });

    return files;
  }

  private static generateComponentReadme(component: Component, framework: string): string {
    return `# ${component.name}

${component.description || 'A reusable component from Lucidex UI'}

## Features

${component.features?.map(feature => `- ${feature}`).join('\n') || 'No features listed'}

## Installation

\`\`\`bash
npm install
\`\`\`

## Usage

\`\`\`${framework === 'nextjs' ? 'tsx' : 'jsx'}
import { ${component.name} } from './src/components/${component.name}';

function App() {
  return (
    <div>
      <${component.name} />
    </div>
  );
}
\`\`\`

## Props

${component.props?.map(prop => `- **${prop.name}** (${prop.type}): ${prop.description || 'No description'}`).join('\n') || 'No props documented'}

## Framework

This component is built for ${framework === 'nextjs' ? 'Next.js' : 'React'}.

## License

MIT License - see LICENSE file for details.

---

*Generated from [Lucidex UI](https://lucidex-ui.example.com) - Bring clarity to your design system*
`;
  }

  private static generateTemplateReadme(template: Template, framework: string): string {
    return `# ${template.name}

${template.description || 'A template from Lucidex UI'}

## Overview

- **Category**: ${template.category}
- **Complexity**: ${template.metadata?.complexity || 'Not specified'}
- **Version**: ${template.metadata?.version || '1.0.0'}
- **Author**: ${template.metadata?.author || 'Lucidex UI Team'}

## Features

- ✅ Responsive design
- ✅ Qatar GBA compliant colors
- ✅ Accessibility (WCAG 2.1 AA)
- ✅ Dark mode support
- ✅ TypeScript support

## Installation

\`\`\`bash
npm install
npm run dev
\`\`\`

## Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run start\` - Start production server
- \`npm run lint\` - Run ESLint

## Tags

${template.tags.map(tag => `\`${tag}\``).join(', ') || 'No tags'}

## Code Examples

This template includes examples for multiple frameworks in the \`examples/\` directory:

${template.codeSnippets.map(snippet => `- **${snippet.language}**: \`examples/${snippet.language}-example${this.getFileExtension(snippet.language)}\``).join('\n')}

## Framework

This template is built for ${framework === 'nextjs' ? 'Next.js' : 'React'}.

## License

MIT License - see LICENSE file for details.

---

*Generated from [Lucidex UI](https://lucidex-ui.example.com) - Bring clarity to your design system*
`;
  }

  private static generatePackageJson(name: string, type: 'component' | 'template'): any {
    const formattedName = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    const basePackage = {
      name: formattedName,
      version: '1.0.0',
      description: `${type === 'component' ? 'Component' : 'Template'} generated from Lucidex UI`,
      main: type === 'component' ? 'src/index.tsx' : 'src/App.tsx',
      scripts: {
        dev: 'next dev',
        build: 'next build',
        start: 'next start',
        lint: 'next lint',
        export: 'next build && next export'
      },
      dependencies: {
        'next': '^14.2.0',
        'react': '^18.2.0',
        'react-dom': '^18.2.0',
        'tailwindcss': '^3.4.0',
        'clsx': '^2.1.1',
        '@lucidex-ui/tokens': 'latest'
      },
      devDependencies: {
        '@types/node': '^20',
        '@types/react': '^18',
        '@types/react-dom': '^18',
        'eslint': '^8',
        'eslint-config-next': '14.2.0',
        'typescript': '^5',
        'autoprefixer': '^10.0.1',
        'postcss': '^8'
      },
      keywords: [
        'lucidex-ui',
        'react',
        'nextjs',
        'typescript',
        'tailwind',
        'component-library',
        type
      ],
      author: 'Lucidex UI Team',
      license: 'MIT',
      repository: {
        type: 'git',
        url: `https://github.com/user/${formattedName}.git`
      }
    };

    return basePackage;
  }

  private static generateGitignore(): string {
    return `# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build
/dist

# Environment variables
.env.local
.env.development.local
.env.test.local
.env.production.local

# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage

# Dependency directories
node_modules/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# next.js build output
.next
out

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless

# IDE
.vscode
.idea
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
`;
  }

  private static generateLicense(projectName: string): string {
    const year = new Date().getFullYear();
    return `MIT License

Copyright (c) ${year} Lucidex UI Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

This project was generated from Lucidex UI (https://lucidex-ui.example.com)
"${projectName}" - Bring clarity to your design system
`;
  }

  private static getFileExtension(language: string): string {
    const extensions: Record<string, string> = {
      'javascript': '.js',
      'typescript': '.ts',
      'react': '.jsx',
      'jsx': '.jsx',
      'tsx': '.tsx',
      'nextjs': '.tsx',
      'html': '.html',
      'css': '.css',
      'scss': '.scss',
      'json': '.json',
      'md': '.md',
      'markdown': '.md',
    };

    return extensions[language.toLowerCase()] || '.txt';
  }
}

// Hook for React components to use GitHub export features
export function useGitHubExport() {
  const [isExporting, setIsExporting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const exportAsRepository = async (
    config: GitHubExportConfig
  ): Promise<GitHubRepositoryInfo | null> => {
    setIsExporting(true);
    setError(null);

    try {
      const repository = await GitHubExporter.createRepository(config);
      return repository;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to export to GitHub repository';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsExporting(false);
    }
  };

  const exportAsGist = async (
    config: GitHubGistConfig
  ): Promise<GitHubGistInfo | null> => {
    setIsExporting(true);
    setError(null);

    try {
      const gist = await GitHubExporter.createGist(config);
      return gist;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to export to GitHub gist';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsExporting(false);
    }
  };

  return {
    exportAsRepository,
    exportAsGist,
    isExporting,
    error,
  };
}

// Import React for the hook
import React from 'react';