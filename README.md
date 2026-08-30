# Digital Menu & Bill Payment System

Mobile-first restaurant/cafe digital menu & bill payment web app. Next.js 14 (App Router) + TypeScript + Tailwind CSS, wired to a live **n8n** backend via webhooks.

## Stack
- Next.js 14 / React 18 / TypeScript (strict)
- Tailwind CSS (custom warm palette, dark mode via `class`)
- lucide-react icons
- next/font (Cairo — Arabic + Latin)
- Zero extra state libraries — React Context for language/theme/toasts

## Getting started

```bash
npm install
cp .env.local.example .env.local
# edit .env.local and set NEXT_PUBLIC_N8N_BASE_URL to your n8n instance
npm run dev
```

Open `http://localhost:3000/?table_id=20` — the table ID comes from the URL query string, exactly as specified (this is how you'd generate each table's QR code: one static URL per table with a different `table_id`).

## Project structure

```
app/
  layout.tsx        Root layout: Cairo font, providers, <html lang/dir>
  page.tsx           Suspense boundary + <AppShell/>
  globals.css        Base styles, focus rings, reduced-motion support
components/
  AppShell.tsx        Data fetching + screen state machine (the "controller")
  Header.tsx           Logo, table badge, AR/EN + light/dark toggles
  BillOverview.tsx      Screen 1 — itemized bill, totals, action bar
  SplitBill.tsx         Screen 2 — equal split (stepper+slider) & custom split (checkboxes)
  Menu.tsx / MenuItemCard.tsx   Screen 3 — categories, search, add-to-order
  PaymentRedirect.tsx   Post-payment-request handoff screen
  Toast.tsx, Spinner.tsx  Shared feedback primitives
lib/
  types.ts        All shared TypeScript interfaces (matches the webhook contracts below)
  i18n.ts          Full AR/EN dictionary — add new UI strings here only
  api.ts            Typed fetch wrapper for the 3 n8n webhooks + ApiError
  contexts.tsx      Language / Theme / Toast React contexts
  menu-data.ts       Local catalog for Screen 3 (see note below)
  utils.ts            Currency formatting, bill totals (tax/service), helpers
```

## n8n webhook contract

Set `NEXT_PUBLIC_N8N_BASE_URL` and the app calls straight into these three webhooks — no other backend code needed:

### 1. `GET {BASE_URL}/webhook/table-status?table_id={id}`
```ts
{
  table_id: string;
  currency: string;           // e.g. "EGP"
  items: Array<{
    id: string; name_ar: string; name_en: string; price: number; qty: number;
  }>;
  status: "open" | "awaiting_payment" | "closed";
  tax_rate?: number;              // optional, defaults to 0.14 (see lib/api.ts)
  service_charge_rate?: number;   // optional, defaults to 0.12
}
```

### 2. `POST {BASE_URL}/webhook/split-bill`
Request:
```ts
{
  table_id: string;
  payment_mode: "full" | "equal" | "custom";
  total_amount: number;
  paid_items?: string[]; // item ids, only for "custom"
}
```
Response:
```ts
{ success: true, payment_url: string }
```
The app redirects the guest to `payment_url` (with a manual "Open Payment Page" fallback button, in case auto-redirect is blocked by the browser).

### 3. `POST {BASE_URL}/webhook/add-order`
Request:
```ts
{ table_id: string; new_items: Array<{ item_id: string; qty: number }> }
```
On success the app re-fetches `table-status` so the bill reflects the new items immediately.

## Notes & things to plug in for production

- **Menu catalog**: `lib/menu-data.ts` is a static array because the brief didn't include a "get menu" webhook. The moment you add one (e.g. `GET /webhook/menu`), replace the import in `components/Menu.tsx` with a fetch through `lib/api.ts` — everything else (search, categories, cart) already reads through that one array.
- **Tax / service charge rates**: default to 14% / 12% (`lib/api.ts`) and can be overridden per-table via the `tax_rate` / `service_charge_rate` fields in the table-status response.
- **Auth / table validation**: this app trusts `table_id` from the URL, matching the brief (QR-code-per-table flow). If you need to prevent guests from guessing table IDs, sign the URL or validate a token server-side in n8n before returning table data.
- **Payment confirmation loop**: after redirecting to `payment_url`, this app doesn't poll for payment completion — wire that up (e.g. polling `table-status` for `status === "closed"`, or a webhook-triggered push) once your payment provider's callback flow is in place.
