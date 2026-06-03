'use client';

import { useState } from 'react';
import Link from 'next/link';
import CinematicBackdrop from '@/components/cinematic/CinematicBackdrop';
import { recordConsignment } from '@/lib/api';

export default function ConsignPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    organization: '',
    artist: '',
    title: '',
    year: '',
    medium: '',
    dimensions: '',
    current_location: '',
    description: '',
    estimated_value: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [receiptId, setReceiptId] = useState<string | null>(null);

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit() {
    if (!form.name.trim() || !form.email.trim() || !form.artist.trim() || !form.title.trim()) {
      setErrorMessage('Please enter your name, email, the artist, and the title of the work.');
      setStatus('error');
      return;
    }
    setStatus('submitting');
    setErrorMessage('');
    try {
      const r = await recordConsignment({
        name: form.name.trim(),
        email: form.email.trim(),
        organization: form.organization.trim() || undefined,
        artist: form.artist.trim(),
        title: form.title.trim(),
        year: form.year.trim() || undefined,
        medium: form.medium.trim() || undefined,
        dimensions: form.dimensions.trim() || undefined,
        current_location: form.current_location.trim() || undefined,
        description: form.description.trim() || undefined,
        estimated_value: form.estimated_value.trim() || undefined,
      });
      setReceiptId(r.id);
      setStatus('success');
    } catch {
      setErrorMessage('We were unable to record your submission. Please try again, or email inquires@NVAI.org directly.');
      setStatus('error');
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-midnight text-ivory film-grain">
      <CinematicBackdrop
        fallbackGradient="radial-gradient(ellipse at 50% 0%, rgba(232,200,122,0.10) 0%, transparent 60%), linear-gradient(180deg, #1a0e08 0%, #261810 50%, #110a06 100%)"
        overlay={0.5}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-8 py-20 md:py-28">
        <Link
          href="/"
          className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 transition-colors hover:text-gold"
        >
          ← Return to the chateau
        </Link>

        <header className="mt-16 mb-20 text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
            For collectors, estates &amp; gallery partners
          </p>
          <h1 className="mt-6 font-didot text-5xl uppercase tracking-[0.12em] text-ivory drop-shadow md:text-6xl">
            Consignment Services
          </h1>
          <div className="mx-auto mt-8 h-px w-24 bg-gold/40" />
          <p className="mx-auto mt-8 max-w-2xl font-display text-lg italic tracking-wide text-gold/85">
            If you have art you would like featured for sale.
          </p>
        </header>

        <article className="space-y-20 font-body text-base leading-relaxed text-ivory/85">

          <section>
            <p className="mb-4 font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
              I &mdash; The Practice
            </p>
            <h2 className="mb-8 font-didot text-3xl uppercase tracking-[0.1em] text-ivory">
              A Selective Programme
            </h2>
            <p className="mb-4">
              The Napa Valley Art Institut accepts a limited number of significant works for representation each year. We work with private collectors, families, estates, and gallery partners across the United States, Europe, and the Gulf to bring fine art to qualified buyers, dealers, and institutional collectors &mdash; entirely under non-disclosure.
            </p>
            <p>
              Each work is considered on its own merits. Provenance, attribution, and condition matter more to us than the name on the canvas.
            </p>
          </section>

          <section>
            <p className="mb-4 font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
              II &mdash; What We Offer
            </p>
            <h2 className="mb-8 font-didot text-3xl uppercase tracking-[0.1em] text-ivory">
              Services
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="mt-2 inline-block h-px w-6 flex-shrink-0 bg-gold/50" />
                <span>Discreet exclusive or non-exclusive brokerage representation under written agreement.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-2 inline-block h-px w-6 flex-shrink-0 bg-gold/50" />
                <span>Forensic authentication coordination via <strong className="text-ivory">InsightART, Prague</strong> &mdash; CERN-derived particle physics MRXR imaging.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-2 inline-block h-px w-6 flex-shrink-0 bg-gold/50" />
                <span>Attribution review and Catalogue Raisonn&eacute; consideration via <strong className="text-ivory">Institut Restellini, Paris</strong>.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-2 inline-block h-px w-6 flex-shrink-0 bg-gold/50" />
                <span>Provenance research, exhibition history reconstruction, and documentation curation.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-2 inline-block h-px w-6 flex-shrink-0 bg-gold/50" />
                <span>Private viewing at the Institut or arranged secure transport to the buyer&rsquo;s location.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-2 inline-block h-px w-6 flex-shrink-0 bg-gold/50" />
                <span>Direct introduction to a vetted private-buyer network across the US, Europe, and the Gulf.</span>
              </li>
            </ul>
          </section>

          <section>
            <p className="mb-4 font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
              III &mdash; What We Look For
            </p>
            <h2 className="mb-8 font-didot text-3xl uppercase tracking-[0.1em] text-ivory">
              Criteria
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="mt-2 inline-block h-px w-6 flex-shrink-0 bg-gold/50" />
                <span>Works of significant attribution, provenance, or art-historical importance.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-2 inline-block h-px w-6 flex-shrink-0 bg-gold/50" />
                <span>Aggregate value at or above one million dollars per work.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-2 inline-block h-px w-6 flex-shrink-0 bg-gold/50" />
                <span>Documentation in reasonable order &mdash; provenance chain, exhibition history, prior authentication where applicable.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-2 inline-block h-px w-6 flex-shrink-0 bg-gold/50" />
                <span>Estate and family-held works particularly welcome.</span>
              </li>
            </ul>
          </section>

          <section>
            <p className="mb-4 font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
              IV &mdash; Submit a Work
            </p>
            <h2 className="mb-8 font-didot text-3xl uppercase tracking-[0.1em] text-ivory">
              Begin the Conversation
            </h2>

            {status === 'success' ? (
              <div className="rounded-lg border border-gold/30 bg-midnight/40 px-8 py-12 text-center">
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
                  Submission received
                </p>
                <h3 className="mt-4 font-didot text-2xl tracking-wider text-ivory">
                  Thank you, {form.name.split(' ')[0]}
                </h3>
                <div className="mx-auto my-4 h-px w-16 bg-gold/40" />
                <p className="mt-4 font-body italic text-ivory/85 max-w-xl mx-auto">
                  Richard Triberg and the Institut will review your submission for{' '}
                  <span className="text-ivory not-italic">{form.artist}</span> &mdash;{' '}
                  <em>{form.title}</em>. A response will arrive within one business day at{' '}
                  <span className="text-gold not-italic">{form.email}</span>.
                </p>
                {receiptId && (
                  <p className="mt-6 font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/55">
                    Confirmation · {receiptId.slice(0, 8)}
                  </p>
                )}
              </div>
            ) : (
              <>
                <p className="mb-8">
                  A brief written description, an image where available, and the work&rsquo;s current location are enough to begin a conversation. All submissions are received under the same Document Distribution &amp; Non-Disclosure framework that governs the gallery.
                </p>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    placeholder="Your full name *"
                    disabled={status === 'submitting'}
                    className="rounded border border-gold/20 bg-midnight/40 px-4 py-3 font-body text-ivory placeholder:text-ivory/40 focus:border-gold/60 focus:outline-none disabled:opacity-50"
                  />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="Email *"
                    disabled={status === 'submitting'}
                    className="rounded border border-gold/20 bg-midnight/40 px-4 py-3 font-body text-ivory placeholder:text-ivory/40 focus:border-gold/60 focus:outline-none disabled:opacity-50"
                  />
                  <input
                    type="text"
                    value={form.organization}
                    onChange={(e) => update('organization', e.target.value)}
                    placeholder="Organization / estate / family office (optional)"
                    disabled={status === 'submitting'}
                    className="rounded border border-gold/20 bg-midnight/40 px-4 py-3 font-body text-ivory placeholder:text-ivory/40 focus:border-gold/60 focus:outline-none disabled:opacity-50 md:col-span-2"
                  />
                  <input
                    type="text"
                    value={form.artist}
                    onChange={(e) => update('artist', e.target.value)}
                    placeholder="Artist *"
                    disabled={status === 'submitting'}
                    className="rounded border border-gold/20 bg-midnight/40 px-4 py-3 font-body text-ivory placeholder:text-ivory/40 focus:border-gold/60 focus:outline-none disabled:opacity-50"
                  />
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => update('title', e.target.value)}
                    placeholder="Title of the work *"
                    disabled={status === 'submitting'}
                    className="rounded border border-gold/20 bg-midnight/40 px-4 py-3 font-body text-ivory placeholder:text-ivory/40 focus:border-gold/60 focus:outline-none disabled:opacity-50"
                  />
                  <input
                    type="text"
                    value={form.year}
                    onChange={(e) => update('year', e.target.value)}
                    placeholder="Year (e.g. 1917 or c. 1900)"
                    disabled={status === 'submitting'}
                    className="rounded border border-gold/20 bg-midnight/40 px-4 py-3 font-body text-ivory placeholder:text-ivory/40 focus:border-gold/60 focus:outline-none disabled:opacity-50"
                  />
                  <input
                    type="text"
                    value={form.medium}
                    onChange={(e) => update('medium', e.target.value)}
                    placeholder="Medium (e.g. oil on canvas)"
                    disabled={status === 'submitting'}
                    className="rounded border border-gold/20 bg-midnight/40 px-4 py-3 font-body text-ivory placeholder:text-ivory/40 focus:border-gold/60 focus:outline-none disabled:opacity-50"
                  />
                  <input
                    type="text"
                    value={form.dimensions}
                    onChange={(e) => update('dimensions', e.target.value)}
                    placeholder="Dimensions"
                    disabled={status === 'submitting'}
                    className="rounded border border-gold/20 bg-midnight/40 px-4 py-3 font-body text-ivory placeholder:text-ivory/40 focus:border-gold/60 focus:outline-none disabled:opacity-50"
                  />
                  <input
                    type="text"
                    value={form.estimated_value}
                    onChange={(e) => update('estimated_value', e.target.value)}
                    placeholder="Estimated value (USD)"
                    disabled={status === 'submitting'}
                    className="rounded border border-gold/20 bg-midnight/40 px-4 py-3 font-body text-ivory placeholder:text-ivory/40 focus:border-gold/60 focus:outline-none disabled:opacity-50"
                  />
                  <input
                    type="text"
                    value={form.current_location}
                    onChange={(e) => update('current_location', e.target.value)}
                    placeholder="Current location (country / city)"
                    disabled={status === 'submitting'}
                    className="rounded border border-gold/20 bg-midnight/40 px-4 py-3 font-body text-ivory placeholder:text-ivory/40 focus:border-gold/60 focus:outline-none disabled:opacity-50 md:col-span-2"
                  />
                  <textarea
                    rows={5}
                    value={form.description}
                    onChange={(e) => update('description', e.target.value)}
                    placeholder="Brief description, provenance notes, prior authentication, any links"
                    disabled={status === 'submitting'}
                    className="rounded border border-gold/20 bg-midnight/40 px-4 py-3 font-body text-ivory placeholder:text-ivory/40 focus:border-gold/60 focus:outline-none disabled:opacity-50 md:col-span-2"
                  />
                </div>

                {errorMessage && (
                  <p className="mt-6 text-center font-body italic text-sm text-oxblood/80" role="status" aria-live="polite">
                    {errorMessage}
                  </p>
                )}

                <div className="mt-10 text-center space-y-4">
                  <button
                    onClick={handleSubmit}
                    disabled={status === 'submitting'}
                    className="rounded-full border border-gold/50 bg-gold/10 px-10 py-4 font-mono text-[0.7rem] uppercase tracking-[0.32em] text-gold transition-all hover:border-gold hover:bg-gold/20 disabled:opacity-50"
                  >
                    {status === 'submitting' ? 'Submitting…' : 'Submit for Review'}
                  </button>
                  <p className="font-body text-xs italic text-ivory/55">
                    Your submission is received under the gallery&rsquo;s Document Distribution &amp; Non-Disclosure framework.
                  </p>
                </div>

                <div className="mt-12 space-y-3 font-mono text-[0.75rem] uppercase tracking-[0.28em] text-gold/85 text-center">
                  <p>Or contact Richard Triberg directly</p>
                  <p>
                    <a href="mailto:inquires@NVAI.org" className="transition-colors hover:text-ivory">
                      inquires@NVAI.org
                    </a>
                    {' · '}
                    <a href="tel:+14152333131" className="transition-colors hover:text-ivory">
                      +1 415&middot;233&middot;3131
                    </a>
                  </p>
                </div>
              </>
            )}

            <div className="mt-12 flex flex-wrap justify-center gap-8">
              <Link href="/inquire" className="font-mono text-[0.7rem] uppercase tracking-[0.32em] text-gold transition-colors hover:text-ivory">
                Submit a General Inquiry &rarr;
              </Link>
              <Link href="/about" className="font-mono text-[0.7rem] uppercase tracking-[0.32em] text-gold transition-colors hover:text-ivory">
                About the Institut &rarr;
              </Link>
            </div>
          </section>

        </article>

        <footer className="mt-24 text-center font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/40">
          Napa Valley Art Institut &middot; Villa Monticello &middot; Napa, California
        </footer>
      </div>
    </main>
  );
}
