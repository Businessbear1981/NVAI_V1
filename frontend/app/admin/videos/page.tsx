'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';

interface WingVideos {
  leadIn: string;
  rotation: string[];
}

type Config = Record<string, WingVideos>;

export default function VideoCuratorPage() {
  const [config, setConfig] = useState<Config>({});
  const [files, setFiles] = useState<string[]>([]);
  const [selectedWing, setSelectedWing] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [savingWing, setSavingWing] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const [cfgRes, filesRes] = await Promise.all([
      fetch('/api/videos').then((r) => r.json()),
      fetch('/api/videos/files').then((r) => r.json()),
    ]);
    setConfig(cfgRes as Config);
    setFiles((filesRes as { files: string[] }).files);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  async function handleUpload(file: File) {
    setUploading(true);
    setStatus(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/videos/upload', { method: 'POST', body: formData });
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      setStatus(`Uploaded ${json.url} (${Math.round(json.bytes / 1024 / 1024)} MB).`);
      await refresh();
    } catch (err) {
      setStatus(`Upload failed: ${err instanceof Error ? err.message : 'unknown'}`);
    } finally {
      setUploading(false);
    }
  }

  async function saveWing(wing: string, leadIn: string, rotation: string[]) {
    setSavingWing(wing);
    setStatus(null);
    try {
      const res = await fetch(`/api/videos/wing/${wing}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadIn, rotation }),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus(`Saved ${wing}.`);
      await refresh();
    } catch (err) {
      setStatus(`Save failed: ${err instanceof Error ? err.message : 'unknown'}`);
    } finally {
      setSavingWing(null);
    }
  }

  const wings = Object.keys(config).sort();

  return (
    <main className="relative min-h-screen bg-midnight px-8 py-12 film-grain">
      <Link href="/admin" className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 hover:text-gold">
        ← Admin home
      </Link>

      <header className="mx-auto mt-10 max-w-6xl text-center">
        <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">Curator Console</p>
        <h1 className="mt-4 font-didot text-5xl uppercase tracking-[0.12em] text-ivory">Video Curator</h1>
        <div className="mx-auto mt-6 h-px w-24 bg-gold/40" />
        <p className="mt-6 font-body italic text-ivory/70 max-w-2xl mx-auto">
          Upload new lead-in or rotation videos. Reassign which clip plays in which wing. Persists to
          backend config — frontend pages can read these via <code className="font-mono text-[0.85em]">/api/videos</code>.
        </p>
      </header>

      {/* Drag-drop upload */}
      <section className="mx-auto mt-12 max-w-3xl">
        <UploadDropzone onUpload={handleUpload} uploading={uploading} />
        {status && (
          <p className="mt-4 text-center font-mono text-[0.65rem] uppercase tracking-[0.32em] text-gold/80">
            {status}
          </p>
        )}
      </section>

      {/* Wing list + editor */}
      <section className="mx-auto mt-16 max-w-7xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <aside className="space-y-2">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70 mb-2">Wings</p>
            {wings.map((wing) => (
              <button
                key={wing}
                onClick={() => setSelectedWing(wing)}
                className={`block w-full rounded border px-4 py-3 text-left font-mono text-[0.7rem] uppercase tracking-[0.18em] transition-all ${
                  selectedWing === wing
                    ? 'border-gold/60 bg-gold/10 text-gold'
                    : 'border-ivory/20 text-ivory/70 hover:border-gold/40 hover:text-gold'
                }`}
              >
                {wing}
              </button>
            ))}
          </aside>

          <div className="md:col-span-2">
            {selectedWing ? (
              <WingEditor
                key={selectedWing}
                wing={selectedWing}
                initial={config[selectedWing]}
                files={files}
                onSave={saveWing}
                saving={savingWing === selectedWing}
              />
            ) : (
              <p className="font-body italic text-ivory/50 text-center pt-16">
                Pick a wing on the left to edit its lead-in and rotation.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Available files */}
      <section className="mx-auto mt-16 max-w-7xl">
        <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70 mb-4">
          {files.length} videos available in /public/videos
        </p>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
          {files.map((f) => (
            <div key={f} className="rounded border border-ivory/10 bg-midnight/40 px-2 py-1.5 font-mono text-[0.55rem] text-ivory/60 truncate">
              {f.replace('/videos/', '')}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function UploadDropzone({ onUpload, uploading }: { onUpload: (f: File) => void; uploading: boolean }) {
  const [over, setOver] = useState(false);
  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        const file = e.dataTransfer.files[0];
        if (file) onUpload(file);
      }}
      className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-12 text-center transition-colors ${
        over ? 'border-gold bg-gold/10' : 'border-gold/30 bg-midnight/40'
      }`}
    >
      <p className="font-display text-xl text-ivory">Drag an MP4 here</p>
      <p className="mt-2 font-body italic text-sm text-ivory/60">Or pick a file</p>
      <label className="mt-4 cursor-pointer rounded-full border border-gold/50 bg-gold/10 px-6 py-2 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-gold transition-all hover:border-gold hover:bg-gold/20">
        Choose file
        <input
          type="file"
          accept="video/mp4"
          className="hidden"
          disabled={uploading}
          onChange={(e) => { const f = e.target.files?.[0]; if (f) onUpload(f); }}
        />
      </label>
      {uploading && (
        <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-gold/70">
          Uploading…
        </p>
      )}
    </div>
  );
}

function WingEditor({
  wing,
  initial,
  files,
  onSave,
  saving,
}: {
  wing: string;
  initial: WingVideos;
  files: string[];
  onSave: (wing: string, leadIn: string, rotation: string[]) => void;
  saving: boolean;
}) {
  const [leadIn, setLeadIn] = useState(initial.leadIn);
  const [rotation, setRotation] = useState<string[]>(initial.rotation);

  return (
    <div className="rounded-lg border border-gold/25 bg-midnight/50 p-6 space-y-6">
      <header>
        <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">Editing</p>
        <h2 className="mt-1 font-didot text-3xl uppercase tracking-wider text-ivory">{wing}</h2>
      </header>

      <div>
        <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70 mb-2">Lead-in</p>
        <select
          value={leadIn}
          onChange={(e) => setLeadIn(e.target.value)}
          className="w-full rounded border border-gold/20 bg-midnight/60 px-3 py-2 font-mono text-[0.75rem] text-ivory focus:border-gold/60 focus:outline-none"
        >
          {files.map((f) => (
            <option key={f} value={f}>{f.replace('/videos/', '')}</option>
          ))}
        </select>
        <video src={leadIn} muted controls className="mt-3 aspect-video w-full rounded border border-ivory/10" />
      </div>

      <div>
        <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70 mb-2">
          Rotation · {rotation.length} clip{rotation.length === 1 ? '' : 's'}
        </p>
        <ul className="space-y-2">
          {rotation.map((src, i) => (
            <li key={`${src}-${i}`} className="flex items-center gap-2">
              <select
                value={src}
                onChange={(e) => {
                  const copy = [...rotation]; copy[i] = e.target.value; setRotation(copy);
                }}
                className="flex-1 rounded border border-ivory/15 bg-midnight/60 px-3 py-1.5 font-mono text-[0.7rem] text-ivory/85 focus:border-gold/60 focus:outline-none"
              >
                {files.map((f) => (
                  <option key={f} value={f}>{f.replace('/videos/', '')}</option>
                ))}
              </select>
              <button
                onClick={() => setRotation(rotation.filter((_, j) => j !== i))}
                className="font-mono text-[0.6rem] uppercase tracking-wider text-ivory/50 hover:text-oxblood"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setRotation([...rotation, files[0] ?? ''])}
          className="mt-3 rounded border border-gold/30 px-4 py-2 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-gold/80 hover:border-gold hover:text-gold"
        >
          + Add clip
        </button>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          onClick={() => { setLeadIn(initial.leadIn); setRotation(initial.rotation); }}
          className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-ivory/60 hover:text-gold"
        >
          Revert
        </button>
        <button
          onClick={() => onSave(wing, leadIn, rotation)}
          disabled={saving}
          className="rounded-full border border-gold/50 bg-gold/10 px-6 py-2 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-gold transition-all hover:border-gold hover:bg-gold/20 disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save wing'}
        </button>
      </div>
    </div>
  );
}
