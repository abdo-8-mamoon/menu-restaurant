'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, ArrowLeft, Check, Minus, Plus, Users } from 'lucide-react';
import { useLanguage } from '@/lib/contexts';
import { OrderItem, PaymentMode } from '@/lib/types';
import { computeBillTotals, formatCurrency, localizedName } from '@/lib/utils';
import { Spinner } from './Spinner';
import { cx } from '@/lib/utils';

type SplitTab = 'equal' | 'custom';

interface SplitBillProps {
  items: OrderItem[];
  currency: string;
  taxRate?: number;
  serviceChargeRate?: number;
  isSubmitting: boolean;
  onBack: () => void;
  onConfirm: (mode: PaymentMode, amount: number, paidItemIds?: string[]) => void;
}

const MIN_GUESTS = 2;
const MAX_GUESTS = 10;

export function SplitBill({
  items,
  currency,
  taxRate,
  serviceChargeRate,
  isSubmitting,
  onBack,
  onConfirm,
}: SplitBillProps) {
  const { lang, dir, translate } = useLanguage();
  const [tab, setTab] = useState<SplitTab>('equal');
  const [guests, setGuests] = useState(2);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const totals = computeBillTotals(items, taxRate, serviceChargeRate);
  const perPerson = totals.grandTotal / guests;

  const selectedItems = useMemo(
    () => items.filter((item) => selectedIds.has(item.id)),
    [items, selectedIds],
  );
  const customTotals = computeBillTotals(selectedItems, taxRate, serviceChargeRate);

  const BackIcon = dir === 'rtl' ? ArrowRight : ArrowLeft;

  function toggleItem(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleConfirm() {
    if (tab === 'equal') {
      onConfirm('equal', perPerson);
    } else {
      onConfirm('custom', customTotals.grandTotal, Array.from(selectedIds));
    }
  }

  const customDisabled = tab === 'custom' && selectedIds.size === 0;

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4 px-4 pb-32 pt-4 animate-slide-up">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-ink dark:border-border-dark dark:bg-surface-dark dark:text-ink-dark"
          aria-label={translate('back')}
        >
          <BackIcon className="h-4 w-4" />
        </button>
        <h1 className="text-lg font-bold text-ink dark:text-ink-dark">{translate('splitBillTitle')}</h1>
      </div>

      {/* Mode tabs */}
      <div className="grid grid-cols-2 gap-2 rounded-xl2 bg-surface p-1.5 shadow-card dark:bg-surface-dark">
        {(['equal', 'custom'] as SplitTab[]).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setTab(option)}
            className={cx(
              'rounded-xl px-3 py-2.5 text-sm font-semibold transition',
              tab === option
                ? 'bg-accent text-white shadow-card dark:bg-accent-dark dark:text-stone-950'
                : 'text-muted hover:text-ink dark:text-muted-dark dark:hover:text-ink-dark',
            )}
          >
            {option === 'equal' ? translate('equalSplit') : translate('customSplit')}
          </button>
        ))}
      </div>

      {tab === 'equal' ? (
        <div className="flex flex-col items-center gap-6 rounded-xl2 border border-border bg-surface px-6 py-8 shadow-card dark:border-border-dark dark:bg-surface-dark">
          <div className="flex items-center gap-2 text-muted dark:text-muted-dark">
            <Users className="h-4 w-4" aria-hidden="true" />
            <span className="text-sm font-medium">{translate('numberOfGuests')}</span>
          </div>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setGuests((g) => Math.max(MIN_GUESTS, g - 1))}
              disabled={guests <= MIN_GUESTS}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg text-ink transition disabled:opacity-30 dark:border-border-dark dark:bg-bg-dark dark:text-ink-dark"
              aria-label="minus"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-12 text-center text-3xl font-extrabold text-ink dark:text-ink-dark">{guests}</span>
            <button
              type="button"
              onClick={() => setGuests((g) => Math.min(MAX_GUESTS, g + 1))}
              disabled={guests >= MAX_GUESTS}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg text-ink transition disabled:opacity-30 dark:border-border-dark dark:bg-bg-dark dark:text-ink-dark"
              aria-label="plus"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <input
            type="range"
            min={MIN_GUESTS}
            max={MAX_GUESTS}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="h-1.5 w-full max-w-xs cursor-pointer appearance-none rounded-full bg-border accent-accent dark:bg-border-dark"
            aria-label={translate('numberOfGuests')}
          />

          <div className="flex flex-col items-center gap-1 rounded-xl2 bg-accent/5 px-6 py-4 dark:bg-accent-dark/10">
            <span className="text-xs font-medium text-muted dark:text-muted-dark">{translate('perPerson')}</span>
            <span className="text-2xl font-extrabold text-accent dark:text-accent-dark">
              {formatCurrency(perPerson, lang, currency)}
            </span>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl2 border border-border bg-surface shadow-card dark:border-border-dark dark:bg-surface-dark">
          <p className="border-b border-border px-4 py-3 text-sm font-semibold text-muted dark:border-border-dark dark:text-muted-dark">
            {translate('selectYourItems')}
          </p>
          <ul className="divide-y divide-border dark:divide-border-dark">
            {items.map((item) => {
              const checked = selectedIds.has(item.id);
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-start transition hover:bg-bg dark:hover:bg-bg-dark"
                  >
                    <span
                      className={cx(
                        'flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition',
                        checked
                          ? 'border-accent bg-accent text-white dark:border-accent-dark dark:bg-accent-dark dark:text-stone-950'
                          : 'border-border dark:border-border-dark',
                      )}
                    >
                      {checked && <Check className="h-3.5 w-3.5" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-ink dark:text-ink-dark">
                        {localizedName(item, lang)}
                      </span>
                      <span className="block text-xs text-muted dark:text-muted-dark">
                        {translate('qty')}: {item.qty} × {formatCurrency(item.price, lang, currency)}
                      </span>
                    </span>
                    <span className="shrink-0 text-sm font-bold text-ink dark:text-ink-dark">
                      {formatCurrency(item.price * item.qty, lang, currency)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center justify-between border-t border-border bg-accent/5 px-4 py-3.5 dark:border-border-dark dark:bg-accent-dark/10">
            <span className="text-sm font-semibold text-ink dark:text-ink-dark">{translate('yourShare')}</span>
            <span className="text-lg font-extrabold text-accent dark:text-accent-dark">
              {formatCurrency(customTotals.grandTotal, lang, currency)}
            </span>
          </div>
        </div>
      )}

      {customDisabled && (
        <p className="text-center text-xs font-medium text-red-500">{translate('selectAtLeastOneItem')}</p>
      )}

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 backdrop-blur-md dark:border-border-dark dark:bg-surface-dark/95">
        <div className="mx-auto max-w-2xl px-4 py-3">
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isSubmitting || customDisabled}
            className="flex w-full items-center justify-center gap-2 rounded-xl2 bg-accent px-4 py-3.5 text-sm font-bold text-white shadow-card transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-accent-dark dark:text-stone-950"
          >
            {isSubmitting && <Spinner className="h-4 w-4" />}
            {translate('confirmAndPay')}
          </button>
        </div>
      </div>
    </div>
  );
}
