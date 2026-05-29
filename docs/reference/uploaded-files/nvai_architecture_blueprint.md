# NVAI Three-Layer Platform Architecture

## Layer 1: The Nervous System (AI-Driven APIs)
**Central intelligence orchestrating all platform operations**

### Core AI Services:
1. **Claude** (Anthropic)
   - Provenance narratives and art historical analysis
   - Expert commentary generation
   - Contextual storytelling for each artwork

2. **Grok** (xAI)
   - Real-time reasoning and fact-checking
   - Complex provenance verification
   - Forensic authentication support

3. **Higgs Field** (Video Generation)
   - Cinematic video backdrops for each room
   - Period-specific atmospheric scenes
   - Dynamic visual content generation

4. **Eleven Labs** (Audio/Speech)
   - Period-specific ambient audio generation
   - Narration and voiceover for pieces
   - Atmospheric soundscapes

### API Integration Pattern:
- All AI services feed into Layer 2 (Business Logic)
- Modular, swappable architecture
- Fallback mechanisms for service redundancy

---

## Layer 2: Business Logic (Modular Rooms & Workflows)
**Orchestrates platform features and data flows**

### Modular Room System:
Each artist wing is a self-contained module with:
- Period-specific aesthetic configuration
- Artwork carousel data
- Ambient audio/video settings
- NDA gating rules

### Core Workflows:
1. **Modular Rooms**
   - Foyer (entry experience)
   - 10 Artist Wings (Picasso, Chagall, Modigliani, Leonardo, Raphael, Matisse, Kandinsky, Kahlo, Monet, Bernard)
   - Kiki's Moulin Rouge (dedicated exposé)

2. **Provenance Workflows**
   - AI-generated narratives (Claude)
   - Forensic verification (Grok)
   - Authentication tracking
   - Expert commentary

3. **Escrow/Lending Workflows**
   - Vault management
   - Lending eligibility calculation
   - Sale facilitation
   - Payment processing

### Data Flow:
- Layer 1 (AI) → Layer 2 (Business Logic) → Layer 3 (Frontend)
- Bidirectional: Frontend user actions → Layer 2 → Layer 1 for processing

---

## Layer 3: The Frontend (Cinematic UI/UX)
**Seamless, immersive user experience**

### Core Experience:
1. **Grand Foyer Arrival**
   - Courtyard entry with garden party ambiance
   - Secret garden passage with weeping willows
   - 75 ft grand chateau interior with chandelier and sweeping staircase

2. **Period-Specific Artist Wings**
   - Each wing reflects the artist's historical period
   - Picasso: Blue Period studio (dark, moody) → Mediterranean atelier (sun-drenched)
   - Kiki: Moulin Rouge cabaret aesthetic (red velvet, vintage posters)
   - Monet: Water lily garden with impressionist lighting
   - Each wing has unique color palette, lighting, and atmosphere

3. **Interactive Elements**
   - Circular "dry cleaner belt" carousel for artwork browsing
   - Left/right navigation with smooth transitions
   - Piece landing pages with hero views
   - NDA signature gates
   - Provenance dossiers with AI-generated narratives
   - Escrow/lending module interfaces

4. **Cinematic Transitions**
   - Sweeping scene changes between rooms
   - Animated door/archway transitions
   - Lighting effects matching period aesthetics
   - Smooth fade-ins/fade-outs

### Visual Hierarchy:
- Gold accents (#d4af37) for luxury/elegance
- Period-appropriate color palettes per room
- Museum-quality lighting and shadows
- Responsive design for all devices

---

## Integration Example: Artwork Provenance Flow

```
User clicks on artwork in carousel
  ↓
Frontend sends request to Layer 2 (Business Logic)
  ↓
Layer 2 queries Layer 1 (AI Services):
  - Claude: Generate provenance narrative
  - Grok: Verify authentication details
  - Higgs Field: Generate visual backdrop
  - Eleven Labs: Generate ambient audio
  ↓
Layer 2 aggregates responses and sends to Layer 3 (Frontend)
  ↓
Frontend displays piece landing page with:
  - Hero image
  - AI-generated provenance narrative
  - Authentication verification
  - NDA gate
  - Escrow/lending options
  - Ambient audio playing
```

---

## Technical Requirements

### Layer 1 API Keys & Credentials:
- Claude API: `sk-ant-api03-...` (provided)
- Grok API: `XAI_API_KEY` (environment variable)
- Higgs Field: Internal Manus service
- Eleven Labs: Internal Manus service or external API

### Layer 2 Server Architecture:
- Express.js/Node.js backend
- tRPC for type-safe API routes
- Database: MySQL with Drizzle ORM
- Modular router structure per feature

### Layer 3 Frontend:
- React 19 with Tailwind CSS 4
- Cinematic animations and transitions
- Responsive design
- Museum-quality UI components

---

## Key Design Principles

1. **Modularity**: Each artist wing is independent but shares core infrastructure
2. **AI-First**: Every piece of content can be AI-generated or enhanced
3. **Immersion**: Cinematic design throughout, no generic UI patterns
4. **Authenticity**: Period-specific aesthetics for each artist
5. **Seamless Flow**: User journey from foyer → garden → artist wings → pieces
6. **Security**: NDA gating, forensic authentication, escrow integration
