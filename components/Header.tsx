'use client';

import { Languages, Moon, Sun, UtensilsCrossed } from 'lucide-react';
import { useLanguage, useTheme } from '@/lib/contexts';

interface HeaderProps {
  tableId: string | null;
}

export function Header({ tableId }: HeaderProps) {
  const { lang, toggleLang, translate } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-md dark:border-border-dark dark:bg-bg-dark/90">
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent dark:bg-accent-dark/15 dark:text-accent-dark">
            <UtensilsCrossed className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold text-ink dark:text-ink-dark">{translate('appName')}</p>
            {tableId && (
              <p className="text-xs text-muted dark:text-muted-dark">
                {translate('table')} <span className="font-semibold text-accent dark:text-accent-dark">{tableId}</span>
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleLang}
            className="flex h-9 items-center gap-1 rounded-full border border-border bg-surface px-3 text-xs font-semibold text-ink transition hover:border-accent/40 dark:border-border-dark dark:bg-surface-dark dark:text-ink-dark"
            aria-label="toggle language"
          >
            <Languages className="h-3.5 w-3.5" aria-hidden="true" />
            {lang === 'ar' ? 'EN' : 'AR'}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-ink transition hover:border-accent/40 dark:border-border-dark dark:bg-surface-dark dark:text-ink-dark"
            aria-label="toggle theme"
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
