'use client';

import { useRef, useState } from 'react';

interface BernardWalkthroughProps {
  text: string;
  label?: string;
}

/**
 * Calls /api/bernard/speak, plays back the British male narration.
 * Shows a transcript while it speaks.
 */
export default function BernardWalkthrough({
  text,
  label = 'Have Bernard walk you through this',
}: BernardWalkthroughProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);

  async function play() {
    setError(null);
    setLoading(true);
    setShowTranscript(true);
    try {
      const res = await fetch('/api/bernard/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({ detail: 'request failed' }));
        throw new Error(j.detail || 'request failed');
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const el = audioRef.current;
      if (el) {
        el.src = url;
        await el.play();
        setPlaying(true);
        el.onended = () => setPlaying(false);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'unknown');
    } finally {
      setLoading(false);
    }
  }

  function stop() {
    const el = audioRef.current;
    if (el) { el.pause(); el.currentTime = 0; }
    setPlaying(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={playing ? stop : play}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-6 py-3 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-gold transition-all hover:border-gold hover:bg-gold/20 disabled:opacity-50"
        >
          <span aria-hidden>{playing ? '◼' : '▶'}</span>
          {loading ? 'Bernard is preparing…' : playing ? 'Stop' : label}
        </button>
        <button
          onClick={() => setShowTranscript((v) => !v)}
          className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-ivory/60 hover:text-gold"
        >
          {showTranscript ? 'Hide transcript' : 'Read instead'}
        </button>
      </div>
      <audio ref={audioRef} preload="none" />
      {showTranscript && (
        <blockquote className="mx-auto max-w-3xl rounded-lg border border-gold/15 bg-midnight/40 px-6 py-5 font-body italic text-ivory/85 leading-relaxed">
          {text}
        </blockquote>
      )}
      {error && (
        <p className="text-center font-body italic text-xs text-oxblood/80">
          {error}. Set <code className="font-mono">ELEVENLABS_API_KEY</code> in <code className="font-mono">backend/.env</code> and restart.
        </p>
      )}
    </div>
  );
}
