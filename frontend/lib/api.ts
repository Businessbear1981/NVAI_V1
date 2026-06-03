/**
 * NVAI backend API client.
 * Proxied via next.config.js: /api/* → http://127.0.0.1:8200/api/*
 */

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`/api${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json();
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`/api${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
  return res.json();
}

export interface DDNDARecordedSignature {
  id: string;
  signedAt: string;
  documentVersion: string;
}

export async function recordDDNDA(payload: {
  fullName: string;
  email: string;
  documentVersion: string;
  role?: 'buyer' | 'lender' | 'broker-dealer';
  organization?: string;
}): Promise<DDNDARecordedSignature> {
  return apiPost<DDNDARecordedSignature>('/ddnda/sign', payload);
}

export interface StripeCheckoutItem {
  name: string;
  price_cents: number;
  quantity: number;
}

export async function createStripeCheckout(payload: {
  items: StripeCheckoutItem[];
  successUrl?: string;
  cancelUrl?: string;
  mode?: 'payment' | 'subscription';
}): Promise<{ ok: true; url: string; id: string }> {
  return apiPost('/checkout/session', payload);
}

export interface InquiryReceipt {
  success: boolean;
  id: string;
  message?: string;
}

export async function recordInquiry(payload: {
  name: string;
  email: string;
  painting_slug?: string;
  message: string;
  contact_preference?: 'email' | 'phone' | 'either';
}): Promise<InquiryReceipt> {
  return apiPost<InquiryReceipt>('/inquire/send', payload);
}

export interface ConsignmentReceipt {
  success: boolean;
  id: string;
  message?: string;
}

export async function recordConsignment(payload: {
  name: string;
  email: string;
  organization?: string;
  artist: string;
  title: string;
  year?: string;
  medium?: string;
  dimensions?: string;
  current_location?: string;
  description?: string;
  estimated_value?: string;
}): Promise<ConsignmentReceipt> {
  return apiPost<ConsignmentReceipt>('/consign/submit', payload);
}
