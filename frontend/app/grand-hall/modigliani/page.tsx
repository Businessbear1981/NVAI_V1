'use client';

import { useState } from 'react';
import Link from 'next/link';
import RotatingBackdrop from '@/components/cinematic/RotatingBackdrop';
import { paintingsByWing } from '@/lib/paintings';
import { VIDEOS } from '@/lib/videoMap';
import ArtistSignature from '@/components/brand/ArtistSignature';
import { getArtist } from '@/lib/artists';

const CHAPTERS = [
  {
    key: 'livorno',
    eyebrow: 'I',
    title: 'Livorno',
    subtitle: '1884 – 1906 · the Sephardic family',
    body:
      "Born Amedeo Modigliani in Livorno, into an old Sephardic Jewish family whose business was failing the year he arrived. His mother teaches him Spinoza, Bergson, the entire Italian Renaissance from her own library. By fourteen he has had typhoid; by sixteen tuberculosis. His mother spends savings on Italy tours — Florence, Rome, Venice — and he sees the Renaissance directly. He arrives in Paris in 1906 with five hundred francs sewn into his coat.",
  },
  {
    key: 'paris',
    eyebrow: 'II',
    title: 'Paris',
    subtitle: '1906 – 1909 · Montmartre · Cézanne · failure',
    body:
      "Bateau-Lavoir tenement in Montmartre, next door to Picasso. Sees the 1907 Cézanne retrospective and is dismantled by it. Drinks too much; takes too much hashish. By 1909 he is broke, ill, painting almost nothing. He moves to Montparnasse and decides he will sculpt — not paint — for the next four years.",
  },
  {
    key: 'masks',
    eyebrow: 'III',
    title: 'African and Cycladic masks',
    subtitle: '1909 – 1914 · sculpture and the elongated face',
    body:
      "Discovers the African and Oceanic masks Picasso had pulled from the Trocadéro, plus the Cycladic heads at the Louvre. Carves limestone heads — about thirty of them — until the war makes stone too expensive and his tuberculosis can no longer take the dust. Returns to painting in 1914 with the elongated face locked in. Every portrait afterwards is a Cycladic head turned into oil.",
  },
  {
    key: 'portraits',
    eyebrow: 'IV',
    title: 'The portraits',
    subtitle: '1914 – 1919 · Beatrice · Jeanne · Kiki',
    body:
      "Beatrice Hastings, the English poet, his lover 1914–1916. Jeanne Hébuterne, art student, becomes his common-law wife 1917 — they have a daughter. The first solo exhibition in 1917 is closed by the police on the opening day for indecency. He paints Kiki de Montparnasse — Alice Prin — in 1916; the Nu couché aux bras levés in our Cabinet is the one she sat for. Hers was the only nude he ever painted that he did not sell.",
  },
  {
    key: 'death',
    eyebrow: 'V',
    title: 'Death',
    subtitle: 'January 1920',
    body:
      "Tubercular meningitis. He dies on the twenty-fourth of January, 1920, in the Charité hospital. Jeanne Hébuterne is nine months pregnant. She throws herself from a fifth-floor window the next morning. They are buried weeks apart in Père Lachaise. Their orphaned daughter is raised by his sister and will write the definitive biography sixty years later.",
  },
];

export default function ModiglianiCabinetPage() {
  const [activeKey, setActiveKey] = useState(CHAPTERS[3].key); // Portraits — where the works sit
  const active = CHAPTERS.find((c) => c.key === activeKey) ?? CHAPTERS[3];
  const pieces = paintingsByWing('/grand-hall/modigliani');
  const centerpiece = pieces.find(
    (p) => p.slug === 'modigliani-sitting-nude-with-crossed-hands',
  );
  const supporting = pieces.filter(
    (p) => p.slug !== 'modigliani-sitting-nude-with-crossed-hands',
  );

  return (
    <main className="relative min-h-screen overflow-hidden film-grain">
      <RotatingBackdrop
        leadIn={VIDEOS.modigliani.leadIn}
        rotation={VIDEOS.modigliani.rotation}
        overlay={0.6}
      />
      <div className="relative z-10 px-8 py-10">
        <Link
          href="/grand-hall"
          className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 hover:text-gold"
        >
          ← Back to the Grand Hall
        </Link>

        <header className="mx-auto mt-12 max-w-4xl text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
            Grand Hall · centre · Cabinet de Curiosités
          </p>
          <div className="mt-6 flex justify-center">
            <ArtistSignature artist={getArtist('modigliani')!} size="lg" asLink={false} showCaption={false} />
          </div>
          <p className="mt-4 font-display text-xl italic tracking-wider text-gold/85">
            thirty-five years · the elongated face · the lost Kiki nude
          </p>
          <div className="mx-auto mt-8 h-px w-24 bg-gold/40" />
          <p className="mx-auto mt-6 max-w-2xl font-body text-base italic leading-relaxed text-ivory/80">
            A small room off the Grand Hall. African masks under bevelled glass. Four
            Modigliani canvases on the wall — and at the centre, the Sitting Nude with
            Crossed Hands, the painting at the heart of the entire sale.
          </p>
        </header>

        {/* Chapter navigation */}
        <nav className="mx-auto mt-16 flex max-w-5xl flex-wrap justify-center gap-3">
          {CHAPTERS.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveKey(c.key)}
              className={`flex flex-col items-center rounded border px-5 py-3 text-center transition-all ${
                activeKey === c.key
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-ivory/15 bg-midnight/40 text-ivory/65 hover:border-gold/40 hover:text-gold'
              }`}
            >
              <span className="font-didot text-base tracking-widest">{c.eyebrow}</span>
              <span className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.25em]">
                {c.title}
              </span>
            </button>
          ))}
        </nav>

        {/* Active chapter narrative */}
        <article className="mx-auto mt-12 max-w-3xl space-y-6 text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
            Chapter {active.eyebrow}
          </p>
          <h2 className="font-didot text-4xl uppercase tracking-[0.12em] text-ivory drop-shadow">
            {active.title}
          </h2>
          <p className="font-display text-lg italic tracking-wider text-gold/80">
            {active.subtitle}
          </p>
          <div className="mx-auto h-px w-16 bg-gold/40" />
          <p className="mx-auto max-w-2xl font-body text-base leading-relaxed text-ivory/90">
            {active.body}
          </p>
        </article>

        {/* Centerpiece — Sitting Nude with Crossed Hands */}
        {centerpiece && (
          <section className="mx-auto mt-20 max-w-6xl">
            <div className="mb-6 text-center">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.5em] text-gold/85">
                The centrepiece · the painting at the heart of the sale
              </p>
            </div>
            <Link href={`/piece/${centerpiece.slug}`} className="group block">
              <article
                className="relative mx-auto"
                style={{
                  maxWidth: '46rem',
                  background:
                    'radial-gradient(ellipse at 50% 0%, rgba(255,210,140,0.45) 0%, rgba(232,200,122,0.18) 30%, transparent 60%)',
                  padding: '6rem 2rem 3rem',
                }}
              >
                {/* Brass picture light */}
                <div className="absolute left-1/2 top-6 z-20 -translate-x-1/2">
                  <div
                    className="h-3 w-40 rounded-full"
                    style={{
                      background:
                        'linear-gradient(180deg, #d4a64a 0%, #8a6020 60%, #4a3008 100%)',
                      boxShadow:
                        '0 4px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,220,150,0.7)',
                    }}
                  />
                  <div
                    className="absolute left-1/2 top-2 h-1.5 w-32 -translate-x-1/2 rounded-full"
                    style={{
                      background: 'rgba(255,210,140,0.95)',
                      boxShadow: '0 0 36px rgba(255,210,140,0.9)',
                    }}
                  />
                </div>

                {/* Painting in gilt frame */}
                {centerpiece.imageUrl && (
                  <div
                    className="relative mx-auto"
                    style={{
                      maxWidth: '34rem',
                      padding: '1.4rem',
                      background:
                        'linear-gradient(135deg, #d4a64a 0%, #8a6020 35%, #b08832 65%, #6a4815 100%)',
                      boxShadow:
                        '0 40px 80px -10px rgba(0,0,0,0.95), 0 0 100px -10px rgba(255,210,140,0.4), inset 0 1px 0 rgba(255,220,150,0.5), inset 0 -1px 0 rgba(40,20,5,0.6)',
                    }}
                  >
                    <div
                      className="overflow-hidden"
                      style={{
                        boxShadow:
                          'inset 0 0 0 2px rgba(40,25,10,0.9), inset 0 0 12px rgba(0,0,0,0.4)',
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={centerpiece.imageUrl}
                        alt={`${centerpiece.artist} — ${centerpiece.title}`}
                        className="block w-full"
                      />
                    </div>
                  </div>
                )}

                {/* Brass placard */}
                <div className="mt-8 text-center">
                  <div
                    className="inline-block rounded-sm px-8 py-3"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(212,175,55,0.22) 0%, rgba(40,30,15,0.7) 100%)',
                      border: '1px solid rgba(232,200,122,0.5)',
                      boxShadow:
                        '0 4px 12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,220,150,0.3)',
                    }}
                  >
                    <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/85">
                      Centrepiece · Cabinet de Curiosités
                    </p>
                    <h2 className="mt-2 font-didot text-2xl tracking-wider text-ivory md:text-3xl">
                      {centerpiece.artist} ·{' '}
                      <em className="font-display italic">{centerpiece.title}</em>
                    </h2>
                    <p className="mt-1 font-display italic text-gold/90">
                      {centerpiece.year} · {centerpiece.dimensions} · {centerpiece.medium}
                    </p>
                    {centerpiece.signed && (
                      <p className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.28em] text-ivory/70">
                        {centerpiece.signed}
                      </p>
                    )}
                    <p className="mt-3 font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/85 underline-offset-4 group-hover:underline">
                      Enter the dossier →
                    </p>
                  </div>
                </div>
              </article>
            </Link>
          </section>
        )}

        {/* The supporting works */}
        {supporting.length > 0 && (
          <section className="mx-auto mt-20 max-w-7xl">
            <p className="mb-6 text-center font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
              The supporting portraits · {supporting.length} works
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {supporting.map((p) => (
                <Link key={p.slug} href={`/piece/${p.slug}`} className="group">
                  <article className="marble flex h-full flex-col space-y-3 rounded-lg p-6 transition-all hover:scale-[1.02]">
                    {p.imageUrl ? (
                      <div
                        className="overflow-hidden rounded-sm"
                        style={{
                          padding: '0.6rem',
                          background:
                            'linear-gradient(135deg, #d4a64a 0%, #8a6020 50%, #6a4815 100%)',
                          boxShadow: 'inset 0 0 0 1px rgba(40,25,10,0.7)',
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.imageUrl}
                          alt={`${p.artist} — ${p.title}`}
                          className="block aspect-square w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className="flex aspect-square w-full items-center justify-center rounded-sm"
                        style={{
                          background:
                            'radial-gradient(ellipse at 50% 50%, rgba(60,40,15,0.7) 0%, rgba(20,12,5,0.9) 80%)',
                          border: '1px solid rgba(212,175,55,0.25)',
                        }}
                      >
                        <p className="font-display text-xs italic tracking-wider text-gold/60">
                          image under review
                        </p>
                      </div>
                    )}
                    <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-[#3a2a0a]">
                      {p.year}
                    </p>
                    <h3 className="font-didot text-lg leading-tight tracking-wide text-[#1a0e05]">
                      {p.title}
                    </h3>
                    <div className="h-px w-8 bg-[#5a3a1a]" />
                    <p className="font-body text-xs italic leading-relaxed text-[#2a1a05]">
                      {p.dimensions} · {p.medium}
                    </p>
                    <p className="font-body text-xs italic leading-relaxed text-[#3a2a0a]/85">
                      {p.inspirationNote}
                    </p>
                    <p className="pt-1 font-mono text-[0.55rem] uppercase tracking-[0.28em] text-[#3a2a0a] group-hover:underline">
                      Enter the piece →
                    </p>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
