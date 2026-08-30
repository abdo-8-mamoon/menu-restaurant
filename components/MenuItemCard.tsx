'use client';

/* eslint-disable @next/next/no-img-element */
import { Minus, Plus } from 'lucide-react';
import { useLanguage } from '@/lib/contexts';
import { MenuItem } from '@/lib/types';
import { formatCurrency, localizedDescription, localizedName } from '@/lib/utils';

interface MenuItemCardProps {
  item: MenuItem;
  quantity: number;
  currency: string;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function MenuItemCard({ item, quantity, currency, onIncrement, onDecrement }: MenuItemCardProps) {
  const { lang, translate } = useLanguage();

  return (
    <article className="flex gap-3 rounded-xl2 border border-border bg-surface p-3 shadow-card dark:border-border-dark dark:bg-surface-dark">
      <img
        src={item.image}
        alt={localizedName(item, lang)}
        loading="lazy"
        className="h-20 w-20 shrink-0 rounded-xl object-cover"
      />
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <h3 className="truncate text-sm font-bold text-ink dark:text-ink-dark">{localizedName(item, lang)}</h3>
          <p className="line-clamp-2 text-xs leading-snug text-muted dark:text-muted-dark">
            {localizedDescription(item, lang)}
          </p>
        </div>
        <div className="flex items-center justify-between pt-1.5">
          <span className="text-sm font-extrabold text-accent dark:text-accent-dark">
            {formatCurrency(item.price, lang, currency)}
          </span>

          {quantity === 0 ? (
            <button
              type="button"
              onClick={onIncrement}
              className="rounded-full bg-accent/10 px-3 py-1.5 text-xs font-bold text-accent transition hover:bg-accent/20 dark:bg-accent-dark/15 dark:text-accent-dark"
            >
              {translate('addToOrder')}
            </button>
          ) : (
            <div className="flex items-center gap-2 rounded-full bg-accent px-1 py-1 dark:bg-accent-dark">
              <button
                type="button"
                onClick={onDecrement}
                className="flex h-6 w-6 items-center justify-center rounded-full text-white dark:text-stone-950"
                aria-label="minus"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="min-w-[1rem] text-center text-xs font-bold text-white dark:text-stone-950">
                {quantity}
              </span>
              <button
                type="button"
                onClick={onIncrement}
                className="flex h-6 w-6 items-center justify-center rounded-full text-white dark:text-stone-950"
                aria-label="plus"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
