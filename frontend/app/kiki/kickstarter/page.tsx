'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import WingLayout from '@/components/layout/WingLayout';
import { VIDEOS } from '@/lib/videoMap';

const BACKDROP =
  'radial-gradient(ellipse at 30% 30%, rgba(220,40,80,0.35) 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, rgba(120,20,60,0.5) 0%, transparent 60%), linear-gradient(180deg, #1a060c 0%, #2a0a14 40%, #0a0205 100%)';

const TIERS = [
  { name: 'The Audience',     price: '$25',     perk: 'Production updates, on-chain donor wall inscription, exclusive premiere stream.' },
  { name: 'The Café Crowd',   price: '$100',    perk: 'Above + signed digital screenplay, behind-the-scenes archive.' },
  { name: 'The Rotonde Circle', price: '$500',  perk: 'Above + invitation to the Napa premiere, leather-bound Kiki exposé.' },
  { name: 'The Producer Tier', price: '$10,000', perk: 'Producer credit on the film, table at the Napa premiere, founding-patron inscription in the Kiki room.' },
];

// To activate the live Kickstarter widget + stats:
// 1. Create the campaign on kickstarter.com
// 2. Copy the project slug — the path after kickstarter.com/projects/
//    e.g. for kickstarter.com/projects/ardanedge/kiki-feature-film → slug = "ardanedge/kiki-feature-film"
// 3. Replace KICKSTARTER_PROJECT_SLUG below, redeploy.
const KICKSTARTER_PROJECT_SLUG = ''; // set me

interface Status { indicator: string; description: string; components: { name: string; status: string }[] }
interface Project { ok: boolean; name?: string; state?: string; pledged?: number; goal?: number; backers_count?: number; currency?: string; deadline?: number; url?: string; note?: string }

function fmtMoney(n: number | undefined, ccy: string | undefined) {
  if (n == null) return '—';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: ccy ?? 'USD', maximumFractionDigits: 0 }).format(n);
}

export default function KikiKickstarterPage() {
  const [status, setStatus] = useState<Status | null>(null);
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    fetch('/api/kickstarter/status').then((r) => r.json()).then(setStatus).catch(() => {});
    if (KICKSTARTER_PROJECT_SLUG) {
      fetch(`/api/kickstarter/project?slug=${encodeURIComponent(KICKSTARTER_PROJECT_SLUG)}`)
        .then((r) => r.json()).then(setProject).catch(() => {});
    }
  }, []);

  const pct = project?.pledged && project?.goal ? Math.min(100, Math.round((project.pledged / project.goal) * 100)) : 0;

  return (
    <WingLayout
      back={{ href: '/kiki', label: 'Back to the Kiki wing' }}
      eyebrow="Help bring this feature film to life"
      title="The Kickstarter"
      subtitle="A 1920s Montparnasse love story"
      caption="Kiki dancing. Modigliani watching. A century later their story finally told. Pledge to bring the feature to screen."
      backdrop={BACKDROP}
      videoSrc={VIDEOS.kiki.leadIn}
    >
      <div className="space-y-12">
        {/* Live cabaret cut */}
        <div className="mx-auto max-w-3xl overflow-hidden rounded-lg border border-gold/30 bg-midnight">
          <video src={VIDEOS.kiki.moulinRougeLive} controls className="aspect-video w-full object-cover" />
          <p className="px-3 py-2 font-mono text-[0.55rem] uppercase tracking-[0.28em] text-gold/70">
            The 45-second cabaret cut · presented to potential backers
          </p>
        </div>

        {/* Live project stats (once the slug is set) or status */}
        <div className="marble rounded-lg p-10 text-center space-y-3">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">Campaign progress</p>
          {project?.ok ? (
            <>
              <h2 className="font-didot text-3xl tracking-wider text-ivory">{project.name}</h2>
              <p className="font-display italic text-gold/80">
                {fmtMoney(project.pledged, project.currency)} pledged of {fmtMoney(project.goal, project.currency)}
              </p>
              <div className="mx-auto h-2 max-w-2xl overflow-hidden rounded-full bg-midnight/80">
                <div className="h-full bg-gradient-to-r from-gold-dim via-gold to-gold-warm" style={{ width: `${pct}%` }} />
              </div>
              <p className="font-body text-sm italic text-ivory/70">
                {pct}% pledged · {project.backers_count?.toLocaleString()} backers
                {project.deadline && ` · ends ${new Date(project.deadline * 1000).toLocaleDateString()}`}
              </p>
              {project.url && (
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 rounded-full border border-gold/50 bg-gold/10 px-8 py-3 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-gold hover:border-gold hover:bg-gold/20">
                  Pledge on Kickstarter →
                </a>
              )}
            </>
          ) : (
            <>
              <p className="font-body italic text-ivory/70 max-w-2xl mx-auto">
                The Kickstarter campaign is not yet live. Once the project is published on
                kickstarter.com, set <code className="font-mono text-[0.85em]">KICKSTARTER_PROJECT_SLUG</code> in
                <code className="font-mono text-[0.85em]"> app/kiki/kickstarter/page.tsx </code>
                and live pledge data + the Pledge button appear here automatically.
              </p>
              {status && (
                <p className="mt-4 font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/60">
                  Kickstarter platform status: <span className={status.indicator === 'none' ? 'text-emerald-400' : 'text-amber-400'}>{status.description || status.indicator}</span>
                </p>
              )}
            </>
          )}
        </div>

        {/* Tiers */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((t) => (
            <article key={t.name} className="marble rounded-lg p-6 space-y-3">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">{t.name}</p>
              <p className="font-didot text-3xl tracking-wider text-ivory">{t.price}</p>
              <div className="h-px w-8 bg-gold/30" />
              <p className="font-body text-xs italic text-ivory/70">{t.perk}</p>
              <button className="mt-3 w-full rounded-full border border-gold/40 px-4 py-2 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-gold hover:border-gold hover:bg-gold/15">
                Pledge
              </button>
            </article>
          ))}
        </div>

        <p className="text-center font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/60">
          10% of every pledge donated in Kiki&rsquo;s name
        </p>

        <Link href="/kiki/guestbook" className="block text-center font-mono text-[0.65rem] uppercase tracking-[0.32em] text-ivory/60 hover:text-gold">
          Or sign the Kiki guest book →
        </Link>
      </div>
    </WingLayout>
  );
}
