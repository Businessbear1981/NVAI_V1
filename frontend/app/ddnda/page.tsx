'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { recordDDNDA } from '@/lib/api';

const DDNDA_BACKDROP =
  'radial-gradient(ellipse at 50% 30%, rgba(232,200,122,0.20) 0%, transparent 55%), linear-gradient(180deg, #14100a 0%, #1c160c 50%, #0a0805 100%)';

export default function DdndaPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSign() {
    if (!fullName.trim() || !email.trim()) {
      setError('Please enter your full name and email to sign.');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await recordDDNDA({ fullName, email, documentVersion: '1.0' });
      sessionStorage.setItem('nvai_ddnda_signed', '1');
      router.push('/foyer');
    } catch {
      setError('We were unable to record your signature. Please try again, or contact concierge.');
      setSubmitting(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden film-grain">
      <video
        src="/videos/nvai_foyer_aerial_static.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-midnight/60 pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-3xl px-8 py-16">
        <div className="text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
            The Front Door
          </p>
          <h1 className="mt-4 font-didot text-4xl uppercase tracking-[0.12em] text-ivory md:text-5xl">
            Document Distribution &amp;<br/>Non-Disclosure Agreement
          </h1>
          <div className="mx-auto mt-6 h-px w-24 bg-gold/40" />
        </div>

        <article
          className="mt-12 rounded-lg border border-gold/20 px-10 py-12 font-body text-ivory/90 leading-relaxed shadow-2xl"
          style={{ background: 'linear-gradient(180deg, rgba(244,239,227,0.04) 0%, rgba(212,175,55,0.02) 100%)' }}
        >
          <p className="font-didot text-xl text-center text-ivory mb-8 tracking-wider">
            Exhibit A
          </p>
          <p>
            The works represented by Napa Valley Art Institute are held in private
            collections under exclusive agreement. The provenance documents, conservation
            reports, scientific analyses, and sale terms made available through this
            platform are confidential.
          </p>
          <p className="mt-4">
            By signing this agreement, the visitor acknowledges that all platform content
            beyond this gate — including artwork imagery, provenance dossiers, pricing,
            and any communications with the Institute or its concierge — will be held in
            confidence and used solely for evaluation and personal due diligence.
          </p>
          <p className="mt-4">
            This agreement is binding under California law. Signature is recorded with
            timestamp and document version.
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
            {submitting ? 'Signing…' : 'Sign and Enter'}
          </button>
          <p className="font-body text-xs italic text-ivory/50">
            Your signature is recorded with timestamp and document version for the record.
          </p>
        </div>
      </div>
    </main>
  );
}
