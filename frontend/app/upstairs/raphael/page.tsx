import Link from 'next/link';
import WingLayout from '@/components/layout/WingLayout';
import { VIDEOS } from '@/lib/videoMap';
import { paintingsByWing } from '@/lib/paintings';

const RAPHAEL_BACKDROP =
  'radial-gradient(ellipse at 50% 30%, rgba(245,220,170,0.20) 0%, transparent 55%), radial-gradient(ellipse at 50% 85%, rgba(120,80,40,0.5) 0%, transparent 70%), linear-gradient(180deg, #1c1408 0%, #2c1c08 50%, #0a0605 100%)';

export default function RaphaelPage() {
  return (
    <WingLayout
      back={{ href: '/foyer/staircase', label: 'Back to the staircase' }}
      eyebrow="Upstairs Right"
      title="Raphael"
      subtitle="Renaissance Studiolo"
      caption="Madonna with Child · 1500–1510 · 157 × 127 cm · oil on canvas"
      backdrop={RAPHAEL_BACKDROP}
      videoSrc={VIDEOS.raphael.leadIn}
      rotation={VIDEOS.raphael.rotation}
    >
      <div className="mx-auto max-w-3xl space-y-6 text-center font-body text-ivory/80 leading-relaxed">
        <p>
          A Florentine workshop interior: arched windows letting in soft Tuscan light, a
          classical bust on a marble pedestal, anatomical sketches pinned on the walls,
          a wooden easel, leather-bound folios on the writing table.
        </p>
      </div>
      <div className="mt-12 mx-auto max-w-md">
        {paintingsByWing('/upstairs/raphael').map((p) => (
          <Link key={p.slug} href={`/piece/${p.slug}`} className="block marble rounded-lg p-6 space-y-3 transition-all hover:scale-[1.02]">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">{p.year}</p>
            <h3 className="font-display text-lg leading-tight text-ivory">{p.title}</h3>
            <div className="h-px w-8 bg-gold/30" />
            <p className="font-body text-xs italic text-ivory/70">{p.dimensions} · {p.medium}</p>
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.28em] text-gold/60 pt-2">Enter the piece →</p>
          </Link>
        ))}
      </div>
    </WingLayout>
  );
}
