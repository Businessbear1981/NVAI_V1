import Link from 'next/link';
import WingLayout from '@/components/layout/WingLayout';
import { VIDEOS } from '@/lib/videoMap';
import { paintingsByWing } from '@/lib/paintings';

const MODIGLIANI_BACKDROP =
  'radial-gradient(ellipse at 50% 30%, rgba(220,170,100,0.15) 0%, transparent 55%), radial-gradient(ellipse at 50% 90%, rgba(60,30,20,0.85) 0%, transparent 70%), linear-gradient(180deg, #1a100a 0%, #14080a 50%, #0a0605 100%)';

const portraits = paintingsByWing('/grand-hall/modigliani');

export default function ModiglianiCabinetPage() {
  return (
    <WingLayout
      back={{ href: '/grand-hall', label: 'Back to the Grand Hall' }}
      eyebrow="Center of the Hall"
      title="Modigliani"
      subtitle="Cabinet de Curiosités"
      caption="Glass cases of African and Oceanic masks. Three portraits hanging between. The room teaches the visitor where the elongated faces came from."
      backdrop={MODIGLIANI_BACKDROP}
      videoSrc={VIDEOS.modigliani.leadIn}
      rotation={VIDEOS.modigliani.rotation}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {portraits.map((p) => (
          <Link key={p.slug} href={`/piece/${p.slug}`}>
            <article className="marble rounded-lg p-6 space-y-3 text-left h-full transition-all hover:scale-[1.02]">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">
                {p.year}
              </p>
              <h3 className="font-display text-lg leading-tight text-ivory">{p.title}</h3>
              <div className="h-px w-8 bg-gold/30" />
              <p className="font-body text-xs italic text-ivory/65">{p.inspirationNote}</p>
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.28em] text-gold/60 pt-2">
                Enter the piece →
              </p>
            </article>
          </Link>
        ))}
      </div>
      <p className="mt-12 text-center text-sm italic text-ivory/60 max-w-2xl mx-auto">
        The 107-year-lost relationship between Kiki de Montparnasse and Amedeo Modigliani
        anchors the platform's most cinematic story arc. The full narrative lives in
        the Kiki exposé.
      </p>
    </WingLayout>
  );
}
