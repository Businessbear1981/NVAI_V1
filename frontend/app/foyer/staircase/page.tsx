import Link from 'next/link';
import MarbleTombstone from '@/components/tombstones/MarbleTombstone';
import WingLayout from '@/components/layout/WingLayout';

const STAIRCASE_BACKDROP =
  'radial-gradient(ellipse at 50% 20%, rgba(232,200,122,0.18) 0%, transparent 55%), linear-gradient(180deg, #0a0807 0%, #1a1208 60%, #0a0807 100%)';

export default function StaircaseLandingPage() {
  return (
    <WingLayout
      back={{ href: '/foyer', label: 'Back down to the foyer' }}
      eyebrow="The Staircase Landing"
      title="Upstairs"
      subtitle="Three doors"
      caption="Sacred art on either side. The strange room between."
      backdrop={STAIRCASE_BACKDROP}
      videoSrc="/videos/nvai_foyer_aerial_static.mp4"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Link href="/upstairs/bernard">
          <MarbleTombstone
            eyebrow="Left"
            title="Bernard"
            subtitle="Russian Enchantment"
            caption="La Passion de Jésus-Christ. Hieratic light."
          />
        </Link>
        <Link href="/upstairs/kandinsky">
          <MarbleTombstone
            eyebrow="Center"
            title="Kandinsky"
            subtitle="The Creepy Room"
            caption="Bauhaus geometry. The room vibrates."
            featured
          />
        </Link>
        <Link href="/upstairs/raphael">
          <MarbleTombstone
            eyebrow="Right"
            title="Raphael"
            subtitle="Renaissance Studiolo"
            caption="Madonna with Child. Tuscan light."
          />
        </Link>
      </div>
    </WingLayout>
  );
}
