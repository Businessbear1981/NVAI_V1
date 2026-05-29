import WingLayout from '@/components/layout/WingLayout';

const INQUIRE_BACKDROP =
  'radial-gradient(ellipse at 50% 30%, rgba(232,200,122,0.18) 0%, transparent 55%), linear-gradient(180deg, #14100a 0%, #1c160c 40%, #0a0605 100%)';

export default function InquirePage() {
  return (
    <WingLayout
      back={{ href: '/', label: 'Return' }}
      eyebrow="Essentials"
      title="Inquire"
      subtitle="Through Bernard"
      caption="Tell us what you are looking for. Bernard routes to Sean or Richard for material questions."
      backdrop={INQUIRE_BACKDROP}
      videoSrc="/videos/nvai_foyer_aerial_static.mp4"
    >
      <div className="mx-auto max-w-2xl space-y-6">
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
        <textarea
          rows={5}
          placeholder="What are you looking for?"
          className="w-full rounded border border-gold/20 bg-midnight/40 px-4 py-3 font-body text-ivory placeholder:text-ivory/40 focus:border-gold/60 focus:outline-none"
        />
        <div className="text-center">
          <button className="rounded-full border border-gold/50 bg-gold/10 px-8 py-3 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-gold transition-all hover:border-gold hover:bg-gold/20">
            Send to Bernard
          </button>
        </div>
        <p className="text-center text-xs italic text-ivory/50">
          Factual responses (status, document delivery) auto-send. Material correspondence
          queues for founder approval first.
        </p>
      </div>
    </WingLayout>
  );
}
