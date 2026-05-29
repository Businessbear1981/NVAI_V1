import Link from 'next/link';
import MarbleTombstone from '@/components/tombstones/MarbleTombstone';

export default function GardenPage() {
  return (
    <main className="relative min-h-screen overflow-hidden film-grain">
      <video
        src="/videos/nvai_garden_path_to_patio_5k.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-midnight/50 pointer-events-none" />

      <div className="relative z-10 px-8 py-16">
      <Link
        href="/"
        className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 transition-colors hover:text-gold"
      >
        ← Return
      </Link>

      <div className="mx-auto mt-16 max-w-7xl text-center">
        <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
          The Garden Party
        </p>
        <h1 className="mt-4 font-didot text-5xl uppercase tracking-[0.12em] text-ivory drop-shadow-lg">
          The Patio
        </h1>
        <div className="mx-auto mt-6 h-px w-24 bg-gold/40" />
        <p className="mt-8 font-body italic tracking-wider text-ivory/70">
          Tuscany-inspired. Vineyard views. Where guests are invited.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Link href="/parlor" aria-label="The Parlor — La Ruche">
            <MarbleTombstone
              eyebrow="Inside the Bar"
              title="The Parlor"
              subtitle="La Ruche · Chagall"
              caption="Bohemian. Samovar. Six floating dreamscapes."
            />
          </Link>

          <Link href="/matisse" aria-label="Matisse Pavilion">
            <MarbleTombstone
              eyebrow="Center Patio"
              title="Matisse"
              subtitle="Mediterranean Pavilion"
              caption="The vineyard view is his Riviera."
              featured
            />
          </Link>

          <Link href="/grounds" aria-label="The Grounds">
            <MarbleTombstone
              eyebrow="Out to the Property"
              title="The Grounds"
              subtitle="Monet · Picasso · Da Vinci · Frida"
              caption="The expansive estate."
            />
          </Link>
        </div>
      </div>
      </div>
    </main>
  );
}
