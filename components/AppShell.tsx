'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AlertTriangle, RotateCw } from 'lucide-react';
import { Header } from './Header';
import { BillOverview } from './BillOverview';
import { SplitBill } from './SplitBill';
import { Menu } from './Menu';
import { PaymentRedirect } from './PaymentRedirect';
import { FullScreenLoader } from './Spinner';
import { ToastStack } from './Toast';
import { useLanguage, useToast } from '@/lib/contexts';
import { getTableStatus, submitAddOrder, submitSplitBill } from '@/lib/api';
import { PaymentMode, Screen, TableStatusResponse } from '@/lib/types';

export function AppShell() {
  const searchParams = useSearchParams();
  const tableId = searchParams.get('table_id');
  const { translate } = useLanguage();
  const { pushToast } = useToast();

  const [table, setTable] = useState<TableStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [screen, setScreen] = useState<Screen>('bill');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);

  const loadTable = useCallback(async () => {
    if (!tableId) {
      setLoading(false);
      setLoadError(true);
      return;
    }
    setLoading(true);
    setLoadError(false);
    try {
      const data = await getTableStatus(tableId);
      setTable(data);
    } catch {
      setLoadError(true);
      pushToast('error', translate('fetchTableError'));
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableId]);

  useEffect(() => {
    loadTable();
  }, [loadTable]);

  async function handlePayFull() {
    if (!table) return;
    setIsSubmitting(true);
    try {
      const totalItems = table.items.reduce((sum, i) => sum + i.price * i.qty, 0);
      const res = await submitSplitBill({
        table_id: table.table_id,
        payment_mode: 'full',
        total_amount: totalItems,
      });
      setPaymentUrl(res.payment_url);
      setScreen('payment-redirect');
    } catch {
      pushToast('error', translate('submitPaymentError'));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSplitConfirm(mode: PaymentMode, amount: number, paidItemIds?: string[]) {
    if (!table) return;
    setIsSubmitting(true);
    try {
      const res = await submitSplitBill({
        table_id: table.table_id,
        payment_mode: mode,
        total_amount: amount,
        paid_items: paidItemIds,
      });
      setPaymentUrl(res.payment_url);
      setScreen('payment-redirect');
    } catch {
      pushToast('error', translate('submitPaymentError'));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleConfirmOrder(cart: Array<{ item_id: string; qty: number }>) {
    if (!table || cart.length === 0) return;
    setIsSubmitting(true);
    try {
      await submitAddOrder({ table_id: table.table_id, new_items: cart });
      pushToast('success', translate('orderAddedSuccess'));
      setScreen('bill');
      await loadTable();
    } catch {
      pushToast('error', translate('submitOrderError'));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen">
      <ToastStack />
      <Header tableId={tableId} />

      {loading && <FullScreenLoader label={translate('loading')} />}

      {!loading && loadError && (
        <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-4 px-6 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500 dark:bg-red-950/40">
            <AlertTriangle className="h-6 w-6" aria-hidden="true" />
          </span>
          <p className="text-sm font-medium text-ink dark:text-ink-dark">
            {tableId ? translate('fetchTableError') : translate('missingTableId')}
          </p>
          {tableId && (
            <button
              type="button"
              onClick={loadTable}
              className="flex items-center gap-2 rounded-xl2 bg-accent px-4 py-2.5 text-sm font-bold text-white shadow-card transition hover:bg-accent/90 dark:bg-accent-dark dark:text-stone-950"
            >
              <RotateCw className="h-4 w-4" aria-hidden="true" />
              {translate('retry')}
            </button>
          )}
        </div>
      )}

      {!loading && !loadError && table && (
        <>
          {screen === 'bill' && (
            <BillOverview
              items={table.items}
              status={table.status}
              currency={table.currency}
              taxRate={table.tax_rate}
              serviceChargeRate={table.service_charge_rate}
              isPaying={isSubmitting}
              onPayFull={handlePayFull}
              onSplitBill={() => setScreen('split')}
              onAddItems={() => setScreen('menu')}
            />
          )}

          {screen === 'split' && (
            <SplitBill
              items={table.items}
              currency={table.currency}
              taxRate={table.tax_rate}
              serviceChargeRate={table.service_charge_rate}
              isSubmitting={isSubmitting}
              onBack={() => setScreen('bill')}
              onConfirm={handleSplitConfirm}
            />
          )}

          {screen === 'menu' && (
            <Menu
              currency={table.currency}
              isSubmitting={isSubmitting}
              onBack={() => setScreen('bill')}
              onConfirmOrder={handleConfirmOrder}
            />
          )}

          {screen === 'payment-redirect' && paymentUrl && <PaymentRedirect paymentUrl={paymentUrl} />}
        </>
      )}
    </div>
  );
}
