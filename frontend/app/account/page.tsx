import WingLayout from '@/components/layout/WingLayout';

const ACCOUNT_BACKDROP =
  'radial-gradient(ellipse at 50% 30%, rgba(232,200,122,0.18) 0%, transparent 55%), linear-gradient(180deg, #14100a 0%, #1c160c 40%, #0a0605 100%)';

export default function AccountPage() {
  return (
    <WingLayout
      back={{ href: '/', label: 'Return' }}
      eyebrow="Essentials"
      title="Your Account"
      subtitle="Profile · DDNDA · saved pieces · history"
      caption="Everything you have signed, saved, asked, or purchased."
      backdrop={ACCOUNT_BACKDROP}
      videoSrc="https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_foyer_aerial_static.mp4"
    >
      <div className="mx-auto max-w-2xl space-y-6">
        <button className="w-full rounded border border-gold/40 px-6 py-4 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-gold transition-all hover:border-gold hover:bg-gold/10">
          Sign in
        </button>
        <button className="w-full rounded border border-ivory/20 px-6 py-4 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-ivory/70 transition-all hover:border-gold hover:text-gold">
          Create account
        </button>
        <p className="text-center text-xs italic text-ivory/50">
          Supabase Auth wiring in progress.
        </p>
      </div>
    </WingLayout>
  );
}
