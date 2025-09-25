import { Component, ComponentCategory } from '../../../types/components';

export const primaryButton: Component = {
  // Basic Information
  id: 'primary-button',
  name: 'PrimaryButton',
  displayName: 'Primary Button',
  description:
    'Main action button following Qatar GBA design principles with enhanced accessibility and RTL support.',
  category: ComponentCategory.BUTTONS,
  subcategory: 'action-buttons',
  tags: ['button', 'primary', 'action', 'cta', 'interactive', 'qatar-gba'],

  // Status and Versioning
  status: 'stable',
  version: '1.2.0',
  lastUpdated: '2024-09-25',
  author: 'Qatar GBA Design Team',
  maintainers: ['design-system-team'],

  // Visual and Behavioral Properties
  variants: ['primary'],
  sizes: ['sm', 'md', 'lg', 'xl'],
  customizable: true,
  responsive: true,

  // Technical Implementation
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
        primary: 'bg-qatar-maroon text-white hover:bg-qatar-maroon/90 active:bg-qatar-maroon/95',
      },
      size: {
        sm: 'h-9 rounded-md px-3 text-xs',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 rounded-md px-8 text-base',
        xl: 'h-12 rounded-md px-10 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const PrimaryButton = React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ className, variant, size, isLoading, leftIcon, rightIcon, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
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

PrimaryButton.displayName = 'PrimaryButton';

export { PrimaryButton };`,
      dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge'],
      imports: ['React', 'cva', 'VariantProps'],
      exports: ['PrimaryButton', 'PrimaryButtonProps'],
      styling: {
        type: 'tailwind',
        code: `/* Qatar GBA Primary Button Styles */
.qatar-maroon {
  --qatar-maroon: #8b1538;
  --qatar-maroon-hover: #7a1230;
  --qatar-maroon-active: #6a0e28;
}

/* RTL Support */
[dir="rtl"] .rtl\\:flex-row-reverse {
  flex-direction: row-reverse;
}

[dir="rtl"] .rtl\\:mr-0 {
  margin-right: 0;
}

[dir="rtl"] .rtl\\:ml-2 {
  margin-left: 0.5rem;
}

[dir="rtl"] .rtl\\:ml-0 {
  margin-left: 0;
}

[dir="rtl"] .rtl\\:mr-2 {
  margin-right: 0.5rem;
}`,
      },
    },
    {
      framework: 'nextjs',
      language: 'tsx',
      code: `'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useLocale } from 'next-intl';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-qatar-maroon text-white hover:bg-qatar-maroon/90 active:bg-qatar-maroon/95',
      },
      size: {
        sm: 'h-9 rounded-md px-3 text-xs',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 rounded-md px-8 text-base',
        xl: 'h-12 rounded-md px-10 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function PrimaryButton({
  className,
  variant,
  size,
  isLoading,
  leftIcon,
  rightIcon,
  children,
  ...props
}: PrimaryButtonProps) {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <button
      className={cn(
        buttonVariants({ variant, size }),
        isRTL && 'flex-row-reverse',
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <div className={\`h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent \${isRTL ? 'ml-2' : 'mr-2'}\`} />
      ) : leftIcon ? (
        <span className={isRTL ? 'ml-2' : 'mr-2'}>{leftIcon}</span>
      ) : null}
      {children}
      {rightIcon && !isLoading && (
        <span className={isRTL ? 'mr-2' : 'ml-2'}>{rightIcon}</span>
      )}
    </button>
  );
}`,
      dependencies: ['class-variance-authority', 'next-intl', '@next/font'],
      imports: ['React', 'cva', 'VariantProps', 'useLocale'],
      exports: ['default'],
    },
    {
      framework: 'blazor',
      language: 'razor',
      code: `@using Microsoft.AspNetCore.Components.Web
@inherits ComponentBase

<button class="@GetButtonClasses()"
        disabled="@(IsLoading || Disabled)"
        @onclick="OnClick"
        @attributes="AdditionalAttributes">

    @if (IsLoading)
    {
        <div class="@GetIconClasses(true)">
            <div class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
        </div>
    }
    else if (LeftIcon != null)
    {
        <span class="@GetIconClasses(false)">@LeftIcon</span>
    }

    @ChildContent

    @if (RightIcon != null && !IsLoading)
    {
        <span class="@GetIconClasses(false, true)">@RightIcon</span>
    }
</button>

@code {
    [Parameter] public RenderFragment? ChildContent { get; set; }
    [Parameter] public RenderFragment? LeftIcon { get; set; }
    [Parameter] public RenderFragment? RightIcon { get; set; }
    [Parameter] public string Size { get; set; } = "md";
    [Parameter] public bool IsLoading { get; set; }
    [Parameter] public bool Disabled { get; set; }
    [Parameter] public EventCallback<MouseEventArgs> OnClick { get; set; }
    [Parameter] public string CssClass { get; set; } = "";
    [Parameter(CaptureUnmatchedValues = true)] public Dictionary<string, object>? AdditionalAttributes { get; set; }

    private string GetButtonClasses()
    {
        var baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-qatar-maroon text-white hover:bg-qatar-maroon/90 active:bg-qatar-maroon/95";

        var sizeClasses = Size switch
        {
            "sm" => "h-9 rounded-md px-3 text-xs",
            "md" => "h-10 px-4 py-2",
            "lg" => "h-11 rounded-md px-8 text-base",
            "xl" => "h-12 rounded-md px-10 text-lg",
            _ => "h-10 px-4 py-2"
        };

        return $"{baseClasses} {sizeClasses} {CssClass}".Trim();
    }

    private string GetIconClasses(bool isLoading = false, bool isRight = false)
    {
        if (isLoading)
            return "mr-2";

        return isRight ? "ml-2" : "mr-2";
    }
}`,
      dependencies: ['Microsoft.AspNetCore.Components.Web'],
      imports: [
        'ComponentBase',
        'RenderFragment',
        'EventCallback',
        'MouseEventArgs',
      ],
      exports: ['PrimaryButton'],
    },
    {
      framework: 'html',
      language: 'html',
      code: `<!-- Primary Button - Qatar GBA Design System -->
<button
  class="primary-button primary-button--md"
  type="button"
  data-size="md"
  data-variant="primary">
  <span class="primary-button__content">Primary Action</span>
</button>

<!-- With Left Icon -->
<button class="primary-button primary-button--md" type="button">
  <svg class="primary-button__icon primary-button__icon--left" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
  <span class="primary-button__content">With Icon</span>
</button>

<!-- Loading State -->
<button class="primary-button primary-button--md primary-button--loading" type="button" disabled>
  <div class="primary-button__spinner"></div>
  <span class="primary-button__content">Loading...</span>
</button>

<style>
/* Qatar GBA Primary Button Styles */
.primary-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  border: none;
  cursor: pointer;
  font-family: inherit;
  text-decoration: none;

  /* Qatar GBA Colors */
  background-color: #8b1538;
  color: white;

  /* Focus styles */
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgba(139, 21, 56, 0.2);
  }

  /* Hover and active states */
  &:hover:not(:disabled) {
    background-color: rgba(139, 21, 56, 0.9);
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    background-color: rgba(139, 21, 56, 0.95);
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
}

/* Size variants */
.primary-button--sm {
  height: 36px;
  padding: 0 12px;
  font-size: 12px;
}

.primary-button--md {
  height: 40px;
  padding: 8px 16px;
  font-size: 14px;
}

.primary-button--lg {
  height: 44px;
  padding: 0 32px;
  font-size: 16px;
}

.primary-button--xl {
  height: 48px;
  padding: 0 40px;
  font-size: 18px;
}

/* Icon styles */
.primary-button__icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.primary-button__icon--left {
  margin-right: 8px;
}

.primary-button__icon--right {
  margin-left: 8px;
}

/* Loading state */
.primary-button--loading .primary-button__spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* RTL Support */
[dir="rtl"] .primary-button {
  direction: rtl;
}

[dir="rtl"] .primary-button__icon--left {
  margin-right: 0;
  margin-left: 8px;
}

[dir="rtl"] .primary-button__icon--right {
  margin-left: 0;
  margin-right: 8px;
}

[dir="rtl"] .primary-button--loading .primary-button__spinner {
  margin-right: 0;
  margin-left: 8px;
}
</style>`,
      dependencies: [],
      imports: [],
      exports: [],
      styling: {
        type: 'css',
        code: '/* Styles included in main HTML code above */',
      },
    },
  ],

  // Props Definition
  props: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'Button text or content to display',
      example: 'Submit Form',
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
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      defaultValue: false,
      description: 'Disables button interaction',
    },
    {
      name: 'leftIcon',
      type: 'React.ReactNode',
      required: false,
      description: 'Icon to display on the left side of text',
    },
    {
      name: 'rightIcon',
      type: 'React.ReactNode',
      required: false,
      description: 'Icon to display on the right side of text',
    },
    {
      name: 'onClick',
      type: '(event: MouseEvent) => void',
      required: false,
      description: 'Click event handler',
    },
    {
      name: 'className',
      type: 'string',
      required: false,
      description: 'Additional CSS classes',
    },
  ],

  events: [
    {
      name: 'onClick',
      description: 'Fired when button is clicked',
      payload: 'MouseEvent',
    },
    {
      name: 'onFocus',
      description: 'Fired when button receives focus',
      payload: 'FocusEvent',
    },
    {
      name: 'onBlur',
      description: 'Fired when button loses focus',
      payload: 'FocusEvent',
    },
  ],

  // Documentation
  documentation: {
    overview:
      'The Primary Button is the main call-to-action component following Qatar GBA design principles. It features Qatar maroon branding, comprehensive accessibility support, RTL compatibility, and multiple size variants.',
    whenToUse: [
      'For primary actions like form submissions',
      'For main call-to-action buttons',
      'When emphasizing the most important action on a page',
      'In confirmation dialogs for positive actions',
    ],
    whenNotToUse: [
      'For secondary or tertiary actions (use Secondary or Ghost buttons)',
      'For destructive actions (use Destructive button variant)',
      'When multiple primary actions compete for attention',
      'For navigation purposes (use links instead)',
    ],
    bestPractices: [
      'Use descriptive text that clearly indicates the action',
      'Limit to one primary button per screen section',
      'Ensure sufficient contrast for accessibility',
      'Provide loading states for async actions',
      'Consider RTL layouts for Arabic content',
    ],
    commonMistakes: [
      'Using multiple primary buttons in the same context',
      'Using vague text like "Click here"',
      'Making buttons too small for touch targets',
      'Forgetting to handle loading and disabled states',
    ],
    relatedComponents: [
      'SecondaryButton',
      'OutlineButton',
      'GhostButton',
      'DestructiveButton',
    ],
    designTokens: {
      'color-primary': '#8b1538',
      'color-primary-hover': 'rgba(139, 21, 56, 0.9)',
      'color-primary-active': 'rgba(139, 21, 56, 0.95)',
      'border-radius': '6px',
      'height-sm': '36px',
      'height-md': '40px',
      'height-lg': '44px',
      'height-xl': '48px',
    },
  },

  // Usage Examples
  usageExamples: [
    {
      title: 'Basic Usage',
      description: 'Simple primary button for main actions',
      code: [
        {
          framework: 'react',
          language: 'tsx',
          code: `<PrimaryButton onClick={() => console.log('Clicked!')}>
  Submit Form
</PrimaryButton>`,
        },
      ],
    },
    {
      title: 'With Loading State',
      description: 'Button with loading spinner for async operations',
      code: [
        {
          framework: 'react',
          language: 'tsx',
          code: `const [loading, setLoading] = useState(false);

<PrimaryButton
  isLoading={loading}
  onClick={async () => {
    setLoading(true);
    await submitForm();
    setLoading(false);
  }}
>
  {loading ? 'Submitting...' : 'Submit Form'}
</PrimaryButton>`,
        },
      ],
    },
    {
      title: 'With Icons',
      description: 'Button with left or right icons',
      code: [
        {
          framework: 'react',
          language: 'tsx',
          code: `import { ChevronRightIcon, PlusIcon } from '@heroicons/react/24/outline';

<PrimaryButton leftIcon={<PlusIcon />}>
  Add Item
</PrimaryButton>

<PrimaryButton rightIcon={<ChevronRightIcon />}>
  Continue
</PrimaryButton>`,
        },
      ],
    },
    {
      title: 'Different Sizes',
      description: 'Various button sizes for different contexts',
      code: [
        {
          framework: 'react',
          language: 'tsx',
          code: `<div className="space-x-2">
  <PrimaryButton size="sm">Small</PrimaryButton>
  <PrimaryButton size="md">Medium</PrimaryButton>
  <PrimaryButton size="lg">Large</PrimaryButton>
  <PrimaryButton size="xl">Extra Large</PrimaryButton>
</div>`,
        },
      ],
    },
  ],

  // Accessibility
  accessibility: {
    ariaLabel: 'Primary action button',
    role: 'button',
    keyboardSupport: ['Enter', 'Space'],
    screenReaderSupport: true,
    wcagCompliance: 'AA',
    colorContrastRatio: 4.5,
    focusManagement: 'Visible focus indicator with 2px outline',
    landmarks: ['button'],
  },

  // Qatar GBA Compliance
  qatarGBACompliance: {
    brandColors: true,
    typography: true,
    spacing: true,
    elevation: true,
    culturalAdaptation: {
      rtlSupport: true,
      arabicTypography: true,
      culturalColors: true,
      localizedContent: true,
    },
    governmentStandards: {
      accessibilityCompliant: true,
      securityStandards: ['WCAG 2.1 AA'],
      dataPrivacy: true,
    },
  },

  // Testing
  testing: {
    unitTests: true,
    integrationTests: true,
    accessibilityTests: true,
    visualRegressionTests: true,
    testCoverage: 95,
    testExamples: [
      {
        framework: 'react',
        code: `import { render, screen, fireEvent } from '@testing-library/react';
import { PrimaryButton } from './PrimaryButton';

describe('PrimaryButton', () => {
  it('renders correctly', () => {
    render(<PrimaryButton>Test Button</PrimaryButton>);
    expect(screen.getByRole('button')).toHaveTextContent('Test Button');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<PrimaryButton onClick={handleClick}>Click Me</PrimaryButton>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<PrimaryButton isLoading>Loading</PrimaryButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('supports different sizes', () => {
    const { rerender } = render(<PrimaryButton size="sm">Small</PrimaryButton>);
    expect(screen.getByRole('button')).toHaveClass('h-9');

    rerender(<PrimaryButton size="lg">Large</PrimaryButton>);
    expect(screen.getByRole('button')).toHaveClass('h-11');
  });
});`,
      },
    ],
  },

  // Media and Assets
  thumbnail: '/thumbnails/primary-button.png',
  screenshots: [
    '/screenshots/primary-button-default.png',
    '/screenshots/primary-button-hover.png',
    '/screenshots/primary-button-loading.png',
    '/screenshots/primary-button-sizes.png',
  ],
  figmaUrl: 'https://figma.com/qatar-gba-design-system/primary-button',
  storybookUrl: 'https://storybook.qatar-gba.com/?path=/story/buttons--primary',

  // Relationships
  dependencies: [],
  dependents: ['FormSubmitButton', 'ConfirmationDialog'],
  composedOf: [],
};
