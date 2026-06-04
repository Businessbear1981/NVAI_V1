'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import CinematicBackdrop from '@/components/cinematic/CinematicBackdrop';
import MarbleTombstone from '@/components/tombstones/MarbleTombstone';
import ArtistTombstone from '@/components/tombstones/ArtistTombstone';

export default function ParlorPage() {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden film-grain bg-midnight">
      {/* Parlor backdrop — the dedicated parlor video (bohemian Parisian bar
          with Chagalls on the walls, oxidized copper bar, candlelight). */}
      <CinematicBackdrop
        videoSrc="https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_parlor_5k.mp4"
        overlay={0.55}
        playbackRate={0.5}
      />

      <div className={`relative z-10 px-8 py-12 transition-opacity duration-[1800ms] ${revealed ? 'opacity-100' : 'opacity-0'}`}>
        <Link
          href="/garden"
          className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 hover:text-gold"
        >
          ← Back to the patio
        </Link>

        <header className="mx-auto mt-16 max-w-4xl text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.5em] text-gold/80">Scene V · the parlor</p>
          <h1 className="mt-6 font-didot text-6xl uppercase tracking-[0.15em] text-ivory drop-shadow-lg md:text-7xl">
            The Parlor
          </h1>
          <p className="mt-4 font-display text-xl italic tracking-wider text-gold/85">
            La Ruche · the bohemian bar
          </p>
          <div className="mx-auto mt-8 h-px w-24 bg-gold/40" />
          <p className="mx-auto mt-8 max-w-2xl font-body italic text-ivory/80 leading-relaxed">
            Worn velvet banquettes and mismatched Thonet chairs. Yiddish posters
            peel on the walls. A phonograph plays Vertinsky low under conversation.
            The bar is oxidized copper, gone green with time. Chagalls hang quietly
            along the walls — the dedicated Chagall sub-room is through the back.
          </p>
        </header>

        <section className="mx-auto mt-20 max-w-5xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <ArtistTombstone
              slug="chagall"
              href="/parlor/chagall"
              caption="Six floating dreamscapes · the dedicated sub-room"
              featured
            />
            <Link href="/grand-hall">
              <MarbleTombstone
                eyebrow="Through to the interior"
                title="The Grand Hall"
                subtitle="Chateau · art party · auction"
                caption="The 1920s ballroom dissolving into the auction floor."
              />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
