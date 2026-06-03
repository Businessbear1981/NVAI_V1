import Link from 'next/link';
import CinematicBackdrop from '@/components/cinematic/CinematicBackdrop';

export const revalidate = 0;

const ROLES = [
  {
    slug: 'buyer',
    eyebrow: 'i',
    label: 'Buyer',
    blurb:
      'Principals and family offices evaluating one or more works for acquisition. Asking price, condition, and exhibition history released after signature.',
  },
  {
    slug: 'lender',
    eyebrow: 'ii',
    label: 'Lender',
    blurb:
      'Banks, art-secured lenders, and insurers underwriting collateral. Formal appraisals, FMV opinions, insurance status, and owner of record released after signature.',
  },
  {
    slug: 'broker-dealer',
    eyebrow: 'iii',
    label: 'Broker-Dealer',
    blurb:
      'Licensed dealers, agents, and intermediaries representing a principal. Commission structure, pricing floor, and counter-party identity released after signature.',
  },
] as const;

export default function AccessPage() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden bg-midnight film-grain">
      <CinematicBackdrop
        imageSrc="https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_last_frame.jpg"
        fallbackGradient="radial-gradient(ellipse at 50% 35%, rgba(232,200,122,0.15) 0%, transparent 55%), linear-gradient(180deg, #1a1208 0%, #2b1709 50%, #0a0605 100%)"
        overlay={0.55}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 md:py-28">
        <header className="text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
            The Front Door
          </p>
          <h1 className="mt-4 font-didot text-4xl uppercase tracking-[0.12em] text-ivory md:text-5xl">
            Identify your interest
          </h1>
          <div className="mx-auto mt-6 h-px w-24 bg-gold/40" />
          <p className="mx-auto mt-8 max-w-2xl font-body italic text-ivory/75 leading-relaxed">
            The Institute releases provenance, condition, and pricing in tiers
            calibrated to the nature of the relationship. Select the role that
            describes you to proceed to the Document Distribution &amp;
            Non-Disclosure Agreement.
          </p>
        </header>

        <section className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {ROLES.map((role) => (
            <Link
              key={role.slug}
              href={`/ddnda/${role.slug}`}
              className="marble group flex flex-col rounded-lg p-8 transition-all hover:scale-[1.02]"
            >
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">
                {role.eyebrow}
              </p>
              <h2 className="mt-3 font-didot text-2xl tracking-wider text-ivory">
                {role.label}
              </h2>
              <div className="mt-4 h-px w-10 bg-gold/30" />
              <p className="mt-5 font-body text-sm italic text-ivory/75 leading-relaxed">
                {role.blurb}
              </p>
              <span className="mt-8 font-mono text-[0.6rem] uppercase tracking-[0.32em] text-gold/80 transition-colors group-hover:text-gold">
                Continue to DDNDA →
              </span>
            </Link>
          ))}
        </section>

        <p className="mt-16 text-center font-body text-xs italic text-ivory/55">
          If none of the three apply, write to{' '}
          <a href="mailto:concierge@napavalleyartinstitut.com" className="text-gold/80 hover:text-gold">
            concierge@napavalleyartinstitut.com
          </a>{' '}
          and a curator will respond personally.
        </p>
      </div>
    </main>
  );
}
