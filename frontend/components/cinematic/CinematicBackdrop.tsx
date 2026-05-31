'use client';

import { useEffect, useRef, useState } from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  // Lazy-load video only when in viewport — page renders instantly with gradient/poster.
  useEffect(() => {
    if (!containerRef.current || !videoSrc) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Delay video load by a beat so first paint and core content settle first
          setTimeout(() => setShouldLoadVideo(true), 400);
          observer.disconnect();
        }
      },
      { rootMargin: '0px', threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [videoSrc]);

  useEffect(() => {
    if (!shouldLoadVideo) return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.playsInline = true;
    v.playbackRate = playbackRate;
    v.load();
    v.play().catch(() => { /* autoplay blocked is fine */ });
  }, [shouldLoadVideo, playbackRate]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      style={fallbackGradient ? { background: fallbackGradient } : undefined}
    >
      {videoSrc && shouldLoadVideo && (
        <video
          key={videoSrc}
          ref={videoRef}
          src={videoSrc}
          poster={poster}
          preload="metadata"
          autoPlay
          loop
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
