# NVAI — Design Brief for Richard

**From:** Sean Gilmore
**Date:** 2026-05-29
**Status:** Architecture locked, entering build phase
**Action required:** Migrate off Manus; staff up the production build

---

## 1. What we're building, in one line

NVAI (Napa Valley Art Institute) is an **ultra-luxury cinematic immersive digital gallery** selling a curated collection of 25 fine art paintings — Picasso, Chagall, Modigliani, Da Vinci, Raphael, Monet, Matisse, Kandinsky, Kahlo, Bernard — valued in aggregate at $1B+, under exclusive representation from a Prague gallery that handles authentication.

The visitor experience is set on the digital grounds of **Villa Monticello**, a Tuscan-style French chateau in Napa Valley. Every transition is cinematic 5K video. Every room is period-authentic to its featured artist. Every painting is a museum-grade single-piece moment when stopped on. The whole platform reads as a private viewing room at Christie's — not as a website.

Revenue is direct sale (1% success fee per painting), Kiki product line (eBook / audiobook / Kickstarter / merch), and Phase 2 invite-only auctions (Christie's-scale and intimate formats). Buyer access is gated by a single DDNDA at the front door.

---

## 2. Why we're moving off Manus

Manus has been excellent for getting us this far — 44 React components, 5K cinematic backdrops, the spatial layout, the Kiki immersive components — but it's not where this lives long-term. Reasons to migrate now, before more code accretes there:

- **5K video CDN.** A platform whose entire identity is cinematic 5K video needs proper adaptive-bitrate streaming (Cloudflare Stream, Mux, or BunnyCDN) with HLS / DASH. Manus's asset hosting is not designed for this scale of video delivery at the polish we need.
- **Production framework.** We're standing on a Vite SPA today. For a platform with auth, Stripe Connect, DDNDA legal infrastructure, Bernard AI integration, and an admin console — we want Next.js (App Router) on Vercel, or equivalent. Server components, edge functions, fluid compute.
- **Long-term ownership.** The codebase has to be portable, version-controlled in our own GitHub, deployable on our own infrastructure. Building inside Manus's environment doesn't give us that.
- **Integration headroom.** We need to wire Stripe (Connect + Issuing for Phase 2 black card), Dropbox Sign / Adobe Sign (DDNDA legal), ElevenLabs (Bernard's voice + audiobook), Higgsfield (room videos), and eventually Plaid + KYC vendors (Phase 2 auctions). That stack lives more cleanly outside Manus.
- **Performance budget.** Christie's-tier loading polish requires preloading, intersection observers, optimized assets, font subsetting. We need full control of the build pipeline.

**The work isn't "rebuild from scratch."** It's: lift the React components and design DNA we have, port to Next.js on Vercel, wire to a proper video CDN, build the integrations, ship.

---

## 3. Current state of the build

- **5K wing backdrops:** complete for all 10 artist wings (Picasso 3 sub-rooms, Chagall, Modigliani, Raphael, Kandinsky, Leonardo, Monet, Frida, Matisse, Bernard). Live in S3 staging.
- **React components:** 44 components built in Manus (foyer variants, artist wing components, Kiki components, NDA gate, escrow module, provenance dossier, carousels). These are reference designs — they need to be consolidated and ported.
- **SQL schema:** 11-table starter (artists, artworks, escrow, NDA signatures, Kiki commerce). Not production-ready; needs to be rebuilt on Supabase Postgres.
- **Architecture:** **locked as of 2026-05-29** — the full spatial map, every room, every wing, every essentials tab, every revenue line is decided. Documented in `CONTEXT.md` and the cinematic-luxury audit (`docs/audit/2026-05-29-cinematic-luxury-audit.md`).
- **Known anti-patterns to fix in the port:** SaaS-tier `alert()` popups in the NDA gate (removed), "Loading…" text in the carousel, browser tooltips on nav buttons, YouTube-style SKIP buttons in cinematic intros, multiple foyer variants needing consolidation. Full list in the audit doc.

We are out of the design phase. We are in build.

---

## 4. The spatial architecture (locked)

```
HOME PAGE (aerial pan-out of the chateau + 5 Essentials tabs)
├── LEFT  → KIKI (Moulin Rouge cabaret outside → Kiki marquee homepage)
├── CENTER → ENTER FOYER (cinematic zoom into the chateau door)
└── RIGHT → SECRET GARDEN (pathway walk video → Garden Party)

FOYER (front entry vestibule)
├── LEFT   → GUESTBOOK · ABOUT NVAI · MERCH SHOP
├── CENTER → STAIRCASE (cinematic climb) → UPSTAIRS LANDING
│           ├── LEFT   → BERNARD "Russian Enchantment" chapel
│           ├── CENTER → KANDINSKY "the creepy room"
│           └── RIGHT  → RAPHAEL Renaissance studiolo
└── RIGHT  → FULL GALLERY (direct catalog shortcut — skip the curated tour)

GARDEN PARTY (the patio, Tuscany-inspired vineyard views)
├── LEFT  → THE PARLOR (La Ruche bohemian bar → continues inside → GRAND HALL)
├── CENTER → MATISSE Mediterranean pavilion
└── RIGHT → THE GROUNDS (expansive property)
            ├── MONET'S Giverny garden (30-second expansive showcase)
            ├── PICASSO compound (one outbuilding, 3 connecting period sub-rooms)
            ├── DA VINCI Workshop
            └── FRIDA's Casa Azul guest house

GRAND HALL (1920s lavish ballroom — gallery opening / auction reception)
├── LEFT        → Full Gallery circle (catalog of all 25 works)
├── CENTER-LEFT → AUCTION HOUSE (video conferencing, bid button, VIP food)
├── CENTER     → MODIGLIANI'S Cabinet de Curiosités (the Kiki feature)
└── RIGHT      → exit back to FOYER (loop closes)

ESSENTIALS TABS (home-page persistent utility)
├── VAULT · AUCTION · INQUIRE · ACCOUNT · CART
```

The visitor either takes the curated tour (Foyer → upstairs / outdoor wings → Grand Hall → exit) or takes the shortcut (Foyer RIGHT → Full Gallery to browse the catalog directly). The whole chateau is a circulation loop — you never dead-end.

---

## 5. The cinematic lead-in (the platform's identity)

The transitions are not navigation. They are the product. Every move between spatial nodes is a 5K cinematic video that establishes ultra-luxury before any UI loads. A visitor who arrives at NVAI sees a film before they see a website.

### The opening sequence — every visitor sees this

**Aerial pan-out of Villa Monticello** — drone-style aerial shot. The camera starts close on the chateau's terracotta-tile roof, then pans out to reveal the full property. Castle stone walls catching golden-hour light. Vineyards descending the hillside in symmetrical rows. The Mayacamas mountains in soft purple haze behind. Cypress-lined gravel drive in the foreground. Oak shadows lengthening across the lawn. **Three marble tombstones materialize over the aerial** — Kiki (LEFT), Enter Foyer (CENTER), Secret Garden (RIGHT). Period-tombstone typography, gold lettering on marble texture. Subtle ambient: distant accordion, the rustle of wind through vines, the suggestion of a string quartet from inside the chateau.

This is the platform's home page. The aerial holds and loops slowly. The visitor's first decision is which tombstone to enter.

### The three path transitions from home

**LEFT → Kiki.** The aerial fades to black. **The Moulin Rouge cabaret scene plays outside** — red velvet curtains parting (camera dolly-in through the curtains), the iconic red windmill turning above a Paris street, gas-lamp light, jazz and accordion swelling, cigarette smoke drifting across the frame, Kiki's silhouette appearing on a small stage. 20-30 seconds. The scene crossfades into the Kiki homepage interior — all of her marquee components arranged in the wing layout (see Section 9).

**CENTER → Enter Foyer.** The aerial dollies forward, the camera flying through the air toward the chateau's front entrance. The arched wooden doors fill the frame — hand-carved Renaissance grapevine motifs, brass handles catching low sunset light. **The doors slowly swing inward**, weighted and cinematic, revealing the foyer interior — chandelier overhead, polished parquet floor, tall windows with sheer linen curtains, warm interior light spilling out. Camera passes through. Arrives at the Foyer's three-tombstone decision (Welcome / Staircase / Gallery shortcut). 15-20 seconds.

**RIGHT → Secret Garden.** The aerial drops to ground level at the front of the chateau, then turns toward a pathway curving around the side of the property. **The pathway walk begins** — under arches of wisteria and bougainvillea, past a stone fountain, between rows of cabernet vines, hand-shot at walking pace. Bees in the wisteria. Distant murmur of a garden party. Golden-hour light fading toward dusk. 25-30 seconds. Arrives at the **Garden Party patio** — the visitor steps out from under the last archway and sees the patio for the first time, vineyard views, set tables, the bohemian bar (Parlor) on the left, Matisse's Mediterranean pavilion in the center, the path to the grounds curving away on the right.

### In-between cinematic transitions inside the chateau

These keep the platform feeling like a continuous film, not a website.

- **Foyer → Staircase climb to upstairs landing.** Cinematic climb up the grand marble staircase, hand on the brass railing, period oil portraits passing on the wall, the staircase landing materializing at the top with three doors visible (Bernard chapel, Kandinsky room, Raphael studiolo). 10-12 seconds.
- **Foyer → Full Gallery shortcut.** Quick walk through a side corridor (gilt mirrors, parquet floor) directly into the Full Gallery — the room opens, the carousel of 25 paintings begins its slow rotation. 5-7 seconds.
- **Patio → The Parlor → Grand Hall.** The Parlor door opens (heavy carved wood, brass fittings), the visitor steps into the bohemian bar — patina-copper sconces, samovar steaming, Vertinsky playing low, Chagall's paintings on the walls. They walk through the bar toward a second door at the back. That door opens onto the **Grand Hall** — the room reveals itself in its full 1920s ballroom scale, chandeliers, period-dress figures in the distance, the auction-reception aesthetic. Total transition 20-25 seconds, two-stage reveal.
- **Patio → Grounds arrival.** A pathway opens off the patio onto the expansive grounds. Camera walks the visitor forward — past outbuildings glimpsed in the distance (Da Vinci's workshop, Frida's blue guest house), then the path forks toward Monet's Giverny garden (the showcase) or the Picasso compound. **New 30-second expansive lead-in for Monet** when that path is taken: lily pond, the Japanese bridge under wisteria, iris paths, the conservation lab pivot.
- **Within the Picasso compound** — between the 3 sub-rooms: Bateau-Lavoir 1901 (cold blue gloom, attic studio) → transition (the camera passes through a doorway, palette warming) → Boisgeloup 1934-49 (mid-century interior, terracotta light) → transition → Mougins 1965-67 (sun-drenched South of France villa). Each sub-room transition: 5-7 seconds. The visitor walks Picasso's career as a single architectural journey.
- **Grand Hall → exit back to Foyer.** Walk through the interior corridor closing the loop, ending in the Foyer where the visitor arrived. 10-12 seconds. The journey ends where it began.

### Aesthetic principles across all cinematic transitions

| Principle | Rule |
|-----------|------|
| Resolution | 5K (5120×2880) where possible; 4K (4096×2304) graceful fallback for mobile / lower bandwidth |
| Frame rate | 24fps (cinematic), never 30fps (web-video tell) |
| Cuts | No abrupt cuts. Slow dissolves, fade-to-black, or motion-driven transitions only |
| Audio | Ambient bed crossfades between rooms. No music start/stop — continuous bridge |
| Grain | Subtle film grain overlay, warm 1970s film-stock feel (Kodak Portra 400 reference) |
| Color grading | Golden-hour primary, Tuscan palette. Burnt sienna, olive, ochre, dusty rose, deep cabernet |
| UI chrome | None visible during transitions. Full-bleed cinematic. UI fades in only after the transition lands |
| Skip controls | None. The cinematic *is* the experience. No YouTube-style SKIP button anywhere |
| Loading state | Held frame or letterboxing — never the text "Loading…" |
| Mobile | Same transitions, lower bitrate; the experience is consistent, not stripped down |

### Style references

- **Luca Guadagnino** films — *Call Me By Your Name* for Tuscan light, *Bones and All* for road-and-pathway grammar
- **Paul Thomas Anderson — *Phantom Thread*** — period restraint, candlelit interiors, fabric and texture close-ups
- **Sofia Coppola — *Marie Antoinette*** — sound design, intimate handheld moments, the camera's slow looks at faces
- **Wes Anderson — *The Grand Budapest Hotel*** — symmetrical chateau-corridor framing (sparingly, not for full grammar)
- **Brassaï's *Paris by Night*** (1933) — the nocturnal Montparnasse photographs that inform Kiki's Moulin Rouge scene
- **André Kertész's vineyard work** — for the Secret Garden pathway aesthetic

### Production reality

These transitions are mostly generated via **Higgsfield** with hand-finished motion designer pass. ElevenLabs handles the ambient audio beds. The new videos needed (listed in Section 11) are the four highest-leverage moments — Grounds arrival, Monet 30s expansive, Grand Hall, Parlor La Ruche — plus the Kiki short film teaser (a separate creative production).

The existing 5K wing backdrops (Phase 3.5 of the previous todo list) cover the static room interiors, not the transitions. The transitions are the next production push.

---

## 6. The rooms in brief

### Indoors

**Foyer LEFT — Guestbook, About NVAI, Merch shop.** Every guest interacts here. Captures emails for the mailing list, presents the institute's mission and the Prague gallery partnership, sells merch (Kiki Commemorative Poster, NVAI coffee-table catalogs, fine-art prints of public-domain works, NVAI-branded scarves and stationery, wine from the Villa Monticello vineyards). Museum-shop logic at chateau scale.

**Foyer RIGHT — Full Gallery (direct shortcut).** A guest who doesn't want the curated tour goes here. The 25-piece catalog carousel. Slow rotation, stop on a piece, period-frame loads, painting expands to museum-grade full-frame display — "as though on display at the Met." This is also reached via the Grand Hall LEFT after the curated tour.

**Upstairs LEFT — Bernard "Russian Enchantment" chapel.** Émile Bernard's late religious altarpiece *La Passion de Jésus-Christ* (c.1926–40, 290 × 193 cm) hung in a Russian-Orthodox-inspired chapel. Icons, gold backdrops, candle and beeswax, hieratic light. Bernard is French (Pont-Aven School), but his late religious work has real visual overlap with Russian icon painting — the theme is the room's mood, not the artist's biography. Single piece, altarpiece scale, contemplative.

**Upstairs CENTER — Kandinsky "the creepy room."** Bauhaus geometric salon. Pure primary colors as flat fields, dissonant Schoenberg-quartet audio bed, no figurative anchor for the eye. The room *vibrates* — leaning into the unsettling abstraction is what makes Kandinsky's work land. Holds 2 pieces.

**Upstairs RIGHT — Raphael Renaissance studiolo.** Florentine workshop aesthetic. Arched windows, classical sculptures, easels, anatomical sketches, natural Tuscan light. Holds *Madonna with Child* (1500–10). One piece, religious in subject, classical in execution — paired thematically with Bernard's chapel down the corridor.

**Grand Hall — 1920s invite-only gallery opening / auction reception.** Vast, lavish, ballroom scale. Period dress, marble or parquet floor, tall chandeliers, possibly a moment of people dancing or gathering as they wait to enter the gallery. The chateau's interior spine. Four positions: Full Gallery circle (LEFT), Auction House (CENTER-LEFT, see Section 8), Modigliani's Cabinet de Curiosités (CENTER), exit back to the Foyer (RIGHT). The "fitting end of tour" — visitor closes the loop here before departure.

**Grand Hall CENTER — Modigliani's Cabinet de Curiosités.** Featured position. Small intimate French chateau curiosity cabinet — glass-front display cases, African and Oceanic masks (the source of Modigliani's elongated faces), mineral specimens, leather-bound naturalist folios, deep velvet walls, candlelight. Three Modigliani portraits hang between the cabinets. Featured *because* of the Kiki narrative — the lost-relationship discovery is the platform's strongest cinematic story arc.

### Outdoors

**Garden Party (the patio) — Tuscany-inspired vineyard views.** The patio reached at the end of the Secret Garden pathway walk. Where guests are invited.

**Patio CENTER — Matisse Mediterranean pavilion.** The Tuscany-inspired vineyard view *is* Matisse's Côte d'Azur — same dappled light, same warm stone, same garden-and-vineyard aesthetic. Putting Matisse here is identification, not just placement. Holds *Woman with Child*.

**Patio LEFT — The Parlor (La Ruche bohemian bar).** The transition from outdoor patio back into the chateau interior. See Section 7.

**Grounds → Monet's Giverny garden.** The platform's grandest cinematic moment. **30-second expansive lead-in video** — slow walk through lily pond, the Japanese bridge under wisteria, the iris paths, the conservation lab pivot, the Clos Normand flower beds. Long, slow, the showcase. Holds *La berge de Lavacourt sous la neige* (1879).

**Grounds → Picasso compound.** Single outbuilding on the grounds with **three connecting period sub-rooms inside.** Visitor enters one door, walks through Picasso's career as a single architectural journey:
- **Sub-room 1: Bateau-Lavoir 1901 (Blue Period).** Montmartre tenement aesthetic. Candlelit blue-period gloom. Garret studio, peeling plaster, cold light. Holds the 4 Blue Period pieces (Buste de femme souriante, Maternité, L'enterrement de Casagemas, etc.).
- **Sub-room 2: Boisgeloup 1934–49.** Picasso's actual chateau-era work. Mid-period palette, Marie-Thérèse iconography, ceramic vessels, mid-century interior light. Holds the 1934 and 1949 pieces (Femme assise, Femme en bleu, Nature Morte, Tête de femme).
- **Sub-room 3: Mougins 1965–67 (late atelier).** South of France villa aesthetic. Sun-drenched, terracotta tile, ceramic vessels everywhere, the late-Picasso clutter of canvases. Holds the late pieces (HOMME À LA PIPE, Personnages, L'enfant à l'orange).

Total: 8 active Picasso pieces across the compound.

**Grounds → Da Vinci Workshop.** Renaissance polymath studio outbuilding. Stone arches, leather-bound notebooks, anatomical sketches, mortar-and-pestle, candlelight, the smell-suggestion of linseed oil. Holds *Lady with a Fur* (1495–99).

**Grounds → Frida's Casa Azul guest house.** Cobalt-blue Mexican folk-art sanctuary. Bright walls, marigolds, votive candles, terra cotta, tropical greenery, traditional Mexican folk music ambient. Holds *La Mesa Herida* (1939–40).

---

## 7. The Parlor — La Ruche bohemian bar (deserves its own section)

The Parlor is the transition from the patio back into the chateau interior. Reached from Patio LEFT, continues inside to the Grand Hall. It's not just a passageway — it's a destination room with bohemian gathering energy and Chagall's 6 pieces hanging across its walls.

**Why La Ruche.** "La Ruche" ("The Beehive") was the real artists' colony in Montparnasse where Marc Chagall actually lived from 1911 to 1914, alongside Modigliani, Léger, Soutine, Brancusi, and other Russian-Jewish bohemian artists. Cheap rooms in a polygonal building, communal kitchen, paint-stained walls, samovars and Pernod side by side, Yiddish and French mixing in the stairwells. Theming the Parlor as La Ruche puts Chagall's work in the actual environment where it was painted — biographically true, not just thematic.

**Aesthetic.** Bohemian gathering bar. Worn velvet banquettes, mismatched Thonet chairs. **Green patina copper** — oxidized sconces, samovar fittings, brass-and-copper bar trim. Stained-glass color in the windows refracting ultramarine and crimson light across the bar (Chagall designed cathedral windows; the stained-glass motif is his). A Russian samovar steaming in the corner. A small phonograph playing Vertinsky (Russian-cabaret songs of the period). Yiddish posters peeling on the walls. A dusty unplayed violin propped against a chair (Chagall's father was a herring merchant; the violin is a recurring motif).

**The bar.** Curated cocktails — absinthe, Pernod, vodka, Russian black tea from the samovar. Period drinks. Brand-extension opportunity (NVAI-branded bottlings? "The La Ruche" cocktail? Worth thinking about in production).

**Chagall's 6 pieces** hang on the LEFT and RIGHT walls of the Parlor — 3 on each side. The floating-lovers and Vitebsk village paintings catch the patina-copper sconce light. Visitor sits at the bar, looks left, looks right, has a drink, then continues inside through the back to the Grand Hall.

---

## 8. The Auction House (Phase 2)

Located inside the Grand Hall at the CENTER-LEFT position. Hosts two formats:

- **Full Christie's-scale auctions** — live bidding events, period-dress reception, public-facing for catalogued buyers
- **Private invite-only auctions** — small, intimate, NDA-locked deals on single pieces

**Feature set:**
- Video conferencing for remote bidders
- Live "Bid" button for in-event bidding
- VIP concierge food ordering (curated meal service during auctions)
- Encrypted invitations to events
- Proof of liquidity / KYC integration (Plaid + Stripe escrow)
- Paddle numbers for bidders
- Auction Box — physical luxury delivery to VIP bidders (wines from Villa Monticello vineyards, catalog, paddle, regional concierge)

This is Christie's-tier infrastructure. Build target: **Phase 2 of the platform.** Designed-into the architecture now (the room is part of the locked spatial map), built after Phase 1 (gallery + Kiki + DDNDA + Bernard) ships.

---

## 9. The Kiki Wing — the marquee, full breakdown

Kiki de Montparnasse (Alice Prin, 1901–1953) was the "Queen of Montparnasse" — Man Ray's lover, Modigliani's muse, Hemingway's brief lover, the subject of Le Violon d'Ingres (Man Ray, 1924 — the most expensive photograph ever sold, $12.4M at Christie's 2022). Over 1M super-fans worldwide today (per Mark Braude's *Kiki Man Ray* NYT bestseller and the existing Kiki de Montparnasse luxury lingerie brand).

The Kiki Wing is reached from the home page LEFT — the Moulin Rouge cabaret scene plays *outside* first (red velvet curtains parting, accordion, jazz, the red windmill turning), then the visitor arrives at the Kiki homepage.

**The wing is the only fully immersive marquee wing on the platform.** It's built for Kiki's existing super-fan audience — they may or may not be art buyers; they're arriving for *Kiki*. NVAI monetises across multiple low-ticket products without forcing them into the painting funnel.

### Components (locked):

**The Exposé** — 220-page eBook by Jana Misho, $65. The literary anchor. 700+ curated research links. The 34-page narrative anchor is the **discovery of the Kiki–Modigliani relationship lost for 107 years**, supported by a Modigliani painting in the NVAI inventory (Nu couché aux bras levés, 1916). Needs the luxury redesign treatment — currently a 220-page black-and-magenta PDF; should be: leather-bound cover (gold embossing), Certificate of Authenticity, Collector's Edition branding, 3D book preview on the wing landing page.

**The Audiobook** — ElevenLabs narration, period-appropriate French-accented English voice, accompanying picture book to follow along page-by-page.

**KISP (Kiki Supplement Pages)** — weekly subscription product. Newly-uncovered rare photos, video clips, personal anecdotes. Subscriber long-tail engagement. First KISP sent automatically with the eBook order.

**Modigliani Commemorative Poster** — 36" × 24", standalone merch product. First 10,000 copies. **Critical: this is a Kiki-wing product, NOT a link to the Modigliani for-sale page.** The wing is not a funnel for the painting — the painting can be referenced narratively as part of the lost-relationship story, but the wing does not commercialise the Modigliani sale.

**Private YouTube channel** — exclusive link sent with each eBook order. 24-hour streaming access to rare Kiki film footage, animations, period interviews. Many films from the 1920s where Kiki was uncredited (Man Ray and other directors left her off the films' credits).

**Lingerie collection** — curated cultural reference to the existing Kiki de Montparnasse luxury lingerie brand (which is real — Kiki's likeness inspired the brand). Display-only. We don't manufacture lingerie; we curate as cultural context.

**Burlesque performance videos** — atmospheric wing content. AI-generated period burlesque dance footage in the Moulin Rouge aesthetic. Already produced (`kiki_burlesque_performance_5k_*.mp4`). Used as wing atmosphere and pre-room entrance experience.

**Movie Kickstarter** — crowdfunding for the feature-length Kiki film. Pledge levels, progress bar, supporter wall, donor inscription tiers. Existing `KikiFilmCrowdfunding.tsx` component is the right idea; needs luxury treatment.

**The Short Film teaser** — 90-second blockbuster-style movie preview. Treatment:
- Opening (10s): Montparnasse 1920s dusk-to-night, accordion, distant cabaret laughter. Title card: *"In an age larger than life…"* in Didot, gold-on-black.
- Establishing montage (10s): Hemingway at a typewriter cigarette burning, Modigliani at an easel, Kiki's silhouette walking past a Rotonde café table. Camera holds on each face just long enough to feel the weight.
- The Moulin Rouge sequence (25s): the *A Star Is Born* moment — Kiki on stage dancing, the room is jazz / smoke / red velvet, Modigliani is in the audience locked in, the camera holds on his face the way Bradley Cooper's frame holds on Gaga. She sees him see her. The cut to her face is the love story.
- The secret love story (20s): short fragments. Dinner at the Hôtel des Artistes with the lost-generation crew (use the existing still photo). Two of them at a table alone. Walking the Seine. A door closing behind them.
- The painting (15s): the studio, candle and oil lamp light, Kiki being painted. Composition implies the nude pose; camera never shows nudity. Framing is Modigliani's eyes, then her face, then his hand on the canvas. They are locked in.
- Title card (5s): *"A century later, their story is finally told."*
- CTA card (10s): two options — *"Help bring this feature film to life"* (Kickstarter) OR *"Read the full story"* (exposé). Soft fade, gold rule, IBM Plex Mono.

Production: Higgsfield generation, ElevenLabs voiceover where needed. Style references: *A Star Is Born* (Cooper/Gaga cabaret scene), *Midnight in Paris* (the lost-generation backdrop), *Phantom Thread* (period restraint and candlelit interiors), *Marie Antoinette* (sound design and intimacy). Period jazz licensing required per cue.

**Guest book** — public visitor messages, viewable to all. Builds community signal.

**Charity** — 10% of every Kiki sale donated in Kiki's honour. Donor wall in the wing. Specific charities curated (several in Montparnasse).

### Kiki revenue model

- Cut on every eBook sale ($65 price point)
- Cut on every audiobook sale
- Cut on every KISP subscription
- Cut on every Commemorative Poster
- Cut on every lingerie product sold through the wing (curated upsells)
- Cut on every Kickstarter pledge for the feature film
- 10% of each transaction goes to charity in Kiki's name

The Kiki wing is the platform's audience-acquisition engine — captures the 1M+ super-fan audience at a low-ticket entry, builds long-tail engagement (KISP, YouTube, Kickstarter), and converts a small fraction into NVAI gallery buyers over time.

---

## 10. Tech stack — the migration target

**Frontend:** Next.js 16 App Router, React 19, Tailwind v4, deployed on Vercel (Fluid Compute). Replaces the current Vite SPA.

**Video CDN:** Cloudflare Stream or Mux for 5K adaptive bitrate streaming (HLS / DASH). Replaces direct S3 hosting.

**Database:** Supabase Postgres (managed). Single source of truth for paintings, wings, videos, DDNDA signatures, sales, Kiki subscriptions, guest book.

**AI integrations:**
- **Claude** (Anthropic) — Bernard's brain (curatorial, transactional, tutorial modes)
- **Grok** (xAI) — research depth
- **Higgsfield** — all video generation (room videos, Kiki short film, marketing)
- **ElevenLabs** — all audio (Bernard's voice, audiobook, ambient soundscapes)
- **Stripe Connect** — marketplace mechanics, payments, escrow on sale transactions
- **Dropbox Sign** (or Adobe Sign) — DDNDA legal infrastructure behind a custom visual veneer
- **Plaid** — Phase 2 auction KYC / proof of liquidity

**Auth:** Supabase Auth (admin login + buyer accounts).

**Admin console:** authenticated curator UI — video repository manager, drag-and-drop painting upload, per-wing CRUD, painting metadata editing. Needed in Phase 1 so we can add new paintings without redeploys.

**Carousel rule (locked):** carousel is used ONLY in the Full Gallery. Individual artist rooms hang paintings on the walls in period frames — no carousel inside dedicated wings.

---

## 11. Production needs

**Higgsfield videos to generate or update:**
- Grounds arrival (transitional walk from patio onto the expansive property)
- **Monet's Giverny — 30-second expansive showcase** (the platform's grandest cinematic moment)
- Grand Hall (1920s ballroom / invite-only gallery opening / period dress / possibly a dancing moment)
- The Parlor (La Ruche bohemian bar, samovar, green patina copper, Russian-Jewish character)
- The Kiki Short Film teaser (90 seconds, blockbuster style — full treatment in Section 9)

**Existing wing backdrops:** complete (Phase 3.5 in the previous todo). Need to be audited for quality and re-encoded for the production CDN.

**ElevenLabs audio:**
- Bernard's voice (curatorial, transactional, tutorial — three modes, one consistent voice)
- Kiki audiobook narration (period French-accented English)
- Ambient soundscapes per room (Russian samovar+Vertinsky for La Ruche, Schoenberg quartet for Kandinsky, Gregorian chant + bells for Bernard's chapel, etc.)
- Kiki short film voiceover (sparse)

**Photography / stills:**
- High-res images of all 25 paintings (already in process via the Prague gallery)
- Period frame catalog (`frames.json` config keyed by artist/era — Italian gilded cassetta for the Picassos/Chagalls, Renaissance tabernacle for Da Vinci/Raphael, restrained gilded for Monet/Matisse/Kandinsky, Mexican folk-influenced for Kahlo)
- Existing reference still photos (Hôtel des Artistes, Modigliani-Kiki context, Man Ray, Brassaï)

---

## 12. Phase 1 vs Phase 2

**Phase 1 ship target:** the gallery is browsable, the DDNDA gates work, Bernard is wired, the Kiki wing is live with the $65 exposé and audiobook selling, every painting can be inquired upon via Bernard. Auction House is built into the architecture but the auction *features* (live bidding, encrypted invitations, KYC) are stubbed.

- All 11 spatial destinations live (Kiki / Foyer-Welcome / 3 upstairs rooms / Parlor / Matisse / 4 grounds wings / Grand Hall with Auction House placeholder + Modigliani Cabinet + Full Gallery)
- DDNDA flow end-to-end (Dropbox Sign integration, signature recorded)
- Bernard concierge wired (Claude API, voice via ElevenLabs)
- Kiki eBook + audiobook + KISP + commemorative poster on sale via Stripe
- Kiki Kickstarter live
- Kiki short film teaser produced and embedded
- Full Gallery carousel functional with all 25 pieces
- Stripe Connect for direct sale (Bernard-mediated, with manual founder approval per buyer-facing comms per our standing policy)
- Admin console MVP — add/edit paintings, swap video assets, edit wing metadata

**Phase 2:** Auctions go live.
- Encrypted invitation system
- Plaid KYC + Stripe escrow proof of liquidity
- Live bidding with video conferencing (room-by-room or in-Auction-House)
- Paddle numbers
- Auction Box VIP fulfilment (wine + catalog + paddle + concierge delivery)
- NVAI Black Card (Stripe Issuing — was cut earlier; reconsider for Phase 2 if it earns its keep)
- Press / news section (could be Phase 1 if simple — single-page institute updates)

---

## 13. Revenue model

- **1% success fee on every painting sale** across the platform (this is the killer line on a $1B+ collection — even one painting sold per quarter is real money)
- **Cut on every Kiki product** sold through the wing (exposé, audiobook, KISP, poster, lingerie, Kickstarter pledge)
- **Auction buyer's premium** when Phase 2 auctions run
- **Merch** through the Foyer LEFT shop (NVAI catalogs, fine-art prints, scarves, stationery, Villa Monticello vineyard wine)
- **Stripe processing fees** are vendor cost; we pass through

No subscription. No membership fee. No platform fee to buyers beyond payment processing. The Kiki audience pays for content; the gallery buyers pay only for what they buy.

---

## 14. What I need from you

Richard — what I'm asking for in this brief:

1. **Read CONTEXT.md** (the canonical glossary) and the cinematic-luxury audit. Both are at `C:\Users\sgill\nvai\docs\`. The audit catches anti-patterns currently in the Manus reference code that need fixing in the port — surgical, not structural.
2. **Sign off on the migration off Manus.** Targets in Section 10. If you push back on any of them, let's talk it through.
3. **Confirm the build sequencing** in Section 12. Phase 1 ships the gallery + Kiki + DDNDA + Bernard. Phase 2 ships auctions.
4. **Help me staff this.** I can drive the architecture, Bernard's voice, Kiki's content, and the founder-side decisions. I need: a Next.js / Vercel lead developer (full-time), a video editor / motion designer who can take Higgsfield output and finish to cinematic polish, and a designer to do the Kiki eBook luxury redesign (leather-bound, Certificate of Authenticity, Collector's Edition).
5. **Resource the Phase 2 auction infrastructure planning.** Christie's-tier auction is a real build — encrypted invitations, KYC integration, live video, the Auction Box fulfilment operation. We should start the vendor conversations now even though it's Phase 2.

Open conversations I want to have with you in person, not via brief:
- Pricing strategy on individual paintings (post-DDNDA, who sees the number, how negotiation runs)
- Prague gallery contract details (representation terms, exclusivity, commission split with them)
- Bernard's "voice" — the brand of the concierge. We've been working from a placeholder. Worth one focused session to nail down.

Tagline candidates: still open. Current placeholder.

---

*— Sean*
