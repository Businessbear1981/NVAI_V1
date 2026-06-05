'use client';

import { useState } from 'react';
import Link from 'next/link';
import CinematicBackdrop from '@/components/cinematic/CinematicBackdrop';
import { VIDEOS } from '@/lib/videoMap';

type Mode = 'renaissance' | 'gatsby';

const MODES: Record<
  Mode,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    period: string;
    body: string;
    programme: { hour: string; line: string }[];
    video: string;
    cardLabel: string;
    cardCaption: string;
  }
> = {
  renaissance: {
    eyebrow: 'Première Partie · La Salle de Bal',
    title: 'Le Bal Renaissance',
    subtitle: 'A French chateau ballroom · candlelight · period dance',
    period: 'vers 1675',
    body:
      "The evening opens under crystal chandeliers and the gilt boiserie of the chateau's grandest room. A small string ensemble strikes the first bourrée. The dancers — in court costume — fold into the parquet de Versailles, and the guests step into the figure with them. This is the room the family has used to receive guests for three hundred years. It begins as it has always begun.",
    programme: [
      { hour: '20h00', line: 'Doors. Champagne under the candelabra.' },
      { hour: '20h30', line: 'String quartet. The first courante.' },
      { hour: '21h15', line: 'The Bourrée d’Achille. Guests welcome to join the figure.' },
      { hour: '22h00', line: 'Intermezzo. The room turns.' },
    ],
    video: VIDEOS.grandBallroomRenaissance,
    cardLabel: 'Period dancing',
    cardCaption: 'Court costume. String ensemble. The figure of the seventeenth-century evening.',
  },
  gatsby: {
    eyebrow: 'Deuxième Partie · The Art Party',
    title: 'A Twenty-Twenties Ball',
    subtitle: 'The same room · gilded · a jazz band · long champagne flutes',
    period: '1926 — and tonight',
    body:
      "By midnight the room has turned. The string quartet folds away and a jazz band takes the parquet — black-tie, beaded gowns, long champagne flutes lifted toward the chandeliers. Painters, dealers, collectors, the curious. This is the chateau as Fitzgerald would have written it, if Fitzgerald had ever been invited. The art on the walls is the same art that hangs there for the auction.",
    programme: [
      { hour: '22h00', line: 'The room turns. A jazz band takes the floor.' },
      { hour: '22h30', line: 'Cocktails on the long table. Beaded gowns.' },
      { hour: '23h30', line: 'Auctioneers cross from the Grand Hall to greet collectors.' },
      { hour: '01h00', line: 'The room thins. The chandeliers stay lit until dawn.' },
    ],
    video: VIDEOS.grandBallroomGatsby,
    cardLabel: 'Art party',
    cardCaption: 'Jazz band. Black tie. Painters, dealers, collectors — the room reassembled.',
  },
};

const BALLROOM_BACKDROP =
  'radial-gradient(ellipse at 50% 18%, rgba(232,200,122,0.28) 0%, transparent 55%), radial-gradient(ellipse at 50% 92%, rgba(50,25,12,0.85) 0%, transparent 70%), linear-gradient(180deg, #1c1208 0%, #2a1c0c 45%, #0a0605 100%)';

export default function GrandBallroomPage() {
  const [mode, setMode] = useState<Mode>('renaissance');
  const active = MODES[mode];

  return (
    <main className="relative min-h-screen overflow-hidden film-grain">
      <CinematicBackdrop videoSrc={active.video} overlay={0.58} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: BALLROOM_BACKDROP, mixBlendMode: 'multiply' }}
      />

      <div className="relative z-10 px-8 py-10">
        <Link
          href="/grand-hall"
          className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 transition-colors hover:text-gold"
        >
          ← Back to the Grand Hall
        </Link>

        {/* Crown */}
        <div className="mx-auto mt-10 max-w-5xl">
          <DecoBorder />
          <header className="py-10 text-center">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.5em] text-gold/80">
              Napa Valley Art Institute
            </p>
            <p className="mt-2 font-mono text-[0.55rem] uppercase tracking-[0.5em] text-gold/60">
              {active.eyebrow}
            </p>
            <h1 className="mt-8 font-didot text-6xl uppercase tracking-[0.15em] text-ivory drop-shadow-lg md:text-7xl">
              La Grande Salle de Bal
            </h1>
            <p className="mt-3 font-mono text-[0.55rem] uppercase tracking-[0.4em] text-ivory/80">
              The Grand Ballroom
            </p>
            <p className="mt-6 font-display text-2xl italic tracking-wider text-gold/90">
              The social heart of the chateau · two evenings folded into one room
            </p>
            <p className="mx-auto mt-4 max-w-3xl font-body text-base italic leading-relaxed text-ivory/75">
              Eighty feet of parquet de Versailles. Crystal chandeliers descended from the
              ceiling moulding. Gilded boiserie picked out in candle-warmed gold. The
              ballroom does not choose between the centuries — it lets you walk between
              them. Begin under the candelabra of a French court evening. Stay until
              midnight, and the room reassembles around a jazz band, beaded gowns, and
              the long champagne flutes of nineteen twenty-six.
            </p>
            <div className="mx-auto mt-8 flex items-center justify-center gap-4">
              <span className="block h-px w-24 bg-gold/40" />
              <FleurDeLis />
              <span className="block h-px w-24 bg-gold/40" />
            </div>
          </header>
          <DecoBorder flipped />
        </div>

        {/* Mode toggle */}
        <section className="mx-auto mt-12 max-w-3xl">
          <p className="text-center font-mono text-[0.55rem] uppercase tracking-[0.5em] text-gold/70">
            Choose the evening
          </p>
          <div className="mt-5 flex justify-center gap-4">
            {(Object.keys(MODES) as Mode[]).map((k) => {
              const m = MODES[k];
              const isActive = mode === k;
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => setMode(k)}
                  className={`flex w-64 flex-col items-center rounded-sm border px-6 py-4 text-center transition-all duration-500 ${
                    isActive
                      ? 'border-gold bg-gold/10 text-gold shadow-[inset_0_0_50px_rgba(212,175,55,0.18)]'
                      : 'border-ivory/15 bg-midnight/40 text-ivory/65 hover:border-gold/40 hover:text-gold'
                  }`}
                >
                  <span className="font-mono text-[0.55rem] uppercase tracking-[0.32em]">
                    {m.cardLabel}
                  </span>
                  <span className="mt-2 font-didot text-base uppercase tracking-[0.15em]">
                    {k === 'renaissance' ? 'I · Renaissance' : 'II · Gatsby'}
                  </span>
                  <span className="mt-1 font-display text-[0.7rem] italic tracking-wider opacity-80">
                    {m.period}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Active chapter narrative */}
        <article className="mx-auto mt-16 max-w-3xl space-y-6 text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
            {active.cardLabel}
          </p>
          <h2 className="font-didot text-4xl uppercase tracking-[0.12em] text-ivory drop-shadow md:text-5xl">
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

        {/* Programme of the evening (mode-specific) */}
        <section className="mx-auto mt-16 max-w-4xl">
          <p className="text-center font-mono text-[0.55rem] uppercase tracking-[0.5em] text-gold/70">
            Programme · {active.cardLabel}
          </p>
          <div className="mx-auto mt-6 max-w-2xl space-y-3 rounded-sm border border-gold/25 bg-midnight/40 p-8 backdrop-blur shadow-[inset_0_0_40px_rgba(0,0,0,0.55)]">
            {active.programme.map((row) => (
              <div
                key={row.hour}
                className="flex items-baseline gap-6 border-b border-gold/15 pb-3 last:border-b-0 last:pb-0"
              >
                <span className="w-20 font-didot text-base tracking-widest text-gold/85">
                  {row.hour}
                </span>
                <span className="flex-1 font-body text-sm italic leading-relaxed text-ivory/80">
                  {row.line}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Onward destinations */}
        <section className="mx-auto mt-20 max-w-5xl">
          <p className="text-center font-mono text-[0.55rem] uppercase tracking-[0.5em] text-gold/70">
            From the ballroom
          </p>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            <OnwardTile
              eyebrow="I"
              title="Return to the Grand Hall"
              subtitle="The Sitting Nude on the wall"
              caption="Modigliani · Kiki at sixteen · the centrepiece of the evening."
              href="/grand-hall"
            />
            <OnwardTile
              eyebrow="II"
              title="The Auction Room"
              subtitle="Live bidding, intimate"
              caption="When the band takes its first break, the gavel begins next door."
              href="/grand-hall/auction"
              feature
            />
            <OnwardTile
              eyebrow="III"
              title="The Parlor"
              subtitle="Through the back corridor"
              caption="Chagall on the walls. The bohemian room before the Grand Hall."
              href="/parlor"
            />
          </div>
        </section>
      </div>
    </main>
  );
}

function OnwardTile({
  eyebrow,
  title,
  subtitle,
  caption,
  href,
  feature = false,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  caption: string;
  href: string;
  feature?: boolean;
}) {
  return (
    <Link href={href} className="group">
      <article
        className={`flex h-full flex-col items-center justify-between rounded-sm p-8 text-center transition-all duration-700 ${
          feature
            ? 'border border-gold/60 bg-gradient-to-b from-gold/10 via-midnight/40 to-midnight/60 shadow-[inset_0_0_60px_rgba(212,175,55,0.18),0_0_40px_rgba(212,175,55,0.10)] md:scale-105'
            : 'border border-gold/25 bg-midnight/40 backdrop-blur shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]'
        } group-hover:border-gold/70 group-hover:shadow-[inset_0_0_60px_rgba(212,175,55,0.15),0_0_30px_rgba(212,175,55,0.12)]`}
        style={{ minHeight: '280px' }}
      >
        <p className="font-didot text-3xl tracking-widest text-gold/70 group-hover:text-gold">
          {eyebrow}
        </p>
        <div className="space-y-3">
          <h3 className="font-didot text-xl uppercase tracking-[0.18em] text-ivory drop-shadow">
            {title}
          </h3>
          <p className="font-display text-sm italic tracking-wider text-gold/80">
            {subtitle}
          </p>
        </div>
        <div className="space-y-3">
          <div className="mx-auto h-px w-10 bg-gold/40" />
          <p className="mx-auto max-w-[18ch] font-body text-xs italic leading-relaxed text-ivory/80">
            {caption}
          </p>
        </div>
      </article>
    </Link>
  );
}

function DecoBorder({ flipped = false }: { flipped?: boolean }) {
  return (
    <div className="flex items-center gap-3" style={{ transform: flipped ? 'scaleY(-1)' : undefined }}>
      <span className="block h-px flex-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <Cartouche />
      <span className="block h-px flex-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
    </div>
  );
}

function Cartouche() {
  return (
    <svg width="80" height="22" viewBox="0 0 80 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M40 2 C36 6, 32 8, 28 8 C32 12, 36 14, 40 14 C44 14, 48 12, 52 8 C48 8, 44 6, 40 2 Z" stroke="rgba(212,175,55,0.7)" strokeWidth="0.5" fill="rgba(212,175,55,0.08)" />
      <path d="M40 7 L40 17 M37 11 Q40 8 43 11 M40 13 Q38 16 40 18 Q42 16 40 13 Z" stroke="rgba(212,175,55,0.9)" strokeWidth="0.6" fill="none" />
      <circle cx="40" cy="11" r="0.8" fill="rgba(212,175,55,0.9)" />
      <path d="M12 11 Q18 8 24 11 Q18 14 12 11" stroke="rgba(212,175,55,0.5)" strokeWidth="0.4" fill="none" />
      <path d="M56 11 Q62 8 68 11 Q62 14 56 11" stroke="rgba(212,175,55,0.5)" strokeWidth="0.4" fill="none" />
      <circle cx="6" cy="11" r="0.8" fill="rgba(212,175,55,0.7)" />
      <circle cx="74" cy="11" r="0.8" fill="rgba(212,175,55,0.7)" />
    </svg>
  );
}

function FleurDeLis() {
  return (
    <svg width="28" height="34" viewBox="0 0 28 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M14 2 C14 6, 11 9, 8 11 C5 13, 4 16, 6 18 C7 17, 9 17, 10 18 C8 20, 7 22, 9 24 C10 23, 11 23, 12 24 L14 26 L16 24 C17 23, 18 23, 19 24 C21 22, 20 20, 18 18 C19 17, 21 17, 22 18 C24 16, 23 13, 20 11 C17 9, 14 6, 14 2 Z M11 14 Q14 12 17 14 L14 18 Z M9 24 L19 24 L19 28 L9 28 Z"
        stroke="rgba(212,175,55,0.95)"
        strokeWidth="0.7"
        fill="rgba(212,175,55,0.18)"
      />
    </svg>
  );
}
