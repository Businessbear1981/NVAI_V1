# NVAI Digital Gallery - SHOT SCHEDULE

## Master Layout Structure

### SHOT 1: HOMEPAGE (Landing Page)
**Route:** `/` (root)

**Background:**
- Aerial panned-out view of château and valley (2 miles altitude)
- Video: `nvai_foyer_aerial_static.mp4` (full page, not faded)
- Clear, beautiful, visible

**Content Overlay (on top of background):**
- Napa Valley Art Institute logo/branding (top)
- Institute letter/mission statement (center-left)
- Navigation links (top-right or header)
- "Enter the Virtual Gallery Experience" button (prominent, center-bottom)
- Space for future content additions (flexible layout)

**Key:** Content is readable and prominent, background is visible and beautiful

**Next Action:** Click "Enter Virtual Gallery" → goes to SHOT 2

---

### SHOT 2: FOYER ENTRANCE
**Route:** `/foyer`

**Background:**
- Slow pan IN from 300 yards away (ground level view)
- Video: Aerial approach video (pans in, stops at ground level)
- Château visible, welcoming

**Overlay Content:**
- Optional intro text: "Welcome to the Napa Valley Art Institute Digital Gallery"
- Three marble buttons at BOTTOM of screen (gray marble, deep black borders, headstone aesthetic):
  - LEFT: "Kiki" (arrow pointing left)
  - CENTER: "Enter the Foyer" (arrow pointing down/center)
  - RIGHT: "Garden Party" (arrow pointing right)

**Marble Button Styling:**
- 3D raised gray marble texture
- Deep black borders (like headstone etching)
- Elegant serif typography
- Positioned at bottom so full view is visible

**Navigation:**
- LEFT button → SHOT 3A (Kiki's Moulin Rouge)
- CENTER button → SHOT 4 (Grand Foyer Hub - Upstairs Artist Rooms)
- RIGHT button → SHOT 5 (Garden Party - Lead to Patio)

---

### SHOT 3A: KIKI'S MOULIN ROUGE
**Route:** `/kiki-moulin-rouge`

**Experience Flow:**
1. **Entrance:** Moulin Rouge exterior at night (neon lights)
2. **Video Lead-in:** 45-second cinematic live video of Moulin Rouge
3. **Auto-transition:** 1-minute burlesque dance performance (Kiki)
4. **Settling:** Rotating carousel of products (full-screen display):
   - Guest Book (public sign-in + entries)
   - Film Crowdfunding (pledge tracker)
   - Lingerie Collection (category filter + grid)
   - Kiki Products (Exposé, Audiobook, Archive)
   - Premium Exposé leather-bound display

**Music:** Edith Piaf-inspired sultry jazz (accordion, strings, bass)

**Back Button:** Returns to Foyer (SHOT 2)

---

### SHOT 4: GRAND FOYER HUB (Upstairs Artist Rooms)
**Route:** `/grand-foyer-hub`

**Background:**
- 5K cinematic backdrop of grand foyer/staircase

**Navigation Menu (8 Upstairs Artist Rooms):**
1. Picasso's Blue Period
2. Picasso's Cubist Workshop
3. Picasso's Later Atelier
4. Chagall's Russian Folk Studio
5. Modigliani's Montparnasse Café
6. Raphael's Renaissance Chapel
7. Kandinsky's Abstract Studio
8. Leonardo's Professional Workshop

**Each Room Contains:**
- 5K video backdrop (room-specific aesthetic)
- Artwork carousel
- Period-specific narrative
- Back button to hub

**Special Rooms:**
- **Modigliani & Kandinsky:** Include Guest Book (parlor setting)

**Back Button:** Returns to Foyer (SHOT 2)

---

### SHOT 5: GARDEN PARTY (Lead to Patio)
**Route:** `/garden-party`

**Background:**
- Beautiful patio view (like landing page)
- 5K cinematic backdrop

**Overlay Content:**
- Optional intro text about outdoor experience
- **Tile buttons at BOTTOM showing outdoor artist rooms:**
  - Da Vinci Workshop
  - Frida Kahlo Blue House
  - Monet Gardens
  - (Additional outdoor rooms as needed)

**Navigation:**
- Each tile → Corresponding outdoor artist room

**Back Button:** Returns to Foyer (SHOT 2)

---

### SHOT 6-13: OUTDOOR ARTIST ROOMS
**Routes:** `/artist-room/da-vinci`, `/artist-room/frida`, `/artist-room/monet`, etc.

**Each Room Contains:**
- 5K video backdrop (room-specific aesthetic)
- Artwork carousel
- Period-specific narrative
- Back button to Patio (SHOT 5)

**Rooms:**
6. Da Vinci's Workshop
7. Frida Kahlo's Blue House
8. Monet's Water Lily Garden
9. Matisse's Côte d'Azur Studio
10. Bernard's Art Nouveau Atelier
11. (Additional outdoor rooms as planned)

---

## VIDEO FILES NEEDED

| Shot | Video File | Status | Location |
|------|-----------|--------|----------|
| Homepage | `nvai_foyer_aerial_static.mp4` | ✅ Located | `/home/ubuntu/webdev-static-assets/` |
| Foyer | Aerial approach (pans in) | ⏳ Verify | `/home/ubuntu/webdev-static-assets/` |
| Kiki Entrance | `moulin_rouge_live_45sec.mp4` | ✅ Located | `/home/ubuntu/webdev-static-assets/` |
| Kiki Dance | `kiki_dance_performance_1min.mp4` | ✅ Located | `/home/ubuntu/webdev-static-assets/` |
| Picasso Blue | `nvai_picasso_blue_period_5k.mp4` | ✅ Located | `/home/ubuntu/webdev-static-assets/` |
| Picasso Cubist | `nvai_picasso_cubist_workshop_5k.mp4` | ✅ Located | `/home/ubuntu/webdev-static-assets/` |
| Picasso Later | `nvai_picasso_later_atelier_5k.mp4` | ✅ Located | `/home/ubuntu/webdev-static-assets/` |
| Chagall | `nvai_chagall_studio_5k.mp4` | ✅ Located | `/home/ubuntu/webdev-static-assets/` |
| Modigliani | `nvai_modigliani_cafe_5k.mp4` | ✅ Located | `/home/ubuntu/webdev-static-assets/` |
| Raphael | `nvai_raphael_chapel_5k.mp4` | ✅ Located | `/home/ubuntu/webdev-static-assets/` |
| Kandinsky | `nvai_kandinsky_studio_5k.mp4` | ✅ Located | `/home/ubuntu/webdev-static-assets/` |
| Leonardo | `nvai_leonardo_workshop_5k.mp4` | ✅ Located | `/home/ubuntu/webdev-static-assets/` |
| Monet | `nvai_monet_secret_garden_5k.mp4` | ✅ Located | `/home/ubuntu/webdev-static-assets/` |
| Frida | TBD | ⏳ Generate | - |
| Da Vinci | TBD | ⏳ Generate | - |
| Matisse | TBD | ⏳ Generate | - |
| Bernard | TBD | ⏳ Generate | - |

---

## BUILD SEQUENCE

1. **Homepage** - Create with aerial background + content overlay
2. **Foyer** - Create with marble buttons + navigation
3. **Kiki's Moulin Rouge** - Integrate videos + carousel
4. **Grand Foyer Hub** - Create with 8 upstairs rooms
5. **Upstairs Artist Rooms** - Integrate videos into each room
6. **Garden Party** - Create with patio view + outdoor room tiles
7. **Outdoor Artist Rooms** - Integrate videos into each room
8. **Test all routes** - Verify navigation and videos
9. **Save final checkpoint** - Only after all verification complete

---

## VERIFICATION CHECKLIST

- [ ] Homepage loads with aerial background + content
- [ ] Foyer loads with marble buttons at bottom
- [ ] Kiki room plays 45-sec video → 1-min dance → carousel
- [ ] All 8 upstairs rooms have videos + carousels
- [ ] Modigliani & Kandinsky have guest book (parlor)
- [ ] Garden Party shows patio + outdoor room tiles
- [ ] All 5 outdoor rooms have videos + carousels
- [ ] All navigation buttons work (no dead links)
- [ ] All back buttons return to correct hub
- [ ] No console errors
- [ ] Videos play without stuttering
- [ ] Marble buttons render correctly
- [ ] Content is readable on all screen sizes

---

## NOTES

- All videos are in `/home/ubuntu/webdev-static-assets/`
- All videos need to be uploaded to S3 CDN before deployment
- Marble button styling should match the "headstone etching" aesthetic
- Modigliani & Kandinsky rooms are special (include guest book)
- Guest Book moved from Kiki to Modigliani & Kandinsky parlor rooms
- Future content will be added to homepage (flexible layout)
