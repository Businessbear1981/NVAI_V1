# NVAI Artist Video Repository

A comprehensive dynamic video library for the Napa Valley Art Institute digital gallery. Each artist room features rotating video content to prevent staleness and create a fresh experience on every visit.

## Structure

```
video-repository/
├── metadata.json (master index of all videos)
├── README.md (this file)
├── da-vinci/
│   ├── lead-in/
│   │   └── workshop-awakening.mp4 (45s)
│   ├── inspirations/
│   │   ├── human-anatomy.mp4 (15s)
│   │   ├── flight-machines.mp4 (20s)
│   │   ├── water-hydraulics.mp4 (18s)
│   │   └── nature-geometry.mp4 (22s)
│   └── locations/
│       ├── florence-workshop.mp4 (30s)
│       ├── milan-court.mp4 (35s)
│       ├── rome-vatican.mp4 (28s)
│       └── amboise-france.mp4 (40s)
├── frida-kahlo/
├── picasso/
├── kandinsky/
├── monet/
├── matisse/
├── chagall/
├── raphael/
└── modigliani/
```

## Video Types

### Landing Screens (PNG)
- Static entry visual for each artist
- Displays artist name, tagline, and atmospheric scene
- Shown while lead-in video loads or as fallback

### Lead-In Videos (40-55 seconds)
- Cinematic introduction to the artist's world
- Sets mood and atmosphere
- Plays once on room entry
- Variable duration based on narrative pacing

### Inspiration Videos (15-24 seconds)
- Visual exploration of artistic influences
- Examples: African masks for Picasso, Light studies for Monet
- Rotates through 4 inspirations per artist
- Quick, focused explorations

### Location Videos (28-40 seconds)
- Immersive backdrops of places artist visited/worked
- Examples: Giverny for Monet, Montmartre for Picasso
- Rotates through 4 locations per artist
- Longer, more cinematic than inspirations

## Rotation Logic

### On Room Entry:
1. Display landing screen
2. Play lead-in video (once)
3. Transition to main room view

### During Room Visit:
- Background video rotates through inspirations + locations
- Each video plays to completion
- Next video selected randomly
- Smooth fade transitions between videos
- User can manually select which category to view

### Session Caching:
- Selected videos cached for session duration
- Prevents jarring switches during single visit
- Fresh selection on next room visit

## Video Generation Status

### Completed ✅
- [ ] 9 Landing screens (PNG) - **READY TO UPLOAD**
- [ ] 9 Lead-in videos (MP4)
- [ ] 36 Inspiration videos (MP4)
- [ ] 36 Location videos (MP4)

### Generation Strategy
Videos are generated in batches:
1. **Batch 1:** Da Vinci (9 videos)
2. **Batch 2:** Frida Kahlo (9 videos)
3. **Batch 3:** Picasso (9 videos)
4. **Batch 4:** Kandinsky (9 videos)
5. **Batch 5:** Monet (9 videos)
6. **Batch 6:** Matisse (9 videos)
7. **Batch 7:** Chagall (9 videos)
8. **Batch 8:** Raphael (9 videos)
9. **Batch 9:** Modigliani (9 videos)

Each batch = 1 lead-in + 4 inspirations + 4 locations

## Integration with Artist Rooms

### Component Updates Needed:
1. Import rotation logic from `rotation-logic.ts`
2. Load metadata from `metadata.json`
3. On room mount:
   - Fetch landing screen
   - Queue lead-in video
   - Initialize rotation for inspirations/locations
4. Add UI controls for:
   - Video category selector (Inspirations / Locations)
   - Play/pause controls
   - Video duration indicator

### Example Implementation:
```tsx
import { useVideoRepository } from '@/hooks/useVideoRepository';

export function ArtistRoom({ artistId }) {
  const { 
    landingScreen, 
    leadInVideo, 
    currentVideo, 
    nextVideo,
    selectCategory 
  } = useVideoRepository(artistId);

  return (
    <div className="artist-room">
      {/* Landing screen while loading */}
      {!leadInVideo && <img src={landingScreen} />}
      
      {/* Lead-in video */}
      {leadInVideo && <video src={leadInVideo} autoPlay />}
      
      {/* Rotating content */}
      <div className="video-controls">
        <button onClick={() => selectCategory('inspirations')}>
          Inspirations
        </button>
        <button onClick={() => selectCategory('locations')}>
          Locations
        </button>
      </div>
    </div>
  );
}
```

## S3 Upload Paths

All videos will be uploaded to S3 with paths like:
- `/manus-storage/nvai_da-vinci_lead-in.mp4`
- `/manus-storage/nvai_da-vinci_inspiration_anatomy.mp4`
- `/manus-storage/nvai_da-vinci_location_florence.mp4`

Landing screens already uploaded:
- `/manus-storage/landing-da-vinci.png`
- `/manus-storage/landing-frida.png`
- etc.

## Next Steps

1. ✅ Create repository structure
2. ✅ Generate landing screens
3. ⏳ Generate lead-in videos (batch 1-9)
4. ⏳ Generate inspiration videos (batch 1-9)
5. ⏳ Generate location videos (batch 1-9)
6. ⏳ Upload all videos to S3
7. ⏳ Create rotation logic component
8. ⏳ Update artist room components
9. ⏳ Test rotation and fallback logic

## Notes

- All videos are 5K quality where possible
- Variable durations allow natural pacing
- Metadata.json is the single source of truth
- Rotation logic prevents repetition during single visit
- Fallback to landing screen if video fails to load
