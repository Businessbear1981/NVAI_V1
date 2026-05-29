import Link from 'next/link';
import type { ReactNode } from 'react';
import CinematicBackdrop from '@/components/cinematic/CinematicBackdrop';
import RotatingBackdrop from '@/components/cinematic/RotatingBackdrop';

interface WingLayoutProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  caption?: string;
  back?: { href: string; label?: string };
  backdrop?: string;
  videoSrc?: string;
  rotation?: string[]; // optional rotation set; if provided, RotatingBackdrop is used
  overlay?: number;
  children?: ReactNode;
}

export default function WingLayout({
  eyebrow,
  title,
  subtitle,
  caption,
  back = { href: '/', label: 'Return' },
  backdrop,
  videoSrc,
  rotation,
  overlay = 0.55,
  children,
}: WingLayoutProps) {
  return (
    <main className="relative min-h-screen overflow-hidden film-grain">
      {videoSrc && rotation && rotation.length > 0 ? (
        <RotatingBackdrop leadIn={videoSrc} rotation={rotation} overlay={overlay} />
      ) : (
        <CinematicBackdrop videoSrc={videoSrc} fallbackGradient={backdrop} overlay={overlay} />
      )}

      <div className="relative z-10 px-8 py-10">
        <Link
          href={back.href}
          className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 transition-colors hover:text-gold"
        >
          ← {back.label ?? 'Return'}
        </Link>

        <header className="mx-auto mt-12 max-w-4xl text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
            {eyebrow}
          </p>
          <h1 className="mt-4 font-didot text-5xl uppercase tracking-[0.12em] text-ivory md:text-6xl drop-shadow-lg">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 font-display text-xl italic tracking-wider text-gold/80">
              {subtitle}
            </p>
          )}
          <div className="mx-auto mt-8 h-px w-24 bg-gold/40" />
          {caption && (
            <p className="mt-6 font-body italic tracking-wider text-ivory/80 max-w-2xl mx-auto">
              {caption}
            </p>
          )}
        </header>

        <section className="mx-auto mt-16 max-w-6xl">{children}</section>
      </div>
    </main>
  );
}
