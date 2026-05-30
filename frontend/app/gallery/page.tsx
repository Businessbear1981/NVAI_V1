'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PAINTINGS } from '@/lib/paintings';

const GALLERY_BACKDROP =
  'radial-gradient(ellipse at 50% 30%, rgba(232,200,122,0.18) 0%, transparent 55%), linear-gradient(180deg, #0a0807 0%, #14100a 50%, #0a0605 100%)';

// The 60-90 second walkaround video — Higgsfield production pending
const WALKAROUND_VIDEO = '/videos/nvai_gallery_walkaround_90s.mp4';
const WALKAROUND_FALLBACK = '/videos/nvai_garden_path_continuous_5k.mp4';

const ROTATION_INTERVAL_MS = 6500; // ~6.5 seconds per piece, Met-display cadence

export default function GalleryPage() {
  const [walkaroundOn, setWalkaroundOn] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-rotate through the catalogue every 6.5 seconds unless paused
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setActiveIdx((i) => (i + 1) % PAINTINGS.length);
    }, ROTATION_INTERVAL_MS);
    return () => clearInterval(t);
  }, [paused]);

  const active = PAINTINGS[activeIdx];

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
            All {PAINTINGS.length} works. The display rotates one piece every six seconds.
          </p>
        </header>

        {/* The rotating featured display — Met-museum cadence */}
        <section className="mx-auto mt-16 max-w-6xl">
          <Link href={`/piece/${active.slug}`} className="block">
            <article
              className="relative overflow-hidden rounded-lg border border-gold/30"
              style={{ aspectRatio: '16 / 9' }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* Backdrop — the inspiration video of the active piece */}
              <video
                key={active.slug}
                src={active.inspirationVideo}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
              />
              <div className="absolute inset-0 bg-midnight/55" />

              {/* If the painting has its own image, float it on the right */}
              {active.imageUrl && (
                <div className="absolute right-8 top-1/2 hidden -translate-y-1/2 lg:block">
                  <div
                    className="rounded-sm bg-midnight p-3"
                    style={{
                      background:
                        'linear-gradient(145deg, rgba(212,175,55,0.12) 0%, rgba(120,80,30,0.20) 50%, rgba(60,30,10,0.30) 100%)',
                      boxShadow:
                        '0 20px 60px -10px rgba(0,0,0,0.85), inset 0 0 20px rgba(0,0,0,0.4)',
                    }}
                  >
                    <div
                      style={{ boxShadow: 'inset 0 0 0 1px rgba(232,200,122,0.5)' }}
                      className="overflow-hidden rounded-sm"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={active.imageUrl}
                        alt={`${active.artist} — ${active.title}`}
                        className="max-h-[28rem] w-auto"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Overlay text */}
              <div className="absolute inset-0 flex flex-col items-start justify-end p-8 lg:p-12">
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/80">
                  Now on view · {activeIdx + 1} of {PAINTINGS.length}
                </p>
                <h2 className="mt-3 font-didot text-3xl tracking-wider text-ivory drop-shadow-lg md:text-5xl">
                  {active.title}
                </h2>
                <p className="mt-2 font-display text-xl italic tracking-wider text-gold/90">
                  {active.artist} · {active.year}
                </p>
                <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/70">
                  {active.dimensions} · {active.medium}
                </p>
                <p className="mt-6 font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/80 underline-offset-4 group-hover:underline">
                  Enter the piece →
                </p>
              </div>

              {/* Progress bar at the bottom */}
              {!paused && (
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gold/30">
                  <div
                    key={active.slug}
                    className="h-full bg-gold"
                    style={{ animation: `gallery-progress ${ROTATION_INTERVAL_MS}ms linear forwards` }}
                  />
                </div>
              )}
            </article>
          </Link>

          {/* Manual controls */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setActiveIdx((i) => (i - 1 + PAINTINGS.length) % PAINTINGS.length)}
              className="rounded border border-gold/30 bg-midnight/40 px-3 py-1.5 font-mono text-[0.55rem] uppercase tracking-[0.32em] text-ivory/70 hover:border-gold/60 hover:text-gold"
            >
              ← Prev
            </button>
            <button
              onClick={() => setPaused((p) => !p)}
              className="rounded border border-gold/30 bg-midnight/40 px-3 py-1.5 font-mono text-[0.55rem] uppercase tracking-[0.32em] text-ivory/70 hover:border-gold/60 hover:text-gold"
            >
              {paused ? 'Resume rotation' : 'Pause rotation'}
            </button>
            <button
              onClick={() => setActiveIdx((i) => (i + 1) % PAINTINGS.length)}
              className="rounded border border-gold/30 bg-midnight/40 px-3 py-1.5 font-mono text-[0.55rem] uppercase tracking-[0.32em] text-ivory/70 hover:border-gold/60 hover:text-gold"
            >
              Next →
            </button>
          </div>
        </section>

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
          <p className="text-center font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70 mb-6">
            Full catalog · click to jump
          </p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
            {PAINTINGS.map((p, idx) => (
              <Link key={p.slug} href={`/piece/${p.slug}`}>
                <article
                  onMouseEnter={() => setActiveIdx(idx)}
                  className={`marble group relative flex aspect-[3/4] flex-col items-center justify-end overflow-hidden rounded-lg p-3 text-center transition-all duration-700 hover:scale-105 ${
                    activeIdx === idx ? 'ring-2 ring-gold/60' : ''
                  }`}
                >
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

      <style jsx>{`
        @keyframes gallery-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </main>
  );
}
