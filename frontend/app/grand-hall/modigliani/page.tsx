'use client';

import { useState } from 'react';
import Link from 'next/link';
import CinematicBackdrop from '@/components/cinematic/CinematicBackdrop';
import { paintingsByWing } from '@/lib/paintings';

const CHAPTERS = [
  {
    key: 'livorno',
    eyebrow: 'I',
    title: 'Livorno',
    subtitle: '1884 – 1906 · the Sephardic family',
    body:
      "Born Amedeo Modigliani in Livorno, into an old Sephardic Jewish family whose business was failing the year he arrived. His mother teaches him Spinoza, Bergson, the entire Italian Renaissance from her own library. By fourteen he has had typhoid; by sixteen tuberculosis. His mother spends savings on Italy tours — Florence, Rome, Venice — and he sees the Renaissance directly. He arrives in Paris in 1906 with five hundred francs sewn into his coat.",
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/milan-court.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/florence-workshop.mp4'],
  },
  {
    key: 'paris',
    eyebrow: 'II',
    title: 'Paris',
    subtitle: '1906 – 1909 · Montmartre · Cézanne · failure',
    body:
      "Bateau-Lavoir tenement in Montmartre, next door to Picasso. Sees the 1907 Cézanne retrospective and is dismantled by it. Drinks too much; takes too much hashish. By 1909 he is broke, ill, painting almost nothing. He moves to Montparnasse and decides he will sculpt — not paint — for the next four years.",
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/montmartre.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/paris.mp4'],
  },
  {
    key: 'masks',
    eyebrow: 'III',
    title: 'African and Cycladic masks',
    subtitle: '1909 – 1914 · sculpture and the elongated face',
    body:
      "Discovers the African and Oceanic masks Picasso had pulled from the Trocadéro, plus the Cycladic heads at the Louvre. Carves limestone heads — about thirty of them — until the war makes stone too expensive and his tuberculosis can no longer take the dust. Returns to painting in 1914 with the elongated face locked in. Every portrait afterwards is a Cycladic head turned into oil.",
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/african-masks.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/muses-lovers.mp4'],
  },
  {
    key: 'portraits',
    eyebrow: 'IV',
    title: 'The portraits',
    subtitle: '1914 – 1919 · Beatrice · Jeanne · Kiki',
    body:
      "Beatrice Hastings, the English poet, his lover 1914–1916. Jeanne Hébuterne, art student, becomes his common-law wife 1917 — they have a daughter. The first solo exhibition in 1917 is closed by the police on the opening day for indecency. He paints Kiki de Montparnasse — Alice Prin — in 1916; the Nu couché aux bras levés in our Cabinet is the one she sat for. Hers was the only nude he ever painted that he did not sell.",
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/muses-lovers.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/african-masks.mp4', 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/montmartre.mp4'],
  },
  {
    key: 'death',
    eyebrow: 'V',
    title: 'Death',
    subtitle: 'January 1920',
    body:
      "Tubercular meningitis. He dies on the twenty-fourth of January, 1920, in the Charité hospital. Jeanne Hébuterne is nine months pregnant. She throws herself from a fifth-floor window the next morning. They are buried weeks apart in Père Lachaise. Their orphaned daughter is raised by his sister and will write the definitive biography sixty years later.",
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/muses-lovers.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/paris.mp4'],
  },
];

export default function ModiglianiCabinetPage() {
  const [activeKey, setActiveKey] = useState(CHAPTERS[3].key); // Portraits — where the works sit
  const active = CHAPTERS.find((c) => c.key === activeKey) ?? CHAPTERS[3];
  const pieces = paintingsByWing('/grand-hall/modigliani');

  return (
    <main className="relative min-h-screen overflow-hidden film-grain">
      <CinematicBackdrop videoSrc={active.video} overlay={0.55} />
      <div className="relative z-10 px-8 py-10">
        <Link href="/grand-hall" className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 hover:text-gold">
          ← Back to the Grand Hall
        </Link>
        <header className="mx-auto mt-12 max-w-4xl text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
            Grand Hall · centre · Cabinet de Curiosités
          </p>
          <h1 className="mt-6 font-didot text-6xl uppercase tracking-[0.12em] text-ivory drop-shadow-lg md:text-7xl">Modigliani</h1>
          <p className="mt-4 font-display text-xl italic tracking-wider text-gold/85">
            thirty-five years · the elongated face · the lost Kiki nude
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
        <section className="mx-auto mt-20 max-w-7xl">
          <p className="text-center font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70 mb-6">
            The three portraits on offer
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {pieces.map((p) => (
              <Link key={p.slug} href={`/piece/${p.slug}`}>
                <article className="marble rounded-lg p-6 space-y-3 h-full transition-all hover:scale-[1.02]">
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">{p.year}</p>
                  <h3 className="font-display text-lg leading-tight text-ivory">{p.title}</h3>
                  <div className="h-px w-8 bg-gold/30" />
                  <p className="font-body text-xs italic text-ivory/65">{p.inspirationNote}</p>
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.28em] text-gold/60 pt-2">Enter the piece →</p>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
