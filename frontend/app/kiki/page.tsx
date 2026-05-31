'use client';

import { useState } from 'react';
import Link from 'next/link';
import WingLayout from '@/components/layout/WingLayout';
import { VIDEOS } from '@/lib/videoMap';
import AudioBed from '@/components/cinematic/AudioBed';
import MarqueeLeadIn from '@/components/cinematic/MarqueeLeadIn';

const KIKI_BACKDROP =
  'radial-gradient(ellipse at 30% 30%, rgba(220,40,80,0.35) 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, rgba(120,20,60,0.5) 0%, transparent 60%), linear-gradient(180deg, #1a060c 0%, #2a0a14 40%, #0a0205 100%)';

const offerings = [
  {
    label: 'The Exposé',
    detail: '220-page eBook · by Jana Misho · 700+ research links · the 107-year-lost Modigliani discovery',
    price: '$65',
    cta: 'Order',
  },
  {
    label: 'Audiobook + Picture Book',
    detail: 'ElevenLabs narration · period French-accented English · companion picture book to follow along',
    price: '$45',
    cta: 'Order',
  },
  {
    label: 'KISP — Kiki Supplement Pages',
    detail: 'Weekly subscription · newly-uncovered rare photos, archive film, anecdotes',
    price: '$12 / month',
    cta: 'Subscribe',
  },
  {
    label: 'Modigliani Commemorative Poster',
    detail: '36 × 24 in · first 10,000 copies · numbered',
    price: '$95',
    cta: 'Order',
  },
  {
    label: 'Private YouTube Channel',
    detail: '24-hour streaming · rare film, animation, period interviews · sent with eBook',
    price: 'Included',
    cta: 'Access',
  },
  {
    label: 'Lingerie collection',
    detail: 'Curated reference to the existing Kiki de Montparnasse luxury brand',
    price: 'From $185',
    cta: 'Browse',
  },
];

export default function KikiPage() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && (
        <MarqueeLeadIn
          videoSrc="/videos/nvai_kiki_moulin_rouge_5k.mp4"
          videoSeconds={6}
          marqueeSeconds={4}
          eyebrow="The Marquee"
          title="TONIGHT ONLY"
          subtitle="The Queen of Montparnasse"
          onComplete={() => setIntroDone(true)}
        />
      )}
      {/* Scrapbook background — scattered archival photos at low opacity behind a dark scrim
          so the foreground text reads clearly. Subtle, not competing for attention. */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {[
          { src: '/kiki/photos/IMG_1253.jpeg', x: '4%',  y: '8%',  rot: -8,  w: '13rem' },
          { src: '/kiki/photos/IMG_1255.jpeg', x: '80%', y: '6%',  rot: 6,   w: '11rem' },
          { src: '/kiki/photos/IMG_1305.jpeg', x: '70%', y: '60%', rot: -4,  w: '12rem' },
          { src: '/kiki/photos/IMG_1333.jpeg', x: '3%',  y: '68%', rot: 10,  w: '11rem' },
          { src: '/kiki/photos/moulin_rouge_night.webp', x: '85%', y: '78%', rot: -7, w: '12rem' },
          { src: '/kiki/photos/c44e6877-a9b7-4932-9401-cb257331ff3d.JPG', x: '12%', y: '38%', rot: 5, w: '10rem' },
        ].map((p, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={p.src}
            alt=""
            className="absolute opacity-[0.12]"
            style={{
              left: p.x, top: p.y, width: p.w,
              transform: `rotate(${p.rot}deg)`,
              boxShadow: '0 8px 24px rgba(0,0,0,0.7)',
              filter: 'sepia(0.2) contrast(0.85)',
            }}
          />
        ))}
        {/* Heavy dark scrim ensures foreground text always reads */}
        <div className="absolute inset-0 bg-midnight/55" />
        {/* Champagne glass — top right, decorative hint */}
        <div className="absolute right-8 top-1/3 opacity-25">
          <svg width="56" height="140" viewBox="0 0 72 180" fill="none">
            <path d="M14 8 L58 8 L52 60 Q36 80 20 60 Z" stroke="rgba(255,250,235,0.85)" strokeWidth="1.2" fill="rgba(255,235,180,0.25)" />
            <path d="M36 80 L36 150 M22 170 L50 170" stroke="rgba(255,250,235,0.7)" strokeWidth="1.2" />
            {[20, 35, 52, 28, 44].map((y, i) => (
              <circle key={i} cx={28 + (i * 4)} cy={y} r="1.2" fill="rgba(255,250,235,0.9)" />
            ))}
          </svg>
        </div>
        {/* Lit cigarette — burning ember, smoke wisp */}
        <div className="absolute left-8 bottom-8 opacity-30">
          <svg width="110" height="64" viewBox="0 0 140 80" fill="none">
            <rect x="20" y="48" width="80" height="6" fill="rgba(245,235,210,0.9)" rx="1" />
            <rect x="100" y="48" width="8" height="6" fill="rgba(220,180,90,0.95)" rx="1" />
            <circle cx="20" cy="51" r="3.5" fill="rgba(255,90,30,0.95)">
              <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite" />
              <animate attributeName="fill" values="rgba(255,90,30,0.95);rgba(255,160,60,0.95);rgba(255,90,30,0.95)" dur="2s" repeatCount="indefinite" />
            </circle>
            <path d="M18 48 Q14 32 22 20 Q14 8 18 0" stroke="rgba(255,245,225,0.35)" strokeWidth="1.5" fill="none">
              <animate attributeName="opacity" values="0.35;0.15;0.35" dur="3s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>
      </div>

      <WingLayout
      back={{ href: '/', label: 'Return to the chateau' }}
      eyebrow="The Marquee"
      title="Kiki"
      subtitle="Queen of Montparnasse"
      caption="For over one million super-fans worldwide. The Moulin Rouge wing — exposé, audiobook, the feature film Kickstarter, the 90-second blockbuster teaser, the guest book, ten percent to charity."
      backdrop={KIKI_BACKDROP}
      videoSrc={VIDEOS.kiki.danceOneMinute}
      rotation={VIDEOS.kiki.burlesqueVariants}
    >
      {/* Edith Piaf-inspired ambient — drop a real MP3 at /kiki/audio/piaf-ambient.mp3 */}
      <AudioBed src="/kiki/audio/piaf-ambient.mp3" label="Piaf" />
      <section className="space-y-12">
        {/* Short film teaser — Moulin Rouge live, 45 seconds */}
        <div className="text-center space-y-6">
          <h2 className="font-display text-2xl tracking-wider text-gold">The Moulin Rouge — 45 Seconds</h2>
          <div className="mx-auto aspect-video max-w-3xl overflow-hidden rounded-lg border border-gold/20 bg-midnight">
            <video preload="metadata"
              src={VIDEOS.kiki.moulinRougeLive}
              controls
              poster=""
              className="h-full w-full object-cover"
            />
          </div>
          <p className="text-xs italic text-ivory/85">
            The cabaret cut. Burlesque variants and the full one-minute dance live below.
          </p>
        </div>

        {/* Audiobook callout */}
        <div className="marble rounded-lg p-8 text-center space-y-4">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">The Audiobook</p>
          <h2 className="font-didot text-3xl uppercase tracking-wider text-ivory">
            Hear Kiki — French accent, English voice
          </h2>
          <div className="mx-auto h-px w-12 bg-gold/40" />
          <p className="font-body italic text-ivory/95 max-w-2xl mx-auto">
            The full 220-page Misho exposé read in English with a soft French accent — period-accurate,
            soothing. Generate any chapter on demand.
          </p>
          <a
            href="/kiki/audiobook"
            className="inline-block mt-4 rounded-full border border-gold/50 bg-gold/10 px-8 py-3 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-gold transition-all hover:border-gold hover:bg-gold/20"
          >
            Listen →
          </a>
        </div>

        {/* Real archival photos uploaded for the wing */}
        <div className="space-y-4">
          <h2 className="font-display text-2xl text-center tracking-wider text-gold">From the Archive</h2>
          <p className="text-center text-sm italic text-ivory/85 max-w-2xl mx-auto">
            Real photographs uploaded for the Kiki wing. These also seed the Higgsfield prompts
            for three additional inspiration videos.
          </p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { src: '/kiki/photos/TheExtraordinaryLife&TimesoftheImmortalyetForgottenKIKI,QueenofMontparnasse-anExpose&GraphicNovel-CoverPage.jpg', cap: 'Cover of the Exposé' },
              { src: '/kiki/photos/moulin_rouge_night.webp', cap: 'Moulin Rouge at night' },
              { src: '/kiki/photos/IMG_1253.jpeg', cap: 'Archive plate 01' },
              { src: '/kiki/photos/IMG_1255.jpeg', cap: 'Archive plate 02' },
              { src: '/kiki/photos/IMG_1305.jpeg', cap: 'Archive plate 03' },
              { src: '/kiki/photos/IMG_1333.jpeg', cap: 'Archive plate 04' },
              { src: '/kiki/photos/c44e6877-a9b7-4932-9401-cb257331ff3d.JPG', cap: 'Archive plate 05' },
              { src: '/kiki/photos/AE0tW1IsNcBI.webp', cap: 'Archive plate 06' },
            ].map((p) => (
              <figure key={p.src} className="overflow-hidden rounded-lg border border-gold/15 bg-midnight">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt={p.cap} className="aspect-square w-full object-cover" />
                <figcaption className="px-2 py-1 font-mono text-[0.5rem] uppercase tracking-[0.22em] text-gold/65">
                  {p.cap}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Three Higgsfield video prompts seeded from the archive */}
        <div className="space-y-6">
          <h2 className="font-display text-2xl text-center tracking-wider text-gold">
            Three Additional Videos · Higgsfield prompts
          </h2>
          <p className="text-center text-sm italic text-ivory/85 max-w-2xl mx-auto">
            Seeded by the archival photos above. Feed each prompt to Higgsfield, then drop the
            resulting MP4 into <code className="font-mono text-[0.8em]">/public/videos/</code> and
            swap it in via the video curator.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'I · The Moulin Rouge entrance',
                prompt:
                  'Cinematic dolly-in toward the red windmill of the Moulin Rouge, 1924, dusk, gas-lit lanterns, period-dress crowd gathering at the entrance, ostrich-feather boas, top hats, the can-can poster on the wall. Style: warm 1970s film stock, slight grain, Brassaï night-photography reference. Aspect 21:9. 12 second loop, no people in focus, soft golden light spilling from the doorway.',
              },
              {
                title: 'II · The atelier portrait',
                prompt:
                  "Modigliani's Montparnasse studio, 1916, late afternoon, oblique sun through tall windows. Pencil drawings pinned on the wall, a single brass oil lamp, paint tubes and a glass of absinthe on the side table. An empty velvet chaise longue waiting for the muse. Smoke drifting. No figure. Camera slow dolly-in. Aspect 16:9, 8 second loop, warm Pernod-amber tone, EXIF: Kodak Portra 400 reference.",
              },
              {
                title: 'III · La Rotonde after closing',
                prompt:
                  "La Rotonde café in Montparnasse, 3 a.m., empty marble-topped tables, overturned chairs, a single phonograph playing in the corner. Cigarette smoke still hanging, half-finished Pernod glasses, a discarded ostrich feather on the floor. The bar light low. Camera slow pan across the room. Atmosphere: the morning after a Lost Generation evening. 10 second loop, aspect 21:9, warm desaturated film stock.",
              },
              {
                title: 'IV · The cabaret · the rose · the recognition',
                prompt:
                  "60-second cabaret sequence. 1920s Montparnasse intimate cabaret bar — low candlelit ceiling, smoke, small round café tables packed close, a stage of weathered wood barely raised off the floor. Amedeo Modigliani walks in from the back alone — tall, broad shoulders, brown velvet jacket worn at the elbows, the look of a man at the end of a long day. He takes a tiny table at the front and orders a Pernod. On stage: Kiki de Montparnasse mid-song — slip dress, dark bob, kohl-lined eyes, scarlet lips, no microphone (the room is small enough that she does not need one). She is performing an original slow chanson, period-accurate Montparnasse cabaret in the Mistinguett or Damia register — sultry, melancholy, French. Halfway through the song she steps off the stage and walks slowly through the tables, still singing — the patrons going quiet as she passes. She reaches Modigliani's table, brushes the back of her hand along his cheek, and lays a single red rose on the marble in front of him. His eyes well up. He does not move. She holds his gaze one beat — recognition — and walks back to the stage to finish the song. Style references (for the feel only, not literal): the early cabaret scene of A Star Is Born (2018) for the intimacy and the held gaze; Marlene Dietrich in The Blue Angel for the room. Original Kiki performance — not a song cover. Warm 1970s film stock, candle and gas-sconce light, painterly, the room fading around the two of them. Aspect 16:9. 60 second loop, tasteful, no explicit content.",
              },
              {
                title: 'V · The painting · tasteful',
                prompt:
                  "Modigliani's studio, single candle and gas-sconce light. The painter at his easel mid-stroke — brush poised, eyes locked. Kiki seated on a worn velvet chaise longue in classical pose, draped from the waist in a single length of cream linen so the composition implies a nude without showing nudity. Camera composes around the gesture of his hand and the line of her shoulder, never below. Warm Pernod-amber tone, painterly. 12 second loop, aspect 16:9. Reference: Phantom Thread interior restraint, Rembrandt candlelight. No explicit content.",
              },
            ].map((card) => (
              <article key={card.title} className="marble rounded-lg p-5 space-y-3 text-left">
                <h3 className="font-display text-base tracking-wider text-gold">{card.title}</h3>
                <div className="h-px w-8 bg-gold/30" />
                <p className="font-body text-xs italic text-ivory/95 leading-relaxed">
                  {card.prompt}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* The burlesque performance gallery */}
        <div className="space-y-6">
          <h2 className="font-display text-2xl text-center tracking-wider text-gold">Performance Reel</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {VIDEOS.kiki.burlesqueVariants.slice(0, 3).map((src, i) => (
              <div key={src} className="overflow-hidden rounded-lg border border-gold/20 bg-midnight/60">
                <video preload="metadata" src={src} controls muted className="aspect-video w-full object-cover" />
                <p className="px-3 py-2 font-mono text-[0.55rem] uppercase tracking-[0.28em] text-gold/70">
                  Take {String(i + 1).padStart(2, '0')}
                </p>
              </div>
            ))}
          </div>
          <div className="mx-auto max-w-3xl overflow-hidden rounded-lg border border-gold/30 bg-midnight">
            <video preload="metadata"
              src={VIDEOS.kiki.danceOneMinute}
              controls
              className="aspect-video w-full object-cover"
            />
            <p className="px-3 py-2 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-gold/70">
              The full dance · one minute
            </p>
          </div>
        </div>

        {/* The offerings */}
        <div className="space-y-6">
          <h2 className="font-display text-2xl text-center tracking-wider text-gold">The Offerings</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {offerings.map((o) => (
              <article key={o.label} className="marble rounded-lg p-6 space-y-3 text-left">
                <h3 className="font-display text-lg leading-tight text-ivory">{o.label}</h3>
                <p className="font-body text-sm italic text-ivory/95 leading-relaxed">{o.detail}</p>
                <div className="h-px w-8 bg-gold/30" />
                <div className="flex items-center justify-between pt-2">
                  <p className="font-mono text-[0.7rem] tracking-wider text-gold">{o.price}</p>
                  <button className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-gold/80 hover:text-gold">
                    {o.cta} →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Kickstarter */}
        <div className="marble rounded-lg p-10 space-y-4 text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
            Feature film campaign
          </p>
          <h2 className="font-didot text-3xl uppercase tracking-wider text-ivory">
            Help bring this feature film to life
          </h2>
          <div className="mx-auto h-px w-16 bg-gold/40" />
          <p className="font-body text-ivory/95 max-w-2xl mx-auto leading-relaxed">
            We are raising the development fund for the Kiki feature — Montparnasse 1920s,
            the lost love story, the painting. Pledge levels open. Donor wall lives here.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Link
              href="/kiki/kickstarter"
              className="rounded-full border border-gold/50 bg-gold/10 px-8 py-3 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-gold transition-all hover:border-gold hover:bg-gold/20"
            >
              Pledge
            </Link>
            <Link
              href="/kiki/guestbook"
              className="font-mono text-[0.65rem] uppercase tracking-[0.32em] text-ivory/95 hover:text-gold"
            >
              Sign the guest book →
            </Link>
          </div>
        </div>

        <p className="text-center font-body text-xs italic text-ivory/80">
          Ten percent of every sale donated in Kiki's honour. Donor wall in production.
        </p>
      </section>
    </WingLayout>
    </>
  );
}
