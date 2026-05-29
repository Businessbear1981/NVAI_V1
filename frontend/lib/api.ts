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
}): Promise<DDNDARecordedSignature> {
  return apiPost<DDNDARecordedSignature>('/ddnda/sign', payload);
}
