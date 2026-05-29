import WingLayout from '@/components/layout/WingLayout';

const VAULT_BACKDROP =
  'radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.15) 0%, transparent 55%), linear-gradient(180deg, #0a0807 0%, #14100a 50%, #0a0605 100%)';

const services = [
  { name: 'Escrow on sale', detail: 'Stripe Connect — funds held until physical transfer completes.' },
  { name: 'Proof of liquidity', detail: 'Plaid + Stripe deposit verification for auction-eligible buyers.' },
  { name: 'DDNDA on record', detail: 'Your signed agreement, timestamp, document version.' },
  { name: 'KYC + identity', detail: 'For pieces above defined materiality thresholds.' },
];

export default function VaultPage() {
  return (
    <WingLayout
      back={{ href: '/', label: 'Return' }}
      eyebrow="Essentials"
      title="The Vault"
      subtitle="Escrow · Lending · Verification"
      caption="The transactional layer. Bernard surfaces what you need when you need it."
      backdrop={VAULT_BACKDROP}
      videoSrc="/videos/nvai_foyer_aerial_static.mp4"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {services.map((s) => (
          <article key={s.name} className="marble rounded-lg p-6 space-y-3">
            <h3 className="font-display text-lg leading-tight text-ivory">{s.name}</h3>
            <div className="h-px w-8 bg-gold/30" />
            <p className="font-body text-sm italic text-ivory/70">{s.detail}</p>
          </article>
        ))}
      </div>
    </WingLayout>
  );
}
