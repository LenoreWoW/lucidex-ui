import { Component, ComponentCategory } from '../../../types/components';

export const textInput: Component = {
  id: 'text-input',
  name: 'TextInput',
  displayName: 'Text Input',
  description:
    'Accessible text input component with Qatar GBA styling, RTL support, and comprehensive validation.',
  category: ComponentCategory.FORMS,
  subcategory: 'input-fields',
  tags: ['input', 'form', 'text', 'field', 'validation', 'qatar-gba', 'rtl'],

  status: 'stable',
  version: '1.3.0',
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
      code: `import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'flex w-full rounded-md border bg-background px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-qatar-maroon focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right',
  {
    variants: {
      variant: {
        default: 'border-input hover:border-qatar-maroon/50',
        error: 'border-destructive text-destructive focus-visible:ring-destructive',
        success: 'border-green-500 focus-visible:ring-green-500',
      },
      size: {
        sm: 'h-8 text-xs px-2',
        md: 'h-10',
        lg: 'h-12 text-base px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  errorText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  isRequired?: boolean;
  isInvalid?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({
    className,
    variant,
    size,
    type = 'text',
    label,
    helperText,
    errorText,
    startIcon,
    endIcon,
    isRequired,
    isInvalid,
    id,
    ...props
  }, ref) => {
    const inputId = id || \`input-\${Math.random().toString(36).substr(2, 9)}\`;
    const helperTextId = helperText ? \`\${inputId}-helper\` : undefined;
    const errorTextId = errorText ? \`\${inputId}-error\` : undefined;

    const finalVariant = isInvalid || errorText ? 'error' : variant;

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {isRequired && (
              <span className="ml-1 text-destructive rtl:ml-0 rtl:mr-1" aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative">
          {startIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground rtl:left-auto rtl:right-3">
              {startIcon}
            </div>
          )}

          <input
            type={type}
            className={cn(
              inputVariants({ variant: finalVariant, size, className }),
              startIcon && 'pl-10 rtl:pl-3 rtl:pr-10',
              endIcon && 'pr-10 rtl:pr-3 rtl:pl-10'
            )}
            ref={ref}
            id={inputId}
            aria-invalid={isInvalid || !!errorText}
            aria-describedby={cn(
              helperTextId,
              errorTextId
            )}
            aria-required={isRequired}
            {...props}
          />

          {endIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground rtl:right-auto rtl:left-3">
              {endIcon}
            </div>
          )}
        </div>

        {helperText && !errorText && (
          <p
            id={helperTextId}
            className="text-sm text-muted-foreground"
          >
            {helperText}
          </p>
        )}

        {errorText && (
          <p
            id={errorTextId}
            className="text-sm text-destructive"
            role="alert"
          >
            {errorText}
          </p>
        )}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';

export { TextInput };`,
      dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge'],
      imports: ['React', 'forwardRef', 'cva', 'VariantProps'],
      exports: ['TextInput', 'TextInputProps'],
      styling: {
        type: 'tailwind',
        code: `/* Qatar GBA Text Input Styles */
.qatar-maroon {
  --qatar-maroon: #8b1538;
}

/* RTL Support for inputs */
[dir="rtl"] .rtl\\:text-right {
  text-align: right;
}

[dir="rtl"] .rtl\\:pl-3 {
  padding-left: 0.75rem;
}

[dir="rtl"] .rtl\\:pr-3 {
  padding-right: 0.75rem;
}

[dir="rtl"] .rtl\\:pl-10 {
  padding-left: 2.5rem;
}

[dir="rtl"] .rtl\\:pr-10 {
  padding-right: 2.5rem;
}

/* Focus ring with Qatar GBA colors */
.focus-visible\\:ring-qatar-maroon:focus-visible {
  --tw-ring-color: rgba(139, 21, 56, 0.5);
}`,
      },
    },
    {
      framework: 'nextjs',
      language: 'tsx',
      code: `'use client';

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useLocale } from 'next-intl';

const inputVariants = cva(
  'flex w-full rounded-md border bg-background px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-qatar-maroon focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input hover:border-qatar-maroon/50',
        error: 'border-destructive text-destructive focus-visible:ring-destructive',
        success: 'border-green-500 focus-visible:ring-green-500',
      },
      size: {
        sm: 'h-8 text-xs px-2',
        md: 'h-10',
        lg: 'h-12 text-base px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  errorText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  isRequired?: boolean;
  isInvalid?: boolean;
}

export default forwardRef<HTMLInputElement, TextInputProps>(function TextInput({
  className,
  variant,
  size,
  type = 'text',
  label,
  helperText,
  errorText,
  startIcon,
  endIcon,
  isRequired,
  isInvalid,
  id,
  ...props
}, ref) {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const inputId = id || \`input-\${Math.random().toString(36).substr(2, 9)}\`;
  const finalVariant = isInvalid || errorText ? 'error' : variant;

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium leading-none"
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {label}
          {isRequired && (
            <span className={cn('text-destructive', isRTL ? 'mr-1' : 'ml-1')}>
              *
            </span>
          )}
        </label>
      )}

      <div className="relative">
        {startIcon && (
          <div className={cn(
            'absolute top-1/2 -translate-y-1/2 text-muted-foreground',
            isRTL ? 'right-3' : 'left-3'
          )}>
            {startIcon}
          </div>
        )}

        <input
          type={type}
          className={cn(
            inputVariants({ variant: finalVariant, size }),
            isRTL && 'text-right',
            startIcon && (isRTL ? 'pr-10' : 'pl-10'),
            endIcon && (isRTL ? 'pl-10' : 'pr-10'),
            className
          )}
          ref={ref}
          id={inputId}
          dir={isRTL ? 'rtl' : 'ltr'}
          {...props}
        />

        {endIcon && (
          <div className={cn(
            'absolute top-1/2 -translate-y-1/2 text-muted-foreground',
            isRTL ? 'left-3' : 'right-3'
          )}>
            {endIcon}
          </div>
        )}
      </div>

      {helperText && !errorText && (
        <p className="text-sm text-muted-foreground" dir={isRTL ? 'rtl' : 'ltr'}>
          {helperText}
        </p>
      )}

      {errorText && (
        <p className="text-sm text-destructive" role="alert" dir={isRTL ? 'rtl' : 'ltr'}>
          {errorText}
        </p>
      )}
    </div>
  );
});`,
      dependencies: ['class-variance-authority', 'next-intl'],
      imports: ['React', 'forwardRef', 'cva', 'VariantProps', 'useLocale'],
      exports: ['default'],
    },
    {
      framework: 'html',
      language: 'html',
      code: `<!-- Text Input - Qatar GBA Design System -->
<div class="text-input-group">
  <label for="example-input" class="text-input-label">
    Full Name
    <span class="text-input-required" aria-label="required">*</span>
  </label>

  <div class="text-input-wrapper">
    <input
      type="text"
      id="example-input"
      class="text-input text-input--md"
      placeholder="Enter your full name"
      required
      aria-describedby="example-input-helper"
    />
  </div>

  <p id="example-input-helper" class="text-input-helper">
    Please enter your full legal name as it appears on your documents.
  </p>
</div>

<!-- Input with Error State -->
<div class="text-input-group">
  <label for="error-input" class="text-input-label">Email Address</label>
  <div class="text-input-wrapper">
    <input
      type="email"
      id="error-input"
      class="text-input text-input--md text-input--error"
      value="invalid-email"
      aria-invalid="true"
      aria-describedby="error-input-error"
    />
  </div>
  <p id="error-input-error" class="text-input-error" role="alert">
    Please enter a valid email address.
  </p>
</div>

<style>
/* Qatar GBA Text Input Styles */
.text-input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.text-input-label {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
  color: #374151;
}

.text-input-required {
  color: #dc2626;
  margin-left: 0.25rem;
}

.text-input-wrapper {
  position: relative;
}

.text-input {
  display: flex;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  transition: all 0.2s ease-in-out;
  line-height: 1.25rem;

  /* Qatar GBA styling */
  &:hover {
    border-color: rgba(139, 21, 56, 0.5);
  }

  &:focus {
    outline: none;
    border-color: #8b1538;
    box-shadow: 0 0 0 2px rgba(139, 21, 56, 0.2);
  }

  &::placeholder {
    color: #9ca3af;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

/* Size variants */
.text-input--sm {
  height: 2rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}

.text-input--md {
  height: 2.5rem;
}

.text-input--lg {
  height: 3rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
}

/* Error state */
.text-input--error {
  border-color: #dc2626;
  color: #dc2626;

  &:focus {
    border-color: #dc2626;
    box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.2);
  }
}

/* Success state */
.text-input--success {
  border-color: #10b981;

  &:focus {
    border-color: #10b981;
    box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
  }
}

.text-input-helper {
  font-size: 0.875rem;
  color: #6b7280;
}

.text-input-error {
  font-size: 0.875rem;
  color: #dc2626;
}

/* RTL Support */
[dir="rtl"] .text-input {
  text-align: right;
}

[dir="rtl"] .text-input-required {
  margin-left: 0;
  margin-right: 0.25rem;
}

/* Icon support */
.text-input-wrapper .text-input-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 1rem;
  height: 1rem;
  color: #6b7280;
}

.text-input-wrapper .text-input-icon--left {
  left: 0.75rem;
}

.text-input-wrapper .text-input-icon--right {
  right: 0.75rem;
}

.text-input--with-left-icon {
  padding-left: 2.5rem;
}

.text-input--with-right-icon {
  padding-right: 2.5rem;
}

[dir="rtl"] .text-input-wrapper .text-input-icon--left {
  left: auto;
  right: 0.75rem;
}

[dir="rtl"] .text-input-wrapper .text-input-icon--right {
  right: auto;
  left: 0.75rem;
}

[dir="rtl"] .text-input--with-left-icon {
  padding-left: 0.75rem;
  padding-right: 2.5rem;
}

[dir="rtl"] .text-input--with-right-icon {
  padding-right: 0.75rem;
  padding-left: 2.5rem;
}
</style>`,
      dependencies: [],
      imports: [],
      exports: [],
    },
  ],

  props: [
    {
      name: 'label',
      type: 'string',
      required: false,
      description: 'Label text for the input field',
    },
    {
      name: 'type',
      type: 'string',
      required: false,
      defaultValue: 'text',
      description: 'Input type (text, email, password, etc.)',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
    {
      name: 'placeholder',
      type: 'string',
      required: false,
      description: 'Placeholder text for the input',
    },
    {
      name: 'value',
      type: 'string',
      required: false,
      description: 'Current value of the input',
    },
    {
      name: 'size',
      type: '"sm" | "md" | "lg"',
      required: false,
      defaultValue: 'md',
      description: 'Input size variant',
    },
    {
      name: 'isRequired',
      type: 'boolean',
      required: false,
      defaultValue: false,
      description: 'Shows required indicator',
    },
    {
      name: 'isInvalid',
      type: 'boolean',
      required: false,
      defaultValue: false,
      description: 'Shows error state styling',
    },
    {
      name: 'errorText',
      type: 'string',
      required: false,
      description: 'Error message to display',
    },
    {
      name: 'helperText',
      type: 'string',
      required: false,
      description: 'Helper text to guide the user',
    },
    {
      name: 'startIcon',
      type: 'React.ReactNode',
      required: false,
      description: 'Icon to display at the start of the input',
    },
    {
      name: 'endIcon',
      type: 'React.ReactNode',
      required: false,
      description: 'Icon to display at the end of the input',
    },
  ],

  events: [
    {
      name: 'onChange',
      description: 'Fired when input value changes',
      payload: 'ChangeEvent<HTMLInputElement>',
    },
    {
      name: 'onFocus',
      description: 'Fired when input receives focus',
      payload: 'FocusEvent<HTMLInputElement>',
    },
    {
      name: 'onBlur',
      description: 'Fired when input loses focus',
      payload: 'FocusEvent<HTMLInputElement>',
    },
  ],

  documentation: {
    overview:
      'Text Input component provides accessible form input with Qatar GBA styling, comprehensive validation states, and RTL support for Arabic content.',
    whenToUse: [
      'For single-line text input in forms',
      'When collecting user information like names, emails',
      'For search functionality',
      'In registration and login forms',
    ],
    whenNotToUse: [
      'For multi-line text (use TextArea instead)',
      'For selecting from predefined options (use Select)',
      'For yes/no questions (use Checkbox or Radio)',
      'For file uploads (use FileInput)',
    ],
    bestPractices: [
      'Always provide clear labels',
      'Use appropriate input types for better mobile keyboards',
      'Provide helpful error messages',
      'Support RTL for Arabic content',
      'Use placeholder text sparingly',
    ],
    commonMistakes: [
      'Using placeholder text instead of labels',
      'Not providing error states and messages',
      'Forgetting to handle RTL layouts',
      'Poor contrast ratios for accessibility',
    ],
    relatedComponents: ['TextArea', 'Select', 'Checkbox', 'FormField'],
  },

  usageExamples: [
    {
      title: 'Basic Text Input',
      description: 'Simple text input with label',
      code: [
        {
          framework: 'react',
          language: 'tsx',
          code: `<TextInput
  label="Full Name"
  placeholder="Enter your full name"
  isRequired
/>`,
        },
      ],
    },
    {
      title: 'Input with Error State',
      description: 'Text input showing validation error',
      code: [
        {
          framework: 'react',
          language: 'tsx',
          code: `<TextInput
  label="Email Address"
  type="email"
  value="invalid-email"
  isInvalid
  errorText="Please enter a valid email address"
/>`,
        },
      ],
    },
    {
      title: 'Input with Icons',
      description: 'Text input with decorative icons',
      code: [
        {
          framework: 'react',
          language: 'tsx',
          code: `import { MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline';

<TextInput
  label="Search Users"
  placeholder="Search by name..."
  startIcon={<MagnifyingGlassIcon className="h-4 w-4" />}
  endIcon={<UserIcon className="h-4 w-4" />}
/>`,
        },
      ],
    },
  ],

  accessibility: {
    ariaLabel: 'Text input field',
    role: 'textbox',
    keyboardSupport: ['Tab', 'Shift+Tab', 'Enter', 'Escape'],
    screenReaderSupport: true,
    wcagCompliance: 'AA',
    colorContrastRatio: 4.5,
    focusManagement: 'Focus indicator with 2px outline using Qatar GBA colors',
    landmarks: ['textbox', 'label'],
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
      localizedContent: true,
    },
    governmentStandards: {
      accessibilityCompliant: true,
      securityStandards: ['WCAG 2.1 AA', 'Input Validation'],
      dataPrivacy: true,
    },
  },

  testing: {
    unitTests: true,
    integrationTests: true,
    accessibilityTests: true,
    visualRegressionTests: true,
    testCoverage: 92,
    testExamples: [
      {
        framework: 'react',
        code: `import { render, screen, fireEvent } from '@testing-library/react';
import { TextInput } from './TextInput';

describe('TextInput', () => {
  it('renders with label', () => {
    render(<TextInput label="Test Input" />);
    expect(screen.getByLabelText('Test Input')).toBeInTheDocument();
  });

  it('handles input changes', () => {
    const handleChange = jest.fn();
    render(<TextInput onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test value' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('shows error state', () => {
    render(<TextInput errorText="Error message" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Error message');
  });

  it('supports RTL layout', () => {
    render(<TextInput className="rtl:text-right" />);
    expect(screen.getByRole('textbox')).toHaveClass('rtl:text-right');
  });
});`,
      },
    ],
  },

  thumbnail: '/thumbnails/text-input.png',
  screenshots: [
    '/screenshots/text-input-default.png',
    '/screenshots/text-input-error.png',
    '/screenshots/text-input-with-icons.png',
  ],

  dependencies: [],
  dependents: ['FormField', 'SearchBox', 'LoginForm'],
  composedOf: [],
};
