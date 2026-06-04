import Link from 'next/link';
import ArtistSignature from '@/components/brand/ArtistSignature';
import { getArtist } from '@/lib/artists';

interface ArtistTombstoneProps {
  /** Artist slug — e.g. 'picasso', 'monet', 'davinci'. */
  slug: string;
  /** Where the tile links to (usually the artist's wing). */
  href: string;
  /** Optional italic caption rendered beneath the signature. */
  caption?: string;
  /** Lifts the tile slightly + adds emphasis to mark it as primary. */
  featured?: boolean;
}

/**
 * Tombstone variant that uses the brass ArtistSignature PNG as its visual
 * centerpiece — same marble + ring + gold treatment as MarbleTombstone, sized
 * to match. Falls back to a plain marble tile with the slug as title if no
 * matching artist record exists in lib/artists.
 */
export default function ArtistTombstone({
  slug,
  href,
  caption,
  featured = false,
}: ArtistTombstoneProps) {
  const artist = getArtist(slug);

  const tileClass = `marble group flex h-full cursor-pointer flex-col items-center justify-center rounded-md px-4 py-5 text-center transition-all duration-500 hover:ring-1 hover:ring-gold/60 hover:shadow-2xl ${
    featured ? 'scale-105 ring-1 ring-gold/40' : ''
  }`;

  if (!artist) {
    return (
      <Link href={href} className="block h-full">
        <div className={tileClass}>
          <h2 className="font-didot text-base uppercase tracking-[0.12em] text-[#1a0e05] md:text-lg">
            {slug}
          </h2>
          {caption && (
            <>
              <div className="mx-auto my-2 h-px w-6 bg-[#5a3a1a]" />
              <p className="font-body text-[0.7rem] italic tracking-wider text-[#2a1a05]">
                {caption}
              </p>
            </>
          )}
        </div>
      </Link>
    );
  }

  return (
    <Link href={href} className="block h-full" aria-label={`${artist.name} — enter the wing`}>
      <div className={tileClass}>
        <ArtistSignature
          artist={artist}
          size="lg"
          asLink={false}
          showCaption={false}
        />
        {caption && (
          <>
            <div className="mx-auto my-3 h-px w-8 bg-[#5a3a1a]" />
            <p className="font-body text-[0.7rem] italic tracking-wider text-[#2a1a05]">
              {caption}
            </p>
          </>
        )}
      </div>
    </Link>
  );
}
