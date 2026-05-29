import Link from 'next/link';
import EssentialsBar from '@/components/essentials/EssentialsBar';
import MarbleTombstone from '@/components/tombstones/MarbleTombstone';
import CinematicBackdrop from '@/components/cinematic/CinematicBackdrop';

export default function HomePage() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-midnight film-grain">
      {/* Aerial drone approach — the platform's opening shot */}
      <CinematicBackdrop
        videoSrc="/videos/nvai_aerial_drone_approach_5k.mp4"
        fallbackGradient="radial-gradient(ellipse at 50% 35%, rgba(232,200,122,0.18) 0%, transparent 55%), radial-gradient(ellipse at 50% 80%, rgba(91,43,18,0.55) 0%, transparent 65%), linear-gradient(180deg, #1a1208 0%, #3b1f0f 40%, #1a0e08 100%)"
        overlay={0.4}
      />

      {/* Institute mark */}
      <div className="absolute left-0 right-0 top-10 z-20 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.35em] text-gold/80">
            Napa Valley
          </p>
          <p className="font-display text-2xl tracking-[0.18em] text-ivory drop-shadow-lg">
            Art Institute
          </p>
          <div className="mx-auto mt-2 h-px w-12 bg-gold/40" />
        </div>
      </div>

      {/* Three marble tombstones */}
      <div className="absolute inset-x-0 bottom-40 z-20 flex justify-center px-8">
        <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
          <Link href="/kiki" aria-label="Kiki de Montparnasse">
            <MarbleTombstone
              eyebrow="The Marquee"
              title="Kiki"
              subtitle="Queen of Montparnasse"
              caption="Cabaret. Modigliani. The 107-year story."
            />
          </Link>

          <Link href="/ddnda" aria-label="Enter the Chateau (sign DDNDA first)">
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
