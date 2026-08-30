import { Language, OrderItem } from './types';
import { DEFAULT_SERVICE_CHARGE_RATE, DEFAULT_TAX_RATE } from './api';

/** Formats a number as currency, using Arabic-Indic digits only for `ar`. */
export function formatCurrency(amount: number, lang: Language, currency: string): string {
  const locale = lang === 'ar' ? 'ar-EG' : 'en-US';
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return lang === 'ar' ? `${formatted} ${currency}` : `${currency} ${formatted}`;
}

export interface BillTotals {
  subtotal: number;
  tax: number;
  serviceCharge: number;
  grandTotal: number;
}

export function computeBillTotals(
  items: OrderItem[],
  taxRate: number = DEFAULT_TAX_RATE,
  serviceChargeRate: number = DEFAULT_SERVICE_CHARGE_RATE,
): BillTotals {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * taxRate;
  const serviceCharge = subtotal * serviceChargeRate;
  const grandTotal = subtotal + tax + serviceCharge;
  return { subtotal, tax, serviceCharge, grandTotal };
}

export function localizedName(item: { name_ar: string; name_en: string }, lang: Language): string {
  return lang === 'ar' ? item.name_ar : item.name_en;
}

export function localizedDescription(
  item: { description_ar: string; description_en: string },
  lang: Language,
): string {
  return lang === 'ar' ? item.description_ar : item.description_en;
}

export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
