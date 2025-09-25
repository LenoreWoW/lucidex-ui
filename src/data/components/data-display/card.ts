import { Component, ComponentCategory } from '../../../types/components';

export const card: Component = {
  id: 'card',
  name: 'Card',
  displayName: 'Card',
  description:
    'Versatile card component for displaying content with Qatar GBA styling and elevation system.',
  category: ComponentCategory.DATA_DISPLAY,
  subcategory: 'containers',
  tags: ['card', 'container', 'content', 'elevation', 'qatar-gba'],

  status: 'stable',
  version: '1.1.0',
  lastUpdated: '2024-09-25',
  author: 'Qatar GBA Design Team',
  maintainers: ['design-system-team'],

  variants: ['primary'],
  sizes: ['sm', 'md', 'lg'],
  customizable: true,
  responsive: true,

  implementations: [
    {
      framework: 'react',
      language: 'tsx',
      code: `import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  'rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'border-border hover:shadow-md',
        elevated: 'border-border shadow-lg hover:shadow-xl',
        outlined: 'border-2 border-qatar-maroon/20 hover:border-qatar-maroon/40',
        ghost: 'border-transparent shadow-none hover:bg-accent hover:shadow-sm',
      },
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, size, className }))}
      {...props}
    />
  )
);

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 pb-6', className)}
    {...props}
  />
));

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight text-qatar-maroon', className)}
    {...props}
  />
));

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('pb-6', className)} {...props} />
));

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-6 border-t', className)}
    {...props}
  />
));

Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardTitle.displayName = 'CardTitle';
CardDescription.displayName = 'CardDescription';
CardContent.displayName = 'CardContent';
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};`,
      dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge'],
      imports: ['React', 'cva', 'VariantProps'],
      exports: [
        'Card',
        'CardHeader',
        'CardFooter',
        'CardTitle',
        'CardDescription',
        'CardContent',
        'CardProps',
      ],
    },
  ],

  props: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: false,
      description: 'Content to display inside the card',
    },
    {
      name: 'variant',
      type: '"default" | "elevated" | "outlined" | "ghost"',
      required: false,
      defaultValue: 'default',
      description: 'Visual style variant of the card',
    },
    {
      name: 'size',
      type: '"sm" | "md" | "lg"',
      required: false,
      defaultValue: 'md',
      description: 'Padding size of the card',
    },
    {
      name: 'className',
      type: 'string',
      required: false,
      description: 'Additional CSS classes',
    },
  ],

  documentation: {
    overview:
      'Card component provides a flexible container for displaying related information with consistent Qatar GBA styling and elevation.',
    whenToUse: [
      'To group related content together',
      'For displaying summary information',
      'In dashboard layouts',
      'For content that needs visual separation',
    ],
    whenNotToUse: [
      'For single pieces of text (use Typography)',
      'For navigation items (use appropriate nav components)',
      "When content doesn't need visual grouping",
    ],
    bestPractices: [
      'Use semantic structure with CardHeader, CardContent, CardFooter',
      'Maintain consistent spacing and elevation',
      'Use appropriate variant for context',
      'Ensure good contrast for accessibility',
    ],
    commonMistakes: [
      'Overusing elevated variants',
      'Inconsistent padding and spacing',
      'Poor color contrast in custom styling',
    ],
    relatedComponents: ['Container', 'Panel', 'Modal'],
  },

  usageExamples: [
    {
      title: 'Basic Card',
      description: 'Simple card with header, content and footer',
      code: [
        {
          framework: 'react',
          language: 'tsx',
          code: `<Card>
  <CardHeader>
    <CardTitle>Qatar National Vision 2030</CardTitle>
    <CardDescription>
      Transforming Qatar into an advanced society capable of achieving sustainable development.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p>The Qatar National Vision 2030 aims to transform Qatar into an advanced country by 2030, capable of achieving sustainable development and providing a high standard of living for all its people.</p>
  </CardContent>
  <CardFooter>
    <button className="text-qatar-maroon hover:underline">Learn More</button>
  </CardFooter>
</Card>`,
        },
      ],
    },
  ],

  accessibility: {
    role: 'region',
    keyboardSupport: ['Tab'],
    screenReaderSupport: true,
    wcagCompliance: 'AA',
    colorContrastRatio: 4.5,
    focusManagement: 'Focus moves through interactive elements within card',
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
    testCoverage: 88,
  },

  dependencies: [],
  dependents: ['Dashboard', 'ProfileCard', 'ServiceCard'],
  composedOf: [],
};
