import {
  AddOrderPayload,
  AddOrderResponse,
  SplitBillPayload,
  SplitBillResponse,
  TableStatusResponse,
} from './types';

// ============================================================================
// n8n integration layer.
//
// Point NEXT_PUBLIC_N8N_BASE_URL (see .env.local.example) at your live n8n
// instance's webhook base, e.g. https://n8n.yourdomain.com
//
// Every function here throws ApiError on failure so callers can show a
// localized toast — they never need to know about fetch/HTTP details.
// ============================================================================

const BASE_URL = process.env.NEXT_PUBLIC_N8N_BASE_URL ?? '';

/** Fallback rates used only if the table-status webhook omits them. */
export const DEFAULT_TAX_RATE = 0.14;
export const DEFAULT_SERVICE_CHARGE_RATE = 0.12;

export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request<TResponse>(
  path: string,
  init?: RequestInit,
): Promise<TResponse> {
  if (!BASE_URL) {
    throw new ApiError(
      'NEXT_PUBLIC_N8N_BASE_URL is not configured. Set it in .env.local.',
    );
  }

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers ?? {}),
      },
      cache: 'no-store',
    });
  } catch {
    throw new ApiError('network_error');
  }

  if (!res.ok) {
    throw new ApiError(`request_failed_${res.status}`, res.status);
  }

  try {
    return (await res.json()) as TResponse;
  } catch {
    throw new ApiError('invalid_response');
  }
}

/** GET /webhook/table-status?table_id={id} */
export function getTableStatus(tableId: string): Promise<TableStatusResponse> {
  return request<TableStatusResponse>(
    `/webhook/table-status?table_id=${encodeURIComponent(tableId)}`,
    { method: 'GET' },
  );
}

/** POST /webhook/split-bill */
export function submitSplitBill(
  payload: SplitBillPayload,
): Promise<SplitBillResponse> {
  return request<SplitBillResponse>('/webhook/split-bill', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/** POST /webhook/add-order */
export function submitAddOrder(
  payload: AddOrderPayload,
): Promise<AddOrderResponse> {
  return request<AddOrderResponse>('/webhook/add-order', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
