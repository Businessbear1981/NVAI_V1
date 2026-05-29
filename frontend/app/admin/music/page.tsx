'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Backdrop {
  key: string;
  label: string;
  description: string;
  targetPath: string;
  defaultPrompt: string;
  lengthMs: number;
}

const BACKDROPS: Backdrop[] = [
  {
    key: 'piaf',
    label: 'Kiki room · Piaf-inspired ambient',
    description: 'Plays under the Kiki wing as the room\'s musical backdrop.',
    targetPath: '/kiki/audio/piaf-ambient.mp3',
    lengthMs: 180000,
    defaultPrompt:
      'Soft instrumental cabaret in the style of 1920s Montparnasse — accordion lead, upright piano, brushed snare, slow waltz tempo. Melancholy, smoky, intimate. No vocals. Looping ambient, 3 minutes. Style: Edith Piaf, Mistinguett, the early cabaret recordings of Damia.',
  },
  {
    key: 'parlor',
    label: 'Parlor · La Ruche bohemian bar',
    description: 'Plays under the Parlor — bohemian Russian-Jewish artists colony.',
    targetPath: '/parlor/audio/la-ruche.mp3',
    lengthMs: 180000,
    defaultPrompt:
      'Russian samovar tea-room atmosphere. Slow accordion and balalaika, distant violin, low murmur of conversation as instrumental texture. 1920s bohemian Montparnasse meets Vitebsk shtetl. Melancholy but warm. No vocals. 3 minutes looping ambient.',
  },
  {
    key: 'grand-hall',
    label: 'Grand Hall · 1920s ballroom into art party',
    description: 'Plays under the Grand Hall — period dancing into modern art party.',
    targetPath: '/grand-hall/audio/ballroom.mp3',
    lengthMs: 180000,
    defaultPrompt:
      'French chateau ballroom orchestra — light waltz in early evening, strings and harp. Three minutes in, the room shifts: piano lounge becomes modern minimal jazz, then a soft electronic pulse underneath as a digital auction floor opens. One continuous 3-minute composition, no vocals. Elegant throughout.',
  },
];

export default function MusicAdminPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  async function generate(b: Backdrop, prompt: string) {
    setBusy(b.key); setStatus(null);
    try {
      const r = await fetch('/api/music/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, targetPath: b.targetPath, lengthMs: b.lengthMs }),
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({ detail: 'request failed' }));
        throw new Error(j.detail || 'failed');
      }
      const j = await r.json();
      setStatus(`Saved ${j.url} · ${Math.round(j.bytes / 1024)} kB`);
    } catch (e) {
      setStatus(`Failed: ${e instanceof Error ? e.message : 'unknown'}`);
    } finally {
      setBusy(null);
    }
  }

  async function upload(b: Backdrop, file: File) {
    setBusy(b.key); setStatus(null);
    try {
      const fd = new FormData(); fd.append('file', file);
      const r = await fetch(`/api/music/upload?targetPath=${encodeURIComponent(b.targetPath)}`, { method: 'POST', body: fd });
      if (!r.ok) throw new Error(await r.text());
      const j = await r.json();
      setStatus(`Uploaded ${j.url} · ${Math.round(j.bytes / 1024)} kB`);
    } catch (e) {
      setStatus(`Upload failed: ${e instanceof Error ? e.message : 'unknown'}`);
    } finally {
      setBusy(null);
    }
  }

  return (
    <main className="relative min-h-screen bg-midnight px-8 py-12 film-grain">
      <Link href="/admin" className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 hover:text-gold">
        ← Admin home
      </Link>
      <header className="mx-auto mt-10 max-w-5xl text-center">
        <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">Curator Console</p>
        <h1 className="mt-4 font-didot text-5xl uppercase tracking-[0.12em] text-ivory">Musical Backdrops</h1>
        <div className="mx-auto mt-6 h-px w-24 bg-gold/40" />
        <p className="mt-6 font-body italic text-ivory/70 max-w-2xl mx-auto">
          Generate ambient music via ElevenLabs Music, or upload your own MP3 directly. Each backdrop
          writes to a specific path that the room&rsquo;s <code className="font-mono text-[0.85em]">AudioBed</code> is already listening for.
        </p>
      </header>

      {status && (
        <p className="mt-6 text-center font-mono text-[0.65rem] uppercase tracking-[0.32em] text-gold/80">{status}</p>
      )}

      <section className="mx-auto mt-12 max-w-5xl space-y-6">
        {BACKDROPS.map((b) => (
          <BackdropCard key={b.key} backdrop={b} busy={busy === b.key} onGenerate={generate} onUpload={upload} />
        ))}
      </section>
    </main>
  );
}

function BackdropCard({
  backdrop,
  busy,
  onGenerate,
  onUpload,
}: {
  backdrop: Backdrop;
  busy: boolean;
  onGenerate: (b: Backdrop, prompt: string) => void;
  onUpload: (b: Backdrop, file: File) => void;
}) {
  const [prompt, setPrompt] = useState(backdrop.defaultPrompt);
  return (
    <article className="rounded-lg border border-gold/25 bg-midnight/50 p-6 space-y-4">
      <header>
        <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">{backdrop.targetPath}</p>
        <h2 className="mt-1 font-didot text-2xl uppercase tracking-wider text-ivory">{backdrop.label}</h2>
        <p className="mt-2 font-body italic text-sm text-ivory/65">{backdrop.description}</p>
      </header>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={5}
        className="w-full rounded border border-gold/20 bg-midnight/60 px-3 py-2 font-body text-sm text-ivory/90 focus:border-gold/60 focus:outline-none"
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[0.55rem] uppercase tracking-[0.28em] text-ivory/60">
          Length: {Math.round(backdrop.lengthMs / 1000)}s
        </p>
        <div className="flex items-center gap-3">
          <label className="cursor-pointer rounded border border-ivory/20 px-4 py-2 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-ivory/70 transition-all hover:border-gold hover:text-gold">
            Upload MP3
            <input
              type="file" accept="audio/mp3,audio/mpeg" className="hidden"
              disabled={busy}
              onChange={(e) => { const f = e.target.files?.[0]; if (f) onUpload(backdrop, f); }}
            />
          </label>
          <button
            onClick={() => onGenerate(backdrop, prompt)}
            disabled={busy}
            className="rounded-full border border-gold/50 bg-gold/10 px-6 py-2 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-gold transition-all hover:border-gold hover:bg-gold/20 disabled:opacity-50"
          >
            {busy ? 'Working…' : 'Generate via ElevenLabs'}
          </button>
        </div>
      </div>

      <audio src={backdrop.targetPath} controls className="w-full" />
    </article>
  );
}
