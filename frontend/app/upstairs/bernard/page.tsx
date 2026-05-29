import WingLayout from '@/components/layout/WingLayout';
import { VIDEOS } from '@/lib/videoMap';

const BERNARD_BACKDROP =
  'radial-gradient(ellipse at 50% 35%, rgba(212,175,55,0.22) 0%, transparent 50%), radial-gradient(ellipse at 50% 90%, rgba(60,20,10,0.7) 0%, transparent 70%), linear-gradient(180deg, #1c1108 0%, #2a1808 40%, #0a0605 100%)';

export default async function BernardPage() {
  return (
    <WingLayout
      back={{ href: '/foyer/staircase', label: 'Back to the staircase' }}
      eyebrow="Upstairs Left"
      title="Bernard"
      subtitle="Russian Enchantment chapel"
      caption="Émile Bernard · La Passion de Jésus-Christ ou Le Calvaire · c. 1926–1940 · 290 × 193 cm"
      backdrop={BERNARD_BACKDROP}
      videoSrc={VIDEOS.bernard.leadIn}
      rotation={VIDEOS.bernard.rotation}
    >
      <div className="mx-auto max-w-3xl space-y-8 text-center font-body text-ivory/80 leading-relaxed">
        <p>
          A Russian-Orthodox-inspired chapel houses Bernard&rsquo;s late Passion. Icons line
          the walls in gold-leaf frames; a single tall candle burns at the centre; beeswax
          and cedar perfume the air. The altarpiece commands a full wall.
        </p>
      </div>
      <div className="mt-12 mx-auto max-w-md">
        {(await import('@/lib/paintings')).paintingsByWing('/upstairs/bernard').map((p) => (
          <a key={p.slug} href={`/piece/${p.slug}`} className="block marble rounded-lg p-6 space-y-3 transition-all hover:scale-[1.02]">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">{p.year}</p>
            <h3 className="font-display text-lg leading-tight text-ivory">{p.title}</h3>
            <div className="h-px w-8 bg-gold/30" />
            <p className="font-body text-xs italic text-ivory/70">{p.dimensions} · {p.medium}</p>
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.28em] text-gold/60 pt-2">Enter the piece →</p>
          </a>
        ))}
      </div>
    </WingLayout>
  );
}
