import { Component, ComponentCategory } from '../../../types/components';

export const container: Component = {
  id: 'container',
  name: 'Container',
  displayName: 'Container',
  description:
    'Flexible layout container with responsive design and Qatar GBA spacing system.',
  category: ComponentCategory.LAYOUT,
  subcategory: 'wrappers',
  tags: [
    'container',
    'layout',
    'wrapper',
    'responsive',
    'spacing',
    'qatar-gba',
  ],

  status: 'stable',
  version: '1.0.0',
  lastUpdated: '2024-09-25',
  author: 'Qatar GBA Design Team',
  maintainers: ['design-system-team'],

  variants: ['primary'],
  sizes: ['sm', 'md', 'lg', 'xl', '2xl'],
  customizable: true,
  responsive: true,

  implementations: [
    {
      framework: 'react',
      language: 'tsx',
      code: `import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const containerVariants = cva(
  'mx-auto px-4 sm:px-6 lg:px-8',
  {
    variants: {
      size: {
        sm: 'max-w-3xl',
        md: 'max-w-5xl',
        lg: 'max-w-7xl',
        xl: 'max-w-screen-xl',
        '2xl': 'max-w-screen-2xl',
        full: 'max-w-full',
      },
      padding: {
        none: 'px-0',
        sm: 'px-4 sm:px-6',
        md: 'px-4 sm:px-6 lg:px-8',
        lg: 'px-6 sm:px-8 lg:px-12',
      },
    },
    defaultVariants: {
      size: 'lg',
      padding: 'md',
    },
  }
);

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType;
  center?: boolean;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, as: Component = 'div', center, children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          containerVariants({ size, padding }),
          center && 'flex items-center justify-center',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = 'Container';

export { Container };`,
      dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge'],
      imports: ['React', 'cva', 'VariantProps'],
      exports: ['Container', 'ContainerProps'],
    },
    {
      framework: 'nextjs',
      language: 'tsx',
      code: `'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const containerVariants = cva(
  'mx-auto px-4 sm:px-6 lg:px-8',
  {
    variants: {
      size: {
        sm: 'max-w-3xl',
        md: 'max-w-5xl',
        lg: 'max-w-7xl',
        xl: 'max-w-screen-xl',
        '2xl': 'max-w-screen-2xl',
        full: 'max-w-full',
      },
      padding: {
        none: 'px-0',
        sm: 'px-4 sm:px-6',
        md: 'px-4 sm:px-6 lg:px-8',
        lg: 'px-6 sm:px-8 lg:px-12',
      },
    },
    defaultVariants: {
      size: 'lg',
      padding: 'md',
    },
  }
);

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType;
  center?: boolean;
}

export default function Container({
  className,
  size,
  padding,
  as: Component = 'div',
  center,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        containerVariants({ size, padding }),
        center && 'flex items-center justify-center',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}`,
      dependencies: ['class-variance-authority'],
      imports: ['React', 'cva', 'VariantProps'],
      exports: ['default'],
    },
    {
      framework: 'html',
      language: 'html',
      code: `<!-- Standard Container -->
<div class="container container--lg">
  <h1>Page Title</h1>
  <p>Page content goes here...</p>
</div>

<!-- Centered Container -->
<div class="container container--md container--center">
  <div class="content-block">
    <h2>Centered Content</h2>
    <p>This content is centered within the container.</p>
  </div>
</div>

<!-- Full Width Container -->
<div class="container container--full container--padding-none">
  <img src="hero-image.jpg" alt="Hero Image" class="w-full">
</div>

<style>
/* Qatar GBA Container Styles */
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

/* Size variants */
.container--sm {
  max-width: 48rem; /* 768px */
}

.container--md {
  max-width: 64rem; /* 1024px */
}

.container--lg {
  max-width: 80rem; /* 1280px */
}

.container--xl {
  max-width: 90rem; /* 1440px */
}

.container--2xl {
  max-width: 96rem; /* 1536px */
}

.container--full {
  max-width: none;
}

/* Padding variants */
.container--padding-none {
  padding-left: 0;
  padding-right: 0;
}

.container--padding-sm {
  padding-left: 1rem;
  padding-right: 1rem;
}

.container--padding-md {
  padding-left: 1rem;
  padding-right: 1rem;
}

.container--padding-lg {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

/* Center content */
.container--center {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Responsive padding */
@media (min-width: 640px) {
  .container--padding-sm {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .container--padding-md {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .container--padding-lg {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

@media (min-width: 1024px) {
  .container--padding-md {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .container--padding-lg {
    padding-left: 3rem;
    padding-right: 3rem;
  }
}

/* RTL Support */
[dir="rtl"] .container {
  /* Containers work the same in RTL */
  text-align: right;
}
</style>`,
    },
  ],

  props: [
    {
      name: 'size',
      type: '"sm" | "md" | "lg" | "xl" | "2xl" | "full"',
      required: false,
      defaultValue: 'lg',
      description: 'Maximum width of the container',
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
    },
    {
      name: 'padding',
      type: '"none" | "sm" | "md" | "lg"',
      required: false,
      defaultValue: 'md',
      description: 'Horizontal padding variant',
      options: ['none', 'sm', 'md', 'lg'],
    },
    {
      name: 'center',
      type: 'boolean',
      required: false,
      defaultValue: false,
      description: 'Centers content using flexbox',
    },
    {
      name: 'as',
      type: 'React.ElementType',
      required: false,
      defaultValue: 'div',
      description: 'HTML element or React component to render as',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: false,
      description: 'Content to be contained',
    },
  ],

  documentation: {
    overview:
      'Container component provides consistent width constraints and horizontal spacing for page content, following Qatar GBA responsive design principles.',
    whenToUse: [
      'For main page content areas',
      'To constrain content width on large screens',
      'As a wrapper for sections and layouts',
      'When you need consistent horizontal spacing',
    ],
    whenNotToUse: [
      'For components that need full width (use appropriate wrapper)',
      'For complex grid layouts (use Grid component)',
      'When you need vertical spacing control (combine with other layout components)',
    ],
    bestPractices: [
      'Use appropriate size for content type',
      'Maintain consistent container usage across pages',
      'Consider responsive behavior',
      'Nest containers sparingly',
    ],
    commonMistakes: [
      'Overusing nested containers',
      'Not considering mobile padding',
      'Using wrong size for content context',
    ],
    relatedComponents: ['Grid', 'Stack', 'Section'],
  },

  usageExamples: [
    {
      title: 'Basic Container',
      description: 'Standard container for page content',
      code: [
        {
          framework: 'react',
          language: 'tsx',
          code: `<Container>
  <h1>Welcome to Qatar GBA</h1>
  <p>This content is properly contained with responsive padding.</p>
</Container>`,
        },
      ],
    },
    {
      title: 'Different Sizes',
      description: 'Containers with various width constraints',
      code: [
        {
          framework: 'react',
          language: 'tsx',
          code: `<Container size="sm">
  <h2>Narrow Content</h2>
  <p>Perfect for focused reading experiences.</p>
</Container>

<Container size="xl">
  <h2>Wide Layout</h2>
  <p>Great for dashboards and data displays.</p>
</Container>`,
        },
      ],
    },
    {
      title: 'Centered Container',
      description: 'Container with centered content',
      code: [
        {
          framework: 'react',
          language: 'tsx',
          code: `<Container center className="min-h-screen">
  <div className="text-center">
    <h1>Centered Content</h1>
    <p>This content is both horizontally and vertically centered.</p>
  </div>
</Container>`,
        },
      ],
    },
  ],

  accessibility: {
    keyboardSupport: ['Tab'],
    screenReaderSupport: true,
    wcagCompliance: 'AA',
    focusManagement: 'Focus flows through contained elements naturally',
  },

  qatarGBACompliance: {
    brandColors: true,
    typography: true,
    spacing: true,
    elevation: true,
    culturalAdaptation: {
      rtlSupport: true,
      arabicTypography: true,
      culturalColors: true,
    },
    governmentStandards: {
      accessibilityCompliant: true,
      securityStandards: ['WCAG 2.1 AA'],
    },
  },

  testing: {
    unitTests: true,
    integrationTests: true,
    accessibilityTests: true,
    visualRegressionTests: true,
    testCoverage: 85,
  },

  dependencies: [],
  dependents: ['Page', 'Section', 'Layout'],
  composedOf: [],
};
