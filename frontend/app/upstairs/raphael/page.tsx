'use client';

import { useState } from 'react';
import Link from 'next/link';
import RotatingBackdrop from '@/components/cinematic/RotatingBackdrop';
import ArtistSignature from '@/components/brand/ArtistSignature';
import { paintingsByWing } from '@/lib/paintings';
import { getArtist } from '@/lib/artists';

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

const GILT_FRAME = {
  padding: '1.4rem',
  background: 'linear-gradient(135deg, #d4a64a 0%, #8a6020 35%, #b08832 65%, #6a4815 100%)',
  boxShadow: '0 40px 80px -10px rgba(0,0,0,0.95), 0 0 100px -10px rgba(255,210,140,0.4), inset 0 1px 0 rgba(255,220,150,0.5), inset 0 -1px 0 rgba(40,20,5,0.6)',
};

export default function RaphaelWingPage() {
  const [activeKey, setActiveKey] = useState(CHAPTERS[2].key);
  const active = CHAPTERS.find((c) => c.key === activeKey) ?? CHAPTERS[2];
  const artist = getArtist('raphael');
  const pieces = paintingsByWing('/upstairs/raphael');
  const centerpiece = pieces[0];

  return (
    <main className="relative min-h-screen overflow-hidden film-grain">
      <RotatingBackdrop leadIn={active.video} rotation={active.rotation} overlay={0.55} />
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
                The piece on offer · from the Florentine years
              </p>
            </div>
            <Link href={`/piece/${centerpiece.slug}`} className="group block">
              <article className="relative mx-auto" style={{ maxWidth: '46rem', background: 'radial-gradient(ellipse at 50% 0%, rgba(255,210,140,0.40) 0%, rgba(232,200,122,0.15) 30%, transparent 60%)', padding: '6rem 2rem 3rem' }}>
                {/* Brass picture light */}
                <div className="absolute left-1/2 top-6 z-20 -translate-x-1/2">
                  <div className="h-3 w-40 rounded-full" style={{ background: 'linear-gradient(180deg, #d4a64a 0%, #8a6020 60%, #4a3008 100%)', boxShadow: '0 4px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,220,150,0.7)' }} />
                  <div className="absolute left-1/2 top-2 h-1.5 w-32 -translate-x-1/2 rounded-full" style={{ background: 'rgba(255,210,140,0.95)', boxShadow: '0 0 36px rgba(255,210,140,0.9)' }} />
                </div>
                {/* Gilt frame */}
                {centerpiece.imageUrl && (
                  <div className="relative mx-auto" style={{ maxWidth: '34rem', ...GILT_FRAME }}>
                    <div className="overflow-hidden" style={{ boxShadow: 'inset 0 0 0 2px rgba(40,25,10,0.9), inset 0 0 12px rgba(0,0,0,0.4)' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={centerpiece.imageUrl} alt={`${centerpiece.artist} — ${centerpiece.title}`} className="block w-full" />
                    </div>
                  </div>
                )}
                {/* Brass placard */}
                <div className="mt-8 text-center">
                  <div className="inline-block rounded-sm px-8 py-3" style={{ background: 'linear-gradient(180deg, rgba(212,175,55,0.22) 0%, rgba(40,30,15,0.7) 100%)', border: '1px solid rgba(232,200,122,0.5)', boxShadow: '0 4px 12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,220,150,0.3)' }}>
                    <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/85">Renaissance Studiolo · Florentine Period</p>
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
