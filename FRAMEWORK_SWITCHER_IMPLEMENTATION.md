# Framework Switcher Implementation

## Overview

A comprehensive framework switcher has been implemented for the Lucidex UI, allowing developers to view and generate component code across multiple frameworks: React, Next.js, Blazor, HTML, and TypeScript.

## Architecture

### Core Components

#### 1. Framework Types (`src/types/index.ts`)

- **FrameworkType**: Union type for supported frameworks
- **Framework**: Interface defining framework metadata
- **GeneratedCode**: Interface for generated code output
- **FrameworkContext**: Interface for framework state management
- **ComponentProp**: Enhanced prop definitions with validation

#### 2. FrameworkSwitcher Component (`src/components/components/FrameworkSwitcher.tsx`)

- Interactive framework selection tabs
- Framework-specific feature displays
- Installation instructions and best practices
- Dynamic framework information panels
- Real-time framework switching

#### 3. Framework Renderers

##### ReactRenderer (`src/components/components/ReactRenderer.tsx`)

- Pure React component code generation
- TypeScript support with prop interfaces
- Performance optimizations (React.memo, forwardRef)
- Hooks integration and modern patterns
- Testing recommendations

##### NextRenderer (`src/components/components/NextRenderer.tsx`)

- Next.js App Router optimized components
- Server/Client component detection
- SSR/SSG considerations
- SEO metadata generation
- Image and font optimization features

##### BlazorRenderer (`src/components/components/BlazorRenderer.tsx`)

- Razor syntax with C# code-behind
- Component parameters and event callbacks
- Two-way data binding support
- Blazor Server and WebAssembly compatibility
- Lifecycle method implementations

##### HTMLRenderer (`src/components/components/HTMLRenderer.tsx`)

- Semantic HTML5 markup
- Tailwind CSS integration
- Accessibility features (ARIA attributes)
- Progressive enhancement approach
- Cross-browser compatibility

##### TypeScriptRenderer (`src/components/components/TypeScriptRenderer.tsx`)

- Complete type definitions
- Interface and utility type generation
- Helper functions and validation
- Framework-agnostic type definitions
- Advanced TypeScript patterns

### Code Generation System

#### 1. Base Generator (`src/lib/code-generators/index.ts`)

- **CodeGeneratorService**: Central service for code generation
- **PropDefinition**: Standardized prop definitions
- **CodeGeneratorOptions**: Configurable generation options
- Utility functions for naming conventions

#### 2. Framework-Specific Generators

##### React Generator (`src/lib/code-generators/react-generator.ts`)

- Functional components with hooks
- TypeScript prop interfaces
- forwardRef implementation
- Component memoization
- Modern React patterns

##### Next.js Generator (`src/lib/code-generators/nextjs-generator.ts`)

- App Router structure
- Server/Client component logic
- Metadata API integration
- Dynamic imports and optimization
- SEO-friendly markup

##### Blazor Generator (`src/lib/code-generators/blazor-generator.ts`)

- Razor component syntax
- Parameter attributes
- Component lifecycle methods
- Two-way binding implementation
- C# type conversions

##### HTML Generator (`src/lib/code-generators/html-generator.ts`)

- Complete HTML document structure
- Tailwind CSS integration
- Accessibility attributes
- Progressive enhancement JavaScript
- Responsive design patterns

##### TypeScript Generator (`src/lib/code-generators/typescript-generator.ts`)

- Comprehensive interface definitions
- Utility type generation
- Helper function creation
- Type validation logic
- Framework integration types

## Integration

### CodePanel Integration

The existing CodePanel component has been completely refactored to:

- Support Component objects instead of strings
- Include framework switcher in settings tab
- Dynamically render framework-specific content
- Maintain state across framework switches

### MainLayout Compatibility

- Added Component object mapping for backward compatibility
- Maintains existing Sidebar integration
- Preserves component selection state
- Minimal breaking changes to existing code

## Features

### 1. Framework Detection

- Automatic client/server component detection for Next.js
- Interactive feature identification for client components
- Framework-specific optimization recommendations

### 2. Code Generation Options

- TypeScript/JavaScript support
- Multiple styling frameworks (Tailwind, CSS modules)
- Configurable prop inclusion
- Comment and documentation generation

### 3. Installation & Setup

- Framework-specific installation commands
- Configuration file generation (tsconfig.json, etc.)
- Dependency management
- Setup instructions

### 4. Best Practices

- Framework-specific optimization tips
- Performance recommendations
- Accessibility guidelines
- SEO considerations

### 5. Development Tools

- IDE integration recommendations
- Linting and formatting setup
- Testing frameworks and utilities
- Build tool configurations

## Usage

### Basic Implementation

```tsx
import { FrameworkSwitcher, ReactRenderer } from '@/components/components';

function MyComponent() {
  const [framework, setFramework] = useState<FrameworkType>('react');

  return (
    <div>
      <FrameworkSwitcher
        selectedComponent={component}
        selectedFramework={framework}
        onFrameworkChange={setFramework}
      />

      <ReactRenderer component={component} />
    </div>
  );
}
```

### Advanced Usage

```tsx
import { CodeGeneratorService } from '@/lib/code-generators';

const generatedCode = CodeGeneratorService.generateCode(component, 'nextjs', {
  includeTypes: true,
  includeComments: true,
  styleFramework: 'tailwind',
  typescript: true,
});
```

## Testing

A comprehensive test component (`src/test-framework-switcher.tsx`) has been created to:

- Verify framework switching functionality
- Test code generation across all frameworks
- Validate prop handling and type safety
- Ensure component state management
- Demonstrate usage patterns

## File Structure

```
src/
├── types/
│   └── index.ts                    # Framework types and interfaces
├── lib/
│   └── code-generators/
│       ├── index.ts                # Base generator service
│       ├── react-generator.ts      # React code generation
│       ├── nextjs-generator.ts     # Next.js code generation
│       ├── blazor-generator.ts     # Blazor code generation
│       ├── html-generator.ts       # HTML code generation
│       └── typescript-generator.ts # TypeScript code generation
└── components/
    ├── components/
    │   ├── FrameworkSwitcher.tsx   # Main switcher component
    │   ├── ReactRenderer.tsx       # React renderer
    │   ├── NextRenderer.tsx        # Next.js renderer
    │   ├── BlazorRenderer.tsx      # Blazor renderer
    │   ├── HTMLRenderer.tsx        # HTML renderer
    │   ├── TypeScriptRenderer.tsx  # TypeScript renderer
    │   └── index.ts                # Component exports
    └── layout/
        └── CodePanel.tsx           # Updated with framework support
```

## Benefits

1. **Multi-Framework Support**: Generate component code for 5 different frameworks
2. **Consistent API**: Unified interface across all frameworks
3. **Type Safety**: Full TypeScript support throughout
4. **Educational Value**: Learn framework differences and best practices
5. **Production Ready**: Generate code ready for production use
6. **Extensible**: Easy to add new frameworks and features
7. **Maintainable**: Clean separation of concerns and modular architecture

## Future Enhancements

1. **Additional Frameworks**: Vue.js, Angular, Svelte support
2. **Code Export**: Direct file download and project scaffolding
3. **Live Preview**: Interactive component preview in each framework
4. **Template System**: Pre-built component templates
5. **Version Management**: Support multiple framework versions
6. **Plugin System**: Custom code generators and renderers
