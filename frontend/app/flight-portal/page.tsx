'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { VIDEOS } from '@/lib/videoMap';

// Da Vinci workshop portal — plays the candlelit workshop short, then reveals
// the Day / Night flight selection.

function SunIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="24" cy="24" r="7" />
      <line x1="24" y1="4"  x2="24" y2="10" />
      <line x1="24" y1="38" x2="24" y2="44" />
      <line x1="4"  y1="24" x2="10" y2="24" />
      <line x1="38" y1="24" x2="44" y2="24" />
      <line x1="9"  y1="9"  x2="13" y2="13" />
      <line x1="35" y1="35" x2="39" y2="39" />
      <line x1="39" y1="9"  x2="35" y2="13" />
      <line x1="13" y1="35" x2="9"  y2="39" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round">
      <path d="M30 8 C18 8, 10 16, 10 26 C10 36, 18 44, 28 44 C36 44, 43 38, 44 30 C38 34, 30 30, 28 22 C26 14, 28 10, 30 8Z" />
    </svg>
  );
}

export default function FlightPortalPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<'video' | 'select'>('video');

  const WORKSHOP_SRC = VIDEOS.davinciWorkshopPortal;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  }, []);

  function advance() {
    setPhase('select');
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black film-grain">
      {/* Workshop video — plays once, then the selection fades in */}
      <video
        ref={videoRef}
        src={WORKSHOP_SRC}
        muted
        playsInline
        preload="auto"
        onEnded={advance}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms] ${
          phase === 'select' ? 'opacity-30' : 'opacity-100'
        }`}
      />

      {/* Cinematic vignette — always present */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 65% at 50% 50%, transparent 0%, transparent 55%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* ── Phase 1: VIDEO — skip control ─────────────────────────────────── */}
      {phase === 'video' && (
        <div className="absolute inset-0 z-10 flex flex-col justify-between px-8 py-8 pointer-events-none">
          {/* Back link */}
          <div className="flex justify-between pointer-events-auto">
            <Link
              href="/foyer/staircase"
              className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-ivory/60 transition-colors hover:text-gold"
            >
              ← Staircase
            </Link>
            <button
              onClick={advance}
              className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-ivory/55 transition-colors hover:text-gold"
            >
              Skip →
            </button>
          </div>

          {/* Eyebrow caption — bottom */}
          <div className="text-center pointer-events-none">
            <p
              className="font-display italic tracking-wider text-ivory/70 drop-shadow-lg"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}
            >
              Leonardo da Vinci · Milan · 1490
            </p>
          </div>
        </div>
      )}

      {/* ── Phase 2: DAY / NIGHT SELECTION ────────────────────────────────── */}
      {phase === 'select' && (
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 transition-opacity duration-[1200ms]"
          style={{ opacity: phase === 'select' ? 1 : 0 }}
        >
          {/* Back link */}
          <div className="absolute left-8 top-8">
            <Link
              href="/foyer/staircase"
              className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-ivory/55 transition-colors hover:text-gold"
            >
              ← Staircase
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-10 text-center">
            <p className="font-mono text-[0.5rem] uppercase tracking-[0.5em] text-gold/70">
              Da Vinci · Flight Experiences
            </p>
            <h1
              className="mt-4 font-didot text-5xl uppercase tracking-[0.18em] text-ivory drop-shadow-lg md:text-6xl"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.9)' }}
            >
              Choose Your Flight
            </h1>
            <div className="mx-auto mt-5 h-px w-16 bg-gold/40" />
          </div>

          {/* Two panels */}
          <div className="flex w-full max-w-4xl flex-col gap-5 md:flex-row">

            {/* DAY — Napa Valley Ornithopter */}
            <Link
              href="/flight"
              className="group flex-1"
              aria-label="Day flight — Napa Valley Ornithopter"
            >
              <div
                className="rounded-sm border border-gold/20 px-7 py-8 text-center transition-all duration-500 group-hover:border-gold/55 group-hover:bg-white/5 md:py-12"
                style={{
                  background: 'rgba(255,240,180,0.06)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
              >
                <div className="mx-auto mb-5 flex justify-center opacity-75 group-hover:opacity-100 transition-opacity">
                  <SunIcon />
                </div>
                <p className="font-mono text-[0.45rem] uppercase tracking-[0.45em] text-gold/60 group-hover:text-gold/90">
                  Day Flight
                </p>
                <h2 className="mt-3 font-didot text-3xl uppercase tracking-[0.14em] text-ivory group-hover:text-ivory md:text-4xl">
                  Napa Valley
                </h2>
                <p className="mt-1 font-mono text-[0.42rem] uppercase tracking-[0.3em] text-gold/45">
                  The Ornithopter
                </p>
                <div className="mx-auto mt-4 h-px w-10 bg-gold/25 transition-all duration-500 group-hover:w-16 group-hover:bg-gold/50" />
                <p className="mt-4 font-body text-xs italic leading-relaxed text-ivory/60 group-hover:text-ivory/80">
                  Slow. Contemplative. Takeoff from the balcony, the valley
                  opens, the banking turn over cypress and vines, the descent.
                  Leonardo&apos;s dream — finally airborne.
                </p>
                <p className="mt-5 font-mono text-[0.52rem] uppercase tracking-[0.36em] text-gold/70 group-hover:text-gold">
                  Launch →
                </p>
              </div>
            </Link>

            {/* NIGHT — Bay Grand Circuit */}
            <Link
              href="/bay-flight"
              className="group flex-1"
              aria-label="Night flight — Bay Grand Circuit"
            >
              <div
                className="rounded-sm border border-gold/25 px-7 py-8 text-center transition-all duration-500 group-hover:border-gold/65 group-hover:bg-white/5 md:py-12"
                style={{
                  background: 'rgba(10,8,20,0.25)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
              >
                <div className="mx-auto mb-5 flex justify-center opacity-75 group-hover:opacity-100 transition-opacity">
                  <MoonIcon />
                </div>
                <p className="font-mono text-[0.45rem] uppercase tracking-[0.45em] text-gold/60 group-hover:text-gold/90">
                  Night Flight
                </p>
                <h2 className="mt-3 font-didot text-3xl uppercase tracking-[0.14em] text-ivory group-hover:text-ivory md:text-4xl">
                  The Bay
                </h2>
                <p className="mt-1 font-mono text-[0.42rem] uppercase tracking-[0.3em] text-gold/45">
                  Grand Circuit · Wingsuit
                </p>
                <div className="mx-auto mt-4 h-px w-10 bg-gold/25 transition-all duration-500 group-hover:w-16 group-hover:bg-gold/50" />
                <p className="mt-4 font-body text-xs italic leading-relaxed text-ivory/60 group-hover:text-ivory/80">
                  Fast. Angel Island. The Golden Gate. Alcatraz. The Bay Bridge
                  apex — click, click — then the drop to Powerplant Park,
                  electric green and violet.
                </p>
                <p className="mt-5 font-mono text-[0.52rem] uppercase tracking-[0.36em] text-gold/70 group-hover:text-gold">
                  Launch →
                </p>
              </div>
            </Link>

          </div>
        </div>
      )}
    </main>
  );
}
