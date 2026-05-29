'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Event {
  id: string;
  title: string;
  format: string;
  scheduledFor: string;
  lots: { id: string; title: string; reserve?: number }[];
  zoomMeetingId: string | null;
  zoomJoinUrl: string | null;
  zoomPasscode?: string;
  status: string;
}

interface Bid { id: string; amount: number; bidderName: string; paddle: string; at: string }

function fmt(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

export default function AuctionLivePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [currentHigh, setCurrentHigh] = useState<Bid | null>(null);
  const [bidAmount, setBidAmount] = useState('');
  const [paddle, setPaddle] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  async function loadEvents() {
    const r = await fetch('/api/auction/events');
    const j = await r.json();
    setEvents(j.events ?? []);
    if (!activeId && j.events?.length) setActiveId(j.events[0].id);
  }

  async function loadBids(id: string) {
    const r = await fetch(`/api/auction/events/${id}/bids`);
    const j = await r.json();
    setBids(j.bids ?? []);
    setCurrentHigh(j.currentHigh ?? null);
  }

  useEffect(() => { loadEvents(); }, []);

  useEffect(() => {
    if (!activeId) return;
    loadBids(activeId);
    const t = setInterval(() => loadBids(activeId), 3000); // live poll
    return () => clearInterval(t);
  }, [activeId]);

  const active = events.find((e) => e.id === activeId);

  async function placeBid() {
    if (!active) return;
    if (!name || !email || !bidAmount) { setStatus('Name, email, and bid amount required.'); return; }
    setStatus(null);
    try {
      const r = await fetch('/api/auction/bid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: active.id,
          lotId: active.lots[0]?.id ?? '',
          amount: parseFloat(bidAmount),
          bidderName: name,
          bidderEmail: email,
          paddle,
        }),
      });
      if (!r.ok) throw new Error(await r.text());
      const j = await r.json();
      setStatus(`Bid placed · current high ${fmt(j.currentHigh)}`);
      setBidAmount('');
      await loadBids(active.id);
    } catch (e) {
      setStatus(`Bid failed: ${e instanceof Error ? e.message : 'unknown'}`);
    }
  }

  return (
    <main className="relative min-h-screen bg-midnight px-8 py-10 film-grain">
      <Link href="/grand-hall/auction" className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ivory/60 hover:text-gold">
        ← Back to the Auction House
      </Link>

      <header className="mx-auto mt-10 max-w-6xl text-center">
        <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">Live</p>
        <h1 className="mt-4 font-didot text-5xl uppercase tracking-[0.12em] text-ivory">The Auction Floor</h1>
        <div className="mx-auto mt-6 h-px w-24 bg-gold/40" />
        <p className="mt-6 font-body italic text-ivory/70 max-w-2xl mx-auto">
          Live broadcast via Zoom · paddle bidding · concierge food delivery for VIP bidders ·
          end-to-end recorded under DDNDA.
        </p>
      </header>

      {/* Event picker */}
      {events.length > 0 ? (
        <nav className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2">
          {events.map((e) => (
            <button
              key={e.id}
              onClick={() => setActiveId(e.id)}
              className={`rounded border px-4 py-2 font-mono text-[0.6rem] uppercase tracking-[0.28em] transition-all ${
                activeId === e.id ? 'border-gold text-gold' : 'border-ivory/15 text-ivory/65 hover:border-gold/40 hover:text-gold'
              }`}
            >
              {e.title} · {e.format}
            </button>
          ))}
        </nav>
      ) : (
        <p className="mx-auto mt-10 max-w-2xl text-center font-body italic text-ivory/55">
          No auction events scheduled yet. Create one at <Link className="text-gold hover:underline" href="/admin/auction">/admin/auction</Link>.
        </p>
      )}

      {active && (
        <section className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Zoom live broadcast */}
          <div className="lg:col-span-2 space-y-3">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">The broadcast</p>
            <div className="aspect-video w-full overflow-hidden rounded-lg border border-gold/30 bg-midnight">
              {active.zoomJoinUrl ? (
                <iframe
                  src={active.zoomJoinUrl.replace('zoom.us/j/', 'zoom.us/wc/join/') + '?fromPWA=1'}
                  allow="camera; microphone; fullscreen; speaker; display-capture; autoplay"
                  className="h-full w-full"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">Zoom not yet provisioned</p>
                  <p className="font-body italic text-sm text-ivory/65 max-w-md">
                    From the admin console, click <em>Create Zoom meeting</em> on this event.
                    The live broadcast embeds here automatically. Zoom Server-to-Server OAuth
                    credentials must be set in <code className="font-mono text-[0.85em]">backend/.env</code>.
                  </p>
                </div>
              )}
            </div>
            {active.zoomJoinUrl && (
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.28em] text-ivory/55 text-center">
                Meeting {active.zoomMeetingId}{active.zoomPasscode ? ` · passcode ${active.zoomPasscode}` : ''} ·
                <a href={active.zoomJoinUrl} target="_blank" rel="noopener noreferrer" className="ml-2 text-gold hover:text-gold-warm">Open in Zoom app →</a>
              </p>
            )}
          </div>

          {/* Bid panel */}
          <aside className="space-y-6">
            <div className="rounded-lg border border-gold/30 bg-midnight/60 p-6 space-y-3">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">Current high</p>
              <p className="font-didot text-4xl tracking-wider text-ivory">
                {currentHigh ? fmt(currentHigh.amount) : '—'}
              </p>
              {currentHigh && (
                <p className="font-mono text-[0.6rem] tracking-wider text-gold/80">
                  Paddle {currentHigh.paddle || '—'} · {new Date(currentHigh.at).toLocaleTimeString()}
                </p>
              )}
            </div>

            <div className="rounded-lg border border-gold/20 bg-midnight/50 p-6 space-y-3">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">Place a bid</p>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name"
                className="w-full rounded border border-gold/15 bg-midnight/60 px-3 py-2 font-body text-sm text-ivory" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email"
                className="w-full rounded border border-gold/15 bg-midnight/60 px-3 py-2 font-body text-sm text-ivory" />
              <input value={paddle} onChange={(e) => setPaddle(e.target.value)} placeholder="Paddle (optional)"
                className="w-full rounded border border-gold/15 bg-midnight/60 px-3 py-2 font-body text-sm text-ivory" />
              <input value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} type="number" inputMode="decimal" placeholder="Bid amount (USD)"
                className="w-full rounded border border-gold/15 bg-midnight/60 px-3 py-2 font-body text-sm text-ivory" />
              <button onClick={placeBid}
                className="w-full rounded-full border border-gold/50 bg-gold/15 px-4 py-3 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-gold transition-all hover:border-gold hover:bg-gold/30">
                Bid
              </button>
              {status && <p className="text-center font-mono text-[0.55rem] uppercase tracking-[0.28em] text-gold/80">{status}</p>}
            </div>

            <div className="rounded-lg border border-gold/15 bg-midnight/40 p-4 space-y-2">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">Recent bids</p>
              <ul className="space-y-1 max-h-72 overflow-y-auto">
                {bids.length === 0 && <li className="font-body italic text-xs text-ivory/55">No bids yet.</li>}
                {bids.map((b) => (
                  <li key={b.id} className="flex justify-between font-mono text-[0.6rem] tracking-wider text-ivory/80">
                    <span>{fmt(b.amount)}</span>
                    <span className="text-ivory/55">P{b.paddle || '—'} · {new Date(b.at).toLocaleTimeString()}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>
      )}
    </main>
  );
}
