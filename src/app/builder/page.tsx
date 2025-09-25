import { LayoutBuilder } from '@/components/builder/LayoutBuilder';

export const metadata = {
  title: 'Layout Builder - Lucidex UI',
  description: 'Create custom layouts with drag and drop components using the Lucidex UI Builder',
};

export default function BuilderPage() {
  return (
    <div className="h-screen">
      <LayoutBuilder />
    </div>
  );
}