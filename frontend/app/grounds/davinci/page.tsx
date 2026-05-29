'use client';

import { useState } from 'react';
import Link from 'next/link';
import CinematicBackdrop from '@/components/cinematic/CinematicBackdrop';
import { paintingsByWing } from '@/lib/paintings';

const CHAPTERS = [
  {
    key: 'florence',
    eyebrow: 'I',
    title: 'Florence',
    subtitle: 'Apprenticeship · 1466–1482 · Verrocchio',
    body:
      'Illegitimate son of a Vinci notary, raised by his grandmother. Apprenticed at fourteen to Andrea del Verrocchio in Florence. Painted an angel into his master&rsquo;s Baptism of Christ so finely that Verrocchio is said to have put down his brushes forever. Joined the painters&rsquo; guild at twenty.',
    video: '/videos/florence-workshop.mp4',
    rotation: ['/videos/workshop-awakening.mp4'],
  },
  {
    key: 'milan',
    eyebrow: 'II',
    title: 'Milan',
    subtitle: 'The Sforza court · 1482–1499 · Last Supper · Lady with a Fur',
    body:
      'Wrote Ludovico Sforza a letter listing himself as a military engineer, then added "in painting I can do whatever can be done." Took the job. Stayed seventeen years. The Last Supper. The fortifications. The flying machines, the anatomical studies, the water hydraulics, the codex sheets that survive today. The Lady with a Fur is painted in this period.',
    video: '/videos/milan-court.mp4',
    rotation: ['/videos/flight-machines.mp4', '/videos/water-hydraulics.mp4', '/videos/human-anatomy.mp4'],
  },
  {
    key: 'return',
    eyebrow: 'III',
    title: 'Return to Florence',
    subtitle: '1500–1506 · the Mona Lisa begins',
    body:
      'Sforza falls to the French. Leonardo wanders. Mantua, Venice, then Florence again. Begins the Mona Lisa (he will carry it with him the rest of his life, never finishing). Competes with the young Michelangelo on a battle scene. Studies birds for the flight treatise. Dissects, sketches, writes.',
    video: '/videos/nature-geometry.mp4',
    rotation: ['/videos/florence-workshop.mp4', '/videos/human-anatomy.mp4'],
  },
  {
    key: 'rome',
    eyebrow: 'IV',
    title: 'Rome',
    subtitle: '1513–1516 · the Medici · the Vatican',
    body:
      'Giuliano de&rsquo; Medici brings him to Rome to work in the Belvedere at the Vatican. Raphael is already there, Michelangelo finishing the Sistine. Leonardo experiments — distillations, hydraulic toys, automata. Paints little. He is sixty-one. The grand commissions go to younger men.',
    video: '/videos/rome-vatican.mp4',
    rotation: ['/videos/human-anatomy.mp4'],
  },
  {
    key: 'amboise',
    eyebrow: 'V',
    title: 'Amboise',
    subtitle: 'The last years · 1516–1519 · the King of France',
    body:
      'Francis I invites him to the Château du Clos Lucé. Pension, dignity, a house with a tunnel to the royal chateau. Leonardo brings three paintings with him — the Mona Lisa among them. His right hand has gone palsied. He writes and draws with his left. Dies May 1519, age sixty-seven. Some accounts have Francis cradling his head at the end.',
    video: '/videos/amboise-france.mp4',
    rotation: ['/videos/nature-geometry.mp4'],
  },
];

export default function DaVinciWingPage() {
  const [activeKey, setActiveKey] = useState(CHAPTERS[1].key); // Milan, where Lady with a Fur is
  const active = CHAPTERS.find((c) => c.key === activeKey) ?? CHAPTERS[1];
  const pieces = paintingsByWing('/grounds/davinci');

  return (
    <main className="relative min-h-screen overflow-hidden film-grain">
      <CinematicBackdrop videoSrc={active.video} overlay={0.55} />
      <div className="relative z-10 px-8 py-10">
        <Link href="/grounds" className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 hover:text-gold">
          ← Back to the grounds
        </Link>
        <header className="mx-auto mt-12 max-w-4xl text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">The Workshop</p>
          <h1 className="mt-6 font-didot text-6xl uppercase tracking-[0.12em] text-ivory drop-shadow-lg md:text-7xl">
            Leonardo da Vinci
          </h1>
          <p className="mt-4 font-display text-xl italic tracking-wider text-gold/85">
            sixty-seven years · roughly fifteen surviving paintings · the polymath
          </p>
          <div className="mx-auto mt-8 h-px w-24 bg-gold/40" />
        </header>
        <nav className="mx-auto mt-16 flex max-w-5xl flex-wrap justify-center gap-3">
          {CHAPTERS.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveKey(c.key)}
              className={`flex flex-col items-center rounded border px-5 py-3 text-center transition-all ${
                activeKey === c.key ? 'border-gold bg-gold/10 text-gold' : 'border-ivory/15 bg-midnight/40 text-ivory/65 hover:border-gold/40 hover:text-gold'
              }`}
            >
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
          <p className="text-center font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70 mb-6">
            The piece on offer · from the Milan years
          </p>
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
