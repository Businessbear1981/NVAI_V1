'use client';

import { useState } from 'react';
import Link from 'next/link';
import CinematicBackdrop from '@/components/cinematic/CinematicBackdrop';
import { paintingsByWing } from '@/lib/paintings';

const CHAPTERS = [
  {
    key: 'late-start',
    eyebrow: 'I',
    title: 'A late start',
    subtitle: '1869 – 1898 · law clerk to painter',
    body:
      "Born in Le Cateau-Cambrésis in northern France. Studies law in Paris. At twenty-one, recovering from appendicitis, his mother gives him a box of paints. He drops the legal career. Enters the École des Beaux-Arts at twenty-five, where his teacher Gustave Moreau lets him copy in the Louvre and tells him: 'You were born to simplify painting.' He has been late to every important door of his life.",
    video: '/videos/paris.mp4',
    rotation: ['/videos/cote-azur.mp4'],
  },
  {
    key: 'fauvism',
    eyebrow: 'II',
    title: 'Fauvism',
    subtitle: '1905 · Collioure · the wild beasts',
    body:
      "The summer of 1905 in Collioure on the Mediterranean coast with André Derain. Side by side they paint with colours straight from the tube — vermilion, cobalt, chrome yellow, no mixing on the palette. At the Salon d'Automne that autumn the critic Louis Vauxcelles points at a classical sculpture surrounded by their canvases and says 'Donatello parmi les fauves' — Donatello among the wild beasts. The name sticks. Fauvism is born and lasts two years.",
    video: '/videos/cote-azur.mp4',
    rotation: ['/videos/antibes.mp4'],
  },
  {
    key: 'nice',
    eyebrow: 'III',
    title: 'Nice',
    subtitle: '1917 – 1943 · the Riviera years',
    body:
      "Moves to Nice in 1917. Will stay on the Côte d'Azur the rest of his life. Paints odalisques, open windows, patterned interiors — the painted equivalent of opening a shutter at noon and standing in the light. The pictogram signature on our Woman with Child sits squarely in this period — he had stopped writing his name and begun drawing a small ideogram of himself on the right side of the canvas.",
    video: '/videos/antibes.mp4',
    rotation: ['/videos/cote-azur.mp4'],
  },
  {
    key: 'cutouts',
    eyebrow: 'IV',
    title: 'The cut-outs',
    subtitle: '1941 – 1954 · &ldquo;drawing with scissors&rdquo;',
    body:
      "1941: stomach cancer. The surgery leaves him bedridden. He cannot stand at an easel any more. So he asks an assistant to paint sheets of paper in pure gouache colours, then cuts shapes from them with large scissors directly into the air. He calls it &ldquo;drawing with scissors.&rdquo; The Vence chapel — the Chapelle du Rosaire he designs entire from stained glass to chasubles — opens in 1951. He dies in Nice in 1954, eighty-four years old, having simplified painting exactly as Moreau predicted.",
    video: '/videos/cote-azur.mp4',
    rotation: ['/videos/antibes.mp4'],
  },
];

export default function MatissePavilionPage() {
  const [activeKey, setActiveKey] = useState(CHAPTERS[2].key); // Nice — where Woman with Child sits
  const active = CHAPTERS.find((c) => c.key === activeKey) ?? CHAPTERS[2];
  const pieces = paintingsByWing('/matisse');

  return (
    <main className="relative min-h-screen overflow-hidden film-grain">
      <CinematicBackdrop videoSrc={active.video} overlay={0.55} />
      <div className="relative z-10 px-8 py-10">
        <Link href="/garden" className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 hover:text-gold">
          ← Back to the garden party
        </Link>
        <header className="mx-auto mt-12 max-w-4xl text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">Patio centre · Mediterranean pavilion</p>
          <h1 className="mt-6 font-didot text-6xl uppercase tracking-[0.12em] text-ivory drop-shadow-lg md:text-7xl">Matisse</h1>
          <p className="mt-4 font-display text-xl italic tracking-wider text-gold/85">
            eighty-four years · law clerk to wild beast to scissors · the unforced colour
          </p>
          <div className="mx-auto mt-8 h-px w-24 bg-gold/40" />
        </header>
        <nav className="mx-auto mt-16 flex max-w-5xl flex-wrap justify-center gap-3">
          {CHAPTERS.map((c) => (
            <button key={c.key} onClick={() => setActiveKey(c.key)}
              className={`flex flex-col items-center rounded border px-5 py-3 text-center transition-all ${
                activeKey === c.key ? 'border-gold bg-gold/10 text-gold' : 'border-ivory/15 bg-midnight/40 text-ivory/65 hover:border-gold/40 hover:text-gold'
              }`}>
              <span className="font-didot text-base tracking-widest">{c.eyebrow}</span>
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.25em] mt-1">{c.title}</span>
            </button>
          ))}
        </nav>
        <article className="mx-auto mt-12 max-w-3xl text-center space-y-6">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">Chapter {active.eyebrow}</p>
          <h2 className="font-didot text-4xl uppercase tracking-[0.12em] text-ivory drop-shadow">{active.title}</h2>
          <p className="font-display text-lg italic tracking-wider text-gold/80">{active.subtitle}</p>
          <div className="mx-auto h-px w-16 bg-gold/40" />
          <p className="font-body text-base leading-relaxed text-ivory/90 max-w-2xl mx-auto">{active.body}</p>
        </article>
        <section className="mx-auto mt-20 max-w-3xl">
          <p className="text-center font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70 mb-6">The piece on offer · from the Nice years</p>
          {pieces.map((p) => (
            <Link key={p.slug} href={`/piece/${p.slug}`}>
              <article className="marble rounded-lg p-8 space-y-3 transition-all hover:scale-[1.02]">
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">{p.year}</p>
                <h3 className="font-didot text-2xl tracking-wider text-ivory">{p.title}</h3>
                <div className="h-px w-12 bg-gold/40" />
                <p className="font-body text-sm italic text-ivory/75">{p.inspirationNote}</p>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-gold/80 pt-2">Enter the piece →</p>
              </article>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
