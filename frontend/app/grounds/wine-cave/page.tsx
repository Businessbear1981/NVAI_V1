import WingLayout from '@/components/layout/WingLayout';

const CAVE_BACKDROP =
  'radial-gradient(ellipse at 50% 30%, rgba(232,200,122,0.10) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(40,15,8,0.85) 0%, transparent 65%), linear-gradient(180deg, #0a0605 0%, #1c100a 40%, #050302 100%)';

export default function WineCavePage() {
  return (
    <WingLayout
      back={{ href: '/grounds', label: 'Back to the grounds' }}
      eyebrow="An amenity of the estate"
      title="The Wine Cave"
      subtitle="Dug into the hillside"
      caption="A barrel cave carved into the Napa hillside under the chateau. Cool stone, oak barrels, candlelight, the smell of old wood and slow tannin. Private tastings for serious buyers, vintage cellar for VIP collectors."
      backdrop={CAVE_BACKDROP}
      videoSrc="https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_courtyard_5k.mp4"
      rotation={['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/foyer_aerial_pan_final.mp4']}
    >
      <div className="mx-auto max-w-3xl space-y-6 text-center font-body text-ivory/85 leading-relaxed">
        <p>
          Beneath the chateau, the cave is dug into native rock. Two hundred barrels of
          cabernet aging in rows. A long oak table at the centre for private tastings.
          Candle sconces in iron brackets along the stone walls. The temperature holds at
          a steady 55 degrees year-round.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <article className="marble rounded-lg p-6 space-y-3 text-left">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">Private Tasting</p>
            <h3 className="font-display text-lg text-ivory">By appointment</h3>
            <div className="h-px w-8 bg-gold/30" />
            <p className="font-body text-xs italic text-ivory/70">
              For DDNDA-cleared buyers and ambassadors. Bernard schedules.
            </p>
          </article>
          <article className="marble rounded-lg p-6 space-y-3 text-left">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">Vintage cellar</p>
            <h3 className="font-display text-lg text-ivory">VIP collector lots</h3>
            <div className="h-px w-8 bg-gold/30" />
            <p className="font-body text-xs italic text-ivory/70">
              Library-vintage cabernet held back for collectors who buy from the
              gallery. The cave keeps your bottles until you take them.
            </p>
          </article>
        </div>
        <p className="mt-12 text-sm italic text-ivory/55">
          Custom 5K wine cave video in production. Currently shown with courtyard placeholder.
        </p>
      </div>
    </WingLayout>
  );
}
