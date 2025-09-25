import { Component, ComponentCategory } from '../../../types/components';

export const secondaryButton: Component = {
  id: 'secondary-button',
  name: 'SecondaryButton',
  displayName: 'Secondary Button',
  description:
    'Secondary action button with outlined style, following Qatar GBA design principles.',
  category: ComponentCategory.BUTTONS,
  subcategory: 'action-buttons',
  tags: ['button', 'secondary', 'outline', 'action', 'qatar-gba'],

  status: 'stable',
  version: '1.2.0',
  lastUpdated: '2024-09-25',
  author: 'Qatar GBA Design Team',
  maintainers: ['design-system-team'],

  variants: ['secondary'],
  sizes: ['sm', 'md', 'lg', 'xl'],
  customizable: true,
  responsive: true,

  implementations: [
    {
      framework: 'react',
      language: 'tsx',
      code: `import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rtl:flex-row-reverse',
  {
    variants: {
      variant: {
        secondary: 'border-2 border-qatar-maroon text-qatar-maroon bg-transparent hover:bg-qatar-maroon hover:text-white active:bg-qatar-maroon/95',
      },
      size: {
        sm: 'h-9 rounded-md px-3 text-xs',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 rounded-md px-8 text-base',
        xl: 'h-12 rounded-md px-10 text-lg',
      },
    },
    defaultVariants: {
      variant: 'secondary',
      size: 'md',
    },
  }
);

export interface SecondaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const SecondaryButton = React.forwardRef<HTMLButtonElement, SecondaryButtonProps>(
  ({ className, variant, size, isLoading, leftIcon, rightIcon, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-qatar-maroon border-t-transparent rtl:mr-0 rtl:ml-2" />
        ) : leftIcon ? (
          <span className="mr-2 rtl:mr-0 rtl:ml-2">{leftIcon}</span>
        ) : null}
        {children}
        {rightIcon && !isLoading && (
          <span className="ml-2 rtl:ml-0 rtl:mr-2">{rightIcon}</span>
        )}
      </button>
    );
  }
);

SecondaryButton.displayName = 'SecondaryButton';

export { SecondaryButton };`,
      dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge'],
      imports: ['React', 'cva', 'VariantProps'],
      exports: ['SecondaryButton', 'SecondaryButtonProps'],
    },
  ],

  props: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'Button text or content to display',
    },
    {
      name: 'size',
      type: '"sm" | "md" | "lg" | "xl"',
      required: false,
      defaultValue: 'md',
      description: 'Button size variant',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    {
      name: 'isLoading',
      type: 'boolean',
      required: false,
      defaultValue: false,
      description: 'Shows loading spinner when true',
    },
  ],

  documentation: {
    overview:
      'Secondary Button provides an outlined style for secondary actions while maintaining Qatar GBA brand consistency.',
    whenToUse: [
      'For secondary actions that support the primary action',
      'When you need multiple buttons but want clear hierarchy',
      'For cancel or back actions in forms',
      'As alternative actions in dialogs',
    ],
    whenNotToUse: [
      'For the main call-to-action (use Primary Button)',
      'For destructive actions (use Destructive Button)',
      'When the action is less important (use Ghost Button)',
    ],
    bestPractices: [
      'Use alongside primary buttons to create visual hierarchy',
      'Ensure sufficient contrast for accessibility',
      'Use for supporting actions like "Cancel" or "Back"',
    ],
    commonMistakes: [
      'Using too many secondary buttons without clear hierarchy',
      'Poor contrast between border and background',
    ],
    relatedComponents: ['PrimaryButton', 'GhostButton', 'OutlineButton'],
  },

  usageExamples: [
    {
      title: 'Basic Secondary Button',
      description: 'Simple secondary button for supporting actions',
      code: [
        {
          framework: 'react',
          language: 'tsx',
          code: `<SecondaryButton onClick={() => console.log('Secondary action!')}>
  Cancel
</SecondaryButton>`,
        },
      ],
    },
  ],

  accessibility: {
    role: 'button',
    keyboardSupport: ['Enter', 'Space'],
    screenReaderSupport: true,
    wcagCompliance: 'AA',
    colorContrastRatio: 4.5,
    focusManagement: 'Visible focus indicator with 2px outline',
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
    testCoverage: 90,
  },

  dependencies: [],
  dependents: [],
  composedOf: [],
};
