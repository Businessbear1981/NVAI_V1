import WingLayout from '@/components/layout/WingLayout';
import { VIDEOS } from '@/lib/videoMap';

const BACKDROP =
  'radial-gradient(ellipse at 30% 30%, rgba(220,40,80,0.30) 0%, transparent 50%), linear-gradient(180deg, #1a060c 0%, #2a0a14 40%, #0a0205 100%)';

const ENTRIES = [
  { name: 'M. Dubois', message: 'She lived louder than any of us. Thank you for remembering her properly.', when: '14 days ago' },
  { name: 'Anonymous', message: 'I have been a Kiki super-fan since 1994. Finally — finally — a room she would have walked into.', when: '11 days ago' },
  { name: 'Hannah K., Brooklyn', message: 'The Modigliani-Kiki story is everything. Cannot wait for the film.', when: '6 days ago' },
];

export default function KikiGuestbookPage() {
  return (
    <WingLayout
      back={{ href: '/kiki', label: 'Back to the Kiki wing' }}
      eyebrow="The Guest Book"
      title="Sign for Kiki"
      subtitle="What she meant. What she still means."
      caption="Public messages from her one million super-fans worldwide."
      backdrop={BACKDROP}
      videoSrc={VIDEOS.kiki.danceOneMinute}
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <section className="space-y-4">
          <h2 className="font-display text-xl tracking-wider text-gold">Leave your mark</h2>
          <input
            type="text"
            placeholder="Your name (or anonymous)"
            className="w-full rounded border border-gold/20 bg-midnight/50 px-4 py-3 font-body text-ivory placeholder:text-ivory/40 focus:border-gold/60 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email (kept private)"
            className="w-full rounded border border-gold/20 bg-midnight/50 px-4 py-3 font-body text-ivory placeholder:text-ivory/40 focus:border-gold/60 focus:outline-none"
          />
          <textarea
            rows={5}
            placeholder="A line for Kiki…"
            className="w-full rounded border border-gold/20 bg-midnight/50 px-4 py-3 font-body text-ivory placeholder:text-ivory/40 focus:border-gold/60 focus:outline-none"
          />
          <button className="rounded-full border border-gold/50 bg-gold/10 px-8 py-3 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-gold transition-all hover:border-gold hover:bg-gold/20">
            Sign
          </button>
        </section>

        <section className="space-y-6">
          <h2 className="font-display text-xl tracking-wider text-gold">Recent</h2>
          {ENTRIES.map((entry, i) => (
            <article key={i} className="marble rounded-lg p-5 space-y-2">
              <p className="font-body italic text-ivory/85 leading-relaxed">{`"${entry.message}"`}</p>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-gold/70">
                — {entry.name} · {entry.when}
              </p>
            </article>
          ))}
        </section>
      </div>
    </WingLayout>
  );
}
