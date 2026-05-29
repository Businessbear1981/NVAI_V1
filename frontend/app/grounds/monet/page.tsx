'use client';

import { useState } from 'react';
import Link from 'next/link';
import CinematicBackdrop from '@/components/cinematic/CinematicBackdrop';
import { paintingsByWing } from '@/lib/paintings';

const CHAPTERS = [
  {
    key: 'garden',
    eyebrow: 'I',
    title: 'The Garden',
    subtitle: 'Giverny · 1883–1926',
    body:
      'Forty-three years in one house. The lily pond he dug himself, the Japanese bridge under the wisteria, the iris paths in May, the Clos Normand flower beds with their riot of colour. He painted his own garden into his own paintings until the boundary disappeared.',
    video: '/videos/nvai_monet_secret_garden_5k.mp4',
    rotation: ['/videos/nvai_garden_passage_5k.mp4', '/videos/nvai_garden_path_continuous_5k.mp4'],
  },
  {
    key: 'twilight',
    eyebrow: 'II',
    title: 'The Twilight',
    subtitle: 'Nymphéas at night',
    body:
      'The water lilies under the last colour of the day, then the first stars. He worked on the Nymphéas for thirty years. The series ends in dusk and reflection — the painted water indistinguishable from the painted sky overhead.',
    video: '/videos/nvai_courtyard_5k.mp4',
    rotation: ['/videos/foyer_aerial_pan_final.mp4'],
  },
  {
    key: 'hills',
    eyebrow: 'III',
    title: 'The Rolling Hills',
    subtitle: 'Vétheuil · Argenteuil · the Seine',
    body:
      'Before Giverny, the river years. The barges on the Seine. The poppies of Argenteuil. The winter of Lavacourt under snow — 1879, the year Camille died there, the grief paintings he made that month outside her window.',
    video: '/videos/nvai_aerial_drone_approach_5k.mp4',
    rotation: ['/videos/nvai_garden_path_to_patio_5k.mp4'],
  },
  {
    key: 'failing',
    eyebrow: 'IV',
    title: 'The Failing Sight',
    subtitle: 'Cataracts · 1908–1923',
    body:
      'In 1908 he writes to a friend that the colours have begun to lie to him. By 1912 he can no longer distinguish blue from green. He paints anyway — the late Nymphéas grow muddy, red, swimming. He has his cataracts removed in 1923 at age 82 and weeps when the blue comes back. He paints for three more years.',
    video: '/videos/nvai_garden_passage_5k.mp4',
    rotation: ['/videos/nature-jungle.mp4'],
  },
];

const MONET_PIECE = paintingsByWing('/grounds/monet')[0];

export default function MonetWingPage() {
  const [activeKey, setActiveKey] = useState(CHAPTERS[0].key);
  const active = CHAPTERS.find((c) => c.key === activeKey) ?? CHAPTERS[0];

  return (
    <main className="relative min-h-screen overflow-hidden film-grain">
      <CinematicBackdrop videoSrc={active.video} overlay={0.55} />

      <div className="relative z-10 px-8 py-10">
        <Link
          href="/grounds"
          className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 hover:text-gold"
        >
          ← Back to the grounds
        </Link>

        <header className="mx-auto mt-12 max-w-4xl text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
            The Grand Garden · the platform&rsquo;s longest cinematic
          </p>
          <h1 className="mt-6 font-didot text-6xl uppercase tracking-[0.12em] text-ivory drop-shadow-lg md:text-7xl">
            Claude Monet
          </h1>
          <p className="mt-4 font-display text-xl italic tracking-wider text-gold/85">
            Giverny · a life inside one garden
          </p>
          <div className="mx-auto mt-8 h-px w-24 bg-gold/40" />
        </header>

        {/* Chapter selector */}
        <nav className="mx-auto mt-16 flex max-w-5xl flex-wrap justify-center gap-3">
          {CHAPTERS.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveKey(c.key)}
              className={`group flex flex-col items-center rounded border px-5 py-3 text-center transition-all ${
                activeKey === c.key
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-ivory/15 bg-midnight/40 text-ivory/65 hover:border-gold/40 hover:text-gold'
              }`}
            >
              <span className="font-didot text-base tracking-widest">{c.eyebrow}</span>
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.25em] mt-1">{c.title}</span>
            </button>
          ))}
        </nav>

        {/* Active chapter */}
        <article className="mx-auto mt-12 max-w-3xl text-center space-y-6">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
            Chapter {active.eyebrow}
          </p>
          <h2 className="font-didot text-4xl uppercase tracking-[0.12em] text-ivory drop-shadow">
            {active.title}
          </h2>
          <p className="font-display text-lg italic tracking-wider text-gold/80">{active.subtitle}</p>
          <div className="mx-auto h-px w-16 bg-gold/40" />
          <p className="font-body text-base leading-relaxed text-ivory/90 max-w-2xl mx-auto">
            {active.body}
          </p>
        </article>

        {/* The piece for sale */}
        {MONET_PIECE && (
          <section className="mx-auto mt-20 max-w-3xl">
            <p className="text-center font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70 mb-6">
              The piece on offer
            </p>
            <Link href={`/piece/${MONET_PIECE.slug}`}>
              <article className="marble rounded-lg p-8 space-y-3 transition-all hover:scale-[1.02]">
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">
                  {MONET_PIECE.year}
                </p>
                <h3 className="font-didot text-2xl tracking-wider text-ivory">{MONET_PIECE.title}</h3>
                <div className="h-px w-12 bg-gold/40" />
                <p className="font-body text-sm italic text-ivory/75">{MONET_PIECE.inspirationNote}</p>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-gold/80 pt-2">
                  Enter the piece →
                </p>
              </article>
            </Link>
          </section>
        )}

        <p className="mx-auto mt-16 max-w-2xl text-center font-body text-xs italic text-ivory/55">
          Custom 30-second expansive Giverny lead-in in production with Higgsfield. Currently
          shown with chapter-specific placeholder videos.
        </p>
      </div>
    </main>
  );
}
