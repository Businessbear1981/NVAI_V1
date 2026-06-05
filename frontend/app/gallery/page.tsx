'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PAINTINGS } from '@/lib/paintings';

const GALLERY_BACKDROP =
  'radial-gradient(ellipse at 50% 30%, rgba(232,200,122,0.18) 0%, transparent 55%), linear-gradient(180deg, #0a0807 0%, #14100a 50%, #0a0605 100%)';

const WALKAROUND_VIDEO = 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_gallery_walkaround_90s.mp4';
const WALKAROUND_FALLBACK = 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_garden_path_continuous_5k.mp4';

const ROTATION_INTERVAL_MS = 6500;
const ORBIT_DURATION = 90; // seconds per full orbit

export default function GalleryPage() {
  const [walkaroundOn, setWalkaroundOn] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [orbitPaused, setOrbitPaused] = useState(false);

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

        {/* Orbital carousel */}
        <section className="mx-auto mt-12 max-w-6xl">
          <p className="text-center font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70 mb-2">
            The circular catalog
          </p>
          <p className="text-center font-display text-sm italic tracking-wider text-gold/70 mb-8">
            All {PAINTINGS.length} works orbit. Click any to bring it to centre.
          </p>

          <div
            className="relative mx-auto"
            style={{
              width: 'min(92vw, 92vh, 880px)',
              aspectRatio: '1 / 1',
            }}
            onMouseEnter={() => setOrbitPaused(true)}
            onMouseLeave={() => setOrbitPaused(false)}
          >
            {/* Rotating ring — holds all thumbnails */}
            <div
              className={`orbit-ring absolute inset-0${orbitPaused ? ' orbit-paused' : ''}`}
            >
              {PAINTINGS.map((p, idx) => {
                const ORBIT_RADIUS = 38;
                const angleDeg = (360 / PAINTINGS.length) * idx - 90;
                const angleRad = (angleDeg * Math.PI) / 180;
                const cx = 50 + ORBIT_RADIUS * Math.cos(angleRad);
                const cy = 50 + ORBIT_RADIUS * Math.sin(angleRad);
                const isActive = activeIdx === idx;
                const isHovered = hoveredIdx === idx;
                const scale = isActive ? 1.22 : isHovered ? 1.1 : 1;
                return (
                  <button
                    key={p.slug}
                    onClick={() => setActiveIdx(idx)}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className={`orbit-thumb absolute${orbitPaused ? ' orbit-paused' : ''} ${isActive ? 'z-30' : 'z-10'}`}
                    style={{
                      left: `${cx}%`,
                      top: `${cy}%`,
                      width: '14%',
                      aspectRatio: '3 / 4',
                    }}
                    aria-label={`${p.artist} — ${p.title}`}
                  >
                    <div
                      className={`relative h-full w-full overflow-hidden rounded-sm shadow-lg ${
                        isActive
                          ? 'ring-2 ring-gold ring-offset-2 ring-offset-midnight shadow-[0_8px_28px_rgba(212,175,55,0.5)]'
                          : isHovered
                          ? 'ring-1 ring-gold/60'
                          : 'ring-1 ring-gold/20'
                      }`}
                      style={{
                        background: 'linear-gradient(135deg, #b08832 0%, #6a4815 100%)',
                        padding: '2px',
                        transform: `scale(${scale})`,
                        transition: 'transform 0.3s',
                      }}
                    >
                      {p.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.imageUrl} alt={p.title} className="h-full w-full object-cover" />
                      ) : (
                        <div
                          className="flex h-full w-full flex-col items-center justify-center text-center"
                          style={{ background: 'linear-gradient(160deg, #2a1c12 0%, #0a0605 100%)' }}
                        >
                          <p className="px-1 font-didot text-[0.55rem] leading-tight tracking-wider text-ivory/85">
                            {p.title}
                          </p>
                          <p className="mt-1 font-mono text-[0.45rem] uppercase tracking-[0.18em] text-gold/65">
                            {p.artist.split(' ').slice(-1)[0]}
                          </p>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Gold glow at centre */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div
                className="rounded-full"
                style={{
                  width: '22%',
                  aspectRatio: '1',
                  background: 'radial-gradient(circle, rgba(232,200,122,0.30) 0%, transparent 70%)',
                  filter: 'blur(10px)',
                }}
              />
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.4em] text-gold/70">
                The Catalog
              </p>
              <p className="mt-2 font-didot text-4xl uppercase tracking-[0.18em] text-ivory">
                {PAINTINGS.length}
              </p>
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/55">
                works
              </p>
            </div>
          </div>

          <p className="mt-6 text-center font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/45">
            Hover to pause the orbit · click any work to feature it below
          </p>
        </section>

        {/* Featured display */}
        <section className="mx-auto mt-16 max-w-6xl">
          <Link href={`/piece/${active.slug}`} className="block">
            <article
              className="relative overflow-hidden rounded-lg"
              style={{
                aspectRatio: '16 / 9',
                background:
                  'radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.18) 0%, transparent 55%), radial-gradient(ellipse at 50% 100%, rgba(60,40,20,0.5) 0%, transparent 65%), linear-gradient(180deg, #0a0805 0%, #1a120a 40%, #0a0805 100%)',
                boxShadow: 'inset 0 0 120px rgba(0,0,0,0.7)',
              }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* Wall texture */}
              <div
                className="absolute inset-0 opacity-30 mix-blend-soft-light pointer-events-none"
                style={{
                  background:
                    'repeating-linear-gradient(90deg, rgba(212,175,55,0.04) 0px, transparent 4px, rgba(0,0,0,0.04) 8px)',
                }}
              />

              {/* Picture-light cone */}
              <div
                className="absolute left-1/2 top-0 -translate-x-1/2 h-1/2 w-2/3 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 0%, rgba(255,210,140,0.45) 0%, rgba(232,200,122,0.18) 30%, transparent 60%)',
                  filter: 'blur(2px)',
                }}
              />

              {/* Brass picture-light fixture */}
              <div className="absolute left-1/2 top-4 -translate-x-1/2 z-20">
                <div className="relative">
                  <div
                    className="h-3 w-28 rounded-full"
                    style={{
                      background:
                        'linear-gradient(180deg, #d4a64a 0%, #8a6020 60%, #4a3008 100%)',
                      boxShadow:
                        '0 4px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,220,150,0.7)',
                    }}
                  />
                  <div
                    className="absolute left-1/2 top-2 -translate-x-1/2 h-1.5 w-20 rounded-full"
                    style={{
                      background: 'rgba(255,210,140,0.95)',
                      boxShadow: '0 0 24px rgba(255,210,140,0.9)',
                    }}
                  />
                </div>
              </div>

              {/* Hanging painting in gilt frame */}
              <div className="absolute left-1/2 top-[16%] -translate-x-1/2 z-10">
                <div
                  className="relative"
                  style={{
                    padding: '1.2rem',
                    background:
                      'linear-gradient(135deg, #d4a64a 0%, #8a6020 35%, #b08832 65%, #6a4815 100%)',
                    boxShadow:
                      '0 30px 60px -10px rgba(0,0,0,0.95), 0 0 80px -10px rgba(255,210,140,0.35), inset 0 1px 0 rgba(255,220,150,0.5), inset 0 -1px 0 rgba(40,20,5,0.6)',
                  }}
                >
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

              {/* Museum placard */}
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

              {/* Progress bar */}
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
                preload="metadata"
                src={WALKAROUND_VIDEO}
                onError={(e) => {
                  const t = e.currentTarget;
                  if (t.src !== window.location.origin + WALKAROUND_FALLBACK) t.src = WALKAROUND_FALLBACK;
                }}
                controls
                autoPlay
                muted
                playsInline
                className="aspect-video w-full object-cover"
              />
              <p className="px-3 py-2 font-mono text-[0.55rem] uppercase tracking-[0.28em] text-gold/70">
                60-90 second fast walkaround · Higgsfield production pending · shown with placeholder
              </p>
            </div>
          )}
        </section>
      </div>

      <style jsx>{`
        .orbit-ring {
          animation: orbit-rotate ${ORBIT_DURATION}s linear infinite;
          transform-origin: 50% 50%;
        }
        .orbit-thumb {
          animation: counter-rotate ${ORBIT_DURATION}s linear infinite;
        }
        .orbit-paused {
          animation-play-state: paused !important;
        }
        @keyframes orbit-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes counter-rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        @keyframes gallery-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </main>
  );
}
