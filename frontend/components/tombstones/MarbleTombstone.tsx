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
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">
            {eyebrow}
          </p>
          <div className="mx-auto mt-3 h-px w-8 bg-gold/40 transition-all duration-700 group-hover:w-16" />
        </div>

        <div className="space-y-3">
          <h2 className="font-didot text-4xl uppercase tracking-[0.12em] text-ivory md:text-5xl">
            {title}
          </h2>
          <p className="font-display text-lg italic tracking-wider text-gold/80">
            {subtitle}
          </p>
        </div>

        <div>
          <div className="mx-auto mb-4 h-px w-8 bg-gold/40" />
          <p className="font-body text-xs tracking-wider text-ivory/70">
            {caption}
          </p>
        </div>
      </div>
    </div>
  );
}
