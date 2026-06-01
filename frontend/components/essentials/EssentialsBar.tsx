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
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-gold/15 bg-midnight/60 backdrop-blur md:absolute">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 md:justify-between md:px-6 md:py-4">
        <div className="hidden font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/40 md:block">
          Essentials
        </div>
        <ul
          className="flex flex-1 items-center gap-5 overflow-x-auto whitespace-nowrap md:flex-none md:gap-8 md:overflow-visible"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
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
        <div className="hidden font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/40 md:block">
          NVAI
        </div>
      </div>
    </nav>
  );
}
