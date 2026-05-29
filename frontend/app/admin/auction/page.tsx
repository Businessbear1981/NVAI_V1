'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Event {
  id: string;
  title: string;
  format: string;
  scheduledFor: string;
  zoomMeetingId: string | null;
  zoomJoinUrl: string | null;
  status: string;
  lots: { id: string; title: string; reserve?: number }[];
}

export default function AuctionAdminPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [title, setTitle] = useState('');
  const [format, setFormat] = useState('private');
  const [scheduledFor, setScheduledFor] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  async function refresh() {
    const r = await fetch('/api/auction/events');
    const j = await r.json();
    setEvents(j.events ?? []);
  }
  useEffect(() => { refresh(); }, []);

  async function create() {
    if (!title) return;
    setBusy('create'); setStatus(null);
    try {
      const r = await fetch('/api/auction/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, format, scheduledFor, lots: [] }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(JSON.stringify(j.detail ?? j));
      setStatus(`Event ${j.event.id} created.`);
      setTitle(''); setScheduledFor('');
      await refresh();
    } catch (e) {
      setStatus(`Create failed: ${e instanceof Error ? e.message : 'unknown'}`);
    } finally {
      setBusy(null);
    }
  }

  async function provisionZoom(id: string) {
    setBusy(id); setStatus(null);
    try {
      const r = await fetch(`/api/auction/events/${id}/zoom`, { method: 'POST' });
      const j = await r.json();
      if (!r.ok) throw new Error(JSON.stringify(j.detail ?? j).slice(0, 300));
      setStatus(`Zoom meeting created for ${j.event.title}.`);
      await refresh();
    } catch (e) {
      setStatus(`Zoom failed: ${e instanceof Error ? e.message : 'unknown'}`);
    } finally {
      setBusy(null);
    }
  }

  return (
    <main className="relative min-h-screen bg-midnight px-8 py-12 film-grain">
      <Link href="/admin" className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 hover:text-gold">← Admin home</Link>
      <header className="mx-auto mt-10 max-w-5xl text-center">
        <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">Curator Console</p>
        <h1 className="mt-4 font-didot text-5xl uppercase tracking-[0.12em] text-ivory">Auction Events</h1>
        <div className="mx-auto mt-6 h-px w-24 bg-gold/40" />
        <p className="mt-6 font-body italic text-ivory/70 max-w-2xl mx-auto">
          Schedule auction events, provision Zoom broadcasts, monitor bids.
          The live experience runs at <Link className="text-gold hover:underline" href="/grand-hall/auction/live">/grand-hall/auction/live</Link>.
        </p>
      </header>

      {status && <p className="mt-6 text-center font-mono text-[0.6rem] uppercase tracking-[0.32em] text-gold/80">{status}</p>}

      {/* New event */}
      <section className="mx-auto mt-10 max-w-3xl rounded-lg border border-gold/25 bg-midnight/50 p-6 space-y-4">
        <h2 className="font-display text-2xl tracking-wider text-gold">Schedule a new event</h2>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Picasso Bateau-Lavoir 1901 · invite-only"
          className="w-full rounded border border-gold/15 bg-midnight/60 px-3 py-2 font-body text-sm text-ivory" />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <select value={format} onChange={(e) => setFormat(e.target.value)}
            className="rounded border border-gold/15 bg-midnight/60 px-3 py-2 font-mono text-[0.7rem] text-ivory">
            <option value="private">Private · invite-only</option>
            <option value="public">Public · Christie&apos;s-scale</option>
          </select>
          <input type="datetime-local" value={scheduledFor} onChange={(e) => setScheduledFor(e.target.value)}
            className="rounded border border-gold/15 bg-midnight/60 px-3 py-2 font-mono text-[0.7rem] text-ivory" />
        </div>
        <button onClick={create} disabled={busy === 'create' || !title}
          className="rounded-full border border-gold/50 bg-gold/10 px-6 py-2 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-gold hover:border-gold hover:bg-gold/20 disabled:opacity-50">
          {busy === 'create' ? 'Saving…' : 'Schedule event'}
        </button>
      </section>

      {/* Existing events */}
      <section className="mx-auto mt-12 max-w-5xl space-y-4">
        <h2 className="font-display text-2xl text-center tracking-wider text-gold">All events</h2>
        {events.length === 0 && <p className="text-center font-body italic text-ivory/55">No events yet.</p>}
        {events.map((e) => (
          <article key={e.id} className="rounded-lg border border-gold/20 bg-midnight/40 p-5 flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.28em] text-gold/70">{e.format} · {e.status}{e.scheduledFor && ` · ${new Date(e.scheduledFor).toLocaleString()}`}</p>
              <p className="font-display text-lg text-ivory">{e.title}</p>
              <p className="font-mono text-[0.55rem] tracking-wider text-ivory/55">
                {e.zoomMeetingId ? `Zoom ${e.zoomMeetingId}` : 'No Zoom yet'} · {e.lots.length} lots
              </p>
            </div>
            <div className="flex items-center gap-2">
              {!e.zoomMeetingId && (
                <button onClick={() => provisionZoom(e.id)} disabled={busy === e.id}
                  className="rounded border border-gold/40 px-4 py-2 font-mono text-[0.55rem] uppercase tracking-[0.28em] text-gold/80 hover:border-gold hover:text-gold disabled:opacity-50">
                  {busy === e.id ? 'Calling Zoom…' : 'Create Zoom meeting'}
                </button>
              )}
              <Link href={`/grand-hall/auction/live`} className="rounded-full border border-gold/40 px-4 py-2 font-mono text-[0.55rem] uppercase tracking-[0.28em] text-gold/80 hover:border-gold hover:text-gold">
                Open live floor →
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
