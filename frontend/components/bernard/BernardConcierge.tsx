'use client';

import { useState } from 'react';

export default function BernardConcierge() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Bernard mark — bottom-right corner, restrained */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Bernard concierge"
        className="fixed bottom-20 right-6 z-40 h-12 w-12 rounded-full border border-gold/40 bg-midnight/70 backdrop-blur font-mono text-[0.55rem] uppercase tracking-[0.2em] text-gold transition-all hover:border-gold hover:bg-gold/15"
      >
        B
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-end bg-midnight/60 backdrop-blur-sm p-6"
          onClick={() => setOpen(false)}
        >
          <aside
            className="w-full max-w-md rounded-lg border border-gold/30 bg-midnight/95 p-6 shadow-2xl"
            style={{ background: 'linear-gradient(180deg, #14100a 0%, #1c160c 100%)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">
                  Concierge
                </p>
                <h3 className="mt-1 font-display text-2xl text-ivory">Bernard</h3>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="font-mono text-[0.7rem] uppercase tracking-wider text-ivory/60 hover:text-gold"
              >
                Close
              </button>
            </div>
            <div className="mt-4 h-px w-12 bg-gold/40" />
            <p className="mt-6 font-body italic text-sm text-ivory/80 leading-relaxed">
              Good evening. I am Bernard. I can answer questions about any piece in the
              collection, schedule a physical viewing at one of the storage locations,
              connect you with Sean or Richard for sale terms, or simply walk the chateau
              with you.
            </p>
            <textarea
              placeholder="Tell me what you are looking for…"
              rows={3}
              className="mt-6 w-full rounded border border-gold/20 bg-midnight/60 px-4 py-3 font-body text-sm text-ivory placeholder:text-ivory/40 focus:border-gold/60 focus:outline-none"
            />
            <div className="mt-4 flex items-center justify-between">
              <button className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-ivory/70 hover:text-gold">
                ◉ Voice
              </button>
              <button className="rounded-full border border-gold/50 bg-gold/10 px-6 py-2 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-gold transition-all hover:border-gold hover:bg-gold/20">
                Send →
              </button>
            </div>
            <p className="mt-4 text-center text-[0.6rem] italic text-ivory/50">
              Claude + ElevenLabs wiring in progress. All material correspondence
              routes to Sean or Richard for approval before sending.
            </p>
          </aside>
        </div>
      )}
    </>
  );
}
