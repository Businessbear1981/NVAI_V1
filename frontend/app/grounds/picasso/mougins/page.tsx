import WingLayout from '@/components/layout/WingLayout';
import { VIDEOS } from '@/lib/videoMap';

const BACKDROP =
  'radial-gradient(ellipse at 50% 30%, rgba(220,140,60,0.30) 0%, transparent 55%), linear-gradient(180deg, #1a1006 0%, #261408 50%, #0a0605 100%)';

export default async function PicassoMouginsPage() {
  return (
    <WingLayout
      back={{ href: '/grounds/picasso', label: 'Back through the compound' }}
      eyebrow="Picasso · Sub-room 3"
      title="Mougins"
      subtitle="1965 – 1967 · Late atelier"
      caption="South of France villa. Sun-drenched terracotta. Canvases everywhere. The late musketeers, the nudes, the speed of an old man who never slowed."
      backdrop={BACKDROP}
      videoSrc={VIDEOS.picassoMougins.leadIn}
      rotation={VIDEOS.picassoMougins.rotation}
    >
      <div className="mx-auto max-w-3xl space-y-6 text-center font-body text-ivory/85 leading-relaxed">
        <p>
          Notre-Dame-de-Vie, his last home. Jacqueline Roque sitting in every painting.
          David Douglas Duncan photographing the chaos. Canvases stacked against walls
          three deep.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {(await import('@/lib/paintings')).paintingsByWing('/grounds/picasso/mougins').map((p) => (
          <a key={p.slug} href={`/piece/${p.slug}`} className="block marble rounded-lg p-5 space-y-3 transition-all hover:scale-[1.02]">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">{p.year}</p>
            <h3 className="font-display text-lg leading-tight text-ivory">{p.title}</h3>
            <div className="h-px w-8 bg-gold/30" />
            <p className="font-body text-xs italic text-ivory/65">{p.inspirationNote}</p>
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.28em] text-gold/60 pt-2">Enter the piece →</p>
          </a>
        ))}
      </div>
    </WingLayout>
  );
}
