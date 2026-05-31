import Link from 'next/link';
import CinematicBackdrop from '@/components/cinematic/CinematicBackdrop';

export const metadata = {
  title: 'About the Institut',
};

export default function AboutPage() {
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
            Private gallery &middot; Napa Valley
          </p>
          <h1 className="mt-6 font-didot text-5xl uppercase tracking-[0.12em] text-ivory drop-shadow md:text-6xl">
            About the Institut
          </h1>
          <div className="mx-auto mt-8 h-px w-24 bg-gold/40" />
        </header>

        <article className="space-y-20 font-body text-base leading-relaxed text-ivory/85">

          <section>
            <p className="mb-4 font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
              I &mdash; The Institut
            </p>
            <h2 className="mb-8 font-didot text-3xl uppercase tracking-[0.1em] text-ivory">
              A Private Gallery
            </h2>
            <p className="mb-4">
              Napa Valley Art Institut is a private gallery and research institution founded on the principle that the world&rsquo;s masterworks deserve to be encountered the way they were meant to be &mdash; quietly, on their own terms, in private.
            </p>
            <p>
              We represent over thirty works of fine art valued in excess of one billion dollars on behalf of private collectors, families, and gallery partners across the United States, Europe, and the Gulf.
            </p>
          </section>

          <section>
            <p className="mb-4 font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
              II &mdash; The Property
            </p>
            <h2 className="mb-8 font-didot text-3xl uppercase tracking-[0.1em] text-ivory">
              Villa Monticello
            </h2>
            <p className="mb-4">
              Thirty-three acres in the heart of the Napa Valley, surrounded by vineyards and the rise of the Vaca Range. Built in the Tuscan tradition using castle stone &mdash; four decks, over 4,500 square feet of outdoor entertainment space, accommodation for up to two hundred guests at private events, sleeps ten.
            </p>
            <p className="mb-4">
              The property serves as the Institut&rsquo;s seat. A place for the introduction of works, the meeting of collectors, and the quiet completion of private sales.
            </p>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-gold/70">
              Fifteen minutes to St. Helena. Twenty to Calistoga.
            </p>
          </section>

          <section>
            <p className="mb-4 font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
              III &mdash; Authentication
            </p>
            <h2 className="mb-8 font-didot text-3xl uppercase tracking-[0.1em] text-ivory">
              Documentation as the Standard
            </h2>
            <p className="mb-4">
              Our works carry the documentation that the contemporary fine-art market requires. The Institut partners with <strong className="text-ivory">InsightART, Prague</strong> for forensic analysis using CERN-derived particle physics technology &mdash; material-sensitive X-ray micro-radiography employing dual robotic imaging.
            </p>
            <p className="mb-4">
              Under the direction of Marc Restellini, <strong className="text-ivory">Institut Restellini, Paris</strong> provides attribution review and Catalogue Raisonn&eacute; consideration. Where appropriate, additional consultation is conducted with the <strong className="text-ivory">DOX Centre for Contemporary Art</strong>, Prague.
            </p>
          </section>

          <section id="leadership">
            <p className="mb-4 font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
              IV &mdash; Leadership
            </p>
            <h2 className="mb-8 font-didot text-3xl uppercase tracking-[0.1em] text-ivory">
              The Triberg Family
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="font-didot text-xl tracking-wider text-ivory">Richard Triberg</h3>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-gold/70 mt-2">
                  Executive Director &middot; Research Specialist
                </p>
                <p className="mt-3">
                  Author of <em>The Extraordinary Life &amp; Times of the Immortal yet Forgotten KIKI, &ldquo;Queen of Montparnasse&rdquo;</em> &mdash; a 228-page Exposé and Graphic Novel. President, Pacific Arts Collection. A career spanning commercial development, the entertainment industry, and humanitarian platform design.
                </p>
              </div>
              <div>
                <h3 className="font-didot text-xl tracking-wider text-ivory">Cinder Triberg</h3>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-gold/70 mt-2">
                  Curator &middot; Artist
                </p>
                <p className="mt-3">
                  The Institut&rsquo;s curatorial direction is hers. Works selected for representation pass under her eye before they pass under any other.
                </p>
              </div>
            </div>
          </section>

          <section>
            <p className="mb-4 font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
              V &mdash; The Portfolio
            </p>
            <h2 className="mb-8 font-didot text-3xl uppercase tracking-[0.1em] text-ivory">
              Thirty Works &middot; Over One Billion
            </h2>
            <p className="mb-4">
              Three Modiglianis. Nine Picassos. Seven Chagalls. Two Kandinskys. Individual works by Da Vinci, Raphael, Monet, Matisse, Jackson Pollock, Frida Kahlo, and Emile Bernard.
            </p>
            <p>
              The Institut&rsquo;s marquee work &mdash; <em>Sitting Nude with Crossed Hands</em> by Amedeo Modigliani (c. 1917) &mdash; is the subject of Mr. Triberg&rsquo;s Exposé and the centerpiece of the Institut&rsquo;s current programming.
            </p>
          </section>

          <section>
            <p className="mb-4 font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
              VI &mdash; Access
            </p>
            <h2 className="mb-8 font-didot text-3xl uppercase tracking-[0.1em] text-ivory">
              Available Under Non-Disclosure
            </h2>
            <p className="mb-8">
              The Institut&rsquo;s digital gallery is available to qualified collectors, dealers, lenders, and brokers under a Document Distribution &amp; Non-Disclosure Agreement. Access is granted on signature; the full collection &mdash; authentication materials, provenance, pricing &mdash; becomes visible inside the gate.
            </p>
            <div className="flex flex-wrap gap-8">
              <Link href="/ddnda" className="font-mono text-[0.7rem] uppercase tracking-[0.32em] text-gold transition-colors hover:text-ivory">
                Sign DDNDA &rarr;
              </Link>
              <Link href="/inquire" className="font-mono text-[0.7rem] uppercase tracking-[0.32em] text-gold transition-colors hover:text-ivory">
                Inquire &rarr;
              </Link>
            </div>
          </section>

        </article>

        <footer className="mt-24 text-center font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/40">
          Napa Valley Art Institut &middot; Villa Monticello &middot; Napa, California
          <br />
          <span className="mt-2 inline-block text-ivory/30">inquires@NVAI.org</span>
        </footer>
      </div>
    </main>
  );
}
