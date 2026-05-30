'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Chapter {
  id: number;
  chars: number;
  preview: string;
  audioUrl: string | null;
  audioBytes: number;
}

interface Manifest {
  title: string;
  author: string;
  totalChapters: number;
  totalChars: number;
  voiceId: string;
  chapters: Chapter[];
}

const BACKDROP =
  'radial-gradient(ellipse at 30% 30%, rgba(220,40,80,0.30) 0%, transparent 50%), linear-gradient(180deg, #1a060c 0%, #2a0a14 40%, #0a0205 100%)';

export default function KikiAudiobookPage() {
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [generatingId, setGeneratingId] = useState<number | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  async function refresh() {
    const r = await fetch('/api/kiki/audiobook');
    setManifest(await r.json());
  }
  useEffect(() => { refresh(); }, []);

  async function generate(id: number) {
    setGeneratingId(id);
    setStatus(null);
    try {
      const r = await fetch('/api/kiki/audiobook/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chapterId: id }),
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({ detail: 'request failed' }));
        throw new Error(j.detail || 'failed');
      }
      const j = await r.json();
      setStatus(`Chapter ${id} ready — ${Math.round(j.bytes / 1024)} kB.`);
      await refresh();
    } catch (e) {
      setStatus(`Chapter ${id} failed: ${e instanceof Error ? e.message : 'unknown'}`);
    } finally {
      setGeneratingId(null);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden film-grain" style={{ background: BACKDROP }}>
      <div className="absolute inset-0 bg-midnight/40 pointer-events-none" />
      <div className="relative z-10 px-8 py-12">
        <Link href="/kiki" className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 hover:text-gold">
          ← Back to the Kiki wing
        </Link>

        <header className="mx-auto mt-10 max-w-4xl text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
            The Audiobook
          </p>
          <h1 className="mt-4 font-didot text-5xl uppercase tracking-[0.12em] text-ivory">
            Listen to Kiki
          </h1>
          <div className="mx-auto mt-6 h-px w-24 bg-gold/40" />
          <p className="mt-6 font-body italic text-ivory/75 max-w-2xl mx-auto leading-relaxed">
            Richard Triberg&rsquo;s 228-page Exposé — <em>The Extraordinary Life &amp; Times of the
            Immortal yet Forgotten KIKI, Queen of Montparnasse</em> — narrated in English with a
            soft French accent. Produced in ElevenLabs by Sean Gilmore. Each chapter is roughly
            four minutes of listening.
          </p>
          {manifest && (
            <p className="mt-4 font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/60">
              {manifest.totalChapters} chapters · {Math.round(manifest.totalChars / 1000)}k characters · voice {manifest.voiceId}
            </p>
          )}
        </header>

        {status && (
          <p className="mt-8 text-center font-mono text-[0.65rem] uppercase tracking-[0.32em] text-gold/80">
            {status}
          </p>
        )}

        <section className="mx-auto mt-12 max-w-4xl space-y-3">
          {!manifest && <p className="text-center font-body italic text-ivory/60">Loading…</p>}
          {manifest?.chapters.map((c) => (
            <article key={c.id} className="rounded-lg border border-gold/20 bg-midnight/40 p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">
                    Chapter {String(c.id).padStart(3, '0')} · {c.chars.toLocaleString()} chars
                  </p>
                  <p className="mt-2 font-body italic text-sm text-ivory/85 max-w-2xl leading-relaxed">
                    {c.preview}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {c.audioUrl ? (
                    <audio src={c.audioUrl} controls className="h-9" />
                  ) : (
                    <button
                      onClick={() => generate(c.id)}
                      disabled={generatingId === c.id}
                      className="rounded-full border border-gold/50 bg-gold/10 px-5 py-2 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-gold transition-all hover:border-gold hover:bg-gold/20 disabled:opacity-50"
                    >
                      {generatingId === c.id ? 'Generating…' : 'Generate audio'}
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
