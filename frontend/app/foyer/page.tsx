'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import CinematicBackdrop from '@/components/cinematic/CinematicBackdrop';
import MarbleTombstone from '@/components/tombstones/MarbleTombstone';

export default function FoyerPage() {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden film-grain bg-midnight">
      <CinematicBackdrop
        videoSrc="https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_grand_foyer_5k.mp4"
        overlay={0.55}
        playbackRate={0.6}
      />

      <div className={`relative z-10 px-8 py-12 transition-opacity duration-[1800ms] ${revealed ? 'opacity-100' : 'opacity-0'}`}>
        <Link
          href="/"
          className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 hover:text-gold"
        >
          ← Return to the drone shot
        </Link>

        <header className="mx-auto mt-16 max-w-4xl text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.5em] text-gold/80">Scene II · the foyer</p>
          <h1 className="mt-6 font-didot text-6xl uppercase tracking-[0.15em] text-ivory drop-shadow-lg md:text-7xl">
            Villa Monticello
          </h1>
          <p className="mt-4 font-display text-xl italic tracking-wider text-gold/85">
            Marble floor. Three thresholds.
          </p>
          <div className="mx-auto mt-8 h-px w-24 bg-gold/40" />
          <p className="mx-auto mt-8 max-w-xl font-body italic text-ivory/80 leading-relaxed">
            Honey-coloured stone and ironwork. Beyond the foyer the chateau opens
            three ways — up the staircase to the upstairs rooms, through to the
            grand hall, or out the garden door to the patio.
          </p>
        </header>

        <section className="mx-auto mt-20 max-w-6xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Link href="/foyer/staircase" aria-label="Up the staircase">
              <MarbleTombstone
                eyebrow="The Staircase"
                title="Upstairs"
                subtitle="Bernard · Kandinsky · Raphael"
                caption="Three doors at the landing — chapel left, the strange room centre, the studiolo right."
              />
            </Link>

            <Link href="/grand-hall" aria-label="Through to the grand hall">
              <MarbleTombstone
                eyebrow="Straight Ahead"
                title="La Grande Salle"
                subtitle="Ballroom · Cabinet · Auction"
                caption="The chateau dissolves into a modern art party, then into the auction floor."
                featured
              />
            </Link>

            <Link href="/garden" aria-label="Out to the garden">
              <MarbleTombstone
                eyebrow="Garden Door"
                title="The Patio"
                subtitle="Vineyard · Parlor · Matisse · Grounds"
                caption="Out into the Tuscan light. The artist wings lie along the path."
              />
            </Link>
          </div>

          {/* Begin Guided Tour — featured row above the secondary thresholds,
              the locked 18-chapter walk through every wing. */}
          <div className="mt-8 grid grid-cols-1 gap-6">
            <Link href="/tour" aria-label="Begin the 18-chapter guided tour">
              <MarbleTombstone
                eyebrow="The Curated Walk · 18 Chapters"
                title="Begin the Guided Tour"
                subtitle="Bernard narrates · every wing · end-to-end"
                caption="Eighteen chapters in the locked order — Grounds, Monet, Picasso, Frida, Da Vinci, the Ballroom, Pollock, Modi, the upstairs rooms, the Flight, Kiki, the Gallery."
                featured
              />
            </Link>
          </div>

          {/* Secondary thresholds — quieter side-rooms for visitors who want context
              before climbing the staircase. */}
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <Link href="/foyer/welcome" aria-label="First step — welcome, guestbook, about">
              <MarbleTombstone
                eyebrow="First Step"
                title="Welcome"
                subtitle="Guestbook · About · Merch"
                caption="A quiet alcove just inside the door — sign the guestbook, read who we are."
              />
            </Link>

            <Link href="/parlor" aria-label="The parlor">
              <MarbleTombstone
                eyebrow="Off the Foyer"
                title="The Parlor"
                subtitle="Chagall · bohemian Paris"
                caption="A small sitting room with Chagalls on the walls."
              />
            </Link>

            <Link href="/grounds" aria-label="The grounds">
              <MarbleTombstone
                eyebrow="Past the Garden"
                title="The Grounds"
                subtitle="Vineyard · Orchard · Wine Caves"
                caption="The full estate walk — vineyard, orchard, caves, and the artist wings."
              />
            </Link>
          </div>
        </section>

        <p className="mx-auto mt-16 max-w-xl text-center font-body text-xs italic text-ivory/55">
          The Document Distribution & Non-Disclosure Agreement is available for any
          visitor who wishes to receive the dossier — it is not a gate.{' '}
          <Link href="/ddnda" className="text-gold/80 underline-offset-4 hover:underline">
            Sign at your leisure.
          </Link>
        </p>
      </div>
    </main>
  );
}
