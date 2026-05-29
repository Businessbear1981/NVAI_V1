'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const ARCHIVE_IMAGES = [
  '/kiki/photos/moulin_rouge_night.webp',
  '/kiki/photos/TheExtraordinaryLife&TimesoftheImmortalyetForgottenKIKI,QueenofMontparnasse-anExpose&GraphicNovel-CoverPage.jpg',
  '/kiki/photos/IMG_1253.jpeg',
  '/kiki/photos/IMG_1255.jpeg',
  '/kiki/photos/IMG_1305.jpeg',
  '/kiki/photos/IMG_1333.jpeg',
  '/kiki/photos/c44e6877-a9b7-4932-9401-cb257331ff3d.JPG',
  '/kiki/photos/AE0tW1IsNcBI.webp',
];

const PRESETS = [
  {
    label: 'I · Moulin Rouge entrance',
    targetFilename: 'kiki_moulin_rouge_entrance_higgs.mp4',
    defaultImage: '/kiki/photos/moulin_rouge_night.webp',
    prompt:
      "Cinematic dolly-in toward the red windmill of the Moulin Rouge, 1924, dusk, gas-lit lanterns, period-dress crowd gathering at the entrance, ostrich-feather boas, top hats, the can-can poster on the wall. Style: warm 1970s film stock, slight grain, Brassaï night-photography reference. Aspect 21:9. 12 second loop, no people in focus, soft golden light spilling from the doorway.",
  },
  {
    label: 'II · The atelier portrait',
    targetFilename: 'kiki_modigliani_atelier_higgs.mp4',
    defaultImage: '/kiki/photos/IMG_1253.jpeg',
    prompt:
      "Modigliani's Montparnasse studio, 1916, late afternoon, oblique sun through tall windows. Pencil drawings pinned on the wall, a single brass oil lamp, paint tubes and a glass of absinthe on the side table. An empty velvet chaise longue waiting for the muse. Smoke drifting. No figure. Camera slow dolly-in. Aspect 16:9, 8 second loop, warm Pernod-amber tone, EXIF: Kodak Portra 400 reference.",
  },
  {
    label: 'III · La Rotonde after closing',
    targetFilename: 'kiki_la_rotonde_higgs.mp4',
    defaultImage: '/kiki/photos/IMG_1255.jpeg',
    prompt:
      "La Rotonde café in Montparnasse, 3 a.m., empty marble-topped tables, overturned chairs, a single phonograph playing in the corner. Cigarette smoke still hanging, half-finished Pernod glasses, a discarded ostrich feather on the floor. The bar light low. Camera slow pan across the room. Atmosphere: the morning after a Lost Generation evening. 10 second loop, aspect 21:9, warm desaturated film stock.",
  },
  {
    label: 'IV · The cabaret · the rose · the recognition',
    targetFilename: 'kiki_cabaret_rose_higgs.mp4',
    defaultImage: '/kiki/photos/TheExtraordinaryLife&TimesoftheImmortalyetForgottenKIKI,QueenofMontparnasse-anExpose&GraphicNovel-CoverPage.jpg',
    prompt:
      "60-second cabaret sequence. 1920s Montparnasse intimate cabaret bar — low candlelit ceiling, smoke, small round café tables packed close, a stage of weathered wood barely raised off the floor. Amedeo Modigliani walks in from the back alone — tall, broad shoulders, brown velvet jacket worn at the elbows. He takes a tiny table at the front and orders a Pernod. On stage: Kiki de Montparnasse mid-song — slip dress, dark bob, kohl-lined eyes, scarlet lips, no microphone. Original slow chanson in the Mistinguett/Damia register. Halfway through she steps off the stage and walks slowly through the tables, still singing. She reaches Modigliani's table, brushes the back of her hand along his cheek, and lays a single red rose on the marble in front of him. His eyes well up. He does not move. She holds his gaze one beat — recognition — and walks back to the stage to finish. Style: A Star Is Born intimacy for the feel only; Marlene Dietrich in The Blue Angel for the room. Warm 1970s film stock, candle and gas-sconce light, painterly. Aspect 16:9, tasteful, no explicit content.",
  },
  {
    label: 'V · The painting · tasteful',
    targetFilename: 'kiki_painting_higgs.mp4',
    defaultImage: '/kiki/photos/IMG_1305.jpeg',
    prompt:
      "Modigliani's studio, single candle and gas-sconce light. The painter at his easel mid-stroke — brush poised, eyes locked. Kiki seated on a worn velvet chaise longue in classical pose, draped from the waist in a single length of cream linen so the composition implies a nude without showing nudity. Camera composes around the gesture of his hand and the line of her shoulder, never below. Warm Pernod-amber tone, painterly. 12 second loop, aspect 16:9. Reference: Phantom Thread interior restraint, Rembrandt candlelight. No explicit content.",
  },
];

interface Job {
  id: string;
  label: string;
  prompt: string;
  inputImageUrls: string[];
  targetFilename: string;
  submittedAt: string;
  status: string;
  savedTo?: string;
  raw?: unknown;
}

export default function HiggsfieldPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  async function refresh() {
    const r = await fetch('/api/higgsfield/jobs');
    const data = await r.json();
    setJobs(data.jobs ?? []);
  }
  useEffect(() => { refresh(); }, []);

  async function generate(preset: typeof PRESETS[number], imageUrl: string) {
    setBusy(preset.targetFilename);
    setStatus(null);
    try {
      const r = await fetch('/api/higgsfield/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: preset.prompt,
          inputImageUrls: [new URL(imageUrl, window.location.origin).href],
          targetFilename: preset.targetFilename,
          label: preset.label,
        }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(JSON.stringify(j.detail ?? j).slice(0, 300));
      setStatus(`Job ${j.jobId} submitted · status ${j.status}`);
      await refresh();
    } catch (e) {
      setStatus(`Failed: ${e instanceof Error ? e.message : 'unknown'}`);
    } finally {
      setBusy(null);
    }
  }

  async function refreshOne(id: string) {
    setBusy(id);
    try {
      const r = await fetch(`/api/higgsfield/jobs/${id}/refresh`);
      const j = await r.json();
      setStatus(`${id}: ${j.status}${j.savedTo ? ' · saved ' + j.savedTo : ''}`);
      await refresh();
    } catch (e) {
      setStatus(`Refresh failed: ${e instanceof Error ? e.message : 'unknown'}`);
    } finally {
      setBusy(null);
    }
  }

  return (
    <main className="relative min-h-screen bg-midnight px-8 py-12 film-grain">
      <Link href="/admin" className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 hover:text-gold">
        ← Admin home
      </Link>
      <header className="mx-auto mt-10 max-w-6xl text-center">
        <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">Curator Console</p>
        <h1 className="mt-4 font-didot text-5xl uppercase tracking-[0.12em] text-ivory">Higgsfield Video Studio</h1>
        <div className="mx-auto mt-6 h-px w-24 bg-gold/40" />
        <p className="mt-6 font-body italic text-ivory/75 max-w-2xl mx-auto leading-relaxed">
          The five Kiki cinematic prompts, paired with archival images. Generate via Higgsfield Soul
          (image-to-video). When the job completes, the MP4 is downloaded into
          <code className="font-mono text-[0.85em]"> /public/videos/</code> ready for the curator to swap into a wing.
        </p>
        {status && (
          <p className="mt-6 font-mono text-[0.6rem] uppercase tracking-[0.32em] text-gold/80">{status}</p>
        )}
      </header>

      <section className="mx-auto mt-12 max-w-6xl space-y-6">
        {PRESETS.map((p) => (
          <PresetCard key={p.targetFilename} preset={p} onGenerate={generate} busy={busy === p.targetFilename} />
        ))}
      </section>

      <section className="mx-auto mt-16 max-w-6xl">
        <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70 mb-4">
          Jobs · {jobs.length}
        </p>
        <div className="space-y-3">
          {jobs.length === 0 && (
            <p className="font-body italic text-ivory/55">No jobs submitted yet.</p>
          )}
          {jobs.map((j) => (
            <article key={j.id} className="rounded border border-gold/20 bg-midnight/40 p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.28em] text-gold/70">{j.id}</p>
                <p className="font-display text-base text-ivory">{j.label}</p>
                <p className="font-mono text-[0.55rem] tracking-wider text-ivory/55">status: {j.status} · target: {j.targetFilename}</p>
              </div>
              <div className="flex items-center gap-2">
                {j.savedTo && (
                  <video src={j.savedTo} controls className="h-16 rounded border border-gold/20" />
                )}
                <button
                  onClick={() => refreshOne(j.id)}
                  disabled={busy === j.id}
                  className="rounded border border-gold/40 px-4 py-2 font-mono text-[0.55rem] uppercase tracking-[0.28em] text-gold/80 hover:border-gold hover:text-gold disabled:opacity-50"
                >
                  {busy === j.id ? 'Polling…' : 'Refresh'}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function PresetCard({ preset, onGenerate, busy }: { preset: typeof PRESETS[number]; onGenerate: (p: typeof PRESETS[number], img: string) => void; busy: boolean }) {
  const [image, setImage] = useState(preset.defaultImage);
  return (
    <article className="rounded-lg border border-gold/25 bg-midnight/50 p-6 space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">{preset.targetFilename}</p>
          <h2 className="mt-1 font-didot text-2xl uppercase tracking-wider text-ivory">{preset.label}</h2>
        </div>
        <button
          onClick={() => onGenerate(preset, image)}
          disabled={busy}
          className="rounded-full border border-gold/50 bg-gold/10 px-6 py-2 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-gold transition-all hover:border-gold hover:bg-gold/20 disabled:opacity-50"
        >
          {busy ? 'Submitting…' : 'Generate'}
        </button>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-2">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">Prompt</p>
          <p className="font-body italic text-sm text-ivory/85 leading-relaxed max-h-48 overflow-y-auto">{preset.prompt}</p>
        </div>
        <div className="space-y-2">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">Input image</p>
          <select
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full rounded border border-gold/20 bg-midnight/60 px-3 py-2 font-mono text-[0.65rem] text-ivory focus:border-gold/60 focus:outline-none"
          >
            {ARCHIVE_IMAGES.map((img) => (
              <option key={img} value={img}>{img.split('/').pop()}</option>
            ))}
          </select>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="" className="aspect-square w-full rounded border border-ivory/15 object-cover" />
        </div>
      </div>
    </article>
  );
}
