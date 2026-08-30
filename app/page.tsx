import { Suspense } from 'react';
import { AppShell } from '@/components/AppShell';
import { FullScreenLoader } from '@/components/Spinner';

export default function HomePage() {
  return (
    <Suspense fallback={<FullScreenLoader label="..." />}>
      <AppShell />
    </Suspense>
  );
}
