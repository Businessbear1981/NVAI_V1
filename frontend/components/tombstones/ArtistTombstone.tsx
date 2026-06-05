import Link from 'next/link';
import ArtistSignature from '@/components/brand/ArtistSignature';
import { getArtist } from '@/lib/artists';

interface ArtistTombstoneProps {
  slug: string;
  href: string;
  caption?: string;
  featured?: boolean;
}

export default function ArtistTombstone({
  slug,
  href,
  caption,
  featured = false,
}: ArtistTombstoneProps) {
  const artist = getArtist(slug);

  // No box, no marble, no border — just the signature and block lettering floating.
  const wrapClass = `group flex flex-col items-center justify-center py-6 text-center transition-all duration-500 cursor-pointer ${
    featured ? 'scale-105' : ''
  }`;

  if (!artist) {
    return (
      <Link href={href} className="block">
        <div className={wrapClass}>
          <p className="font-didot text-lg uppercase tracking-[0.18em] text-gold/80 group-hover:text-gold">
            {slug}
          </p>
          {caption && (
            <p className="mt-2 font-body text-[0.7rem] italic tracking-wider text-ivory/60">
              {caption}
            </p>
          )}
        </div>
      </Link>
    );
  }

  return (
    <Link href={href} className="block" aria-label={`${artist.name} — enter the wing`}>
      <div className={wrapClass}>
        <div className="transition-all duration-500 group-hover:-translate-y-1"
             style={{ filter: 'drop-shadow(0 4px 16px rgba(201,168,76,0.3))' }}>
          <ArtistSignature
            artist={artist}
            size="lg"
            asLink={false}
            showCaption={false}
          />
        </div>
        {caption && (
          <p className="mt-4 font-body text-[0.7rem] italic tracking-wider text-ivory/65 group-hover:text-ivory/85">
            {caption}
          </p>
        )}
      </div>
    </Link>
  );
}
