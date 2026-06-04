import Link from 'next/link';
import WingLayout from '@/components/layout/WingLayout';

const AUCTION_BACKDROP =
  'radial-gradient(ellipse at 50% 30%, rgba(232,200,122,0.25) 0%, transparent 55%), radial-gradient(ellipse at 50% 95%, rgba(40,20,10,0.8) 0%, transparent 70%), linear-gradient(180deg, #1a0e08 0%, #2a1c0c 40%, #0a0605 100%)';

const upcoming = [
  {
    title: 'Modigliani · The Sitting Nude with Crossed Hands',
    format: 'Auction date to be announced · register interest',
    date: 'TBA',
    inquireHref: '/inquire?painting=modigliani-sitting-nude-with-crossed-hands',
  },
  {
    title: 'Picasso · Bateau-Lavoir 1901',
    format: 'Private invite-only',
    date: 'Q3 2026',
    inquireHref: '/inquire?wing=picasso-bateau-lavoir',
  },
  {
    title: 'Chagall · The Vitebsk Years',
    format: 'Full Christie\'s-scale live',
    date: 'Q4 2026',
    inquireHref: '/inquire?wing=chagall',
  },
];

export default function AuctionHousePage() {
  return (
    <WingLayout
      back={{ href: '/grand-hall', label: 'Back to the Grand Hall' }}
      eyebrow="Center-Left of the Hall"
      title="The Auction House"
      subtitle="Bidding room · video conferencing · VIP concierge"
      caption="Live and private. Christie's scale or intimate. Phase 2 capability — designed-into the architecture now."
      backdrop={AUCTION_BACKDROP}
      videoSrc="https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/foyer_aerial_pan_final.mp4"
    >
      <section className="space-y-6">
        <h2 className="font-display text-2xl text-center text-gold tracking-wider">Upcoming Events</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {upcoming.map((event) => (
            <article key={event.title} className="marble rounded-lg p-6 space-y-3">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">
                {event.date}
              </p>
              <h3 className="font-display text-lg leading-tight text-ivory">{event.title}</h3>
              <div className="h-px w-8 bg-gold/30" />
              <p className="font-body text-sm italic text-ivory/60">{event.format}</p>
              <Link
                href={event.inquireHref}
                className="mt-2 inline-block font-mono text-[0.65rem] uppercase tracking-[0.32em] text-gold hover:text-gold-warm"
              >
                Register interest →
              </Link>
            </article>
          ))}
        </div>
        <p className="mt-10 text-center text-xs italic text-ivory/50">
          Encrypted invitations, proof of liquidity (Plaid + Stripe), paddle numbers,
          and the Auction Box (Chateau Magdalena wine delivery) wire in for Phase 2.
        </p>
      </section>
    </WingLayout>
  );
}
