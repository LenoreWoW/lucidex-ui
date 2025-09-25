import { Component, GeneratedCode } from '@/types';
import {
  CodeGeneratorOptions,
  generatePropInterface,
  toPascalCase,
  PropDefinition,
} from './index';

export function generateNextjsCode(
  component: Component,
  options: CodeGeneratorOptions
): GeneratedCode {
  const componentName = toPascalCase(component.name);
  const filename = `${componentName}.tsx`;

  // Extract props from component
  const props: PropDefinition[] =
    component.props?.map(prop => ({
      name: prop.name,
      type: prop.type,
      required: prop.required || false,
      defaultValue: prop.default,
      description: prop.description,
    })) || getDefaultProps();

  // Next.js specific dependencies
  const dependencies = ['next', 'react', '@types/react', '@types/node'];
  const imports = ['next', 'react'];

  if (options.styleFramework === 'tailwind') {
    dependencies.push('clsx', 'tailwind-merge');
    imports.push('@/lib/utils');
  }

  // Check if component needs server or client rendering
  const isClientComponent = needsClientComponent(component, props);

  // Generate component code
  const code = generateNextjsComponent(
    componentName,
    props,
    options,
    component,
    isClientComponent
  );

  return {
    framework: 'nextjs',
    filename,
    code,
    language: 'tsx',
    imports,
    dependencies,
    installationSteps: [
      'npx create-next-app@latest my-app --typescript --tailwind --eslint',
      'cd my-app',
      'npm install clsx tailwind-merge',
    ],
    usageNotes: [
      `Import the component: import { ${componentName} } from '@/components/${componentName}';`,
      isClientComponent
        ? 'This is a Client Component - it runs in the browser'
        : 'This is a Server Component - it runs on the server',
      'Optimized for Next.js App Router',
      'Supports both server and client rendering patterns',
      'SEO-friendly with proper metadata support',
    ],
  };
}

function generateNextjsComponent(
  componentName: string,
  props: PropDefinition[],
  options: CodeGeneratorOptions,
  component: Component,
  isClientComponent: boolean
): string {
  const imports = generateNextjsImports(options, isClientComponent);
  const propsInterface = options.includeTypes
    ? generatePropInterface(componentName, props)
    : '';
  const componentCode = generateNextjsComponentFunction(
    componentName,
    props,
    options,
    component,
    isClientComponent
  );

  const parts = [
    ...(isClientComponent ? ["'use client';", ''] : []),
    imports,
    '',
    ...(propsInterface ? [propsInterface, ''] : []),
    componentCode,
  ];

  return parts.filter(Boolean).join('\n');
}

function generateNextjsImports(
  options: CodeGeneratorOptions,
  isClientComponent: boolean
): string {
  const imports: string[] = [];

  if (isClientComponent) {
    imports.push("import React, { useState, useEffect } from 'react';");
  } else {
    imports.push("import React from 'react';");
  }

  if (options.styleFramework === 'tailwind') {
    imports.push("import { cn } from '@/lib/utils';");
  }

  // Next.js specific imports
  imports.push("import { Metadata } from 'next';");

  return imports.join('\n');
}

function generateNextjsComponentFunction(
  componentName: string,
  props: PropDefinition[],
  options: CodeGeneratorOptions,
  component: Component,
  isClientComponent: boolean
): string {
  const propsType = options.includeTypes ? `${componentName}Props` : 'any';
  const hasClassName = props.some(prop => prop.name === 'className');

  const propsList = props
    .filter(prop => prop.name !== 'children')
    .map(prop => prop.name)
    .join(', ');

  const childrenProp = props.find(prop => prop.name === 'children');
  const hasChildren = !!childrenProp;

  const destructuring = [
    ...(hasClassName ? ['className'] : []),
    ...(hasChildren ? ['children'] : []),
    ...(propsList ? [propsList] : []),
    '...props',
  ]
    .filter(Boolean)
    .join(', ');

  const componentBody = generateNextjsComponentBody(
    componentName,
    hasClassName,
    hasChildren,
    options,
    component,
    isClientComponent
  );

  const metadataExport = !isClientComponent
    ? generateMetadataExport(componentName, component)
    : '';

  return `${
    options.includeComments
      ? `/**
 * ${component.description || `${componentName} component for Next.js`}
 *
 * ${isClientComponent ? '@clientComponent - Runs in the browser' : '@serverComponent - Renders on the server'}
 *
 * @example
 * \`\`\`tsx
 * <${componentName}>
 *   Content goes here
 * </${componentName}>
 * \`\`\`
 */`
      : ''
  }
export function ${componentName}({
  ${destructuring}
}: ${propsType}) {
  ${isClientComponent ? generateClientLogic() : ''}
  return (${componentBody}
  );
}

${metadataExport}

export default ${componentName};`;
}

function generateNextjsComponentBody(
  componentName: string,
  hasClassName: boolean,
  hasChildren: boolean,
  options: CodeGeneratorOptions,
  component: Component,
  isClientComponent: boolean
): string {
  const baseClasses = [
    'rounded-lg',
    'border',
    'border-border',
    'bg-card',
    'p-6',
    'shadow-sm',
    ...(isClientComponent ? ['hover:shadow-md', 'transition-shadow'] : []),
  ];

  const classNameLogic =
    hasClassName && options.styleFramework === 'tailwind'
      ? `cn(
        "${baseClasses.join(' ')}",
        className
      )`
      : hasClassName
        ? 'className'
        : `"${baseClasses.join(' ')}"`;

  const attributes = [`className={${classNameLogic}}`, '...props'];

  return `
    <div ${attributes.join('\n      ')}>
      ${hasChildren ? '{children}' : `{/* ${componentName} content */}`}
    </div>`;
}

function generateClientLogic(): string {
  return `  // Client-side logic here
  // Example: state management, event handlers, etc.`;
}

function generateMetadataExport(
  componentName: string,
  component: Component
): string {
  return `
// Metadata for SEO (Server Components only)
export const metadata: Metadata = {
  title: '${componentName}',
  description: '${component.description || `${componentName} component`}',
};`;
}

function needsClientComponent(
  component: Component,
  props: PropDefinition[]
): boolean {
  // Check if component needs client-side features
  const clientFeatures = [
    'onClick',
    'onChange',
    'onSubmit',
    'onFocus',
    'onBlur',
  ];
  const hasEventHandlers = props.some(prop =>
    clientFeatures.some(feature =>
      prop.name.toLowerCase().includes(feature.toLowerCase())
    )
  );

  // Check for interactive features in component description or features
  const interactiveKeywords = [
    'interactive',
    'click',
    'hover',
    'state',
    'animation',
  ];
  const hasInteractiveFeatures =
    component.description
      ?.toLowerCase()
      .match(new RegExp(interactiveKeywords.join('|'))) ||
    component.features?.some(feature =>
      interactiveKeywords.some(keyword =>
        feature.toLowerCase().includes(keyword)
      )
    );

  return hasEventHandlers || !!hasInteractiveFeatures;
}

function getDefaultProps(): PropDefinition[] {
  return [
    {
      name: 'className',
      type: 'string',
      required: false,
      description: 'Additional CSS classes to apply to the component',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: false,
      description: 'Child elements to render inside the component',
    },
  ];
}
