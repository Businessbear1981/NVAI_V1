import Link from 'next/link';
import CinematicBackdrop from '@/components/cinematic/CinematicBackdrop';
import RotatingBackdrop from '@/components/cinematic/RotatingBackdrop';

const HALL_BACKDROP =
  'radial-gradient(ellipse at 50% 18%, rgba(232,200,122,0.32) 0%, transparent 50%), radial-gradient(ellipse at 50% 92%, rgba(60,30,15,0.85) 0%, transparent 70%), linear-gradient(180deg, #1a1006 0%, #2a1c0c 40%, #0a0605 100%)';

// Grand Hall rotation — now using the dedicated luxury auction-house interior
// + the two ballroom variants (Renaissance dancing → 1920s Gatsby art party)
// + the auction lobby (people waiting before the gavel).
const HALL_LEAD_IN = 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_great_hall_5k.mp4';
const HALL_ROTATION = [
  'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_grand_ballroom_renaissance_5k.mp4',
  'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_grand_ballroom_gatsby_5k.mp4',
  'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_auction_lobby_5k.mp4',
];

const DESTINATIONS = [
  {
    eyebrow: 'I',
    title: 'The Circle',
    subtitle: 'Full Gallery',
    description: 'All twenty-seven works, slowly turning.',
    href: '/gallery',
  },
  {
    eyebrow: 'II',
    title: "Auction Room",
    subtitle: 'Christie\'s-scale · or intimate',
    description: 'Live bidding. Video conference. Concierge dinners.',
    href: '/grand-hall/auction',
  },
  {
    eyebrow: 'III',
    title: 'Cabinet de Curiosités',
    subtitle: 'Modigliani · the Kiki feature',
    description: 'African masks under glass. Three portraits. The lost story.',
    href: '/grand-hall/modigliani',
    feature: true,
  },
  {
    eyebrow: 'IV',
    title: "The Pollock Studio",
    subtitle: 'East Hampton · 1950',
    description: 'Two new pieces. Drip-paint apex on raw plank floor.',
    href: '/grand-hall/pollock',
  },
  {
    eyebrow: 'V',
    title: 'Departure',
    subtitle: 'Return to the Foyer',
    description: 'The loop closes. Departures are also entrances.',
    href: '/foyer',
  },
];

export default function GrandHallPage() {
  return (
    <main className="relative min-h-screen overflow-hidden film-grain">
      <RotatingBackdrop leadIn={HALL_LEAD_IN} rotation={HALL_ROTATION} overlay={0.6} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: HALL_BACKDROP, mixBlendMode: 'multiply' }} />

      <div className="relative z-10 px-8 py-10">
        <Link
          href="/parlor"
          className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 transition-colors hover:text-gold"
        >
          ← Back through the Parlor
        </Link>

        {/* Art Deco crown */}
        <div className="mx-auto mt-10 max-w-5xl">
          <DecoBorder />
          <header className="text-center py-10">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.5em] text-gold/80">
              Napa Valley Art Institute
            </p>
            <p className="mt-2 font-mono text-[0.55rem] uppercase tracking-[0.5em] text-gold/60">
              vous invite chaleureusement
            </p>
            <h1 className="mt-8 font-didot text-6xl uppercase tracking-[0.15em] text-ivory drop-shadow-lg md:text-7xl">
              La Grande Salle
            </h1>
            <p className="mt-3 font-mono text-[0.55rem] uppercase tracking-[0.4em] text-ivory/80">
              The Grand Hall
            </p>
            <p className="mt-6 font-display text-2xl italic tracking-wider text-gold/90">
              A French chateau ballroom dissolving into a digital curated auction house
            </p>
            <p className="mt-4 font-body italic text-base text-ivory/75 max-w-3xl mx-auto leading-relaxed">
              Crystal chandeliers over parquet de Versailles. Gilded boiserie, red velvet drapes
              tied in gold cord. The evening opens with period French dancing. By midnight, a modern
              art party has folded in — galleries, collectors, the curious. Then the room turns again:
              a digital curated luxury auction house, opulence-inspired, screens lit low, paddles raised.
              Three salons in one room, across one evening.
            </p>
            <div className="mx-auto mt-8 flex items-center justify-center gap-4">
              <span className="block h-px w-24 bg-gold/40" />
              <FleurDeLis />
              <span className="block h-px w-24 bg-gold/40" />
            </div>
          </header>
          <DecoBorder flipped />
        </div>

        {/* The Modi-Kiki nude — featured LARGE as the centrepiece of the room */}
        <section className="mx-auto mt-16 max-w-6xl">
          <div className="text-center mb-6">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.5em] text-gold/80">
              The piece on the wall tonight
            </p>
          </div>
          <Link href="/piece/modigliani-sitting-nude-with-crossed-hands" className="block group">
            <article
              className="relative mx-auto"
              style={{
                maxWidth: '52rem',
                background:
                  'radial-gradient(ellipse at 50% 0%, rgba(255,210,140,0.45) 0%, rgba(232,200,122,0.18) 30%, transparent 60%)',
                padding: '6rem 2rem 3rem',
              }}
            >
              {/* Brass picture light fixture */}
              <div className="absolute left-1/2 top-6 -translate-x-1/2 z-20">
                <div
                  className="h-3 w-40 rounded-full"
                  style={{
                    background: 'linear-gradient(180deg, #d4a64a 0%, #8a6020 60%, #4a3008 100%)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,220,150,0.7)',
                  }}
                />
                <div
                  className="absolute left-1/2 top-2 -translate-x-1/2 h-1.5 w-32 rounded-full"
                  style={{ background: 'rgba(255,210,140,0.95)', boxShadow: '0 0 36px rgba(255,210,140,0.9)' }}
                />
              </div>

              {/* The painting in its gilt frame */}
              <div
                className="relative mx-auto"
                style={{
                  maxWidth: '40rem',
                  padding: '1.4rem',
                  background:
                    'linear-gradient(135deg, #d4a64a 0%, #8a6020 35%, #b08832 65%, #6a4815 100%)',
                  boxShadow:
                    '0 40px 80px -10px rgba(0,0,0,0.95), 0 0 100px -10px rgba(255,210,140,0.4), inset 0 1px 0 rgba(255,220,150,0.5), inset 0 -1px 0 rgba(40,20,5,0.6)',
                }}
              >
                <div
                  className="overflow-hidden"
                  style={{ boxShadow: 'inset 0 0 0 2px rgba(40,25,10,0.9), inset 0 0 12px rgba(0,0,0,0.4)' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/paintings/modigliani-sitting-nude-with-crossed-hands.jpg"
                    alt="Modigliani — Sitting Nude with Crossed Hands"
                    className="block w-full"
                  />
                </div>
              </div>

              {/* Brass placard */}
              <div className="mt-8 text-center">
                <div
                  className="inline-block px-8 py-3 rounded-sm"
                  style={{
                    background: 'linear-gradient(180deg, rgba(212,175,55,0.22) 0%, rgba(40,30,15,0.7) 100%)',
                    border: '1px solid rgba(232,200,122,0.5)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,220,150,0.3)',
                  }}
                >
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/85">
                    Centrepiece · Cabinet de Curiosités
                  </p>
                  <h2 className="mt-2 font-didot text-2xl tracking-wider text-ivory md:text-3xl">
                    Amedeo Modigliani · <em>Sitting Nude with Crossed Hands</em>
                  </h2>
                  <p className="mt-1 font-display italic text-gold/90">
                    c. 1917 · 40.5 × 33 cm · oil on canvas · Alice Prin (Kiki) at sixteen
                  </p>
                  <p className="mt-3 font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/80 group-hover:underline underline-offset-4">
                    Enter the dossier →
                  </p>
                </div>
              </div>
            </article>
          </Link>
        </section>

        {/* Programme */}
        <section className="mx-auto mt-16 max-w-7xl">
          <p className="text-center font-mono text-[0.55rem] uppercase tracking-[0.5em] text-gold/70 mb-2">
            Programme of the evening
          </p>
          <p className="text-center font-display text-base italic tracking-wider text-gold/80 mb-8">
            chateau · art party · digital auction house
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
            {DESTINATIONS.map((d) => (
              <Link key={d.href} href={d.href} className="group">
                <article
                  className={`relative flex h-full flex-col items-center justify-between rounded-sm p-8 text-center transition-all duration-700 ${
                    d.feature
                      ? 'border border-gold/60 bg-gradient-to-b from-gold/10 via-midnight/40 to-midnight/60 shadow-[inset_0_0_60px_rgba(212,175,55,0.18),0_0_40px_rgba(212,175,55,0.10)] md:scale-105'
                      : 'border border-gold/25 bg-midnight/40 backdrop-blur shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]'
                  } group-hover:border-gold/70 group-hover:shadow-[inset_0_0_60px_rgba(212,175,55,0.15),0_0_30px_rgba(212,175,55,0.12)]`}
                  style={{ minHeight: '320px' }}
                >
                  <p className="font-didot text-3xl tracking-widest text-gold/70 group-hover:text-gold">
                    {d.eyebrow}
                  </p>
                  <div className="space-y-3">
                    <h2 className="font-didot text-2xl uppercase tracking-[0.18em] text-ivory drop-shadow">
                      {d.title}
                    </h2>
                    <p className="font-display text-base italic tracking-wider text-gold/80">
                      {d.subtitle}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="mx-auto h-px w-10 bg-gold/40" />
                    <p className="font-body text-xs italic text-ivory/80 max-w-[14ch] mx-auto leading-relaxed">
                      {d.description}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
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
  // French chateau cartouche: a small rocaille-style ornament with central fleur-de-lis
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
