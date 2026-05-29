import WingLayout from '@/components/layout/WingLayout';
import { VIDEOS } from '@/lib/videoMap';

const BACKDROP =
  'radial-gradient(ellipse at 50% 30%, rgba(200,140,80,0.25) 0%, transparent 55%), linear-gradient(180deg, #1a1408 0%, #261a0a 50%, #0a0605 100%)';

export default async function PicassoBoisgeloupPage() {
  return (
    <WingLayout
      back={{ href: '/grounds/picasso', label: 'Back through the compound' }}
      eyebrow="Picasso · Sub-room 2"
      title="Boisgeloup"
      subtitle="1934 – 1949"
      caption="The chateau-era atelier. Marie-Thérèse iconography, ceramic vessels, mid-century interior light. Picasso owned a real French chateau here from 1930 to 1955."
      backdrop={BACKDROP}
      videoSrc={VIDEOS.picassoBoisgeloup.leadIn}
      rotation={VIDEOS.picassoBoisgeloup.rotation}
    >
      <div className="mx-auto max-w-3xl space-y-6 text-center font-body text-ivory/85 leading-relaxed">
        <p>
          Boisgeloup was where Picasso held court in the 1930s — sculpture studios,
          carved stone, the long blonde-Marie-Thérèse afternoons. The 1949 Vallauris
          pottery years follow naturally — ceramic vessels everywhere.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {(await import('@/lib/paintings')).paintingsByWing('/grounds/picasso/boisgeloup').map((p) => (
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
