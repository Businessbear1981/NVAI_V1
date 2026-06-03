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
    key: 'cody',
    eyebrow: 'I',
    title: 'Cody, Wyoming',
    subtitle: '1912 – 1930 · the West',
    body:
      "Born in Cody, Wyoming, the youngest of five brothers. The family moves through Arizona, California, the rural West. His father drinks and disappears. His mother takes the boys with her. The first images that stay with him are the Navajo and Hopi sand paintings of the Southwest — circular, performed on the ground, made and unmade as ritual. The drip floor work is already taking shape, forty years before it appears on canvas.",
  },
  {
    key: 'new-york',
    eyebrow: 'II',
    title: 'New York',
    subtitle: '1930 – 1945 · Benton · the WPA · Jung',
    body:
      "Moves to New York at eighteen to study under Thomas Hart Benton at the Art Students League. The regionalist murals he paints under Roosevelt's WPA pay the rent through the Depression. Severe alcoholic episodes through the late thirties. Begins Jungian analysis in 1939 — the unconscious as compositional material, the archetypes as form. Marries Lee Krasner in October 1945. They take a thousand-dollar loan from Peggy Guggenheim and buy a wood-frame house in Springs, on the far end of Long Island.",
  },
  {
    key: 'springs',
    eyebrow: 'III',
    title: 'Springs',
    subtitle: '1950 · the drip-paint apex · the year Cathleen wrote',
    body:
      "Converts the barn at Springs into a studio. Lays the canvas flat on the floor — the way the Navajo sand painters had — and pours enamel directly from sticks and basting syringes, the brush never touching the surface. Lavender Mist, Autumn Rhythm, One: Number 31, Number 2 — four canvases the size of city walls, all made in the same calendar year. Hans Namuth films him at work. Cathleen McGuigan would call him, in Time that summer, the greatest living painter in America. 1950 is the only year he does not drink. The two canvases on offer here are from this summer.",
  },
  {
    key: 'the-end',
    eyebrow: 'IV',
    title: 'The end',
    subtitle: '1951 – 1956 · the black paintings · the car',
    body:
      "By 1951 he is drinking again, badly. The black-and-white enamel paintings of 1951–52 are darker and figurative, as though the unconscious is closing back up. Less work, more drinking, an affair with Ruth Kligman. On the eleventh of August 1956 he drives his Oldsmobile drunk on a country road near Springs and crashes it into a tree. Forty-four years old. Lee Krasner spends the next thirty years guarding the work.",
  },
];

export default function PollockStudioPage() {
  const [activeKey, setActiveKey] = useState(CHAPTERS[2].key); // Springs — where the 1950 pieces sit
  const active = CHAPTERS.find((c) => c.key === activeKey) ?? CHAPTERS[2];
  const pieces = paintingsByWing('/grand-hall/pollock');
  const centerpiece = pieces.find((p) => p.slug === 'pollock-number-2-1950');
  const supporting = pieces.filter((p) => p.slug !== 'pollock-number-2-1950');

  return (
    <main className="relative min-h-screen overflow-hidden film-grain">
      <RotatingBackdrop
        leadIn={VIDEOS.pollock.leadIn}
        rotation={VIDEOS.pollock.rotation}
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
            Grand Hall · centre-right · the Pollock Studio
          </p>
          <div className="mt-6 flex justify-center">
            <ArtistSignature artist={getArtist('pollock')!} size="lg" asLink={false} showCaption={false} />
          </div>
          <p className="mt-4 font-display text-xl italic tracking-wider text-gold/85">
            forty-four years · the floor as canvas · two pieces from 1950
          </p>
          <div className="mx-auto mt-8 h-px w-24 bg-gold/40" />
          <p className="mx-auto mt-6 max-w-2xl font-body text-base italic leading-relaxed text-ivory/80">
            A studio room off the Grand Hall. The barn at Springs reconstructed in
            sound and shadow. Two heavy-drip canvases on the wall — both painted in
            the summer of 1950, the only year he was sober, the year Time magazine
            named him the greatest living painter in America.
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

        {/* Bernard narrative card — Sotheby's voice, Springs apex */}
        <section className="mx-auto mt-16 max-w-3xl">
          <div
            className="marble rounded-lg px-8 py-6"
            style={{
              boxShadow:
                '0 20px 60px -20px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,220,150,0.2)',
            }}
          >
            <p className="text-center font-mono text-[0.55rem] uppercase tracking-[0.4em] text-[#3a2a0a]">
              Bernard · in the voice of the Sotheby's expert
            </p>
            <div className="mx-auto mt-4 h-px w-12 bg-[#5a3a1a]/60" />
            <p className="mt-5 font-body text-base italic leading-relaxed text-[#1a0e05]">
              "We are inside the barn at Springs, on the far eastern end of Long
              Island, in the summer of nineteen fifty — the year Jackson Pollock
              laid the canvas flat on the floor and poured enamel directly from the
              stick, the year Lee Krasner finally got him sober, the year Hans
              Namuth's camera was running in the doorway. Four canvases came out
              of that summer: Lavender Mist, Autumn Rhythm, One: Number thirty-one,
              and the heavy-drip Number Two you see at the centre of this room.
              That August Cathleen McGuigan wrote the Time profile that named him
              the greatest living painter in America. He had six years left to live."
            </p>
          </div>
        </section>

        {/* Centerpiece — Number 2 (1950) — the canvas with an image on record */}
        {centerpiece && (
          <section className="mx-auto mt-20 max-w-6xl">
            <div className="mb-6 text-center">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.5em] text-gold/85">
                The centrepiece · 1950 · the heavy-drip apex
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
                      Centrepiece · The Pollock Studio
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

        {/* Supporting work — Number 1 (Lavender Mist), placeholder card */}
        {supporting.length > 0 && (
          <section className="mx-auto mt-20 max-w-7xl">
            <p className="mb-6 text-center font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
              The companion canvas · same summer · 1950
            </p>
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-1">
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
