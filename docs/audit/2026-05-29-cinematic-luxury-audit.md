# NVAI — Cinematic Luxury Audit

**Date:** 2026-05-29
**Audit scope:** the existing NVAI build under `docs/reference/uploaded-files/`, measured against the bar of an ultra-luxury cinematic immersive digital gallery selling 24 fine art paintings.
**Audit mode:** focused (path C). The full citation-backed deep research (path A) is queued for when web access is restored — this document is grounded in (1) the existing NVAI codebase, read in full, and (2) the design resolutions locked through the grilling session on 2026-05-28/29.

---

## 1 — Where the platform stands today

You have a partially-built cinematic chateau gallery with strong foundations and a small number of luxury-credibility violations that will read cheap to a $1M+ buyer the moment they land. The 5K backdrops, the spatial wing architecture, the cinematic journey concept — all of that is the right idea and already executed at the right fidelity. The breakage is in three specific places: the NDA gate, the carousel, and a handful of literal-text overlays that tell instead of show. None of those are architectural problems. All of them are surgical fixes.

The platform is *also* carrying scope that was added across sessions and no longer fits the business model. Auctions, ambassador programs, blockchain protocols, NVAI Black Cards, encrypted invitations — those drifted in and should come out. Concrete cuts are in §2.

The Kiki wing is the only wing carrying its full creative load. The other nine wings have 5K backdrops but no funnel, no narrative arc, no revenue layer beyond the painting sale itself — which is correct, per resolution. The platform's content asymmetry between Kiki and the rest is a feature, not a bug.

---

## 2 — Resolutions locked this session (what's in, what's out)

**Core thesis:** NVAI is an ultra-luxury cinematic digital gallery selling 24 specific fine art paintings. The chateau experience is the product. Blockchain provenance, industry protocols, and auction infrastructure are out.

**In:**
- Cinematic chateau spatial experience (drone → front door → 3-path choice → foyer/garden → wings)
- 10 artist wings (period-themed cinematic showcases with 5K backdrops)
- 1 Kiki marquee wing (the only immersive/funnel wing)
- Carousel with full-frame "as if at the Met" stop-and-display behavior
- DDNDA as the single front-door gate (no 3-tier model)
- Bernard concierge (Claude-powered, voice + text)
- Direct sale model — buyer interest routes to NVAI staff / Bernard, Stripe checkout, escrow on the transaction
- Physical viewing logistics for the actual paintings (Switzerland, France, Paris, UAE, Czech, Latvia, Poland, UK)

**Out (scope creep — cut from CONTEXT.md):**
- Auctions (Live + Silent)
- Encrypted Invitations, Digital Paddles, Auction Box
- Proof of Liquidity (Plaid + Stripe deposit) — was an auction artifact
- 4-tier Ambassador Program + 25 Founding Ambassadors
- NVAI Black Card via Stripe Issuing
- OSINT verification engine (Prague gallery handles authentication)
- Industry-wide Provenance Protocol on Base L2 / IPFS
- Per-piece Provenance Documentaries (3-5 min AI films) — replaced by one Kiki-specific short film concept
- Proof of Life Sessions
- Lending against pieces (deferred — different business, different counterparties)
- Consignment from third parties (deferred — focus on the 24)

**Revenue model (locked):**
- Cut on every Kiki exposé, audiobook, KISP, commemorative poster, lingerie product, and film crowdfunding pledge
- **1% success fee on every painting sale** across the platform
- Stripe Connect for marketplace mechanics where consignors enter later

---

## 3 — Anti-patterns currently in the codebase (the 8 fixes)

These are file:line-specific violations the existing reference components carry. All eight read SaaS or Bootstrap to a luxury buyer. None require architectural changes — they're surgical fixes.

### 3.1 — `NdaGate.tsx` uses `alert()` for errors (lines 21, 27)

The Shopify-tier `window.alert()` call is the single largest luxury kill in the codebase. A buyer who clicks "Sign NDA & Unlock" and is greeted by a native browser dialog box has just been told "you're shopping at the same tier as everywhere else on the internet." Native browser chrome cannot read luxury — there is no font control, no colour control, no motion control. Combined with the SaaS-y "Sign NDA & Unlock" call-to-action language (line 84), this is a four-out-of-ten experience at a ten-out-of-ten price point.

**Fix:** Remove both `alert()` calls. Errors render as inline, animated, typographically restrained messages within the NDA panel itself. Use a single calm system font message ("We were unable to record your signature. Please try again, or contact concierge.") with a fine gold rule underneath and a Bernard handoff link. Replace "Sign NDA & Unlock" with "Sign and Enter" — the gating mechanism is implied; the action language should match a private viewing room, not a paywall.

### 3.2 — `EscrowModule.tsx` also uses `alert()` plus three SaaS-style "Request" cards

Same anti-pattern, same fix. The "Request Vault Storage / Request Lending / Request Sale" three-card grid reads as a Stripe dashboard. Vault, lending, and sale are not three peer products to choose between — they are three distinct transaction modes Bernard initiates contextually based on the buyer's expressed intent. Cut the three-card grid entirely. Replace with Bernard-mediated intake: the buyer expresses an interest, Bernard routes.

### 3.3 — `ArtworkCarousel.tsx` ships visible loading text "Loading artworks..." (line 40)

Visible loading text is an immediate tell of an unfinished site. At this tier, loading is masked — either by a held cinematic backdrop with a fine gold typographic mark that fades, or by suspending the carousel until ready and letting the chateau ambient audio bridge the silence. Never the words "Loading artworks…" in user-visible flow.

**Fix:** Replace with a held-state cinematic frame (the carousel container styled with a subtle vignette) plus an optional small typographic mark — three dots in IBM Plex Mono at 8px, golden, breathing at 1.5s — that disappears the moment artworks arrive. Or: pre-fetch on parent mount so the carousel never renders in a loading state.

### 3.4 — Multiple foyer variants (`Foyer.tsx`, `GrandFoyer.tsx`, `GrandFoyerHub.tsx`, `FoyerLanding.tsx`)

Fragmentation. Four files attempting the same node in the spatial graph is evidence that the entry sequence was not locked across sessions. Pick one canonical foyer component, archive the others under `docs/reference/uploaded-files/_archive/foyer-iterations/` with a one-line README noting they're prior iterations. The canonical foyer is the one that implements the CONTEXT.md sequence: aerial drone → Villa front door → three-path choice (Kiki left, Enter center, Garden right) → lead-in video → wing.

### 3.5 — Browser `title="..."` tooltips on every nav button

Found in `CinematicJourney.tsx`, `Foyer.tsx`, `KikiMoulinRouge.tsx`. Browser tooltips are operating-system chrome — Helvetica on macOS, Segoe UI on Windows — and they violate the visual language at the moment of interaction. They are also a tell of dev-stage code shipped to production.

**Fix:** Remove every `title="..."` attribute. Replace with custom motion affordances: the button itself animates on hover (subtle gold underline expansion, micro-shift of cursor weight, breathing background) and the *meaning* of the action is communicated by the motion. If a label is required, render it as a custom typographic element in the wing's local typography, not browser chrome.

### 3.6 — `SKIP →` button on the Moulin Rouge entrance video (`KikiMoulinRouge.tsx`)

YouTube-style skip controls inside a cinematic intro break immersion. The Moulin Rouge entrance is a 30-second velvet-curtain reveal. A YouTube `SKIP →` button telegraphs "this is content you might want to skip" — the wrong posture for the marquee wing.

**Fix:** Remove the skip button entirely. The video plays through. If a buyer is impatient, they tap once anywhere on the screen and the video fades to the wing interior. The interaction is unsigned and silent.

### 3.7 — Literal text overlay `"75 Foot Ceilings • Sweeping Staircase • Chandelier"` in `GrandFoyer.tsx` line 122

Telling, not showing. The video shows the ceilings, the staircase, and the chandelier. The buyer can see them. Writing them in text as a feature-bullet overlay is the digital equivalent of putting a "luxury" sign over the door at the Four Seasons. Cut the overlay entirely. If a typographic moment is required at the foyer, use something atmospheric — the property's name in Didot small caps, or a single literary excerpt, or no text at all.

### 3.8 — Carousel uses `←` and `→` as text characters plus `1 / 11` counters

Both read SaaS. Text-character arrows have no weight, no luxury, no design language. The `1 / 11` counter reads like Instagram or a media gallery — at this tier, the buyer doesn't need a counter; they need the *current piece* to feel like it deserves their full attention.

**Fix:** Replace text arrows with custom SVG icons — thin gold lines, IBM Plex Mono-adjacent weight, animated in/out on hover. Remove the `1 / 11` counter entirely. The carousel becomes a museum bench, not a slideshow.

---

## 4 — The carousel as a museum display (locked behavior spec)

The carousel function is paramount. The gallery features the entire catalog of 24 paintings. Behaviour, per resolution:

1. **Default state** — paintings rotate slowly around the gallery space. Think of the conveyor at the Bouley test kitchen or the dry-cleaner-belt the user described — paintings carrying past at a reading pace, not a swipe pace. Period-appropriate ambient audio fades in and out per piece's era.

2. **Stop interaction** — the buyer clicks/taps/uses keyboard to stop the carousel on a specific piece. Rotation halts smoothly (no abrupt freeze).

3. **Frame load** — the painting that was stopped on loads its **period-appropriate frame** — 17th–18th century Italian gilded cassetta for the Picassos and Chagalls, ornate Renaissance tabernacle for Da Vinci and Raphael, simpler gilded for Monet/Matisse/Kandinsky, Mexican folk-influenced for Kahlo. Frame catalogue lives in a `frames.json` config keyed by artist/era so it can be authored once and reused.

4. **Full-frame display** — the painting expands to a museum-grade single-piece full-frame display. Velvet rope. Bottom-lit. Period-appropriate ambient audio swells slightly. Bernard becomes available in the corner for context (the wing's curatorial voice). All other UI fades to near-invisible — the painting is the experience. **"As though on display at the Met."**

5. **Exit** — buyer taps outside the frame, hits escape, or chooses "back to gallery" rendered as a custom typographic gesture, not a button.

This becomes the canonical interaction pattern for every piece in the catalog, in every wing. The carousel is the spine of the entire gallery experience.

---

## 5 — The NDA gate redesign

The DDNDA is the single front-door gate. Sign once, see everything. The current `NdaGate.tsx` implementation is functionally correct — checkbox, agreement text, signature recording with timestamp/IP — but visually broken.

**Recommended treatment:**

The NDA is not a modal. It is a *room* in the cinematic journey. The buyer arrives at the chateau front door (the existing three-path choice). Before any path becomes available, a custom-tooled paper document floats up — Crane lettra texture, Didot heading, IBM Plex Mono body — onto a marble plinth or a vintage Florentine desk. The buyer reads it (typographically beautiful, no scrollbars, fades up section by section). Below the document: a single restrained checkbox styled as a custom tooled-leather affordance, a fine gold stylus that signs the buyer's name in a calligraphic flourish on accept, and the three-path choice unlocks behind it. No "Unlock" language. No popups.

For the legal record: signature is captured with timestamp, IP, user agent, and a hash of the document version (current implementation already records these — keep). Use **Dropbox Sign** or **Adobe Sign** API for the underlying legal infrastructure (training-knowledge claim; not verified against live source in this session — to be confirmed in path-A research). The visual NDA component is the cinematic veneer; the legal infrastructure sits behind it.

**Cut from current implementation:** both `alert()` calls (errors render inline, animated, with a Bernard fallback). The button language "Sign NDA & Unlock" becomes "Sign and Enter." The modal styling becomes the document-on-plinth treatment.

---

## 6 — The Kiki wing — the only immersive wing

Kiki is the only wing carrying the full creative load. The other nine are cinematic showcases. Treat them differently.

**Kiki's audience:** her 1M+ existing super-fans worldwide. They are not (necessarily) art buyers. They are arriving for Kiki — the personality, the era, the story, the lost-relationship discovery, the Hemingway connection, the $12.4M Man Ray photo. NVAI serves them as a destination and monetises across multiple low-ticket products.

**The wing's components (locked):**

- **The exposé** (Jana Misho, 220 pages, $65) — the literary anchor. Needs the luxury-redesign work the analysis file flagged: leather-bound cover treatment, certificate of authenticity, "Collector's Edition" branding, 3D book preview on the wing landing.
- **The audiobook** — accompanying narration. ElevenLabs voice (period-appropriate, French-accented English, restrained).
- **KISP weekly updates** — Kiki Supplement Pages. Subscribers get newly uncovered rare photos, videos, anecdotes. Builds long-tail engagement.
- **Commemorative Modigliani poster** (36" x 24") — first 10,000 copies. Physical artefact. Standalone product (does NOT link to the Modigliani for sale — confirmed; the wing is not a Modigliani funnel).
- **Private YouTube channel link** — 24-hour streaming of rare Kiki film, animation, interviews.
- **Lingerie collection** — references the existing Kiki de Montparnasse luxury brand (real product). Treat as curated cultural reference, not own-label commerce.
- **Burlesque performance videos** — already produced (`kiki_burlesque_performance_5k_*.mp4`). Used as wing atmosphere/content, not as the cinematic intro.
- **Movie Kickstarter** (NEW) — crowdfunding page for the Kiki feature film. Pledge levels, progress bar, supporter wall. The existing `KikiFilmCrowdfunding.tsx` component is the right idea, needs the luxury treatment pass.
- **The short film teaser** (NEW) — 90-second blockbuster preview. Treatment in §6.1.
- **10% to charity in Kiki's honour** — keep, prominent, donor wall in the wing.

**Locked: no poster link to the Modigliani-for-sale, no for-sale link from inside the wing.** The Modigliani painting can be *shown* in the wing as part of the lost-relationship narrative (it's the 34-page anchor of the exposé). It cannot be commercialised within Kiki's space. Kiki's wing is hers.

### 6.1 — The short film teaser concept (90 seconds, blockbuster preview)

**Treatment notes:**

- **Opening:** Montparnasse 1920s. Dusk-to-night. Accordion under cabaret laughter. Title card: *"In an age larger than life…"* Didot, gold-on-black, fades.
- **Establishing montage** (10s): the lost generation — Hemingway at a typewriter, a cigarette burning, Modigliani at a easel, Kiki's silhouette walking past a Rotonde café table. The camera holds on each face just long enough to feel the weight.
- **The Moulin Rouge sequence** (25s) — the *A Star Is Born* scene. Kiki on stage. The room is jazz, smoke, red velvet. Modigliani is in the audience, frame-front, locked in. Camera holds on his face the way Bradley Cooper's frame holds on Gaga. Kiki sees him see her. The cut to her face is the love story.
- **The secret love story** (20s) — short fragments. Dinner at the Hôtel des Artistes with the lost-generation crew (use the still photo the user uploaded). Two of them at a table, alone. Walking the Seine. A door closing behind them.
- **The painting** (15s) — the studio. The light is candle and oil lamp. Kiki is being painted. The composition implies the nude pose; the camera never shows the nudity. The framing is Modigliani's eyes, then her face, then his hand on the canvas. They are locked in.
- **Title card** (5s): *"A century later, their story is finally told."*
- **CTA card** (10s): two options — *"Help bring this feature film to life"* (Kickstarter) OR *"Read the full story"* (exposé). Soft fade, gold rule, IBM Plex Mono.

**Style references for the production team:** *A Star Is Born* (2018, Gaga/Cooper) for the locked-in cabaret scene; *Midnight in Paris* (Allen) for the larger-than-life lost-generation backdrop; *Phantom Thread* (Anderson) for the period restraint and candlelit interiors; *Marie Antoinette* (Coppola) for the sound design and intimacy. Higgsfield for generation; ElevenLabs for the (sparse) voiceover; period jazz licensing required (charlot songs, Mistinguett — public domain in most cases, but verify per cue).

**Format:** 90s teaser is the wing's centerpiece. Plays once on entrance OR can be initiated from a "Watch the teaser" gesture in the wing. Auto-quiets in the wing's overall audio bed.

---

## 7 — The other nine wings (cinematic showcases, not funnels)

Per resolution, the other nine wings are not immersive in the Kiki sense. They are cinematic showcases of the paintings:

- 5K backdrop already produced (todo.md Phase 3.5 — complete)
- Lead-in video (40-55s, plays once)
- Carousel of that artist's pieces — the Met-display behaviour from §4
- Period-appropriate ambient audio (Eleven Labs, deferred)
- Bernard available as the wing's curatorial voice
- DDNDA already signed at the front door, so each piece reveals its provenance dossier directly

No funnel layer. No commerce beyond the painting sale. No exposé. No Kickstarter. The painting is the experience.

The asymmetry between Kiki and the rest is correct. Kiki gets the full immersive load because Jana Misho already did years of research and there's a 1M-fan audience. The other wings can earn their own immersive treatment over time as research and content surface — but v1 does not pretend.

---

## 8 — Implementation order (recommended)

1. **Cut scope-creep from CONTEXT.md.** Done in parallel with this audit — see updated CONTEXT.md.
2. **Fix the 8 anti-patterns.** All surgical. None require new architecture. Order: NDA `alert()` first (highest credibility kill), then carousel loading text and arrows, then foyer fragmentation, then tooltips and SKIP button, then literal-text overlays.
3. **Lock the carousel behaviour spec** from §4 — implement the museum-display stop-and-display moment as the canonical interaction across all wings.
4. **Redesign the NDA gate** per §5 — the document-on-plinth treatment.
5. **Kiki wing — the short film teaser.** Treatment in §6.1; production via Higgsfield + ElevenLabs.
6. **Kiki wing — the exposé luxury redesign** per the analysis file (leather-bound, COA, Collector's Edition).
7. **Bernard wiring** — voice + text, single front-door identity, context-aware per wing.
8. **Other nine wings — ambient audio integration** (Phase 3.5 deferred items).
9. **Production buyout flow** — Stripe checkout, escrow on transaction, Bernard-mediated buyer interest routing.

---

## 8a — Spatial Architecture (locked 2026-05-29)

The cinematic spatial architecture was fully locked through the grilling session ending 2026-05-29. Canonical definitions live in `CONTEXT.md`. Summary tree:

```
HOME (aerial chateau + 5 Essentials tabs)
├── LEFT  → KIKI (Moulin Rouge outside → Kiki marquee homepage)
├── CENTER → FOYER
│           ├── LEFT   → GUESTBOOK · ABOUT NVAI · MERCH
│           ├── CENTER → STAIRCASE → upstairs landing (3 doors)
│           │           ├── LEFT   → BERNARD Russian Enchantment chapel (1)
│           │           ├── CENTER → KANDINSKY creepy Bauhaus room (2)
│           │           └── RIGHT  → RAPHAEL Renaissance studiolo (1)
│           └── RIGHT  → FULL GALLERY direct catalog shortcut
└── RIGHT → SECRET GARDEN walk video
             ↓
             GARDEN PARTY (patio — Tuscany-inspired vineyard views)
             ├── LEFT  → THE PARLOR (La Ruche bohemian bar, Chagall 6)
             │          → continues inside → GRAND HALL
             ├── CENTER → MATISSE Mediterranean pavilion (1)
             └── RIGHT → GROUNDS (expansive property)
                          ├── MONET Giverny (30s expansive lead-in showcase, 1)
                          ├── PICASSO compound (3 connecting period sub-rooms, 8)
                          ├── DA VINCI Workshop (1)
                          └── FRIDA Casa Azul guest house (1)

GRAND HALL (1920s lavish ballroom — gallery opening / auction reception)
├── LEFT        → Full Gallery circle (all 25 works)
├── CENTER-LEFT → AUCTION HOUSE (video conf, bid button, VIP food)
├── CENTER     → MODIGLIANI Cabinet de Curiosités (3, the Kiki feature)
└── RIGHT      → exit back to FOYER (loop close)

ESSENTIALS TABS (persistent home-page utility)
├── VAULT · AUCTION · INQUIRE · ACCOUNT · CART
```

**Coverage:** every one of the 25 pieces (24 from inventory + 1 Bernard) has a dedicated home plus catalog presence in the Full Gallery. Every artist has a wing whose aesthetic matches their biography.

**Carousel rule (locked):** carousel is used ONLY in the Full Gallery. Individual artist rooms hang paintings on the walls in period frames — no carousel inside dedicated wings.

**Higgsfield videos required (production list):**
- Grounds arrival (transitional walk from patio onto the expansive property)
- Monet Giverny 30s expansive (the platform's grandest cinematic moment)
- Grand Hall (1920s ballroom / invite-only gallery opening / period dress reception)
- Parlor La Ruche (bohemian bar, green patina copper, samovar, Russian-Jewish character)
- Plus existing wing backdrops already produced (todo.md Phase 3.5)

**Auction returns to scope (Phase 2 of platform):** both private invite-only and full Christie's-scale formats. Implies reinstating encrypted invitations, proof of liquidity / KYC (Plaid + Stripe), paddle numbers, Auction Box VIP delivery. Phase 2 — designed-into the architecture now; built after gallery + Kiki + DDNDA + Bernard ship in Phase 1.

---

## 9 — Queued for path A (full deep research when web access is available)

The agent stopped before completing the full reference-platform survey. When web access is restored, run path A to cover:

- Christie's, Sotheby's "Sealed," Phillips, David Zwirner OVR, Hauser & Wirth, Pace, Gagosian, Acquavella — annotated reference set with what to learn from each
- Bottega Veneta, Hermès, Cartier, Loro Piana, Brunello Cucinelli, Aman Resorts, Patek Philippe — luxury web technique playbook with citations
- MoMA, Louvre, Rijksmuseum, Tate, Google Arts & Culture — museum-grade digital reference
- Cinematic web technique survey — GSAP ScrollTrigger, Lenis, Locomotive, Three.js, R3F, Spline, Babylon
- Luxury typography canon with cited specimens (Didot, Bodoni, Caslon, ITC Cheltenham, Optima, Trajan in actual brand use)
- Video CDN benchmarks (Cloudflare Stream vs. Mux vs. BunnyCDN) for 5K delivery
- AI concierge precedent in luxury contexts
- Real agency cost data (Active Theory, Lusion, Resn, Stink, B-Reel, North Kingdom, MediaMonks)
- Honest cost feasibility for a solo founder + Claude Code build vs. agency-level

The findings above (§§ 1–8) are independently actionable. Path A enriches the reference layer; it does not change the audit verdict.

---

*— End of audit*
