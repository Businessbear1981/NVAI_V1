'use client';

import { useState } from 'react';
import Link from 'next/link';
import RotatingBackdrop from '@/components/cinematic/RotatingBackdrop';
import ArtistSignature from '@/components/brand/ArtistSignature';
import { paintingsByWing } from '@/lib/paintings';
import { getArtist } from '@/lib/artists';
import { VIDEOS } from '@/lib/videoMap';

const CHAPTERS = [
  {
    key: 'moscow',
    eyebrow: 'I',
    title: 'Moscow',
    subtitle: '1866 – 1896 · the law years',
    body:
      'Born in Moscow to a tea merchant. Trained as a lawyer, accepted a professorship at thirty. In 1895 he saw a Monet Haystacks at a Moscow exhibition and could not name the subject — the colour alone struck him. He resigned the chair and moved to Munich to study painting. He was thirty years old and starting over.',
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/moscow.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/russian-folk.mp4'],
  },
  {
    key: 'munich',
    eyebrow: 'II',
    title: 'Munich',
    subtitle: '1896 – 1914 · Murnau and the Blue Rider',
    body:
      "Studied at the Munich Academy. By 1908, summers in Murnau with Gabriele Münter — the threshold of abstraction. 1910: he writes On the Spiritual in Art and produces what is often called the first purely abstract watercolour. 1911: co-founds Der Blaue Reiter with Franz Marc. The Composition (1910) on offer here is from this exact moment — the painted music starts.",
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/munich.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/music-synesthesia.mp4', 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/theosophy.mp4'],
  },
  {
    key: 'russia',
    eyebrow: 'III',
    title: 'Russia again',
    subtitle: '1914 – 1921 · the Revolution',
    body:
      'Trapped in Russia by the outbreak of war in 1914. Marries Nina Andreyevskaya. The Revolution. Brief Commissar of Fine Arts appointment under Lunacharsky. Reorganises Russian museums. Becomes disillusioned with the materialist turn in Constructivism, and in 1921 escapes back to Germany.',
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/russian-folk.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/moscow.mp4'],
  },
  {
    key: 'bauhaus',
    eyebrow: 'IV',
    title: 'Bauhaus',
    subtitle: '1922 – 1933 · Weimar · Dessau',
    body:
      "Teaches at the Bauhaus for eleven years. Geometric period sharpens: circle, triangle, line. Writes Point and Line to Plane. Friendships with Klee, Schoenberg, Albers. The Nazis close the Bauhaus in 1933 and label his work 'degenerate.'",
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/geometry-harmony.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/abstract-harmony.mp4', 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nature-geometry.mp4'],
  },
  {
    key: 'paris',
    eyebrow: 'V',
    title: 'Paris',
    subtitle: '1933 – 1944 · Neuilly-sur-Seine',
    body:
      'Flees to Paris. Biomorphic forms creep into the late paintings — softer, embryonic, alive. Dies in Neuilly in 1944. His Composition VII at the Tretyakov is now considered one of the founding documents of twentieth-century abstraction.',
    video: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/abstract-harmony.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/music-synesthesia.mp4'],
  },
];

const GILT_FRAME = {
  padding: '1.4rem',
  background: 'linear-gradient(135deg, #d4a64a 0%, #8a6020 35%, #b08832 65%, #6a4815 100%)',
  boxShadow: '0 40px 80px -10px rgba(0,0,0,0.95), 0 0 100px -10px rgba(255,210,140,0.4), inset 0 1px 0 rgba(255,220,150,0.5), inset 0 -1px 0 rgba(40,20,5,0.6)',
};

export default function KandinskyWingPage() {
  const [activeKey, setActiveKey] = useState(CHAPTERS[1].key);
  const active = CHAPTERS.find((c) => c.key === activeKey) ?? CHAPTERS[1];
  const artist = getArtist('kandinsky');
  const pieces = paintingsByWing('/upstairs/kandinsky');
  const centerpiece = pieces.find((p) => p.imageUrl);
  const supporting = pieces.filter((p) => p !== centerpiece);

  return (
    <main className="relative min-h-screen overflow-hidden film-grain">
      <RotatingBackdrop leadIn={active.video} rotation={active.rotation} overlay={0.55} />
      <div className="relative z-10 px-8 py-10">
        <Link href="/foyer/staircase" className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 hover:text-gold">
          ← Back to the staircase
        </Link>

        <header className="mx-auto mt-12 max-w-4xl text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">Upstairs Center · the strange room</p>
          <h1 className="mt-6 font-didot text-6xl uppercase tracking-[0.12em] text-ivory drop-shadow-lg md:text-7xl">
            Kandinsky
          </h1>
          <p className="mt-4 font-display text-xl italic tracking-wider text-gold/85">
            seventy-eight years · law to abstraction · the painted music
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

        {/* Centerpiece painting — gilt frame + brass light */}
        {centerpiece && (
          <section className="mx-auto mt-20 max-w-6xl">
            <div className="mb-6 text-center">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.5em] text-gold/85">
                The piece on offer · {centerpiece.year}
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
                <div className="relative mx-auto" style={{ maxWidth: '34rem', ...GILT_FRAME }}>
                  <div className="overflow-hidden" style={{ boxShadow: 'inset 0 0 0 2px rgba(40,25,10,0.9), inset 0 0 12px rgba(0,0,0,0.4)' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={centerpiece.imageUrl} alt={`${centerpiece.artist} — ${centerpiece.title}`} className="block w-full" />
                  </div>
                </div>
                {/* Brass placard */}
                <div className="mt-8 text-center">
                  <div className="inline-block rounded-sm px-8 py-3" style={{ background: 'linear-gradient(180deg, rgba(212,175,55,0.22) 0%, rgba(40,30,15,0.7) 100%)', border: '1px solid rgba(232,200,122,0.5)', boxShadow: '0 4px 12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,220,150,0.3)' }}>
                    <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/85">Upstairs Center · The Strange Room</p>
                    <h2 className="mt-2 font-didot text-2xl tracking-wider text-ivory md:text-3xl">
                      {centerpiece.artist} · <em className="font-display italic">{centerpiece.title}</em>
                    </h2>
                    <p className="mt-1 font-display italic text-gold/90">{centerpiece.year} · {centerpiece.dimensions} · {centerpiece.medium}</p>
                    <p className="mt-3 font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/85 group-hover:underline underline-offset-4">Enter the piece →</p>
                  </div>
                </div>
              </article>
            </Link>
          </section>
        )}

        {/* Supporting works */}
        {supporting.length > 0 && (
          <section className="mx-auto mt-16 max-w-5xl">
            <p className="mb-6 text-center font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
              Also on offer · {supporting.length} {supporting.length === 1 ? 'work' : 'works'}
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {supporting.map((p) => (
                <Link key={p.slug} href={`/piece/${p.slug}`} className="group">
                  <article className="marble flex h-full flex-col space-y-3 rounded-lg p-6 transition-all hover:scale-[1.02]">
                    {p.imageUrl ? (
                      <div className="overflow-hidden rounded-sm" style={{ padding: '0.6rem', background: 'linear-gradient(135deg, #d4a64a 0%, #8a6020 50%, #6a4815 100%)', boxShadow: 'inset 0 0 0 1px rgba(40,25,10,0.7)' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.imageUrl} alt={`${p.artist} — ${p.title}`} className="block aspect-square w-full object-cover" />
                      </div>
                    ) : (
                      <div className="flex aspect-square w-full items-center justify-center rounded-sm" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(60,40,15,0.7) 0%, rgba(20,12,5,0.9) 80%)', border: '1px solid rgba(212,175,55,0.25)' }}>
                        <p className="font-display text-xs italic tracking-wider text-gold/60">image under review</p>
                      </div>
                    )}
                    <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-[#3a2a0a]">{p.year}</p>
                    <h3 className="font-didot text-lg leading-tight tracking-wide text-[#1a0e05]">{p.title}</h3>
                    <div className="h-px w-8 bg-[#5a3a1a]" />
                    <p className="font-body text-xs italic leading-relaxed text-[#2a1a05]">{p.dimensions} · {p.medium}</p>
                    <p className="font-body text-xs italic leading-relaxed text-[#3a2a0a]/85">{p.inspirationNote}</p>
                    <p className="pt-1 font-mono text-[0.55rem] uppercase tracking-[0.28em] text-[#3a2a0a] group-hover:underline">Enter the piece →</p>
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
