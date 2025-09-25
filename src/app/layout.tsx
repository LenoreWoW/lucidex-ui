import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { ToastProvider } from '@/components/ui';
import { SkipNavigation } from '@/components/accessibility/SkipNavigation';
import { AccessibilityChecker } from '@/components/accessibility/AccessibilityChecker';
import { AccessibilityProvider } from '@/components/accessibility/AccessibilityProvider';
import { ClientServiceWorker } from '@/components/ClientServiceWorker';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Lucidex UI - Bring clarity to your design system',
  description:
    'A cross-framework explorer for components, tokens, and layouts—with instant code for React, Next.js, Blazor, and Tailwind. Built with WCAG 2.1 AA compliance and comprehensive keyboard navigation support.',
  keywords: [
    'UI components',
    'design system',
    'accessibility',
    'WCAG',
    'React components',
    'Lucidex UI'
  ],
  authors: [{ name: 'Qatar GBA Design System Team' }],
  robots: 'index, follow',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <SkipNavigation />
        <AccessibilityProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
          >
            <div id="__next" className="min-h-screen">
              <ToastProvider>
                {children}
              </ToastProvider>
            </div>
            <div id="announcements" aria-live="polite" aria-atomic="true" className="sr-only" />
            <div id="alerts" aria-live="assertive" aria-atomic="true" className="sr-only" />
          </ThemeProvider>
          <AccessibilityChecker />
        </AccessibilityProvider>
        <ClientServiceWorker />
      </body>
    </html>
  );
}
