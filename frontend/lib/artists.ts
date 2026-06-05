/**
 * The 11 artists in the NVAI collection.
 * Each gets a brass signature signifier rendered via <ArtistSignature/>.
 *
 * `signatureSrc` is the brass-treated PNG; if it isn't on disk yet the
 * component falls back to a Didot serif rendering of the artist's name.
 *
 * `wingHref` is the canonical landing page for the artist's wing.
 */

import { PAINTINGS } from './paintings';

export interface Artist {
  slug: string;
  name: string;            // display name ("Pablo Picasso")
  shortName: string;       // signature word ("Picasso")
  signatureSrc: string;    // /brand/signatures/<slug>.png
  hasSignature: boolean;   // true if signatureSrc exists on disk (Phase 2)
  wingHref: string;
  wingLabel: string;       // "Bateau-Lavoir · Boisgeloup · Mougins"
  pieceCount: number;      // derived from PAINTINGS at build time
  era: string;             // "1881–1973"
}

// hasSignature reflects whether /public/brand/signatures/<slug>.png is
// present on disk and a clean authentic source (NOT a fake render). Update
// this when you add a real signature scan in scripts/generate_signatures.py.
const ARTIST_META: Omit<Artist, 'pieceCount'>[] = [
  {
    slug: 'picasso',
    name: 'Pablo Picasso',
    shortName: 'Picasso',
    signatureSrc: '/brand/signatures/picasso.png',
    hasSignature: true,
    wingHref: '/grounds/picasso',
    wingLabel: 'Bateau-Lavoir · Boisgeloup · Mougins',
    era: '1881–1973',
  },
  {
    slug: 'chagall',
    name: 'Marc Chagall',
    shortName: 'Chagall',
    signatureSrc: '/brand/signatures/chagall.png',
    hasSignature: true,
    wingHref: '/parlor/chagall',
    wingLabel: 'The Parlor · La Ruche',
    era: '1887–1985',
  },
  {
    slug: 'modigliani',
    name: 'Amedeo Modigliani',
    shortName: 'Modigliani',
    signatureSrc: '/brand/signatures/modigliani.png',
    hasSignature: true,
    wingHref: '/grand-hall/modigliani',
    wingLabel: 'Cabinet de Curiosités · Grand Hall',
    era: '1884–1920',
  },
  {
    slug: 'monet',
    name: 'Claude Monet',
    shortName: 'Monet',
    signatureSrc: '/brand/signatures/monet.png',
    hasSignature: true,
    wingHref: '/grounds/monet',
    wingLabel: 'Giverny · The Secret Garden',
    era: '1840–1926',
  },
  {
    slug: 'matisse',
    name: 'Henri Matisse',
    shortName: 'Matisse',
    signatureSrc: '/brand/signatures/matisse.png',
    hasSignature: true,
    wingHref: '/matisse',
    wingLabel: 'The Patio Studio',
    era: '1869–1954',
  },
  {
    slug: 'kandinsky',
    name: 'Wassily Kandinsky',
    shortName: 'Kandinsky',
    signatureSrc: '/brand/signatures/kandinsky.png',
    hasSignature: true,
    wingHref: '/foyer/staircase',
    wingLabel: 'Upstairs · The Strange Room',
    era: '1866–1944',
  },
  {
    slug: 'kahlo',
    name: 'Frida Kahlo',
    shortName: 'Kahlo',
    signatureSrc: '/brand/signatures/kahlo.png',
    hasSignature: true,
    wingHref: '/grounds/frida',
    wingLabel: 'Casa Azul',
    era: '1907–1954',
  },
  {
    slug: 'pollock',
    name: 'Jackson Pollock',
    shortName: 'Pollock',
    signatureSrc: '/brand/signatures/pollock.png',
    hasSignature: true,
    wingHref: '/grand-hall',
    wingLabel: 'The Springs Studio',
    era: '1912–1956',
  },
  {
    slug: 'davinci',
    name: 'Leonardo da Vinci',
    shortName: 'da Vinci',
    signatureSrc: '/brand/signatures/davinci.png',
    hasSignature: true,
    wingHref: '/grounds',
    wingLabel: 'Da Vinci Workshop',
    era: '1452–1519',
  },
  {
    slug: 'raphael',
    name: 'Raphael Sanzio',
    shortName: 'Raphael',
    signatureSrc: '/brand/signatures/raphael.png',
    hasSignature: false,
    wingHref: '/foyer/staircase',
    wingLabel: 'Upstairs · Renaissance Studiolo',
    era: '1483–1520',
  },
  {
    // Émile Bernard (1868–1941) — Cloisonnist, friend of Van Gogh and Gauguin,
    // co-architect of Pont-Aven with Gauguin; spent 40+ years on the Passion
    // cycle. The wing at /upstairs/bernard is HIS room, NOT Bernard Buffet's.
    slug: 'bernard',
    name: 'Émile Bernard',
    shortName: 'Bernard',
    signatureSrc: '/brand/signatures/bernard.png',
    hasSignature: false,
    wingHref: '/upstairs/bernard',
    wingLabel: 'Upstairs · Pont-Aven · the Passion cycle',
    era: '1868–1941',
  },
];

function countFor(slug: string): number {
  const artistKey: Record<string, string[]> = {
    picasso: ['Pablo Picasso'],
    chagall: ['Marc Chagall'],
    modigliani: ['Amedeo Modigliani'],
    monet: ['Claude Monet'],
    matisse: ['Henri Matisse'],
    kandinsky: ['Wassily Kandinsky'],
    kahlo: ['Frida Kahlo'],
    pollock: ['Jackson Pollock'],
    davinci: ['Leonardo da Vinci', 'Leonardo Da Vinci', 'Da Vinci'],
    raphael: ['Raphael', 'Raphael Sanzio'],
    bernard: ['Bernard Buffet'],
  };
  const names = artistKey[slug] ?? [];
  return PAINTINGS.filter((p) => names.some((n) => p.artist === n)).length;
}

export const ARTISTS: Artist[] = ARTIST_META.map((a) => ({
  ...a,
  pieceCount: countFor(a.slug),
}));

export function getArtist(slug: string): Artist | undefined {
  return ARTISTS.find((a) => a.slug === slug);
}
