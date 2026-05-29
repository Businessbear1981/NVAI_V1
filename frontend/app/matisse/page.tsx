import Link from 'next/link';
import WingLayout from '@/components/layout/WingLayout';
import { VIDEOS } from '@/lib/videoMap';
import { paintingsByWing } from '@/lib/paintings';

const MATISSE_BACKDROP =
  'radial-gradient(ellipse at 50% 30%, rgba(230,180,80,0.25) 0%, transparent 55%), radial-gradient(ellipse at 30% 80%, rgba(50,140,180,0.30) 0%, transparent 65%), linear-gradient(180deg, #1a160a 0%, #221c0c 40%, #0a0605 100%)';

export default function MatissePage() {
  return (
    <WingLayout
      back={{ href: '/garden', label: 'Back to the garden party' }}
      eyebrow="Patio Center"
      title="Matisse"
      subtitle="Mediterranean Pavilion"
      caption="Woman with Child · oil on paper mounted on cardboard · the pictogram signature"
      backdrop={MATISSE_BACKDROP}
      videoSrc={VIDEOS.matisse.leadIn}
      rotation={VIDEOS.matisse.rotation}
    >
      <div className="mx-auto max-w-3xl space-y-6 text-center font-body text-ivory/80 leading-relaxed">
        <p>
          The Tuscany-inspired patio view is Matisse&rsquo;s Riviera. Vineyard hills, warm stone,
          dappled afternoon light, a single canvas hung in clean unframed space. The
          pictogram signature reads as his self-portrait &mdash; a quiet certainty in lieu of
          a name.
        </p>
      </div>
      <div className="mt-12 mx-auto max-w-md">
        {paintingsByWing('/matisse').map((p) => (
          <Link key={p.slug} href={`/piece/${p.slug}`} className="block marble rounded-lg p-6 space-y-3 transition-all hover:scale-[1.02]">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">{p.year}</p>
            <h3 className="font-display text-lg leading-tight text-ivory">{p.title}</h3>
            <div className="h-px w-8 bg-gold/30" />
            <p className="font-body text-xs italic text-ivory/65">{p.inspirationNote}</p>
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.28em] text-gold/60 pt-2">Enter the piece →</p>
          </Link>
        ))}
      </div>
    </WingLayout>
  );
}
