'use client';

/**
 * Bay Grand Circuit — Da Vinci wingsuit at night.
 * 11 beats × 15s ≈ 2.75 minutes.
 *
 * Route: Chateau → Angel Island → Golden Gate → Presidio/Crissy Fields →
 *        Pier 39 → Alcatraz → Bay Bridge climb → Bay Bridge apex (full SF panorama) →
 *        drop to Powerplant Park (Point Richmond) → Carquinez home
 */

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { VIDEOS } from '@/lib/videoMap';

const BEATS = [
  {
    key: 'departure',
    src: VIDEOS.bayFlight.departure,
    caption: 'The workshop falls away. Wings spread into the dark.',
  },
  {
    key: 'bayApproach',
    src: VIDEOS.bayFlight.bayApproach,
    caption: 'The Bay opens. Ten thousand lights below.',
  },
  {
    key: 'angelIsland',
    src: VIDEOS.bayFlight.angelIsland,
    caption: 'Angel Island. Banking hard. The city a smear of gold to the south.',
  },
  {
    key: 'goldenGate',
    src: VIDEOS.bayFlight.goldenGate,
    caption: 'Gradual left. The Gate appears — towers burning orange against the black.',
  },
  {
    key: 'straitDrop',
    src: VIDEOS.bayFlight.straitDrop,
    caption: 'Nose down. The Strait rushing up. Cables blur overhead.',
  },
  {
    key: 'crissyPier',
    src: VIDEOS.bayFlight.crissyPier,
    caption: 'Right side — Crissy Fields. The wharf lights. The cold Pacific smell.',
  },
  {
    key: 'alcatraz',
    src: VIDEOS.bayFlight.alcatraz,
    caption: 'Look left. Alcatraz. Cold stone. Black water.',
  },
  {
    key: 'bridgeClimb',
    src: VIDEOS.bayFlight.bridgeClimb,
    caption: 'The Bay Bridge. Climbing. Click. Click. Click.',
  },
  {
    key: 'bridgeApex',
    src: VIDEOS.bayFlight.bridgeApex,
    caption: 'Full apex. San Francisco lit behind you. The camera turns. You are here.',
  },
  {
    key: 'powerparkFlyby',
    src: VIDEOS.bayFlight.powerparkFlyby,
    caption: 'Drop. The Powerplant bursts — green, violet, electric. Point Richmond alive.',
  },
  {
    key: 'carquinezHome',
    src: VIDEOS.bayFlight.carquinezHome,
    caption: 'Carquinez below. Napa Valley dark ahead. The chateau lights are waiting.',
  },
] as const;

export default function BayFlightPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const preloadRef = useRef<HTMLVideoElement>(null);
  const [beatIndex, setBeatIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [flightCount, setFlightCount] = useState(0);

  const beat = BEATS[beatIndex];
  const nextBeat = beatIndex < BEATS.length - 1 ? BEATS[beatIndex + 1] : null;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  }, [beatIndex]);

  // Preload next clip while current plays — eliminates gap between beats
  useEffect(() => {
    const p = preloadRef.current;
    if (!p || !nextBeat) return;
    p.src = nextBeat.src;
    p.load();
  }, [nextBeat]);

  function handleEnded() {
    if (beatIndex < BEATS.length - 1) {
      setBeatIndex((i) => i + 1);
    } else {
      setFinished(true);
    }
  }

  function handleSkip() {
    setBeatIndex(BEATS.length - 1);
    setFinished(true);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black film-grain">
      {/* Hidden preloader — keeps next clip buffered so transitions are gapless */}
      <video ref={preloadRef} className="hidden" muted playsInline preload="auto" />

      <video
        ref={videoRef}
        key={`${beat.key}-${flightCount}`}
        src={beat.src}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleEnded}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Cinematic vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, transparent 60%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      {/* Top bar */}
      <div className="absolute left-0 right-0 top-0 z-10 px-8 pt-8">
        <div className="flex items-center justify-between">
          <Link
            href="/foyer/staircase"
            className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-ivory/70 transition-colors hover:text-gold"
          >
            ← Abort circuit
          </Link>
          <div className="flex items-center gap-2">
            {BEATS.map((b, i) => (
              <span
                key={b.key}
                className={`h-px transition-all duration-700 ${
                  i === beatIndex
                    ? 'w-10 bg-gold'
                    : i < beatIndex
                    ? 'w-10 bg-gold/40'
                    : 'w-4 bg-ivory/20'
                }`}
              />
            ))}
            <span className="ml-3 font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">
              {String(beatIndex + 1).padStart(2, '0')} / {String(BEATS.length).padStart(2, '0')}
            </span>
          </div>
          <button
            onClick={handleSkip}
            className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-ivory/55 transition-colors hover:text-gold"
          >
            Skip →
          </button>
        </div>
      </div>

      {/* Route label — top right */}
      <div className="absolute right-8 top-16 z-10 pointer-events-none">
        <div className="bg-black/50 border border-gold/25 rounded-sm px-3 py-1.5 backdrop-blur-sm">
          <p className="font-mono text-[0.45rem] uppercase tracking-[0.38em] text-gold/60">
            Bay Grand Circuit · Night
          </p>
        </div>
      </div>

      {/* Bottom caption */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-8 pb-12 text-center">
        <p
          className="font-display text-lg italic tracking-wider text-ivory drop-shadow-lg md:text-xl"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.9)' }}
        >
          {beat.caption}
        </p>
      </div>

      {/* Finished overlay */}
      {finished && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-midnight/85 backdrop-blur-sm">
          <div className="mx-auto max-w-xl space-y-6 px-8 text-center">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
              Circuit complete
            </p>
            <h1 className="font-didot text-5xl uppercase tracking-[0.14em] text-ivory">
              Home
            </h1>
            <div className="mx-auto h-px w-16 bg-gold/40" />
            <p className="font-body italic leading-relaxed text-ivory/85">
              The wings fold. The chateau gravel underfoot again. The Bay a memory
              of ten thousand lights and one perfect apex.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={() => router.push('/foyer')}
                className="rounded-full border border-gold/50 bg-gold/10 px-8 py-3 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-gold transition-all hover:border-gold hover:bg-gold/20"
              >
                Enter the Chateau
              </button>
              <button
                onClick={() => {
                  setBeatIndex(0);
                  setFinished(false);
                  setFlightCount((c) => c + 1);
                }}
                className="rounded-full border border-ivory/30 px-8 py-3 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-ivory/70 transition-all hover:border-ivory/60"
              >
                Fly again
              </button>
              <button
                onClick={() => router.push('/flight')}
                className="rounded-full border border-ivory/20 px-8 py-3 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-ivory/50 transition-all hover:border-ivory/40"
              >
                Napa Valley flight →
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
