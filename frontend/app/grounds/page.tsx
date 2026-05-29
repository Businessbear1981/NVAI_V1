import Link from 'next/link';
import MarbleTombstone from '@/components/tombstones/MarbleTombstone';
import WingLayout from '@/components/layout/WingLayout';

const GROUNDS_BACKDROP =
  'radial-gradient(ellipse at 50% 25%, rgba(230,180,80,0.20) 0%, transparent 60%), radial-gradient(ellipse at 50% 85%, rgba(40,80,40,0.45) 0%, transparent 70%), linear-gradient(180deg, #0c1208 0%, #1c2210 50%, #0a0a05 100%)';

export default function GroundsPage() {
  return (
    <WingLayout
      back={{ href: '/garden', label: 'Back to the patio' }}
      eyebrow="Out to the property"
      title="The Grounds"
      subtitle="Expansive · outbuildings · gardens"
      caption="Four destinations on the estate."
      backdrop={GROUNDS_BACKDROP}
      videoSrc="/videos/nvai_courtyard_5k.mp4"
      rotation={['/videos/nvai_garden_path_continuous_5k.mp4', '/videos/nvai_aerial_drone_approach_5k.mp4']}
    >
      <div className="space-y-12">
        {/* Artist destinations */}
        <div>
          <p className="text-center font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70 mb-6">
            Artists on the property
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/grounds/monet">
              <MarbleTombstone
                eyebrow="Garden"
                title="Monet"
                subtitle="Giverny"
                caption="Lily pond. Japanese bridge. Wisteria."
                featured
              />
            </Link>
            <Link href="/grounds/picasso">
              <MarbleTombstone
                eyebrow="Compound"
                title="Picasso"
                subtitle="Three periods"
                caption="Bateau-Lavoir → Boisgeloup → Mougins."
              />
            </Link>
            <Link href="/grounds/davinci">
              <MarbleTombstone
                eyebrow="Workshop"
                title="Da Vinci"
                subtitle="Lady with a Fur"
                caption="Renaissance polymath studio."
              />
            </Link>
            <Link href="/grounds/frida">
              <MarbleTombstone
                eyebrow="Guest house"
                title="Frida"
                subtitle="Casa Azul"
                caption="La Mesa Herida. Cobalt walls."
              />
            </Link>
          </div>
        </div>

        {/* Estate amenities */}
        <div>
          <p className="text-center font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70 mb-6">
            Estate amenities
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Link href="/grounds/vineyards">
              <MarbleTombstone
                eyebrow="The vines"
                title="Vineyards"
                subtitle="Thirty acres · cabernet"
                caption="A slow walk through the vine rows at golden hour."
              />
            </Link>
            <Link href="/grounds/wine-cave">
              <MarbleTombstone
                eyebrow="Under the chateau"
                title="Wine Cave"
                subtitle="Dug into the hillside"
                caption="Two hundred barrels. Candle sconces. Private tastings."
              />
            </Link>
          </div>
        </div>
      </div>
    </WingLayout>
  );
}
