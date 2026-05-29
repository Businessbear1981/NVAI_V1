'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PAINTINGS } from '@/lib/paintings';

const GALLERY_BACKDROP =
  'radial-gradient(ellipse at 50% 30%, rgba(232,200,122,0.18) 0%, transparent 55%), linear-gradient(180deg, #0a0807 0%, #14100a 50%, #0a0605 100%)';

// The 60-90 second walkaround video — Higgsfield production pending
// When ready, drop the file at /videos/nvai_gallery_walkaround_90s.mp4
const WALKAROUND_VIDEO = '/videos/nvai_gallery_walkaround_90s.mp4';
const WALKAROUND_FALLBACK = '/videos/nvai_garden_path_continuous_5k.mp4';

export default function GalleryPage() {
  const [walkaroundOn, setWalkaroundOn] = useState(false);

  return (
    <main
      className="relative min-h-screen overflow-hidden film-grain"
      style={{ background: GALLERY_BACKDROP }}
    >
      <div className="absolute inset-0 bg-midnight/30 pointer-events-none" />
      <div className="relative z-10 px-8 py-10">
        <Link href="/" className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 hover:text-gold">
          ← Return
        </Link>

        <header className="mx-auto mt-12 max-w-4xl text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
            The Catalog
          </p>
          <h1 className="mt-4 font-didot text-5xl uppercase tracking-[0.12em] text-ivory">
            The Full Gallery
          </h1>
          <div className="mx-auto mt-6 h-px w-24 bg-gold/40" />
          <p className="mt-6 font-body italic tracking-wider text-ivory/75">
            All {PAINTINGS.length} works. Click any to enter the piece with its inspiration video.
          </p>
        </header>

        {/* 60-90 second walkaround */}
        <section className="mx-auto mt-12 max-w-5xl">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setWalkaroundOn((w) => !w)}
              className="rounded-full border border-gold/50 bg-gold/10 px-6 py-3 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-gold transition-all hover:border-gold hover:bg-gold/20"
            >
              {walkaroundOn ? 'Stop the walkaround' : 'Play the 60-90s walkaround'}
            </button>
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/60">
              Fast walk through all {PAINTINGS.length} pieces
            </p>
          </div>
          {walkaroundOn && (
            <div className="mt-6 overflow-hidden rounded-lg border border-gold/30 bg-midnight">
              <video
                src={WALKAROUND_VIDEO}
                onError={(e) => {
                  // Fall back to a placeholder until the production walkaround is generated
                  const t = e.currentTarget;
                  if (t.src !== window.location.origin + WALKAROUND_FALLBACK) t.src = WALKAROUND_FALLBACK;
                }}
                controls
                autoPlay
                className="aspect-video w-full object-cover"
              />
              <p className="px-3 py-2 font-mono text-[0.55rem] uppercase tracking-[0.28em] text-gold/70">
                60-90 second fast walkaround · Higgsfield production pending · shown with placeholder
              </p>
            </div>
          )}
        </section>

        {/* The catalog grid */}
        <section className="mx-auto mt-16 max-w-7xl">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
            {PAINTINGS.map((p) => (
              <Link key={p.slug} href={`/piece/${p.slug}`}>
                <article className="marble group relative flex aspect-[3/4] flex-col items-center justify-end overflow-hidden rounded-lg p-3 text-center transition-all duration-700 hover:scale-105">
                  <div className="relative z-10 space-y-1">
                    <p className="font-mono text-[0.5rem] uppercase tracking-[0.28em] text-gold/80">
                      {p.year}
                    </p>
                    <h3 className="font-display text-sm leading-tight text-ivory">
                      {p.title}
                    </h3>
                    <p className="font-mono text-[0.5rem] uppercase tracking-[0.2em] text-ivory/60">
                      {p.artist}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
