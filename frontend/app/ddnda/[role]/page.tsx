'use client';

import { use, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { recordDDNDA } from '@/lib/api';

type Role = 'buyer' | 'lender' | 'broker-dealer';

const ROLE_COPY: Record<Role, { label: string; blurb: string; releases: string[] }> = {
  buyer: {
    label: 'Buyer',
    blurb:
      'You are a principal or family-office representative evaluating one or more works for acquisition.',
    releases: [
      'Named owner-of-record chain',
      'Authentication certificates and expert opinions',
      'Condition reports and verso evidence',
      'Current asking price and exhibition history',
    ],
  },
  lender: {
    label: 'Lender',
    blurb:
      'You are a bank, art-secured lender, or insurer underwriting one or more works as collateral.',
    releases: [
      'Named owner-of-record chain',
      'Authentication certificates and expert opinions',
      'Formal appraisals (FMV) with date and appraiser',
      'Insurance status, lien status, and current owner identity',
    ],
  },
  'broker-dealer': {
    label: 'Broker-Dealer',
    blurb:
      'You are a licensed dealer, agent, or intermediary representing a principal in evaluation or purchase.',
    releases: [
      'Named owner-of-record chain',
      'Authentication certificates and expert opinions',
      'Commission structure and referral terms',
      'Pricing floor and negotiation latitude',
    ],
  },
};

const VALID_ROLES: Role[] = ['buyer', 'lender', 'broker-dealer'];

export default function DdndaRolePage({ params }: { params: Promise<{ role: string }> }) {
  const { role: roleParam } = use(params);
  const role = VALID_ROLES.includes(roleParam as Role) ? (roleParam as Role) : null;
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('return');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!role) {
    return (
      <main className="min-h-screen bg-midnight px-8 py-20 text-ivory">
        <div className="mx-auto max-w-xl space-y-6 text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
            Unrecognised role
          </p>
          <h1 className="font-didot text-3xl">Return to the front door</h1>
          <Link
            href="/access"
            className="inline-block rounded-full border border-gold/50 bg-gold/10 px-8 py-3 font-mono text-[0.6rem] uppercase tracking-[0.32em] text-gold hover:border-gold"
          >
            Identify your interest →
          </Link>
        </div>
      </main>
    );
  }

  const copy = ROLE_COPY[role];

  async function handleSign() {
    if (!fullName.trim() || !email.trim()) {
      setError('Please enter your full name and email to sign.');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await recordDDNDA({
        fullName,
        email,
        documentVersion: '1.0',
        role: role!,
        organization: organization.trim() || undefined,
      });
      sessionStorage.setItem('nvai_ddnda_signed', '1');
      sessionStorage.setItem('nvai_ddnda_role', role!);
      // 30-day cookies — readable by /provenance/[slug] server component
      const maxAge = 60 * 60 * 24 * 30;
      document.cookie = `nvai_ddnda_signed=1; path=/; max-age=${maxAge}; SameSite=Lax`;
      document.cookie = `nvai_ddnda_role=${role}; path=/; max-age=${maxAge}; SameSite=Lax`;
      router.push(returnTo || '/foyer');
    } catch {
      setError('We were unable to record your signature. Please try again, or contact concierge.');
      setSubmitting(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden film-grain">
      <video
        preload="metadata"
        src="https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_foyer_aerial_static.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-midnight/65 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-3xl px-8 py-16">
        <div className="text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
            DDNDA · {copy.label}
          </p>
          <h1 className="mt-4 font-didot text-4xl uppercase tracking-[0.12em] text-ivory md:text-5xl">
            Document Distribution &amp;<br />Non-Disclosure Agreement
          </h1>
          <div className="mx-auto mt-6 h-px w-24 bg-gold/40" />
          <p className="mx-auto mt-8 max-w-xl font-body italic text-ivory/75 leading-relaxed">
            {copy.blurb}
          </p>
        </div>

        <article
          className="mt-12 rounded-lg border border-gold/20 px-10 py-12 font-body text-ivory/90 leading-relaxed shadow-2xl"
          style={{ background: 'linear-gradient(180deg, rgba(244,239,227,0.04) 0%, rgba(212,175,55,0.02) 100%)' }}
        >
          <p className="font-didot text-xl text-center text-ivory mb-8 tracking-wider">
            Exhibit A — {copy.label} Tier
          </p>
          <p>
            The works represented by Napa Valley Art Institute are held in private
            collections under exclusive agreement. By signing this {copy.label} DDNDA,
            the visitor acknowledges that all platform content beyond this gate —
            including imagery, provenance dossiers, pricing, and any communications
            with the Institute or its concierge — will be held in confidence and used
            solely for evaluation and personal due diligence.
          </p>
          <p className="mt-6 font-mono text-[0.6rem] uppercase tracking-[0.32em] text-gold/80">
            Releases upon signature
          </p>
          <ul className="mt-3 space-y-2">
            {copy.releases.map((r) => (
              <li key={r} className="flex gap-3 text-sm">
                <span className="font-mono text-[0.55rem] tracking-wider text-gold/60 pt-1">·</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-ivory/65 italic">
            Binding under California law. Signature is recorded with timestamp, role,
            and document version.
          </p>
        </article>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full name"
            disabled={submitting}
            className="rounded border border-gold/20 bg-midnight/40 px-4 py-3 font-body text-ivory placeholder:text-ivory/40 focus:border-gold/60 focus:outline-none disabled:opacity-50"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            disabled={submitting}
            className="rounded border border-gold/20 bg-midnight/40 px-4 py-3 font-body text-ivory placeholder:text-ivory/40 focus:border-gold/60 focus:outline-none disabled:opacity-50"
          />
          <input
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            placeholder="Organization (optional)"
            disabled={submitting}
            className="rounded border border-gold/20 bg-midnight/40 px-4 py-3 font-body text-ivory placeholder:text-ivory/40 focus:border-gold/60 focus:outline-none disabled:opacity-50 md:col-span-2"
          />
        </div>

        {error && (
          <p className="mt-6 text-center font-body italic text-sm text-oxblood/80" role="status" aria-live="polite">
            {error}
          </p>
        )}

        <div className="mt-10 text-center space-y-4">
          <button
            onClick={handleSign}
            disabled={submitting}
            className="rounded-full border border-gold/50 bg-gold/10 px-10 py-4 font-mono text-[0.7rem] uppercase tracking-[0.32em] text-gold transition-all hover:border-gold hover:bg-gold/20 disabled:opacity-50"
          >
            {submitting ? 'Signing…' : `Sign as ${copy.label} & Enter`}
          </button>
          <p className="font-body text-xs italic text-ivory/50">
            Wrong role?{' '}
            <Link href="/access" className="text-gold/70 underline-offset-2 hover:underline">
              Return to the front door
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
