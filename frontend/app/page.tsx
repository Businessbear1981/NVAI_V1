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
    <main className="relative h-screen w-screen overflow-hidden bg-midnight film-grain">
      {/* Home hero is a still image extracted from the last frame of the drone-approach
          video — chateau well-framed, zero motion, no video element. Reliable across
          all browsers, no race conditions, no buffering. */}
      <CinematicBackdrop
        imageSrc="https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_last_frame.jpg"
        fallbackGradient="radial-gradient(ellipse at 50% 35%, rgba(232,200,122,0.18) 0%, transparent 55%), radial-gradient(ellipse at 50% 80%, rgba(91,43,18,0.55) 0%, transparent 65%), linear-gradient(180deg, #1a1208 0%, #3b1f0f 40%, #1a0e08 100%)"
        overlay={0.4}
      />

      {/* Institute logo — top left */}
      <div className="absolute left-8 top-8 z-30 flex items-center gap-4 pointer-events-none">
        <Image
          src="/brand/nvai-logo.png"
          alt="Napa Valley Art Institut"
          width={210}
          height={163}
          priority
          className="h-24 w-auto drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] md:h-32"
        />
        <div className="hidden border-l border-gold/30 pl-4 md:block">
          <p className="font-mono text-[0.5rem] uppercase tracking-[0.35em] text-gold/70">Napa Valley</p>
          <p className="font-didot text-lg tracking-[0.16em] text-ivory drop-shadow">Art Institut</p>
        </div>
      </div>

      {/* Three marble plaques — small markers anchored to the bottom; the video dominates */}
      <div className="absolute inset-x-0 bottom-16 z-20 flex justify-center px-8">
        <div className="grid w-full max-w-2xl grid-cols-3 gap-4">
          <Link href="/kiki" aria-label="Kiki de Montparnasse">
            <MarbleTombstone
              eyebrow="The Marquee"
              title="Kiki"
              subtitle="Queen of Montparnasse"
              caption="Cabaret. Modigliani. The 107-year story."
            />
          </Link>

          <Link href="/foyer" aria-label="Enter the Chateau">
            <MarbleTombstone
              eyebrow="The Chateau"
              title="Enter Foyer"
              subtitle="Villa Monticello"
              caption="The collection awaits inside."
              featured
            />
          </Link>

          <Link href="/garden" aria-label="Secret Garden">
            <MarbleTombstone
              eyebrow="The Grounds"
              title="Secret Garden"
              subtitle="A garden party"
              caption="Walk the vineyard pathway."
            />
          </Link>
        </div>
      </div>

      {/* Tagline */}
      <div className="pointer-events-none absolute inset-x-0 bottom-24 z-20 text-center">
        <p className="font-didot text-sm italic tracking-wider text-ivory/70 drop-shadow">
          Authenticated by the Prague Gallery. Available under non-disclosure.
        </p>
      </div>

      {/* Essentials tabs */}
      <EssentialsBar />
    </main>
  );
}
