'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import CinematicBackdrop from '@/components/cinematic/CinematicBackdrop';
import MarbleTombstone from '@/components/tombstones/MarbleTombstone';
import ArtistTombstone from '@/components/tombstones/ArtistTombstone';

export default function GardenPage() {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden film-grain bg-midnight">
      <CinematicBackdrop
        videoSrc="https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_garden_path_to_patio_5k.mp4"
        overlay={0.5}
        playbackRate={0.55}
      />

      <div className={`relative z-10 px-8 py-12 transition-opacity duration-[1800ms] ${revealed ? 'opacity-100' : 'opacity-0'}`}>
        <Link
          href="/foyer"
          className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 hover:text-gold"
        >
          ← Back to the foyer
        </Link>

        <header className="mx-auto mt-16 max-w-4xl text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.5em] text-gold/80">Scene IV · the patio</p>
          <h1 className="mt-6 font-didot text-6xl uppercase tracking-[0.15em] text-ivory drop-shadow-lg md:text-7xl">
            The Patio
          </h1>
          <p className="mt-4 font-display text-xl italic tracking-wider text-gold/85">
            A garden party · cypresses · vineyard light
          </p>
          <div className="mx-auto mt-8 h-px w-24 bg-gold/40" />
          <p className="mx-auto mt-8 max-w-xl font-body italic text-ivory/80 leading-relaxed">
            Tuscan stone underfoot. The Matisse pavilion looks out over the
            vineyard — his Riviera, in Napa. The bohemian parlor is to your left
            through the bar door. The artist wings of the grounds lie along the
            path beyond.
          </p>
        </header>

        <section className="mx-auto mt-20 max-w-6xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Link href="/parlor" aria-label="The Parlor — La Ruche">
              <MarbleTombstone
                eyebrow="Through the bar door"
                title="The Parlor"
                subtitle="La Ruche · Chagall hang"
                caption="Bohemian. Copper-green bar. The Chagall sub-room is through the back."
              />
            </Link>

            <ArtistTombstone
              slug="matisse"
              href="/matisse"
              caption="Mediterranean Pavilion"
              featured
            />

            <Link href="/grounds" aria-label="The Grounds">
              <MarbleTombstone
                eyebrow="Out along the path"
                title="The Grounds"
                subtitle="Monet · Picasso · Da Vinci · Frida"
                caption="The expansive estate. Each artist their own wing."
              />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
