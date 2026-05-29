# NVAI — Domain Glossary

> Canonical meaning of domain terms used across the NVAI platform.
> Glossary only — not a spec, not a task list, not an architecture document.
> Implementation belongs in code; architectural decisions belong in `docs/adr/`; audit findings belong in `docs/audit/`.

---

## NVAI (Napa Valley Art Institut)

An ultra-luxury cinematic immersive digital gallery selling 27 fine art paintings (the original 25 plus two newly added Jackson Pollocks). The visitor experience is set on the grounds of Villa Monticello, a Tuscan-style French chateau in Napa Valley. NVAI represents the works under exclusive contract from a Prague gallery that handles authentication. Private-sale gallery — not an auction house with public catalogues, not a blockchain protocol, not a third-party consignment marketplace.

**Production domain:** `napavalleyartinstitut.com` (French spelling — *institut*, no trailing 'e'). Robots blocked from indexing until the DDNDA flow is final.

## Villa Monticello

The physical property. 33-acre Tuscan-inspired estate in Napa Valley surrounded by vineyards. Castle stone construction, resort-style grounds, 4,500+ sq ft outdoor space, capacity for 200 guests. The digital gallery mirrors the physical property's layout.

## The Collection

25 active works across 10 master artists plus the Kiki marquee narrative. Picasso 8 active (11 listed, 3 SOLD), Chagall 6, Modigliani 3 active (4 listed, 1 SOLD), Da Vinci 1, Raphael 1 active (2 listed, 1 SOLD), Monet 1, Matisse 1, Kandinsky 2, Kahlo 1, Bernard (Émile) 1. Total portfolio value exceeds $1 billion. Authenticated and provenanced by the Prague gallery. Full provenance available only after DDNDA signing.

## The Prague Gallery

The authentication and provenance partner. They handle scholarly authentication — NVAI does not make authenticity representations. NVAI provides the cinematic platform; the Prague gallery provides the expert opinion.

---

## Home Page

Aerial pan-out shot of the chateau. Three marble tombstones offer the primary cinematic decision:

- **LEFT → Kiki** — the Moulin Rouge cabaret scene plays outside, then leads to the [[Kiki Wing]] homepage
- **CENTER → Foyer** — cinematic zoom into the chateau door (see [[Foyer]])
- **RIGHT → Secret Garden** — the pathway walk video to the [[Garden Party]] patio

Plus persistent [[Essentials Tabs]] (non-cinematic utility layer).

## Essentials Tabs

Persistent home-page utility navigation. Five tabs:

- **Vault** — escrow, lending, DDNDA, KYC, proof of liquidity
- **Auction** — events calendar, register interest, past results
- **Inquire** — direct Bernard concierge contact
- **Account** — buyer profile, signed DDNDA, purchase history, saved pieces
- **Cart** — Kiki exposé, audiobook, merch, Kickstarter pledges

## Foyer

Front entry vestibule reached from Home CENTER via cinematic zoom into the chateau door. Three choices:

- **LEFT → Guestbook · About NVAI · Merch** — every guest interacts here; captures emails, presents the institute, sells merch (Kiki Commemorative Poster, NVAI catalogs, fine-art prints, NVAI scarf/tote/stationery, Villa Monticello vineyard wine)
- **CENTER → Staircase** — cinematic climb to the upstairs landing (see [[Staircase Landing]])
- **RIGHT → Full Gallery** — direct shortcut to the 24-piece catalog. Lets a guest browse without taking the curated tour (see [[Full Gallery]])

## Staircase Landing

Upstairs vestibule reached from Foyer CENTER. Three doors:

- **LEFT → Bernard "Russian Enchantment" chapel** — Émile Bernard's late religious altarpiece *La Passion de Jésus-Christ* (c.1926–40, 290×193 cm) displayed in a Russian-Orthodox-inspired chapel — icons, gold backdrops, candle and beeswax, hieratic light. Bernard is French (Pont-Aven School), but his late religious work has real visual overlap with Russian icon painting; the room's aesthetic theme rather than the artist's biography.
- **CENTER → Kandinsky "the creepy room"** — Bauhaus geometric salon. Pure primary colors as flat fields, dissonant Schoenberg-quartet audio bed, no figurative anchor. The room vibrates. Holds 2 Kandinsky pieces.
- **RIGHT → Raphael Renaissance studiolo** — Florentine workshop aesthetic. Arched windows, classical sculptures, easels, anatomical sketches, natural Tuscan light. Holds Raphael's *Madonna with Child* (1500–10).

## Full Gallery

24-piece catalog carousel. Reached two ways: directly from Foyer RIGHT (shortcut), or via the Grand Hall LEFT (after the curated tour). Uses [[The Carousel]] interaction — slow rotation, stop on a piece, period-frame load, full-frame Met-display. Single canonical location where every painting in the collection can be browsed.

## The Carousel

The canonical "stop and display" interaction pattern.

1. Default: paintings rotate slowly at reading pace
2. Stop: visitor halts the carousel on a specific piece; rotation halts smoothly
3. Frame load: the piece loads in its period-appropriate frame (from `frames.json`)
4. Full-frame display: painting expands to museum-grade single-piece view — bottom-lit, ambient audio swells, all other UI fades, "as though on display at the Met"
5. Exit: tap outside, escape, or custom back-gesture

**Used in the Full Gallery only.** Individual artist rooms do NOT use the carousel — paintings hang on the walls in period frames, ambient to the room's aesthetic. The carousel is the catalog/index interaction; individual rooms are the immersive experiences.

## Secret Garden

The cinematic pathway walk video reached from Home RIGHT. Transit, not destination — a slow walk along the chateau's garden pathway (wisteria, vineyard glimpses, oak shadows, golden hour). Leads to [[Garden Party]].

## Garden Party

The patio destination reached at the end of the Secret Garden walk. Tuscany-inspired, vineyard views, golden-hour light. Where guests are invited. Three choices:

- **LEFT → The Parlor** — bohemian bar leading back inside (see [[The Parlor]])
- **CENTER → Matisse Mediterranean pavilion** — the patio's identity; the Tuscany-inspired vineyard views *are* Matisse's Riviera (see [[Matisse Pavilion]])
- **RIGHT → The Grounds** — out to the expansive property (see [[The Grounds]])

## The Parlor

La Ruche-themed bohemian gathering bar. Reached from Patio LEFT; functions as the transition space from outdoor patio back into the chateau interior (continues inside to the [[Grand Hall]]).

La Ruche ("The Beehive") was the real Montparnasse artists' colony where Marc Chagall lived 1911–14 alongside Modigliani, Léger, Soutine, Brancusi. Russian-Jewish bohemian character.

**Aesthetic:** worn velvet banquettes, mismatched Thonet chairs, green patina copper (oxidized sconces, samovar fittings, bar trim), stained-glass color refractions in the windows, a Russian samovar steaming in the corner, a phonograph playing Vertinsky, Yiddish posters peeling on the walls, a dusty unplayed violin propped against a chair. Bar serves absinthe, Pernod, vodka, Russian black tea.

**Holds:** Chagall's 6 active pieces, hung on the walls.

## Matisse Pavilion

Mediterranean studio aesthetic — Côte d'Azur light, vineyard hills, dappled sun, warm stone. The Tuscany-inspired patio view *is* Matisse's Riviera; putting him here is an identification, not just a placement. Holds *Woman with Child*.

## The Grounds

The expansive property beyond the patio. Reached from Patio RIGHT. Houses the outbuildings — workshops, guest house, gardens. Four destinations:

- **Monet's Giverny** — 30-second expansive cinematic lead-in (the platform's grandest moment). Lily pond, Japanese bridge, wisteria, iris paths, conservation lab pivot. Holds *La berge de Lavacourt sous la neige* (1879).
- **Picasso Compound** — single outbuilding on the grounds with three connecting period sub-rooms inside (Bateau-Lavoir 1901 Blue Period / Boisgeloup 1934–49 / Mougins 1965–67 late). Holds 8 active Picasso pieces.
- **Da Vinci Workshop** — Renaissance polymath studio outbuilding. Holds *Lady with a Fur* (1495–99).
- **Frida Casa Azul guest house** — cobalt-blue Mexican folk-art sanctuary. Holds *La Mesa Herida* (1939–40).

## Grand Hall

The chateau's interior spine and the fitting end of the curated tour. 1920s lavish ballroom aesthetic — invite-only gallery opening with period dress, possibly a ballroom moment with people dancing or gathering as they wait to enter the gallery. Reached from the Parlor (interior continuation from Patio LEFT) or from the Foyer (forward through the chateau). Four positions:

- **LEFT → Full Gallery** — circle of all 25 works browsable (see [[Full Gallery]])
- **CENTER-LEFT → Auction House** — see [[Auction House]]
- **CENTER → Modigliani's Cabinet de Curiosités** — see [[Modigliani Cabinet]]
- **RIGHT → Exit back to Foyer** — loop close, departure path

## Auction House

The auction-event room within the Grand Hall. Supports two formats:

- **Private invite-only auctions** of individual pieces — small, NDA-required, intimate
- **Full Christie's-scale auctions** — public-facing live bidding events with period-dress reception

**Feature set:** video conferencing for remote bidders, live "Bid" button for in-event bidding, VIP concierge food ordering (curated meal service during auctions).

**Coming back into scope** (must reinstate; were cut earlier): encrypted invitations to events, proof of liquidity / KYC (Plaid + Stripe escrow), paddle numbers, the Auction Box physical delivery for VIP bidders. Phase 2 of the platform.

## Modigliani Cabinet de Curiosités

The intimate discovery room at the Grand Hall's center position. Period-authentic French chateau curiosity cabinet — small intimate room with glass-front display cases, African and Oceanic masks (the source of Modigliani's elongated-face style), mineral specimens, a leather-bound naturalist folio, deep velvet walls, candlelight. Three Modigliani portraits hang between the display cabinets. Featured prominently because of the Kiki narrative connection — the lost-relationship discovery is the platform's strongest cinematic story arc.

## The Kiki Wing

The only fully immersive marquee wing, reached from Home LEFT after the Moulin Rouge cabaret scene plays outside. Built for Kiki's 1M+ super-fans worldwide — they are not necessarily art buyers; they arrive for Kiki. NVAI monetises across multiple low-ticket products.

**Components (locked):**

- **The Exposé** — 220-page eBook by Jana Misho, $65. Needs leather-bound luxury redesign (Crane Lettra cover, gold embossing, Certificate of Authenticity, Collector's Edition branding).
- **Audiobook** — ElevenLabs narration, period-appropriate French-accented English voice
- **KISP** (Kiki Supplement Pages) — weekly newly-uncovered material for subscribers
- **Modigliani Commemorative Poster** — 36"×24", standalone product, first 10,000 copies (NO link to the Modigliani for sale — the wing is not a funnel for the painting)
- **Private YouTube channel** — rare Kiki film, animation, interviews
- **Lingerie collection** — curated cultural reference to the existing Kiki de Montparnasse luxury brand
- **Burlesque performance videos** — wing atmosphere
- **Movie Kickstarter** — crowdfunding for the Kiki feature film
- **The Short Film teaser** — 90-second blockbuster preview (see [[Kiki Short Film]])
- **Guest book** — public visitor messages
- **Charity** — 10% of sales donated in Kiki's honour

**Locked: no for-sale link to the Modigliani painting from inside the wing.** The painting can be shown narratively (the lost-relationship 34-page anchor) but is not commercialised inside the wing. Kiki's wing is hers.

## Kiki Short Film

90-second blockbuster-style movie teaser produced for the Kiki wing. Montparnasse 1920s backdrop. Moulin Rouge sequence — Kiki dancing on stage, Modigliani locked in watching from the audience (*A Star Is Born* Bradley Cooper/Gaga frame reference). Secret love story (Hôtel des Artistes still, dinner with the lost-generation crew). The painting being made (tasteful — implied nudity, never shown). Ends with two CTA cards: *"Help bring this feature film to life"* (Kickstarter) OR *"Read the full story"* (exposé). Higgsfield generation, ElevenLabs voiceover.

## DDNDA

Document Distribution and Non-Disclosure Agreement. The single front-door gate to the Virtual Gallery App. Signed once on entry, unlocks the entire platform — full provenance documents, all wings, all pieces. Replaces any 3-tier NDA model (Viewer/Buyer/Consignor) — that complexity is unnecessary for a private-sale gallery.

**Presentation:** the DDNDA is a *room* in the cinematic journey, not a modal. Custom-tooled paper document on a marble plinth or Florentine desk. Crane Lettra texture, Didot heading, IBM Plex Mono body. Buyer signs with a calligraphic flourish; the three-path choice unlocks behind it. No `alert()` popups. No SaaS-y "Unlock" language. Button reads "Sign and Enter."

**Legal infrastructure:** Dropbox Sign or Adobe Sign behind the visual veneer. Signature recorded with timestamp, IP, user agent, and document version hash.

## Bernard

The AI concierge. Powered by Claude. Omniscient gallery curator and transaction facilitator. Voice-forward (ElevenLabs) plus text restraint. Three modes (single interface):

- **Curatorial** — provenance narratives, artist history, collection context, period explanation
- **Transactional** — buyer-interest routing, NDA flow, escrow on sale, scheduling physical viewings
- **Tutorial** — context-aware help, never intrusive, surfaces only at decision points

Bernard's presence is a fine gold typographic mark; voice activation is gestural. No chat bubble. No "Ask me anything!" tone. No avatar gimmickry.

## Revenue Model

- **1% success fee** on every painting sale across the platform
- Cut on every Kiki exposé, audiobook, KISP subscription, commemorative poster, lingerie product, and Kickstarter pledge
- Stripe Connect for marketplace mechanics
- Auction buyer's premium when auctions are running

No platform fees from buyers beyond standard payment processing. No subscription. No membership.

## AI Stack

| Service | Role |
|---------|------|
| **Claude** (Anthropic) | Bernard's brain. Curatorial narratives, transaction language, contextual help, AI-generated content scripts |
| **Grok** (xAI) | Research engine. Art history depth, biographical research, cultural context where Claude is thinner |
| **Higgsfield** | Video generation. Period backdrops, the Kiki short film, marketing content, room ambiance |
| **ElevenLabs** | Audio. Bernard's voice, audiobook narration, ambient soundscapes, voiceovers |
| **Stripe** | Money. Connect (marketplace), payments, escrow on sale transactions |
| **Dropbox Sign** or **Adobe Sign** | DDNDA legal infrastructure (visual treatment custom) |

---

## Cut from scope (do not re-add without explicit decision in `docs/adr/`)

The following were described in earlier iterations and are now out of scope:

- Industry-wide Provenance Protocol on Base L2 / IPFS
- 4-tier Ambassador Program and 25 Founding Ambassadors
- NVAI Black Card via Stripe Issuing
- OSINT verification engine (Prague gallery handles authentication)
- Per-piece Provenance Documentaries (the Kiki short film is the only film, and it is wing-specific)
- Proof of Life Sessions
- Lending against pieces as a v1 product (deferred; may revive)
- Third-party consignment marketplace (deferred)

Auctions are NOT cut — see [[Auction House]]. They returned to scope as a Phase 2 capability.
