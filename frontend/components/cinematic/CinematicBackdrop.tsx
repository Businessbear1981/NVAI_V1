'use client';

import { useEffect, useRef } from 'react';

interface CinematicBackdropProps {
  videoSrc?: string;
  poster?: string;
  fallbackGradient?: string;
  overlay?: number; // 0-1
  playbackRate?: number; // 1 = normal, 0.5 = half speed for slower cinematic feel
  frozenAtEnd?: boolean; // skip autoplay; seek to last frame so the shot reads as a still image
}

export default function CinematicBackdrop({
  videoSrc,
  poster,
  fallbackGradient,
  overlay = 0.35,
  playbackRate = 1,
  frozenAtEnd = false,
}: CinematicBackdropProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.playsInline = true;
    v.playbackRate = playbackRate;
    v.load();

    if (frozenAtEnd) {
      const seekToEnd = () => {
        if (!v.duration || !isFinite(v.duration)) return;
        v.currentTime = Math.max(0, v.duration - 0.05);
        v.pause();
      };
      v.addEventListener('loadedmetadata', seekToEnd);
      return () => v.removeEventListener('loadedmetadata', seekToEnd);
    }

    v.play().catch(() => { /* autoplay blocked is fine */ });
  }, [videoSrc, playbackRate, frozenAtEnd]);

  return (
    <div
      className="absolute inset-0"
      style={fallbackGradient ? { background: fallbackGradient } : undefined}
    >
      {videoSrc && (
        <video
          key={videoSrc}
          ref={videoRef}
          src={videoSrc}
          poster={poster}
          preload="metadata"
          autoPlay={!frozenAtEnd}
          loop={!frozenAtEnd}
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
        />
      )}
      <div
        className="absolute inset-0 bg-midnight"
        style={{ opacity: overlay }}
      />
    </div>
  );
}
