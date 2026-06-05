import { notFound } from 'next/navigation';
import Link from 'next/link';
import WingLayout from '@/components/layout/WingLayout';
import BernardWalkthrough from '@/components/bernard/BernardWalkthrough';
import { getPainting, PAINTINGS } from '@/lib/paintings';

export function generateStaticParams() {
  return PAINTINGS.map((p) => ({ slug: p.slug }));
}

export default async function PiecePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const painting = getPainting(slug);
  if (!painting) return notFound();

  const story = painting.bernardStory ?? painting.inspirationNote;

  return (
    <WingLayout
      back={painting.wing}
      eyebrow={painting.artist}
      title={painting.title}
      subtitle={painting.year}
      caption={painting.inspirationNote}
      backdrop="radial-gradient(ellipse at 50% 30%, rgba(232,200,122,0.15) 0%, transparent 55%), linear-gradient(180deg, #0a0807 0%, #14100a 50%, #0a0605 100%)"
    >
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Hero painting — framed and lit. Renders the image if present, otherwise an intentional 'available upon NDA' frame. */}
        {/* Painting is the focal point on the piece page — no video backdrop, larger frame. */}
        <figure className="mx-auto max-w-5xl">
          <div
            className="relative overflow-hidden rounded-sm bg-midnight"
            style={{
              padding: '1.5rem',
              background:
                'linear-gradient(145deg, rgba(212,175,55,0.10) 0%, rgba(120,80,30,0.20) 50%, rgba(60,30,10,0.30) 100%)',
              boxShadow:
                '0 30px 80px -20px rgba(0,0,0,0.9), inset 0 0 30px rgba(0,0,0,0.4)',
            }}
          >
            <div
              className="overflow-hidden rounded-sm"
              style={{
                boxShadow: 'inset 0 0 0 1px rgba(232,200,122,0.4), 0 0 60px -10px rgba(212,175,55,0.18)',
              }}
            >
              {painting.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={painting.imageUrl}
                  alt={`${painting.artist} — ${painting.title}`}
                  className="w-full"
                />
              ) : (
                <div className="aspect-[4/5] flex flex-col items-center justify-center bg-gradient-to-br from-midnight to-[#1a1208] px-8 py-12 text-center">
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/60">
                    Image available
                  </p>
                  <p className="mt-2 font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/60">
                    upon signed agreement
                  </p>
                  <div className="my-8 h-px w-24 bg-gold/40" />
                  <p className="font-didot text-3xl tracking-wider text-ivory">{painting.title}</p>
                  <p className="mt-3 font-display italic text-base text-gold/85">{painting.artist}</p>
                  <p className="mt-2 font-body italic text-sm text-ivory/65">{painting.year}</p>
                  <p className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.32em] text-ivory/55">
                    {painting.dimensions}
                  </p>
                  <Link
                    href={`/inquire?action=docs&piece=${painting.slug}`}
                    className="mt-10 inline-block rounded-full border border-gold/50 bg-gold/10 px-6 py-3 font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold transition-all hover:border-gold hover:bg-gold/20"
                  >
                    Request the dossier
                  </Link>
                </div>
              )}
            </div>
          </div>
          <figcaption className="mt-4 text-center font-body italic text-sm text-ivory/65">
            {painting.title} · {painting.year} · {painting.dimensions}
          </figcaption>
        </figure>

        {/* Comparison images — artist recreations, condition details, verso labels. Renders only when comparisonImages is set. */}
        {painting.comparisonImages && painting.comparisonImages.length > 0 && (
          <section className="space-y-6">
            <div className="text-center">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
                {painting.comparisonImages.length === 1 ? 'Side-by-side · Original + Recreation' : 'Detail Plates'}
              </p>
              <div className="mx-auto mt-4 h-px w-16 bg-gold/40" />
            </div>
            <div
              className={
                painting.comparisonImages.length === 1
                  ? 'grid grid-cols-1 gap-6 md:grid-cols-2'
                  : painting.comparisonImages.length === 2
                  ? 'grid grid-cols-1 gap-6 md:grid-cols-2'
                  : 'grid grid-cols-2 gap-4 md:grid-cols-4'
              }
            >
              {/* When exactly 1 comparison image, ALSO show the hero on the left for true side-by-side */}
              {painting.comparisonImages.length === 1 && painting.imageUrl && (
                <figure className="space-y-3">
                  <div className="overflow-hidden rounded-sm ring-1 ring-gold/20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={painting.imageUrl}
                      alt={`${painting.artist} — ${painting.title} (original)`}
                      className="w-full"
                    />
                  </div>
                  <figcaption className="text-center space-y-2 px-2">
                    <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">
                      {painting.heroCaption?.label ?? 'Original — Current Condition'}
                    </p>
                    <p className="font-body italic text-xs text-ivory/65 leading-relaxed">
                      {painting.heroCaption?.caption ?? 'The painting as it sits today, awaiting cleaning at Institut Restellini Paris.'}
                    </p>
                  </figcaption>
                </figure>
              )}

              {painting.comparisonImages.map((ci) => (
                <figure key={ci.url} className="space-y-3">
                  <div className="overflow-hidden rounded-sm ring-1 ring-gold/20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={ci.url} alt={ci.label} className="w-full" />
                  </div>
                  <figcaption className="text-center space-y-2 px-2">
                    <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">
                      {ci.label}
                    </p>
                    {ci.caption && (
                      <p className="font-body italic text-xs text-ivory/65 leading-relaxed">{ci.caption}</p>
                    )}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* Bernard walkthrough */}
        <section className="space-y-3 text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
            Learn about this painting
          </p>
          <BernardWalkthrough text={story} label="Have Bernard walk you through this" />
        </section>

        {/* Detail panel */}
        <div className="marble rounded-lg p-10 space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">Medium</p>
              <p className="font-body text-ivory/90">{painting.medium}</p>
              {painting.signed && (
                <p className="font-body text-sm italic text-ivory/70">{painting.signed}</p>
              )}
            </div>
            <div className="space-y-2">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">Dimensions</p>
              <p className="font-body text-ivory/90">{painting.dimensions}</p>
            </div>
          </div>
          <div className="h-px w-full bg-gold/20" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">Viewing Location</p>
              <p className="font-body text-ivory/90">{painting.viewingLocation}</p>
            </div>
            <div className="space-y-2">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">Wing</p>
              <Link href={painting.wing.href} className="font-body text-gold/80 hover:text-gold">
                {painting.wing.label} →
              </Link>
            </div>
          </div>
        </div>

        {/* The four-action panel */}
        <section>
          <p className="text-center font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70 mb-6">
            How to proceed
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Link
              href={`/inquire?action=offer&piece=${painting.slug}`}
              className="marble rounded-lg p-6 text-center space-y-3 transition-all hover:scale-[1.02]"
            >
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">i</p>
              <h3 className="font-didot text-xl tracking-wider text-ivory">Make an offer</h3>
              <div className="mx-auto h-px w-8 bg-gold/30" />
              <p className="font-body text-xs italic text-ivory/70">
                Submit a private offer. Sean or Richard responds directly.
              </p>
            </Link>
            <Link
              href={`/inquire?action=curator&piece=${painting.slug}`}
              className="marble rounded-lg p-6 text-center space-y-3 transition-all hover:scale-[1.02]"
            >
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">ii</p>
              <h3 className="font-didot text-xl tracking-wider text-ivory">Talk to the curator</h3>
              <div className="mx-auto h-px w-8 bg-gold/30" />
              <p className="font-body text-xs italic text-ivory/70">
                Schedule a conversation with NVAI&rsquo;s curatorial team.
              </p>
            </Link>
            <Link
              href={`/inquire?action=docs&piece=${painting.slug}`}
              className="marble rounded-lg p-6 text-center space-y-3 transition-all hover:scale-[1.02]"
            >
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">iii</p>
              <h3 className="font-didot text-xl tracking-wider text-ivory">Docs package</h3>
              <div className="mx-auto h-px w-8 bg-gold/30" />
              <p className="font-body text-xs italic text-ivory/70">
                Full provenance, conservation reports, scientific analyses — sent on signed NDA.
              </p>
            </Link>
            <Link
              href={`/provenance/${painting.slug}`}
              className="marble rounded-lg p-6 text-center space-y-3 transition-all hover:scale-[1.02]"
            >
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">iv</p>
              <h3 className="font-didot text-xl tracking-wider text-ivory">Full provenance</h3>
              <div className="mx-auto h-px w-8 bg-gold/30" />
              <p className="font-body text-xs italic text-ivory/70">
                Chain of title, certificates, expert opinions — released by tier upon signed DDNDA.
              </p>
            </Link>
          </div>
        </section>

        {/* Literature & catalogue raisonné */}
        {painting.literature && painting.literature.length > 0 && (
          <div className="marble rounded-lg p-8 space-y-4">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">Literature</p>
            <ul className="space-y-3 font-body text-sm italic text-ivory/85 leading-relaxed">
              {painting.literature.map((lit, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-mono text-[0.55rem] tracking-wider text-gold/60 mt-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{lit}</span>
                </li>
              ))}
            </ul>
            {painting.provenanceDoc && (
              <a
                href={painting.provenanceDoc}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 font-mono text-[0.6rem] uppercase tracking-[0.32em] text-gold/80 hover:text-gold"
              >
                Provenance dossier PDF →
              </a>
            )}
          </div>
        )}
      </div>
    </WingLayout>
  );
}
