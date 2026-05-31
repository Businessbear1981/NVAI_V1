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
      className={`marble group cursor-pointer rounded-md px-4 py-3 text-center transition-all duration-500 ${
        featured ? 'scale-105' : ''
      }`}
    >
      <p className="font-mono text-[0.5rem] uppercase tracking-[0.32em] text-[#3a2a0a]">
        {eyebrow}
      </p>
      <h2 className="mt-1 font-didot text-base uppercase tracking-[0.12em] text-[#1a0e05] md:text-lg">
        {title}
      </h2>
      <p className="font-display text-[0.7rem] italic tracking-wider text-[#4a2c08]">
        {subtitle}
      </p>
      <div className="mx-auto my-2 h-px w-6 bg-[#5a3a1a]" />
      <p className="font-body text-[0.65rem] tracking-wider text-[#2a1a05]">
        {caption}
      </p>
    </div>
  );
}
