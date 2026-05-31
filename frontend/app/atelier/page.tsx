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
        videoSrc="https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_modigliani_cafe_5k.mp4"
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

          {/* Chapters in progress */}
          <section className="mt-16 text-left">
            <p className="text-center font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70 mb-8">
              Chapters · in progress
            </p>
            <div className="space-y-3">
              {[
                { num: 'Prologue', title: 'A Girl Too Big for the Tree', note: 'Châtillon-sur-Seine, 1908–1913. Alice from seven to twelve. The tin of letters under the mattress.', status: 'Drafted' },
                { num: 'I',         title: 'Bill',                       note: 'The March 2022 phone call. The eleven minutes of silence after the painting comes out of the crate.', status: 'Drafted' },
                { num: 'II',        title: 'The Red Pillow',             note: 'A Tate postcard for one pound forty. The 110-year-old shared-studio discovery.', status: 'Drafted' },
                { num: 'III',       title: 'The Sketch Newspaper',       note: 'Camille in Geneva finds the original Nevinson composition under the altered one.', status: 'Next' },
                { num: 'IV',        title: 'For Richard — Find Her',     note: 'Bill dies. The package. Three words in his handwriting.', status: 'Next' },
                { num: 'V',         title: 'Bratislava',                 note: 'The Slovak owners. Their English is imperfect. What they care about is not.', status: 'Pending' },
                { num: 'VI',        title: 'The Wildenstein Letter, 2012', note: 'Marc was the curator the first time the painting passed through Paris.', status: 'Pending' },
                { num: 'VII',       title: 'The Kitchen',                note: 'Tuesday night, November 1925. Five Lost Boys at the green door. The beef cheek. The yes.', status: 'Drafted' },
                { num: 'VIII',      title: 'Marc',                       note: 'The face-to-face. The seventh-volume catalogue raisonné conversation.', status: 'Pending' },
                { num: 'IX',        title: 'March 18, 2026 — The Private Jet', note: 'Prague to Le Bourget to Geneva. The longest conversation in the book.', status: 'Pending' },
                { num: 'X',         title: 'The Geneva Freeport',        note: 'The painting under particle physics. Camille’s home court.', status: 'Pending' },
                { num: 'XI',        title: 'Four Days in Montparnasse',  note: 'Richard walks the streets in March 2026. The Sélect, the Rotonde, the Dôme, the cabarets.', status: 'Pending' },
                { num: 'XII',       title: 'The Certificate',            note: 'Marc decides. Camille calls. Foujita comes from Tokyo for the funeral.', status: 'Pending' },
              ].map((c) => (
                <article key={c.num} className="rounded border border-gold/15 bg-midnight/40 p-4 backdrop-blur">
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="flex items-baseline gap-3 min-w-0">
                      <p className="font-didot text-sm tracking-widest text-gold/70 w-10 shrink-0">{c.num}</p>
                      <p className="font-didot text-base tracking-wider text-ivory truncate">{c.title}</p>
                    </div>
                    <p className={`font-mono text-[0.5rem] uppercase tracking-[0.32em] shrink-0 ${
                      c.status === 'Drafted' ? 'text-gold' :
                      c.status === 'Next' ? 'text-ivory/85' :
                      'text-ivory/40'
                    }`}>
                      {c.status === 'Drafted' ? '✓ Drafted' : c.status}
                    </p>
                  </div>
                  <p className="mt-1.5 ml-13 font-body italic text-xs text-ivory/65 pl-13" style={{paddingLeft: '52px'}}>
                    {c.note}
                  </p>
                </article>
              ))}
            </div>
            <p className="mt-6 text-center font-body italic text-xs text-ivory/55">
              Subscribers receive each chapter on publication.
            </p>
          </section>

          <div className="mt-12 text-center">
            <Link
              href="/inquire?action=atelier-subscribe"
              className="inline-block rounded-full border border-gold/50 bg-gold/10 px-8 py-3 font-mono text-[0.6rem] uppercase tracking-[0.32em] text-gold hover:border-gold hover:bg-gold/20 transition-all"
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
