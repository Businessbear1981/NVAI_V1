import Link from 'next/link';
import CinematicBackdrop from '@/components/cinematic/CinematicBackdrop';

export const metadata = {
  title: 'Consignment Services',
};

export default function ConsignPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-midnight text-ivory film-grain">
      <CinematicBackdrop
        fallbackGradient="radial-gradient(ellipse at 50% 0%, rgba(232,200,122,0.10) 0%, transparent 60%), linear-gradient(180deg, #1a0e08 0%, #261810 50%, #110a06 100%)"
        overlay={0.5}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-8 py-20 md:py-28">
        <Link
          href="/"
          className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 transition-colors hover:text-gold"
        >
          ← Return to the chateau
        </Link>

        <header className="mt-16 mb-20 text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
            For collectors, estates &amp; gallery partners
          </p>
          <h1 className="mt-6 font-didot text-5xl uppercase tracking-[0.12em] text-ivory drop-shadow md:text-6xl">
            Consignment Services
          </h1>
          <div className="mx-auto mt-8 h-px w-24 bg-gold/40" />
          <p className="mx-auto mt-8 max-w-2xl font-display text-lg italic tracking-wide text-gold/85">
            If you have art you would like featured for sale.
          </p>
        </header>

        <article className="space-y-20 font-body text-base leading-relaxed text-ivory/85">

          <section>
            <p className="mb-4 font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
              I &mdash; The Practice
            </p>
            <h2 className="mb-8 font-didot text-3xl uppercase tracking-[0.1em] text-ivory">
              A Selective Programme
            </h2>
            <p className="mb-4">
              The Napa Valley Art Institut accepts a limited number of significant works for representation each year. We work with private collectors, families, estates, and gallery partners across the United States, Europe, and the Gulf to bring fine art to qualified buyers, dealers, and institutional collectors &mdash; entirely under non-disclosure.
            </p>
            <p>
              Each work is considered on its own merits. Provenance, attribution, and condition matter more to us than the name on the canvas.
            </p>
          </section>

          <section>
            <p className="mb-4 font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
              II &mdash; What We Offer
            </p>
            <h2 className="mb-8 font-didot text-3xl uppercase tracking-[0.1em] text-ivory">
              Services
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="mt-2 inline-block h-px w-6 flex-shrink-0 bg-gold/50" />
                <span>Discreet exclusive or non-exclusive brokerage representation under written agreement.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-2 inline-block h-px w-6 flex-shrink-0 bg-gold/50" />
                <span>Forensic authentication coordination via <strong className="text-ivory">InsightART, Prague</strong> &mdash; CERN-derived particle physics MRXR imaging.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-2 inline-block h-px w-6 flex-shrink-0 bg-gold/50" />
                <span>Attribution review and Catalogue Raisonn&eacute; consideration via <strong className="text-ivory">Institut Restellini, Paris</strong>.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-2 inline-block h-px w-6 flex-shrink-0 bg-gold/50" />
                <span>Provenance research, exhibition history reconstruction, and documentation curation.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-2 inline-block h-px w-6 flex-shrink-0 bg-gold/50" />
                <span>Private viewing at Villa Monticello or arranged secure transport to the buyer&rsquo;s location.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-2 inline-block h-px w-6 flex-shrink-0 bg-gold/50" />
                <span>Direct introduction to a vetted private-buyer network across the US, Europe, and the Gulf.</span>
              </li>
            </ul>
          </section>

          <section>
            <p className="mb-4 font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
              III &mdash; What We Look For
            </p>
            <h2 className="mb-8 font-didot text-3xl uppercase tracking-[0.1em] text-ivory">
              Criteria
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="mt-2 inline-block h-px w-6 flex-shrink-0 bg-gold/50" />
                <span>Works of significant attribution, provenance, or art-historical importance.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-2 inline-block h-px w-6 flex-shrink-0 bg-gold/50" />
                <span>Aggregate value at or above one million dollars per work.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-2 inline-block h-px w-6 flex-shrink-0 bg-gold/50" />
                <span>Documentation in reasonable order &mdash; provenance chain, exhibition history, prior authentication where applicable.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-2 inline-block h-px w-6 flex-shrink-0 bg-gold/50" />
                <span>Estate and family-held works particularly welcome.</span>
              </li>
            </ul>
          </section>

          <section>
            <p className="mb-4 font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
              IV &mdash; To Consign
            </p>
            <h2 className="mb-8 font-didot text-3xl uppercase tracking-[0.1em] text-ivory">
              Submit a Work
            </h2>
            <p className="mb-8">
              Contact Richard Triberg directly. A brief written description, an image where available, and the work&rsquo;s current location are enough to begin a conversation. All inquiries are received under the same Document Distribution &amp; Non-Disclosure framework that governs our gallery.
            </p>
            <div className="space-y-3 font-mono text-[0.75rem] uppercase tracking-[0.28em] text-gold/85">
              <p>
                <span className="text-gold/50">Email &middot; </span>
                <a href="mailto:inquires@NVAI.org" className="transition-colors hover:text-ivory">
                  inquires@NVAI.org
                </a>
              </p>
              <p>
                <span className="text-gold/50">Direct &middot; </span>
                <a href="tel:+14152333131" className="transition-colors hover:text-ivory">
                  +1 415&middot;233&middot;3131
                </a>
              </p>
            </div>
            <div className="mt-12 flex flex-wrap gap-8">
              <Link href="/inquire" className="font-mono text-[0.7rem] uppercase tracking-[0.32em] text-gold transition-colors hover:text-ivory">
                Submit an Inquiry &rarr;
              </Link>
              <Link href="/about" className="font-mono text-[0.7rem] uppercase tracking-[0.32em] text-gold transition-colors hover:text-ivory">
                About the Institut &rarr;
              </Link>
            </div>
          </section>

        </article>

        <footer className="mt-24 text-center font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/40">
          Napa Valley Art Institut &middot; Villa Monticello &middot; Napa, California
        </footer>
      </div>
    </main>
  );
}
