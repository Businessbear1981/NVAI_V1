import Link from 'next/link';
import MarbleTombstone from '@/components/tombstones/MarbleTombstone';

export default function FoyerPage() {
  return (
    <main className="relative min-h-screen overflow-hidden film-grain">
      <video
        src="/videos/nvai_grand_foyer_5k.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-midnight/60 pointer-events-none" />

      <div className="relative z-10 px-8 py-16">
      <Link
        href="/"
        className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 transition-colors hover:text-gold"
      >
        ← Return
      </Link>

      <div className="mx-auto mt-16 max-w-7xl text-center">
        <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
          The Foyer
        </p>
        <h1 className="mt-4 font-didot text-5xl uppercase tracking-[0.12em] text-ivory drop-shadow-lg">
          Villa Monticello
        </h1>
        <div className="mx-auto mt-6 h-px w-24 bg-gold/40" />
        <p className="mt-8 font-body italic tracking-wider text-ivory/70">
          Three doors.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Link href="/foyer/welcome" aria-label="Welcome, About, Merch">
            <MarbleTombstone
              eyebrow="Welcome"
              title="Guestbook"
              subtitle="About · Merch"
              caption="Sign in. Learn the Institute. Take something home."
            />
          </Link>

          <Link href="/foyer/staircase" aria-label="Upstairs">
            <MarbleTombstone
              eyebrow="The Staircase"
              title="Upstairs"
              subtitle="Bernard · Kandinsky · Raphael"
              caption="Three doors at the landing."
              featured
            />
          </Link>

          <Link href="/gallery" aria-label="Full Gallery">
            <MarbleTombstone
              eyebrow="Direct"
              title="Full Gallery"
              subtitle="The Catalog"
              caption="All twenty-five works. Skip the tour."
            />
          </Link>
        </div>
      </div>
      </div>
    </main>
  );
}
