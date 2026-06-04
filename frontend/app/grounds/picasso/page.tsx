'use client';

import { useState } from 'react';
import Link from 'next/link';
import CinematicBackdrop from '@/components/cinematic/CinematicBackdrop';
import { paintingsByWing, PAINTINGS } from '@/lib/paintings';

const CHAPTERS = [
  {
    key: 'spain',
    eyebrow: 'I',
    title: 'Spain',
    subtitle: 'Málaga · Barcelona · 1881–1900',
    body:
      'Born in Málaga to a drawing teacher. First word reportedly "piz" — for lápiz, pencil. By twelve he could draw better than his father. Barcelona at fifteen, Els Quatre Gats by nineteen, a brief Madrid academic education he refused to finish. The Spanish ground that the rest of his life was built on.',
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/barcelona.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/bullfighting.mp4'],
    leadsTo: null as null | { href: string; label: string },
  },
  {
    key: 'bateau',
    eyebrow: 'II',
    title: 'Bateau-Lavoir',
    subtitle: 'Montmartre · 1901–1909 · Blue Period · Rose Period',
    body:
      'First arrival Paris 1900. Casagemas shoots himself in a Montmartre café February 1901. The Blue Period begins. Years at the Bateau-Lavoir tenement on the rue Ravignan, freezing winters, communal water tap. Then the Rose Period, the saltimbanques, the move toward Cubism.',
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_picasso_blue_period_5k.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/montmartre.mp4', 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/paris.mp4'],
    leadsTo: { href: '/grounds/picasso/bateau-lavoir', label: 'Enter the Bateau-Lavoir room' },
  },
  {
    key: 'cubism',
    eyebrow: 'III',
    title: 'The Cubist Revolution',
    subtitle: 'Demoiselles · Braque · the African masks',
    body:
      'Les Demoiselles d&rsquo;Avignon in 1907. The Trocadéro masks. The collaboration with Braque he would later describe as being "roped together like mountaineers." Analytical Cubism dissolving the figure. Synthetic Cubism reassembling it. The most important conceptual move in twentieth-century painting.',
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/african-masks.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/studio-revolution.mp4', 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_picasso_cubist_workshop_5k.mp4'],
    leadsTo: { href: '/grounds/picasso/boisgeloup', label: 'Enter the Boisgeloup room' },
  },
  {
    key: 'south',
    eyebrow: 'IV',
    title: 'The South of France',
    subtitle: 'Boisgeloup · Vallauris · Mougins · 1930–1973',
    body:
      'The Boisgeloup chateau (he owned it 1930–55, Marie-Thérèse, the white plaster sculptures). The Vallauris pottery years 1948–55 (Françoise, the Madoura kiln). Mougins from 1961 (Jacqueline, David Douglas Duncan photographing the chaos, painting at 86 like a man with all the time in the world).',
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/cote-azur.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/antibes.mp4', 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_picasso_later_atelier_5k.mp4'],
    leadsTo: { href: '/grounds/picasso/mougins', label: 'Enter the Mougins room' },
  },
];

const SUB_ROOMS = [
  { href: '/grounds/picasso/bateau-lavoir', title: 'Bateau-Lavoir', period: '1901 · Blue Period' },
  { href: '/grounds/picasso/boisgeloup', title: 'Boisgeloup', period: '1934–1949' },
  { href: '/grounds/picasso/mougins', title: 'Mougins', period: '1965–1967 · Late atelier' },
];

export default function PicassoCompoundPage() {
  const [activeKey, setActiveKey] = useState(CHAPTERS[1].key); // start at Bateau-Lavoir
  const active = CHAPTERS.find((c) => c.key === activeKey) ?? CHAPTERS[1];
  const pieces = PAINTINGS.filter((p) => p.artist === 'Pablo Picasso');

  return (
    <main className="relative min-h-screen overflow-hidden film-grain">
      <CinematicBackdrop videoSrc={active.video} overlay={0.55} />

      <div className="relative z-10 px-8 py-10">
        <Link href="/grounds" className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 hover:text-gold">
          ← Back to the grounds
        </Link>

        <header className="mx-auto mt-12 max-w-4xl text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
            The Compound · three connecting period rooms
          </p>
          <h1 className="mt-6 font-didot text-6xl uppercase tracking-[0.12em] text-ivory drop-shadow-lg md:text-7xl">
            Pablo Picasso
          </h1>
          <p className="mt-4 font-display text-xl italic tracking-wider text-gold/85">
            ninety-one years · fifty thousand works · seven decades of revolution
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
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">Chapter {active.eyebrow}</p>
          <h2 className="font-didot text-4xl uppercase tracking-[0.12em] text-ivory drop-shadow">{active.title}</h2>
          <p className="font-display text-lg italic tracking-wider text-gold/80">{active.subtitle}</p>
          <div className="mx-auto h-px w-16 bg-gold/40" />
          <p className="font-body text-base leading-relaxed text-ivory/90 max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: active.body }} />
          {active.leadsTo && (
            <Link
              href={active.leadsTo.href}
              className="inline-block mt-4 rounded-full border border-gold/50 bg-gold/10 px-6 py-3 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-gold transition-all hover:border-gold hover:bg-gold/20"
            >
              {active.leadsTo.label} →
            </Link>
          )}
        </article>

        {/* The three sub-rooms */}
        <section className="mx-auto mt-20 max-w-5xl">
          <p className="text-center font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70 mb-6">
            Three connecting period rooms
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {SUB_ROOMS.map((room) => (
              <Link key={room.href} href={room.href}>
                <article className="marble rounded-lg p-6 space-y-3 h-full transition-all hover:scale-[1.02]">
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">{room.period}</p>
                  <h3 className="font-didot text-2xl tracking-wider text-ivory">{room.title}</h3>
                  <div className="h-px w-12 bg-gold/30" />
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.28em] text-gold/60 pt-2">Enter →</p>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* All Picasso pieces */}
        <section className="mx-auto mt-16 max-w-7xl">
          <p className="text-center font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70 mb-6">
            All {pieces.length} Picasso pieces on the property
          </p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-8">
            {pieces.map((p) => (
              <Link key={p.slug} href={`/piece/${p.slug}`}>
                <article className="marble rounded-lg p-3 space-y-1 text-center transition-all hover:scale-105">
                  <p className="font-mono text-[0.5rem] uppercase tracking-[0.28em] text-gold/80">{p.year}</p>
                  <p className="font-display text-xs leading-tight text-ivory">{p.title}</p>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
