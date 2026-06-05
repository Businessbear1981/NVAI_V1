'use client';

import { useState } from 'react';
import Link from 'next/link';
import RotatingBackdrop from '@/components/cinematic/RotatingBackdrop';
import ArtistSignature from '@/components/brand/ArtistSignature';
import { paintingsByWing } from '@/lib/paintings';
import { getArtist } from '@/lib/artists';

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
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/rome-vatican.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/florence-workshop.mp4'],
  },
];

const GILT_FRAME = {
  padding: '1.4rem',
  background: 'linear-gradient(135deg, #d4a64a 0%, #8a6020 35%, #b08832 65%, #6a4815 100%)',
  boxShadow: '0 40px 80px -10px rgba(0,0,0,0.95), 0 0 100px -10px rgba(255,210,140,0.4), inset 0 1px 0 rgba(255,220,150,0.5), inset 0 -1px 0 rgba(40,20,5,0.6)',
};

export default function BernardWingPage() {
  const [activeKey, setActiveKey] = useState(CHAPTERS[3].key);
  const active = CHAPTERS.find((c) => c.key === activeKey) ?? CHAPTERS[3];
  const artist = getArtist('bernard');
  const pieces = paintingsByWing('/upstairs/bernard');
  const centerpiece = pieces[0];

  return (
    <main className="relative min-h-screen overflow-hidden film-grain">
      <RotatingBackdrop leadIn={active.video} rotation={active.rotation} overlay={0.55} />
      <div className="relative z-10 px-8 py-10">
        <Link href="/foyer/staircase" className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 hover:text-gold">
          ← Back to the staircase
        </Link>

        <header className="mx-auto mt-12 max-w-4xl text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
            Upstairs Left · the chapel · &ldquo;Russian Enchantment&rdquo;
          </p>
          <h1 className="mt-6 font-didot text-6xl uppercase tracking-[0.12em] text-ivory drop-shadow-lg md:text-7xl">
            Émile Bernard
          </h1>
          <p className="mt-4 font-display text-xl italic tracking-wider text-gold/85">
            seventy-three years · co-invented Cloisonnism · spent forty years on the Passion
          </p>
          {artist && (
            <div className="mt-8 flex justify-center">
              <ArtistSignature artist={artist} size="lg" asLink={false} showCaption={false} />
            </div>
          )}
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

        {/* Featured painting */}
        {centerpiece && (
          <section className="mx-auto mt-20 max-w-6xl">
            <div className="mb-6 text-center">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.5em] text-gold/85">
                The piece on offer · from the late altarpiece period
              </p>
            </div>
            <Link href={`/piece/${centerpiece.slug}`} className="group block">
              <article className="relative mx-auto" style={{ maxWidth: '52rem', background: 'radial-gradient(ellipse at 50% 0%, rgba(255,210,140,0.40) 0%, rgba(232,200,122,0.15) 30%, transparent 60%)', padding: '6rem 2rem 3rem' }}>
                {/* Brass picture light */}
                <div className="absolute left-1/2 top-6 z-20 -translate-x-1/2">
                  <div className="h-3 w-40 rounded-full" style={{ background: 'linear-gradient(180deg, #d4a64a 0%, #8a6020 60%, #4a3008 100%)', boxShadow: '0 4px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,220,150,0.7)' }} />
                  <div className="absolute left-1/2 top-2 h-1.5 w-32 -translate-x-1/2 rounded-full" style={{ background: 'rgba(255,210,140,0.95)', boxShadow: '0 0 36px rgba(255,210,140,0.9)' }} />
                </div>
                {/* Gilt frame */}
                {centerpiece.imageUrl && (
                  <div className="relative mx-auto" style={{ maxWidth: '38rem', ...GILT_FRAME }}>
                    <div className="overflow-hidden" style={{ boxShadow: 'inset 0 0 0 2px rgba(40,25,10,0.9), inset 0 0 12px rgba(0,0,0,0.4)' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={centerpiece.imageUrl} alt={`${centerpiece.artist} — ${centerpiece.title}`} className="block w-full" />
                    </div>
                  </div>
                )}
                {/* Brass placard */}
                <div className="mt-8 text-center">
                  <div className="inline-block rounded-sm px-8 py-3" style={{ background: 'linear-gradient(180deg, rgba(212,175,55,0.22) 0%, rgba(40,30,15,0.7) 100%)', border: '1px solid rgba(232,200,122,0.5)', boxShadow: '0 4px 12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,220,150,0.3)' }}>
                    <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/85">Russian Enchantment Chapel · Late Altarpiece Period</p>
                    <h2 className="mt-2 font-didot text-2xl tracking-wider text-ivory md:text-3xl">
                      {centerpiece.artist} · <em className="font-display italic">{centerpiece.title}</em>
                    </h2>
                    <p className="mt-1 font-display italic text-gold/90">{centerpiece.year} · {centerpiece.dimensions} · {centerpiece.medium}</p>
                    {centerpiece.signed && (
                      <p className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.28em] text-ivory/70">{centerpiece.signed}</p>
                    )}
                    <p className="mt-3 font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/85 group-hover:underline underline-offset-4">Enter the piece →</p>
                  </div>
                </div>
              </article>
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}
