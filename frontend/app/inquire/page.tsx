'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import WingLayout from '@/components/layout/WingLayout';
import { recordInquiry } from '@/lib/api';

const INQUIRE_BACKDROP =
  'radial-gradient(ellipse at 50% 30%, rgba(232,200,122,0.18) 0%, transparent 55%), linear-gradient(180deg, #14100a 0%, #1c160c 40%, #0a0605 100%)';

export default function InquirePage() {
  const params = useSearchParams();
  const paintingSlug = params?.get('painting') || params?.get('wing') || undefined;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [contactPreference, setContactPreference] = useState<'email' | 'phone' | 'either'>('email');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [receiptId, setReceiptId] = useState<string | null>(null);

  async function handleSubmit() {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage('Please enter your name, email, and a brief message.');
      setStatus('error');
      return;
    }
    setStatus('submitting');
    setErrorMessage('');
    try {
      const r = await recordInquiry({
        name: name.trim(),
        email: email.trim(),
        painting_slug: paintingSlug,
        message: message.trim(),
        contact_preference: contactPreference,
      });
      setReceiptId(r.id);
      setStatus('success');
    } catch {
      setErrorMessage('We were unable to send your inquiry. Please try again, or email inquires@NVAI.org directly.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <WingLayout
        back={{ href: '/', label: 'Return' }}
        eyebrow="Received"
        title="Thank you"
        subtitle="Bernard has your message"
        caption="A founder will respond within one business day."
        backdrop={INQUIRE_BACKDROP}
        videoSrc="https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_foyer_aerial_static.mp4"
      >
        <div className="mx-auto max-w-xl text-center space-y-6">
          <div className="mx-auto h-px w-24 bg-gold/40" />
          <p className="font-body italic text-ivory/85">
            Your inquiry has been recorded. {paintingSlug ? `It is filed under the work you were viewing.` : ''}
            {' '}A response will arrive by email at <span className="text-gold">{email}</span>.
          </p>
          {receiptId && (
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/55">
              Confirmation · {receiptId.slice(0, 8)}
            </p>
          )}
          <p className="font-body text-xs italic text-ivory/55">
            For an immediate concierge call: +1 415 · 233 · 3131
          </p>
        </div>
      </WingLayout>
    );
  }

  return (
    <WingLayout
      back={{ href: '/', label: 'Return' }}
      eyebrow="Essentials"
      title="Inquire"
      subtitle="Through Bernard"
      caption="Tell us what you are looking for. Bernard routes to Sean or Richard for material questions."
      backdrop={INQUIRE_BACKDROP}
      videoSrc="https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_foyer_aerial_static.mp4"
    >
      <div className="mx-auto max-w-2xl space-y-6">
        {paintingSlug && (
          <p className="text-center font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">
            Inquiry filed against · {paintingSlug.replace(/-/g, ' ')}
          </p>
        )}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          disabled={status === 'submitting'}
          className="w-full rounded border border-gold/20 bg-midnight/40 px-4 py-3 font-body text-ivory placeholder:text-ivory/40 focus:border-gold/60 focus:outline-none disabled:opacity-50"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          disabled={status === 'submitting'}
          className="w-full rounded border border-gold/20 bg-midnight/40 px-4 py-3 font-body text-ivory placeholder:text-ivory/40 focus:border-gold/60 focus:outline-none disabled:opacity-50"
        />
        <textarea
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What are you looking for?"
          disabled={status === 'submitting'}
          className="w-full rounded border border-gold/20 bg-midnight/40 px-4 py-3 font-body text-ivory placeholder:text-ivory/40 focus:border-gold/60 focus:outline-none disabled:opacity-50"
        />
        <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-[0.55rem] uppercase tracking-[0.32em] text-ivory/65">
          <span>Preferred contact:</span>
          {(['email', 'phone', 'either'] as const).map((pref) => (
            <label key={pref} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="contact-pref"
                value={pref}
                checked={contactPreference === pref}
                onChange={() => setContactPreference(pref)}
                disabled={status === 'submitting'}
                className="accent-gold"
              />
              {pref}
            </label>
          ))}
        </div>
        {errorMessage && (
          <p className="text-center font-body italic text-sm text-oxblood/80" role="status" aria-live="polite">
            {errorMessage}
          </p>
        )}
        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={status === 'submitting'}
            className="rounded-full border border-gold/50 bg-gold/10 px-8 py-3 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-gold transition-all hover:border-gold hover:bg-gold/20 disabled:opacity-50"
          >
            {status === 'submitting' ? 'Sending…' : 'Send to Bernard'}
          </button>
        </div>
        <p className="text-center text-xs italic text-ivory/50">
          Factual responses (status, document delivery) auto-send. Material correspondence
          queues for founder approval first.
        </p>
      </div>
    </WingLayout>
  );
}
