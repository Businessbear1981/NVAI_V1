'use client';

import { useEffect, useRef, useState } from 'react';

interface RotatingBackdropProps {
  leadIn: string;
  rotation?: readonly string[];
  overlay?: number;
}

/**
 * Plays leadIn once, then crossfades through the rotation set.
 * Two video tags are kept on the DOM and we alternate which is foreground.
 * Lead-in plays through to onEnded; afterwards each clip plays for its natural duration.
 */
export default function RotatingBackdrop({
  leadIn,
  rotation = [],
  overlay = 0.55,
}: RotatingBackdropProps) {
  const [foreground, setForeground] = useState<0 | 1>(0);
  const [srcA, setSrcA] = useState<string>(leadIn);
  const [srcB, setSrcB] = useState<string | null>(null);
  const queueIndex = useRef(0);
  const aRef = useRef<HTMLVideoElement>(null);
  const bRef = useRef<HTMLVideoElement>(null);

  // Reset when the wing changes
  useEffect(() => {
    setSrcA(leadIn);
    setSrcB(null);
    setForeground(0);
    queueIndex.current = 0;
  }, [leadIn]);

  function nextClip(): string | null {
    if (!rotation.length) return null;
    const next = rotation[queueIndex.current % rotation.length];
    queueIndex.current += 1;
    return next;
  }

  function handleEnded(which: 0 | 1) {
    const next = nextClip();
    if (!next) {
      // No rotation — loop the lead-in
      if (which === 0 && aRef.current) {
        aRef.current.currentTime = 0;
        aRef.current.play().catch(() => {});
      } else if (which === 1 && bRef.current) {
        bRef.current.currentTime = 0;
        bRef.current.play().catch(() => {});
      }
      return;
    }
    if (which === 0) {
      setSrcB(next);
      setForeground(1);
    } else {
      setSrcA(next);
      setForeground(0);
    }
  }

  useEffect(() => {
    const el = foreground === 0 ? aRef.current : bRef.current;
    if (el) {
      el.muted = true;
      el.playsInline = true;
      el.play().catch(() => {});
    }
  }, [foreground, srcA, srcB]);

  return (
    <div className="absolute inset-0">
      <video
        ref={aRef}
        preload="metadata"
        src={srcA}
        muted
        playsInline
        autoPlay
        onEnded={() => handleEnded(0)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[400ms] ${
          foreground === 0 ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {srcB && (
        <video
          ref={bRef}
          preload="metadata"
          src={srcB}
          muted
          playsInline
          autoPlay
          onEnded={() => handleEnded(1)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[400ms] ${
            foreground === 1 ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
      <div className="absolute inset-0 bg-midnight" style={{ opacity: overlay }} />
    </div>
  );
}
