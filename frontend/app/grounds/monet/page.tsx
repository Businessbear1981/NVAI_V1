'use client';

import { useState } from 'react';
import Link from 'next/link';
import CinematicBackdrop from '@/components/cinematic/CinematicBackdrop';
import { paintingsByWing } from '@/lib/paintings';
import ArtistSignature from '@/components/brand/ArtistSignature';
import { getArtist } from '@/lib/artists';

const R2 = 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev';

interface Chapter {
  key: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  body: string;
  video: string;
}

const CHAPTERS: Chapter[] = [
  {
    key: 'giverny',
    eyebrow: 'I',
    title: 'Giverny',
    subtitle: '1883 – 1926 · forty-three years in one garden',
    body:
      "He arrived at the rented pink house on the Rue du Chemin du Roy in the spring of 1883 with Alice Hoschedé and eight children between them. He bought it nine years later with the money from the Boulevard des Capucines. He dug the lily pond himself, diverted the Ru tributary against the protests of the local council, planted the wisteria over the Japanese bridge and the iris paths down to the water. The garden became the only subject he had left.",
    video: `${R2}/nvai_monet_secret_garden_5k.mp4`,
  },
  {
    key: 'nympheas',
    eyebrow: 'II',
    title: 'The Water Lilies',
    subtitle: 'Nymphéas · thirty years on one pond',
    body:
      "Two hundred and fifty canvases of the same water. He began the series in 1897 and was still painting it the morning he died in December 1926. The great Orangerie murals, eight panels almost a hundred metres long, he donated to the French nation the day after the Armistice — a peace offering for a country that had lost a generation. He worked on them in a custom-built studio behind the house until his hands could no longer hold the brush straight.",
    video: `${R2}/nvai_monet_moonlit_nympheas_5k.mp4`,
  },
  {
    key: 'failing',
    eyebrow: 'III',
    title: 'The Failing Sight',
    subtitle: 'Cataracts · 1908 – 1923 · going mad with colour',
    body:
      "In 1908 he wrote to Durand-Ruel that the colours had begun to lie to him. By 1912 the diagnosis was nuclear cataract in both eyes. He could no longer distinguish blue from green; the late Nymphéas grew muddy, red, swimming. He refused surgery for eleven years, terrified of losing what little vision remained. In 1923, at eighty-two, Dr. Charles Coutela operated on his right eye. He wept when the cobalt came back. He painted for three more years and then he was gone.",
    video: `${R2}/nvai_monet_failing_sight_5k.mp4`,
  },
  {
    key: 'lavacourt',
    eyebrow: 'IV',
    title: 'La berge de Lavacourt sous la neige',
    subtitle: 'Winter 1879 · the year Camille died',
    body:
      "Before Giverny there was Vétheuil, and at Vétheuil there was Camille. She died in the upstairs bedroom on the fifth of September 1879 of uterine cancer, thirty-two years old, leaving Monet with two small sons and no money — Ernest Hoschedé's bankruptcy had taken the household down with it. The winter that followed was the coldest in France in eighty years. The Seine froze. Monet painted from the windows of the rented house at Vétheuil across to the snowbound bank of Lavacourt on the far side. This canvas is one of those paintings. It is grief made into a landscape.",
    video: `${R2}/nvai_monet_rolling_hills_5k.mp4`,
  },
];

export default function MonetWingPage() {
  const [activeKey, setActiveKey] = useState<string>(CHAPTERS[3].key); // Open on the centrepiece chapter
  const active = CHAPTERS.find((c) => c.key === activeKey) ?? CHAPTERS[3];
  const pieces = paintingsByWing('/grounds/monet');
  const centerpiece = pieces.find((p) => p.slug === 'monet-lavacourt-neige');

  return (
    <main className="relative min-h-screen overflow-hidden film-grain">
      <CinematicBackdrop videoSrc={active.video} overlay={0.6} />

      <div className="relative z-10 px-8 py-10">
        <Link
          href="/grounds"
          className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 hover:text-gold"
        >
          ← Back to the grounds
        </Link>

        <header className="mx-auto mt-12 max-w-4xl text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
            The Grounds · the Giverny pavilion
          </p>
          <div className="mt-6 flex justify-center">
            <ArtistSignature artist={getArtist('monet')!} size="lg" asLink={false} showCaption={false} />
          </div>
          <p className="mt-4 font-display text-xl italic tracking-wider text-gold/85">
            Giverny · the Nymphéas · the cataract years · a winter at Lavacourt
          </p>
          <div className="mx-auto mt-8 h-px w-24 bg-gold/40" />
          <p className="mx-auto mt-6 max-w-2xl font-body text-base italic leading-relaxed text-ivory/80">
            A garden he made and painted in turn for forty-three years. A pond he watched until his
            eyes failed him. And before all of it — Vétheuil, the winter Camille died, and the snow
            on the far bank at Lavacourt.
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

        {/* Centerpiece — La berge de Lavacourt sous la neige */}
        {centerpiece && (
          <section className="mx-auto mt-20 max-w-6xl">
            <div className="mb-6 text-center">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.5em] text-gold/85">
                The centrepiece · the painting on offer
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

                {/* Brass tombstone placard */}
                <div className="mt-8 text-center">
                  <div
                    className="inline-block rounded-sm px-8 py-4"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(212,175,55,0.22) 0%, rgba(40,30,15,0.7) 100%)',
                      border: '1px solid rgba(232,200,122,0.5)',
                      boxShadow:
                        '0 4px 12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,220,150,0.3)',
                    }}
                  >
                    <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/85">
                      Centrepiece · Giverny Pavilion
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
                    <p className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.28em] text-ivory/70">
                      Viewing · {centerpiece.viewingLocation}
                    </p>
                    <p className="mt-3 font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/85 underline-offset-4 group-hover:underline">
                      Enter the dossier →
                    </p>
                  </div>
                </div>
              </article>
            </Link>
          </section>
        )}

        {/* Bernard closing whisper */}
        <p className="mx-auto mt-16 max-w-2xl text-center font-body text-sm italic leading-relaxed text-ivory/70">
          &ldquo;He painted the same pond two hundred and fifty times. He was not painting the
          pond. He was painting the hour, and the year, and his eyes failing. By the end he could
          not see the colour he was putting down. He put it down anyway.&rdquo;
          <span className="mt-3 block font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/65">
            Bernard · the Giverny pavilion
          </span>
        </p>
      </div>
    </main>
  );
}
