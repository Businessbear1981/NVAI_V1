'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import CinematicBackdrop from '@/components/cinematic/CinematicBackdrop';

export default function AtelierPage() {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden film-grain bg-midnight">
      <CinematicBackdrop
        videoSrc="/videos/nvai_modigliani_cafe_5k.mp4"
        overlay={0.6}
        playbackRate={0.45}
      />

      <div className={`relative z-10 px-8 py-16 transition-opacity duration-[1800ms] ${revealed ? 'opacity-100' : 'opacity-0'}`}>
        <Link
          href="/grand-hall/modigliani"
          className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 hover:text-gold"
        >
          ← Back to the Cabinet
        </Link>

        <div className="mx-auto mt-16 max-w-3xl text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.5em] text-gold/80">The Atelier</p>
          <h1 className="mt-6 font-didot text-6xl uppercase tracking-[0.12em] text-ivory drop-shadow-lg md:text-7xl">
            Montparnasse
          </h1>
          <p className="mt-4 font-display text-xl italic tracking-wider text-gold/85">
            A literary memoir, in twelve chapters, of the four-year dig
            <br />behind the Modigliani that is in Geneva right now.
          </p>
          <div className="mx-auto mt-10 h-px w-24 bg-gold/40" />

          <article className="mt-12 space-y-6 font-body text-ivory/90 leading-relaxed text-left">
            <p>
              Two lives running side by side, separated by one hundred years. Kiki
              Prin, born in Châtillon-sur-Seine on the second of October, 1901, who
              became the Madonna of Montparnasse, the most photographed woman in
              Paris, the centre of every room she walked into — and who died alone
              in a hospital ward in 1953 at fifty-one, the queen having become an
              inconvenience.
            </p>
            <p>
              And Richard Triberg, who has spent the last four years in archives
              and on planes and in the lab at the Geneva Freeport putting the first
              story back together from the documents the world had buried. The
              painting at the centre of both lives is a small canvas, 40.5 by 33
              centimetres, oil on linen, made on a summer night in 1917 when the
              rain came down on Montparnasse and a dying man finally had the woman
              he had been watching for two years sit for him.
            </p>
            <p>
              The book is being written now. The chapters will be released here,
              one at a time, as they are finished. The painting&rsquo;s
              authentication is pending. The signature is not yet on the page.
            </p>
          </article>

          <div className="mt-16 inline-block rounded-lg border border-gold/30 bg-midnight/40 px-8 py-6 backdrop-blur">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">First chapter</p>
            <p className="mt-3 font-didot text-2xl tracking-wider text-ivory">For Richard — Find Her</p>
            <p className="mt-2 font-body italic text-sm text-ivory/70">
              Available to subscribers on publication.
            </p>
            <Link
              href="/inquire"
              className="mt-6 inline-block rounded-full border border-gold/50 bg-gold/10 px-8 py-3 font-mono text-[0.6rem] uppercase tracking-[0.32em] text-gold hover:border-gold hover:bg-gold/20 transition-all"
            >
              Reserve your place
            </Link>
          </div>

          <p className="mx-auto mt-16 max-w-xl text-center font-body text-xs italic text-ivory/55">
            <em>Montparnasse</em> by Richard Triberg, recast in collaboration with the
            Napa Valley Art Institut. The full Exposé — &ldquo;The Extraordinary
            Life &amp; Times of the Immortal yet Forgotten KIKI, Queen of
            Montparnasse&rdquo; — was published in 2026.
          </p>
        </div>
      </div>
    </main>
  );
}
