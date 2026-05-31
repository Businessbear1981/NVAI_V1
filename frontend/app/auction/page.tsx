import WingLayout from '@/components/layout/WingLayout';

const AUCTION_TAB_BACKDROP =
  'radial-gradient(ellipse at 50% 30%, rgba(232,200,122,0.18) 0%, transparent 55%), linear-gradient(180deg, #14100a 0%, #1c160c 40%, #0a0605 100%)';

export default function AuctionTabPage() {
  return (
    <WingLayout
      back={{ href: '/', label: 'Return' }}
      eyebrow="Essentials"
      title="The Auction"
      subtitle="Events calendar · register · past results"
      caption="The utility layer for the Auction House. Cinematic experience lives in the Grand Hall."
      backdrop={AUCTION_TAB_BACKDROP}
      videoSrc="https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/foyer_aerial_pan_final.mp4"
    >
      <div className="mx-auto max-w-2xl space-y-6 text-center font-body italic text-ivory/70">
        <p>
          Live event calendar, paddle-number provisioning, results from past auctions,
          and registration for upcoming private invite-only events.
        </p>
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-gold/60">
          Phase 2 buildout pending
        </p>
      </div>
    </WingLayout>
  );
}
