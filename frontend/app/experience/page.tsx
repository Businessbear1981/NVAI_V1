'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { VIDEOS } from '@/lib/videoMap';

// ─── Chapters ────────────────────────────────────────────────────────────────
// Each chapter: room video plays 3.5s → painting fades in 2.5s → narration
// reads for 12s → auto-advance. Total ~18s × 10 rooms ≈ 3 minutes.

const CHAPTERS = [
  {
    key: 'modigliani',
    room: 'Cabinet de Curiosités',
    eyebrow: 'The Centrepiece',
    videoSrc: VIDEOS.modigliani.leadIn,
    imageUrl: '/paintings/modigliani-sitting-nude-crossed-hands.jpg',
    artist: 'Amedeo Modigliani',
    title: 'Sitting Nude with Crossed Hands',
    year: 'c. 1917',
    href: '/piece/modigliani-sitting-nude-with-crossed-hands',
    narration:
      'The sitter is Alice Ernestine Prin — sixteen years old, who within the decade would be known to all of Montparnasse as Kiki. She sat for him in a studio the world had misplaced for one hundred and ten years.',
  },
  {
    key: 'picasso-blue',
    room: 'Grand Hall',
    eyebrow: 'Picasso · 1901',
    videoSrc: VIDEOS.picasso.leadIn,
    imageUrl: '/paintings/picasso-enterrement-casagemas.jpg',
    artist: 'Pablo Picasso',
    title: "L'enterrement de Casagemas",
    year: '1901',
    href: '/piece/picasso-enterrement-casagemas',
    narration:
      'On the seventeenth of February, Carles Casagemas walked into a Montmartre café with a revolver. Picasso was in Madrid when he heard. He came back and painted the Blue Period. This is where it started.',
  },
  {
    key: 'chagall',
    room: 'The Parlor',
    eyebrow: 'Chagall · c. 1927',
    videoSrc: VIDEOS.chagall.leadIn,
    imageUrl: '/paintings/chagall-wolf-becomes-shepherd.jpg',
    artist: 'Marc Chagall',
    title: 'Le Loup devenu Berger',
    year: 'c. 1927',
    href: '/piece/chagall-wolf-becomes-shepherd',
    narration:
      'One of a hundred gouaches commissioned by Ambroise Vollard in 1926 — and one of the few still traceable. The wolf wears the shepherd\'s coat. La Fontaine\'s lesson: his speech will betray him before the bite can.',
  },
  {
    key: 'monet',
    room: 'Giverny',
    eyebrow: 'Monet · 1879',
    videoSrc: VIDEOS.monet.leadIn,
    imageUrl: '/paintings/monet-lavacourt-neige.jpg',
    artist: 'Claude Monet',
    title: 'La berge de Lavacourt sous la neige',
    year: 'c. 1879',
    href: '/piece/monet-lavacourt-neige',
    narration:
      'Camille was dying upstairs. He painted this from the window. Notice the lone figure crossing the snow — there is almost no sky, only the cold weight of the riverbank. Grief made into landscape.',
  },
  {
    key: 'pollock',
    room: 'The Pollock Studio',
    eyebrow: 'Pollock · c. 1950',
    videoSrc: VIDEOS.pollock.leadIn,
    imageUrl: '/paintings/pollock-d11.jpg',
    artist: 'Jackson Pollock',
    title: 'D-11',
    year: 'c. 1950',
    href: '/piece/pollock-d11',
    narration:
      'Springs, East Hampton. The year he did not drink — the only such year of his life. Made on the floor of the converted barn, paint dripped from sticks and basting syringes. The brush never touched the canvas.',
  },
  {
    key: 'kahlo',
    room: 'Casa Azul',
    eyebrow: 'Kahlo · 1939–40',
    videoSrc: VIDEOS.frida.leadIn,
    imageUrl: '/paintings/kahlo-la-mesa-herida.jpg',
    artist: 'Frida Kahlo',
    title: 'La Mesa Herida',
    year: '1939–40',
    href: '/piece/kahlo-la-mesa-herida',
    narration:
      'The largest canvas she ever made. She had divorced Rivera in November. The table bleeds from a cut in its leg. After the Moscow show of 1955, it vanished. Seven Cold War decades without a trace.',
  },
  {
    key: 'davinci',
    room: 'Da Vinci Workshop',
    eyebrow: 'Leonardo · 1495–99',
    videoSrc: VIDEOS.davinci.leadIn,
    imageUrl: '/paintings/davinci-lady-with-fur.jpg',
    artist: 'Leonardo da Vinci',
    title: 'Lady with a Fur',
    year: '1495–1499',
    href: '/piece/davinci-lady-with-fur',
    narration:
      'Attributed to Leonardo, painted in Milan during the Sforza years. He was in his middle forties. The attribution is under formal review at the Prague Modern Gallery. The verdict is not yet final.',
  },
  {
    key: 'raphael',
    room: 'Renaissance Studiolo',
    eyebrow: 'Raphael · 1500–10',
    videoSrc: VIDEOS.raphael.leadIn,
    imageUrl: '/paintings/raphael-madonna-child.jpg',
    artist: 'Raphael',
    title: 'Madonna with Child',
    year: '1500–1510',
    href: '/piece/raphael-madonna-child',
    narration:
      'He was seventeen at the start of that decade and twenty-seven at the end. The unbroken contour from veil to shoulder is the Leonardo lesson absorbed. Every Madonna in Western art since answers to one of these.',
  },
  {
    key: 'kandinsky',
    room: 'The Kandinsky Room',
    eyebrow: 'Kandinsky · 1910',
    videoSrc: VIDEOS.kandinsky.leadIn,
    imageUrl: '/paintings/kandinsky-composition-1910.jpg',
    artist: 'Wassily Kandinsky',
    title: 'Composition',
    year: '1910',
    href: '/piece/kandinsky-composition-1910',
    narration:
      'The year he decided that colour was a force on the soul independent of representation. Murnau. Gabriele Münter. Russian folk icons. The manuscript of On the Spiritual in Art — all compressed into this canvas.',
  },
  {
    key: 'bernard',
    room: 'The Chapel',
    eyebrow: 'Émile Bernard · c. 1926–40',
    videoSrc: VIDEOS.bernard.leadIn,
    imageUrl: '/paintings/bernard-passion.jpg',
    artist: 'Émile Bernard',
    title: 'La Passion de Jésus-Christ',
    year: 'c. 1926–1940',
    href: '/piece/bernard-passion',
    narration:
      'He invented Cloisonnism at eighteen. Gauguin took credit. Bernard went to Cairo, studied Coptic frescoes, came back a religious painter. The avant-garde had moved on. He painted altarpieces for no congregation.',
  },
] as const;

// ─── Timing ──────────────────────────────────────────────────────────────────
const T_ROOM      = 3400;   // ms — room video alone before painting appears
const T_PAINTING  = 2400;   // ms — painting visible before narration
const T_NARRATION = 11200;  // ms — narration reads, then auto-advance
const T_CHAPTER   = T_ROOM + T_PAINTING + T_NARRATION; // ~17s

type Phase = 'room' | 'painting' | 'narration' | 'done';

// ─── Component ───────────────────────────────────────────────────────────────
export default function ExperiencePage() {
  const [chapter, setChapter]   = useState(0);
  const [phase, setPhase]       = useState<Phase>('room');
  const [finished, setFinished] = useState(false);
  const [progress, setProgress] = useState(0); // 0-1 within chapter

  const videoRef     = useRef<HTMLVideoElement>(null);
  const preloadRef   = useRef<HTMLVideoElement>(null);
  const phaseTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const current = CHAPTERS[chapter];
  const nextChapter = chapter < CHAPTERS.length - 1 ? CHAPTERS[chapter + 1] : null;

  // Preload next video
  useEffect(() => {
    const p = preloadRef.current;
    if (!p || !nextChapter) return;
    p.src = nextChapter.videoSrc;
    p.load();
  }, [nextChapter]);

  // Phase machine
  const runPhase = useCallback((ph: Phase) => {
    setPhase(ph);
    if (phaseTimer.current) clearTimeout(phaseTimer.current);

    if (ph === 'room') {
      phaseTimer.current = setTimeout(() => runPhase('painting'), T_ROOM);
    } else if (ph === 'painting') {
      phaseTimer.current = setTimeout(() => runPhase('narration'), T_PAINTING);
    } else if (ph === 'narration') {
      phaseTimer.current = setTimeout(() => {
        if (chapter < CHAPTERS.length - 1) {
          advance();
        } else {
          setPhase('done');
          setFinished(true);
        }
      }, T_NARRATION);
    }
  }, [chapter]); // eslint-disable-line react-hooks/exhaustive-deps

  // Progress bar ticker
  useEffect(() => {
    setProgress(0);
    if (progressTimer.current) clearInterval(progressTimer.current);
    const start = Date.now();
    progressTimer.current = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(elapsed / T_CHAPTER, 1));
      if (elapsed >= T_CHAPTER) {
        if (progressTimer.current) clearInterval(progressTimer.current);
      }
    }, 50);
    return () => { if (progressTimer.current) clearInterval(progressTimer.current); };
  }, [chapter]);

  // Start chapter
  useEffect(() => {
    const v = videoRef.current;
    if (v) { v.currentTime = 0; v.play().catch(() => {}); }
    runPhase('room');
    return () => { if (phaseTimer.current) clearTimeout(phaseTimer.current); };
  }, [chapter]); // eslint-disable-line react-hooks/exhaustive-deps

  function advance() {
    if (chapter < CHAPTERS.length - 1) {
      setChapter((c) => c + 1);
    } else {
      setPhase('done');
      setFinished(true);
    }
  }

  function handleSkipToSelect() {
    if (phaseTimer.current) clearTimeout(phaseTimer.current);
    if (phase === 'room') {
      runPhase('painting');
    } else if (phase === 'painting') {
      runPhase('narration');
    } else {
      advance();
    }
  }

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black film-grain">

      {/* Room video — full bleed */}
      <video
        ref={videoRef}
        key={current.key}
        src={current.videoSrc}
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Preload next */}
      <video ref={preloadRef} className="hidden" muted playsInline preload="auto" />

      {/* Cinematic vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 85% 70% at 50% 50%, transparent 0%, transparent 45%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      {/* Dark floor — narration area gets extra scrim */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-2/3 transition-opacity duration-[1500ms] ${
          phase === 'narration' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
        }}
      />

      {/* ── Top bar ── */}
      <div className="absolute left-0 right-0 top-0 z-20 px-8 pt-7">
        {/* Progress bar */}
        <div className="h-px w-full bg-ivory/10">
          <div
            className="h-full bg-gold/70 transition-none"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <Link
            href="/foyer"
            className="font-mono text-[0.5rem] uppercase tracking-[0.42em] text-ivory/40 transition-colors hover:text-gold"
          >
            ← Exit
          </Link>
          <p className="font-mono text-[0.48rem] uppercase tracking-[0.38em] text-ivory/35">
            {chapter + 1} / {CHAPTERS.length}
          </p>
          <button
            onClick={handleSkipToSelect}
            className="font-mono text-[0.5rem] uppercase tracking-[0.42em] text-ivory/40 transition-colors hover:text-gold"
          >
            Skip →
          </button>
        </div>
      </div>

      {/* ── Centre content ── */}
      {!finished && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6">

          {/* Room label */}
          <p
            className={`font-mono text-[0.48rem] uppercase tracking-[0.5em] text-gold/80 transition-opacity duration-[1200ms] ${
              phase !== 'room' ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {current.eyebrow} · {current.room}
          </p>

          {/* Painting in gilt frame */}
          <div
            className={`mt-6 transition-all duration-[1400ms] ${
              phase === 'room' ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
            }`}
          >
            <div
              style={{
                padding: '0.9rem',
                background: 'linear-gradient(135deg, #d4a64a 0%, #8a6020 35%, #b08832 65%, #6a4815 100%)',
                boxShadow:
                  '0 32px 64px -8px rgba(0,0,0,0.95), 0 0 80px -8px rgba(255,210,140,0.3), inset 0 1px 0 rgba(255,220,150,0.5)',
              }}
            >
              <div
                style={{ boxShadow: 'inset 0 0 0 2px rgba(40,25,10,0.85)' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={current.imageUrl}
                  alt={`${current.artist} — ${current.title}`}
                  className="block max-h-[36vh] w-auto max-w-[40vw] object-contain md:max-h-[42vh] md:max-w-[32vw]"
                />
              </div>
            </div>
          </div>

          {/* Placard */}
          <div
            className={`mt-5 text-center transition-all duration-[1200ms] delay-300 ${
              phase === 'room' ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
            }`}
          >
            <p className="font-didot text-2xl tracking-wide text-ivory drop-shadow md:text-3xl">
              <em className="font-display italic">{current.title}</em>
            </p>
            <p className="mt-1 font-mono text-[0.48rem] uppercase tracking-[0.32em] text-gold/75">
              {current.artist} · {current.year}
            </p>
          </div>

          {/* Narration */}
          <p
            className={`mx-auto mt-6 max-w-lg text-center font-body text-sm italic leading-relaxed text-ivory/80 drop-shadow-lg transition-all duration-[1600ms] delay-500 md:text-base ${
              phase === 'narration' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
            style={{ textShadow: '0 2px 16px rgba(0,0,0,0.9)' }}
          >
            {current.narration}
          </p>

          {/* Enter the piece link — appears with narration */}
          <Link
            href={current.href}
            className={`mt-6 font-mono text-[0.5rem] uppercase tracking-[0.42em] text-gold/60 transition-all duration-[1200ms] delay-700 hover:text-gold ${
              phase === 'narration' ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            Enter the piece →
          </Link>
        </div>
      )}

      {/* ── Finished overlay ── */}
      {finished && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-midnight/90 px-8 text-center backdrop-blur-sm">
          <p className="font-mono text-[0.5rem] uppercase tracking-[0.5em] text-gold/65">
            You have seen the collection
          </p>
          <h1 className="mt-6 font-didot text-5xl uppercase tracking-[0.16em] text-ivory md:text-6xl">
            Napa Valley<br />Art Institut
          </h1>
          <div className="mx-auto mt-8 h-px w-20 bg-gold/35" />
          <p className="mx-auto mt-6 max-w-md font-body italic leading-relaxed text-ivory/70">
            Ten rooms. Thirty-one paintings. Every canvas in private hands for
            seventy years or longer. Each one available under the terms of the DDNDA.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/foyer"
              className="rounded-full border border-gold/50 bg-gold/10 px-8 py-3 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-gold transition-all hover:border-gold hover:bg-gold/20"
            >
              Enter the Chateau
            </Link>
            <Link
              href="/access"
              className="rounded-full border border-ivory/25 px-8 py-3 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-ivory/65 transition-all hover:border-ivory/50 hover:text-ivory"
            >
              Request Access
            </Link>
            <button
              onClick={() => { setChapter(0); setPhase('room'); setFinished(false); }}
              className="rounded-full border border-ivory/15 px-8 py-3 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-ivory/40 transition-all hover:border-ivory/35 hover:text-ivory/65"
            >
              Watch again
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
