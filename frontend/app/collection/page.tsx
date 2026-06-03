import Link from 'next/link';
import CinematicBackdrop from '@/components/cinematic/CinematicBackdrop';
import ArtistSignature from '@/components/brand/ArtistSignature';
import { ARTISTS } from '@/lib/artists';

export const revalidate = 0;

export default function CollectionPage() {
  const totalPieces = ARTISTS.reduce((sum, a) => sum + a.pieceCount, 0);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-midnight film-grain">
      <CinematicBackdrop
        imageSrc="https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_last_frame.jpg"
        fallbackGradient="radial-gradient(ellipse at 50% 35%, rgba(232,200,122,0.10) 0%, transparent 55%), linear-gradient(180deg, #0a0807 0%, #1a1208 50%, #0a0605 100%)"
        overlay={0.62}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:py-24">
        <Link
          href="/foyer"
          className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/55 hover:text-gold"
        >
          ← Return to the foyer
        </Link>

        <header className="mt-12 text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
            The Collection · By Hand
          </p>
          <h1 className="mt-4 font-didot text-4xl uppercase tracking-[0.14em] text-ivory md:text-6xl">
            Eleven Hands
          </h1>
          <div className="mx-auto mt-6 h-px w-24 bg-gold/40" />
          <p className="mx-auto mt-8 max-w-2xl font-body italic text-ivory/75 leading-relaxed">
            Each signature below is an authentic mark — extracted from the work it
            appears on, or reproduced from the artist's known monogram in the museum
            record. Touch a hand to enter that wing.
          </p>
          <p className="mt-6 font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/60">
            {totalPieces} works · under exclusive representation
          </p>
        </header>

        <section className="mt-20 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {ARTISTS.map((artist) => (
            <ArtistSignature
              key={artist.slug}
              artist={artist}
              size="md"
              showCaption
              asLink
            />
          ))}
        </section>

        <footer className="mt-20 text-center font-body text-xs italic text-ivory/55">
          Detailed provenance, condition, and pricing are released by tier after a
          signed{' '}
          <Link href="/access" className="text-gold/80 underline-offset-4 hover:underline">
            DDNDA
          </Link>
          .
        </footer>
      </div>
    </main>
  );
}
