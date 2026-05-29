import Link from 'next/link';
import WingLayout from '@/components/layout/WingLayout';
import { VIDEOS } from '@/lib/videoMap';

const BACKDROP =
  'radial-gradient(ellipse at 30% 30%, rgba(220,40,80,0.35) 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, rgba(120,20,60,0.5) 0%, transparent 60%), linear-gradient(180deg, #1a060c 0%, #2a0a14 40%, #0a0205 100%)';

const TIERS = [
  { name: 'The Audience', price: '$25', perk: 'Production updates, on-chain donor wall inscription, exclusive premiere stream.' },
  { name: 'The Café Crowd', price: '$100', perk: 'Above + signed digital screenplay, behind-the-scenes archive.' },
  { name: 'The Rotonde Circle', price: '$500', perk: 'Above + invitation to the Napa premiere, leather-bound Kiki exposé.' },
  { name: 'The Producer Tier', price: '$10,000', perk: 'Producer credit on the film, table at the Napa premiere, founding-patron inscription in the Kiki room.' },
];

export default function KikiKickstarterPage() {
  return (
    <WingLayout
      back={{ href: '/kiki', label: 'Back to the Kiki wing' }}
      eyebrow="Help bring this feature film to life"
      title="The Kickstarter"
      subtitle="A 1920s Montparnasse love story"
      caption="Kiki dancing. Modigliani watching. A century later their story finally told. Pledge to bring the feature to screen."
      backdrop={BACKDROP}
      videoSrc={VIDEOS.kiki.leadIn}
    >
      <div className="space-y-12">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-lg border border-gold/30 bg-midnight">
          <video src={VIDEOS.kiki.moulinRougeLive} controls className="aspect-video w-full object-cover" />
          <p className="px-3 py-2 font-mono text-[0.55rem] uppercase tracking-[0.28em] text-gold/70">
            The 45-second cabaret cut · presented to potential backers
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((tier) => (
            <article key={tier.name} className="marble rounded-lg p-6 space-y-3">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">
                {tier.name}
              </p>
              <p className="font-didot text-3xl tracking-wider text-ivory">{tier.price}</p>
              <div className="h-px w-8 bg-gold/30" />
              <p className="font-body text-xs italic text-ivory/70">{tier.perk}</p>
              <button className="mt-3 w-full rounded-full border border-gold/40 px-4 py-2 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-gold transition-all hover:border-gold hover:bg-gold/15">
                Pledge
              </button>
            </article>
          ))}
        </div>

        <div className="marble rounded-lg p-10 text-center space-y-3">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
            Campaign progress
          </p>
          <div className="mx-auto h-2 max-w-2xl overflow-hidden rounded-full bg-midnight/80">
            <div className="h-full w-[14%] bg-gradient-to-r from-gold-dim via-gold to-gold-warm" />
          </div>
          <p className="font-body text-sm italic text-ivory/70">
            14% pledged · 312 backers · 41 days remaining
          </p>
          <p className="mt-2 font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/60">
            10% of every pledge donated in Kiki&rsquo;s name
          </p>
        </div>

        <Link
          href="/kiki/guestbook"
          className="block text-center font-mono text-[0.65rem] uppercase tracking-[0.32em] text-ivory/60 hover:text-gold"
        >
          Or sign the Kiki guest book →
        </Link>
      </div>
    </WingLayout>
  );
}
