'use client';

import { useEffect, useRef } from 'react';

interface CinematicBackdropProps {
  videoSrc?: string;
  poster?: string;
  fallbackGradient?: string;
  overlay?: number; // 0-1
  playbackRate?: number; // 1 = normal, 0.5 = half speed for slower cinematic feel
}

export default function CinematicBackdrop({
  videoSrc,
  poster,
  fallbackGradient,
  overlay = 0.35,
  playbackRate = 1,
}: CinematicBackdropProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.muted = true;
      v.playsInline = true;
      v.playbackRate = playbackRate;
      v.play().catch(() => { /* autoplay blocked is fine */ });
    }
  }, [videoSrc, playbackRate]);

  return (
    <div
      className="absolute inset-0"
      style={fallbackGradient ? { background: fallbackGradient } : undefined}
    >
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div
        className="absolute inset-0 bg-midnight"
        style={{ opacity: overlay }}
      />
    </div>
  );
}
