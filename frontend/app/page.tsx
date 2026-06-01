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

      {/* Institute logo — top left, with Open Letter link beneath */}
      <div className="absolute left-8 top-8 z-30 flex flex-col items-start gap-3">
        <div className="flex items-center gap-4 pointer-events-none">
          <Image
            src="/brand/nvai-logo-transparent.png"
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
        <a
          href="https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_open_letter.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-gold/75 transition-colors hover:text-gold"
        >
          Open Letter →
        </a>
        <a
          href="/about"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-gold/75 transition-colors hover:text-gold"
        >
          About the Institut →
        </a>
        <a
          href="/consign"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-gold/75 transition-colors hover:text-gold"
        >
          Consignment Services →
        </a>
        <a
          href="/about#leadership"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-gold/75 transition-colors hover:text-gold"
        >
          Meet the Curators →
        </a>
      </div>

      {/* Marquee trio — KIKI featured center (the front door, the WOW). MODI is the
          DESTINATION at the end of Kiki's immersive, not a separate marquee tab. */}
      <div className="absolute inset-x-0 bottom-16 z-20 flex justify-center px-8">
        <div className="grid w-full max-w-3xl grid-cols-[1fr_1.5fr_1fr] items-stretch gap-4">
          <Link href="/foyer" aria-label="Enter the Chateau" className="block h-full">
            <MarbleTombstone
              eyebrow="The Chateau"
              title="Enter Foyer"
              subtitle="Villa Monticello"
              caption="The collection awaits inside."
            />
          </Link>

          {/* KIKI — featured center marquee. The WOW. The front door of the immersive. */}
          <Link href="/kiki" aria-label="Kiki de Montparnasse — the immersive" className="block h-full">
            <div className="marble group relative flex h-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md px-4 py-5 text-center transition-all duration-500 hover:scale-[1.02]">
              <p className="font-mono text-[0.5rem] uppercase tracking-[0.5em] text-[#3a2a0a]/70">
                The Marquee
              </p>
              <h2 className="mt-2 font-didot text-4xl uppercase tracking-[0.22em] text-[#1a0e05] drop-shadow-sm md:text-5xl">
                Kiki
              </h2>
              <p className="mt-1 font-display text-sm italic tracking-[0.18em] text-[#5a3a1a]">
                Queen of Montparnasse
              </p>
              <div className="mx-auto my-3 h-px w-12 bg-[#5a3a1a]/70" />
              {/* Handwritten "Kiki" — thick quill ink, diagonal */}
              <div className="relative h-10 w-full">
                <span
                  className="absolute left-1/2 top-1/2 italic text-[#7c0a0a]"
                  style={{
                    fontFamily: 'Georgia, "Cormorant Garamond", "Times New Roman", serif',
                    fontWeight: 700,
                    fontSize: '1.5rem',
                    transform: 'translate(-50%, -50%) rotate(-14deg)',
                    letterSpacing: '0.04em',
                  }}
                  aria-hidden
                >
                  Kiki
                </span>
              </div>
              <p className="mt-2 font-body text-[0.65rem] uppercase tracking-[0.32em] text-[#2a1a05]/85">
                The 107-year story
              </p>
            </div>
          </Link>

          <Link href="/garden" aria-label="Secret Garden" className="block h-full">
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
