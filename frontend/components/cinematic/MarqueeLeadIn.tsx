'use client';

import { useEffect, useRef, useState } from 'react';

interface MarqueeLeadInProps {
  videoSrc: string;
  /** Seconds of video playback before the marquee freeze appears. */
  videoSeconds?: number;
  /** Seconds the marquee freeze is shown before the page reveals. */
  marqueeSeconds?: number;
  /** Main headline shown on the marquee card. */
  title?: string;
  /** Smaller line above the title. */
  eyebrow?: string;
  /** Smaller line below the title. */
  subtitle?: string;
  /** Called when the lead-in is finished and the page should reveal. */
  onComplete?: () => void;
}

/**
 * Cabaret marquee lead-in: plays a short video clip, then freezes on a
 * Tonight-Only style title card with running cabaret-light dots around the
 * border. Visitor can also click "Take me in" to skip ahead.
 */
export default function MarqueeLeadIn({
  videoSrc,
  videoSeconds = 6,
  marqueeSeconds = 4,
  title = 'TONIGHT ONLY',
  eyebrow = 'The Marquee',
  subtitle = 'The Queen of Montparnasse',
  onComplete,
}: MarqueeLeadInProps) {
  const [phase, setPhase] = useState<'video' | 'marquee' | 'done'>('video');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('marquee'), videoSeconds * 1000);
    return () => clearTimeout(t1);
  }, [videoSeconds]);

  useEffect(() => {
    if (phase !== 'marquee') return;
    const t = setTimeout(() => {
      setPhase('done');
      onComplete?.();
    }, marqueeSeconds * 1000);
    return () => clearTimeout(t);
  }, [phase, marqueeSeconds, onComplete]);

  if (phase === 'done') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      {/* Video phase */}
      {phase === 'video' && (
        <video preload="metadata"
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Marquee phase — freeze frame still showing + title card overlay */}
      {phase === 'marquee' && (
        <>
          <video preload="metadata"
            src={videoSrc}
            autoPlay={false}
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-black/65" />
          <div className="relative z-10 mx-auto max-w-3xl px-8 text-center">
            {/* Cabaret bulbs frame */}
            <div
              className="relative inline-block p-12 border-2 border-gold/70"
              style={{
                boxShadow:
                  '0 0 80px rgba(232,200,122,0.35), inset 0 0 40px rgba(232,200,122,0.15)',
              }}
            >
              {/* corner bulbs */}
              <span className="absolute -top-2 -left-2 h-3 w-3 rounded-full bg-gold shadow-[0_0_12px_rgba(232,200,122,0.95)] animate-pulse" />
              <span
                className="absolute -top-2 -right-2 h-3 w-3 rounded-full bg-gold shadow-[0_0_12px_rgba(232,200,122,0.95)] animate-pulse"
                style={{ animationDelay: '0.2s' }}
              />
              <span
                className="absolute -bottom-2 -left-2 h-3 w-3 rounded-full bg-gold shadow-[0_0_12px_rgba(232,200,122,0.95)] animate-pulse"
                style={{ animationDelay: '0.4s' }}
              />
              <span
                className="absolute -bottom-2 -right-2 h-3 w-3 rounded-full bg-gold shadow-[0_0_12px_rgba(232,200,122,0.95)] animate-pulse"
                style={{ animationDelay: '0.6s' }}
              />

              {eyebrow && (
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.5em] text-gold/85">
                  {eyebrow}
                </p>
              )}
              <h1 className="mt-6 font-didot text-5xl uppercase tracking-[0.18em] text-ivory drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] md:text-7xl">
                {title}
              </h1>
              <div className="mx-auto mt-6 h-px w-32 bg-gold/60" />
              {subtitle && (
                <p className="mt-6 font-display text-2xl italic tracking-wider text-gold drop-shadow-lg md:text-3xl">
                  {subtitle}
                </p>
              )}
            </div>
            <button
              onClick={() => {
                setPhase('done');
                onComplete?.();
              }}
              className="mt-12 font-mono text-[0.6rem] uppercase tracking-[0.4em] text-ivory/70 hover:text-gold underline-offset-4 hover:underline"
            >
              Take me in →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
