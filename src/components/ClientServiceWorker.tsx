'use client';

import dynamic from 'next/dynamic';

const ServiceWorkerRegistration = dynamic(
  () => import('@/components/ServiceWorkerRegistration').then(mod => ({ default: mod.ServiceWorkerRegistration })),
  { ssr: false }
);

export function ClientServiceWorker() {
  return <ServiceWorkerRegistration />;
}