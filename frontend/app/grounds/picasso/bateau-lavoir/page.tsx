import WingLayout from '@/components/layout/WingLayout';
import { VIDEOS } from '@/lib/videoMap';

const BACKDROP =
  'radial-gradient(ellipse at 50% 30%, rgba(50,80,160,0.30) 0%, transparent 55%), linear-gradient(180deg, #060a14 0%, #0a0e1a 50%, #04060c 100%)';

export default async function PicassoBateauLavoirPage() {
  return (
    <WingLayout
      back={{ href: '/grounds/picasso', label: 'Back through the compound' }}
      eyebrow="Picasso · Sub-room 1"
      title="Bateau-Lavoir"
      subtitle="1901 · Blue Period"
      caption="The Montmartre tenement. Cold blue gloom. Casagemas's death as the thematic anchor."
      backdrop={BACKDROP}
      videoSrc={VIDEOS.picassoBateauLavoir.leadIn}
      rotation={VIDEOS.picassoBateauLavoir.rotation}
    >
      <div className="mx-auto max-w-3xl space-y-6 text-center font-body text-ivory/85 leading-relaxed">
        <p>
          The garret studio at 13 rue Ravignan, freezing, communal water tap on the
          landing. Picasso is nineteen. Casagemas has just shot himself in a Montmartre
          café. The Blue Period is grief made into a palette.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {(await import('@/lib/paintings')).paintingsByWing('/grounds/picasso/bateau-lavoir').map((p) => (
          <a key={p.slug} href={`/piece/${p.slug}`} className="block marble rounded-lg p-5 space-y-2 transition-all hover:scale-[1.02]">
            <p className="font-mono text-[0.5rem] uppercase tracking-[0.28em] text-gold/70">{p.year}</p>
            <h3 className="font-display text-sm leading-tight text-ivory">{p.title}</h3>
            <div className="h-px w-6 bg-gold/30" />
            <p className="font-body text-[0.7rem] italic text-ivory/65 leading-relaxed">{p.dimensions}</p>
            <p className="font-mono text-[0.5rem] uppercase tracking-[0.22em] text-gold/60 pt-1">Enter →</p>
          </a>
        ))}
      </div>
    </WingLayout>
  );
}
