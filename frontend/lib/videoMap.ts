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
  home: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_aerial_drone_approach_5k.mp4',
  foyer: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_grand_foyer_5k.mp4',
  foyerWelcome: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_foyer_landing_handshot_5k.mp4',
  foyerAerialStatic: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_foyer_aerial_static.mp4',
  foyerAerialPan: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/foyer_aerial_pan_final.mp4',
  staircase: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_foyer_aerial_static.mp4',
  garden: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_garden_party_5k.mp4',
  gardenPassage: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_garden_passage_5k.mp4',
  gardenPath: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_garden_path_continuous_5k.mp4',
  gardenPathToPatio: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_garden_path_to_patio_5k.mp4',
  courtyard: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_courtyard_5k.mp4',
  grandHall: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_grand_foyer_5k.mp4',
  auction: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/foyer_aerial_pan_final.mp4',

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

  // The Parlor — bohemian bar atmosphere. Chagalls hang here as decor;
  // the bar itself is the scene. Visitor goes into the Chagall sub-room for
  // the individual painting experience.
  parlor: {
    leadIn: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_courtyard_5k.mp4',
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

  modigliani: {
    leadIn: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_modigliani_cafe_5k.mp4',
    rotation: [
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/african-masks.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/muses-lovers.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/montmartre.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/paris.mp4',
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

  raphael: {
    leadIn: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/florence-workshop.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/rome-vatican.mp4', 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/milan-court.mp4'],
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

  monet: {
    leadIn: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_monet_secret_garden_5k.mp4',
    rotation: [
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_garden_passage_5k.mp4',
    ],
  } as WingVideos,

  matisse: {
    leadIn: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/cote-azur.mp4',
    rotation: ['https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/antibes.mp4'],
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

  bernard: {
    leadIn: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_raphael_chapel_5k.mp4',
    rotation: [],
  } as WingVideos,

  // ---------------------------------------------------------------------------
  // Kiki — multiple files, treated as named clips not rotation
  // ---------------------------------------------------------------------------
  kiki: {
    leadIn: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_kiki_moulin_rouge_5k.mp4',
    moulinRougeLive: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/moulin_rouge_live_45sec.mp4',
    burlesqueFinal: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/kiki_burlesque_performance_final.mp4',
    burlesqueVariants: [
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/kiki_burlesque_performance_5k.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/kiki_burlesque_performance_5k_v2.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/kiki_burlesque_performance_5k_v3.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/kiki_burlesque_performance_5k_v4.mp4',
      'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/kiki_burlesque_performance_final.mp4',
    ],
    danceOneMinute: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/kiki_dance_performance_1min.mp4',
  },
} as const;
