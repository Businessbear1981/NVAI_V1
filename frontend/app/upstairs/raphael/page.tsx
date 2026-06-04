'use client';

import { useState } from 'react';
import Link from 'next/link';
import CinematicBackdrop from '@/components/cinematic/CinematicBackdrop';
import { paintingsByWing } from '@/lib/paintings';

const CHAPTERS = [
  {
    key: 'urbino',
    eyebrow: 'I',
    title: 'Urbino',
    subtitle: '1483 – 1494 · the court of Federico da Montefeltro',
    body:
      "Born Raffaello Sanzio in Urbino — at the time one of the most cultivated small courts in Italy. His father Giovanni Santi was a painter and a poet, friendly with Mantegna. Raphael loses both parents by eleven. He grows up in his father's workshop, his uncle as guardian. The Madonna formula is half-learnt before he has facial hair.",
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/florence-workshop.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/milan-court.mp4'],
  },
  {
    key: 'perugia',
    eyebrow: 'II',
    title: 'Perugia',
    subtitle: '1499 – 1504 · apprenticeship with Perugino',
    body:
      "Enters Pietro Perugino's workshop in Perugia at sixteen. Vasari notes that within a year Raphael's hand was indistinguishable from his master's. He absorbs the soft sfumato, the balanced compositions, the gentle Umbrian palette. The Madonna with Child on offer here likely begins in this period — the Peruginesque base under the early Florentine refinement.",
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/milan-court.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/florence-workshop.mp4'],
  },
  {
    key: 'florence',
    eyebrow: 'III',
    title: 'Florence',
    subtitle: '1504 – 1508 · the Madonna years',
    body:
      "Moves to Florence at twenty-one. Studies Leonardo's cartoons, Michelangelo's nudes, Fra Bartolomeo's compositions. Produces over a dozen Madonnas in four years — the body of work that defines the Renaissance image of the Virgin and Child forever. Our piece carries that signature: pyramidal composition, downward-cast gaze, the child slightly turning.",
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/florence-workshop.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/rome-vatican.mp4'],
  },
  {
    key: 'rome',
    eyebrow: 'IV',
    title: 'Rome',
    subtitle: '1508 – 1520 · the Vatican',
    body:
      "Julius II calls him to Rome at twenty-five. The Stanze frescoes. The School of Athens. The Sistine Madonna. The unfinished Transfiguration carried at his funeral. He dies on his thirty-seventh birthday in 1520 — Good Friday — and is buried in the Pantheon. Rome shuts for the day.",
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/rome-vatican.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/florence-workshop.mp4'],
  },
];

export default function RaphaelWingPage() {
  const [activeKey, setActiveKey] = useState(CHAPTERS[2].key); // Florence — where Madonna with Child sits
  const active = CHAPTERS.find((c) => c.key === activeKey) ?? CHAPTERS[2];
  const pieces = paintingsByWing('/upstairs/raphael');

  return (
    <main className="relative min-h-screen overflow-hidden film-grain">
      <CinematicBackdrop videoSrc={active.video} overlay={0.55} />
      <div className="relative z-10 px-8 py-10">
        <Link href="/foyer/staircase" className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 hover:text-gold">
          ← Back to the staircase
        </Link>
        <header className="mx-auto mt-12 max-w-4xl text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">Upstairs Right · the Renaissance studiolo</p>
          <h1 className="mt-6 font-didot text-6xl uppercase tracking-[0.12em] text-ivory drop-shadow-lg md:text-7xl">
            Raphael
          </h1>
          <p className="mt-4 font-display text-xl italic tracking-wider text-gold/85">
            thirty-seven years · the perfect harmony · the unfinished Transfiguration carried at his funeral
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
          <p className="text-center font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70 mb-6">
            The piece on offer · from the Florentine years
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
