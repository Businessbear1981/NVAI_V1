import Link from 'next/link';
import WingLayout from '@/components/layout/WingLayout';

const BACKDROP =
  'radial-gradient(ellipse at 50% 30%, rgba(232,200,122,0.10) 0%, transparent 55%), linear-gradient(180deg, #14100a 0%, #1c160c 40%, #0a0605 100%)';

interface Recipient {
  share: string;
  name: string;
  location: string;
  mission: string;
  why: string;
  url: string;
  donateUrl: string;
}

const RECIPIENTS: Recipient[] = [
  {
    share: '60%',
    name: 'International Foundation for Art Research',
    location: 'New York · Founded 1969',
    mission:
      'Independent, nonprofit educational and research organization focused on art authentication, provenance research, and the study of art forgery and theft. The standard of the field.',
    why:
      'IFAR is the institution that took Richard Triberg through the authentication journey on the contested Modigliani that became NVAI\'s founding work. Supporting IFAR honors that journey — and signals NVAI\'s commitment to the rigorous research that legitimizes great paintings.',
    url: 'https://www.ifar.org',
    donateUrl: 'https://www.ifar.org/donate.php?utm_source=nvai&utm_campaign=kiki-ladder',
  },
  {
    share: '20%',
    name: 'di Rosa Center for Contemporary Art',
    location: 'Carneros, Napa Valley · Founded 1997',
    mission:
      'A 217-acre public art campus with 1,600+ works of California contemporary art, K-12 arts education programs, and rotating exhibitions. The legacy of winemaker-collector Rene di Rosa.',
    why:
      'Richard lives in Napa Valley. di Rosa is the major visual-arts institution closest to home, with a founder story — a Napa winemaker who gifted his private collection to the public — that mirrors NVAI\'s own thesis. Doing good where you live matters.',
    url: 'https://dirosaart.org',
    donateUrl: 'https://dirosaart.org/donate?utm_source=nvai&utm_campaign=kiki-ladder',
  },
  {
    share: '20%',
    name: 'Kiki\'s Paris Legacy',
    location: 'Cimetière du Montparnasse · Paris',
    mission:
      'Preservation of Alice Prin\'s (Kiki de Montparnasse, 1901–1953) grave at Cimetière du Montparnasse and broader Montparnasse cultural heritage. Recipient organization to be finalized — candidates: Société pour la Protection des Paysages et de l\'Esthétique de la France, Friends of Montparnasse, or a direct contribution to the cemetery\'s perpetual care fund.',
    why:
      'Kiki is buried in Montparnasse — a short walk from the Café du Dôme, La Rotonde, and Le Sélect, where she lived, painted, and was crowned Queen. Her tomb gets pilgrimages but no budgeted maintenance. We owe her this.',
    url: 'https://www.paris.fr/equipements/cimetiere-du-montparnasse-2729',
    donateUrl: '#',
  },
];

export default function SupportingArtsPage() {
  return (
    <WingLayout
      back={{ href: '/', label: 'Return' }}
      eyebrow="Where the tips go"
      title="Supporting the Arts"
      subtitle="The 60 · 20 · 20 split"
      caption="Every purchase at NVAI includes an optional tip at checkout. One hundred percent of every tip is forwarded directly to one of three arts-preservation institutions — split as below. NVAI never holds the funds; donations route directly to each recipient via passthrough link, and the donor receives a tax receipt from the recipient organization."
      backdrop={BACKDROP}
    >
      <div className="space-y-12">
        {RECIPIENTS.map((r) => (
          <article key={r.name} className="marble rounded-lg p-8 space-y-4">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
                  {r.location}
                </p>
                <h2 className="mt-2 font-didot text-2xl uppercase tracking-[0.12em] text-ivory md:text-3xl">
                  {r.name}
                </h2>
              </div>
              <p className="font-didot text-4xl text-gold">{r.share}</p>
            </div>
            <div className="h-px w-12 bg-gold/40" />
            <p className="font-body italic leading-relaxed text-ivory/85">{r.mission}</p>
            <p className="font-body leading-relaxed text-ivory/85">
              <span className="font-display italic text-gold/80">Why this one. </span>
              {r.why}
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <a
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-gold/30 px-5 py-2 font-mono text-[0.6rem] uppercase tracking-[0.32em] text-gold/80 transition-all hover:border-gold hover:text-gold"
              >
                Visit
              </a>
              {r.donateUrl !== '#' && (
                <a
                  href={r.donateUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-gold/50 bg-gold/10 px-5 py-2 font-mono text-[0.6rem] uppercase tracking-[0.32em] text-gold transition-all hover:border-gold hover:bg-gold/20"
                >
                  Donate Directly
                </a>
              )}
            </div>
          </article>
        ))}

        <section className="marble rounded-lg p-8 text-center space-y-4">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
            How it works
          </p>
          <p className="mx-auto max-w-2xl font-body italic leading-relaxed text-ivory/85">
            At checkout you choose to add a tip — any amount, from $1 to your discretion. The
            total tip is split 60/20/20 across the three institutions above. NVAI never holds
            the funds. Each donation flows directly to the recipient’s own donation page via
            a UTM-tagged passthrough so each organization can issue your tax receipt.
            <br />
            <br />
            The standing 10 percent of every Kiki product sale already pledged to charity is
            separate from these voluntary tips. Both stack.
          </p>
          <div className="pt-2">
            <Link
              href="/kiki"
              className="rounded-full border border-gold/50 bg-gold/10 px-8 py-3 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-gold transition-all hover:border-gold hover:bg-gold/20"
            >
              Return to Kiki
            </Link>
          </div>
        </section>
      </div>
    </WingLayout>
  );
}
