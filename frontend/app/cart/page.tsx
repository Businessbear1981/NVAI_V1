import WingLayout from '@/components/layout/WingLayout';

const CART_BACKDROP =
  'radial-gradient(ellipse at 50% 30%, rgba(232,200,122,0.18) 0%, transparent 55%), linear-gradient(180deg, #14100a 0%, #1c160c 40%, #0a0605 100%)';

export default function CartPage() {
  return (
    <WingLayout
      back={{ href: '/', label: 'Return' }}
      eyebrow="Essentials"
      title="Cart"
      subtitle="Kiki products · merch · Kickstarter pledges"
      caption="Stripe checkout. Direct sale of paintings is Bernard-routed, not cart-based."
      backdrop={CART_BACKDROP}
      videoSrc="/videos/nvai_foyer_aerial_static.mp4"
    >
      <div className="mx-auto max-w-2xl text-center space-y-6">
        <p className="font-body italic text-ivory/60">Your cart is empty.</p>
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-gold/60">
          Browse the Kiki wing or the Foyer Welcome shop to add items.
        </p>
      </div>
    </WingLayout>
  );
}
