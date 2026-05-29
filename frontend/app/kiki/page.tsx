import Link from 'next/link';
import WingLayout from '@/components/layout/WingLayout';
import { VIDEOS } from '@/lib/videoMap';

const KIKI_BACKDROP =
  'radial-gradient(ellipse at 30% 30%, rgba(220,40,80,0.35) 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, rgba(120,20,60,0.5) 0%, transparent 60%), linear-gradient(180deg, #1a060c 0%, #2a0a14 40%, #0a0205 100%)';

const KIKI_VIDEO = '/videos/nvai_kiki_moulin_rouge_5k.mp4';

const offerings = [
  {
    label: 'The Exposé',
    detail: '220-page eBook · by Jana Misho · 700+ research links · the 107-year-lost Modigliani discovery',
    price: '$65',
    cta: 'Order',
  },
  {
    label: 'Audiobook + Picture Book',
    detail: 'ElevenLabs narration · period French-accented English · companion picture book to follow along',
    price: '$45',
    cta: 'Order',
  },
  {
    label: 'KISP — Kiki Supplement Pages',
    detail: 'Weekly subscription · newly-uncovered rare photos, archive film, anecdotes',
    price: '$12 / month',
    cta: 'Subscribe',
  },
  {
    label: 'Modigliani Commemorative Poster',
    detail: '36 × 24 in · first 10,000 copies · numbered',
    price: '$95',
    cta: 'Order',
  },
  {
    label: 'Private YouTube Channel',
    detail: '24-hour streaming · rare film, animation, period interviews · sent with eBook',
    price: 'Included',
    cta: 'Access',
  },
  {
    label: 'Lingerie collection',
    detail: 'Curated reference to the existing Kiki de Montparnasse luxury brand',
    price: 'From $185',
    cta: 'Browse',
  },
];

export default function KikiPage() {
  return (
    <WingLayout
      back={{ href: '/', label: 'Return to the chateau' }}
      eyebrow="The Marquee"
      title="Kiki"
      subtitle="Queen of Montparnasse"
      caption="For over one million super-fans worldwide. The Moulin Rouge wing — exposé, audiobook, the feature film Kickstarter, the 90-second blockbuster teaser, the guest book, ten percent to charity."
      backdrop={KIKI_BACKDROP}
      videoSrc={VIDEOS.kiki.leadIn}
    >
      <section className="space-y-12">
        {/* Short film teaser — Moulin Rouge live, 45 seconds */}
        <div className="text-center space-y-6">
          <h2 className="font-display text-2xl tracking-wider text-gold">The Moulin Rouge — 45 Seconds</h2>
          <div className="mx-auto aspect-video max-w-3xl overflow-hidden rounded-lg border border-gold/20 bg-midnight">
            <video
              src={VIDEOS.kiki.moulinRougeLive}
              controls
              poster=""
              className="h-full w-full object-cover"
            />
          </div>
          <p className="text-xs italic text-ivory/60">
            The cabaret cut. Burlesque variants and the full one-minute dance live below.
          </p>
        </div>

        {/* The burlesque performance gallery */}
        <div className="space-y-6">
          <h2 className="font-display text-2xl text-center tracking-wider text-gold">Performance Reel</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {VIDEOS.kiki.burlesqueVariants.slice(0, 3).map((src, i) => (
              <div key={src} className="overflow-hidden rounded-lg border border-gold/20 bg-midnight/60">
                <video src={src} controls muted className="aspect-video w-full object-cover" />
                <p className="px-3 py-2 font-mono text-[0.55rem] uppercase tracking-[0.28em] text-gold/70">
                  Take {String(i + 1).padStart(2, '0')}
                </p>
              </div>
            ))}
          </div>
          <div className="mx-auto max-w-3xl overflow-hidden rounded-lg border border-gold/30 bg-midnight">
            <video
              src={VIDEOS.kiki.danceOneMinute}
              controls
              className="aspect-video w-full object-cover"
            />
            <p className="px-3 py-2 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-gold/70">
              The full dance · one minute
            </p>
          </div>
        </div>

        {/* The offerings */}
        <div className="space-y-6">
          <h2 className="font-display text-2xl text-center tracking-wider text-gold">The Offerings</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {offerings.map((o) => (
              <article key={o.label} className="marble rounded-lg p-6 space-y-3 text-left">
                <h3 className="font-display text-lg leading-tight text-ivory">{o.label}</h3>
                <p className="font-body text-sm italic text-ivory/70 leading-relaxed">{o.detail}</p>
                <div className="h-px w-8 bg-gold/30" />
                <div className="flex items-center justify-between pt-2">
                  <p className="font-mono text-[0.7rem] tracking-wider text-gold">{o.price}</p>
                  <button className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-gold/80 hover:text-gold">
                    {o.cta} →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Kickstarter */}
        <div className="marble rounded-lg p-10 space-y-4 text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
            Feature film campaign
          </p>
          <h2 className="font-didot text-3xl uppercase tracking-wider text-ivory">
            Help bring this feature film to life
          </h2>
          <div className="mx-auto h-px w-16 bg-gold/40" />
          <p className="font-body text-ivory/70 max-w-2xl mx-auto leading-relaxed">
            We are raising the development fund for the Kiki feature — Montparnasse 1920s,
            the lost love story, the painting. Pledge levels open. Donor wall lives here.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Link
              href="/kiki/kickstarter"
              className="rounded-full border border-gold/50 bg-gold/10 px-8 py-3 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-gold transition-all hover:border-gold hover:bg-gold/20"
            >
              Pledge
            </Link>
            <Link
              href="/kiki/guestbook"
              className="font-mono text-[0.65rem] uppercase tracking-[0.32em] text-ivory/70 hover:text-gold"
            >
              Sign the guest book →
            </Link>
          </div>
        </div>

        <p className="text-center font-body text-xs italic text-ivory/50">
          Ten percent of every sale donated in Kiki's honour. Donor wall in production.
        </p>
      </section>
    </WingLayout>
  );
}
