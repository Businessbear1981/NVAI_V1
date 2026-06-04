'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { VIDEOS } from '@/lib/videoMap';
import ArtistTombstone from '@/components/tombstones/ArtistTombstone';

/**
 * /grounds — "Walk the Grounds"
 *
 * Two modes:
 *   1. Guided Tour — Bernard leads a sequenced narrative, chapter by chapter,
 *      garden party -> vineyard aerial -> orchard -> wine caves -> courtyard ->
 *      garden path -> back to the patio. Auto-advances with crossfade. Voiceover
 *      captions surface as each chapter plays.
 *   2. Self-Guided — tile grid of every outdoor location. Click any tile to dive
 *      into that single video as a focused vignette.
 *
 * Artist wings (Monet, Da Vinci, Picasso, Frida) remain as sub-routes and are
 * surfaced at the bottom as a quiet, secondary index.
 */

interface Chapter {
  key: string;
  eyebrow: string;
  title: string;
  caption: string;
  video: string;
}

const CHAPTERS: Chapter[] = [
  {
    key: 'garden-party',
    eyebrow: 'I',
    title: 'The Patio',
    caption:
      'We begin where everyone gathers — the garden party at the edge of the chateau. Linen, candlelight, the murmur of conversation under the lindens.',
    video: VIDEOS.garden,
  },
  {
    key: 'vineyard',
    eyebrow: 'II',
    title: 'The Vines',
    caption:
      'Up over the slope, the vineyard at golden hour — thirty acres of cabernet rolling toward the western hills.',
    video: VIDEOS.vineyardAerial,
  },
  {
    key: 'orchard',
    eyebrow: 'III',
    title: 'The Orchard',
    caption:
      'Down through the apple and olive walk. The trees were planted in the 1890s. In June the air here is sweet enough to drink.',
    video: VIDEOS.orchardWalk,
  },
  {
    key: 'caves',
    eyebrow: 'IV',
    title: 'The Wine Caves',
    caption:
      'Through the stone door, into the caves. Oak barrels, the cool of the earth, the smell of fermentation older than anyone living.',
    video: VIDEOS.wineCaves,
  },
  {
    key: 'courtyard',
    eyebrow: 'V',
    title: 'The Courtyard',
    caption:
      'Back to the chateau by the courtyard at the rear — the stable doors, the climbing roses, the bell that once called workers in from the fields.',
    video: VIDEOS.courtyard,
  },
  {
    key: 'garden-path',
    eyebrow: 'VI',
    title: 'The Garden Path',
    caption:
      'The lower path that threads the formal gardens. Boxwood, lavender, the long view down the allée.',
    video: VIDEOS.gardenPath,
  },
  {
    key: 'passage',
    eyebrow: 'VII',
    title: 'The Passage',
    caption:
      'Through the secret garden passage — Monet&rsquo;s wing branches off here, but the path keeps going.',
    video: VIDEOS.gardenPassage,
  },
  {
    key: 'return',
    eyebrow: 'VIII',
    title: 'Return to the Patio',
    caption:
      'Back to where we began. The candles are still lit. Bernard will be waiting with a glass of something cold.',
    video: VIDEOS.gardenPathToPatio,
  },
];

interface Tile {
  key: string;
  label: string;
  subtitle: string;
  video: string;
}

const TILES: Tile[] = [
  { key: 'garden', label: 'The Patio', subtitle: 'Garden party', video: VIDEOS.garden },
  { key: 'vineyard', label: 'The Vines', subtitle: 'Aerial at golden hour', video: VIDEOS.vineyardAerial },
  { key: 'orchard', label: 'The Orchard', subtitle: 'Apple & olive walk', video: VIDEOS.orchardWalk },
  { key: 'caves', label: 'Wine Caves', subtitle: 'Oak & stone', video: VIDEOS.wineCaves },
  { key: 'courtyard', label: 'Courtyard', subtitle: 'Behind the chateau', video: VIDEOS.courtyard },
  { key: 'path', label: 'Garden Path', subtitle: 'The lower allée', video: VIDEOS.gardenPath },
  { key: 'passage', label: 'Garden Passage', subtitle: 'Through the hedgerow', video: VIDEOS.gardenPassage },
  { key: 'topatio', label: 'Path to the Patio', subtitle: 'The return', video: VIDEOS.gardenPathToPatio },
];

const CHAPTER_DURATION_MS = 10_000;
const CROSSFADE_MS = 1_200;

type Mode = 'guided' | 'self';

export default function GroundsPage() {
  const [mode, setMode] = useState<Mode>('guided');
  const [revealed, setRevealed] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [activeTile, setActiveTile] = useState<Tile | null>(null);
  const [captionVisible, setCaptionVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 800);
    return () => clearTimeout(t);
  }, []);

  // Guided-tour auto-advance
  const goNext = useCallback(() => {
    setCaptionVisible(false);
    setTimeout(() => {
      setActiveIdx((i) => (i + 1) % CHAPTERS.length);
      setCaptionVisible(true);
    }, CROSSFADE_MS / 2);
  }, []);

  const goPrev = useCallback(() => {
    setCaptionVisible(false);
    setTimeout(() => {
      setActiveIdx((i) => (i - 1 + CHAPTERS.length) % CHAPTERS.length);
      setCaptionVisible(true);
    }, CROSSFADE_MS / 2);
  }, []);

  useEffect(() => {
    if (mode !== 'guided' || !playing) {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
      return;
    }
    advanceTimer.current = setTimeout(goNext, CHAPTER_DURATION_MS);
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    };
  }, [activeIdx, playing, mode, goNext]);

  const active = CHAPTERS[activeIdx];

  return (
    <main className="relative min-h-screen overflow-hidden film-grain bg-midnight">
      {/* Background — guided mode shows current chapter; self mode shows the tour opener */}
      <div className="fixed inset-0 z-0">
        <video
          ref={videoRef}
          key={mode === 'guided' ? active.video : VIDEOS.garden}
          src={mode === 'guided' ? active.video : VIDEOS.garden}
          autoPlay
          muted
          playsInline
          loop={mode !== 'guided'}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ transition: `opacity ${CROSSFADE_MS}ms ease` }}
        />
        <div className="absolute inset-0 bg-midnight/55" />
      </div>

      <div
        className={`relative z-10 flex min-h-screen flex-col px-6 py-10 transition-opacity duration-[1800ms] md:px-8 ${
          revealed ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Back link */}
        <Link
          href="/foyer"
          className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 hover:text-gold"
        >
          &larr; Back to the foyer
        </Link>

        {/* Header */}
        <header className="mx-auto mt-12 max-w-4xl text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.5em] text-gold/80">
            Beyond the foyer
          </p>
          <h1 className="mt-6 font-didot text-6xl uppercase tracking-[0.12em] text-ivory drop-shadow-lg md:text-8xl">
            Walk the Grounds
          </h1>
          <p className="mt-4 font-display text-lg italic tracking-wider text-gold/85 md:text-xl">
            French chateau gardens above a Napa vineyard — thirty acres, your way through them
          </p>
          <div className="mx-auto mt-8 h-px w-32 bg-gold/40" />
        </header>

        {/* Mode toggle */}
        <div className="mx-auto mt-10 flex items-center gap-1 rounded-full border border-gold/30 bg-midnight/60 p-1 backdrop-blur">
          <button
            onClick={() => setMode('guided')}
            className={`rounded-full px-6 py-2 font-mono text-[0.6rem] uppercase tracking-[0.32em] transition-all ${
              mode === 'guided'
                ? 'bg-gold/20 text-gold'
                : 'text-ivory/55 hover:text-ivory'
            }`}
          >
            Guided Tour
          </button>
          <button
            onClick={() => setMode('self')}
            className={`rounded-full px-6 py-2 font-mono text-[0.6rem] uppercase tracking-[0.32em] transition-all ${
              mode === 'self'
                ? 'bg-gold/20 text-gold'
                : 'text-ivory/55 hover:text-ivory'
            }`}
          >
            Self-Guided
          </button>
        </div>

        {/* GUIDED MODE */}
        {mode === 'guided' && (
          <section className="mx-auto mt-14 w-full max-w-4xl">
            {/* Caption card */}
            <div
              className={`mx-auto max-w-2xl rounded border border-gold/20 bg-midnight/65 p-8 text-center backdrop-blur-md transition-opacity duration-700 ${
                captionVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
                Chapter {active.eyebrow} &middot; Bernard narrates
              </p>
              <h2 className="mt-4 font-didot text-3xl uppercase tracking-[0.14em] text-ivory md:text-4xl">
                {active.title}
              </h2>
              <div className="mx-auto mt-4 h-px w-12 bg-gold/40" />
              <p
                className="mt-5 font-body text-base italic leading-relaxed text-ivory/90"
                dangerouslySetInnerHTML={{ __html: active.caption }}
              />
            </div>

            {/* Transport controls */}
            <div className="mx-auto mt-8 flex items-center justify-center gap-3">
              <button
                onClick={goPrev}
                className="rounded border border-ivory/20 bg-midnight/50 px-4 py-2 font-mono text-[0.55rem] uppercase tracking-[0.32em] text-ivory/70 backdrop-blur transition-all hover:border-gold/40 hover:text-gold"
              >
                &larr; Prev
              </button>
              <button
                onClick={() => setPlaying((p) => !p)}
                className="rounded border border-gold/40 bg-gold/10 px-5 py-2 font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold backdrop-blur transition-all hover:bg-gold/20"
              >
                {playing ? 'Pause' : 'Play'}
              </button>
              <button
                onClick={goNext}
                className="rounded border border-ivory/20 bg-midnight/50 px-4 py-2 font-mono text-[0.55rem] uppercase tracking-[0.32em] text-ivory/70 backdrop-blur transition-all hover:border-gold/40 hover:text-gold"
              >
                Next &rarr;
              </button>
            </div>

            {/* Chapter pips */}
            <div className="mx-auto mt-6 flex max-w-2xl flex-wrap justify-center gap-2">
              {CHAPTERS.map((c, i) => (
                <button
                  key={c.key}
                  onClick={() => {
                    setCaptionVisible(false);
                    setTimeout(() => {
                      setActiveIdx(i);
                      setCaptionVisible(true);
                    }, CROSSFADE_MS / 2);
                  }}
                  aria-label={`Chapter ${c.eyebrow} — ${c.title}`}
                  className={`h-1.5 w-8 rounded-full transition-all ${
                    i === activeIdx ? 'bg-gold' : 'bg-ivory/20 hover:bg-ivory/40'
                  }`}
                />
              ))}
            </div>
          </section>
        )}

        {/* SELF-GUIDED MODE */}
        {mode === 'self' && (
          <section className="mx-auto mt-14 w-full max-w-6xl">
            <p className="text-center font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
              Choose your own path
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {TILES.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveTile(t)}
                  className="group relative aspect-[4/3] overflow-hidden rounded border border-gold/20 bg-midnight/40 transition-all hover:border-gold/60"
                >
                  <video
                    src={t.video}
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="metadata"
                    className="absolute inset-0 h-full w-full object-cover opacity-60 transition-opacity duration-500 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end gap-1 p-4 text-center">
                    <p className="font-didot text-lg uppercase tracking-[0.14em] text-ivory drop-shadow">
                      {t.label}
                    </p>
                    <p className="font-mono text-[0.5rem] uppercase tracking-[0.28em] text-gold/80">
                      {t.subtitle}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Painter Wings — full brass-signature tombstones */}
        <div className="mx-auto mb-6 mt-auto w-full max-w-6xl pt-20">
          <p className="text-center font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/65">
            Or step into a painter&rsquo;s wing along the walk
          </p>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <ArtistTombstone
              slug="picasso"
              href="/grounds/picasso"
              caption="Bateau-Lavoir · Boisgeloup · Mougins"
            />
            <ArtistTombstone
              slug="monet"
              href="/grounds/monet"
              caption="Giverny · The Secret Garden"
            />
            <ArtistTombstone
              slug="davinci"
              href="/grounds/davinci"
              caption="Da Vinci Workshop"
            />
            <ArtistTombstone
              slug="kahlo"
              href="/grounds/frida"
              caption="Casa Azul"
            />
          </div>
        </div>
      </div>

      {/* Self-guided focused viewer */}
      {activeTile && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-midnight/90 backdrop-blur-sm"
          onClick={() => setActiveTile(null)}
        >
          <div
            className="relative w-full max-w-5xl px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveTile(null)}
              className="absolute -top-10 right-6 font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/70 hover:text-gold"
            >
              Close &times;
            </button>
            <div className="overflow-hidden rounded border border-gold/30">
              <video
                src={activeTile.video}
                autoPlay
                controls
                playsInline
                className="h-full w-full"
              />
            </div>
            <div className="mt-5 text-center">
              <h3 className="font-didot text-3xl uppercase tracking-[0.14em] text-ivory">
                {activeTile.label}
              </h3>
              <p className="mt-2 font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/75">
                {activeTile.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
