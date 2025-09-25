import type { MDXComponents } from 'mdx/types';
import { CodeExample } from '@/components/docs/CodeExample';
import { InstallationSteps } from '@/components/docs/InstallationSteps';
import { FrameworkTabs } from '@/components/docs/FrameworkTabs';

// Define custom components for MDX content
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Override default HTML elements
    h1: ({ children, ...props }) => (
      <h1
        className="mb-6 border-b border-gray-200 pb-4 text-4xl font-bold text-gray-900 dark:border-gray-800 dark:text-white"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        className="mb-4 mt-8 border-b border-gray-200 pb-2 text-3xl font-semibold text-gray-900 dark:border-gray-800 dark:text-white"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        className="mb-3 mt-6 text-2xl font-semibold text-gray-900 dark:text-white"
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4
        className="mb-2 mt-4 text-xl font-semibold text-gray-900 dark:text-white"
        {...props}
      >
        {children}
      </h4>
    ),
    p: ({ children, ...props }) => (
      <p
        className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300"
        {...props}
      >
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul
        className="mb-4 ml-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300"
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol
        className="mb-4 ml-4 list-inside list-decimal space-y-2 text-gray-700 dark:text-gray-300"
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="text-gray-700 dark:text-gray-300" {...props}>
        {children}
      </li>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="mb-4 border-l-4 border-blue-500 bg-blue-50 py-2 pl-4 italic text-gray-700 dark:bg-blue-900/20 dark:text-gray-300"
        {...props}
      >
        {children}
      </blockquote>
    ),
    code: ({ children, className, ...props }) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code
            className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-900 dark:bg-gray-800 dark:text-gray-100"
            {...props}
          >
            {children}
          </code>
        );
      }
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    pre: ({ children, ...props }) => (
      <pre
        className="mb-4 overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900"
        {...props}
      >
        {children}
      </pre>
    ),
    a: ({ children, href, ...props }) => (
      <a
        href={href}
        className="text-blue-600 underline decoration-blue-600/30 transition-colors hover:text-blue-800 hover:decoration-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
        {...props}
      >
        {children}
      </a>
    ),
    table: ({ children, ...props }) => (
      <div className="mb-4 overflow-x-auto">
        <table
          className="min-w-full rounded-lg border border-gray-200 dark:border-gray-800"
          {...props}
        >
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th
        className="border-b border-gray-200 bg-gray-50 px-4 py-2 text-left font-semibold text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td
        className="border-b border-gray-200 px-4 py-2 text-gray-700 dark:border-gray-700 dark:text-gray-300"
        {...props}
      >
        {children}
      </td>
    ),
    hr: props => (
      <hr className="my-8 border-gray-200 dark:border-gray-800" {...props} />
    ),

    // Custom components for documentation
    CodeExample,
    InstallationSteps,
    FrameworkTabs,

    // Allow any other components to pass through
    ...components,
  };
}
