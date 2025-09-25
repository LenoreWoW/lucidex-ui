/**
 * Component Data Index
 * Exports all available components for the Lucidex UI Explorer
 */

// Button Components
export { primaryButton } from './buttons/primary-button';
export { secondaryButton } from './buttons/secondary-button';

// Form Components
export { textInput } from './forms/text-input';

// Data Display Components
export { card } from './data-display/card';

// Feedback Components
export { alert } from './feedback/alert';

// Layout Components
export { container } from './layout/container';

// Export all components as an array for easy iteration
import { primaryButton } from './buttons/primary-button';
import { secondaryButton } from './buttons/secondary-button';
import { textInput } from './forms/text-input';
import { card } from './data-display/card';
import { alert } from './feedback/alert';
import { container } from './layout/container';

export const allComponents = [
  primaryButton,
  secondaryButton,
  textInput,
  card,
  alert,
  container,
];

export const componentsByCategory = {
  buttons: [primaryButton, secondaryButton],
  forms: [textInput],
  'data-display': [card],
  navigation: [],
  feedback: [alert],
  layout: [container],
};

// Component metadata for quick access
export const componentMetadata = {
  totalComponents: allComponents.length,
  categories: Object.keys(componentsByCategory),
  latestVersion: '1.0.0',
  lastUpdated: '2024-09-25',
};
