'use client';

import { useState } from 'react';
import Link from 'next/link';
import CinematicBackdrop from '@/components/cinematic/CinematicBackdrop';
import { paintingsByWing } from '@/lib/paintings';

const CHAPTERS = [
  {
    key: 'moscow',
    eyebrow: 'I',
    title: 'Moscow',
    subtitle: '1866 – 1896 · the law years',
    body:
      'Born in Moscow to a tea merchant. Trained as a lawyer, accepted a professorship at thirty. In 1895 he saw a Monet Haystacks at a Moscow exhibition and could not name the subject — the colour alone struck him. He resigned the chair and moved to Munich to study painting. He was thirty years old and starting over.',
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/moscow.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/russian-folk.mp4'],
  },
  {
    key: 'munich',
    eyebrow: 'II',
    title: 'Munich',
    subtitle: '1896 – 1914 · Murnau and the Blue Rider',
    body:
      "Studied at the Munich Academy. By 1908, summers in Murnau with Gabriele Münter — the threshold of abstraction. 1910: he writes On the Spiritual in Art and produces what is often called the first purely abstract watercolour. 1911: co-founds Der Blaue Reiter with Franz Marc. The Composition (1910) on offer here is from this exact moment — the painted music starts.",
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/munich.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/music-synesthesia.mp4', 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/theosophy.mp4'],
  },
  {
    key: 'russia',
    eyebrow: 'III',
    title: 'Russia again',
    subtitle: '1914 – 1921 · the Revolution',
    body:
      'Trapped in Russia by the outbreak of war in 1914. Marries Nina Andreyevskaya. The Revolution. Brief Commissar of Fine Arts appointment under Lunacharsky. Reorganises Russian museums. Becomes disillusioned with the materialist turn in Constructivism, and in 1921 escapes back to Germany.',
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/russian-folk.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/moscow.mp4'],
  },
  {
    key: 'bauhaus',
    eyebrow: 'IV',
    title: 'Bauhaus',
    subtitle: '1922 – 1933 · Weimar · Dessau',
    body:
      "Teaches at the Bauhaus for eleven years. Geometric period sharpens: circle, triangle, line. Writes Point and Line to Plane. Friendships with Klee, Schoenberg, Albers. The Nazis close the Bauhaus in 1933 and label his work 'degenerate.'",
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/geometry-harmony.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/abstract-harmony.mp4', 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nature-geometry.mp4'],
  },
  {
    key: 'paris',
    eyebrow: 'V',
    title: 'Paris',
    subtitle: '1933 – 1944 · Neuilly-sur-Seine',
    body:
      'Flees to Paris. Biomorphic forms creep into the late paintings — softer, embryonic, alive. Dies in Neuilly in 1944. His Composition VII at the Tretyakov is now considered one of the founding documents of twentieth-century abstraction.',
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/abstract-harmony.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/music-synesthesia.mp4'],
  },
];

export default function KandinskyWingPage() {
  const [activeKey, setActiveKey] = useState(CHAPTERS[1].key);
  const active = CHAPTERS.find((c) => c.key === activeKey) ?? CHAPTERS[1];
  const pieces = paintingsByWing('/upstairs/kandinsky');

  return (
    <main className="relative min-h-screen overflow-hidden film-grain">
      <CinematicBackdrop videoSrc={active.video} overlay={0.55} />
      <div className="relative z-10 px-8 py-10">
        <Link href="/foyer/staircase" className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 hover:text-gold">
          ← Back to the staircase
        </Link>
        <header className="mx-auto mt-12 max-w-4xl text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">Upstairs Center · the creepy room</p>
          <h1 className="mt-6 font-didot text-6xl uppercase tracking-[0.12em] text-ivory drop-shadow-lg md:text-7xl">Kandinsky</h1>
          <p className="mt-4 font-display text-xl italic tracking-wider text-gold/85">
            seventy-eight years · law to abstraction · the painted music
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
            The two Compositions on offer
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
