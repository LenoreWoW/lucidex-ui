'use client';

import React from 'react';
import { Template, TemplateCategory } from '@/types/templates';
import { TemplateBrowser } from '@/components/templates';
import { useRouter } from 'next/navigation';

interface TemplatesPageProps {
  searchParams?: {
    category?: TemplateCategory;
    search?: string;
  };
}

export default function TemplatesPage({ searchParams }: TemplatesPageProps) {
  const router = useRouter();

  const handleTemplateSelect = (template: Template) => {
    // Navigate to the individual template page
    router.push(`/templates/${template.id}`);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Page Header */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="max-w-3xl">
            <h1 className="mb-4 text-3xl font-bold text-neutral-900">
              Template Library
            </h1>
            <p className="text-lg leading-relaxed text-neutral-600">
              Explore our collection of Qatar GBA-compliant templates designed
              for modern web applications. Each template is built with
              accessibility, responsiveness, and best practices in mind.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="from-primary-50 to-primary-100 rounded-lg bg-gradient-to-r p-4">
              <div className="text-primary-900 mb-1 text-2xl font-bold">
                50+
              </div>
              <div className="text-primary-700 text-sm">Templates</div>
            </div>
            <div className="from-secondary-50 to-secondary-100 rounded-lg bg-gradient-to-r p-4">
              <div className="text-secondary-900 mb-1 text-2xl font-bold">
                10
              </div>
              <div className="text-secondary-700 text-sm">Categories</div>
            </div>
            <div className="rounded-lg bg-gradient-to-r from-neutral-50 to-neutral-100 p-4">
              <div className="mb-1 text-2xl font-bold text-neutral-900">5</div>
              <div className="text-sm text-neutral-700">Languages</div>
            </div>
            <div className="from-success/10 to-success/20 rounded-lg bg-gradient-to-r p-4">
              <div className="text-success mb-1 text-2xl font-bold">100%</div>
              <div className="text-success text-sm">GBA Compliant</div>
            </div>
          </div>
        </div>
      </div>

      {/* Template Browser */}
      <div className="flex-1">
        <TemplateBrowser
          {...(searchParams?.category && {
            initialCategory: searchParams.category,
          })}
          onTemplateSelect={handleTemplateSelect}
        />
      </div>
    </div>
  );
}
