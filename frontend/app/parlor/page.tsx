import Link from 'next/link';
import WingLayout from '@/components/layout/WingLayout';
import { VIDEOS } from '@/lib/videoMap';

const PARLOR_BACKDROP =
  'radial-gradient(ellipse at 30% 40%, rgba(60,120,90,0.35) 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, rgba(140,60,40,0.30) 0%, transparent 55%), linear-gradient(180deg, #0a1408 0%, #14180a 50%, #050a05 100%)';

export default function ParlorPage() {
  return (
    <WingLayout
      back={{ href: '/garden', label: 'Back to the garden party' }}
      eyebrow="Patio Left"
      title="The Parlor"
      subtitle="La Ruche · the bohemian bar"
      caption="Bohemian gathering space. Green patina copper. Samovar steaming in the corner. Chagall's pieces hang quietly along the walls. The Chagall room is through the back."
      backdrop={PARLOR_BACKDROP}
    >
      <div className="mx-auto max-w-4xl space-y-10">
        <p className="text-center font-body text-ivory/80 leading-relaxed max-w-3xl mx-auto">
          Worn velvet banquettes and mismatched Thonet chairs. Yiddish posters peel on
          the walls. A phonograph plays Vertinsky low under conversation. The bar is
          oxidized copper, gone green with time. The room itself is the scene — guests
          drinking, laughing, moving between the patio and the chateau interior.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Link href="/parlor/chagall" className="block">
            <article className="marble rounded-lg p-8 space-y-3 transition-all hover:scale-[1.02]">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">
                Through the back
              </p>
              <h3 className="font-didot text-3xl uppercase tracking-wider text-ivory">
                The Chagall Room
              </h3>
              <div className="h-px w-12 bg-gold/30" />
              <p className="font-body text-sm italic text-ivory/75">
                Six floating-lovers and Vitebsk dreamscapes. Each piece with its own
                period interior video. Stained-glass light. The bar fades.
              </p>
              <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-gold/80">
                Enter →
              </p>
            </article>
          </Link>

          <Link href="/grand-hall" className="block">
            <article className="marble rounded-lg p-8 space-y-3 transition-all hover:scale-[1.02]">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">
                Through to the interior
              </p>
              <h3 className="font-didot text-3xl uppercase tracking-wider text-ivory">
                The Grand Hall
              </h3>
              <div className="h-px w-12 bg-gold/30" />
              <p className="font-body text-sm italic text-ivory/75">
                The chateau&rsquo;s 1920s ballroom — gallery opening, auction reception,
                the Modigliani cabinet, the catalog circle.
              </p>
              <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-gold/80">
                Continue inside →
              </p>
            </article>
          </Link>
        </div>

        <p className="text-center text-xs italic text-ivory/50">
          Bar fittings, samovar, period-correct La Ruche audio bed in production.
        </p>
      </div>
    </WingLayout>
  );
}
