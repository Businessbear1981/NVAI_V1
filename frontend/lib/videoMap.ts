/**
 * Single source of truth for every wing's video set.
 * leadIn = the cinematic intro / static room backdrop
 * rotation = atmospheric inspiration / location videos that cycle while visitor lingers
 */

export interface WingVideos {
  leadIn: string;
  rotation: string[];
}

const R2 = 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev';

export const VIDEOS = {
  // ---------------------------------------------------------------------------
  // Spatial nodes
  // ---------------------------------------------------------------------------
  home: `${R2}/nvai_aerial_drone_approach_5k.mp4`,
  homeStill: `${R2}/nvai_last_frame.jpg`, // home page hero - chateau still
  foyer: `${R2}/nvai_grand_foyer_5k.mp4`,
  foyerWelcome: `${R2}/nvai_foyer_landing_handshot_5k.mp4`,
  foyerAerialStatic: `${R2}/nvai_foyer_aerial_static.mp4`,
  foyerAerialPan: `${R2}/foyer_aerial_pan_final.mp4`,
  staircase: `${R2}/nvai_foyer_aerial_static.mp4`,
  // Balcony at the top of the central staircase — Da Vinci contraption visible
  // through open terrace doors. Launch point for the Da Vinci flight experience.
  balcony: `${R2}/nvai_balcony_staircase_5k.mp4`,
  garden: `${R2}/nvai_garden_party_5k.mp4`,
  gardenPassage: `${R2}/nvai_garden_passage_5k.mp4`,
  gardenPath: `${R2}/nvai_garden_path_continuous_5k.mp4`,
  gardenPathToPatio: `${R2}/nvai_garden_path_to_patio_5k.mp4`,
  courtyard: `${R2}/nvai_courtyard_5k.mp4`,
  // Great Hall — ultra-luxury auction house interior (Christie's London grade)
  grandHall: `${R2}/nvai_great_hall_5k.mp4`,
  // Auction lobby — people waiting before the gavel
  auctionLobby: `${R2}/nvai_auction_lobby_5k.mp4`,
  // Grand Ballroom variations — Renaissance dancers OR 1920s Gatsby party
  grandBallroomRenaissance: `${R2}/nvai_grand_ballroom_renaissance_5k.mp4`,
  grandBallroomGatsby: `${R2}/nvai_grand_ballroom_gatsby_5k.mp4`,
  // Legacy 'auction' kept for routes that still reference it
  auction: `${R2}/nvai_auction_lobby_5k.mp4`,

  // ---------------------------------------------------------------------------
  // Grounds rotation — visitor's walk through the estate (narrative sequence)
  // ---------------------------------------------------------------------------
  vineyardAerial: `${R2}/nvai_vineyard_aerial_5k.mp4`,
  orchardWalk: `${R2}/nvai_orchard_walk_5k.mp4`,
  wineCaves: `${R2}/nvai_wine_caves_5k.mp4`,

  // ---------------------------------------------------------------------------
  // Da Vinci flight — 48s cinematic interlude (4 × 12s beats)
  // Launched from the balcony, lands on the patio
  // ---------------------------------------------------------------------------
  davinciFlight: {
    takeoff: `${R2}/nvai_davinci_flight_b1_takeoff_5k.mp4`,
    soaring: `${R2}/nvai_davinci_flight_b2_soaring_5k.mp4`,
    banking: `${R2}/nvai_davinci_flight_b3_banking_5k.mp4`,
    descent: `${R2}/nvai_davinci_flight_b4_descent_5k.mp4`,
    // Alternate takeoff — Sean-curated bonus take. Used by /flight on the
    // second viewing (Fly again) so the loop is not literally identical.
    alt: `${R2}/nvai_davinci_flight_alt_5k.mp4`,
  },

  // ---------------------------------------------------------------------------
  // Artist wings — with rotation video lists
  // ---------------------------------------------------------------------------
  picasso: {
    leadIn: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_picasso_studio_5k.mp4',
    rotation: [
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_picasso_blue_period_5k.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_picasso_cubist_workshop_5k.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_picasso_later_atelier_5k.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/montmartre.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/barcelona.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/paris.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/bullfighting.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/studio-revolution.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/antibes.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/war-violence.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/african-masks.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/cote-azur.mp4',
    ],
  } as WingVideos,

  picassoBateauLavoir: {
    leadIn: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_picasso_blue_period_5k.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/montmartre.mp4', 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/barcelona.mp4', 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/paris.mp4'],
  } as WingVideos,

  picassoBoisgeloup: {
    leadIn: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_picasso_cubist_workshop_5k.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/paris.mp4', 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/studio-revolution.mp4', 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/bullfighting.mp4'],
  } as WingVideos,

  picassoMougins: {
    leadIn: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_picasso_later_atelier_5k.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/antibes.mp4', 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/war-violence.mp4', 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/cote-azur.mp4'],
  } as WingVideos,

  // The Parlor — bohemian Parisian bar with Chagalls on the walls.
  // Visitor goes into the Chagall sub-room for the individual painting experience.
  parlor: {
    leadIn: `${R2}/nvai_parlor_5k.mp4`,
    rotation: [],
  } as WingVideos,

  chagall: {
    leadIn: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_chagall_studio_5k.mp4',
    rotation: [
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_chagall_vitebsk_5k.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/moscow.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/russian-folk.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/paris.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/muses-lovers.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/montmartre.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/cote-azur.mp4',
    ],
  } as WingVideos,

  // MODIGLIANI — the immersive (other half of Kiki, climax of the sale)
  // The cafe leadIn opens the wing; the four cornerstone shots build the arc:
  // garret studio (where he died) -> La Rotonde (working life) -> funeral procession -> grave.
  modigliani: {
    leadIn: `${R2}/nvai_modigliani_cafe_5k.mp4`,
    rotation: [
      `${R2}/nvai_modi_rotonde_night_5k.mp4`,
      `${R2}/nvai_modi_garret_studio_5k.mp4`,
      `${R2}/nvai_modi_funeral_procession_5k.mp4`,
      `${R2}/nvai_modi_pere_lachaise_grave_5k.mp4`,
    ],
  } as WingVideos,

  kandinsky: {
    leadIn: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_kandinsky_studio_5k.mp4',
    rotation: [
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/abstract-harmony.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/geometry-harmony.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/music-synesthesia.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/theosophy.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/munich.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/moscow.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nature-geometry.mp4',
    ],
  } as WingVideos,

  // RAPHAEL — use the Raphael chapel as leadIn (was generic florence-workshop)
  raphael: {
    leadIn: `${R2}/nvai_raphael_chapel_5k.mp4`,
    rotation: [
      `${R2}/rome-vatican.mp4`,
      `${R2}/florence-workshop.mp4`,
      `${R2}/milan-court.mp4`,
    ],
  } as WingVideos,

  davinci: {
    leadIn: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_leonardo_workshop_5k.mp4',
    rotation: [
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/workshop-awakening.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/human-anatomy.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/flight-machines.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/water-hydraulics.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nature-geometry.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/amboise-france.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/milan-court.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/florence-workshop.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/rome-vatican.mp4',
    ],
  } as WingVideos,

  // MONET — Giverny + the three new generations (moonlit Nymphéas, rolling hills, late-life cataracts)
  monet: {
    leadIn: `${R2}/nvai_monet_secret_garden_5k.mp4`,
    rotation: [
      `${R2}/nvai_monet_moonlit_nympheas_5k.mp4`,
      `${R2}/nvai_monet_rolling_hills_5k.mp4`,
      `${R2}/nvai_monet_failing_sight_5k.mp4`,
      `${R2}/nvai_garden_passage_5k.mp4`,
    ],
  } as WingVideos,

  // MATISSE — dedicated Nice/Vence cutout-era studio video (was using generic cote-azur)
  matisse: {
    leadIn: `${R2}/nvai_matisse_studio_5k.mp4`,
    rotation: [
      `${R2}/cote-azur.mp4`,
      `${R2}/antibes.mp4`,
    ],
  } as WingVideos,

  frida: {
    leadIn: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/casa-azul.mp4',
    rotation: [
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/casa-azul-awakening.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/coyoacan.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/diego-love.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/mexican-folk.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/xochimilco.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/pain-suffering.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/hospital-rooms.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nature-jungle.mp4',
    ],
  } as WingVideos,

  // ÉMILE BERNARD — Pont-Aven painter whose late career turned deeply religious;
  // he spent years in Italy painting altarpieces and church commissions.
  // TEMPORARY STAND-IN: using the Rome/Vatican backdrop for the religious-period
  // atmosphere (Italian church interiors fit Bernard's late altarpiece years
  // better than the Pont-Aven coastal work, which still needs a dedicated
  // generation). A dedicated Bernard Pont-Aven backdrop (Breton coast + chapel
  // interior) is queued for future generation. Previously mis-pointed at the
  // Modigliani cafe loop, which belongs to the Modigliani wing.
  bernard: {
    leadIn: `${R2}/rome-vatican.mp4`,
    rotation: [],
  } as WingVideos,

  // ---------------------------------------------------------------------------
  // KIKI — the marquee immersive. Two halves: Kiki's rise + MODI's fall.
  // The painting NVAI is selling is the seam between her half and his half.
  // ---------------------------------------------------------------------------
  kiki: {
    leadIn: `${R2}/nvai_kiki_moulin_rouge_5k.mp4`,
    moulinRougeLive: `${R2}/moulin_rouge_live_45sec.mp4`,
    burlesqueFinal: `${R2}/kiki_burlesque_performance_final.mp4`,
    burlesqueVariants: [
      `${R2}/kiki_burlesque_performance_5k.mp4`,
      `${R2}/kiki_burlesque_performance_5k_v2.mp4`,
      `${R2}/kiki_burlesque_performance_5k_v3.mp4`,
      `${R2}/kiki_burlesque_performance_5k_v4.mp4`,
      `${R2}/kiki_burlesque_performance_final.mp4`,
    ],
    danceOneMinute: `${R2}/kiki_dance_performance_1min.mp4`,
    // The Sitting — Modi's studio, 1917, red velvet pillow (the painting-being-made moment)
    theSitting: `${R2}/nvai_kiki_sitting_red_pillow_5k.mp4`,
    // Hotel Istria — Kiki's bohemian Montparnasse room
    hotelIstria: `${R2}/nvai_kiki_hotel_istria_5k.mp4`,
    // The cabaret dance sequence with Modi - 3 beats (36s total when stitched)
    cabaretDance: {
      seeing: `${R2}/nvai_kiki_modi_b1_seeing_5k.mp4`,
      dancing: `${R2}/nvai_kiki_modi_b2_dance_5k.mp4`,
      catching: `${R2}/nvai_kiki_modi_b3_catching_5k.mp4`,
    },
  },

  // ---------------------------------------------------------------------------
  // POLLOCK — Springs, East Hampton, 1950. The drip-paint apex.
  // leadIn = the barn studio at Springs (where the floor became the canvas)
  // rotation = action painting in progress + Autumn Rhythm canvas detail
  // ---------------------------------------------------------------------------
  pollock: {
    leadIn: `${R2}/nvai_pollock_springs_studio_5k.mp4`,
    rotation: [
      `${R2}/nvai_pollock_action_5k.mp4`,
      `${R2}/nvai_pollock_autumn_rhythm_canvas_5k.mp4`,
    ],
    // Legacy keys retained for any callers still referencing them directly:
    studio: `${R2}/nvai_pollock_springs_studio_5k.mp4`,
    action: `${R2}/nvai_pollock_action_5k.mp4`,
    canvas: `${R2}/nvai_pollock_autumn_rhythm_canvas_5k.mp4`,
  },
} as const;
