import React from 'react';
import Link from 'next/link';
import { DocumentationLayout } from '@/components/docs/DocumentationLayout';
import { Book, Code, Palette, Settings, FileText, Lightbulb, ArrowRight } from 'lucide-react';

const quickStartSections = [
  {
    title: 'Getting Started',
    description: 'Learn the basics and get your first components up and running',
    href: '/docs/getting-started',
    icon: <Lightbulb className="h-6 w-6" />,
    color: 'text-yellow-600 dark:text-yellow-400',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
  },
  {
    title: 'Installation',
    description: 'Install and configure Lucidex UI in your project',
    href: '/docs/installation',
    icon: <Settings className="h-6 w-6" />,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    title: 'Components',
    description: 'Explore our comprehensive component library',
    href: '/docs/components',
    icon: <Book className="h-6 w-6" />,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
  },
];

const frameworkSections = [
  {
    title: 'React',
    description: 'Components and hooks for React applications',
    href: '/docs/frameworks/react',
    icon: '⚛️',
  },
  {
    title: 'Next.js',
    description: 'Optimized for Next.js with SSR support',
    href: '/docs/frameworks/nextjs',
    icon: '▲',
  },
  {
    title: 'Blazor',
    description: 'Native Blazor components for .NET developers',
    href: '/docs/frameworks/blazor',
    icon: '🔥',
  },
  {
    title: 'HTML/CSS',
    description: 'Vanilla HTML and CSS classes',
    href: '/docs/frameworks/html',
    icon: '🌐',
  },
  {
    title: 'TypeScript',
    description: 'Full TypeScript support with type definitions',
    href: '/docs/frameworks/typescript',
    icon: '📘',
  },
];

const additionalResources = [
  {
    title: 'Design Tokens',
    description: 'Colors, typography, spacing, and more design foundations',
    href: '/docs/design-tokens',
    icon: <Palette className="h-5 w-5" />,
  },
  {
    title: 'Theming',
    description: 'Customize the look and feel to match your brand',
    href: '/docs/theming',
    icon: <Palette className="h-5 w-5" />,
  },
  {
    title: 'Examples',
    description: 'Real-world examples and use cases',
    href: '/docs/examples',
    icon: <FileText className="h-5 w-5" />,
  },
];

export default function DocsHomePage() {
  return (
    <DocumentationLayout
      title="Documentation"
      description="Everything you need to build beautiful, consistent user interfaces with Lucidex UI Explorer."
      showTOC={false}
      showBreadcrumb={false}
    >
      {/* Quick Start Section */}
      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
          Quick Start
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {quickStartSections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group block rounded-xl border border-gray-200 p-6 transition-all hover:border-gray-300 hover:shadow-lg dark:border-gray-800 dark:hover:border-gray-700"
            >
              <div className={`inline-flex rounded-lg p-3 ${section.bgColor} mb-4`}>
                <div className={section.color}>
                  {section.icon}
                </div>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {section.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {section.description}
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
                Get started
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Framework Support Section */}
      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
          Framework Support
        </h2>
        <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
          Choose your preferred framework to get started with tailored documentation and examples.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {frameworkSections.map((framework) => (
            <Link
              key={framework.href}
              href={framework.href}
              className="group flex items-center space-x-4 rounded-lg border border-gray-200 p-4 transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:hover:border-gray-700"
            >
              <div className="text-2xl">{framework.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {framework.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {framework.description}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
            </Link>
          ))}
        </div>
      </div>

      {/* Additional Resources */}
      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
          Additional Resources
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {additionalResources.map((resource) => (
            <Link
              key={resource.href}
              href={resource.href}
              className="group flex items-center space-x-3 rounded-lg border border-gray-200 p-4 transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:hover:border-gray-700"
            >
              <div className="text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {resource.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {resource.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {resource.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Community Section */}
      <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-8 dark:from-blue-900/20 dark:to-indigo-900/20">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Join the Community
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Get help, share feedback, and connect with other developers using Lucidex UI.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://github.com/polaris-ui/explorer"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
          >
            <Code className="mr-2 h-4 w-4" />
            GitHub
          </a>
          <a
            href="https://discord.gg/polaris-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            💬 Discord
          </a>
          <a
            href="mailto:support@polaris-ui.com"
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            📧 Support
          </a>
        </div>
      </div>
    </DocumentationLayout>
  );
}