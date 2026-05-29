import Link from 'next/link';
import WingLayout from '@/components/layout/WingLayout';
import { paintingsByWing } from '@/lib/paintings';

const POLLOCK_BACKDROP =
  'radial-gradient(ellipse at 30% 30%, rgba(220,200,180,0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, rgba(60,40,30,0.55) 0%, transparent 60%), linear-gradient(180deg, #14100a 0%, #1c180e 50%, #0a0805 100%)';

const PIECES = paintingsByWing('/grand-hall/pollock');

export default function PollockStudioPage() {
  return (
    <WingLayout
      back={{ href: '/grand-hall', label: 'Back to the Grand Hall' }}
      eyebrow="Center-Right of the Hall"
      title="The Pollock Studio"
      subtitle="Springs, East Hampton · 1950"
      caption="The drip-paint apex. Raw plank floor splattered in enamel and aluminium. The choreography on the ground. Two new pieces — the heavy-drip period."
      backdrop={POLLOCK_BACKDROP}
      videoSrc="/videos/studio-revolution.mp4"
      rotation={['/videos/abstract-harmony.mp4', '/videos/nature-geometry.mp4']}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {PIECES.map((p) => (
          <Link key={p.slug} href={`/piece/${p.slug}`}>
            <article className="marble rounded-lg p-6 space-y-3 h-full transition-all hover:scale-[1.02]">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">
                {p.year}
              </p>
              <h3 className="font-display text-xl leading-tight text-ivory">{p.title}</h3>
              <div className="h-px w-8 bg-gold/30" />
              <p className="font-body text-xs italic text-ivory/65">{p.inspirationNote}</p>
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.28em] text-gold/60 pt-2">
                Enter the piece →
              </p>
            </article>
          </Link>
        ))}
      </div>
      <p className="mt-12 text-center text-sm italic text-ivory/55 max-w-2xl mx-auto">
        New additions to the NVAI collection. Pollock joins the Grand Hall — alongside the
        Auction House and Modigliani&rsquo;s Cabinet — as the American counterweight to the
        European modernist spine.
      </p>
    </WingLayout>
  );
}
