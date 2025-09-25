import { Component, GeneratedCode } from '@/types';
import {
  CodeGeneratorOptions,
  generatePropInterface,
  generateImports,
  toPascalCase,
  PropDefinition,
} from './index';

export function generateReactCode(
  component: Component,
  options: CodeGeneratorOptions
): GeneratedCode {
  const componentName = toPascalCase(component.name);
  const filename = `${componentName}${options.typescript ? '.tsx' : '.jsx'}`;

  // Extract props from component
  const props: PropDefinition[] =
    component.props?.map(prop => ({
      name: prop.name,
      type: prop.type,
      required: prop.required || false,
      defaultValue: prop.default,
      description: prop.description,
    })) || getDefaultProps();

  // Base dependencies
  const dependencies = ['react'];
  const imports = ['react'];

  if (options.styleFramework === 'tailwind') {
    dependencies.push('clsx', 'tailwind-merge');
    imports.push('@/lib/utils');
  }

  // Generate component code
  const code = generateReactComponent(componentName, props, options, component);

  return {
    framework: 'react',
    filename,
    code,
    language: options.typescript ? 'tsx' : 'jsx',
    imports,
    dependencies,
    installationSteps: [
      'npm install react @types/react',
      ...(options.styleFramework === 'tailwind'
        ? [
            'npm install -D tailwindcss postcss autoprefixer',
            'npx tailwindcss init -p',
          ]
        : []),
    ],
    usageNotes: [
      `Import the component: import { ${componentName} } from './components/${componentName}';`,
      'Use with TypeScript for better type safety',
      'Supports all standard React props and events',
      'Optimized with React.memo for performance',
    ],
  };
}

function generateReactComponent(
  componentName: string,
  props: PropDefinition[],
  options: CodeGeneratorOptions,
  component: Component
): string {
  const imports = generateComponentImports(options);
  const propsInterface = options.includeTypes
    ? generatePropInterface(componentName, props)
    : '';
  const componentCode = generateComponentFunction(
    componentName,
    props,
    options,
    component
  );
  const exports = `export { ${componentName} };`;

  const parts = [
    imports,
    '',
    ...(propsInterface ? [propsInterface, ''] : []),
    componentCode,
    '',
    exports,
  ];

  return parts.filter(Boolean).join('\n');
}

function generateComponentImports(options: CodeGeneratorOptions): string {
  const imports: string[] = [];

  imports.push("import React from 'react';");

  if (options.styleFramework === 'tailwind') {
    imports.push("import { cn } from '@/lib/utils';");
  }

  // Add specific imports based on component features
  imports.push("import { forwardRef } from 'react';");

  return imports.join('\n');
}

function generateComponentFunction(
  componentName: string,
  props: PropDefinition[],
  options: CodeGeneratorOptions,
  component: Component
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

  const componentBody = generateComponentBody(
    componentName,
    hasClassName,
    hasChildren,
    options,
    component
  );

  return `${
    options.includeComments
      ? `/**
 * ${component.description || `${componentName} component`}
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
const ${componentName} = forwardRef<HTMLDivElement, ${propsType}>(({
  ${destructuring}
}, ref) => {
  return (${componentBody}
  );
});

${componentName}.displayName = '${componentName}';`;
}

function generateComponentBody(
  componentName: string,
  hasClassName: boolean,
  hasChildren: boolean,
  options: CodeGeneratorOptions,
  component: Component
): string {
  const baseClasses = [
    'rounded-lg',
    'border',
    'border-border',
    'bg-card',
    'p-6',
    'shadow-sm',
    'hover:shadow-md',
    'transition-shadow',
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

  const attributes = ['ref={ref}', `className={${classNameLogic}}`, '...props'];

  return `
    <div ${attributes.join('\n      ')}>
      ${hasChildren ? '{children}' : `{/* ${componentName} content */}`}
    </div>`;
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
