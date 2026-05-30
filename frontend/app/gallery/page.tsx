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

        {/* The rotating featured display — suspended hanging-painting display under
            museum picture lighting. Champagne-in-hand, stop-and-admire-for-5-seconds
            cadence. The painting hangs at centre on a dark gallery wall, lit by a
            picture-light cone from above, with a brass museum placard below. */}
        <section className="mx-auto mt-16 max-w-6xl">
          <Link href={`/piece/${active.slug}`} className="block">
            <article
              className="relative overflow-hidden rounded-lg"
              style={{
                aspectRatio: '16 / 9',
                // Dark gallery wall — warm walnut over deep midnight, with a vertical
                // edge gradient to suggest depth and reflected wood
                background:
                  'radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.18) 0%, transparent 55%), radial-gradient(ellipse at 50% 100%, rgba(60,40,20,0.5) 0%, transparent 65%), linear-gradient(180deg, #0a0805 0%, #1a120a 40%, #0a0805 100%)',
                boxShadow: 'inset 0 0 120px rgba(0,0,0,0.7)',
              }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* Wall texture — subtle warm wood-grain panelling effect */}
              <div
                className="absolute inset-0 opacity-30 mix-blend-soft-light pointer-events-none"
                style={{
                  background:
                    'repeating-linear-gradient(90deg, rgba(212,175,55,0.04) 0px, transparent 4px, rgba(0,0,0,0.04) 8px)',
                }}
              />

              {/* The picture-light cone from above — warm tungsten spill */}
              <div
                className="absolute left-1/2 top-0 -translate-x-1/2 h-1/2 w-2/3 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 0%, rgba(255,210,140,0.45) 0%, rgba(232,200,122,0.18) 30%, transparent 60%)',
                  filter: 'blur(2px)',
                }}
              />

              {/* The brass picture light fixture at the top */}
              <div className="absolute left-1/2 top-4 -translate-x-1/2 z-20">
                <div className="relative">
                  {/* The lamp head */}
                  <div
                    className="h-3 w-28 rounded-full"
                    style={{
                      background:
                        'linear-gradient(180deg, #d4a64a 0%, #8a6020 60%, #4a3008 100%)',
                      boxShadow:
                        '0 4px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,220,150,0.7)',
                    }}
                  />
                  {/* The bulb glow underneath */}
                  <div
                    className="absolute left-1/2 top-2 -translate-x-1/2 h-1.5 w-20 rounded-full"
                    style={{
                      background: 'rgba(255,210,140,0.95)',
                      boxShadow: '0 0 24px rgba(255,210,140,0.9)',
                    }}
                  />
                </div>
              </div>

              {/* The hanging painting — centred under the light, in a gilt frame */}
              <div className="absolute left-1/2 top-[16%] -translate-x-1/2 z-10">
                <div
                  className="relative"
                  style={{
                    // The gilt frame
                    padding: '1.2rem',
                    background:
                      'linear-gradient(135deg, #d4a64a 0%, #8a6020 35%, #b08832 65%, #6a4815 100%)',
                    boxShadow:
                      '0 30px 60px -10px rgba(0,0,0,0.95), 0 0 80px -10px rgba(255,210,140,0.35), inset 0 1px 0 rgba(255,220,150,0.5), inset 0 -1px 0 rgba(40,20,5,0.6)',
                  }}
                >
                  {/* Inner mat / liner */}
                  <div
                    className="overflow-hidden"
                    style={{
                      boxShadow: 'inset 0 0 0 2px rgba(40,25,10,0.9), inset 0 0 12px rgba(0,0,0,0.4)',
                    }}
                  >
                    {active.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={active.slug}
                        src={active.imageUrl}
                        alt={`${active.artist} — ${active.title}`}
                        className="block transition-opacity duration-700"
                        style={{ maxHeight: '22rem', maxWidth: '32rem', height: 'auto', width: 'auto' }}
                      />
                    ) : (
                      // Placeholder canvas — same gallery hang but no image yet
                      <div
                        className="flex flex-col items-center justify-center text-center"
                        style={{
                          width: '24rem',
                          height: '20rem',
                          background:
                            'linear-gradient(160deg, #2a1c12 0%, #1a1208 60%, #0a0605 100%)',
                        }}
                      >
                        <p className="font-mono text-[0.5rem] uppercase tracking-[0.4em] text-gold/55 px-6">
                          Image available
                        </p>
                        <p className="font-mono text-[0.5rem] uppercase tracking-[0.4em] text-gold/55">
                          upon signed agreement
                        </p>
                        <div className="my-6 h-px w-16 bg-gold/30" />
                        <p className="font-didot text-lg tracking-wider text-ivory px-6">{active.title}</p>
                        <p className="mt-1 font-display italic text-xs text-gold/70">{active.artist}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* The brass museum placard underneath */}
              <div className="absolute left-1/2 bottom-6 -translate-x-1/2 z-10 text-center">
                <div
                  className="inline-block px-6 py-2 rounded-sm"
                  style={{
                    background: 'linear-gradient(180deg, rgba(212,175,55,0.18) 0%, rgba(40,30,15,0.7) 100%)',
                    border: '1px solid rgba(232,200,122,0.45)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,220,150,0.3)',
                  }}
                >
                  <p className="font-mono text-[0.5rem] uppercase tracking-[0.4em] text-gold/85">
                    {activeIdx + 1} of {PAINTINGS.length} · Now on view
                  </p>
                  <h2 className="mt-1 font-didot text-lg tracking-wider text-ivory md:text-2xl">
                    {active.title}
                  </h2>
                  <p className="mt-1 font-display italic text-sm text-gold/90">
                    {active.artist} · {active.year} · {active.dimensions}
                  </p>
                </div>
              </div>

              {/* Progress bar at the bottom edge of the wall */}
              {!paused && (
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gold/15">
                  <div
                    key={active.slug}
                    className="h-full bg-gold/70"
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
