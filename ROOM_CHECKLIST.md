# NVAI Room-by-Room Build Checklist

**Working doc. Update as work completes. Each room deploys when its checklist is fully checked.**

Last updated: 2026-05-31. Live URL: https://napavalleyartinstitut.com

---

## Conventions

- `[ ]` = open / not done
- `[x]` = done and live in production
- `[~]` = in progress / partial
- `[?]` = blocked — needs decision or asset from Sean
- Each room: when ALL items are `[x]`, run deploy → alias → verify → mark room **🟢 SHIPPED**

---

## 🏠 HOME `/` — **🟢 SHIPPED-ish (tombstones shrunk this commit)**

- [x] Drone aerial backdrop at 0.25x playback
- [x] NVAI logo top-left
- [x] Three marble tombstones (Kiki / Foyer / Garden)
- [x] Tombstones SHRUNK (max-w-3xl + aspect 2/3, ~60% smaller)
- [x] Tagline at bottom
- [x] Essentials Bar
- [ ] Letter from Richard placement (waiting on read of Open Letter PDF)
- [ ] Verify load speed feels right after compression + lazy-load

---

## 🎩 KIKI WING `/kiki` — **🟢 SHIPPED (autoplay videos killed)**

- [x] MarqueeLeadIn removed (no autoplay 6sec moulin-rouge intro)
- [x] WingLayout backdrop video removed (no autoplay 1min dance backdrop)
- [x] Scrapbook background with archival photos at low opacity
- [x] Click-to-play 45sec Moulin Rouge teaser + 1min dance (no autoplay)
- [x] Audiobook callout
- [ ] Historical Kiki photo scrapbook extracted from Exposé PDF via pdfimages
- [ ] Decide: is the Kiki immersive piece (`WONDERLAND` 6-beat digital shot) on /kiki or /wonderland?

---

## 🖼 GALLERY `/gallery` — **🔴 NOT SHIPPED**

Per Sean's notes:
- [ ] 90-second gallery video backdrop / lead-in (needs Higgsfield generation: `nvai_gallery_walkaround_90s.mp4`)
- [ ] Image inventory pass — 5 paintings still missing images:
  - [ ] `modigliani-nu-couche`
  - [ ] `modigliani-ritratto-di-donna`
  - [ ] `modigliani-cheron`
  - [ ] `kandinsky-composition-russian`
  - [ ] `pollock-number-1-1950`
- [ ] Period-sized frames for current images (Meshy generation)
- [ ] 2-3 AI-rendered presentation versions per painting (Meshy)
- [ ] NO circular suspended rotation (current carousel approach) — Sean explicit
- [ ] Gallery hall elevation — make it the *crown room* (per Sean: "if rooms and grounds are amazing the gallery needs to be better")

---

## 🏛 GRAND HALL / AUCTION HOUSE `/grand-hall` — **🔴 NOT SHIPPED**

- [ ] **Period dancing ballroom lead-in** (Higgsfield: `nvai_grand_ballroom_renaissance_60s.mp4` — Count of Monte Cristo arrival, Visconti's Il Gattopardo waltz, 500-candle chandeliers)
- [ ] Wire `HALL_LEAD_IN` at line 14 to the new ballroom video
- [ ] Auction house elevation — Sotheby's-tier presentation
- [ ] Remove placeholder note at line 237-239

---

## 🎨 MODI CABINET `/grand-hall/modigliani` — **🔴 NOT SHIPPED**

- [ ] Wire the 3 Modigliani artist renderings (real + restoration + framed) onto the centerpiece display
- [ ] Wire the 3 Restellini unveiling photos (3-19-2026) as documentary strip
- [ ] Section 1 video: replace `milan-court` (Renaissance, wrong) with Modi-appropriate
- [ ] Connect to Kiki wing (mutual links — Modi painting IS Kiki)

---

## 💧 MONET WING `/grounds/monet` — **🟢 SHIPPED (videos fixed)**

- [x] Section 1: `nvai_monet_secret_garden_5k` (Monet)
- [x] Section 2 (Twilight): swapped from `nvai_courtyard` to `nvai_monet_secret_garden`
- [x] Section 3 (Rolling Hills): swapped from `nvai_aerial_drone` to `nvai_garden_path_continuous`
- [x] Section 4: `nvai_garden_passage`
- [ ] Custom 30-second Giverny lead-in via Higgsfield (per page comment line 138-139)

---

## 🎭 POLLOCK `/grand-hall/pollock` — **🔴 NOT SHIPPED**

- [ ] **NO Pollock-specific videos exist** — currently uses shared abstract videos (`nature-geometry`, `studio-revolution`, `abstract-harmony`) borrowed from Kandinsky
- [ ] Generate `nvai_pollock_springs_studio_5k.mp4` (Hans Namuth 1950 reference, East Hampton barn, raking light, wet enamel on canvas)
- [ ] Generate companion `nvai_pollock_drip_closeup_5k.mp4` (120fps macro of enamel drip)
- [ ] Replace 4 video references in `app/grand-hall/pollock/page.tsx` lines 16-47
- [ ] Add image for `pollock-number-1-1950` (currently no imageUrl)

---

## 🎨 OTHER ARTIST ROOMS

### `/parlor/chagall` — **🟡 needs review**
- [x] 7 Chagall paintings with images
- [x] Wing video map seems coherent (Vitebsk → Paris → Moscow → Côte d'Azur)
- [ ] Add custom Chagall studio lead-in

### `/grounds/davinci` — **🟡 needs review**
- [x] DaVinci Lady with a Fur image (compressed 6.4MB → 770KB)
- [ ] Single piece in wing — could expand or keep intimate

### `/grounds/picasso/*` — **🟡 needs review**
- [x] 8 Picasso paintings with images (Bateau-Lavoir / Boisgeloup / Mougins periods)
- [ ] Per-period sub-pages may need polish

### `/grounds/frida` — **🟡 needs review**
- [x] Frida Kahlo Mesa Herida image
- [ ] Single piece

### `/upstairs/raphael` — **🟡 needs review**
- [x] Raphael Madonna with Child image
- [ ] Holy Family image is on disk but no slug exists in `paintings.ts` — could add

### `/upstairs/kandinsky` — **🟡 needs review**
- [x] Composition 1910 image
- [ ] `kandinsky-composition-russian` still missing image

### `/upstairs/bernard` — **🟡 needs review**
- [x] Bernard La Passion image (compressed 2.5MB → 637KB)
- [ ] Wing videos use florence-workshop / rome-vatican — Bernard is post-Impressionist/Pont-Aven, may not fit

### `/matisse` — **🟡 needs review**
- [x] Woman with Child image
- [ ] Single piece in wing — could expand

---

## 🚪 DDNDA `/ddnda` — **🔴 BACKEND NOT WIRED**

- [ ] Dropbox Sign API integration
- [ ] Update DDNDA template to Kris Wood version (latest signed)
- [ ] Form submission → API → Dropbox Sign → callback to grant access

---

## 🎙 BERNARD CONCIERGE — **🔴 BACKEND NOT WIRED**

- [ ] Anthropic API integration
- [ ] ElevenLabs voice integration
- [ ] Conversation state persistence

---

## 💳 ESCROW / CHECKOUT — **🔴 BACKEND NOT WIRED**

- [ ] Stripe integration
- [ ] Per Sean's earlier audit: escrow originally cut from scope, then per doc 66 added back as interactive feature
- [ ] **Decision needed:** is Escrow & Lending actually being built or is it visual only?

---

## 🎬 WONDERLAND digital shot `/wonderland` (or `/kiki/wonderland`) — **🔴 NOT STARTED**

The 6-beat cinematic immersive piece:
- [ ] Beat 1: Kiki dances (the Jockey, 1925)
- [ ] Beat 2: The sitting (Modi's studio, 1917 — sexual rendering of the painting being made)
- [ ] Beat 3: Them having fun together (Chez Rosalie / Dôme / Rotonde)
- [ ] Beat 4: The Lost Boys (Foujita, Soutine, Kisling, Cocteau, Picasso, Hemingway)
- [ ] Beat 5: Modi dies (1920)
- [ ] Beat 6: Kiki dies (1953, Foujita alone at burial)
- [ ] Higgsfield video generation per beat
- [ ] ElevenLabs Bernard narration script
- [ ] Stitched into single 5-10 min immersive at `/wonderland`

---

## 🔌 BACKEND (FastAPI) — **🔴 NOT DEPLOYED**

- [ ] Deploy backend (decision: Supabase Edge Functions vs Vercel Python serverless vs Render)
- [ ] Wire all API integrations (Anthropic, ElevenLabs, Higgsfield, Stripe, Dropbox Sign, Supabase, Meshy, Porkbun)
- [ ] Update next.config.js rewrite from `127.0.0.1:8200` to production backend URL

---

## 📋 DEPLOYMENT DISCIPLINE

When a room's checklist is complete:
1. `git add` only that room's changed files
2. Commit with `Room SHIPPED: {room-name}` message
3. `vercel deploy --prod --yes` from `frontend/`
4. `vercel alias set {new-deploy-url} napavalleyartinstitut.com`
5. `vercel alias set {new-deploy-url} www.napavalleyartinstitut.com`
6. curl-verify the room URL serves the change
7. Mark room **🟢 SHIPPED** in this doc and commit the doc update

---

*This file is the single source of truth for room status. When in doubt, check here.*
