'use client';

import { useState } from 'react';
import Link from 'next/link';
import CinematicBackdrop from '@/components/cinematic/CinematicBackdrop';
import { paintingsByWing } from '@/lib/paintings';

const CHAPTERS = [
  {
    key: 'vitebsk',
    eyebrow: 'I',
    title: 'Vitebsk',
    subtitle: 'The shtetl · 1887–1910',
    body:
      'Born in Liozno near Vitebsk, eldest of nine. His father a herring merchant, his mother running a small grocery. The Hasidic-folk world that would become the floating violinists and rooftop lovers of every subsequent painting. Yiddish was his first language. The synagogue was around the corner.',
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_chagall_vitebsk_5k.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/russian-folk.mp4', 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/moscow.mp4'],
  },
  {
    key: 'ruche',
    eyebrow: 'II',
    title: 'La Ruche',
    subtitle: 'Paris · 1910–1914 · the bohemian colony',
    body:
      'The Beehive in Montparnasse — a polygonal wooden building, cheap rooms for poor artists. Modigliani, Soutine, Léger, Brancusi, Cendrars, Apollinaire. He worked through the nights and slept through the days. Cubism in the air, but he never quite joined — he kept the floating lovers, the violin, the cow.',
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/paris.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/montmartre.mp4', 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_chagall_studio_5k.mp4'],
  },
  {
    key: 'exile',
    eyebrow: 'III',
    title: 'The Exile',
    subtitle: 'Russia · America · 1914–1948',
    body:
      'Trapped in Russia by the war. Married Bella in 1915 — his eternal muse. The Revolution, his brief commissar appointment, the disillusionment, escape back to Paris 1923. Then 1941, fleeing the Nazis to New York. Bella dies suddenly in 1944. He cannot pick up a brush for nine months. The exile gallery is full of crying brides.',
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/moscow.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/muses-lovers.mp4', 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/russian-folk.mp4'],
  },
  {
    key: 'vence',
    eyebrow: 'IV',
    title: 'Vence and Saint-Paul',
    subtitle: 'The hills above Nice · 1948–1985',
    body:
      'Returns to France 1948. Vence first, then Saint-Paul de Vence from 1966. Vava as his second wife and gentle keeper. The stained-glass commissions begin — Metz, Reims, Jerusalem, the United Nations, the Paris Opéra ceiling. He paints into his nineties. He dies at ninety-seven in 1985, the longest career in modern art.',
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/cote-azur.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/muses-lovers.mp4', 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/paris.mp4'],
  },
];

export default function ChagallRoomPage() {
  const [activeKey, setActiveKey] = useState(CHAPTERS[0].key);
  const active = CHAPTERS.find((c) => c.key === activeKey) ?? CHAPTERS[0];
  const pieces = paintingsByWing('/parlor/chagall');

  return (
    <main className="relative min-h-screen overflow-hidden film-grain">
      <CinematicBackdrop videoSrc={active.video} overlay={0.55} />

      <div className="relative z-10 px-8 py-10">
        <Link href="/parlor" className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 hover:text-gold">
          ← Back to the bar
        </Link>

        <header className="mx-auto mt-12 max-w-4xl text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
            Through the back of the Parlor
          </p>
          <h1 className="mt-6 font-didot text-6xl uppercase tracking-[0.12em] text-ivory drop-shadow-lg md:text-7xl">
            Marc Chagall
          </h1>
          <p className="mt-4 font-display text-xl italic tracking-wider text-gold/85">
            Vitebsk · La Ruche · the exile · Vence
          </p>
          <div className="mx-auto mt-8 h-px w-24 bg-gold/40" />
        </header>

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

        <article className="mx-auto mt-12 max-w-3xl text-center space-y-6">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">Chapter {active.eyebrow}</p>
          <h2 className="font-didot text-4xl uppercase tracking-[0.12em] text-ivory drop-shadow">{active.title}</h2>
          <p className="font-display text-lg italic tracking-wider text-gold/80">{active.subtitle}</p>
          <div className="mx-auto h-px w-16 bg-gold/40" />
          <p className="font-body text-base leading-relaxed text-ivory/90 max-w-2xl mx-auto">{active.body}</p>
        </article>

        <section className="mx-auto mt-20 max-w-7xl">
          <p className="text-center font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70 mb-6">
            The six pieces on offer
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pieces.map((p) => (
              <Link key={p.slug} href={`/piece/${p.slug}`}>
                <article className="marble rounded-lg p-5 space-y-3 h-full transition-all hover:scale-[1.02]">
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">{p.year}</p>
                  <h3 className="font-display text-lg leading-tight text-ivory">{p.title}</h3>
                  <div className="h-px w-8 bg-gold/30" />
                  <p className="font-body text-xs italic text-ivory/70">{p.inspirationNote}</p>
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
