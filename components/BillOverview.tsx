'use client';

import { CreditCard, PlusCircle, Receipt, SplitSquareHorizontal } from 'lucide-react';
import { useLanguage } from '@/lib/contexts';
import { OrderItem, TableStatus } from '@/lib/types';
import { computeBillTotals, formatCurrency, localizedName } from '@/lib/utils';
import { Spinner } from './Spinner';

interface BillOverviewProps {
  items: OrderItem[];
  status: TableStatus;
  currency: string;
  taxRate?: number;
  serviceChargeRate?: number;
  isPaying: boolean;
  onPayFull: () => void;
  onSplitBill: () => void;
  onAddItems: () => void;
}

const STATUS_STYLES: Record<TableStatus, string> = {
  open: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
  awaiting_payment: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
  closed: 'bg-stone-100 text-stone-500 dark:bg-stone-800/50 dark:text-stone-400',
};

export function BillOverview({
  items,
  status,
  currency,
  taxRate,
  serviceChargeRate,
  isPaying,
  onPayFull,
  onSplitBill,
  onAddItems,
}: BillOverviewProps) {
  const { lang, translate } = useLanguage();
  const totals = computeBillTotals(items, taxRate, serviceChargeRate);
  const statusKey =
    status === 'open' ? 'statusOpen' : status === 'awaiting_payment' ? 'statusAwaitingPayment' : 'statusClosed';

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4 px-4 pb-32 pt-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-ink dark:text-ink-dark">{translate('yourOrder')}</h1>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[status]}`}>
          {translate(statusKey)}
        </span>
      </div>

      <div className="overflow-hidden rounded-xl2 border border-border bg-surface shadow-card dark:border-border-dark dark:bg-surface-dark">
        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-4 py-12 text-center">
            <Receipt className="h-8 w-8 text-muted dark:text-muted-dark" aria-hidden="true" />
            <p className="text-sm text-muted dark:text-muted-dark">{translate('noItemsYet')}</p>
          </div>
        ) : (
          <ul className="divide-y divide-border dark:divide-border-dark">
            {items.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-3 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink dark:text-ink-dark">
                    {localizedName(item, lang)}
                  </p>
                  <p className="text-xs text-muted dark:text-muted-dark">
                    {translate('qty')}: {item.qty} × {formatCurrency(item.price, lang, currency)}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-bold text-ink dark:text-ink-dark">
                  {formatCurrency(item.price * item.qty, lang, currency)}
                </p>
              </li>
            ))}
          </ul>
        )}

        {items.length > 0 && (
          <div className="space-y-1.5 border-t border-dashed border-border px-4 py-3 dark:border-border-dark">
            <Row label={translate('subtotal')} value={formatCurrency(totals.subtotal, lang, currency)} />
            <Row label={translate('tax')} value={formatCurrency(totals.tax, lang, currency)} muted />
            <Row label={translate('serviceCharge')} value={formatCurrency(totals.serviceCharge, lang, currency)} muted />
            <div className="!mt-2.5 flex items-center justify-between border-t border-border pt-2.5 dark:border-border-dark">
              <span className="text-sm font-bold text-ink dark:text-ink-dark">{translate('grandTotal')}</span>
              <span className="text-base font-extrabold text-accent dark:text-accent-dark">
                {formatCurrency(totals.grandTotal, lang, currency)}
              </span>
            </div>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onAddItems}
        className="flex items-center justify-center gap-2 rounded-xl2 border border-dashed border-accent/50 bg-accent/5 px-4 py-3 text-sm font-semibold text-accent transition hover:bg-accent/10 dark:border-accent-dark/40 dark:bg-accent-dark/10 dark:text-accent-dark"
      >
        <PlusCircle className="h-4 w-4" aria-hidden="true" />
        {translate('addMoreItems')}
      </button>

      {/* Sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 backdrop-blur-md dark:border-border-dark dark:bg-surface-dark/95">
        <div className="mx-auto flex max-w-2xl gap-2 px-4 py-3">
          <button
            type="button"
            onClick={onSplitBill}
            disabled={items.length === 0 || status === 'closed'}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl2 border border-border bg-bg px-3 py-3 text-sm font-semibold text-ink transition hover:border-accent/40 disabled:cursor-not-allowed disabled:opacity-40 dark:border-border-dark dark:bg-bg-dark dark:text-ink-dark"
          >
            <SplitSquareHorizontal className="h-4 w-4" aria-hidden="true" />
            {translate('splitBill')}
          </button>
          <button
            type="button"
            onClick={onPayFull}
            disabled={items.length === 0 || status === 'closed' || isPaying}
            className="flex flex-[1.4] items-center justify-center gap-1.5 rounded-xl2 bg-accent px-3 py-3 text-sm font-bold text-white shadow-card transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-accent-dark dark:text-stone-950"
          >
            {isPaying ? <Spinner className="h-4 w-4" /> : <CreditCard className="h-4 w-4" aria-hidden="true" />}
            {translate('payFullBill')}
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className={muted ? 'text-muted dark:text-muted-dark' : 'text-ink dark:text-ink-dark'}>{label}</span>
      <span className={muted ? 'text-muted dark:text-muted-dark' : 'font-semibold text-ink dark:text-ink-dark'}>
        {value}
      </span>
    </div>
  );
}
