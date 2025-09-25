import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Lucidex UI Explorer Docs',
    default: 'Documentation | Lucidex UI Explorer',
  },
  description: 'Comprehensive documentation for the Lucidex UI Explorer design system.',
  openGraph: {
    title: 'Lucidex UI Explorer Documentation',
    description: 'Learn how to build beautiful, consistent user interfaces with Lucidex UI Explorer.',
    type: 'website',
    url: 'https://polaris-ui.com/docs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lucidex UI Explorer Documentation',
    description: 'Learn how to build beautiful, consistent user interfaces with Lucidex UI Explorer.',
  },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {children}
    </div>
  );
}