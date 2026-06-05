'use client';

/**
 * The Da Vinci flight — 48 seconds, four beats.
 * Launched from the balcony at the top of the central staircase.
 * Lands back on the foyer terrace (no /patio route exists yet).
 *
 * Each beat is ~12s. They play in order via onEnded chaining.
 */

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { VIDEOS } from '@/lib/videoMap';

// Napa Valley ornithopter — 4 working beats. Slow and contemplative.
const BEATS = [
  { key: 'takeoff', src: VIDEOS.davinciFlight.takeoff, caption: 'Takeoff. The contraption lifts from the balcony.' },
  { key: 'soaring', src: VIDEOS.davinciFlight.soaring, caption: 'Soaring. The valley opens beneath you.' },
  { key: 'banking', src: VIDEOS.davinciFlight.banking, caption: 'Banking. The vines, the cypress, the chateau.' },
  { key: 'descent', src: VIDEOS.davinciFlight.descent, caption: 'Descent. Back to earth. Back to the chateau.' },
] as const;

export default function FlightPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [beatIndex, setBeatIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  // On the second flight (after "Fly again"), swap in the Sean-curated alternate
  // take so the loop is not literally identical. First flight = canonical 4 beats.
  const [flightCount, setFlightCount] = useState(0);

  const beat = BEATS[beatIndex];
  const useAltTake = flightCount > 0;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {
      // Autoplay was blocked. Show controls.
    });
  }, [beatIndex]);

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
      {/* The flight footage — full bleed.
          On the second flight (Fly again) we swap in the Sean-curated alternate
          take for the takeoff beat, then continue with the canonical sequence. */}
      <video
        ref={videoRef}
        key={`${beat.key}-${flightCount}`}
        src={useAltTake && beatIndex === 0 ? VIDEOS.davinciFlight.alt : beat.src}
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
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, transparent 60%, rgba(0,0,0,0.45) 100%)',
        }}
      />

      {/* Top bar — beat indicator */}
      <div className="absolute left-0 right-0 top-0 z-10 px-8 pt-8">
        <div className="flex items-center justify-between">
          <Link
            href="/foyer/staircase"
            className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-ivory/70 transition-colors hover:text-gold"
          >
            ← Cancel flight
          </Link>
          <div className="flex items-center gap-3">
            {BEATS.map((b, i) => (
              <span
                key={b.key}
                className={`h-px transition-all duration-700 ${
                  i === beatIndex ? 'w-12 bg-gold' : i < beatIndex ? 'w-12 bg-gold/40' : 'w-6 bg-ivory/20'
                }`}
              />
            ))}
            <span className="ml-4 font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">
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

      {/* Bottom caption */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-8 pb-12 text-center">
        <p
          className="font-display text-lg italic tracking-wider text-ivory drop-shadow-lg md:text-xl"
          style={{ textShadow: '0 2px 16px rgba(0,0,0,0.85)' }}
        >
          {beat.caption}
        </p>
      </div>

      {/* Finished overlay — landing card */}
      {finished && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-midnight/85 backdrop-blur-sm">
          <div className="mx-auto max-w-xl space-y-6 px-8 text-center">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
              You have landed
            </p>
            <h1 className="font-didot text-5xl uppercase tracking-[0.14em] text-ivory">
              The Patio
            </h1>
            <div className="mx-auto h-px w-16 bg-gold/40" />
            <p className="font-body italic leading-relaxed text-ivory/85">
              The contraption settles on the gravel. The vines are visible through the open
              terrace doors. You are home.
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
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
