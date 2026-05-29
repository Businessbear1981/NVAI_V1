/**
 * Single source of truth for every wing's video set.
 * leadIn = the cinematic intro / static room backdrop
 * rotation = atmospheric inspiration / location videos that cycle while visitor lingers
 */

export interface WingVideos {
  leadIn: string;
  rotation: string[];
}

export const VIDEOS = {
  // ---------------------------------------------------------------------------
  // Spatial nodes
  // ---------------------------------------------------------------------------
  home: '/videos/nvai_aerial_drone_approach_5k.mp4',
  foyer: '/videos/nvai_grand_foyer_5k.mp4',
  foyerWelcome: '/videos/nvai_foyer_landing_handshot_5k.mp4',
  foyerAerialStatic: '/videos/nvai_foyer_aerial_static.mp4',
  foyerAerialPan: '/videos/foyer_aerial_pan_final.mp4',
  staircase: '/videos/nvai_foyer_aerial_static.mp4',
  garden: '/videos/nvai_garden_party_5k.mp4',
  gardenPassage: '/videos/nvai_garden_passage_5k.mp4',
  gardenPath: '/videos/nvai_garden_path_continuous_5k.mp4',
  gardenPathToPatio: '/videos/nvai_garden_path_to_patio_5k.mp4',
  courtyard: '/videos/nvai_courtyard_5k.mp4',
  grandHall: '/videos/nvai_grand_foyer_5k.mp4',
  auction: '/videos/foyer_aerial_pan_final.mp4',

  // ---------------------------------------------------------------------------
  // Artist wings — with rotation video lists
  // ---------------------------------------------------------------------------
  picasso: {
    leadIn: '/videos/nvai_picasso_studio_5k.mp4',
    rotation: [
      '/videos/nvai_picasso_blue_period_5k.mp4',
      '/videos/nvai_picasso_cubist_workshop_5k.mp4',
      '/videos/nvai_picasso_later_atelier_5k.mp4',
      '/videos/montmartre.mp4',
      '/videos/barcelona.mp4',
      '/videos/paris.mp4',
      '/videos/bullfighting.mp4',
      '/videos/studio-revolution.mp4',
      '/videos/antibes.mp4',
      '/videos/war-violence.mp4',
      '/videos/african-masks.mp4',
      '/videos/cote-azur.mp4',
    ],
  } as WingVideos,

  picassoBateauLavoir: {
    leadIn: '/videos/nvai_picasso_blue_period_5k.mp4',
    rotation: ['/videos/montmartre.mp4', '/videos/barcelona.mp4', '/videos/paris.mp4'],
  } as WingVideos,

  picassoBoisgeloup: {
    leadIn: '/videos/nvai_picasso_cubist_workshop_5k.mp4',
    rotation: ['/videos/paris.mp4', '/videos/studio-revolution.mp4', '/videos/bullfighting.mp4'],
  } as WingVideos,

  picassoMougins: {
    leadIn: '/videos/nvai_picasso_later_atelier_5k.mp4',
    rotation: ['/videos/antibes.mp4', '/videos/war-violence.mp4', '/videos/cote-azur.mp4'],
  } as WingVideos,

  // The Parlor — bohemian bar atmosphere. Chagalls hang here as decor;
  // the bar itself is the scene. Visitor goes into the Chagall sub-room for
  // the individual painting experience.
  parlor: {
    leadIn: '/videos/nvai_courtyard_5k.mp4',
    rotation: [],
  } as WingVideos,

  chagall: {
    leadIn: '/videos/nvai_chagall_studio_5k.mp4',
    rotation: [
      '/videos/nvai_chagall_vitebsk_5k.mp4',
      '/videos/moscow.mp4',
      '/videos/russian-folk.mp4',
      '/videos/paris.mp4',
      '/videos/muses-lovers.mp4',
      '/videos/montmartre.mp4',
      '/videos/cote-azur.mp4',
    ],
  } as WingVideos,

  modigliani: {
    leadIn: '/videos/nvai_modigliani_cafe_5k.mp4',
    rotation: [
      '/videos/african-masks.mp4',
      '/videos/muses-lovers.mp4',
      '/videos/montmartre.mp4',
      '/videos/paris.mp4',
    ],
  } as WingVideos,

  kandinsky: {
    leadIn: '/videos/nvai_kandinsky_studio_5k.mp4',
    rotation: [
      '/videos/abstract-harmony.mp4',
      '/videos/geometry-harmony.mp4',
      '/videos/music-synesthesia.mp4',
      '/videos/theosophy.mp4',
      '/videos/munich.mp4',
      '/videos/moscow.mp4',
      '/videos/nature-geometry.mp4',
    ],
  } as WingVideos,

  raphael: {
    leadIn: '/videos/florence-workshop.mp4',
    rotation: ['/videos/rome-vatican.mp4', '/videos/milan-court.mp4'],
  } as WingVideos,

  davinci: {
    leadIn: '/videos/nvai_leonardo_workshop_5k.mp4',
    rotation: [
      '/videos/workshop-awakening.mp4',
      '/videos/human-anatomy.mp4',
      '/videos/flight-machines.mp4',
      '/videos/water-hydraulics.mp4',
      '/videos/nature-geometry.mp4',
      '/videos/amboise-france.mp4',
      '/videos/milan-court.mp4',
      '/videos/florence-workshop.mp4',
      '/videos/rome-vatican.mp4',
    ],
  } as WingVideos,

  monet: {
    leadIn: '/videos/nvai_monet_secret_garden_5k.mp4',
    rotation: [
      '/videos/nvai_garden_passage_5k.mp4',
    ],
  } as WingVideos,

  matisse: {
    leadIn: '/videos/cote-azur.mp4',
    rotation: ['/videos/antibes.mp4'],
  } as WingVideos,

  frida: {
    leadIn: '/videos/casa-azul.mp4',
    rotation: [
      '/videos/casa-azul-awakening.mp4',
      '/videos/coyoacan.mp4',
      '/videos/diego-love.mp4',
      '/videos/mexican-folk.mp4',
      '/videos/xochimilco.mp4',
      '/videos/pain-suffering.mp4',
      '/videos/hospital-rooms.mp4',
      '/videos/nature-jungle.mp4',
    ],
  } as WingVideos,

  bernard: {
    leadIn: '/videos/nvai_raphael_chapel_5k.mp4',
    rotation: [],
  } as WingVideos,

  // ---------------------------------------------------------------------------
  // Kiki — multiple files, treated as named clips not rotation
  // ---------------------------------------------------------------------------
  kiki: {
    leadIn: '/videos/nvai_kiki_moulin_rouge_5k.mp4',
    moulinRougeLive: '/videos/moulin_rouge_live_45sec.mp4',
    burlesqueFinal: '/videos/kiki_burlesque_performance_final.mp4',
    burlesqueVariants: [
      '/videos/kiki_burlesque_performance_5k.mp4',
      '/videos/kiki_burlesque_performance_5k_v2.mp4',
      '/videos/kiki_burlesque_performance_5k_v3.mp4',
      '/videos/kiki_burlesque_performance_5k_v4.mp4',
      '/videos/kiki_burlesque_performance_final.mp4',
    ],
    danceOneMinute: '/videos/kiki_dance_performance_1min.mp4',
  },
} as const;
