import { Component, FrameworkType, GeneratedCode } from '@/types';
import { generateReactCode } from './react-generator';
import { generateNextjsCode } from './nextjs-generator';
import { generateBlazorCode } from './blazor-generator';
import { generateHtmlCode } from './html-generator';
import { generateTypeScriptCode } from './typescript-generator';

export interface CodeGeneratorOptions {
  includeProps?: boolean;
  includeTypes?: boolean;
  includeComments?: boolean;
  includeImports?: boolean;
  styleFramework?: 'tailwind' | 'css-modules' | 'styled-components' | 'css';
  typescript?: boolean;
}

export interface PropDefinition {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description?: string;
}

export interface ComponentMetadata {
  name: string;
  description: string;
  props: PropDefinition[];
  examples: string[];
  features: string[];
  category: string;
}

const defaultOptions: CodeGeneratorOptions = {
  includeProps: true,
  includeTypes: true,
  includeComments: true,
  includeImports: true,
  styleFramework: 'tailwind',
  typescript: true,
};

export class CodeGeneratorService {
  static generateCode(
    component: Component,
    framework: FrameworkType,
    options: Partial<CodeGeneratorOptions> = {}
  ): GeneratedCode {
    const mergedOptions = { ...defaultOptions, ...options };

    switch (framework) {
      case 'react':
        return generateReactCode(component, mergedOptions);
      case 'nextjs':
        return generateNextjsCode(component, mergedOptions);
      case 'blazor':
        return generateBlazorCode(component, mergedOptions);
      case 'html':
        return generateHtmlCode(component, mergedOptions);
      case 'typescript':
        return generateTypeScriptCode(component, mergedOptions);
      default:
        throw new Error(`Unsupported framework: ${framework}`);
    }
  }

  static getFrameworkFileExtension(framework: FrameworkType): string {
    switch (framework) {
      case 'react':
      case 'nextjs':
        return '.tsx';
      case 'blazor':
        return '.razor';
      case 'html':
        return '.html';
      case 'typescript':
        return '.ts';
      default:
        return '.tsx';
    }
  }

  static getFrameworkLanguage(framework: FrameworkType): string {
    switch (framework) {
      case 'react':
      case 'nextjs':
        return 'tsx';
      case 'blazor':
        return 'razor';
      case 'html':
        return 'html';
      case 'typescript':
        return 'typescript';
      default:
        return 'tsx';
    }
  }
}

// Utility functions for common code generation tasks
export function generatePropInterface(
  componentName: string,
  props: PropDefinition[]
): string {
  const propsInterface = props
    .map(prop => {
      const optional = prop.required ? '' : '?';
      const comment = prop.description ? `  /** ${prop.description} */\n` : '';
      return `${comment}  ${prop.name}${optional}: ${prop.type};`;
    })
    .join('\n');

  return `interface ${componentName}Props {
${propsInterface}
}`;
}

export function generateImports(dependencies: string[]): string {
  const imports: string[] = [];

  if (dependencies.includes('react')) {
    imports.push("import React from 'react';");
  }

  if (dependencies.includes('clsx')) {
    imports.push("import { cn } from '@/lib/utils';");
  }

  // Add other common imports
  dependencies.forEach(dep => {
    if (dep.startsWith('@/') || dep.startsWith('./')) {
      imports.push(`import { } from '${dep}';`);
    }
  });

  return imports.join('\n');
}

export function toPascalCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, word => word.toUpperCase())
    .replace(/\s+/g, '')
    .replace(/[^a-zA-Z0-9]/g, '');
}

export function toCamelCase(str: string): string {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '');
}

export * from './react-generator';
export * from './nextjs-generator';
export * from './blazor-generator';
export * from './html-generator';
export * from './typescript-generator';
