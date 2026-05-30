# Video generation queue — Higgsfield

Videos required for the platform that have not yet been produced. Each entry is a single Higgsfield generation, prompt-ready, with the destination path and which page references it. Once a clip is generated and saved to the destination path, no code change is required — the routes already point at these filenames.

## Status

- Higgsfield CLI is currently broken on this workstation (npm package's vendored binary tarball is corrupted). Either reinstall via `npm install -g @higgsfield/cli --force` or run the generations from a different machine and drop the MP4s into `frontend/public/videos/` at the destination paths below.

---

## 1) Kiki Moulin Rouge — 1920s period-dressed crowd (replaces current Kiki page lead-in)

**Destination:** `frontend/public/videos/nvai_kiki_moulin_rouge_5k_v2_periodcrowd.mp4`
**Replaces:** `nvai_kiki_moulin_rouge_5k.mp4` (current crowd is not period-dressed)
**Used by:** `/kiki` page lead-in (the MarqueeLeadIn component), and the *Tonight Only* freeze card after.
**Aspect ratio:** 21:9 cinematic
**Duration:** 15s loop
**Model:** Seedance 2.0 (text-to-video)

**Prompt:**

> Cinematic exterior shot of the Moulin Rouge cabaret in Paris, 1924, dusk approaching night. The red windmill on top illuminated by warm electric bulbs. The street in front packed with a 1920s period-dressed crowd: men in tuxedos and top hats, women in beaded flapper dresses, fringe, long pearl necklaces, feather headbands, ostrich-feather boas, drop-waist silhouettes. Gas-lit lanterns along the boulevard. A liveried doorman in red coat at the entrance under the canopy. Vintage Citroëns and a horse-drawn carriage waiting at the curb. Cigarette smoke. Champagne flutes glinting. The crowd moving in slow elegant flow toward the entrance. Style: warm 1970s film stock, slight grain, Brassaï night-photography reference, Pernod-amber tone. Cinematic 21:9 aspect. 15-second loop, soft golden light spilling from the doorway. No modern elements.

---

## 2) Grand Ballroom — the *pièce de résistance*

**Destination:** `frontend/public/videos/nvai_grand_ballroom_5k.mp4`
**Replaces:** Currently the Grand Hall uses a stand-in sequence of grand-foyer + Rome-Vatican + courtyard videos.
**Used by:** `/grand-hall` lead-in.
**Aspect ratio:** 21:9 cinematic
**Duration:** 15s loop
**Model:** Seedance 2.0 (text-to-video) or Cinema Studio Video 3.0 for highest fidelity

**Prompt:**

> Period French chateau Grand Ballroom interior, 1920s, candlelit. Crystal chandeliers blazing low. Parquet de Versailles flooring polished to a mirror. Gilded boiserie walls, tall gold-framed mirrors, red velvet drapes tied with gold cord at the tall French windows. A double row of round dining tables set with white linen, gold candelabra, and centerpieces of cream roses runs the length of the room. Period-dressed couples — men in white tie and tails, women in long beaded gowns and elbow gloves — moving slowly through the room in conversation. A string quartet on a small raised dais in the corner. Cigar smoke and champagne. The light is warm, amber, Pernod-tone — entirely candlelit, no overhead electric. Camera is a slow dolly down the length of the room from one end to the other. Style: warm 1970s film stock, slight grain, the interior register of Phantom Thread crossed with The Age of Innocence. Cinematic 21:9 aspect. 15-second loop. No modern elements.

---

## 3) Upstairs Gathering Space — billiards room / private salon

**Destination:** `frontend/public/videos/nvai_upstairs_salon_5k.mp4`
**Replaces:** Currently using `nvai_foyer_landing_handshot_5k.mp4` as a stand-in.
**Used by:** `/foyer/staircase` page.
**Aspect ratio:** 16:9
**Duration:** 12s loop
**Model:** Seedance 2.0

**Prompt:**

> Period French chateau upstairs gathering space — half billiards room, half private salon. Burgundy leather club chairs around a low marble-topped table set with crystal cognac glasses and a humidor. A full-size mahogany billiards table center-room with green felt, brass corner sconces lit, a single cue resting on the rail. Floor-to-ceiling bookshelves with old leather-bound volumes line two walls. A large fireplace with a marble surround at the far end, embers glowing. Heavy red velvet drapes drawn against the windows. The room is empty of people. A single phonograph plays Cole Porter in the background (visually only — small horn phonograph on a side table). Warm candle-and-fire light, painterly, the register of a 1925 Country House Library photograph. Camera is a slow pan around the room. 16:9 cinematic. 12-second loop.

---

## 4) Wine Cave

**Destination:** `frontend/public/videos/nvai_wine_cave_5k.mp4`
**Replaces:** Wine cave page currently has no dedicated video.
**Used by:** `/grounds/wine-cave` (and folded into the Grounds compiled rotation).
**Aspect ratio:** 21:9 cinematic
**Duration:** 12s loop
**Model:** Seedance 2.0

**Prompt:**

> A 19th-century wine cave dug into the hillside under a Napa Valley French chateau. Stone arches and a vaulted ceiling. Two hundred oak barrels stacked floor to ceiling along both walls, each chalk-marked with a vintage and a varietal. A long oak tasting table down the center set with rows of crystal Burgundy and Bordeaux glasses, brass candleholders, a small platter of charcuterie and a brick of Comté. Iron sconces holding lit beeswax candles every few meters — the only light source. Cool damp stone, slight cellar mist. The cave extends back into darkness; the eye cannot find the end of it. Camera is a slow tracking shot moving down the central aisle past the barrels toward the candles in the distance. Style: warm Pernod-amber tone over cool stone, Phantom Thread cellar register, the candlelit interior register of a Caravaggio. 21:9 cinematic. 12-second loop. No people.

---

## 5) The Parlor — La Ruche bohemian bar

**Destination:** `frontend/public/videos/nvai_parlor_la_ruche_5k.mp4`
**Replaces:** Currently using `nvai_chagall_studio_5k.mp4` as a stand-in.
**Used by:** `/parlor` page (the Chagall sub-room at `/parlor/chagall` already has its own dedicated video).
**Aspect ratio:** 16:9
**Duration:** 12s loop
**Model:** Seedance 2.0

**Prompt:**

> The bohemian bar of *La Ruche,* the Paris artist colony, 1925, after midnight. A small low-ceilinged room with worn velvet banquettes along one wall and mismatched Thonet bentwood chairs around small round marble café tables. Faded Yiddish posters peeling on the brick walls. A long bar of oxidized copper that has gone green with time, behind which the bartender wipes a glass. A phonograph in the corner playing Alexander Vertinsky in Russian, low under conversation. A samovar steaming on a side table. Cigarette smoke. Half-finished glasses of Pernod and absinthe on the tables. The room is mostly empty — three or four bohemian patrons at the bar in soft conversation, period-dressed in shabby velvet jackets and loose blouses. The light is from candle stubs and a single hanging brass lamp — warm, amber, Pernod-tone. Camera is a slow drift through the room toward the copper bar. Style: warm 1970s film stock, slight grain, the interior register of Brassaï's *Paris by Night.* 16:9 cinematic. 12-second loop.

---

## How to run these when the CLI is working

```bash
# After reinstalling: npm install -g @higgsfield/cli --force
# And authenticating: higgsfield auth login

# Single video — generate and wait
higgsfield generate create seedance_2_0 \
  --prompt "$(cat <<'EOF'
[paste the prompt from above]
EOF
)" \
  --duration 15 \
  --aspect_ratio 21:9 \
  --wait

# The CLI prints the result URL when done. Download with curl and save to the destination path.
```

Cinema Studio Video 3.0 for the Grand Ballroom (highest-fidelity) if budget allows; Seedance 2.0 for the others.

---

*Queued by Sean Gilmore / AI collaboration on 30 May 2026. Logged in repo for execution when CLI is restored.*
