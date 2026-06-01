'use client';

import Link from 'next/link';
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
              Good evening. I am Bernard. I walk the chateau with collectors —
              every painting in the collection has its own story, told in my voice,
              waiting at the foot of the staircase.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/foyer/staircase"
                onClick={() => setOpen(false)}
                className="rounded-full border border-gold/50 bg-gold/10 px-8 py-3 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-gold transition-all hover:border-gold hover:bg-gold/20"
              >
                Find Bernard on any painting →
              </Link>
            </div>
            <p className="mt-6 text-center text-[0.6rem] italic text-ivory/50">
              Voice walkthroughs available on every painting page. For sale terms
              or a physical viewing, reach Sean or Richard directly.
            </p>
          </aside>
        </div>
      )}
    </>
  );
}
