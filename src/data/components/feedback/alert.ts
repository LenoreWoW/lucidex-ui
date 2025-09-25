import { Component, ComponentCategory } from '../../../types/components';

export const alert: Component = {
  id: 'alert',
  name: 'Alert',
  displayName: 'Alert',
  description:
    'Alert component for displaying important messages with Qatar GBA styling and RTL support.',
  category: ComponentCategory.FEEDBACK,
  subcategory: 'notifications',
  tags: ['alert', 'notification', 'message', 'feedback', 'qatar-gba', 'rtl'],

  status: 'stable',
  version: '1.0.0',
  lastUpdated: '2024-09-25',
  author: 'Qatar GBA Design Team',
  maintainers: ['design-system-team'],

  variants: ['success', 'warning', 'info', 'destructive'],
  sizes: ['md'],
  customizable: true,
  responsive: true,

  implementations: [
    {
      framework: 'react',
      language: 'tsx',
      code: `import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground rtl:[&>svg]:left-auto rtl:[&>svg]:right-4',
  {
    variants: {
      variant: {
        success: 'border-green-200 bg-green-50 text-green-800 [&>svg]:text-green-600',
        warning: 'border-yellow-200 bg-yellow-50 text-yellow-800 [&>svg]:text-yellow-600',
        info: 'border-blue-200 bg-blue-50 text-blue-800 [&>svg]:text-blue-600',
        destructive: 'border-red-200 bg-red-50 text-red-800 [&>svg]:text-red-600',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

const iconMap = {
  success: CheckCircleIcon,
  warning: ExclamationTriangleIcon,
  info: InformationCircleIcon,
  destructive: XCircleIcon,
};

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: React.ReactNode;
  showIcon?: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', title, dismissible, onDismiss, icon, showIcon = true, children, ...props }, ref) => {
    const IconComponent = variant ? iconMap[variant] : InformationCircleIcon;

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {showIcon && (
          <div className="h-4 w-4">
            {icon || <IconComponent className="h-4 w-4" />}
          </div>
        )}

        <div className={cn('pl-7 rtl:pl-0 rtl:pr-7', dismissible && 'pr-8 rtl:pr-0 rtl:pl-8')}>
          {title && (
            <h5 className="mb-1 font-medium leading-none tracking-tight">
              {title}
            </h5>
          )}
          <div className="text-sm [&_p]:leading-relaxed">
            {children}
          </div>
        </div>

        {dismissible && (
          <button
            onClick={onDismiss}
            className="absolute right-2 top-2 rounded-md p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rtl:right-auto rtl:left-2"
            aria-label="Close alert"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export { Alert };`,
      dependencies: [
        'class-variance-authority',
        '@heroicons/react',
        'clsx',
        'tailwind-merge',
      ],
      imports: [
        'React',
        'cva',
        'VariantProps',
        'CheckCircleIcon',
        'ExclamationTriangleIcon',
        'InformationCircleIcon',
        'XCircleIcon',
        'XMarkIcon',
      ],
      exports: ['Alert', 'AlertProps'],
      styling: {
        type: 'tailwind',
        code: `/* RTL support for alerts */
[dir="rtl"] .rtl\\:left-auto {
  left: auto;
}

[dir="rtl"] .rtl\\:right-4 {
  right: 1rem;
}

[dir="rtl"] .rtl\\:pl-0 {
  padding-left: 0;
}

[dir="rtl"] .rtl\\:pr-7 {
  padding-right: 1.75rem;
}

[dir="rtl"] .rtl\\:pr-0 {
  padding-right: 0;
}

[dir="rtl"] .rtl\\:pl-8 {
  padding-left: 2rem;
}

[dir="rtl"] .rtl\\:left-2 {
  left: 0.5rem;
}`,
      },
    },
    {
      framework: 'html',
      language: 'html',
      code: `<!-- Success Alert -->
<div class="alert alert--success" role="alert">
  <svg class="alert__icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
  <div class="alert__content">
    <h5 class="alert__title">Success!</h5>
    <p>Your changes have been saved successfully.</p>
  </div>
</div>

<!-- Warning Alert with Dismiss -->
<div class="alert alert--warning" role="alert">
  <svg class="alert__icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
  </svg>
  <div class="alert__content">
    <h5 class="alert__title">Warning</h5>
    <p>Please review your information before submitting.</p>
  </div>
  <button class="alert__dismiss" aria-label="Close alert">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
  </button>
</div>

<style>
.alert {
  position: relative;
  width: 100%;
  border-radius: 8px;
  border: 1px solid;
  padding: 12px 16px;
  font-size: 14px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.alert__icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  margin-top: 2px;
}

.alert__content {
  flex: 1;
}

.alert__title {
  font-weight: 500;
  margin-bottom: 4px;
  line-height: 1.2;
}

.alert__dismiss {
  position: absolute;
  top: 8px;
  right: 8px;
  background: transparent;
  border: none;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.alert__dismiss:hover {
  opacity: 1;
}

.alert__dismiss:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
}

/* Variants */
.alert--success {
  border-color: #86efac;
  background-color: #f0fdf4;
  color: #166534;
}

.alert--success .alert__icon {
  color: #16a34a;
}

.alert--warning {
  border-color: #fde047;
  background-color: #fffbeb;
  color: #92400e;
}

.alert--warning .alert__icon {
  color: #d97706;
}

.alert--info {
  border-color: #93c5fd;
  background-color: #eff6ff;
  color: #1e40af;
}

.alert--info .alert__icon {
  color: #3b82f6;
}

.alert--destructive {
  border-color: #fca5a5;
  background-color: #fef2f2;
  color: #dc2626;
}

.alert--destructive .alert__icon {
  color: #ef4444;
}

/* RTL Support */
[dir="rtl"] .alert {
  text-align: right;
}

[dir="rtl"] .alert__dismiss {
  right: auto;
  left: 8px;
}
</style>`,
    },
  ],

  props: [
    {
      name: 'variant',
      type: '"success" | "warning" | "info" | "destructive"',
      required: false,
      defaultValue: 'info',
      description: 'Visual style variant of the alert',
      options: ['success', 'warning', 'info', 'destructive'],
    },
    {
      name: 'title',
      type: 'string',
      required: false,
      description: 'Title text for the alert',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'Main content of the alert',
    },
    {
      name: 'dismissible',
      type: 'boolean',
      required: false,
      defaultValue: false,
      description: 'Shows dismiss button when true',
    },
    {
      name: 'onDismiss',
      type: '() => void',
      required: false,
      description: 'Callback when alert is dismissed',
    },
    {
      name: 'showIcon',
      type: 'boolean',
      required: false,
      defaultValue: true,
      description: 'Shows variant-specific icon',
    },
    {
      name: 'icon',
      type: 'React.ReactNode',
      required: false,
      description: 'Custom icon to override default',
    },
  ],

  events: [
    {
      name: 'onDismiss',
      description: 'Fired when alert dismiss button is clicked',
      payload: 'void',
    },
  ],

  documentation: {
    overview:
      'Alert component displays important messages to users with appropriate visual styling and accessibility support, following Qatar GBA design principles.',
    whenToUse: [
      'To communicate important information to users',
      'For form validation feedback',
      'To show system status messages',
      'For success confirmations and error notifications',
    ],
    whenNotToUse: [
      'For non-critical information (use regular text)',
      'For interactive confirmations (use Modal or Dialog)',
      'For temporary messages (use Toast instead)',
    ],
    bestPractices: [
      'Use appropriate variant for message type',
      'Keep messages concise and actionable',
      'Provide clear titles for complex alerts',
      'Ensure sufficient color contrast',
      'Test with screen readers',
    ],
    commonMistakes: [
      'Overusing destructive alerts',
      'Not providing dismiss functionality when needed',
      'Poor message hierarchy and clarity',
      'Forgetting RTL layout support',
    ],
    relatedComponents: ['Toast', 'Modal', 'Banner'],
  },

  usageExamples: [
    {
      title: 'Success Alert',
      description: 'Alert showing successful operation',
      code: [
        {
          framework: 'react',
          language: 'tsx',
          code: `<Alert variant="success" title="Success!">
  Your profile has been updated successfully.
</Alert>`,
        },
      ],
    },
    {
      title: 'Dismissible Warning',
      description: 'Warning alert that can be dismissed',
      code: [
        {
          framework: 'react',
          language: 'tsx',
          code: `<Alert
  variant="warning"
  title="Warning"
  dismissible
  onDismiss={() => console.log('Alert dismissed')}
>
  Please review your information before submitting.
</Alert>`,
        },
      ],
    },
  ],

  accessibility: {
    role: 'alert',
    keyboardSupport: ['Tab', 'Enter', 'Space'],
    screenReaderSupport: true,
    wcagCompliance: 'AA',
    colorContrastRatio: 4.5,
    focusManagement: 'Focus moves to dismiss button when present',
    landmarks: ['alert'],
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
  dependents: ['FormValidation', 'NotificationSystem'],
  composedOf: [],
};
