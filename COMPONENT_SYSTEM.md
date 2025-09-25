# Lucidex UI - Component System

## Overview

The Lucidex UI Component Gallery features a comprehensive component metadata schema and structure designed to support the Qatar GBA design system. This system provides a robust foundation for component discovery, filtering, search functionality, and multi-framework code generation.

## Architecture

### Component Metadata Schema (`src/types/components.ts`)

The component system is built around a comprehensive TypeScript interface that captures every aspect of a component:

- **Basic Information**: ID, name, description, category, tags
- **Technical Implementation**: Multi-framework support (React, Next.js, Blazor, HTML)
- **Props & Events**: Detailed prop definitions with types and examples
- **Documentation**: Usage examples, best practices, accessibility guidelines
- **Qatar GBA Compliance**: Brand colors, typography, RTL support, cultural adaptations
- **Testing & Quality**: Unit tests, coverage metrics, validation results

### Directory Structure

```
src/
├── types/
│   └── components.ts              # Comprehensive TypeScript interfaces
├── data/
│   └── components/
│       ├── index.ts               # Component registry
│       ├── buttons/
│       │   ├── primary-button.ts  # Primary button implementation
│       │   └── secondary-button.ts
│       ├── forms/
│       │   └── text-input.ts      # Text input with validation
│       ├── data-display/
│       │   └── card.ts            # Card container component
│       ├── feedback/
│       │   └── alert.ts           # Alert notifications
│       └── layout/
│           └── container.ts       # Responsive container
└── lib/
    ├── component-service.ts       # Component discovery & search service
    └── component-service.test.ts  # Comprehensive test suite
```

## Components Implemented

### 1. Button Components

- **Primary Button**: Main call-to-action with Qatar maroon branding
- **Secondary Button**: Outlined style for supporting actions

### 2. Form Elements

- **Text Input**: Accessible input field with validation states, RTL support, and icons

### 3. Data Display

- **Card**: Flexible container with multiple variants and elevation system

### 4. Feedback Components

- **Alert**: Status messages with appropriate styling for success, warning, info, and error states

### 5. Layout Components

- **Container**: Responsive wrapper with consistent spacing and max-width constraints

## Key Features

### Multi-Framework Support

Each component includes implementations for:

- **React**: Modern functional components with hooks and TypeScript
- **Next.js**: Client-side optimized with internationalization support
- **Blazor**: Server-side Razor components
- **HTML**: Pure HTML/CSS with Qatar GBA styling

### Qatar GBA Design Compliance

- ✅ Official Qatar maroon color palette (#8b1538)
- ✅ Typography system with Arabic font support
- ✅ RTL (Right-to-Left) layout support for Arabic content
- ✅ Cultural adaptations and government standards
- ✅ Accessibility compliance (WCAG 2.1 AA)

### Accessibility Features

- Screen reader support with proper ARIA attributes
- Keyboard navigation patterns
- Color contrast ratios meeting WCAG standards
- Focus management and indicators
- Semantic HTML structure

### Component Service (`ComponentService`)

The service provides comprehensive functionality:

```typescript
// Get all components
const components = componentService.getAllComponents();

// Search with advanced filters
const results = componentService.searchComponents({
  query: 'button',
  filters: {
    categories: [ComponentCategory.BUTTONS],
    status: [ComponentStatus.STABLE],
    frameworks: ['react'],
    qatarGBACompliant: true,
  },
  sortBy: 'name',
  limit: 10,
});

// Get component statistics
const stats = componentService.getComponentStats();

// Validate component structure
const validation = componentService.validateComponent(component);
```

## Usage Examples

### Basic Component Usage

```typescript
import { componentService } from '@/lib/component-service';

// Get a specific component
const primaryButton = componentService.getComponent('primary-button');

// Get React implementation
const reactImpl = primaryButton?.implementations.find(
  impl => impl.framework === 'react'
);

// Access props documentation
const props = primaryButton?.props;
```

### Search and Filtering

```typescript
// Search for accessible components
const accessibleComponents = componentService.searchComponents({
  filters: { accessibility: true },
});

// Find Qatar GBA compliant components
const qatarGBAComponents = componentService.searchComponents({
  filters: { qatarGBACompliant: true },
});

// Category-based filtering
const formComponents = componentService.getComponentsByCategory(
  ComponentCategory.FORMS
);
```

## Testing

The system includes comprehensive testing:

```bash
# Run component structure tests
npm test src/lib/component-service.test.ts

# Manual testing function
import { testComponentService } from '@/lib/component-service.test';
testComponentService();
```

## Integration

### 1. Import the Component Service

```typescript
import { componentService } from '@/lib/component-service';
```

### 2. Use in Component Gallery

```typescript
export default function ComponentGallery() {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    setComponents(componentService.getAllComponents());
  }, []);

  return (
    <div>
      {components.map(component => (
        <ComponentCard key={component.id} component={component} />
      ))}
    </div>
  );
}
```

### 3. Build Component Previews

```typescript
function ComponentPreview({ componentId, framework }) {
  const component = componentService.getComponent(componentId);
  const implementation = component?.implementations.find(
    impl => impl.framework === framework
  );

  return <CodeBlock code={implementation?.code} />;
}
```

## Extensibility

### Adding New Components

1. Create component data file following the schema
2. Add comprehensive metadata including all required fields
3. Include multi-framework implementations
4. Add to component registry in `src/data/components/index.ts`
5. Update component service initialization

### Adding New Categories

1. Extend `ComponentCategory` enum in types
2. Update category metadata in component service
3. Create appropriate directory structure

## Performance Considerations

- Lazy loading of component implementations
- Search index optimization for fast text search
- Component validation caching
- Efficient filtering algorithms

## Next Steps

1. **Navigation Components**: Add breadcrumbs, tabs, pagination
2. **Advanced Form Elements**: Selects, checkboxes, radio buttons
3. **Data Visualization**: Charts, graphs, progress indicators
4. **Government-Specific Components**: Document viewers, signature fields
5. **Performance Monitoring**: Bundle size analysis, render performance metrics

## Summary

This component system provides:

- ✅ **6 Production-Ready Components** with comprehensive implementations
- ✅ **Multi-Framework Support** (React, Next.js, Blazor, HTML)
- ✅ **Qatar GBA Design Compliance** with RTL and Arabic support
- ✅ **Advanced Search & Filtering** capabilities
- ✅ **Comprehensive Documentation** with usage examples
- ✅ **Accessibility Compliance** (WCAG 2.1 AA)
- ✅ **Testing Infrastructure** with validation system
- ✅ **Type Safety** with comprehensive TypeScript interfaces

The system is ready for immediate integration into the Lucidex UI and provides a solid foundation for expanding the Qatar GBA component library.
