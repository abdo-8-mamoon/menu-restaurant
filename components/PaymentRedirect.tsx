'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/lib/contexts';
import { Spinner } from './Spinner';

interface PaymentRedirectProps {
  paymentUrl: string;
}

/** Screen shown right after a successful split-bill/pay-full response, while
 * we hand off to the external (n8n-provided) payment_url. */
export function PaymentRedirect({ paymentUrl }: PaymentRedirectProps) {
  const { translate } = useLanguage();
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.location.href = paymentUrl;
      setRedirected(true);
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [paymentUrl]);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center gap-5 px-6 text-center animate-fade-in">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent dark:bg-accent-dark/15 dark:text-accent-dark">
        {redirected ? <CheckCircle2 className="h-8 w-8" /> : <Spinner className="h-8 w-8" />}
      </span>
      <div>
        <h2 className="text-lg font-bold text-ink dark:text-ink-dark">{translate('redirectingTitle')}</h2>
        <p className="mt-1 text-sm text-muted dark:text-muted-dark">{translate('redirectingSubtitle')}</p>
      </div>
      <a
        href={paymentUrl}
        className="flex items-center gap-2 rounded-xl2 bg-accent px-5 py-3 text-sm font-bold text-white shadow-card transition hover:bg-accent/90 dark:bg-accent-dark dark:text-stone-950"
      >
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
        {translate('openPaymentPage')}
      </a>
      <p className="max-w-xs text-xs text-muted dark:text-muted-dark">{translate('paymentSuccessNote')}</p>
    </div>
  );
}
