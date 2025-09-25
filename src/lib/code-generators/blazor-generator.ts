import { Component, GeneratedCode } from '@/types';
import { CodeGeneratorOptions, toPascalCase, PropDefinition } from './index';

export function generateBlazorCode(
  component: Component,
  options: CodeGeneratorOptions
): GeneratedCode {
  const componentName = toPascalCase(component.name);
  const filename = `${componentName}.razor`;

  // Extract props from component
  const props: PropDefinition[] =
    component.props?.map(prop => ({
      name: prop.name,
      type: convertToBlazorType(prop.type),
      required: prop.required || false,
      defaultValue: prop.default,
      description: prop.description,
    })) || getDefaultProps();

  // Blazor specific dependencies
  const dependencies = [
    'Microsoft.AspNetCore.Components',
    'Microsoft.AspNetCore.Components.Web',
  ];

  const imports = [
    'Microsoft.AspNetCore.Components',
    'Microsoft.AspNetCore.Components.Web',
  ];

  // Generate component code
  const code = generateBlazorComponent(
    componentName,
    props,
    options,
    component
  );

  return {
    framework: 'blazor',
    filename,
    code,
    language: 'razor',
    imports,
    dependencies,
    installationSteps: [
      'dotnet new blazorserver -n MyBlazorApp',
      'cd MyBlazorApp',
      'dotnet add package Microsoft.AspNetCore.Components.Web',
    ],
    usageNotes: [
      `Add the component to your Blazor page: <${componentName} />`,
      'Supports both Blazor Server and Blazor WebAssembly',
      'Uses C# for component logic and Razor syntax for markup',
      'Supports two-way data binding with @bind directive',
      'Event handling with @onclick, @onchange, etc.',
    ],
  };
}

function generateBlazorComponent(
  componentName: string,
  props: PropDefinition[],
  options: CodeGeneratorOptions,
  component: Component
): string {
  const razorMarkup = generateRazorMarkup(
    componentName,
    props,
    options,
    component
  );
  const codeSection = generateCodeSection(
    componentName,
    props,
    options,
    component
  );

  return `${
    options.includeComments
      ? `@*
    ${component.description || `${componentName} component`}

    Example usage:
    <${componentName}>
        Content goes here
    </${componentName}>
*@`
      : ''
  }
${razorMarkup}

${codeSection}`;
}

function generateRazorMarkup(
  componentName: string,
  props: PropDefinition[],
  options: CodeGeneratorOptions,
  component: Component
): string {
  const hasChildren = props.some(
    prop =>
      prop.name.toLowerCase() === 'children' || prop.name === 'ChildContent'
  );
  const hasClassName = props.some(
    prop => prop.name === 'CssClass' || prop.name === 'Class'
  );

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
    ? `class="@CombineClasses(${JSON.stringify(baseClasses.join(' '))}, CssClass)"`
    : `class="${baseClasses.join(' ')}"`;

  return `<div ${classAttribute} @attributes="AdditionalAttributes">
    ${hasChildren ? '@ChildContent' : `@* ${componentName} content *@`}
</div>`;
}

function generateCodeSection(
  componentName: string,
  props: PropDefinition[],
  options: CodeGeneratorOptions,
  component: Component
): string {
  const parameters = generateParameters(props);
  const methods = generateMethods();
  const lifecycle = generateLifecycleMethods(options);

  return `@code {
    ${parameters}

    /// <summary>
    /// Additional attributes to apply to the component
    /// </summary>
    [Parameter(CaptureUnmatchedValues = true)]
    public Dictionary<string, object>? AdditionalAttributes { get; set; }

    ${methods}

    ${lifecycle}
}`;
}

function generateParameters(props: PropDefinition[]): string {
  const parameters = props.map(prop => {
    const parameterAttribute = `[Parameter]`;
    const propertyType = prop.required ? prop.type : `${prop.type}?`;
    const defaultValue = prop.defaultValue
      ? ` = ${formatBlazorDefaultValue(prop.defaultValue, prop.type)};`
      : '';

    return `    /// <summary>
    /// ${prop.description || `${prop.name} property`}
    /// </summary>
    ${parameterAttribute}
    public ${propertyType} ${prop.name} { get; set; }${defaultValue}`;
  });

  return parameters.join('\n\n');
}

function generateMethods(): string {
  return `    /// <summary>
    /// Combines base CSS classes with additional classes
    /// </summary>
    private string CombineClasses(string baseClasses, string? additionalClasses = null)
    {
        return string.IsNullOrWhiteSpace(additionalClasses)
            ? baseClasses
            : $"{baseClasses} {additionalClasses}";
    }`;
}

function generateLifecycleMethods(options: CodeGeneratorOptions): string {
  if (!options.includeComments) return '';

  return `    /// <summary>
    /// Component initialization
    /// </summary>
    protected override void OnInitialized()
    {
        base.OnInitialized();
        // Component initialization logic here
    }

    /// <summary>
    /// Called after parameters are set
    /// </summary>
    protected override void OnParametersSet()
    {
        base.OnParametersSet();
        // Parameter validation and processing logic here
    }`;
}

function convertToBlazorType(reactType: string): string {
  const typeMap: Record<string, string> = {
    string: 'string',
    number: 'int',
    boolean: 'bool',
    'React.ReactNode': 'RenderFragment',
    'React.ReactElement': 'RenderFragment',
    'React.ComponentType': 'RenderFragment',
    Function: 'EventCallback',
    MouseEvent: 'MouseEventArgs',
    ChangeEvent: 'ChangeEventArgs',
    FormEvent: 'EventArgs',
    KeyboardEvent: 'KeyboardEventArgs',
  };

  // Handle arrays
  if (reactType.includes('[]')) {
    const baseType = reactType.replace('[]', '');
    const mappedType = typeMap[baseType] || baseType;
    return `${mappedType}[]`;
  }

  // Handle union types (convert to string for simplicity)
  if (reactType.includes('|')) {
    return 'string';
  }

  // Handle generic types
  if (reactType.includes('<')) {
    return 'object';
  }

  return typeMap[reactType] || reactType;
}

function formatBlazorDefaultValue(value: string, type: string): string {
  if (type === 'string') {
    return `"${value}"`;
  }
  if (type === 'bool') {
    return value.toLowerCase();
  }
  if (type === 'int' || type === 'double') {
    return value;
  }
  return 'default';
}

function getDefaultProps(): PropDefinition[] {
  return [
    {
      name: 'CssClass',
      type: 'string',
      required: false,
      description: 'Additional CSS classes to apply to the component',
    },
    {
      name: 'ChildContent',
      type: 'RenderFragment',
      required: false,
      description: 'Child content to render inside the component',
    },
  ];
}
