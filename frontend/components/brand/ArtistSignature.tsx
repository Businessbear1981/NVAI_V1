import Link from 'next/link';
import Image from 'next/image';
import type { Artist } from '@/lib/artists';

interface ArtistSignatureProps {
  artist: Artist;
  /** Visual size of the signature. */
  size?: 'sm' | 'md' | 'lg';
  /** Show the helper text below the signature (era + piece count). */
  showCaption?: boolean;
  /** If true, the whole tile becomes a Link to the artist's wing. */
  asLink?: boolean;
  /** Force the text fallback instead of trying to load the brass PNG. */
  forceFallback?: boolean;
  className?: string;
}

const HEIGHTS = {
  sm: 'h-12 md:h-16',
  md: 'h-20 md:h-28',
  lg: 'h-28 md:h-40',
} as const;

const TEXT_SIZES = {
  sm: 'text-2xl md:text-3xl',
  md: 'text-4xl md:text-5xl',
  lg: 'text-5xl md:text-6xl',
} as const;

const BLOCK_NAME_SIZES = {
  sm: 'text-[0.65rem] tracking-[0.42em]',
  md: 'text-[0.75rem] tracking-[0.48em] md:text-[0.85rem]',
  lg: 'text-[0.85rem] tracking-[0.5em] md:text-[1rem]',
} as const;

/**
 * Brass signature signifier for an artist. Falls back to a Didot rendering
 * of the artist's short name if the PNG isn't on disk yet (Phase 2).
 */
export default function ArtistSignature({
  artist,
  size = 'md',
  showCaption = true,
  asLink = true,
  forceFallback = false,
  className = '',
}: ArtistSignatureProps) {
  const heightClass = HEIGHTS[size];
  const textClass = TEXT_SIZES[size];
  const blockClass = BLOCK_NAME_SIZES[size];

  const showImage = !forceFallback && artist.hasSignature;

  const inner = (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {showImage ? (
        <div className="relative">
          <Image
            src={artist.signatureSrc}
            alt={`${artist.name} — signature`}
            width={420}
            height={140}
            className={`w-auto ${heightClass} object-contain drop-shadow-[0_2px_12px_rgba(110,147,129,0.22)]`}
            unoptimized
          />
        </div>
      ) : (
        // Fallback: the artist's short name in patinaed-brass typography.
        // Same Sentinel-Building palette as the real signatures so the page
        // reads as a unified set, not a mix of "real" and "missing."
        <p
          className={`font-didot italic ${textClass}`}
          style={{
            color: '#6E9381',
            textShadow:
              '0 1px 0 #A7BFA8, 0 -1px 0 #4A6E5E, 0 2px 12px rgba(110,147,129,0.25)',
            letterSpacing: '0.02em',
          }}
        >
          {artist.shortName}
        </p>
      )}

      {/* Block-letter name beneath the signature — gives instant clarity to
          visitors who can't read the script of the signature. Coppola green
          to tie into the patinaed-brass treatment. */}
      <p
        className={`mt-4 font-mono uppercase ${blockClass}`}
        style={{ color: '#A7BFA8' }}
      >
        {artist.shortName}
      </p>

      {showCaption && (
        <div className="mt-3 flex flex-col items-center gap-1">
          <p className="font-mono text-[0.5rem] uppercase tracking-[0.32em] text-gold/55">
            {artist.era}
          </p>
          <p className="font-body text-xs italic text-ivory/65">
            {artist.pieceCount} {artist.pieceCount === 1 ? 'work' : 'works'} · {artist.wingLabel}
          </p>
        </div>
      )}
    </div>
  );

  if (!asLink) return inner;

  return (
    <Link
      href={artist.wingHref}
      className="group block transition-all duration-500 hover:-translate-y-1"
      aria-label={`${artist.name} — enter the wing`}
    >
      {inner}
    </Link>
  );
}
