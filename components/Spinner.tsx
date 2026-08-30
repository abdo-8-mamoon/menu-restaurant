import { Loader2 } from 'lucide-react';
import { cx } from '@/lib/utils';

export function Spinner({ className }: { className?: string }) {
  return <Loader2 className={cx('animate-spin', className)} aria-hidden="true" />;
}

export function FullScreenLoader({ label }: { label: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-muted dark:text-muted-dark">
      <Spinner className="h-8 w-8 text-accent" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
