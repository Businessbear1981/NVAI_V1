'use client';

import { useEffect, useRef } from 'react';

interface CinematicBackdropProps {
  imageSrc?: string; // when set, renders a still <img> and bypasses the video element entirely
  videoSrc?: string;
  poster?: string;
  fallbackGradient?: string;
  overlay?: number; // 0-1
  playbackRate?: number; // 1 = normal, 0.5 = half speed for slower cinematic feel
  frozenAtEnd?: boolean; // legacy: seek video to last frame (unreliable; prefer imageSrc)
}

export default function CinematicBackdrop({
  imageSrc,
  videoSrc,
  poster,
  fallbackGradient,
  overlay = 0.35,
  playbackRate = 1,
  frozenAtEnd = false,
}: CinematicBackdropProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (imageSrc) return; // image mode: no video element, nothing to wire up
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
  }, [imageSrc, videoSrc, playbackRate, frozenAtEnd]);

  return (
    <div
      className="absolute inset-0"
      style={fallbackGradient ? { background: fallbackGradient } : undefined}
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt=""
          aria-hidden
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : videoSrc ? (
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
      ) : null}
      <div
        className="absolute inset-0 bg-midnight"
        style={{ opacity: overlay }}
      />
    </div>
  );
}
