'use client';

/**
 * /tour — the locked Guided Tour route (18 chapters, end-to-end).
 *
 * Sean's locked route per docs/guided-tour-route.md.
 * Each chapter has a backdrop video, Bernard's caption (Sotheby's specialist
 * voice), auto-advances when the video ends, and offers an "Enter the Room"
 * link to break out into the full wing for deep-dive. Finale is the gallery
 * (orbital carousel).
 *
 * Transport: Prev / Pause / Next at the top with a chapter pip indicator and
 * a thin progress bar, in the same gold/ivory pattern as /flight.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { VIDEOS } from '@/lib/videoMap';

const R2 = 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev';

interface Chapter {
  num: string;
  title: string;
  subtitle?: string;
  // Sources played in order within the chapter. Auto-advance fires when the
  // last source completes.
  sources: string[];
  caption: string;
  /** Optional deep-dive room. Omit for bridge chapters and the finale. */
  enterRoom?: { href: string; label: string };
  /** Finale renders a primary CTA card instead of the small "Enter the Room" link. */
  finaleCta?: { href: string; label: string };
}

const CHAPTERS: Chapter[] = [
  {
    num: '01',
    title: 'The Guestbook',
    subtitle: 'You arrive',
    sources: [VIDEOS.foyerWelcome, VIDEOS.foyer],
    caption:
      'Welcome to Chateau Magdalena. Every visitor signs the book — not as a gate, but as the first quiet courtesy of the house. Take your time. The tour will not begin without you.',
    enterRoom: { href: '/foyer/welcome', label: 'Sign the guestbook' },
  },
  {
    num: '02',
    title: 'The Walkway to the Patio',
    subtitle: 'Right-hand turn, out toward the gardens',
    sources: [VIDEOS.gardenPathToPatio],
    caption:
      'The right-hand door opens onto a stone walk lined with cypress. The chateau gives way to Tuscan light. Listen — the fountain is closer than it looks.',
    enterRoom: { href: '/grounds', label: 'Enter the Grounds' },
  },
  {
    num: '03',
    title: 'The Grounds',
    subtitle: 'Vineyard · Orchard · Caves',
    sources: [VIDEOS.garden, VIDEOS.vineyardAerial, VIDEOS.orchardWalk, VIDEOS.wineCaves],
    caption:
      'A garden party is in motion. Above us, the vineyard rolls out in straight gold rows; below, the wine caves keep their twenty-year vintages. This is the estate the collection lives on.',
    enterRoom: { href: '/grounds', label: 'Walk the Grounds' },
  },
  {
    num: '04',
    title: 'Monet',
    subtitle: 'Giverny · the cataracts era',
    sources: [VIDEOS.monet.leadIn, `${R2}/nvai_monet_moonlit_nympheas_5k.mp4`],
    caption:
      'Giverny at dusk. The Nymphéas float on water Monet could no longer see clearly — and painted larger because of it. The late canvases are not failures of sight. They are what sight became.',
    enterRoom: { href: '/grounds/monet', label: 'Enter the Monet Wing' },
  },
  {
    num: '05',
    title: 'Picasso',
    subtitle: 'Bateau-Lavoir · Vallauris · the late musketeers',
    sources: [`${R2}/nvai_picasso_blue_period_5k.mp4`, VIDEOS.picasso.leadIn],
    caption:
      'Montmartre, 1907. The Blue Period has ended; the Demoiselles are about to begin. From this hill Picasso will spend seventy years refusing to settle — ceramics, sculpture, the late musketeers in red.',
    enterRoom: { href: '/grounds/picasso/bateau-lavoir', label: 'Enter the Picasso Wing' },
  },
  {
    num: '06',
    title: 'Frida',
    subtitle: 'Casa Azul · Coyoacán',
    sources: [`${R2}/casa-azul.mp4`, `${R2}/coyoacan.mp4`],
    caption:
      'The cobalt house in Coyoacán. Frida painted the bus accident, the surgeries, the love and the betrayal, all from this courtyard. La Mesa Herida — the wounded table — was painted here.',
    enterRoom: { href: '/grounds/frida', label: 'Enter the Frida Wing' },
  },
  {
    num: '07',
    title: 'Da Vinci · the Workshop',
    subtitle: 'Florence · Milan · Lady with a Fur',
    sources: [`${R2}/florence-workshop.mp4`, VIDEOS.davinci.leadIn],
    caption:
      'Leonardo at the bench, not yet airborne. Anatomy, hydraulics, the geometry of a smile. This is the workshop where the contraption upstairs was first imagined — long before anyone believed it could lift.',
    enterRoom: { href: '/grounds/davinci', label: 'Enter the Da Vinci Workshop' },
  },
  {
    num: '08',
    title: 'Back to the Patio',
    subtitle: 'The chateau interior reasserts itself',
    sources: [VIDEOS.courtyard],
    caption:
      'The gardens close behind us. The courtyard fountain catches the late light. From here the chateau interior opens — three rooms, then the stairs.',
  },
  {
    num: '09',
    title: 'Matisse',
    subtitle: 'Nice · the cutouts',
    sources: [VIDEOS.matisse.leadIn],
    caption:
      'Hotel Régina, Nice. The brush has been set down; the scissors have taken over. Blue, vermilion, and white paper, cut with the same line that drew the odalisques fifty years before.',
    enterRoom: { href: '/matisse', label: 'Enter the Matisse Wing' },
  },
  {
    num: '10',
    title: 'The Parlor · Chagall',
    subtitle: 'A bohemian bar with Chagalls on the walls',
    sources: [VIDEOS.parlor.leadIn, `${R2}/paris.mp4`],
    caption:
      'The parlor is a small, lamplit Paris bar — the kind Chagall painted with a violinist on the roof. The works on the walls are the canvases he kept for himself: lovers floating, Vitebsk remembered.',
    enterRoom: { href: '/parlor/chagall', label: 'Enter the Chagall Room' },
  },
  {
    num: '11',
    title: 'The Grand Ballroom',
    subtitle: 'Renaissance dancers ⇄ Gatsby art party',
    sources: [VIDEOS.grandBallroomRenaissance, VIDEOS.grandBallroomGatsby],
    caption:
      'Two centuries in the same room. The Renaissance pavane gives way to a 1920s art party — same marble, same chandeliers, four hundred years of dancing. The collection has lived through both.',
    enterRoom: { href: '/grand-ballroom', label: 'Enter the Ballroom' },
  },
  {
    num: '12',
    title: 'Pollock',
    subtitle: 'East Hampton · the drip apex',
    sources: [VIDEOS.pollock.studio, VIDEOS.pollock.action],
    caption:
      'Springs, Long Island. The studio floor is a Pollock — every canvas he made was a confession written on top of the last. Autumn Rhythm was painted on the floor in a single afternoon.',
    enterRoom: { href: '/grand-hall/pollock', label: 'Enter the Pollock Wing' },
  },
  {
    num: '13',
    title: 'The Modi Experience',
    subtitle: 'Cabinet de Curiosités · the Sitting Nude',
    sources: [VIDEOS.modigliani.leadIn, `${R2}/nvai_modi_rotonde_night_5k.mp4`],
    caption:
      'La Rotonde at midnight. Modigliani lived eleven streets from here and worked drunk, cold, and certain. The nude in the back room is the painting NVAI is selling — the one Kiki sat for, on a red velvet pillow, in 1917.',
    enterRoom: { href: '/grand-hall/modigliani', label: 'Enter the Modi Experience' },
  },
  {
    num: '14',
    title: 'Return to the Foyer',
    subtitle: 'Up the central staircase',
    sources: [VIDEOS.foyer],
    caption:
      'Back to the marble. The staircase climbs to three doors and a balcony. Above us, the chapel, the strange room, and the studiolo — and beyond the terrace, the contraption.',
  },
  {
    num: '15a',
    title: 'Kandinsky',
    subtitle: 'The Creepy Room · Bauhaus apex',
    sources: [VIDEOS.kandinsky.leadIn],
    caption:
      "Door one, left of the landing. Kandinsky believed colour was a sound and a triangle could pray. This is the strangest room in the house — and the most rigorous. Composition VIII hangs here.",
    enterRoom: { href: '/upstairs/kandinsky', label: 'Enter the Kandinsky Room' },
  },
  {
    num: '15b',
    title: 'Raphael',
    subtitle: 'Renaissance studiolo',
    sources: [VIDEOS.raphael.leadIn],
    caption:
      'Door two, the centre. A studiolo lifted from the Vatican: cartoons in red chalk, a vault painted with the School of Athens in miniature. Raphael died at thirty-seven. The work he left fills a chapel.',
    enterRoom: { href: '/upstairs/raphael', label: 'Enter the Raphael Studiolo' },
  },
  {
    num: '15c',
    title: 'Émile Bernard',
    subtitle: 'Pont-Aven · the religious turn',
    sources: [VIDEOS.bernard.leadIn],
    caption:
      'Door three, the right. Bernard moved among the symbolists in Paris before turning, late in life, to Byzantine altarpieces and the Breton coast. The quiet wing of the upstairs — and the deepest.',
    enterRoom: { href: '/upstairs/bernard', label: 'Enter the Bernard Wing' },
  },
  {
    num: '16',
    title: 'The Flight',
    subtitle: 'Da Vinci\'s contraption · 48 seconds over Napa',
    sources: [
      VIDEOS.davinciFlight.takeoff,
      VIDEOS.davinciFlight.soaring,
      VIDEOS.davinciFlight.banking,
      VIDEOS.davinciFlight.descent,
    ],
    caption:
      'Through the open terrace doors. The contraption lifts, then soars, then banks over the vineyard, then sets down on the gravel below. Forty-eight seconds. Five hundred years late.',
    enterRoom: { href: '/flight', label: 'Take the full flight' },
  },
  {
    num: '17',
    title: 'Kiki',
    subtitle: 'Queen of Montparnasse',
    sources: [VIDEOS.kiki.leadIn],
    caption:
      'Alice Prin — Kiki de Montparnasse. Model, painter, cabaret singer, the muse of Man Ray and Modigliani and half the cafes of the sixth arrondissement. The marquee wing. The emotional climax. Everything has been building to her.',
    enterRoom: { href: '/kiki', label: 'Enter the Kiki Wing' },
  },
  {
    num: '18',
    title: 'The Full Gallery',
    subtitle: 'The Circle · all thirty works at once',
    sources: [VIDEOS.grandHall],
    caption:
      "All thirty works. Every room you have walked. The circle. They orbit the gold medallion at the centre of the gallery — Monet next to Modi, Raphael across from Pollock, Kiki at the seam. The curtain call.",
    finaleCta: { href: '/gallery', label: 'Enter The Circle' },
  },
];

export default function TourPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [chapterIndex, setChapterIndex] = useState(0);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);

  const chapter = CHAPTERS[chapterIndex];
  const currentSrc = chapter.sources[sourceIndex] ?? chapter.sources[0];

  // Fade in on mount
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 400);
    return () => clearTimeout(t);
  }, []);

  // Whenever the source changes, restart playback
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    if (!paused) {
      v.play().catch(() => {
        /* autoplay blocked — controls visible */
      });
    }
  }, [chapterIndex, sourceIndex, paused]);

  // Pause/play sync
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (paused) v.pause();
    else v.play().catch(() => {});
  }, [paused]);

  function goToChapter(idx: number) {
    if (idx < 0 || idx >= CHAPTERS.length) return;
    setChapterIndex(idx);
    setSourceIndex(0);
    setFinished(false);
  }

  function handleEnded() {
    // Advance to the next source within the chapter, or to the next chapter.
    if (sourceIndex < chapter.sources.length - 1) {
      setSourceIndex((i) => i + 1);
      return;
    }
    if (chapterIndex < CHAPTERS.length - 1) {
      goToChapter(chapterIndex + 1);
      return;
    }
    // Final chapter — show finale overlay
    setFinished(true);
  }

  const progressPct = useMemo(
    () => ((chapterIndex + 1) / CHAPTERS.length) * 100,
    [chapterIndex],
  );

  const isFinale = chapterIndex === CHAPTERS.length - 1;

  return (
    <main className="relative min-h-screen overflow-hidden bg-midnight film-grain">
      {/* Backdrop video — full bleed */}
      <video
        ref={videoRef}
        key={`${chapterIndex}-${sourceIndex}`}
        src={currentSrc}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleEnded}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ${revealed ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Cinematic vignette + bottom shade for caption legibility */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 85% 65% at 50% 45%, transparent 0%, transparent 55%, rgba(0,0,0,0.55) 100%), linear-gradient(180deg, rgba(0,0,0,0.45) 0%, transparent 22%, transparent 60%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* ─── Top bar — transport + chapter pip indicator ────────────────── */}
      <div className="absolute left-0 right-0 top-0 z-20 px-6 pt-6 md:px-10 md:pt-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/foyer"
              className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-ivory/70 transition-colors hover:text-gold"
            >
              ← Leave the tour
            </Link>
          </div>

          {/* Transport buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goToChapter(chapterIndex - 1)}
              disabled={chapterIndex === 0}
              className="rounded-full border border-ivory/25 bg-midnight/40 px-4 py-2 font-mono text-[0.55rem] uppercase tracking-[0.32em] text-ivory/80 backdrop-blur-sm transition-all hover:border-gold/60 hover:text-gold disabled:cursor-not-allowed disabled:border-ivory/10 disabled:text-ivory/30"
            >
              ← Prev
            </button>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="rounded-full border border-gold/40 bg-gold/10 px-5 py-2 font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold backdrop-blur-sm transition-all hover:border-gold hover:bg-gold/20"
            >
              {paused ? 'Play' : 'Pause'}
            </button>
            <button
              type="button"
              onClick={() => goToChapter(chapterIndex + 1)}
              disabled={chapterIndex === CHAPTERS.length - 1}
              className="rounded-full border border-ivory/25 bg-midnight/40 px-4 py-2 font-mono text-[0.55rem] uppercase tracking-[0.32em] text-ivory/80 backdrop-blur-sm transition-all hover:border-gold/60 hover:text-gold disabled:cursor-not-allowed disabled:border-ivory/10 disabled:text-ivory/30"
            >
              Next →
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/80">
              Chapter {String(chapterIndex + 1).padStart(2, '0')} of {CHAPTERS.length}
            </span>
          </div>
        </div>

        {/* Chapter pip indicator — gold filled = current, gold/40 = past, ivory/20 = future
            Mirrors the /flight pattern. */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {CHAPTERS.map((c, i) => (
            <button
              key={c.num}
              type="button"
              onClick={() => goToChapter(i)}
              aria-label={`Chapter ${c.num} · ${c.title}`}
              className={`h-px transition-all duration-700 ${
                i === chapterIndex
                  ? 'w-10 bg-gold'
                  : i < chapterIndex
                    ? 'w-10 bg-gold/40 hover:bg-gold/70'
                    : 'w-6 bg-ivory/20 hover:bg-ivory/40'
              }`}
            />
          ))}
        </div>

        {/* Thin progress bar across the very top */}
        <div className="mt-4 h-px w-full bg-ivory/10">
          <div
            className="h-px bg-gold transition-all duration-700"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* ─── Bottom — chapter title + Bernard caption + Enter the Room ──── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-10 md:px-12 md:pb-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.5em] text-gold/80">
            Chapter {chapter.num}
          </p>
          <h1
            className="mt-3 font-didot text-3xl uppercase tracking-[0.14em] text-ivory drop-shadow-lg md:text-5xl"
            style={{ textShadow: '0 2px 18px rgba(0,0,0,0.85)' }}
          >
            {chapter.title}
          </h1>
          {chapter.subtitle && (
            <p className="mt-2 font-display text-base italic tracking-wider text-gold/85 md:text-lg">
              {chapter.subtitle}
            </p>
          )}
          <div className="mx-auto mt-5 h-px w-16 bg-gold/40" />
          <p
            className="mx-auto mt-5 max-w-2xl font-display italic leading-relaxed text-gold/85 md:text-lg"
            style={{ textShadow: '0 2px 14px rgba(0,0,0,0.85)' }}
          >
            {chapter.caption}
          </p>

          {chapter.enterRoom && !isFinale && (
            <div className="mt-7 flex items-center justify-center">
              <Link
                href={chapter.enterRoom.href}
                className="group inline-flex items-center gap-3 rounded-full border border-gold/50 bg-midnight/55 px-7 py-3 font-mono text-[0.6rem] uppercase tracking-[0.32em] text-gold backdrop-blur-sm transition-all hover:border-gold hover:bg-gold/15"
              >
                {chapter.enterRoom.label}
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ─── Finale overlay — Chapter 18, "The Gallery awaits" ──────────── */}
      {(finished || isFinale) && isFinale && chapter.finaleCta && (
        <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
          <div className="pointer-events-auto mx-auto max-w-2xl rounded-lg border border-gold/30 bg-midnight/80 px-10 py-10 text-center backdrop-blur-md">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.5em] text-gold/80">
              Finale · Chapter 18
            </p>
            <h2 className="mt-4 font-didot text-4xl uppercase tracking-[0.14em] text-ivory md:text-5xl">
              The Gallery awaits
            </h2>
            <div className="mx-auto mt-5 h-px w-20 bg-gold/50" />
            <p className="mx-auto mt-5 max-w-xl font-display italic leading-relaxed text-gold/85 md:text-lg">
              All thirty works. Every room you have walked. The circle.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => router.push(chapter.finaleCta!.href)}
                className="rounded-full border border-gold bg-gold/15 px-9 py-3 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-gold transition-all hover:bg-gold/30"
              >
                {chapter.finaleCta.label}
              </button>
              <button
                type="button"
                onClick={() => {
                  setChapterIndex(0);
                  setSourceIndex(0);
                  setFinished(false);
                }}
                className="rounded-full border border-ivory/30 px-7 py-3 font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/75 transition-all hover:border-ivory/60"
              >
                Walk it again
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
