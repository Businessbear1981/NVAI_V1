'use client';

import { useEffect, useRef } from 'react';

interface CinematicBackdropProps {
  videoSrc?: string;
  poster?: string;
  fallbackGradient?: string;
  overlay?: number; // 0-1
}

export default function CinematicBackdrop({
  videoSrc,
  poster,
  fallbackGradient,
  overlay = 0.35,
}: CinematicBackdropProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.muted = true;
      v.playsInline = true;
      v.play().catch(() => { /* autoplay blocked is fine */ });
    }
  }, [videoSrc]);

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
