'use client';

import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import { useToast } from '@/lib/contexts';
import { ToastMessage } from '@/lib/types';
import { cx } from '@/lib/utils';

const ICONS: Record<ToastMessage['kind'], typeof Info> = {
  error: AlertCircle,
  success: CheckCircle2,
  info: Info,
};

const STYLES: Record<ToastMessage['kind'], string> = {
  error: 'border-red-200 bg-red-50 text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300',
  success:
    'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-300',
  info: 'border-border bg-surface text-ink dark:border-border-dark dark:bg-surface-dark dark:text-ink-dark',
};

export function ToastStack() {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex flex-col items-center gap-2 p-3"
      role="status"
      aria-live="polite"
    >
      {toasts.map((toast) => {
        const Icon = ICONS[toast.kind];
        return (
          <div
            key={toast.id}
            className={cx(
              'pointer-events-auto flex w-full max-w-sm items-start gap-2 rounded-xl2 border px-4 py-3 shadow-soft animate-toast-in',
              STYLES[toast.kind],
            )}
          >
            <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <p className="flex-1 text-sm leading-snug">{toast.text}</p>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              className="shrink-0 rounded-full p-0.5 opacity-60 transition hover:opacity-100"
              aria-label="close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
