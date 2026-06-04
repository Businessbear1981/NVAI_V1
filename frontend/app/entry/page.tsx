'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CinematicBackdrop from '@/components/cinematic/CinematicBackdrop';

/**
 * The Entry scene — slow cinematic zoom from the aerial approach into the chateau.
 * Replaces the prior fast jump from home → foyer with a true cinematic transition.
 * Auto-advances to /foyer after the scene plays, but the visitor may also tap forward.
 */
export default function EntryPage() {
  const router = useRouter();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 2000);
    return () => clearTimeout(t);
  }, []);
  // No auto-advance — visitor controls when to step inside.
  void router;

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden bg-midnight film-grain md:h-screen md:overflow-hidden">
      {/* The ZOOM-IN — drone approach, slowed. This is the movement, after the click. */}
      <CinematicBackdrop
        videoSrc="https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_aerial_drone_approach_5k.mp4"
        fallbackGradient="radial-gradient(ellipse at 50% 35%, rgba(232,200,122,0.18) 0%, transparent 55%), linear-gradient(180deg, #1a1208 0%, #3b1f0f 40%, #1a0e08 100%)"
        overlay={0.5}
        playbackRate={0.35}
      />

      <div
        className={`absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-[2500ms] ${
          revealed ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="text-center px-8">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.5em] text-gold/80">
            Approaching
          </p>
          <h1 className="mt-6 font-didot text-5xl uppercase tracking-[0.18em] text-ivory drop-shadow-lg md:text-7xl">
            Chateau Magdalena
          </h1>
          <div className="mx-auto mt-6 h-px w-32 bg-gold/40" />
          <p className="mt-6 font-display text-lg italic tracking-wider text-gold/85">
            Napa Valley · Twenty-seven works · Available under private agreement
          </p>
          <Link
            href="/foyer"
            className="mt-12 inline-block font-mono text-[0.6rem] uppercase tracking-[0.4em] text-ivory/75 underline-offset-4 hover:text-gold hover:underline"
          >
            Step inside →
          </Link>
        </div>
      </div>
    </main>
  );
}
