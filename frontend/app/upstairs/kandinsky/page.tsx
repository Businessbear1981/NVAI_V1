import Link from 'next/link';
import WingLayout from '@/components/layout/WingLayout';
import { VIDEOS } from '@/lib/videoMap';
import { paintingsByWing } from '@/lib/paintings';

const KANDINSKY_BACKDROP =
  'radial-gradient(circle at 25% 25%, rgba(220,40,40,0.35) 0%, transparent 35%), radial-gradient(circle at 75% 30%, rgba(60,100,220,0.35) 0%, transparent 30%), radial-gradient(circle at 50% 75%, rgba(240,200,40,0.30) 0%, transparent 35%), linear-gradient(135deg, #0a0807 0%, #14100c 50%, #0a0807 100%)';

export default function KandinskyPage() {
  return (
    <WingLayout
      back={{ href: '/foyer/staircase', label: 'Back to the staircase' }}
      eyebrow="Upstairs Center"
      title="Kandinsky"
      subtitle="The Creepy Room"
      caption="Two pieces · Bauhaus · pure abstraction · Schoenberg-quartet audio bed"
      backdrop={KANDINSKY_BACKDROP}
      videoSrc={VIDEOS.kandinsky.leadIn}
      rotation={VIDEOS.kandinsky.rotation}
    >
      <div className="mx-auto max-w-3xl space-y-6 text-center font-body text-ivory/85 leading-relaxed">
        <p>
          Pure primary colors as flat fields. No figurative anchor for the eye to rest on.
          A dissonant string quartet plays under the floor. Visitors stand in the middle of
          the room and the geometry begins to move on them.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {paintingsByWing('/upstairs/kandinsky').map((p) => (
          <Link key={p.slug} href={`/piece/${p.slug}`}>
            <article className="marble rounded-lg p-6 space-y-3 h-full transition-all hover:scale-[1.02]">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">{p.year}</p>
              <h3 className="font-display text-lg leading-tight text-ivory">{p.title}</h3>
              <div className="h-px w-8 bg-gold/30" />
              <p className="font-body text-xs italic text-ivory/65">{p.inspirationNote}</p>
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.28em] text-gold/60 pt-2">Enter the piece →</p>
            </article>
          </Link>
        ))}
      </div>
    </WingLayout>
  );
}
