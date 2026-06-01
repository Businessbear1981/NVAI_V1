'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import WingLayout from '@/components/layout/WingLayout';

const BACKDROP =
  'linear-gradient(180deg, #0a0807 0%, #14100a 50%, #0a0605 100%)';

interface Creator {
  platform: string;
  handle: string;
  url: string;
  name: string;
  followers: number | null;
  focus: string;
  tier: 'A' | 'B' | 'C';
  contact: string | null;
  language: string;
  note: string;
}

const PLATFORM_LABELS: Record<string, string> = {
  youtube: 'YouTube',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  reddit: 'Reddit',
  facebook: 'Facebook',
  discord: 'Discord',
  substack: 'Substack',
  patreon: 'Patreon',
  blog: 'Blog',
  podcast: 'Podcast',
  snap: 'Snap',
};

const OUTREACH_TEMPLATES = [
  {
    name: 'Cold pitch — top creators (Tier A)',
    subject: 'A 109-year-old Modigliani — published tonight, for your audience',
    body: `Hi {name},

I've followed your work on {platform_focus} for a while — you're one of the few voices that takes Kiki seriously as more than a footnote in Man Ray's biography.

Tonight we're publishing The Extraordinary Life & Times of the Immortal Kiki — a 220-page exposé and graphic novel covering 109-year-old archival material on the Modigliani painting that Pacific Arts is now authenticating. Written by Jana Misho. 700+ research links. The first scholarly companion of its kind.

I'd like to offer your audience early access at $9 (the entry tier) with a comp for you. If it resonates, there's a Bonus Plates edition ($79 bundle) and a hand-bound limited edition ($295) we can structure an affiliate split on.

Worth a 10-min call?

— Sean Gilmore
Founder, Napa Valley Art Institut
napavalleyartinstitut.com`,
  },
  {
    name: 'DM pitch — IG/TikTok creators',
    subject: '(DM)',
    body: `Hey {name} — saw your {recent_post_topic}. We're publishing a 220-page Kiki exposé tonight (the Modigliani find from Pacific Arts). Want to send you an advance copy + an affiliate link for your audience. DM if open.`,
  },
  {
    name: 'Cold pitch — Substack writers',
    subject: 'A Kiki primary-source release — would your readers care?',
    body: `Hi {name},

Your piece on {recent_piece} stood out — most Kiki coverage online recycles the same five Man Ray photos. Tonight we're releasing The Extraordinary Life & Times of the Immortal Kiki, a 220-page exposé built around primary sources from Richard Triberg's archive (the same archive that surfaced the contested Modigliani at Pacific Arts).

We have an affiliate program ($9 entry tier, ladder up to a $295 hand-bound edition) and can comp a review copy. Happy to send the digital scrapbook (63 archival plates) ahead of release if you're considering coverage.

— Sean Gilmore
napavalleyartinstitut.com`,
  },
];

export default function KikiEagleEyePage() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [tierFilter, setTierFilter] = useState<'all' | 'A' | 'B' | 'C'>('all');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [activeTemplate, setActiveTemplate] = useState(0);

  useEffect(() => {
    fetch('/data/kiki-creators.json')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        setCreators(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = creators.filter((c) => {
    if (tierFilter !== 'all' && c.tier !== tierFilter) return false;
    if (platformFilter !== 'all' && c.platform !== platformFilter) return false;
    return true;
  });

  const platforms = Array.from(new Set(creators.map((c) => c.platform))).sort();
  const tierCount = {
    A: creators.filter((c) => c.tier === 'A').length,
    B: creators.filter((c) => c.tier === 'B').length,
    C: creators.filter((c) => c.tier === 'C').length,
  };

  return (
    <WingLayout
      back={{ href: '/admin', label: 'Curator Console' }}
      eyebrow="Internal · Marketing Intelligence"
      title="Eagle Eye · Kiki"
      subtitle="The one million super-fans, mapped"
      caption="Top creators and communities across every platform, ranked for the $2 → $295 ladder drop. Outreach templates below."
      backdrop={BACKDROP}
    >
      {/* ====================== STATS ====================== */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 mb-12">
        <div className="marble rounded-lg p-6 text-center">
          <p className="font-didot text-3xl text-gold">{creators.length}</p>
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-ivory/65 mt-2">
            Creators mapped
          </p>
        </div>
        <div className="marble rounded-lg p-6 text-center">
          <p className="font-didot text-3xl text-gold">{tierCount.A}</p>
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-ivory/65 mt-2">
            Tier A · top 25
          </p>
        </div>
        <div className="marble rounded-lg p-6 text-center">
          <p className="font-didot text-3xl text-gold">{platforms.length}</p>
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-ivory/65 mt-2">
            Platforms covered
          </p>
        </div>
        <div className="marble rounded-lg p-6 text-center">
          <p className="font-didot text-3xl text-gold">
            {creators.filter((c) => c.contact && c.contact !== 'null').length}
          </p>
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-ivory/65 mt-2">
            Direct contacts
          </p>
        </div>
      </div>

      {/* ====================== OUTREACH TEMPLATES ====================== */}
      <section className="mb-12">
        <h2 className="font-didot text-2xl uppercase tracking-[0.12em] text-ivory mb-6">
          Outreach templates
        </h2>
        <div className="marble rounded-lg p-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            {OUTREACH_TEMPLATES.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => setActiveTemplate(i)}
                className={`rounded-full border px-4 py-2 font-mono text-[0.6rem] uppercase tracking-[0.32em] transition-all ${
                  activeTemplate === i
                    ? 'border-gold bg-gold/20 text-gold'
                    : 'border-gold/30 text-ivory/70 hover:border-gold/60'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
          <div className="space-y-3 pt-2">
            <div>
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">
                Subject
              </p>
              <p className="font-body text-sm text-ivory mt-1">
                {OUTREACH_TEMPLATES[activeTemplate].subject}
              </p>
            </div>
            <div>
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">
                Body (tokens: {'{name}'} {'{platform_focus}'} {'{recent_post_topic}'} {'{recent_piece}'})
              </p>
              <pre className="font-body text-sm text-ivory/90 whitespace-pre-wrap mt-2 bg-midnight/40 p-4 rounded">
                {OUTREACH_TEMPLATES[activeTemplate].body}
              </pre>
            </div>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(OUTREACH_TEMPLATES[activeTemplate].body)}
              className="rounded-full border border-gold/50 bg-gold/10 px-6 py-2 font-mono text-[0.6rem] uppercase tracking-[0.32em] text-gold hover:bg-gold/20"
            >
              Copy to clipboard
            </button>
          </div>
        </div>
      </section>

      {/* ====================== FILTERS ====================== */}
      <section className="mb-8 flex flex-wrap items-center gap-4">
        <span className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-ivory/65">
          Tier:
        </span>
        {(['all', 'A', 'B', 'C'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTierFilter(t)}
            className={`rounded-full border px-3 py-1 font-mono text-[0.55rem] uppercase tracking-[0.32em] transition-all ${
              tierFilter === t
                ? 'border-gold bg-gold/20 text-gold'
                : 'border-gold/30 text-ivory/65 hover:border-gold/60'
            }`}
          >
            {t === 'all' ? 'All' : t}
          </button>
        ))}
        <span className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-ivory/65 ml-4">
          Platform:
        </span>
        <select
          value={platformFilter}
          onChange={(e) => setPlatformFilter(e.target.value)}
          className="rounded border border-gold/30 bg-midnight/40 px-3 py-1 font-mono text-xs text-ivory"
        >
          <option value="all">All</option>
          {platforms.map((p) => (
            <option key={p} value={p}>
              {PLATFORM_LABELS[p] || p}
            </option>
          ))}
        </select>
        <p className="ml-auto font-mono text-[0.55rem] uppercase tracking-[0.32em] text-ivory/65">
          {filtered.length} of {creators.length}
        </p>
      </section>

      {/* ====================== CREATOR TABLE ====================== */}
      {loading ? (
        <p className="text-center font-body italic text-ivory/60 py-12">
          Loading intelligence map…
        </p>
      ) : creators.length === 0 ? (
        <div className="marble rounded-lg p-10 text-center space-y-3">
          <p className="font-display italic text-gold/85">
            Eagle Eye is still doing the first deep pass.
          </p>
          <p className="font-body text-sm text-ivory/75">
            The intelligence agent is mapping YouTube, IG, TikTok, Reddit, FB, Discord, Substack,
            and blog communities right now. Refresh in a few minutes.
          </p>
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-ivory/45">
            Output will land at /data/kiki-creators.json
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((c, i) => (
            <article
              key={`${c.platform}-${c.handle}-${i}`}
              className="marble rounded-lg p-4 grid grid-cols-1 md:grid-cols-[auto_2fr_1fr_2fr_auto] gap-4 items-center"
            >
              <span
                className={`inline-block rounded-full px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.32em] ${
                  c.tier === 'A'
                    ? 'bg-gold/20 text-gold border border-gold/60'
                    : c.tier === 'B'
                    ? 'bg-ivory/10 text-ivory/85 border border-ivory/30'
                    : 'bg-ivory/5 text-ivory/55 border border-ivory/15'
                }`}
              >
                {c.tier}
              </span>
              <div>
                <p className="font-display text-base text-ivory">{c.name}</p>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-gold/70">
                  {PLATFORM_LABELS[c.platform] || c.platform} · {c.handle}
                </p>
              </div>
              <p className="font-mono text-sm text-ivory/85">
                {c.followers ? c.followers.toLocaleString() : '—'}
              </p>
              <p className="font-body text-xs italic text-ivory/75">{c.note}</p>
              <div className="flex gap-2">
                <a
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded border border-gold/30 px-3 py-1 font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/80 hover:border-gold hover:text-gold"
                >
                  Visit
                </a>
                {c.contact && c.contact !== 'null' && (
                  <a
                    href={c.contact.includes('@') ? `mailto:${c.contact}` : c.contact}
                    className="rounded border border-gold/50 bg-gold/10 px-3 py-1 font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold hover:bg-gold/20"
                  >
                    Contact
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="mt-12 text-center">
        <Link
          href="/admin"
          className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-ivory/55 hover:text-gold"
        >
          ← Curator Console
        </Link>
      </div>
    </WingLayout>
  );
}
