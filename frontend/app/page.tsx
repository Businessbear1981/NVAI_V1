import Link from 'next/link';
import Image from 'next/image';
import EssentialsBar from '@/components/essentials/EssentialsBar';
import CinematicBackdrop from '@/components/cinematic/CinematicBackdrop';

export const revalidate = 0;

// Da Vinci ornithopter wing — period-accurate sketch in brass
function WingIcon() {
  return (
    <svg
      viewBox="0 0 96 44"
      className="w-16 h-8 opacity-80"
      fill="none"
      stroke="#C9A84C"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Left wing */}
      <line x1="46" y1="22" x2="4"  y2="8"  strokeWidth="2" />
      <line x1="46" y1="22" x2="12" y2="30" strokeWidth="1.2" opacity="0.6" />
      <line x1="36" y1="13" x2="32" y2="30" strokeWidth="1.2" />
      <line x1="25" y1="10" x2="19" y2="28" strokeWidth="1.2" />
      <line x1="14" y1="9"  x2="8"  y2="24" strokeWidth="1.2" />
      {/* Right wing */}
      <line x1="50" y1="22" x2="92" y2="8"  strokeWidth="2" />
      <line x1="50" y1="22" x2="84" y2="30" strokeWidth="1.2" opacity="0.6" />
      <line x1="60" y1="13" x2="64" y2="30" strokeWidth="1.2" />
      <line x1="71" y1="10" x2="77" y2="28" strokeWidth="1.2" />
      <line x1="82" y1="9"  x2="88" y2="24" strokeWidth="1.2" />
      {/* Body */}
      <circle cx="48" cy="22" r="2.5" fill="#C9A84C" strokeWidth="0" />
      <line x1="48" y1="24" x2="48" y2="40" strokeWidth="1.8" />
      <line x1="42" y1="34" x2="54" y2="34" strokeWidth="1.4" opacity="0.7" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden bg-midnight film-grain md:h-screen md:overflow-hidden">
      <CinematicBackdrop
        imageSrc="https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_last_frame.jpg"
        fallbackGradient="radial-gradient(ellipse at 50% 35%, rgba(232,200,122,0.18) 0%, transparent 55%), radial-gradient(ellipse at 50% 80%, rgba(91,43,18,0.55) 0%, transparent 65%), linear-gradient(180deg, #1a1208 0%, #3b1f0f 40%, #1a0e08 100%)"
        overlay={0.25}
      />

      {/* Institute logo — top left */}
      <div className="absolute left-4 top-4 z-30 flex flex-col items-start gap-2 md:left-8 md:top-8 md:gap-3">
        <div className="flex items-center gap-4 pointer-events-none">
          <Image
            src="/brand/nvai-logo-transparent.png"
            alt="Napa Valley Art Institut"
            width={210}
            height={163}
            priority
            className="h-24 w-auto drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] md:h-32"
          />
          <div className="border-l border-gold/30 pl-4">
            <p className="font-mono text-[0.5rem] uppercase tracking-[0.35em] text-gold/70">Napa Valley</p>
            <p className="font-didot text-lg tracking-[0.16em] text-ivory drop-shadow">Art Institut</p>
            <p className="font-didot text-xl tracking-[0.14em] drop-shadow mt-1" style={{ color: '#E89A4C' }}>
              &amp; Virtual Gallery
            </p>
          </div>
        </div>
        <a href="https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_introduction.pdf" target="_blank" rel="noopener noreferrer" className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-gold/75 transition-colors hover:text-gold">Introduction →</a>
        <a href="https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_open_letter.pdf" target="_blank" rel="noopener noreferrer" className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-gold/75 transition-colors hover:text-gold">Open Letter →</a>
        <a href="https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_press_release_modigliani.pdf" target="_blank" rel="noopener noreferrer" className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-gold/75 transition-colors hover:text-gold">Press Release · Modigliani Nude →</a>
        <a href="https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_brokerage_agreements.pdf" target="_blank" rel="noopener noreferrer" className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-gold/75 transition-colors hover:text-gold">Brokerage Agreements →</a>
        <a href="/access" target="_blank" rel="noopener noreferrer" className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-gold/75 transition-colors hover:text-gold">DDNDA →</a>
        <a href="/consign" target="_blank" rel="noopener noreferrer" className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-gold/75 transition-colors hover:text-gold">Representation →</a>
      </div>

      {/* Three glass entry panels — sit above EssentialsBar (~56px).
          Mobile: pb-32 clears the fixed bar. Desktop: bottom-20 = 80px clearance. */}
      <div className="relative z-20 flex items-end justify-center px-4 pb-32 mt-[44vh] md:absolute md:inset-x-0 md:bottom-20 md:mt-0 md:px-12 md:pb-0">
        <div className="flex flex-col items-center gap-3 w-full max-w-5xl md:flex-row md:items-end md:gap-6">

          {/* LEFT — Guided Tour */}
          <Link href="/tour" className="group w-full md:flex-1" aria-label="Guided Tour">
            <div
              className="rounded-sm border border-gold/20 px-5 py-4 text-center transition-all duration-500 group-hover:border-gold/50 group-hover:bg-white/5"
              style={{
                background: 'rgba(10, 8, 4, 0.18)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
              }}
            >
              <Image
                src="/brand/silhouettes/tour-velvet-rope.png"
                alt=""
                width={80}
                height={80}
                className="mx-auto h-14 w-auto opacity-70 group-hover:opacity-100 transition-opacity"
              />
              <p className="mt-4 font-mono text-[0.5rem] uppercase tracking-[0.42em] text-gold/55 group-hover:text-gold/80">
                Guided Tour
              </p>
              <p className="mt-2 font-didot text-xl uppercase tracking-[0.18em] text-ivory/80 group-hover:text-ivory">
                The Tour
              </p>
              <p className="mt-2 font-body text-xs italic text-ivory/50 group-hover:text-ivory/70">
                Every room. Every artist. Every story.
              </p>
            </div>
          </Link>

          {/* CENTER — Enter (featured, taller) */}
          <Link href="/foyer" className="group w-full md:flex-[1.5]" aria-label="Enter the Chateau">
            <div
              className="rounded-sm border border-gold/30 px-8 py-8 text-center transition-all duration-500 group-hover:border-gold/70 group-hover:bg-white/5 md:pb-10 md:pt-10"
              style={{
                background: 'rgba(10, 8, 4, 0.15)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
              }}
            >
              {/* Kiki silhouette — 3D raised */}
              <div
                className="relative mx-auto mb-3 w-fit transition-transform duration-500 group-hover:-translate-y-1"
                style={{ filter: 'drop-shadow(0 6px 18px rgba(201,168,76,0.35))' }}
              >
                <Image
                  src="/brand/silhouettes/kiki-profile.png"
                  alt=""
                  width={80}
                  height={80}
                  className="mx-auto h-16 w-auto opacity-85 group-hover:opacity-100 transition-opacity md:h-20"
                />
              </div>

              {/* Da Vinci wing icon */}
              <div className="mx-auto mb-4 flex justify-center opacity-60 group-hover:opacity-90 transition-opacity">
                <WingIcon />
              </div>

              {/* Brass 3D ENTER lettering */}
              <p
                className="font-didot text-5xl uppercase md:text-6xl"
                style={{
                  color: '#C9A84C',
                  letterSpacing: '0.22em',
                  textShadow:
                    '0 1px 0 #b8860c, 0 2px 0 #a07a0a, 0 3px 0 #8a6808, 0 4px 0 #725806, 0 5px 0 #5c4504, 0 6px 8px rgba(0,0,0,0.6)',
                }}
              >
                Enter
              </p>

              <div className="mx-auto mt-4 h-px w-10 bg-gold/30 group-hover:w-20 transition-all duration-500" />

              <p className="mt-3 font-mono text-[0.48rem] uppercase tracking-[0.42em] text-gold/50 group-hover:text-gold/75">
                Foyer · Gallery · Auction · Upstairs
              </p>
            </div>
          </Link>

          {/* RIGHT — Walk the Grounds */}
          <Link href="/grounds" className="group w-full md:flex-1" aria-label="Walk the Grounds">
            <div
              className="rounded-sm border border-gold/20 px-5 py-4 text-center transition-all duration-500 group-hover:border-gold/50 group-hover:bg-white/5"
              style={{
                background: 'rgba(10, 8, 4, 0.18)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
              }}
            >
              <Image
                src="/brand/silhouettes/grounds-chateau.png"
                alt=""
                width={80}
                height={80}
                className="mx-auto h-14 w-auto opacity-70 group-hover:opacity-100 transition-opacity"
              />
              <p className="mt-4 font-mono text-[0.5rem] uppercase tracking-[0.42em] text-gold/55 group-hover:text-gold/80">
                The Estate
              </p>
              <p className="mt-2 font-didot text-xl uppercase tracking-[0.18em] text-ivory/80 group-hover:text-ivory">
                The Grounds
              </p>
              <p className="mt-2 font-body text-xs italic text-ivory/50 group-hover:text-ivory/70">
                Eleven artists. The vineyard. The patio.
              </p>
            </div>
          </Link>

        </div>
      </div>

      <EssentialsBar />
    </main>
  );
}
