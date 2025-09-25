import { Metadata } from 'next';
import { ComponentBrowser } from '@/components/components/ComponentBrowser';

export const metadata: Metadata = {
  title: 'Component Library | Lucidex UI Explorer',
  description:
    'Browse and explore all components in the Lucidex UI Design System. Find the perfect component for your Qatar GBA compliant applications.',
  keywords: [
    'Qatar GBA',
    'Design System',
    'Components',
    'UI Library',
    'React Components',
    'Next.js Components',
    'Blazor Components',
    'Accessible Components',
    'Government Design',
    'Arabic UI',
  ],
};

export default function ComponentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <ComponentBrowser showFilters={true} viewMode="grid" maxResults={50} />
    </div>
  );
}
