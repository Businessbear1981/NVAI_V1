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
          DESTINATION at the end of Kiki's immersive, not a separate marquee tab.
          Mobile: in-flow with bottom padding to clear EssentialsBar; Desktop: absolute bottom-16 */}
      <div className="relative z-20 mt-[60vh] flex justify-center px-4 pb-28 md:absolute md:inset-x-0 md:bottom-16 md:mt-0 md:px-8 md:pb-0">
        <div className="grid w-full max-w-3xl grid-cols-1 items-stretch gap-4 md:grid-cols-[1fr_1.5fr_1fr]">
          <Link href="/grounds" aria-label="Walk the Grounds — Self-Guided" className="block h-full">
            <MarbleTombstone
              eyebrow="Left · The Grounds"
              title="Walk the Grounds"
              subtitle="Self-Guided"
              caption="The vineyard, the wine caves, the artist gardens. Your way."
            />
          </Link>

          {/* KIKI — featured center marquee. The WOW. The front door of the immersive. */}
          <Link href="/kiki" aria-label="Kiki de Montparnasse — the immersive" className="block h-full">
            <div className="marble group relative flex h-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md px-4 py-5 text-center transition-all duration-500 hover:scale-[1.02]">
              <p className="font-mono text-[0.5rem] uppercase tracking-[0.5em] text-[#3a2a0a]/70">
                The Marquee
              </p>
              <h2
                className="mt-2 font-didot text-4xl uppercase tracking-[0.22em] text-[#0a0605] md:text-5xl"
                style={{ textShadow: '0 1px 2px rgba(255,245,220,0.45), 0 0 8px rgba(255,245,220,0.25)' }}
              >
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

          <Link href="/tour" aria-label="Take the Guided Tour of the Institute" className="block h-full">
            <MarbleTombstone
              eyebrow="Right · The Tour"
              title="Guided Tour"
              subtitle="Bernard narrates"
              caption="Eighteen chapters. Every room. The full Institute."
            />
          </Link>
        </div>
      </div>


      {/* Essentials tabs */}
      <EssentialsBar />
    </main>
  );
}
