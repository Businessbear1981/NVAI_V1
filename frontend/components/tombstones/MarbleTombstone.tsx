interface MarbleTombstoneProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  caption: string;
  featured?: boolean;
}

export default function MarbleTombstone({
  eyebrow,
  title,
  subtitle,
  caption,
  featured = false,
}: MarbleTombstoneProps) {
  return (
    <div
      className={`marble group cursor-pointer rounded-t-[120px] px-8 py-10 text-center transition-all duration-700 ${
        featured ? 'scale-105 md:py-14' : ''
      }`}
      style={{ aspectRatio: '3 / 4' }}
    >
      <div className="flex h-full flex-col items-center justify-between">
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.36em] text-[#3a2a0a] drop-shadow-[0_1px_0_rgba(255,245,220,0.7)]">
            {eyebrow}
          </p>
          <div className="mx-auto mt-3 h-px w-10 bg-[#5a3a1a] transition-all duration-700 group-hover:w-20" />
        </div>

        <div className="space-y-3">
          <h2 className="font-didot text-[2.6rem] uppercase tracking-[0.12em] text-[#1a0e05] drop-shadow-[0_1px_0_rgba(255,250,235,0.4)] md:text-[3.4rem]">
            {title}
          </h2>
          <p className="font-display text-xl italic tracking-wider text-[#4a2c08] drop-shadow-[0_1px_0_rgba(255,245,220,0.5)]">
            {subtitle}
          </p>
        </div>

        <div>
          <div className="mx-auto mb-4 h-px w-10 bg-[#5a3a1a]" />
          <p className="font-body text-sm tracking-wider text-[#2a1a05] drop-shadow-[0_1px_0_rgba(255,250,235,0.4)]">
            {caption}
          </p>
        </div>
      </div>
    </div>
  );
}
