import WingLayout from '@/components/layout/WingLayout';

const WELCOME_BACKDROP =
  'radial-gradient(ellipse at 50% 30%, rgba(232,200,122,0.18) 0%, transparent 55%), linear-gradient(180deg, #14100a 0%, #1c160c 40%, #0a0805 100%)';

const merch = [
  { name: 'Modigliani Commemorative Poster', detail: '36 × 24 in · first 10,000 copies', price: '$95' },
  { name: 'The Collection — Catalogue Raisonné', detail: 'Hand-bound, slipcased, signed by Sean & Josh', price: '$285' },
  { name: 'NVAI silk scarf', detail: 'Cyclamen on ivory · 36 in square · made in Como', price: '$320' },
  { name: 'Villa Monticello cabernet', detail: '2024 vintage, single-vineyard, allocation lot', price: '$185' },
];

export default function WelcomePage() {
  return (
    <WingLayout
      back={{ href: '/foyer', label: 'Back to the foyer' }}
      eyebrow="Welcome"
      title="Guestbook · About · Merch"
      subtitle="Sign in. Learn the Institute. Take something home."
      backdrop={WELCOME_BACKDROP}
      videoSrc="/videos/nvai_foyer_landing_handshot_5k.mp4"
    >
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <section className="space-y-6">
          <h2 className="font-display text-2xl tracking-wider text-gold">The Guestbook</h2>
          <p className="font-body text-ivory/80 leading-relaxed">
            Every visitor signs the guestbook. We use it to send the Institute's quarterly
            letter — discoveries, new arrivals, the unseen photographs of Kiki that surface
            week by week. No marketing. Just the work.
          </p>
          <form className="space-y-4 max-w-md">
            <input
              type="text"
              placeholder="Full name"
              className="w-full rounded border border-gold/20 bg-midnight/40 px-4 py-3 font-body text-ivory placeholder:text-ivory/40 focus:border-gold/60 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded border border-gold/20 bg-midnight/40 px-4 py-3 font-body text-ivory placeholder:text-ivory/40 focus:border-gold/60 focus:outline-none"
            />
            <button
              type="button"
              className="rounded border border-gold/40 px-6 py-3 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-gold transition-all hover:border-gold hover:bg-gold/10"
            >
              Sign the guestbook
            </button>
          </form>
        </section>

        <section className="space-y-6">
          <h2 className="font-display text-2xl tracking-wider text-gold">About the Institute</h2>
          <p className="font-body text-ivory/80 leading-relaxed">
            Napa Valley Art Institute is a private digital gallery built on the grounds of
            Villa Monticello in St. Helena, California. We represent twenty-five master
            works under exclusive contract from a Prague gallery that handles authentication.
            Two principals. A small AI workforce. A long view.
          </p>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-gold/60">
            Founders: Sean Gilmore · Richard
          </p>
        </section>
      </div>

      <section className="mt-20 space-y-8">
        <div className="text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
            The Merch
          </p>
          <h2 className="mt-4 font-didot text-3xl uppercase tracking-[0.12em] text-ivory">
            Take Something Home
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-gold/40" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {merch.map((item) => (
            <article
              key={item.name}
              className="marble rounded-lg p-6 space-y-3"
            >
              <h3 className="font-display text-lg leading-tight text-ivory">{item.name}</h3>
              <p className="font-body text-sm italic text-ivory/60">{item.detail}</p>
              <div className="h-px w-8 bg-gold/30" />
              <p className="font-mono text-[0.7rem] tracking-wider text-gold">{item.price}</p>
            </article>
          ))}
        </div>
      </section>
    </WingLayout>
  );
}
