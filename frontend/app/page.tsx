import Link from 'next/link';
import Image from 'next/image';
import EssentialsBar from '@/components/essentials/EssentialsBar';
import MarbleTombstone from '@/components/tombstones/MarbleTombstone';
import CinematicBackdrop from '@/components/cinematic/CinematicBackdrop';

// Force a fresh render on every request during active iteration so edge cache never
// shows stale HTML. Remove this once the home page is locked.
export const revalidate = 0;

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden bg-midnight film-grain md:h-screen md:overflow-hidden">
      {/* Home hero is a still image extracted from the last frame of the drone-approach
          video — chateau well-framed, zero motion, no video element. Reliable across
          all browsers, no race conditions, no buffering. */}
      <CinematicBackdrop
        imageSrc="https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_last_frame.jpg"
        fallbackGradient="radial-gradient(ellipse at 50% 35%, rgba(232,200,122,0.18) 0%, transparent 55%), radial-gradient(ellipse at 50% 80%, rgba(91,43,18,0.55) 0%, transparent 65%), linear-gradient(180deg, #1a1208 0%, #3b1f0f 40%, #1a0e08 100%)"
        overlay={0.4}
      />

      {/* Institute logo — top left, with Open Letter link beneath */}
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
            <p
              className="font-didot text-xl tracking-[0.14em] drop-shadow mt-1"
              style={{ color: '#E89A4C' }}
            >
              &amp; Virtual Gallery
            </p>
          </div>
        </div>
        <a
          href="https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_introduction.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-gold/75 transition-colors hover:text-gold"
        >
          Introduction →
        </a>
        <a
          href="https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_open_letter.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-gold/75 transition-colors hover:text-gold"
        >
          Open Letter →
        </a>
        <a
          href="https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_press_release_modigliani.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-gold/75 transition-colors hover:text-gold"
        >
          Press Release · Modigliani Nude →
        </a>
        <a
          href="https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_brokerage_agreements.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-gold/75 transition-colors hover:text-gold"
        >
          Brokerage Agreements →
        </a>
        <a
          href="/access"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-gold/75 transition-colors hover:text-gold"
        >
          DDNDA →
        </a>
        <a
          href="/consign"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-gold/75 transition-colors hover:text-gold"
        >
          Representation →
        </a>
      </div>

      {/* Brass silhouette strip — museum-placard energy at the bottom of the viewport.
          Walk the Grounds (chateau) · Kiki (Noire et Blanche profile) · Guided Tour (velvet rope).
          Quiet, recognisable, doesn't dominate. Paintings own the upper viewport. */}
      <div className="relative z-20 mt-[55vh] flex justify-center px-4 pb-28 md:absolute md:inset-x-0 md:bottom-12 md:mt-0 md:px-8 md:pb-0">
        <div className="flex flex-wrap items-end justify-center gap-12 md:gap-24">
          <Link href="/grounds" aria-label="Walk the Grounds" className="group flex flex-col items-center transition-opacity duration-500 opacity-70 hover:opacity-100">
            <Image
              src="/brand/silhouettes/grounds-chateau.png"
              alt=""
              width={120}
              height={120}
              className="h-20 w-auto md:h-28"
            />
            <p className="mt-2 font-didot text-xs uppercase tracking-[0.28em] text-gold/80 group-hover:text-gold">
              Walk the Grounds
            </p>
          </Link>

          <Link href="/kiki" aria-label="Kiki — Queen of Montparnasse" className="group flex flex-col items-center transition-opacity duration-500 opacity-70 hover:opacity-100">
            <Image
              src="/brand/silhouettes/kiki-profile.png"
              alt=""
              width={120}
              height={120}
              className="h-20 w-auto md:h-28"
            />
            <p className="mt-2 font-didot text-xs uppercase tracking-[0.28em] text-gold/80 group-hover:text-gold">
              Kiki
            </p>
          </Link>

          <Link href="/tour" aria-label="Take the Guided Tour" className="group flex flex-col items-center transition-opacity duration-500 opacity-70 hover:opacity-100">
            <Image
              src="/brand/silhouettes/tour-velvet-rope.png"
              alt=""
              width={120}
              height={120}
              className="h-20 w-auto md:h-28"
            />
            <p className="mt-2 font-didot text-xs uppercase tracking-[0.28em] text-gold/80 group-hover:text-gold">
              Guided Tour
            </p>
          </Link>
        </div>
      </div>


      {/* Essentials tabs */}
      <EssentialsBar />
    </main>
  );
}
