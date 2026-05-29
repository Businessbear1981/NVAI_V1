'use client';

import { useEffect, useRef, useState } from 'react';

interface AudioBedProps {
  src: string;
  initialMuted?: boolean;
  label?: string;
}

/**
 * Single ambient audio loop with a discreet mute toggle.
 * Browser autoplay rules mean the first play must be user-initiated.
 */
export default function AudioBed({ src, initialMuted = true, label }: AudioBedProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(initialMuted);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.muted = muted;
    el.loop = true;
    el.volume = muted ? 0 : 0.35;
  }, [muted]);

  async function toggle() {
    const el = audioRef.current;
    if (!el) return;
    if (!playing) {
      el.muted = false;
      el.volume = 0.35;
      try {
        await el.play();
        setMuted(false);
        setPlaying(true);
      } catch {
        // autoplay blocked — keep muted
      }
    } else {
      const next = !muted;
      el.muted = next;
      el.volume = next ? 0 : 0.35;
      setMuted(next);
    }
  }

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />
      <button
        onClick={toggle}
        aria-label={muted ? 'Unmute ambient audio' : 'Mute ambient audio'}
        className="fixed bottom-20 left-6 z-40 flex h-10 items-center gap-2 rounded-full border border-gold/30 bg-midnight/70 px-3 backdrop-blur font-mono text-[0.55rem] uppercase tracking-[0.28em] text-gold/80 transition-all hover:border-gold hover:text-gold"
      >
        <span aria-hidden>{muted ? '♪̸' : '♪'}</span>
        <span className="hidden sm:inline">{label ?? 'Ambient'}</span>
      </button>
    </>
  );
}
