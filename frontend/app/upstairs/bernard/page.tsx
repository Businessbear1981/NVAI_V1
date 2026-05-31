'use client';

import { useState } from 'react';
import Link from 'next/link';
import CinematicBackdrop from '@/components/cinematic/CinematicBackdrop';
import { paintingsByWing } from '@/lib/paintings';

const CHAPTERS = [
  {
    key: 'pont-aven',
    eyebrow: 'I',
    title: 'Pont-Aven',
    subtitle: '1888 – 1891 · Brittany with Gauguin',
    body:
      "Twenty years old, in Brittany. Co-invents Cloisonnism with Émile Schuffenecker — flat areas of bold colour enclosed by dark contour lines, derived from medieval stained glass and Japanese prints. Paul Gauguin arrives that summer. They paint together. By autumn Bernard has shown Gauguin the Cloisonnist way of seeing, and Gauguin will spend the rest of his career being credited with it.",
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/florence-workshop.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/workshop-awakening.mp4'],
  },
  {
    key: 'falling-out',
    eyebrow: 'II',
    title: 'The falling out',
    subtitle: '1891 – 1893 · Van Gogh dies · Gauguin departs',
    body:
      "Van Gogh — Bernard's close friend, who painted his portrait — shoots himself in 1890. Bernard organises the first Van Gogh memorial exhibition. Then 1891: Gauguin leaves for Tahiti, and lets it be known to the dealers that the Cloisonnist innovations were his. Bernard, twenty-three, watches his reputation transferred to the older man. He never quite recovers his standing in the avant-garde.",
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/paris.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/montmartre.mp4'],
  },
  {
    key: 'egypt-italy',
    eyebrow: 'III',
    title: 'Egypt and Italy',
    subtitle: '1893 – 1904 · the religious turn',
    body:
      "Travels to Egypt, marries a young Lebanese woman, lives in Cairo a decade. Reads the Italian Renaissance masters, the Venetians, Tintoretto and Veronese above all. Turns sharply away from modernism toward classical religious painting. The avant-garde calls this a betrayal. He is unbothered — he is a deeply Catholic painter rediscovering Catholic painting.",
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/rome-vatican.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/florence-workshop.mp4'],
  },
  {
    key: 'late-religious',
    eyebrow: 'IV',
    title: 'The late altarpieces',
    subtitle: '1904 – 1941 · classical Catholic painting',
    body:
      "Returns to France. Spends the rest of his career on large-scale religious cycles — Passion paintings, Stations of the Cross, monumental altarpieces. The Passion of Christ on offer here is from this period: roughly three by two metres, oil on canvas, painted in the manner of the Venetian masters he had spent twenty years studying. He dies in Paris in 1941, still arguing for the timeless against the modern.",
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_raphael_chapel_5k.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/rome-vatican.mp4'],
  },
];

export default function BernardWingPage() {
  const [activeKey, setActiveKey] = useState(CHAPTERS[3].key); // Late religious — where the Passion sits
  const active = CHAPTERS.find((c) => c.key === activeKey) ?? CHAPTERS[3];
  const pieces = paintingsByWing('/upstairs/bernard');

  return (
    <main className="relative min-h-screen overflow-hidden film-grain">
      <CinematicBackdrop videoSrc={active.video} overlay={0.55} />
      <div className="relative z-10 px-8 py-10">
        <Link href="/foyer/staircase" className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 hover:text-gold">
          ← Back to the staircase
        </Link>
        <header className="mx-auto mt-12 max-w-4xl text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
            Upstairs Left · the chapel · &ldquo;Russian Enchantment&rdquo;
          </p>
          <h1 className="mt-6 font-didot text-6xl uppercase tracking-[0.12em] text-ivory drop-shadow-lg md:text-7xl">Émile Bernard</h1>
          <p className="mt-4 font-display text-xl italic tracking-wider text-gold/85">
            seventy-three years · co-invented Cloisonnism · spent forty years on the Passion
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
          <p className="text-center font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70 mb-6">The piece on offer · from the late altarpiece period</p>
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
