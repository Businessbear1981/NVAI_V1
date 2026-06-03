'use client';

import { useState } from 'react';
import Link from 'next/link';
import CinematicBackdrop from '@/components/cinematic/CinematicBackdrop';
import { paintingsByWing } from '@/lib/paintings';
import ArtistSignature from '@/components/brand/ArtistSignature';
import { getArtist } from '@/lib/artists';

const CHAPTERS = [
  {
    key: 'casa',
    eyebrow: 'I',
    title: 'Casa Azul',
    subtitle: 'Coyoacán · 1907 · the cobalt house',
    body:
      'Born July 1907 in the blue house her father built on the corner of Allende and Londres, in the Coyoacán neighbourhood of Mexico City. Polio at six left her right leg thinner. She climbed trees with the boys. Studied at the elite Escuela Nacional Preparatoria, one of thirty-five girls in a school of two thousand.',
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/casa-azul-awakening.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/coyoacan.mp4', 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/casa-azul.mp4'],
  },
  {
    key: 'accident',
    eyebrow: 'II',
    title: 'The Accident',
    subtitle: '17 September 1925 · the bus and the streetcar',
    body:
      'Eighteen years old. A wooden bus collides with a streetcar. A handrail spears her body from hip through pelvis. Three months in hospital. A year in a body cast. She starts painting flat on her back in bed, using a mirror suspended over her face. She paints herself because she is the subject she knows best.',
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/hospital-rooms.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/pain-suffering.mp4'],
  },
  {
    key: 'diego',
    eyebrow: 'III',
    title: 'Diego',
    subtitle: 'Married 1929 · divorced 1939 · remarried 1940',
    body:
      'Diego Rivera was twenty-one years older, three hundred pounds heavier, and the most famous painter in Mexico. Married 21 August 1929. Lived in two houses connected by a bridge. He was constantly unfaithful. She slept with men and women. They divorced in 1939 — La Mesa Herida was painted in the divorce year, full of the wounded animals and the empty chair. They remarried in 1940 on her terms: separate bedrooms, separate finances.',
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/diego-love.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/mexican-folk.mp4'],
  },
  {
    key: 'late',
    eyebrow: 'IV',
    title: 'The Late Years',
    subtitle: '1940–1954 · her amputation · her death',
    body:
      'Right leg amputated below the knee 1953. She paints from her bed, surrounded by the Indigenous textiles, votives, milagros, and parrots she had collected all her life. Her last diary entry, July 1954: "I hope the exit is joyful — and I hope never to return." She is forty-seven.',
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/xochimilco.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nature-jungle.mp4', 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/pain-suffering.mp4'],
  },
];

export default function FridaWingPage() {
  const [activeKey, setActiveKey] = useState(CHAPTERS[2].key); // Diego — where La Mesa Herida lives
  const active = CHAPTERS.find((c) => c.key === activeKey) ?? CHAPTERS[2];
  const pieces = paintingsByWing('/grounds/frida');

  return (
    <main className="relative min-h-screen overflow-hidden film-grain">
      <CinematicBackdrop videoSrc={active.video} overlay={0.55} />
      <div className="relative z-10 px-8 py-10">
        <Link href="/grounds" className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 hover:text-gold">
          ← Back to the grounds
        </Link>
        <header className="mx-auto mt-12 max-w-4xl text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">The Guest House</p>
          <div className="mt-6 flex justify-center">
            <ArtistSignature artist={getArtist('kahlo')!} size="lg" asLink={false} showCaption={false} />
          </div>
          <p className="mt-4 font-display text-xl italic tracking-wider text-gold/85">
            forty-seven years · one hundred and forty-three paintings · fifty-five self-portraits
          </p>
          <div className="mx-auto mt-8 h-px w-24 bg-gold/40" />
        </header>
        <nav className="mx-auto mt-16 flex max-w-5xl flex-wrap justify-center gap-3">
          {CHAPTERS.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveKey(c.key)}
              className={`flex flex-col items-center rounded border px-5 py-3 text-center transition-all ${
                activeKey === c.key ? 'border-gold bg-gold/10 text-gold' : 'border-ivory/15 bg-midnight/40 text-ivory/65 hover:border-gold/40 hover:text-gold'
              }`}
            >
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
            The piece on offer · the divorce year
          </p>
          {pieces.map((p) => (
            <Link key={p.slug} href={`/piece/${p.slug}`}>
              <article className="marble rounded-lg p-8 space-y-3 transition-all hover:scale-[1.02]">
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">{p.year}</p>
                <h3 className="font-didot text-2xl tracking-wider text-ivory">{p.title}</h3>
                <div className="h-px w-12 bg-gold/40" />
                <p className="font-body text-sm italic text-ivory/75">{p.inspirationNote}</p>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-gold/80 pt-2">Enter the piece →</p>
              </article>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
