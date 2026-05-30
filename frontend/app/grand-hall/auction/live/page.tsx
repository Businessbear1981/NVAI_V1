'use client';

import { useEffect, useRef, useState } from 'react';
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

interface FloorState {
  count: number;
  currentHigh: Bid | null;
  bids: Bid[];
  currentAsk: number | null;
  askedAt: string | null;
  reserve: number | null;
  reserveMet: boolean;
}

interface MenuItem {
  category: string;
  name: string;
  detail?: string;
  note?: string;
}
interface Menu {
  id: string;
  name: string;
  price: number;
  currency?: string;
  summary: string;
  courseType?: string;
  deliveryWindow?: string;
  items: MenuItem[];
}

function fmt(n?: number | null) {
  if (n == null) return '—';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

export default function AuctionLivePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [floor, setFloor] = useState<FloorState | null>(null);

  // Bid form
  const [bidAmount, setBidAmount] = useState('');
  const [paddle, setPaddle] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Acknowledge toast
  const [ack, setAck] = useState<string | null>(null);
  const ackTimer = useRef<number | null>(null);

  // Auctioneer (admin) — set the next ask
  const [auctioneerAsk, setAuctioneerAsk] = useState('');
  const [auctioneerMode, setAuctioneerMode] = useState(false);

  // Curated meal service — bidder reserves a pre-curated meal placed 7 days ahead via concierge
  const [menus, setMenus] = useState<Menu[]>([]);
  const [mealOpen, setMealOpen] = useState(false);
  const [mealMenuId, setMealMenuId] = useState('');
  const [mealParty, setMealParty] = useState(1);
  const [mealFullName, setMealFullName] = useState('');
  const [mealEmail, setMealEmail] = useState('');
  const [mealAddress, setMealAddress] = useState('');
  const [mealMainChoice, setMealMainChoice] = useState('');
  const [mealNotes, setMealNotes] = useState('');
  const [mealSubmitting, setMealSubmitting] = useState(false);

  async function loadMenus() {
    try {
      const r = await fetch('/api/auction/meals');
      const j = await r.json();
      setMenus(j.menus ?? []);
    } catch { /* silent — menus optional */ }
  }

  async function submitMealOrder() {
    if (!active) { showAck('Select an active event first.'); return; }
    if (!mealMenuId || !mealFullName || !mealEmail || !mealAddress) {
      showAck('Menu, name, email, and address are required.');
      return;
    }
    const menu = menus.find((m) => m.id === mealMenuId);
    const mainOpts = menu ? menu.items.filter((i) => i.category.toLowerCase().startsWith('main')) : [];
    if (mainOpts.length > 1 && !mealMainChoice) {
      showAck('Please choose a main course.');
      return;
    }
    setMealSubmitting(true);
    try {
      const r = await fetch('/api/auction/meal-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: active.id,
          menuId: mealMenuId,
          fullName: mealFullName,
          email: mealEmail,
          address: mealAddress,
          party: mealParty,
          mainChoice: mealMainChoice,
          notes: mealNotes,
        }),
      });
      if (!r.ok) throw new Error(await r.text());
      const j = await r.json();
      showAck(`✓ Meal reserved · ${fmt(j.order?.subtotal)} · concierge confirms within 24h.`);
      setMealMenuId('');
      setMealFullName('');
      setMealEmail('');
      setMealAddress('');
      setMealMainChoice('');
      setMealNotes('');
      setMealParty(1);
      setMealOpen(false);
    } catch (e) {
      showAck(`Meal reservation failed: ${e instanceof Error ? e.message : 'unknown'}`);
    } finally {
      setMealSubmitting(false);
    }
  }

  async function loadEvents() {
    const r = await fetch('/api/auction/events');
    const j = await r.json();
    setEvents(j.events ?? []);
    if (!activeId && j.events?.length) setActiveId(j.events[0].id);
  }

  async function loadFloor(id: string) {
    const r = await fetch(`/api/auction/events/${id}/bids`);
    const j = await r.json();
    setFloor(j);
  }

  useEffect(() => { loadEvents(); loadMenus(); }, []);

  useEffect(() => {
    if (!activeId) return;
    loadFloor(activeId);
    const t = setInterval(() => loadFloor(activeId), 2000); // live poll every 2s
    return () => clearInterval(t);
  }, [activeId]);

  const active = events.find((e) => e.id === activeId);

  function showAck(msg: string) {
    setAck(msg);
    if (ackTimer.current) window.clearTimeout(ackTimer.current);
    ackTimer.current = window.setTimeout(() => setAck(null), 3500);
  }

  async function placeBid(amountOverride?: number) {
    if (!active) return;
    const amt = amountOverride ?? parseFloat(bidAmount);
    if (!amt || !name || !email) {
      showAck('Name, email, and a bid amount required.');
      return;
    }
    if (floor?.currentHigh && amt <= floor.currentHigh.amount) {
      showAck(`Bid must exceed current high of ${fmt(floor.currentHigh.amount)}.`);
      return;
    }
    try {
      const r = await fetch('/api/auction/bid', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: active.id,
          lotId: active.lots[0]?.id ?? '',
          amount: amt,
          bidderName: name,
          bidderEmail: email,
          paddle,
        }),
      });
      if (!r.ok) throw new Error(await r.text());
      const j = await r.json();
      showAck(`✓ Bid acknowledged at ${fmt(j.currentHigh)}.`);
      setBidAmount('');
      await loadFloor(active.id);
    } catch (e) {
      showAck(`Bid failed: ${e instanceof Error ? e.message : 'unknown'}`);
    }
  }

  async function setAuctioneerCall() {
    if (!active) return;
    const amt = parseFloat(auctioneerAsk);
    if (!amt) { showAck('Set an ask amount.'); return; }
    try {
      const r = await fetch('/api/auction/ask', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId: active.id, lotId: active.lots[0]?.id ?? '', amount: amt }),
      });
      if (!r.ok) throw new Error(await r.text());
      showAck(`Auctioneer ask set at ${fmt(amt)}.`);
      setAuctioneerAsk('');
      await loadFloor(active.id);
    } catch (e) {
      showAck(`Ask update failed: ${e instanceof Error ? e.message : 'unknown'}`);
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
        <p className="mt-4 font-body italic text-ivory/70 max-w-2xl mx-auto">
          Live Zoom broadcast · paddle bidding · the floor tracker shows when reserve is met.
        </p>
      </header>

      {events.length === 0 ? (
        <p className="mx-auto mt-10 max-w-2xl text-center font-body italic text-ivory/55">
          No auction events scheduled yet. Create one at <Link className="text-gold hover:underline" href="/admin/auction">/admin/auction</Link>.
        </p>
      ) : (
        <nav className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2">
          {events.map((e) => (
            <button key={e.id} onClick={() => setActiveId(e.id)}
              className={`rounded border px-4 py-2 font-mono text-[0.6rem] uppercase tracking-[0.28em] transition-all ${
                activeId === e.id ? 'border-gold text-gold' : 'border-ivory/15 text-ivory/65 hover:border-gold/40 hover:text-gold'
              }`}>
              {e.title} · {e.format}
            </button>
          ))}
        </nav>
      )}

      {active && (
        <section className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Zoom video */}
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
                  </p>
                </div>
              )}
            </div>

            {/* Reserve tracker */}
            <div className={`rounded-lg border p-4 ${floor?.reserveMet ? 'border-emerald-400/60 bg-emerald-500/10' : 'border-gold/20 bg-midnight/40'}`}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">Floor / reserve</p>
                  <p className="mt-1 font-display text-lg text-ivory">
                    {floor?.reserveMet
                      ? '✓ Reserve met — the piece will sell to the highest bidder.'
                      : floor?.reserve
                        ? `${fmt(floor.currentHigh?.amount)} of ${fmt(floor.reserve)} reserve`
                        : 'Reserve not yet set'}
                  </p>
                </div>
                {floor?.reserve && (
                  <div className="hidden md:block w-48 h-2 overflow-hidden rounded-full bg-midnight/60">
                    <div
                      className={`h-full ${floor?.reserveMet ? 'bg-emerald-400' : 'bg-gradient-to-r from-gold-dim to-gold'}`}
                      style={{ width: `${Math.min(100, Math.round(((floor.currentHigh?.amount ?? 0) / floor.reserve) * 100))}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bid panel */}
          <aside className="space-y-4">
            {/* Auctioneer's current ask — the most prominent */}
            <div className="rounded-lg border border-gold/50 bg-gold/10 p-6 space-y-2 text-center">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/80">The auctioneer is asking</p>
              <p className="font-didot text-5xl tracking-wider text-gold">{fmt(floor?.currentAsk)}</p>
              {floor?.askedAt && (
                <p className="font-mono text-[0.55rem] tracking-wider text-gold/60">
                  called {new Date(floor.askedAt).toLocaleTimeString()}
                </p>
              )}
              <button
                onClick={() => floor?.currentAsk && placeBid(floor.currentAsk)}
                disabled={!floor?.currentAsk}
                className="mt-3 w-full rounded-full border-2 border-gold bg-gold/25 px-4 py-3 font-mono text-[0.7rem] uppercase tracking-[0.32em] text-gold transition-all hover:bg-gold/40 disabled:opacity-40"
              >
                Bid at the ask
              </button>
            </div>

            {/* Current high */}
            <div className="rounded-lg border border-gold/25 bg-midnight/60 p-5 space-y-2 text-center">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">Current high bid</p>
              <p className="font-didot text-3xl tracking-wider text-ivory">{fmt(floor?.currentHigh?.amount)}</p>
              {floor?.currentHigh && (
                <p className="font-mono text-[0.6rem] tracking-wider text-gold/80">
                  Paddle {floor.currentHigh.paddle || '—'} · {new Date(floor.currentHigh.at).toLocaleTimeString()}
                </p>
              )}
            </div>

            {/* Custom bid */}
            <div className="rounded-lg border border-gold/20 bg-midnight/50 p-5 space-y-3">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">Or place your own bid</p>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name"
                className="w-full rounded border border-gold/15 bg-midnight/60 px-3 py-2 font-body text-sm text-ivory" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email"
                className="w-full rounded border border-gold/15 bg-midnight/60 px-3 py-2 font-body text-sm text-ivory" />
              <input value={paddle} onChange={(e) => setPaddle(e.target.value)} placeholder="Paddle (optional)"
                className="w-full rounded border border-gold/15 bg-midnight/60 px-3 py-2 font-body text-sm text-ivory" />
              <input value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} type="number" inputMode="decimal" placeholder="Bid amount (USD)"
                className="w-full rounded border border-gold/15 bg-midnight/60 px-3 py-2 font-body text-sm text-ivory" />
              <button onClick={() => placeBid()}
                className="w-full rounded-full border border-gold/50 bg-gold/15 px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-gold transition-all hover:border-gold hover:bg-gold/30">
                Bid
              </button>
            </div>

            {/* Recent bids */}
            <div className="rounded-lg border border-gold/15 bg-midnight/40 p-4 space-y-2">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">Recent bids</p>
              <ul className="space-y-1 max-h-60 overflow-y-auto">
                {(!floor?.bids || floor.bids.length === 0) && <li className="font-body italic text-xs text-ivory/55">No bids yet.</li>}
                {floor?.bids.map((b) => (
                  <li key={b.id} className="flex justify-between font-mono text-[0.6rem] tracking-wider text-ivory/80">
                    <span>{fmt(b.amount)}</span>
                    <span className="text-ivory/55">P{b.paddle || '—'} · {new Date(b.at).toLocaleTimeString()}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Auctioneer mode toggle — visible only when needed */}
            <button onClick={() => setAuctioneerMode((v) => !v)}
              className="w-full text-center font-mono text-[0.55rem] uppercase tracking-[0.28em] text-ivory/40 hover:text-gold">
              {auctioneerMode ? 'Hide auctioneer controls' : 'Auctioneer controls'}
            </button>
            {auctioneerMode && (
              <div className="rounded-lg border border-oxblood/50 bg-oxblood/10 p-4 space-y-2">
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-oxblood">Set the next ask</p>
                <input value={auctioneerAsk} onChange={(e) => setAuctioneerAsk(e.target.value)} type="number" inputMode="decimal" placeholder="Ask amount"
                  className="w-full rounded border border-gold/15 bg-midnight/60 px-3 py-2 font-body text-sm text-ivory" />
                <button onClick={setAuctioneerCall}
                  className="w-full rounded border border-gold/40 bg-gold/15 px-3 py-2 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-gold hover:bg-gold/30">
                  Call this ask
                </button>
              </div>
            )}
          </aside>
        </section>
      )}

      {/* Curated meal service — pre-event reservation */}
      {active && menus.length > 0 && (
        <section className="mx-auto mt-12 max-w-5xl">
          <div className="rounded-lg border border-gold/25 bg-midnight/40 p-6 backdrop-blur">
            <button
              onClick={() => setMealOpen((v) => !v)}
              className="flex w-full items-center justify-between text-left"
            >
              <div>
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
                  The Curated Meal Service
                </p>
                <h3 className="mt-1 font-didot text-2xl tracking-wider text-ivory">
                  Reserve your table — placed seven days ahead by NVAI concierge
                </h3>
                <p className="mt-2 font-body italic text-sm text-ivory/70">
                  Two pre-curated French menus. Wines, cheeses, accompaniments. Delivered to your seat on auction night.
                </p>
              </div>
              <span className="ml-4 font-mono text-[0.6rem] uppercase tracking-[0.32em] text-gold">
                {mealOpen ? 'Close' : 'View menus'}
              </span>
            </button>

            {mealOpen && (
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {menus.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setMealMenuId(m.id);
                        setMealMainChoice('');
                      }}
                      className={`text-left rounded-lg border p-5 transition-all ${
                        mealMenuId === m.id
                          ? 'border-gold bg-gold/10'
                          : 'border-ivory/15 bg-midnight/50 hover:border-gold/40'
                      }`}
                    >
                      <div className="flex items-baseline justify-between">
                        <h4 className="font-didot text-xl tracking-wider text-ivory">{m.name}</h4>
                        <p className="font-mono text-sm text-gold">{fmt(m.price)}</p>
                      </div>
                      <p className="mt-2 font-body text-xs italic text-ivory/70 leading-relaxed">
                        {m.summary}
                      </p>
                      {m.deliveryWindow && (
                        <p className="mt-2 font-mono text-[0.5rem] uppercase tracking-[0.28em] text-gold/55">
                          {m.deliveryWindow}
                        </p>
                      )}
                      {m.items?.length > 0 && (
                        <ul className="mt-3 space-y-1 font-body text-xs text-ivory/80">
                          {m.items.map((it, i) => (
                            <li key={i} className="flex gap-2">
                              <span className="text-gold/60 font-mono text-[0.5rem] tracking-wider uppercase mt-0.5 shrink-0">
                                {it.category}
                              </span>
                              <span>
                                <strong className="text-ivory/95">{it.name}</strong>
                                {it.detail && <span className="text-ivory/65"> · {it.detail}</span>}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </button>
                  ))}
                </div>

                {mealMenuId && (
                  <div className="rounded-lg border border-gold/20 bg-midnight/50 p-5 space-y-3">
                    {(() => {
                      const menu = menus.find((m) => m.id === mealMenuId);
                      const mainOpts = menu
                        ? menu.items.filter((it) => it.category.toLowerCase().startsWith('main'))
                        : [];
                      return mainOpts.length > 1 ? (
                        <div className="space-y-2">
                          <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-gold/70">
                            Choose your main
                          </p>
                          <div className="space-y-2">
                            {mainOpts.map((opt) => (
                              <label key={opt.name} className="flex items-start gap-3 cursor-pointer">
                                <input
                                  type="radio"
                                  name="mainChoice"
                                  value={opt.name}
                                  checked={mealMainChoice === opt.name}
                                  onChange={() => setMealMainChoice(opt.name)}
                                  className="mt-1"
                                />
                                <span className="font-body text-sm text-ivory/90">
                                  <strong className="text-ivory">{opt.name}</strong>
                                  {opt.detail && (
                                    <span className="block text-xs italic text-ivory/65 mt-0.5">{opt.detail}</span>
                                  )}
                                  {opt.note && (
                                    <span className="block text-[0.65rem] tracking-wider text-gold/70 mt-0.5">{opt.note}</span>
                                  )}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ) : null;
                    })()}

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <input
                        value={mealFullName}
                        onChange={(e) => setMealFullName(e.target.value)}
                        placeholder="Full name"
                        className="rounded border border-gold/15 bg-midnight/60 px-3 py-2 font-body text-sm text-ivory"
                      />
                      <input
                        value={mealEmail}
                        onChange={(e) => setMealEmail(e.target.value)}
                        placeholder="Email"
                        type="email"
                        className="rounded border border-gold/15 bg-midnight/60 px-3 py-2 font-body text-sm text-ivory"
                      />
                      <input
                        value={mealAddress}
                        onChange={(e) => setMealAddress(e.target.value)}
                        placeholder="Delivery address"
                        className="rounded border border-gold/15 bg-midnight/60 px-3 py-2 font-body text-sm text-ivory md:col-span-2"
                      />
                      <input
                        value={mealParty}
                        onChange={(e) => setMealParty(Math.max(1, parseInt(e.target.value) || 1))}
                        type="number"
                        min={1}
                        max={20}
                        placeholder="Party size"
                        className="rounded border border-gold/15 bg-midnight/60 px-3 py-2 font-body text-sm text-ivory"
                      />
                      <input
                        value={mealNotes}
                        onChange={(e) => setMealNotes(e.target.value)}
                        placeholder="Notes (allergies, preferences)"
                        className="rounded border border-gold/15 bg-midnight/60 px-3 py-2 font-body text-sm text-ivory"
                      />
                    </div>

                    {(() => {
                      const menu = menus.find((m) => m.id === mealMenuId);
                      const subtotal = menu ? menu.price * mealParty : 0;
                      return (
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gold/15">
                          <p className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-gold/70">
                            Subtotal · {mealParty} {mealParty === 1 ? 'guest' : 'guests'}
                          </p>
                          <p className="font-didot text-xl text-gold">{fmt(subtotal)}</p>
                        </div>
                      );
                    })()}

                    <button
                      onClick={submitMealOrder}
                      disabled={mealSubmitting}
                      className="w-full rounded-full border border-gold/50 bg-gold/15 px-4 py-3 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-gold transition-all hover:border-gold hover:bg-gold/30 disabled:opacity-50"
                    >
                      {mealSubmitting ? 'Reserving…' : 'Reserve & request concierge confirmation'}
                    </button>
                    <p className="text-center font-body text-xs italic text-ivory/55">
                      Payment is taken when the concierge confirms availability — usually within 24 hours.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Acknowledge toast */}
      {ack && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-gold/50 bg-midnight/90 px-6 py-3 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-gold shadow-xl backdrop-blur">
          {ack}
        </div>
      )}
    </main>
  );
}
