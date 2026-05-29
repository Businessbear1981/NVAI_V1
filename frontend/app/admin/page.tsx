import WingLayout from '@/components/layout/WingLayout';

const ADMIN_BACKDROP =
  'linear-gradient(180deg, #0a0807 0%, #14100a 50%, #0a0605 100%)';

const sections = [
  { title: 'Paintings', detail: 'Add, edit, drag-and-drop upload, set viewing location, retire pieces.' },
  { title: 'Wings & Rooms', detail: 'Swap lead-in videos, edit metadata, reorder carousels, set ambient audio.' },
  { title: 'Video Repository', detail: 'Upload Higgsfield exports, encode for CDN, manage rotation logic.' },
  { title: 'DDNDA Signatures', detail: 'Audit log of every signed agreement (timestamp, IP, version).' },
  { title: 'Kiki Commerce', detail: 'Exposé orders, audiobook subscribers, KISP list, Kickstarter pledges.' },
  { title: 'Sales & Inquiries', detail: 'Every painting-level inquiry, Bernard transcripts, sale-in-progress.' },
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
        {sections.map((s) => (
          <article key={s.title} className="marble rounded-lg p-6 space-y-3">
            <h3 className="font-display text-lg leading-tight text-ivory">{s.title}</h3>
            <div className="h-px w-8 bg-gold/30" />
            <p className="font-body text-sm italic text-ivory/70">{s.detail}</p>
          </article>
        ))}
      </div>
      <p className="mt-12 text-center text-xs italic text-ivory/50">
        Supabase Auth + admin RBAC wiring in progress.
      </p>
    </WingLayout>
  );
}
