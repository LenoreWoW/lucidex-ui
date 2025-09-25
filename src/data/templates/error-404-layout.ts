import { Template } from '@/types/templates';

export const error404LayoutTemplate: Template = {
  id: 'error-404-layout-01',
  name: 'Qatar GBA 404 Error Page',
  description:
    'A user-friendly 404 error page with helpful navigation options and Qatar GBA branding',
  category: 'error-page',
  tags: ['404', 'error', 'not-found', 'qatar-gba', 'responsive', 'helpful'],
  preview:
    'Professional 404 error page with clear messaging and helpful navigation options',
  responsive: true,
  accessible: true,
  qatarGBACompliant: true,
  metadata: {
    version: '1.0.0',
    lastUpdated: '2025-09-25',
    complexity: 'simple',
    estimatedImplementationTime: '1 hour',
    usageNotes:
      'Perfect for handling page not found errors with style and helpful guidance',
    designTokensUsed: [
      'qatar-primary',
      'qatar-neutral',
      'spacing-scale',
      'typography-system',
    ],
    dependencies: ['lucide-react', 'clsx'],
  },
  codeSnippets: [
    {
      language: 'react',
      filename: 'Error404Layout.tsx',
      code: `import React from 'react';
import { Home, Search, ArrowLeft, Shield, HelpCircle, Phone, Mail } from 'lucide-react';
import { clsx } from 'clsx';

interface Error404LayoutProps {
  onGoHome?: () => void;
  onGoBack?: () => void;
  onSearch?: (query: string) => void;
  showSearch?: boolean;
  showSupport?: boolean;
  brandLogo?: string;
  customTitle?: string;
  customMessage?: string;
  helpfulLinks?: Array<{
    label: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
  }>;
}

export const Error404Layout: React.FC<Error404LayoutProps> = ({
  onGoHome,
  onGoBack,
  onSearch,
  showSearch = true,
  showSupport = true,
  brandLogo,
  customTitle = "Page Not Found",
  customMessage = "We couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.",
  helpfulLinks = DEFAULT_HELPFUL_LINKS
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <div className="min-h-screen bg-qatar-neutral-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center">
        {/* Header/Logo */}
        <div className="mb-8">
          {brandLogo ? (
            <img src={brandLogo} alt="Qatar GBA" className="h-16 mx-auto mb-6" />
          ) : (
            <div className="h-16 w-16 bg-qatar-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-white" />
            </div>
          )}
          <div className="text-qatar-primary-600 text-sm font-medium mb-2">
            Qatar GBA
          </div>
        </div>

        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-bold text-qatar-primary-100 mb-4 select-none">
            404
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-qatar-primary-600 rounded-full opacity-10 animate-pulse"></div>
            </div>
            <div className="relative z-10">
              <Search className="h-16 w-16 text-qatar-primary-400 mx-auto mb-4" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-qatar-neutral-900 mb-4">
            {customTitle}
          </h1>
          <p className="text-lg text-qatar-neutral-600 leading-relaxed max-w-lg mx-auto">
            {customMessage}
          </p>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="mb-8">
            <form onSubmit={handleSearch} className="max-w-md mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-qatar-neutral-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-qatar-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-qatar-primary-500 focus:border-transparent"
                  placeholder="Search for services, documents, or help..."
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <div className="bg-qatar-primary-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-qatar-primary-700 transition-colors">
                    Search
                  </div>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={onGoHome}
            className="bg-qatar-primary-600 text-white px-6 py-3 rounded-lg hover:bg-qatar-primary-700 transition-colors font-medium inline-flex items-center justify-center"
          >
            <Home className="h-5 w-5 mr-2" />
            Go to Homepage
          </button>
          <button
            onClick={onGoBack}
            className="border-2 border-qatar-primary-600 text-qatar-primary-600 px-6 py-3 rounded-lg hover:bg-qatar-primary-50 transition-colors font-medium inline-flex items-center justify-center"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="bg-white rounded-lg border border-qatar-neutral-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-qatar-neutral-900 mb-4">
            Popular Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {helpfulLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="flex items-center p-3 rounded-lg hover:bg-qatar-neutral-50 transition-colors text-left border border-qatar-neutral-100 hover:border-qatar-primary-200"
              >
                {link.icon && (
                  <link.icon className="h-5 w-5 text-qatar-primary-600 mr-3" />
                )}
                <span className="text-qatar-neutral-700 font-medium">
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Support Section */}
        {showSupport && (
          <div className="bg-qatar-primary-50 rounded-lg p-6 border border-qatar-primary-200">
            <div className="flex items-center justify-center mb-4">
              <HelpCircle className="h-6 w-6 text-qatar-primary-600 mr-2" />
              <h3 className="text-lg font-semibold text-qatar-primary-900">
                Need Help?
              </h3>
            </div>
            <p className="text-qatar-primary-700 mb-4">
              Our support team is here to assist you with any questions or issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+974-800-QATAR"
                className="inline-flex items-center justify-center px-4 py-2 bg-qatar-primary-600 text-white rounded-lg hover:bg-qatar-primary-700 transition-colors font-medium"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Support
              </a>
              <a
                href="mailto:support@qatar.gov.qa"
                className="inline-flex items-center justify-center px-4 py-2 border-2 border-qatar-primary-600 text-qatar-primary-600 rounded-lg hover:bg-qatar-primary-50 transition-colors font-medium"
              >
                <Mail className="h-4 w-4 mr-2" />
                Email Us
              </a>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-qatar-neutral-200">
          <p className="text-sm text-qatar-neutral-500">
            &copy; 2025 Qatar Government Business Authority. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center space-x-4 text-sm">
            <a href="/privacy" className="text-qatar-primary-600 hover:text-qatar-primary-500">
              Privacy Policy
            </a>
            <span className="text-qatar-neutral-400">•</span>
            <a href="/terms" className="text-qatar-primary-600 hover:text-qatar-primary-500">
              Terms of Service
            </a>
            <span className="text-qatar-neutral-400">•</span>
            <a href="/accessibility" className="text-qatar-primary-600 hover:text-qatar-primary-500">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const DEFAULT_HELPFUL_LINKS = [
  {
    label: 'Document Services',
    href: '/services/documents',
    icon: Shield
  },
  {
    label: 'Business Registration',
    href: '/services/business',
    icon: Home
  },
  {
    label: 'License Renewal',
    href: '/services/licenses',
    icon: Shield
  },
  {
    label: 'Visa Services',
    href: '/services/visas',
    icon: Shield
  }
];

export default Error404Layout;`,
    },
    {
      language: 'nextjs',
      filename: 'not-found.tsx',
      code: `'use client';

import { useRouter } from 'next/navigation';
import { Home, Search, ArrowLeft, Shield, HelpCircle, Phone, Mail } from 'lucide-react';
import { useState } from 'react';

export default function NotFound() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(\`/search?q=\${encodeURIComponent(searchQuery.trim())}\`);
    }
  };

  const handleGoHome = () => {
    router.push('/');
  };

  const handleGoBack = () => {
    router.back();
  };

  const helpfulLinks = [
    {
      label: 'Document Services',
      href: '/services/documents',
      icon: Shield
    },
    {
      label: 'Business Registration',
      href: '/services/business',
      icon: Home
    },
    {
      label: 'License Renewal',
      href: '/services/licenses',
      icon: Shield
    },
    {
      label: 'Visa Services',
      href: '/services/visas',
      icon: Shield
    }
  ];

  return (
    <div className="min-h-screen bg-qatar-neutral-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center">
        {/* Header/Logo */}
        <div className="mb-8">
          <div className="h-16 w-16 bg-qatar-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <div className="text-qatar-primary-600 text-sm font-medium mb-2">
            Qatar GBA
          </div>
        </div>

        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-bold text-qatar-primary-100 mb-4 select-none">
            404
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-qatar-primary-600 rounded-full opacity-10 animate-pulse"></div>
            </div>
            <div className="relative z-10">
              <Search className="h-16 w-16 text-qatar-primary-400 mx-auto mb-4" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-qatar-neutral-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-qatar-neutral-600 leading-relaxed max-w-lg mx-auto">
            We couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-qatar-neutral-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-qatar-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-qatar-primary-500 focus:border-transparent"
                placeholder="Search for services, documents, or help..."
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <div className="bg-qatar-primary-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-qatar-primary-700 transition-colors">
                  Search
                </div>
              </button>
            </div>
          </form>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={handleGoHome}
            className="bg-qatar-primary-600 text-white px-6 py-3 rounded-lg hover:bg-qatar-primary-700 transition-colors font-medium inline-flex items-center justify-center"
          >
            <Home className="h-5 w-5 mr-2" />
            Go to Homepage
          </button>
          <button
            onClick={handleGoBack}
            className="border-2 border-qatar-primary-600 text-qatar-primary-600 px-6 py-3 rounded-lg hover:bg-qatar-primary-50 transition-colors font-medium inline-flex items-center justify-center"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="bg-white rounded-lg border border-qatar-neutral-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-qatar-neutral-900 mb-4">
            Popular Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {helpfulLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => router.push(link.href)}
                className="flex items-center p-3 rounded-lg hover:bg-qatar-neutral-50 transition-colors text-left border border-qatar-neutral-100 hover:border-qatar-primary-200"
              >
                <link.icon className="h-5 w-5 text-qatar-primary-600 mr-3" />
                <span className="text-qatar-neutral-700 font-medium">
                  {link.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-qatar-primary-50 rounded-lg p-6 border border-qatar-primary-200">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="h-6 w-6 text-qatar-primary-600 mr-2" />
            <h3 className="text-lg font-semibold text-qatar-primary-900">
              Need Help?
            </h3>
          </div>
          <p className="text-qatar-primary-700 mb-4">
            Our support team is here to assist you with any questions or issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+974-800-QATAR"
              className="inline-flex items-center justify-center px-4 py-2 bg-qatar-primary-600 text-white rounded-lg hover:bg-qatar-primary-700 transition-colors font-medium"
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Support
            </a>
            <a
              href="mailto:support@qatar.gov.qa"
              className="inline-flex items-center justify-center px-4 py-2 border-2 border-qatar-primary-600 text-qatar-primary-600 rounded-lg hover:bg-qatar-primary-50 transition-colors font-medium"
            >
              <Mail className="h-4 w-4 mr-2" />
              Email Us
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-qatar-neutral-200">
          <p className="text-sm text-qatar-neutral-500">
            &copy; 2025 Qatar Government Business Authority. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center space-x-4 text-sm">
            <button
              onClick={() => router.push('/privacy')}
              className="text-qatar-primary-600 hover:text-qatar-primary-500"
            >
              Privacy Policy
            </button>
            <span className="text-qatar-neutral-400">•</span>
            <button
              onClick={() => router.push('/terms')}
              className="text-qatar-primary-600 hover:text-qatar-primary-500"
            >
              Terms of Service
            </button>
            <span className="text-qatar-neutral-400">•</span>
            <button
              onClick={() => router.push('/accessibility')}
              className="text-qatar-primary-600 hover:text-qatar-primary-500"
            >
              Accessibility
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}`,
    },
    {
      language: 'blazor',
      filename: 'Error404Page.razor',
      code: `@page "/404"
@page "/not-found"
@inject NavigationManager Navigation
@inject IJSRuntime JSRuntime

<div class="min-h-screen bg-qatar-neutral-50 flex items-center justify-center px-4 py-12">
    <div class="max-w-2xl w-full text-center">
        <!-- Header/Logo -->
        <div class="mb-8">
            <div class="h-16 w-16 bg-qatar-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1l3 6 6 3-6 3-3 6-3-6-6-3 6-3z"/>
                </svg>
            </div>
            <div class="text-qatar-primary-600 text-sm font-medium mb-2">
                Qatar GBA
            </div>
        </div>

        <!-- 404 Illustration -->
        <div class="mb-8">
            <div class="text-8xl md:text-9xl font-bold text-qatar-primary-100 mb-4 select-none">
                404
            </div>
            <div class="relative">
                <div class="absolute inset-0 flex items-center justify-center">
                    <div class="w-32 h-32 bg-qatar-primary-600 rounded-full opacity-10 animate-pulse"></div>
                </div>
                <div class="relative z-10">
                    <svg class="h-16 w-16 text-qatar-primary-400 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="m21 21-4.35-4.35"/>
                    </svg>
                </div>
            </div>
        </div>

        <!-- Error Message -->
        <div class="mb-8">
            <h1 class="text-3xl md:text-4xl font-bold text-qatar-neutral-900 mb-4">
                Page Not Found
            </h1>
            <p class="text-lg text-qatar-neutral-600 leading-relaxed max-w-lg mx-auto">
                We couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
            </p>
        </div>

        <!-- Search Bar -->
        <div class="mb-8">
            <EditForm Model="searchModel" OnValidSubmit="HandleSearch" class="max-w-md mx-auto">
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class="h-5 w-5 text-qatar-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"/>
                            <path d="m21 21-4.35-4.35"/>
                        </svg>
                    </div>
                    <InputText @bind-Value="searchModel.Query"
                             class="w-full pl-10 pr-4 py-3 border border-qatar-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-qatar-primary-500 focus:border-transparent"
                             placeholder="Search for services, documents, or help..." />
                    <button type="submit"
                            class="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <div class="bg-qatar-primary-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-qatar-primary-700 transition-colors">
                            Search
                        </div>
                    </button>
                </div>
            </EditForm>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button @onclick="GoToHomepage"
                    class="bg-qatar-primary-600 text-white px-6 py-3 rounded-lg hover:bg-qatar-primary-700 transition-colors font-medium inline-flex items-center justify-center">
                <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                </svg>
                Go to Homepage
            </button>
            <button @onclick="GoBack"
                    class="border-2 border-qatar-primary-600 text-qatar-primary-600 px-6 py-3 rounded-lg hover:bg-qatar-primary-50 transition-colors font-medium inline-flex items-center justify-center">
                <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="19" y1="12" x2="5" y2="12"/>
                    <polyline points="12,19 5,12 12,5"/>
                </svg>
                Go Back
            </button>
        </div>

        <!-- Helpful Links -->
        <div class="bg-white rounded-lg border border-qatar-neutral-200 p-6 mb-8">
            <h2 class="text-xl font-semibold text-qatar-neutral-900 mb-4">
                Popular Services
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                @foreach (var link in HelpfulLinks)
                {
                    <button @onclick="() => NavigateToService(link.Href)"
                            class="flex items-center p-3 rounded-lg hover:bg-qatar-neutral-50 transition-colors text-left border border-qatar-neutral-100 hover:border-qatar-primary-200">
                        <div class="h-5 w-5 text-qatar-primary-600 mr-3">
                            @((MarkupString)link.IconSvg)
                        </div>
                        <span class="text-qatar-neutral-700 font-medium">
                            @link.Label
                        </span>
                    </button>
                }
            </div>
        </div>

        <!-- Support Section -->
        <div class="bg-qatar-primary-50 rounded-lg p-6 border border-qatar-primary-200">
            <div class="flex items-center justify-center mb-4">
                <svg class="h-6 w-6 text-qatar-primary-600 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <h3 class="text-lg font-semibold text-qatar-primary-900">
                    Need Help?
                </h3>
            </div>
            <p class="text-qatar-primary-700 mb-4">
                Our support team is here to assist you with any questions or issues.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+974-800-QATAR"
                   class="inline-flex items-center justify-center px-4 py-2 bg-qatar-primary-600 text-white rounded-lg hover:bg-qatar-primary-700 transition-colors font-medium">
                    <svg class="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    Call Support
                </a>
                <a href="mailto:support@qatar.gov.qa"
                   class="inline-flex items-center justify-center px-4 py-2 border-2 border-qatar-primary-600 text-qatar-primary-600 rounded-lg hover:bg-qatar-primary-50 transition-colors font-medium">
                    <svg class="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    Email Us
                </a>
            </div>
        </div>

        <!-- Footer -->
        <div class="mt-12 pt-8 border-t border-qatar-neutral-200">
            <p class="text-sm text-qatar-neutral-500">
                &copy; 2025 Qatar Government Business Authority. All rights reserved.
            </p>
            <div class="mt-2 flex justify-center space-x-4 text-sm">
                <button @onclick="() => Navigation.NavigateTo(\"/privacy\")"
                        class="text-qatar-primary-600 hover:text-qatar-primary-500">
                    Privacy Policy
                </button>
                <span class="text-qatar-neutral-400">•</span>
                <button @onclick="() => Navigation.NavigateTo(\"/terms\")"
                        class="text-qatar-primary-600 hover:text-qatar-primary-500">
                    Terms of Service
                </button>
                <span class="text-qatar-neutral-400">•</span>
                <button @onclick="() => Navigation.NavigateTo(\"/accessibility\")"
                        class="text-qatar-primary-600 hover:text-qatar-primary-500">
                    Accessibility
                </button>
            </div>
        </div>
    </div>
</div>

@code {
    private SearchModel searchModel = new();

    private class SearchModel
    {
        public string Query { get; set; } = string.Empty;
    }

    private List<HelpfulLink> HelpfulLinks = new()
    {
        new() { Label = "Document Services", Href = "/services/documents", IconSvg = "<path d='M12 1l3 6 6 3-6 3-3 6-3-6-6-3 6-3z'/>" },
        new() { Label = "Business Registration", Href = "/services/business", IconSvg = "<path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'/>" },
        new() { Label = "License Renewal", Href = "/services/licenses", IconSvg = "<path d='M12 1l3 6 6 3-6 3-3 6-3-6-6-3 6-3z'/>" },
        new() { Label = "Visa Services", Href = "/services/visas", IconSvg = "<path d='M12 1l3 6 6 3-6 3-3 6-3-6-6-3 6-3z'/>" }
    };

    private class HelpfulLink
    {
        public string Label { get; set; } = string.Empty;
        public string Href { get; set; } = string.Empty;
        public string IconSvg { get; set; } = string.Empty;
    }

    private async Task HandleSearch()
    {
        if (!string.IsNullOrWhiteSpace(searchModel.Query))
        {
            Navigation.NavigateTo($"/search?q={Uri.EscapeDataString(searchModel.Query.Trim())}");
        }
    }

    private void GoToHomepage()
    {
        Navigation.NavigateTo("/");
    }

    private async Task GoBack()
    {
        await JSRuntime.InvokeVoidAsync("history.back");
    }

    private void NavigateToService(string href)
    {
        Navigation.NavigateTo(href);
    }
}`,
    },
    {
      language: 'html',
      filename: '404.html',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Not Found - Qatar GBA</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'qatar-primary': {
                            50: '#fdf2f8',
                            100: '#fce7f3',
                            200: '#fbcfe8',
                            300: '#f9a8d4',
                            400: '#f472b6',
                            500: '#ec4899',
                            600: '#db2777',
                            700: '#be185d',
                            800: '#9d174d',
                            900: '#831843'
                        },
                        'qatar-neutral': {
                            50: '#f8fafc',
                            100: '#f1f5f9',
                            200: '#e2e8f0',
                            300: '#cbd5e1',
                            400: '#94a3b8',
                            500: '#64748b',
                            600: '#475569',
                            700: '#334155',
                            800: '#1e293b',
                            900: '#0f172a'
                        }
                    }
                }
            }
        }
    </script>
</head>
<body class="min-h-screen bg-qatar-neutral-50 flex items-center justify-center px-4 py-12">
    <div class="max-w-2xl w-full text-center">
        <!-- Header/Logo -->
        <div class="mb-8">
            <div class="h-16 w-16 bg-qatar-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1l3 6 6 3-6 3-3 6-3-6-6-3 6-3z"/>
                </svg>
            </div>
            <div class="text-qatar-primary-600 text-sm font-medium mb-2">
                Qatar GBA
            </div>
        </div>

        <!-- 404 Illustration -->
        <div class="mb-8">
            <div class="text-8xl md:text-9xl font-bold text-qatar-primary-100 mb-4 select-none">
                404
            </div>
            <div class="relative">
                <div class="absolute inset-0 flex items-center justify-center">
                    <div class="w-32 h-32 bg-qatar-primary-600 rounded-full opacity-10 animate-pulse"></div>
                </div>
                <div class="relative z-10">
                    <svg class="h-16 w-16 text-qatar-primary-400 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="m21 21-4.35-4.35"/>
                    </svg>
                </div>
            </div>
        </div>

        <!-- Error Message -->
        <div class="mb-8">
            <h1 class="text-3xl md:text-4xl font-bold text-qatar-neutral-900 mb-4">
                Page Not Found
            </h1>
            <p class="text-lg text-qatar-neutral-600 leading-relaxed max-w-lg mx-auto">
                We couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
            </p>
        </div>

        <!-- Search Bar -->
        <div class="mb-8">
            <form id="search-form" class="max-w-md mx-auto">
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class="h-5 w-5 text-qatar-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"/>
                            <path d="m21 21-4.35-4.35"/>
                        </svg>
                    </div>
                    <input
                        id="search-input"
                        type="text"
                        class="w-full pl-10 pr-4 py-3 border border-qatar-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-qatar-primary-500 focus:border-transparent"
                        placeholder="Search for services, documents, or help..."
                    />
                    <button
                        type="submit"
                        class="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                        <div class="bg-qatar-primary-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-qatar-primary-700 transition-colors">
                            Search
                        </div>
                    </button>
                </div>
            </form>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
                onclick="window.location.href='/'"
                class="bg-qatar-primary-600 text-white px-6 py-3 rounded-lg hover:bg-qatar-primary-700 transition-colors font-medium inline-flex items-center justify-center"
            >
                <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                </svg>
                Go to Homepage
            </button>
            <button
                onclick="window.history.back()"
                class="border-2 border-qatar-primary-600 text-qatar-primary-600 px-6 py-3 rounded-lg hover:bg-qatar-primary-50 transition-colors font-medium inline-flex items-center justify-center"
            >
                <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="19" y1="12" x2="5" y2="12"/>
                    <polyline points="12,19 5,12 12,5"/>
                </svg>
                Go Back
            </button>
        </div>

        <!-- Helpful Links -->
        <div class="bg-white rounded-lg border border-qatar-neutral-200 p-6 mb-8">
            <h2 class="text-xl font-semibold text-qatar-neutral-900 mb-4">
                Popular Services
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="/services/documents" class="flex items-center p-3 rounded-lg hover:bg-qatar-neutral-50 transition-colors text-left border border-qatar-neutral-100 hover:border-qatar-primary-200">
                    <svg class="h-5 w-5 text-qatar-primary-600 mr-3" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 1l3 6 6 3-6 3-3 6-3-6-6-3 6-3z"/>
                    </svg>
                    <span class="text-qatar-neutral-700 font-medium">Document Services</span>
                </a>
                <a href="/services/business" class="flex items-center p-3 rounded-lg hover:bg-qatar-neutral-50 transition-colors text-left border border-qatar-neutral-100 hover:border-qatar-primary-200">
                    <svg class="h-5 w-5 text-qatar-primary-600 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    </svg>
                    <span class="text-qatar-neutral-700 font-medium">Business Registration</span>
                </a>
                <a href="/services/licenses" class="flex items-center p-3 rounded-lg hover:bg-qatar-neutral-50 transition-colors text-left border border-qatar-neutral-100 hover:border-qatar-primary-200">
                    <svg class="h-5 w-5 text-qatar-primary-600 mr-3" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 1l3 6 6 3-6 3-3 6-3-6-6-3 6-3z"/>
                    </svg>
                    <span class="text-qatar-neutral-700 font-medium">License Renewal</span>
                </a>
                <a href="/services/visas" class="flex items-center p-3 rounded-lg hover:bg-qatar-neutral-50 transition-colors text-left border border-qatar-neutral-100 hover:border-qatar-primary-200">
                    <svg class="h-5 w-5 text-qatar-primary-600 mr-3" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 1l3 6 6 3-6 3-3 6-3-6-6-3 6-3z"/>
                    </svg>
                    <span class="text-qatar-neutral-700 font-medium">Visa Services</span>
                </a>
            </div>
        </div>

        <!-- Support Section -->
        <div class="bg-qatar-primary-50 rounded-lg p-6 border border-qatar-primary-200">
            <div class="flex items-center justify-center mb-4">
                <svg class="h-6 w-6 text-qatar-primary-600 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <h3 class="text-lg font-semibold text-qatar-primary-900">
                    Need Help?
                </h3>
            </div>
            <p class="text-qatar-primary-700 mb-4">
                Our support team is here to assist you with any questions or issues.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                    href="tel:+974-800-QATAR"
                    class="inline-flex items-center justify-center px-4 py-2 bg-qatar-primary-600 text-white rounded-lg hover:bg-qatar-primary-700 transition-colors font-medium"
                >
                    <svg class="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    Call Support
                </a>
                <a
                    href="mailto:support@qatar.gov.qa"
                    class="inline-flex items-center justify-center px-4 py-2 border-2 border-qatar-primary-600 text-qatar-primary-600 rounded-lg hover:bg-qatar-primary-50 transition-colors font-medium"
                >
                    <svg class="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    Email Us
                </a>
            </div>
        </div>

        <!-- Footer -->
        <div class="mt-12 pt-8 border-t border-qatar-neutral-200">
            <p class="text-sm text-qatar-neutral-500">
                &copy; 2025 Qatar Government Business Authority. All rights reserved.
            </p>
            <div class="mt-2 flex justify-center space-x-4 text-sm">
                <a href="/privacy" class="text-qatar-primary-600 hover:text-qatar-primary-500">
                    Privacy Policy
                </a>
                <span class="text-qatar-neutral-400">•</span>
                <a href="/terms" class="text-qatar-primary-600 hover:text-qatar-primary-500">
                    Terms of Service
                </a>
                <span class="text-qatar-neutral-400">•</span>
                <a href="/accessibility" class="text-qatar-primary-600 hover:text-qatar-primary-500">
                    Accessibility
                </a>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const searchForm = document.getElementById('search-form');
            const searchInput = document.getElementById('search-input');

            searchForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const query = searchInput.value.trim();
                if (query) {
                    // In a real application, you would handle the search
                    window.location.href = '/search?q=' + encodeURIComponent(query);
                }
            });
        });
    </script>
</body>
</html>`,
    },
    {
      language: 'typescript',
      filename: 'error-404-types.ts',
      code: `export interface Error404LayoutProps {
  onGoHome?: () => void;
  onGoBack?: () => void;
  onSearch?: (query: string) => void;
  showSearch?: boolean;
  showSupport?: boolean;
  brandLogo?: string;
  customTitle?: string;
  customMessage?: string;
  helpfulLinks?: HelpfulLink[];
}

export interface HelpfulLink {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface SupportContact {
  type: 'phone' | 'email' | 'chat';
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Error404Config {
  title: string;
  message: string;
  showSearch: boolean;
  showSupport: boolean;
  helpfulLinks: HelpfulLink[];
  supportContacts: SupportContact[];
  branding: {
    name: string;
    logo?: string;
  };
}

export const QATAR_GBA_ERROR_404_CONFIG: Error404Config = {
  title: "Page Not Found",
  message: "We couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.",
  showSearch: true,
  showSupport: true,
  helpfulLinks: [
    {
      label: 'Document Services',
      href: '/services/documents'
    },
    {
      label: 'Business Registration',
      href: '/services/business'
    },
    {
      label: 'License Renewal',
      href: '/services/licenses'
    },
    {
      label: 'Visa Services',
      href: '/services/visas'
    }
  ],
  supportContacts: [
    {
      type: 'phone',
      label: 'Call Support',
      value: '+974-800-QATAR'
    },
    {
      type: 'email',
      label: 'Email Us',
      value: 'support@qatar.gov.qa'
    }
  ],
  branding: {
    name: 'Qatar GBA'
  }
};

export interface SearchFormData {
  query: string;
}

export interface ErrorPageAnalytics {
  pageUrl: string;
  referrer?: string;
  userAgent?: string;
  timestamp: Date;
  searchQuery?: string;
  clickedLink?: string;
}

export interface ErrorPageActions {
  onSearch: (query: string) => void;
  onGoHome: () => void;
  onGoBack: () => void;
  onHelpfulLinkClick: (href: string, label: string) => void;
  onSupportContact: (type: 'phone' | 'email', value: string) => void;
}

export const DEFAULT_ERROR_404_ACTIONS: ErrorPageActions = {
  onSearch: (query: string) => {
    window.location.href = \`/search?q=\${encodeURIComponent(query)}\`;
  },
  onGoHome: () => {
    window.location.href = '/';
  },
  onGoBack: () => {
    window.history.back();
  },
  onHelpfulLinkClick: (href: string, label: string) => {
    // Track analytics if needed
    window.location.href = href;
  },
  onSupportContact: (type: 'phone' | 'email', value: string) => {
    if (type === 'phone') {
      window.location.href = \`tel:\${value}\`;
    } else if (type === 'email') {
      window.location.href = \`mailto:\${value}\`;
    }
  }
};`,
    },
  ],
};
