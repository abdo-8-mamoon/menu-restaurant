'use client';

import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Search, ShoppingBag } from 'lucide-react';
import { useLanguage } from '@/lib/contexts';
import { MenuCategoryId } from '@/lib/types';
import { MENU_CATALOG } from '@/lib/menu-data';
import { formatCurrency, localizedName, cx } from '@/lib/utils';
import { MenuItemCard } from './MenuItemCard';
import { Spinner } from './Spinner';

interface MenuProps {
  currency: string;
  isSubmitting: boolean;
  onBack: () => void;
  onConfirmOrder: (cart: Array<{ item_id: string; qty: number }>) => void;
}

const CATEGORIES: { id: MenuCategoryId; labelKey: 'appetizers' | 'mains' | 'drinks' | 'desserts' }[] = [
  { id: 'appetizers', labelKey: 'appetizers' },
  { id: 'mains', labelKey: 'mains' },
  { id: 'drinks', labelKey: 'drinks' },
  { id: 'desserts', labelKey: 'desserts' },
];

export function Menu({ currency, isSubmitting, onBack, onConfirmOrder }: MenuProps) {
  const { lang, dir, translate } = useLanguage();
  const [category, setCategory] = useState<MenuCategoryId>('appetizers');
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState<Record<string, number>>({});

  const BackIcon = dir === 'rtl' ? ArrowRight : ArrowLeft;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MENU_CATALOG.filter((item) => {
      const matchesCategory = item.category === category;
      if (!q) return matchesCategory;
      const matchesQuery =
        item.name_ar.toLowerCase().includes(q) || item.name_en.toLowerCase().includes(q);
      return q ? matchesQuery : matchesCategory;
    });
  }, [category, query]);

  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const menuItem = MENU_CATALOG.find((m) => m.id === id);
    return sum + (menuItem ? menuItem.price * qty : 0);
  }, 0);

  function increment(id: string) {
    setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  }

  function decrement(id: string) {
    setCart((prev) => {
      const next = { ...prev };
      const current = (next[id] ?? 0) - 1;
      if (current <= 0) delete next[id];
      else next[id] = current;
      return next;
    });
  }

  function handleConfirm() {
    const items = Object.entries(cart).map(([item_id, qty]) => ({ item_id, qty }));
    onConfirmOrder(items);
  }

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
        <h1 className="text-lg font-bold text-ink dark:text-ink-dark">{translate('menuTitle')}</h1>
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted dark:text-muted-dark" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={translate('searchPlaceholder')}
          className="w-full rounded-xl2 border border-border bg-surface py-3 ps-9 pe-3 text-sm text-ink shadow-card outline-none placeholder:text-muted focus:border-accent dark:border-border-dark dark:bg-surface-dark dark:text-ink-dark dark:placeholder:text-muted-dark"
        />
      </div>

      <div className="scrollbar-thin -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setCategory(cat.id)}
            className={cx(
              'shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition',
              category === cat.id
                ? 'bg-accent text-white shadow-card dark:bg-accent-dark dark:text-stone-950'
                : 'border border-border bg-surface text-muted dark:border-border-dark dark:bg-surface-dark dark:text-muted-dark',
            )}
          >
            {translate(cat.labelKey)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted dark:text-muted-dark">{translate('noResults')}</p>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              currency={currency}
              quantity={cart[item.id] ?? 0}
              onIncrement={() => increment(item.id)}
              onDecrement={() => decrement(item.id)}
            />
          ))}
        </div>
      )}

      {cartCount > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 backdrop-blur-md dark:border-border-dark dark:bg-surface-dark/95">
          <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
            <div className="flex flex-1 items-center gap-2 text-sm text-ink dark:text-ink-dark">
              <ShoppingBag className="h-4 w-4 text-accent dark:text-accent-dark" aria-hidden="true" />
              <span className="font-semibold">
                {cartCount} {translate('itemsInCart')}
              </span>
              <span className="text-muted dark:text-muted-dark">·</span>
              <span className="font-bold text-accent dark:text-accent-dark">
                {formatCurrency(cartTotal, lang, currency)}
              </span>
            </div>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={isSubmitting}
              className="flex shrink-0 items-center gap-1.5 rounded-xl2 bg-accent px-4 py-3 text-sm font-bold text-white shadow-card transition hover:bg-accent/90 disabled:opacity-50 dark:bg-accent-dark dark:text-stone-950"
            >
              {isSubmitting && <Spinner className="h-4 w-4" />}
              {translate('confirmOrder')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
