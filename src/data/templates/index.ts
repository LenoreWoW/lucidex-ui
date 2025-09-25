// Export all templates
export { dashboardLayoutTemplate } from './dashboard-layout';
export { loginLayoutTemplate } from './login-layout';
export { landingLayoutTemplate } from './landing-layout';
export { error404LayoutTemplate } from './error-404-layout';
export { emptyStateLayoutTemplate } from './empty-state-layout';

// Export template collections
import { dashboardLayoutTemplate } from './dashboard-layout';
import { loginLayoutTemplate } from './login-layout';
import { landingLayoutTemplate } from './landing-layout';
import { error404LayoutTemplate } from './error-404-layout';
import { emptyStateLayoutTemplate } from './empty-state-layout';

import { Template, TemplateCollection } from '@/types/templates';

export const allTemplates: Template[] = [
  dashboardLayoutTemplate,
  loginLayoutTemplate,
  landingLayoutTemplate,
  error404LayoutTemplate,
  emptyStateLayoutTemplate,
];

export const templateCollections: TemplateCollection[] = [
  {
    category: 'dashboard',
    name: 'Dashboard Layouts',
    description:
      'Comprehensive dashboard layouts with navigation, headers, and content areas',
    templates: [dashboardLayoutTemplate],
  },
  {
    category: 'authentication',
    name: 'Authentication Pages',
    description:
      'Secure and accessible authentication pages including login, register, and password reset',
    templates: [loginLayoutTemplate],
  },
  {
    category: 'landing-page',
    name: 'Landing Pages',
    description:
      'Marketing and informational landing pages with hero sections and call-to-actions',
    templates: [landingLayoutTemplate],
  },
  {
    category: 'error-page',
    name: 'Error Pages',
    description:
      'User-friendly error pages with helpful navigation and recovery options',
    templates: [error404LayoutTemplate],
  },
  {
    category: 'empty-state',
    name: 'Empty States',
    description:
      'Clean empty state designs for when content is unavailable or loading',
    templates: [emptyStateLayoutTemplate],
  },
];

// Template statistics
export const templateStats = {
  totalTemplates: allTemplates.length,
  categories: templateCollections.length,
  totalCodeSnippets: allTemplates.reduce(
    (sum, template) => sum + template.codeSnippets.length,
    0
  ),
  languages: Array.from(
    new Set(
      allTemplates.flatMap(template =>
        template.codeSnippets.map(snippet => snippet.language)
      )
    )
  ),
  responsiveTemplates: allTemplates.filter(t => t.responsive).length,
  accessibleTemplates: allTemplates.filter(t => t.accessible).length,
  qatarGBACompliantTemplates: allTemplates.filter(t => t.qatarGBACompliant)
    .length,
};

export default allTemplates;
