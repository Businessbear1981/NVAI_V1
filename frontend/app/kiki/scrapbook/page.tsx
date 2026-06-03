'use client';

import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { useState } from 'react';
import CinematicBackdrop from '@/components/cinematic/CinematicBackdrop';
import { KIKI_PHOTOS, KIKI_PHOTO_COUNT } from '@/lib/kikiScrapbook';

const R2 = 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev';
// Local-first — R2 sculpture path was not resolving. Local copy is in /public/sculptures.
const SCULPTURE_GLB = `/sculptures/kiki.glb`;
const SCULPTURE_POSTER = `/sculptures/kiki-preview.png`;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          poster?: string;
          alt?: string;
          'auto-rotate'?: boolean;
          'camera-controls'?: boolean;
          'shadow-intensity'?: string | number;
          'shadow-softness'?: string | number;
          exposure?: string | number;
          'environment-image'?: string;
          'auto-rotate-delay'?: string | number;
          'rotation-per-second'?: string;
          'interaction-prompt'?: string;
          loading?: string;
          reveal?: string;
        },
        HTMLElement
      >;
    }
  }
}

// Chapter structure — Kiki as multidimensional artist, not cabaret girl.
// Pages 1-4 from Richard's PDF are introduction/cover material.
// Pages 5-9 are her early Montparnasse years and Man Ray collaboration (THE MUSE).
// Pages 10-13 are her painting, modeling, the studios (THE PAINTER & MODEL).
// Pages 14-15 are the memoirs, Hemingway preface, literary record (THE AUTHOR).
// Pages 16-17 are the final years, legacy, the burial (THE QUEEN).
const CHAPTERS = [
  {
    title: 'I · The Muse',
    eyebrow: 'Chapter One',
    subtitle: 'Montparnasse, 1921. Man Ray finds his subject.',
    pageRange: [1, 9] as const,
    body: 'Before she was a dancer, she was an image. Kiki posed for Man Ray in the studio at rue Campagne-Première — the great photographs that would become Le Violon d’Ingres, Noire et Blanche, the back as a violin, the face beside the African mask. She was not the model; she was the photograph itself.',
  },
  {
    title: 'II · The Painter',
    eyebrow: 'Chapter Two',
    subtitle: 'Kiki at the easel. Modigliani at the door.',
    pageRange: [10, 13] as const,
    body: 'She painted. She sold her work on the boulevard. She drank with Modigliani at La Rotonde and sat for him in the small hours when the studios were empty. The men who painted her also taught her to paint, and what she produced in oil is held now in private collections from Paris to Geneva.',
  },
  {
    title: 'III · The Author',
    eyebrow: 'Chapter Three',
    subtitle: 'Souvenirs de Kiki, 1929. Preface by Ernest Hemingway.',
    pageRange: [14, 15] as const,
    body: 'In 1929 she published her memoirs. Hemingway wrote the preface. Picasso called her work a record of a Paris that would never come again. She wrote in the voice of a woman who had loved Foujita, who had been painted by Soutine, who had sung at Le Jockey and walked home alone at dawn.',
  },
  {
    title: 'IV · The Queen',
    eyebrow: 'Chapter Four',
    subtitle: 'Queen of Montparnasse. 1901 — 1953.',
    pageRange: [16, 17] as const,
    body: 'They crowned her Queen of Montparnasse in 1929 at a ball at the Café du Dôme. She was twenty-eight. When she died in 1953 the funeral procession ran the length of the Boulevard du Montparnasse, and the cortege carried her past every café in which she had ever sat. She was their muse. She was their painter. She was their queen.',
  },
];

const STAT_LINE = [
  { value: 'Muse', label: 'to Man Ray, Foujita, Soutine' },
  { value: 'Author', label: 'Souvenirs, 1929 — preface by Hemingway' },
  { value: 'Painter', label: 'exhibited boulevard Montparnasse' },
  { value: 'Singer', label: 'Le Jockey, Le Boœuf sur le Toit' },
];

export default function KikiScrapbookPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const photosByChapter = CHAPTERS.map((chapter) => ({
    chapter,
    photos: KIKI_PHOTOS.filter(
      (p) => p.pageRef >= chapter.pageRange[0] && p.pageRef <= chapter.pageRange[1]
    ),
  }));

  function openLightbox(filename: string) {
    const idx = KIKI_PHOTOS.findIndex((p) => p.filename === filename);
    if (idx >= 0) setLightboxIndex(idx);
  }
  function closeLightbox() {
    setLightboxIndex(null);
  }
  function navigateLightbox(direction: 1 | -1) {
    if (lightboxIndex === null) return;
    const next = (lightboxIndex + direction + KIKI_PHOTOS.length) % KIKI_PHOTOS.length;
    setLightboxIndex(next);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0605] film-grain">
      {/* model-viewer web component — loads only on this page */}
      <Script
        type="module"
        src="https://unpkg.com/@google/model-viewer@4.0.0/dist/model-viewer.min.js"
        strategy="afterInteractive"
      />
      <CinematicBackdrop
        fallbackGradient="radial-gradient(ellipse at 50% 30%, rgba(232,200,122,0.08) 0%, transparent 55%), linear-gradient(180deg, #14100a 0%, #1c160c 40%, #0a0605 100%)"
        overlay={0.85}
      />

      <div className="relative z-10 px-6 py-10 md:px-12">
        <Link
          href="/kiki"
          className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 transition-colors hover:text-gold"
        >
          ← The Kiki Wing
        </Link>

        {/* ============== HERO ============== */}
        <header className="mx-auto mt-16 max-w-4xl text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
            The Private Scrapbook
          </p>
          <h1 className="mt-4 font-didot text-5xl uppercase tracking-[0.14em] text-ivory md:text-7xl">
            Kiki
          </h1>
          <p className="mt-4 font-display text-2xl italic tracking-wider text-gold/80 md:text-3xl">
            Queen of Montparnasse
          </p>
          <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.4em] text-ivory/60">
            1901 — 1953
          </p>
          <div className="mx-auto mt-8 h-px w-24 bg-gold/40" />
          <p className="mx-auto mt-8 max-w-2xl font-body italic leading-relaxed text-ivory/85">
            Sixty-three photographs and documents from the private archive of Richard Triberg.
            Published here for the first time. The full story of the woman the cafés of Paris
            crowned Queen — not the cabaret girl of the postcards, but the muse, the
            painter, the memoirist, and the friend of every painter who mattered.
          </p>
        </header>

        {/* ============== KIKI THE QUEEN — 4 IDENTITIES ============== */}
        <section className="mx-auto mt-20 max-w-5xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {STAT_LINE.map((s) => (
              <div key={s.value} className="text-center">
                <p className="font-didot text-2xl uppercase tracking-[0.16em] text-gold md:text-3xl">
                  {s.value}
                </p>
                <p className="mt-3 font-body text-xs italic text-ivory/65">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============== THE SCULPTURE PEDESTAL — BONUS WITH SCRAPBOOK ============== */}
        <section className="mx-auto mt-24 max-w-4xl">
          <div className="text-center">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
              Bonus · Included with the Scrapbook
            </p>
            <h2 className="mt-4 font-didot text-3xl uppercase tracking-[0.14em] text-ivory md:text-4xl">
              The Bronze
            </h2>
            <p className="mt-4 font-display italic tracking-wider text-gold/75">
              Three-dimensional sculpture, after Man Ray
            </p>
            <div className="mx-auto mt-6 h-px w-16 bg-gold/40" />
            <p className="mx-auto mt-6 max-w-xl font-body italic leading-relaxed text-ivory/85">
              Every numbered scrapbook ships with a hand-cast bronze relief of Kiki —
              modeled directly from Noire et Blanche, 1926. Sculpted in the Paris studio.
              Authenticated edition certificate enclosed.
            </p>
          </div>

          {/* Pedestal — 3D Meshy sculpture (auto-rotating) */}
          <div className="relative mt-12 mx-auto max-w-2xl">
            <div
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 70% 50% at 50% 80%, rgba(232,200,122,0.18) 0%, transparent 70%)',
              }}
            />
            <div className="relative h-[560px] w-full rounded-lg bg-gradient-to-b from-black/20 to-black/60 ring-1 ring-gold/20 overflow-hidden">
              {/* @ts-expect-error model-viewer is a web component */}
              <model-viewer
                src={SCULPTURE_GLB}
                poster={SCULPTURE_POSTER}
                alt="Kiki of Montparnasse — three-dimensional sculpture from Man Ray's Noire et Blanche"
                auto-rotate
                camera-controls
                shadow-intensity="1.2"
                shadow-softness="0.8"
                exposure="0.95"
                rotation-per-second="20deg"
                interaction-prompt="none"
                loading="lazy"
                reveal="auto"
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'transparent',
                  '--poster-color': 'transparent',
                } as React.CSSProperties}
              />
            </div>
            <div className="mt-6 text-center">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-ivory/55">
                Drag to rotate · Scroll to zoom · A scrapbook bonus
              </p>
            </div>
          </div>
        </section>

        {/* ============== THE FOUR CHAPTERS ============== */}
        {photosByChapter.map(({ chapter, photos }, chapterIdx) => (
          <section
            key={chapter.title}
            className="mx-auto mt-28 max-w-6xl"
          >
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
                {chapter.eyebrow}
              </p>
              <h2 className="mt-4 font-didot text-3xl uppercase tracking-[0.14em] text-ivory md:text-5xl">
                {chapter.title}
              </h2>
              <p className="mt-4 font-display italic tracking-wider text-gold/75">
                {chapter.subtitle}
              </p>
              <div className="mx-auto mt-6 h-px w-16 bg-gold/40" />
              <p className="mx-auto mt-8 max-w-2xl font-body italic leading-relaxed text-ivory/85">
                {chapter.body}
              </p>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {photos.map((photo) => (
                <button
                  key={photo.filename}
                  type="button"
                  onClick={() => openLightbox(photo.filename)}
                  className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-black/30 ring-1 ring-gold/15 transition-all hover:ring-gold/50 hover:shadow-2xl"
                >
                  <Image
                    src={photo.src}
                    alt={`Kiki archive, page ${photo.pageRef}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover sepia-[0.15] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                </button>
              ))}
            </div>

            {chapterIdx < CHAPTERS.length - 1 && (
              <div className="mx-auto mt-24 h-px w-32 bg-gold/30" />
            )}
          </section>
        ))}

        {/* ============== ACQUIRE ============== */}
        <section className="mx-auto mt-32 max-w-3xl text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
            Acquire
          </p>
          <h2 className="mt-4 font-didot text-4xl uppercase tracking-[0.14em] text-ivory md:text-5xl">
            The Scrapbook
          </h2>
          <p className="mt-4 font-display italic tracking-wider text-gold/80">
            Hand-bound · Limited Edition · {KIKI_PHOTO_COUNT} plates
          </p>
          <div className="mx-auto mt-6 h-px w-16 bg-gold/40" />
          <p className="mx-auto mt-8 max-w-xl font-body italic leading-relaxed text-ivory/85">
            Cloth-bound in midnight buckram, gold-stamped, slip-cased. Each volume
            individually numbered. Foreword by Richard Triberg from the original Paris
            archive. Available exclusively to NVAI counterparties under DDNDA.
          </p>
          <div className="mt-10">
            <Link
              href="/inquire?painting=kiki-scrapbook"
              className="inline-block rounded-full border border-gold/50 bg-gold/10 px-10 py-4 font-mono text-[0.7rem] uppercase tracking-[0.32em] text-gold transition-all hover:border-gold hover:bg-gold/20"
            >
              Inquire
            </Link>
          </div>
          <p className="mt-6 font-body text-xs italic text-ivory/50">
            Pricing on application · Concierge: Bernard
          </p>
        </section>

        <div className="h-24" />
      </div>

      {/* ============== LIGHTBOX ============== */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute right-6 top-6 font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/70 transition-colors hover:text-gold"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
          >
            Close
          </button>
          <button
            type="button"
            className="absolute left-6 top-1/2 -translate-y-1/2 font-didot text-3xl text-ivory/60 transition-colors hover:text-gold"
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox(-1);
            }}
          >
            ←
          </button>
          <button
            type="button"
            className="absolute right-6 top-1/2 -translate-y-1/2 font-didot text-3xl text-ivory/60 transition-colors hover:text-gold"
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox(1);
            }}
          >
            →
          </button>
          <div
            className="relative max-h-[88vh] max-w-[88vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={KIKI_PHOTOS[lightboxIndex].src}
              alt={`Kiki archive ${KIKI_PHOTOS[lightboxIndex].filename}`}
              className="max-h-[88vh] max-w-[88vw] object-contain shadow-2xl ring-1 ring-gold/30"
            />
            <p className="mt-4 text-center font-mono text-[0.55rem] uppercase tracking-[0.32em] text-ivory/50">
              From the Richard Triberg archive · Page {KIKI_PHOTOS[lightboxIndex].pageRef} · Plate {lightboxIndex + 1} of {KIKI_PHOTOS.length}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
