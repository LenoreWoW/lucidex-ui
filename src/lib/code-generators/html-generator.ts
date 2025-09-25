import { Component, GeneratedCode } from '@/types';
import { CodeGeneratorOptions, toKebabCase, PropDefinition } from './index';

export function generateHtmlCode(
  component: Component,
  options: CodeGeneratorOptions
): GeneratedCode {
  const componentName = component.name;
  const filename = `${toKebabCase(componentName)}.html`;

  // Extract attributes from component props
  const attributes: PropDefinition[] =
    component.props?.map(prop => ({
      name: convertToHtmlAttribute(prop.name),
      type: convertToHtmlType(prop.type),
      required: prop.required || false,
      defaultValue: prop.default,
      description: prop.description,
    })) || getDefaultAttributes();

  // HTML/CSS dependencies
  const dependencies = ['tailwindcss'];
  const imports = ['tailwindcss'];

  if (options.styleFramework === 'tailwind') {
    dependencies.push('@tailwindcss/forms', '@tailwindcss/typography');
  }

  // Generate HTML code
  const code = generateHtmlDocument(
    componentName,
    attributes,
    options,
    component
  );

  return {
    framework: 'html',
    filename,
    code,
    language: 'html',
    imports,
    dependencies,
    installationSteps: [
      'npm install -D tailwindcss postcss autoprefixer',
      'npx tailwindcss init -p',
      'Add Tailwind directives to your CSS file',
    ],
    usageNotes: [
      'Copy the HTML structure and adapt to your needs',
      'Use Tailwind CSS classes for styling',
      'Add custom CSS for advanced styling',
      'Ensure accessibility with proper ARIA attributes',
      'Test responsiveness across different screen sizes',
    ],
  };
}

function generateHtmlDocument(
  componentName: string,
  attributes: PropDefinition[],
  options: CodeGeneratorOptions,
  component: Component
): string {
  const htmlStructure = generateHtmlStructure(
    componentName,
    attributes,
    options,
    component
  );
  const cssStyles =
    options.styleFramework === 'css' ? generateCustomCSS(componentName) : '';
  const jsScript = generateJavaScript(componentName, attributes, options);

  if (options.includeComments) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${componentName} Component</title>
    ${options.styleFramework === 'tailwind' ? '<script src="https://cdn.tailwindcss.com"></script>' : ''}
    ${cssStyles ? `<style>${cssStyles}</style>` : ''}
</head>
<body>
    <!-- ${componentName} Component -->
    <!-- ${component.description || `${componentName} component example`} -->

    ${htmlStructure}

    ${jsScript ? `<script>${jsScript}</script>` : ''}
</body>
</html>`;
  }

  return htmlStructure;
}

function generateHtmlStructure(
  componentName: string,
  attributes: PropDefinition[],
  options: CodeGeneratorOptions,
  component: Component
): string {
  const hasContent = attributes.some(
    attr => attr.name === 'content' || attr.name === 'children'
  );
  const hasClassName = attributes.some(attr => attr.name === 'class');

  const baseClasses = [
    'rounded-lg',
    'border',
    'border-gray-200',
    'bg-white',
    'p-6',
    'shadow-sm',
    'hover:shadow-md',
    'transition-shadow',
  ];

  const classAttribute = hasClassName
    ? 'class="{{class}}"'
    : `class="${baseClasses.join(' ')}"`;

  const dataAttributes = generateDataAttributes(attributes);
  const ariaAttributes = generateAriaAttributes(componentName);

  const allAttributes = [
    `id="${toKebabCase(componentName)}"`,
    classAttribute,
    ...dataAttributes,
    ...ariaAttributes,
  ].join('\n    ');

  const content = hasContent
    ? '<!-- Component content goes here -->\n    {{content}}'
    : `<!-- ${componentName} content -->`;

  return `<div ${allAttributes}>
    ${content}
</div>`;
}

function generateDataAttributes(attributes: PropDefinition[]): string[] {
  return attributes
    .filter(attr => !['class', 'id', 'content', 'children'].includes(attr.name))
    .map(attr => {
      const dataAttr = `data-${attr.name}`;
      return attr.defaultValue
        ? `${dataAttr}="${attr.defaultValue}"`
        : `${dataAttr}="{{${attr.name}}}"`;
    });
}

function generateAriaAttributes(componentName: string): string[] {
  const ariaAttributes = [`role="region"`, `aria-label="${componentName}"`];

  return ariaAttributes;
}

function generateCustomCSS(componentName: string): string {
  const className = `.${toKebabCase(componentName)}`;

  return `
    ${className} {
        border-radius: 0.5rem;
        border: 1px solid #e5e7eb;
        background-color: #ffffff;
        padding: 1.5rem;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        transition: box-shadow 0.15s ease-in-out;
    }

    ${className}:hover {
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    ${className}--variant-outline {
        background-color: transparent;
        border: 2px solid #e5e7eb;
    }

    ${className}--size-sm {
        padding: 1rem;
    }

    ${className}--size-lg {
        padding: 2rem;
    }

    @media (max-width: 640px) {
        ${className} {
            padding: 1rem;
        }
    }
  `;
}

function generateJavaScript(
  componentName: string,
  attributes: PropDefinition[],
  options: CodeGeneratorOptions
): string {
  if (!options.includeComments) return '';

  return `
    // ${componentName} Component JavaScript
    document.addEventListener('DOMContentLoaded', function() {
        const ${toKebabCase(componentName).replace(/-/g, '')}Element = document.getElementById('${toKebabCase(componentName)}');

        if (${toKebabCase(componentName).replace(/-/g, '')}Element) {
            // Component initialization logic
            console.log('${componentName} component initialized');

            // Example: Add click handler
            ${toKebabCase(componentName).replace(/-/g, '')}Element.addEventListener('click', function(event) {
                console.log('${componentName} clicked');
                // Handle click event
            });

            // Example: Add hover effects
            ${toKebabCase(componentName).replace(/-/g, '')}Element.addEventListener('mouseenter', function() {
                this.classList.add('hover-effect');
            });

            ${toKebabCase(componentName).replace(/-/g, '')}Element.addEventListener('mouseleave', function() {
                this.classList.remove('hover-effect');
            });
        }
    });
  `;
}

function convertToHtmlAttribute(propName: string): string {
  // Convert React prop names to HTML attribute names
  const attributeMap: Record<string, string> = {
    className: 'class',
    htmlFor: 'for',
    tabIndex: 'tabindex',
    autoFocus: 'autofocus',
    autoComplete: 'autocomplete',
    readOnly: 'readonly',
    maxLength: 'maxlength',
    minLength: 'minlength',
    contentEditable: 'contenteditable',
    spellCheck: 'spellcheck',
  };

  return attributeMap[propName] || propName.toLowerCase();
}

function convertToHtmlType(reactType: string): string {
  const typeMap: Record<string, string> = {
    string: 'text',
    number: 'number',
    boolean: 'checkbox',
    'React.ReactNode': 'content',
    Function: 'event',
  };

  return typeMap[reactType] || 'text';
}

function getDefaultAttributes(): PropDefinition[] {
  return [
    {
      name: 'class',
      type: 'text',
      required: false,
      description: 'CSS classes to apply to the component',
    },
    {
      name: 'content',
      type: 'content',
      required: false,
      description: 'Content to display inside the component',
    },
  ];
}
