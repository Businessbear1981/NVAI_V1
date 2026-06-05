'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import CinematicBackdrop from '@/components/cinematic/CinematicBackdrop';
import ArtistTombstone from '@/components/tombstones/ArtistTombstone';

export default function StaircaseLandingPage() {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden film-grain bg-midnight">
      {/* Upstairs interior backdrop — using the foyer-landing handshot as a stand-in for
          an actual upstairs gathering space (a French-chateau salon or billiards room).
          The aerial-of-outside that was here before was incorrect for an interior landing.
          Higgsfield generation for a true upstairs salon video is queued. */}
      <CinematicBackdrop
        videoSrc="https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_foyer_landing_handshot_5k.mp4"
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
            <ArtistTombstone
              slug="bernard"
              href="/upstairs/bernard"
              caption="La Passion de Jésus-Christ — the late altarpiece period."
            />
            <ArtistTombstone
              slug="kandinsky"
              href="/upstairs/kandinsky"
              caption="Two Compositions from the Bauhaus apex. The room vibrates."
              featured
            />
            <ArtistTombstone
              slug="raphael"
              href="/upstairs/raphael"
              caption="Madonna with Child — the Florentine years."
            />
          </div>

          {/* The fourth door — the balcony. Two flights. */}
          <div className="mx-auto mt-16 max-w-4xl grid grid-cols-1 gap-6 md:grid-cols-2">
            <Link href="/flight" className="block group">
              <article className="marble rounded-lg p-8 text-center transition-all hover:ring-1 hover:ring-gold/60 hover:shadow-2xl h-full">
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
                  Beyond · the balcony
                </p>
                <h3 className="mt-3 font-didot text-3xl uppercase tracking-[0.14em] text-ivory">
                  Napa Valley
                </h3>
                <p className="mt-1 font-mono text-[0.45rem] uppercase tracking-[0.32em] text-gold/50">
                  The Ornithopter · Daylight
                </p>
                <p className="mt-3 font-display italic tracking-wider text-gold/80">
                  Leonardo's contraption, finally airborne.
                </p>
                <div className="mx-auto mt-4 h-px w-12 bg-gold/40" />
                <p className="mt-4 font-body italic text-sm text-ivory/75">
                  Slow. Contemplative. Takeoff, the vines, the banking turn,
                  the descent. Leonardo&apos;s dream — finally airborne.
                </p>
                <p className="mt-4 font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/85 group-hover:text-gold">
                  Launch →
                </p>
              </article>
            </Link>

            <Link href="/bay-flight" className="block group">
              <article className="marble rounded-lg p-8 text-center transition-all hover:ring-1 hover:ring-gold/60 hover:shadow-2xl h-full border border-gold/10">
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
                  Bay Grand Circuit · Night
                </p>
                <h3 className="mt-3 font-didot text-3xl uppercase tracking-[0.14em] text-ivory">
                  The Bay
                </h3>
                <p className="mt-1 font-mono text-[0.45rem] uppercase tracking-[0.32em] text-gold/50">
                  The Wingsuit · Dark
                </p>
                <p className="mt-3 font-display italic tracking-wider text-gold/80">
                  Angel Island. The Gate. Alcatraz. The Bridge apex.
                </p>
                <div className="mx-auto mt-4 h-px w-12 bg-gold/40" />
                <p className="mt-4 font-body italic text-sm text-ivory/75">
                  Fast. A roller coaster over ten thousand lights.
                  Ends at Powerplant Park — Point Richmond — electric green
                  and violet. Then home.
                </p>
                <p className="mt-4 font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/85 group-hover:text-gold">
                  Launch →
                </p>
              </article>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
