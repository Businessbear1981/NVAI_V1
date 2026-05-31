import WingLayout from '@/components/layout/WingLayout';

const VINEYARDS_BACKDROP =
  'radial-gradient(ellipse at 30% 25%, rgba(220,180,80,0.20) 0%, transparent 55%), radial-gradient(ellipse at 70% 80%, rgba(80,40,20,0.55) 0%, transparent 60%), linear-gradient(180deg, #1a1408 0%, #2a1c0c 50%, #0a0805 100%)';

export default function VineyardsPage() {
  return (
    <WingLayout
      back={{ href: '/grounds', label: 'Back to the grounds' }}
      eyebrow="An amenity of the estate"
      title="The Vineyards"
      subtitle="A walk through the vines"
      caption="Thirty acres of cabernet sauvignon, cabernet franc, and a small block of petit verdot. A slow walk along the gravel drive at golden hour. Villa Monticello wines available throughout."
      backdrop={VINEYARDS_BACKDROP}
      videoSrc="https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_aerial_drone_approach_5k.mp4"
      rotation={['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_garden_path_continuous_5k.mp4', 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_courtyard_5k.mp4']}
    >
      <div className="mx-auto max-w-3xl space-y-6 text-center font-body text-ivory/80 leading-relaxed">
        <p>
          The estate sits on rolling Napa hills with cabernet vines descending the slope
          in symmetrical rows. The walk takes you from the chateau&rsquo;s back doors
          through a cypress-lined gravel drive, past the rose garden, and into the
          vineyard rows themselves &mdash; out to a stone overlook of the Mayacamas
          mountains.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <article className="marble rounded-lg p-6 space-y-3 text-left">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">Tasting</p>
            <h3 className="font-display text-lg text-ivory">Villa Monticello Cabernet</h3>
            <div className="h-px w-8 bg-gold/30" />
            <p className="font-body text-xs italic text-ivory/70">
              2024 single-vineyard estate · allocation lot · paired with the gallery experience.
            </p>
          </article>
          <article className="marble rounded-lg p-6 space-y-3 text-left">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">Pairing</p>
            <h3 className="font-display text-lg text-ivory">The Auction Box</h3>
            <div className="h-px w-8 bg-gold/30" />
            <p className="font-body text-xs italic text-ivory/70">
              VIP auction bidders receive a curated Auction Box from the estate &mdash;
              wine, cheese, paddle, catalog. Delivered the day before.
            </p>
          </article>
        </div>
        <p className="mt-12 text-sm italic text-ivory/55">
          Custom 5K vineyard walk video in production. Currently shown with the aerial approach as placeholder.
        </p>
      </div>
    </WingLayout>
  );
}
