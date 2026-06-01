'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import RotatingBackdrop from '@/components/cinematic/RotatingBackdrop';

/**
 * The Grounds — a compiled video tour, not a tab grid.
 *
 * Per Sean's direction: the user arrives at /grounds after choosing "The Grounds"
 * from the patio. They see a single continuous flow of compiled grounds videos —
 * aerial drone approach, the path to the patio, the continuous garden path,
 * the courtyard — rotating one into the next at a slow cinematic cadence.
 *
 * The artist-wing destinations live at the bottom of the page as a small,
 * unobtrusive index for visitors who already know where they want to land.
 */
// Grounds tour rotation — visitor's walk through the estate in narrative order.
// Now includes the three custom Higgsfield generations: vines (aerial vineyard),
// orchard (apple + olive walk), and wine caves (period stone interior).
const R2 = 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev';
const GROUNDS_LEAD_IN = `${R2}/nvai_aerial_drone_approach_5k.mp4`;
const GROUNDS_ROTATION = [
  // 1. Path to the secret garden
  `${R2}/nvai_garden_path_to_patio_5k.mp4`,
  // 2. The secret garden itself
  `${R2}/nvai_monet_secret_garden_5k.mp4`,
  // 3. THE VINES — aerial over the vineyard at golden hour
  `${R2}/nvai_vineyard_aerial_5k.mp4`,
  // 4. THE ORCHARD — ground-level walk through apple + olive trees
  `${R2}/nvai_orchard_walk_5k.mp4`,
  // 5. THE WINE CAVES — period stone interior with oak barrels
  `${R2}/nvai_wine_caves_5k.mp4`,
  // 6. Walk along the lower path
  `${R2}/nvai_garden_path_continuous_5k.mp4`,
  // 7. Garden party — the patio scene
  `${R2}/nvai_garden_party_5k.mp4`,
  // 8. Courtyard — at the back of the chateau, completing the loop
  `${R2}/nvai_courtyard_5k.mp4`,
];

const DESTINATIONS = [
  { label: 'Monet', subtitle: 'Giverny garden', href: '/grounds/monet' },
  { label: 'Picasso', subtitle: 'Three studio periods', href: '/grounds/picasso' },
  { label: 'Da Vinci', subtitle: 'Renaissance workshop', href: '/grounds/davinci' },
  { label: 'Frida', subtitle: 'Casa Azul', href: '/grounds/frida' },
];

export default function GroundsPage() {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden film-grain bg-midnight">
      <RotatingBackdrop leadIn={GROUNDS_LEAD_IN} rotation={GROUNDS_ROTATION} overlay={0.45} />

      <div
        className={`relative z-10 flex min-h-screen flex-col px-8 py-12 transition-opacity duration-[2400ms] ${
          revealed ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Link
          href="/garden"
          className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 hover:text-gold"
        >
          ← Back to the patio
        </Link>

        <header className="mx-auto mt-20 max-w-4xl text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.5em] text-gold/80">
            Out to the property
          </p>
          <h1 className="mt-6 font-didot text-7xl uppercase tracking-[0.12em] text-ivory drop-shadow-lg md:text-8xl">
            The Grounds
          </h1>
          <p className="mt-4 font-display text-xl italic tracking-wider text-gold/85">
            Thirty acres of estate, four destinations, one continuous walk
          </p>
          <div className="mx-auto mt-8 h-px w-32 bg-gold/40" />
          <p className="mx-auto mt-8 max-w-xl font-body italic text-ivory/80 leading-relaxed">
            The aerial gives way to the vineyard path. The vineyard path gives way to
            the orchard. The orchard gives way to the courtyard at the back of the
            chateau. Each artist&rsquo;s wing lives somewhere along the walk.
          </p>
        </header>

        <div className="mx-auto mt-auto mb-12 max-w-5xl pt-20">
          <p className="text-center font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70 mb-6">
            Four destinations along the walk
          </p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {DESTINATIONS.map((d) => (
              <Link
                key={d.href}
                href={d.href}
                className="rounded border border-gold/20 bg-midnight/50 px-4 py-3 text-center backdrop-blur transition-all hover:border-gold/60 hover:bg-gold/10"
              >
                <p className="font-didot text-base tracking-wider text-ivory">{d.label}</p>
                <p className="mt-1 font-mono text-[0.5rem] uppercase tracking-[0.28em] text-gold/65">
                  {d.subtitle}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
