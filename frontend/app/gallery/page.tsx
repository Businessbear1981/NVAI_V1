'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PAINTINGS } from '@/lib/paintings';

const GALLERY_BACKDROP =
  'radial-gradient(ellipse at 50% 30%, rgba(232,200,122,0.18) 0%, transparent 55%), linear-gradient(180deg, #0a0807 0%, #14100a 50%, #0a0605 100%)';

const WALKAROUND_VIDEO = 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_gallery_walkaround_90s.mp4';
const WALKAROUND_FALLBACK = 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_garden_path_continuous_5k.mp4';

const N = PAINTINGS.length;
const STEP_MS = 4200;
const CARD_W = 155;
const CARD_H = 196;
// Coverflow geometry
const SIDE_ANGLE = 58;   // deg — how far flanking cards are rotated
const SIDE_STEP  = 145;  // px — horizontal gap between each flanking card
const CENTER_POP = 170;  // px — how far the front card pops toward viewer
const VISIBLE    = 4;    // cards shown each side of center (so 9 total)

/** Compute transform + style for a card at `offset` positions from active */
function coverStyle(offset: number): React.CSSProperties {
  const abs = Math.abs(offset);
  if (abs > VISIBLE) return { opacity: 0, pointerEvents: 'none' };

  if (offset === 0) {
    return {
      transform: `translateX(-50%) translateY(-50%) translateZ(${CENTER_POP}px) rotateY(0deg)`,
      opacity: 1,
      zIndex: 100,
      pointerEvents: 'auto',
    };
  }

  const sign  = offset > 0 ? 1 : -1;
  const tx    = sign * (SIDE_STEP * abs + 30); // first flanker closer, then spread
  const ry    = sign * -SIDE_ANGLE;            // right cards lean left, left lean right
  const tz    = -(abs * 35);                   // each step recedes a little more
  const scale = Math.max(0.72, 1 - abs * 0.06);
  const op    = Math.max(0, 1 - abs * 0.21);

  return {
    transform: `translateX(calc(-50% + ${tx}px)) translateY(-50%) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`,
    opacity: op,
    zIndex: 100 - abs * 10,
    pointerEvents: op > 0.35 ? 'auto' : 'none',
  };
}

export default function GalleryPage() {
  const [walkaroundOn, setWalkaroundOn] = useState(false);
  const [activeIdx,    setActiveIdx   ] = useState(0);
  const [beltPaused,   setBeltPaused  ] = useState(false);
  const [featured,     setFeatured    ] = useState(PAINTINGS[0]);

  function go(delta: number) {
    setActiveIdx((i) => {
      const next = ((i + delta) % N + N) % N;
      setFeatured(PAINTINGS[next]);
      return next;
    });
  }

  function pickPainting(idx: number) {
    setActiveIdx(idx);
    setFeatured(PAINTINGS[idx]);
  }

  useEffect(() => {
    if (beltPaused) return;
    const t = setInterval(() => go(1), STEP_MS);
    return () => clearInterval(t);
  }, [beltPaused]); // eslint-disable-line react-hooks/exhaustive-deps

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
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">The Collection</p>
          <h1 className="mt-4 font-didot text-5xl uppercase tracking-[0.12em] text-ivory">The Full Gallery</h1>
          <div className="mx-auto mt-6 h-px w-24 bg-gold/40" />
          <p className="mt-6 font-body italic tracking-wider text-ivory/75">
            All {N} works. Center canvas pops forward — flanking works show their 3D edge.
          </p>
        </header>

        {/* ── COVERFLOW BELT ──────────────────────────────────────────────── */}
        <section className="mx-auto mt-14 max-w-5xl">

          {/* Stage: single perspective on the container so every card
              shares the same vanishing point — this is what creates the
              negative space / depth gap between center and flankers. */}
          <div
            className="relative overflow-hidden"
            style={{
              height: '360px',
              perspective: '950px',
              perspectiveOrigin: '50% 52%',
            }}
            onMouseEnter={() => setBeltPaused(true)}
            onMouseLeave={() => setBeltPaused(false)}
          >
            {/* Wing fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-20"
              style={{ background: 'linear-gradient(to right, #0a0807 0%, transparent 100%)' }} />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-20"
              style={{ background: 'linear-gradient(to left, #0a0807 0%, transparent 100%)' }} />

            {/* 3D card field — preserve-3d so cards share depth space */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: 0,
                height: 0,
                transformStyle: 'preserve-3d',
              }}
            >
              {PAINTINGS.map((p, idx) => {
                let offset = ((idx - activeIdx) % N + N) % N;
                if (offset > N / 2) offset -= N; // [-N/2, N/2]

                const cs = coverStyle(offset);
                if (!cs.transform) return null;

                const isActive = idx === activeIdx;

                return (
                  <button
                    key={p.slug}
                    onClick={() => pickPainting(idx)}
                    aria-label={`${p.artist} — ${p.title}`}
                    style={{
                      position: 'absolute',
                      width:  `${CARD_W}px`,
                      height: `${CARD_H}px`,
                      transition: 'transform 0.95s cubic-bezier(0.4,0,0.2,1), opacity 0.75s ease',
                      ...cs,
                    }}
                  >
                    {/* Gilt frame */}
                    <div
                      className={`h-full w-full overflow-hidden rounded-sm ${
                        isActive
                          ? 'ring-2 ring-gold shadow-[0_0_36px_rgba(212,175,55,0.7)]'
                          : 'ring-1 ring-gold/25'
                      }`}
                      style={{
                        background: 'linear-gradient(135deg, #c4983a 0%, #7a5018 50%, #b08832 100%)',
                        padding: '3px',
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
                          <p className="px-2 font-didot text-[0.5rem] leading-tight tracking-wider text-ivory/85">
                            {p.title}
                          </p>
                          <p className="mt-1 font-mono text-[0.4rem] uppercase tracking-[0.18em] text-gold/65">
                            {p.artist.split(' ').slice(-1)[0]}
                          </p>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Floor fade */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 z-10"
              style={{ background: 'linear-gradient(to top, rgba(10,8,7,0.92), transparent)' }} />
          </div>

          {/* Controls */}
          <div className="mt-7 flex items-center justify-center gap-3">
            <button onClick={() => go(-1)}
              className="rounded border border-gold/30 bg-midnight/40 px-3 py-1.5 font-mono text-[0.55rem] uppercase tracking-[0.32em] text-ivory/70 hover:border-gold/60 hover:text-gold">
              ← Prev
            </button>
            <button onClick={() => setBeltPaused((p) => !p)}
              className="rounded border border-gold/30 bg-midnight/40 px-4 py-1.5 font-mono text-[0.55rem] uppercase tracking-[0.32em] text-ivory/70 hover:border-gold/60 hover:text-gold">
              {beltPaused ? 'Resume' : 'Pause'}
            </button>
            <button onClick={() => go(1)}
              className="rounded border border-gold/30 bg-midnight/40 px-3 py-1.5 font-mono text-[0.55rem] uppercase tracking-[0.32em] text-ivory/70 hover:border-gold/60 hover:text-gold">
              Next →
            </button>
          </div>
        </section>

        {/* ── FEATURED DISPLAY ──────────────────────────────────────────────── */}
        <section className="mx-auto mt-16 max-w-6xl">
          <Link href={`/piece/${featured.slug}`} className="block">
            <article
              className="relative overflow-hidden rounded-lg"
              style={{
                aspectRatio: '16 / 9',
                background:
                  'radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.18) 0%, transparent 55%), radial-gradient(ellipse at 50% 100%, rgba(60,40,20,0.5) 0%, transparent 65%), linear-gradient(180deg, #0a0805 0%, #1a120a 40%, #0a0805 100%)',
                boxShadow: 'inset 0 0 120px rgba(0,0,0,0.7)',
              }}
            >
              <div className="absolute inset-0 opacity-30 mix-blend-soft-light pointer-events-none"
                style={{ background: 'repeating-linear-gradient(90deg, rgba(212,175,55,0.04) 0px, transparent 4px, rgba(0,0,0,0.04) 8px)' }} />
              <div className="absolute left-1/2 top-0 -translate-x-1/2 h-1/2 w-2/3 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,210,140,0.45) 0%, rgba(232,200,122,0.18) 30%, transparent 60%)', filter: 'blur(2px)' }} />
              <div className="absolute left-1/2 top-4 -translate-x-1/2 z-20">
                <div className="relative">
                  <div className="h-3 w-28 rounded-full"
                    style={{ background: 'linear-gradient(180deg, #d4a64a 0%, #8a6020 60%, #4a3008 100%)', boxShadow: '0 4px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,220,150,0.7)' }} />
                  <div className="absolute left-1/2 top-2 -translate-x-1/2 h-1.5 w-20 rounded-full"
                    style={{ background: 'rgba(255,210,140,0.95)', boxShadow: '0 0 24px rgba(255,210,140,0.9)' }} />
                </div>
              </div>
              <div className="absolute left-1/2 top-[16%] -translate-x-1/2 z-10">
                <div className="relative" style={{ padding: '1.2rem', background: 'linear-gradient(135deg, #d4a64a 0%, #8a6020 35%, #b08832 65%, #6a4815 100%)', boxShadow: '0 30px 60px -10px rgba(0,0,0,0.95), 0 0 80px -10px rgba(255,210,140,0.35), inset 0 1px 0 rgba(255,220,150,0.5), inset 0 -1px 0 rgba(40,20,5,0.6)' }}>
                  <div className="overflow-hidden" style={{ boxShadow: 'inset 0 0 0 2px rgba(40,25,10,0.9), inset 0 0 12px rgba(0,0,0,0.4)' }}>
                    {featured.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={featured.slug} src={featured.imageUrl} alt={`${featured.artist} — ${featured.title}`}
                        className="block transition-opacity duration-700"
                        style={{ maxHeight: '22rem', maxWidth: '32rem', height: 'auto', width: 'auto' }} />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center"
                        style={{ width: '24rem', height: '20rem', background: 'linear-gradient(160deg, #2a1c12 0%, #1a1208 60%, #0a0605 100%)' }}>
                        <p className="font-mono text-[0.5rem] uppercase tracking-[0.4em] text-gold/55 px-6">Image available</p>
                        <p className="font-mono text-[0.5rem] uppercase tracking-[0.4em] text-gold/55">upon signed agreement</p>
                        <div className="my-6 h-px w-16 bg-gold/30" />
                        <p className="font-didot text-lg tracking-wider text-ivory px-6">{featured.title}</p>
                        <p className="mt-1 font-display italic text-xs text-gold/70">{featured.artist}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="absolute left-1/2 bottom-6 -translate-x-1/2 z-10 text-center">
                <div className="inline-block px-6 py-2 rounded-sm"
                  style={{ background: 'linear-gradient(180deg, rgba(212,175,55,0.18) 0%, rgba(40,30,15,0.7) 100%)', border: '1px solid rgba(232,200,122,0.45)', boxShadow: '0 4px 12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,220,150,0.3)' }}>
                  <p className="font-mono text-[0.5rem] uppercase tracking-[0.4em] text-gold/85">
                    {activeIdx + 1} of {N} · Now on view
                  </p>
                  <h2 className="mt-1 font-didot text-lg tracking-wider text-ivory md:text-2xl">{featured.title}</h2>
                  <p className="mt-1 font-display italic text-sm text-gold/90">
                    {featured.artist} · {featured.year} · {featured.dimensions}
                  </p>
                </div>
              </div>
            </article>
          </Link>
        </section>

        {/* ── WALKAROUND ────────────────────────────────────────────────────── */}
        <section className="mx-auto mt-12 max-w-5xl">
          <div className="flex items-center justify-center gap-4">
            <button onClick={() => setWalkaroundOn((w) => !w)}
              className="rounded-full border border-gold/50 bg-gold/10 px-6 py-3 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-gold transition-all hover:border-gold hover:bg-gold/20">
              {walkaroundOn ? 'Stop the walkaround' : 'Play the 60-90s walkaround'}
            </button>
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/60">
              Fast walk through all {N} pieces
            </p>
          </div>
          {walkaroundOn && (
            <div className="mt-6 overflow-hidden rounded-lg border border-gold/30 bg-midnight">
              <video preload="metadata" src={WALKAROUND_VIDEO}
                onError={(e) => { const t = e.currentTarget; if (t.src !== window.location.origin + WALKAROUND_FALLBACK) t.src = WALKAROUND_FALLBACK; }}
                controls autoPlay muted playsInline className="aspect-video w-full object-cover" />
              <p className="px-3 py-2 font-mono text-[0.55rem] uppercase tracking-[0.28em] text-gold/70">
                60-90 second fast walkaround · Higgsfield production pending
              </p>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
