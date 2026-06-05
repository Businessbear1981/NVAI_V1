'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';

const R2 = 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev';

interface Clip { src: string; label: string }
interface Section {
  id: string;
  label: string;
  subtitle: string;
  era: string;
  href: string;
  ctaLabel: string;
  clips: Clip[];
}

const SECTIONS: Section[] = [
  {
    id: 'picasso',
    label: 'Picasso',
    subtitle: 'By Period',
    era: '1881 – 1973',
    href: '/grounds/picasso',
    ctaLabel: 'Enter the Picasso wing →',
    clips: [
      { src: `${R2}/nvai_picasso_blue_period_5k.mp4`, label: 'Blue Period · 1901–1904' },
      { src: `${R2}/nvai_picasso_studio_5k.mp4`, label: 'Bateau-Lavoir · Montmartre' },
      { src: `${R2}/nvai_picasso_cubist_workshop_5k.mp4`, label: 'Cubism · 1907–1925' },
      { src: `${R2}/nvai_picasso_later_atelier_5k.mp4`, label: 'Late Period · Mougins' },
    ],
  },
  {
    id: 'chagall',
    label: 'Chagall',
    subtitle: 'By Period',
    era: '1887 – 1985',
    href: '/parlor/chagall',
    ctaLabel: 'Enter the Chagall parlor →',
    clips: [
      { src: `${R2}/nvai_chagall_vitebsk_5k.mp4`, label: 'Vitebsk · Russian Years' },
      { src: `${R2}/nvai_chagall_studio_5k.mp4`, label: 'Paris · La Ruche' },
      { src: `${R2}/cote-azur.mp4`, label: "Côte d'Azur · Color & Light" },
    ],
  },
  {
    id: 'kandinsky-modi',
    label: 'Kandinsky & Modi',
    subtitle: 'Featured',
    era: '1866–1944 · 1884–1920',
    href: '/grand-hall/modigliani',
    ctaLabel: 'Enter the Modigliani wing →',
    clips: [
      { src: `${R2}/nvai_kandinsky_studio_5k.mp4`, label: 'Kandinsky · The Strange Room' },
      { src: `${R2}/abstract-harmony.mp4`, label: 'Kandinsky · Abstract Harmony' },
      { src: `${R2}/nvai_modigliani_cafe_5k.mp4`, label: 'Modigliani · Montparnasse' },
      { src: `${R2}/nvai_modi_rotonde_night_5k.mp4`, label: 'Modigliani · La Rotonde' },
    ],
  },
  {
    id: 'others',
    label: 'The Collection',
    subtitle: 'By Period',
    era: 'Renaissance through 20th Century',
    href: '/gallery',
    ctaLabel: 'View the full gallery →',
    clips: [
      { src: `${R2}/nvai_monet_secret_garden_5k.mp4`, label: 'Monet · Giverny' },
      { src: `${R2}/nvai_matisse_studio_5k.mp4`, label: 'Matisse · Nice' },
      { src: `${R2}/casa-azul.mp4`, label: 'Frida Kahlo · Casa Azul' },
      { src: `${R2}/nvai_pollock_springs_studio_5k.mp4`, label: 'Pollock · Springs' },
      { src: `${R2}/nvai_leonardo_workshop_5k.mp4`, label: 'Da Vinci · Florence' },
    ],
  },
];

const TOTAL_CLIPS = SECTIONS.reduce((a, s) => a + s.clips.length, 0);

export default function GalleryHeroReel() {
  const [sectionIdx, setSectionIdx] = useState(0);
  const [clipIdx, setClipIdx] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const section = SECTIONS[sectionIdx];
  const clip = section.clips[clipIdx];

  const advance = useCallback(() => {
    const nextClip = clipIdx + 1;
    if (nextClip < SECTIONS[sectionIdx].clips.length) {
      setClipIdx(nextClip);
    } else {
      setSectionIdx((si) => (si + 1) % SECTIONS.length);
      setClipIdx(0);
    }
  }, [clipIdx, sectionIdx]);

  function jumpSection(idx: number) {
    setSectionIdx(idx);
    setClipIdx(0);
  }

  return (
    <div className="mx-auto mt-16 max-w-6xl">
      {/* Section tabs */}
      <div className="flex flex-wrap border border-gold/20 rounded-t-sm overflow-hidden">
        {SECTIONS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => jumpSection(i)}
            className={`flex-1 min-w-[100px] px-4 py-3 text-left transition-all border-r border-gold/20 last:border-r-0 ${
              i === sectionIdx
                ? 'bg-gold/15 text-gold'
                : 'bg-midnight/60 text-ivory/50 hover:text-ivory/80 hover:bg-gold/5'
            }`}
          >
            <span className="block font-mono text-[0.55rem] uppercase tracking-[0.32em]">{s.label}</span>
            <span className="block mt-0.5 font-mono text-[0.45rem] uppercase tracking-[0.28em] opacity-60">{s.subtitle}</span>
          </button>
        ))}
      </div>

      {/* Video */}
      <div className="relative overflow-hidden border-x border-gold/20 bg-midnight">
        <video
          key={`${sectionIdx}-${clipIdx}`}
          ref={videoRef}
          src={clip.src}
          autoPlay
          muted
          playsInline
          onEnded={advance}
          className="w-full aspect-video object-cover"
        />

        {/* Section badge — top right */}
        <div className="absolute top-4 right-4 pointer-events-none">
          <div className="bg-midnight/70 border border-gold/30 rounded-sm px-3 py-1.5 backdrop-blur-sm">
            <p className="font-mono text-[0.5rem] uppercase tracking-[0.38em] text-gold/70">
              Chapter {sectionIdx + 1} of {SECTIONS.length}
            </p>
          </div>
        </div>

        {/* Bottom gradient overlay — artist name + clip label */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-midnight/95 via-midnight/50 to-transparent pt-16 pb-5 px-6 pointer-events-none">
          <p className="font-mono text-[0.5rem] uppercase tracking-[0.42em] text-gold/65">
            {section.era}
          </p>
          <h2 className="mt-1 font-didot text-3xl uppercase tracking-[0.15em] text-ivory md:text-4xl">
            {section.label}
          </h2>
          <p className="mt-1 font-display text-sm italic tracking-wider text-gold/80">
            {clip.label}
          </p>
        </div>

        {/* Clip pips — bottom right */}
        <div className="absolute bottom-5 right-6 flex items-center gap-1.5 pointer-events-none">
          {section.clips.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === clipIdx ? 'w-5 h-1 bg-gold' : 'w-1 h-1 bg-ivory/25'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Footer bar */}
      <div className="flex items-center justify-between border-x border-b border-gold/20 bg-midnight/40 px-6 py-3 rounded-b-sm">
        <p className="font-mono text-[0.5rem] uppercase tracking-[0.38em] text-ivory/35">
          {TOTAL_CLIPS} cinematic views · all 11 artists
        </p>
        <Link
          href={section.href}
          className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/75 hover:text-gold transition-colors"
        >
          {section.ctaLabel}
        </Link>
      </div>
    </div>
  );
}
