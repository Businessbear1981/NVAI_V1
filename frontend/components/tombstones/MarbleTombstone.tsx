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
      style={{ aspectRatio: '2 / 3' }}
    >
      <div className="flex h-full flex-col items-center justify-between">
        <div>
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-[#3a2a0a]">
            {eyebrow}
          </p>
          <div className="mx-auto mt-3 h-px w-8 bg-[#5a3a1a] transition-all duration-700 group-hover:w-16" />
        </div>

        <div className="space-y-3">
          <h2 className="font-didot text-2xl uppercase tracking-[0.12em] text-[#1a0e05] md:text-3xl">
            {title}
          </h2>
          <p className="font-display text-base italic tracking-wider text-[#4a2c08]">
            {subtitle}
          </p>
        </div>

        <div>
          <div className="mx-auto mb-4 h-px w-8 bg-[#5a3a1a]" />
          <p className="font-body text-xs tracking-wider text-[#2a1a05]">
            {caption}
          </p>
        </div>
      </div>
    </div>
  );
}
