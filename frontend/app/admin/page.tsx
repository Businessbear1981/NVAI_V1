import Link from 'next/link';
import WingLayout from '@/components/layout/WingLayout';

const ADMIN_BACKDROP =
  'linear-gradient(180deg, #0a0807 0%, #14100a 50%, #0a0605 100%)';

const sections = [
  { title: 'Paintings', detail: 'Add, edit, drag-and-drop upload, set viewing location, retire pieces.', href: undefined },
  { title: 'Wings & Rooms', detail: 'Swap lead-in videos, edit metadata, reorder carousels, set ambient audio.', href: undefined },
  { title: 'Video Repository', detail: 'Upload Higgsfield exports, encode for CDN, manage rotation logic.', href: '/admin/videos' },
  { title: 'DDNDA Signatures', detail: 'Audit log of every signed agreement (timestamp, IP, version).', href: undefined },
  { title: 'Kiki Commerce', detail: 'Exposé orders, audiobook subscribers, KISP list, Kickstarter pledges.', href: undefined },
  { title: 'Sales & Inquiries', detail: 'Every painting-level inquiry, Bernard transcripts, sale-in-progress.', href: undefined },
  {
    title: 'Eagle Eye · Kiki Fans',
    detail: 'Map of the 1M Kiki super-fan landscape — YouTube, IG, TikTok, Reddit, FB, Discord, Substack. Outreach tracker + email templates for the $9 → $295 ladder drop.',
    href: '/admin/kiki-eagle-eye',
  },
];

export default function AdminPage() {
  return (
    <WingLayout
      back={{ href: '/', label: 'Return' }}
      eyebrow="Internal"
      title="Curator Console"
      subtitle="For Sean and Richard only"
      caption="The admin panel. Authenticated entry required."
      backdrop={ADMIN_BACKDROP}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((s) => {
          const card = (
            <article className="marble rounded-lg p-6 space-y-3 h-full transition-all hover:ring-1 hover:ring-gold/40">
              <h3 className="font-display text-lg leading-tight text-ivory">{s.title}</h3>
              <div className="h-px w-8 bg-gold/30" />
              <p className="font-body text-sm italic text-ivory/70">{s.detail}</p>
              {s.href && (
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70 pt-2">
                  Enter →
                </p>
              )}
            </article>
          );
          return s.href ? (
            <Link key={s.title} href={s.href} className="block">
              {card}
            </Link>
          ) : (
            <div key={s.title}>{card}</div>
          );
        })}
      </div>
      <p className="mt-12 text-center text-xs italic text-ivory/50">
        Supabase Auth + admin RBAC wiring in progress.
      </p>
    </WingLayout>
  );
}
