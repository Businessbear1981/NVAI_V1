// Server component — forces every /admin/* route to be dynamic.
// Why: all admin pages are `'use client'` (interactive curators / forms),
// which Next.js prerenders as static (○). Vercel's @vercel/next packager
// then crashes assembling the build output with NEXT_MISSING_LAMBDA because
// there's no serverless function for a "static" route inside an authenticated
// admin segment. Forcing dynamic creates the lambda and unblocks deploys.
//
// Route segment exports (`dynamic`, `runtime`, etc.) only apply on
// server components, which is why this lives in layout.tsx rather than
// the individual page files.
export const dynamic = 'force-dynamic';

import type { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
