// ============================================================================
// Domain types shared across the app. Keep these in sync with the n8n
// webhook contracts documented in README.md.
// ============================================================================

export type Language = 'ar' | 'en';
export type Theme = 'light' | 'dark';

export type PaymentMode = 'full' | 'equal' | 'custom';

export type TableStatus = 'open' | 'awaiting_payment' | 'closed';

/** A single line item as returned by the table-status webhook. */
export interface OrderItem {
  id: string;
  name_ar: string;
  name_en: string;
  price: number;
  qty: number;
}

/** GET /webhook/table-status?table_id={id} */
export interface TableStatusResponse {
  table_id: string;
  currency: string;
  items: OrderItem[];
  status: TableStatus;
  /** Optional — falls back to app defaults (see lib/api.ts) when absent. */
  tax_rate?: number;
  service_charge_rate?: number;
}

/** POST /webhook/split-bill */
export interface SplitBillPayload {
  table_id: string;
  payment_mode: PaymentMode;
  total_amount: number;
  paid_items?: string[];
}

export interface SplitBillResponse {
  success: boolean;
  payment_url: string;
}

/** POST /webhook/add-order */
export interface AddOrderPayload {
  table_id: string;
  new_items: Array<{ item_id: string; qty: number }>;
}

export interface AddOrderResponse {
  success: boolean;
  message?: string;
}

// ---------------------------------------------------------------------------
// Menu (Screen 3) — catalog of items that can be added to a table's order.
// This is intentionally a separate shape from OrderItem: a menu item carries
// media/description for browsing, an order item is a priced line on a bill.
// ---------------------------------------------------------------------------

export type MenuCategoryId = 'appetizers' | 'mains' | 'drinks' | 'desserts';

export interface MenuItem {
  id: string;
  category: MenuCategoryId;
  name_ar: string;
  name_en: string;
  description_ar: string;
  description_en: string;
  price: number;
  image: string;
}

/** Client-side navigation between the three primary screens. */
export type Screen = 'bill' | 'split' | 'menu' | 'payment-redirect';

export interface ToastMessage {
  id: number;
  kind: 'error' | 'success' | 'info';
  text: string;
}
