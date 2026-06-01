'use client';

import { useState } from 'react';
import Link from 'next/link';
import CinematicBackdrop from '@/components/cinematic/CinematicBackdrop';
import { paintingsByWing } from '@/lib/paintings';

const CHAPTERS = [
  {
    key: 'cody',
    eyebrow: 'I',
    title: 'Cody, Wyoming',
    subtitle: '1912 – 1930 · the West',
    body:
      "Born in Cody, Wyoming, the youngest of five brothers. Family moves through Arizona, California, the rural West. His father drinks and disappears. His mother takes the boys with her. The first images that stay with him are the Native American sand paintings of the Navajo and Hopi — circular, performed on the ground, made and unmade as ritual. The drip floor work is already taking shape forty years before it appears on canvas.",
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nature-geometry.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/studio-revolution.mp4'],
  },
  {
    key: 'new-york',
    eyebrow: 'II',
    title: 'New York',
    subtitle: '1930 – 1945 · the Art Students League · WPA · Jung',
    body:
      "Moves to New York at eighteen to study with Thomas Hart Benton. The regionalist murals he paints under Roosevelt's WPA pay the rent. Severe alcoholic episodes through the 1930s. Begins Jungian analysis in 1939 — the unconscious as compositional material, the archetypes as form. Marries Lee Krasner in 1945. They move to a wood-frame house in Springs on the far end of Long Island.",
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/studio-revolution.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/abstract-harmony.mp4'],
  },
  {
    key: 'springs',
    eyebrow: 'III',
    title: 'Springs',
    subtitle: '1945 – 1950 · the drip-paint apex',
    body:
      "Converts the barn at Springs into a studio. Lays the canvas flat on the floor — the way the Navajo sand painters had — and drips and pours enamel directly. Lavender Mist, Autumn Rhythm, One: Number 31 — three years of canvases the size of city walls. Hans Namuth films him at work. The two pieces on offer here are from this period — the heavy-drip floor work he was on when Time magazine called him the greatest living painter.",
    // SPRINGS chapter — the drip-paint apex. Uses the three new Pollock generations.
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_pollock_autumn_rhythm_canvas_5k.mp4',
    rotation: [
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_pollock_action_5k.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_pollock_springs_studio_5k.mp4',
    ],
  },
  {
    key: 'the-end',
    eyebrow: 'IV',
    title: 'The end',
    subtitle: '1951 – 1956 · the black paintings · the car',
    body:
      "By 1951 he is drinking again, painfully. The black-and-white enamel paintings of 1951–52 are darker and figurative, as though the unconscious is closing back up. Less work, more drinking, an affair with Ruth Kligman. On the eleventh of August 1956 he drives his Oldsmobile drunk on a country road near Springs and crashes it into a tree. Forty-four years old. Lee Krasner spends the next thirty years guarding the work.",
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nature-geometry.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/abstract-harmony.mp4'],
  },
];

export default function PollockStudioPage() {
  const [activeKey, setActiveKey] = useState(CHAPTERS[2].key); // Springs — where the 1950 pieces sit
  const active = CHAPTERS.find((c) => c.key === activeKey) ?? CHAPTERS[2];
  const pieces = paintingsByWing('/grand-hall/pollock');

  return (
    <main className="relative min-h-screen overflow-hidden film-grain">
      <CinematicBackdrop videoSrc={active.video} overlay={0.55} />
      <div className="relative z-10 px-8 py-10">
        <Link href="/grand-hall" className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 hover:text-gold">
          ← Back to the Grand Hall
        </Link>
        <header className="mx-auto mt-12 max-w-4xl text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
            Grand Hall · centre-right · the Pollock Studio
          </p>
          <h1 className="mt-6 font-didot text-6xl uppercase tracking-[0.12em] text-ivory drop-shadow-lg md:text-7xl">Pollock</h1>
          <p className="mt-4 font-display text-xl italic tracking-wider text-gold/85">
            forty-four years · the floor as canvas · two new pieces from the heavy-drip apex
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
        <section className="mx-auto mt-20 max-w-5xl">
          <p className="text-center font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70 mb-6">
            The two pieces on offer · 1950 · heavy-drip apex
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
