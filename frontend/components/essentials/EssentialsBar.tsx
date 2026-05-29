import Link from 'next/link';

const tabs = [
  { label: 'Vault', href: '/vault' },
  { label: 'Auction', href: '/auction' },
  { label: 'Inquire', href: '/inquire' },
  { label: 'Account', href: '/account' },
  { label: 'Cart', href: '/cart' },
];

export default function EssentialsBar() {
  return (
    <nav className="absolute inset-x-0 bottom-0 z-30 border-t border-gold/15 bg-midnight/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/40">
          Essentials
        </div>
        <ul className="flex items-center gap-8">
          {tabs.map((t) => (
            <li key={t.label}>
              <Link
                href={t.href}
                className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-ivory/70 transition-colors duration-500 hover:text-gold"
              >
                {t.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/40">
          NVAI
        </div>
      </div>
    </nav>
  );
}
