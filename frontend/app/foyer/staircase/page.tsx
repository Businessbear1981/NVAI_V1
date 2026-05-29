'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import CinematicBackdrop from '@/components/cinematic/CinematicBackdrop';
import MarbleTombstone from '@/components/tombstones/MarbleTombstone';

export default function StaircaseLandingPage() {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden film-grain bg-midnight">
      <CinematicBackdrop
        videoSrc="/videos/nvai_foyer_aerial_static.mp4"
        overlay={0.55}
        playbackRate={0.55}
      />

      <div className={`relative z-10 px-8 py-12 transition-opacity duration-[1800ms] ${revealed ? 'opacity-100' : 'opacity-0'}`}>
        <Link
          href="/foyer"
          className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 hover:text-gold"
        >
          ← Back down to the foyer
        </Link>

        <header className="mx-auto mt-16 max-w-4xl text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.5em] text-gold/80">Scene III · the staircase</p>
          <h1 className="mt-6 font-didot text-6xl uppercase tracking-[0.15em] text-ivory drop-shadow-lg md:text-7xl">
            Upstairs
          </h1>
          <p className="mt-4 font-display text-xl italic tracking-wider text-gold/85">
            Three doors at the landing
          </p>
          <div className="mx-auto mt-8 h-px w-24 bg-gold/40" />
          <p className="mx-auto mt-8 max-w-xl font-body italic text-ivory/80 leading-relaxed">
            A long landing with sconces. To the left, the chapel — the Bernard
            altarpiece. To the right, the Renaissance studiolo. The strange room
            in the middle vibrates: Kandinsky.
          </p>
        </header>

        <section className="mx-auto mt-20 max-w-6xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Link href="/upstairs/bernard">
              <MarbleTombstone
                eyebrow="Left"
                title="Bernard"
                subtitle="Russian Enchantment"
                caption="La Passion de Jésus-Christ — the late altarpiece period."
              />
            </Link>
            <Link href="/upstairs/kandinsky">
              <MarbleTombstone
                eyebrow="Centre"
                title="Kandinsky"
                subtitle="The Creepy Room"
                caption="Two Compositions from the Bauhaus apex. The room vibrates."
                featured
              />
            </Link>
            <Link href="/upstairs/raphael">
              <MarbleTombstone
                eyebrow="Right"
                title="Raphael"
                subtitle="Renaissance Studiolo"
                caption="Madonna with Child — the Florentine years."
              />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
