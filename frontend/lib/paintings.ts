/**
 * The 25-piece collection with per-painting inspiration video mapping.
 * Each painting page uses its inspiration video as the cinematic backdrop.
 */

export interface Painting {
  slug: string;
  artist: string;
  title: string;
  year: string;
  dimensions: string;
  medium: string;
  signed?: string;
  viewingLocation: string;
  inspirationVideo: string;
  inspirationNote: string;
  wing: { label: string; href: string };
  literature?: string[];
  provenanceDoc?: string;
  imageUrl?: string; // Full painting hero image — extracted from provenance dossier
  bernardStory?: string; // Longer narrative for Bernard's voice walkthrough
}

export const PAINTINGS: Painting[] = [
  // ---------------- Picasso (8 active) ----------------
  {
    slug: 'picasso-buste-de-femme-souriante',
    imageUrl: '/paintings/picasso-buste-de-femme-souriante.jpeg',
    artist: 'Pablo Picasso',
    title: 'Buste de femme souriante',
    year: '1901',
    dimensions: '78.5 × 55 cm',
    medium: 'Oil on panel',
    signed: 'Signed lower left',
    viewingLocation: 'France',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/montmartre.mp4',
    inspirationNote: '1901 Montmartre. Bateau-Lavoir winters. Casagemas grief.',
    wing: { label: 'Bateau-Lavoir', href: '/grounds/picasso/bateau-lavoir' },
  },
  {
    slug: 'picasso-femme-assise-1949',
    imageUrl: '/paintings/picasso-femme-assise-1949.jpg',
    artist: 'Pablo Picasso',
    title: 'Femme assise',
    year: '1949',
    dimensions: '61 × 50 cm',
    medium: 'Oil on canvas',
    signed: 'Signed upper right, dated 29.3.49 II',
    viewingLocation: 'To follow',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/antibes.mp4',
    inspirationNote: '1949 Vallauris pottery years. Madoura kiln, Françoise Gilot, the Mediterranean turn.',
    wing: { label: 'Boisgeloup', href: '/grounds/picasso/boisgeloup' },
  },
  {
    slug: 'picasso-homme-pipe-nu',
    imageUrl: '/paintings/picasso-homme-pipe-nu.jpg',
    artist: 'Pablo Picasso',
    title: 'HOMME À LA PIPE ET NU COUCHÉ',
    year: '1967',
    dimensions: '146 × 114 cm',
    medium: 'Oil on canvas',
    signed: 'Signed with date upper left and on reverse',
    viewingLocation: 'To follow',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/antibes.mp4',
    inspirationNote: '1967 Mougins. Late musketeers and nudes, Jacqueline years.',
    wing: { label: 'Mougins', href: '/grounds/picasso/mougins' },
  },
  {
    slug: 'picasso-femme-en-bleu',
    imageUrl: '/paintings/picasso-femme-en-bleu.jpg',
    artist: 'Pablo Picasso',
    title: 'Femme en bleu assise dans un fauteuil',
    year: '1949',
    dimensions: '116 × 89 cm',
    medium: 'Oil on canvas',
    viewingLocation: 'Switzerland',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/antibes.mp4',
    inspirationNote: '1949 Vallauris. Spring afternoons at the Madoura pottery. Françoise reading on the chaise.',
    wing: { label: 'Boisgeloup', href: '/grounds/picasso/boisgeloup' },
  },
  {
    slug: 'picasso-personnages',
    imageUrl: '/paintings/picasso-personnages.jpg',
    artist: 'Pablo Picasso',
    title: 'Personnages',
    year: '1965',
    dimensions: '113 × 194 cm',
    medium: 'Oil on canvas',
    viewingLocation: 'To follow',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/cote-azur.mp4',
    inspirationNote: '1965 Mougins, Notre-Dame-de-Vie. The late musketeer-and-nude theatre.',
    wing: { label: 'Mougins', href: '/grounds/picasso/mougins' },
  },
  {
    slug: 'picasso-enfant-orange',
    imageUrl: '/paintings/picasso-enfant-orange.jpg',
    artist: 'Pablo Picasso',
    title: "L'enfant à l'orange",
    year: '1951',
    dimensions: '108 × 89 cm — PPI-5810',
    medium: 'Enamel on plywood',
    viewingLocation: 'To follow',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/antibes.mp4',
    inspirationNote: '1951 Vallauris. The Paloma portrait.',
    wing: { label: 'Mougins', href: '/grounds/picasso/mougins' },
  },
  {
    slug: 'picasso-enterrement-casagemas',
    imageUrl: '/paintings/picasso-enterrement-casagemas.jpg',
    artist: 'Pablo Picasso',
    title: "L'enterrement de Casagemas / La veillée funèbre",
    year: '1901',
    dimensions: '100 × 90.2 cm',
    medium: 'Oil on canvas',
    viewingLocation: 'Switzerland',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/montmartre.mp4',
    inspirationNote: 'February 1901. Carles Casagemas shoots himself in a Montmartre café over a woman. The Blue Period begins.',
    wing: { label: 'Bateau-Lavoir', href: '/grounds/picasso/bateau-lavoir' },
  },
  {
    slug: 'picasso-maternite',
    imageUrl: '/paintings/picasso-maternite.jpg',
    artist: 'Pablo Picasso',
    title: 'Maternité',
    year: '1901',
    dimensions: '47.4 × 34 cm',
    medium: 'Oil on canvas',
    viewingLocation: 'To follow',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/montmartre.mp4',
    inspirationNote: '1901 Blue Period. Mother and child as composite of the Casagemas grief.',
    wing: { label: 'Bateau-Lavoir', href: '/grounds/picasso/bateau-lavoir' },
  },

  // ---------------- Chagall (6) ----------------
  {
    slug: 'chagall-hommage-paris',
    artist: 'Marc Chagall',
    title: 'Hommage à Paris, Notre Dame',
    year: '1953-54',
    dimensions: '75.2 × 98.4 cm',
    medium: 'Oil on canvas',
    signed: 'Signed & dated lower left',
    viewingLocation: 'France',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/paris.mp4',
    inspirationNote: 'Postwar Paris. Sand texture. Notre Dame as motif.',
    wing: { label: 'The Chagall Room', href: '/parlor/chagall' },
    imageUrl: '/paintings/chagall-hommage-paris.jpg',
  },
  {
    slug: 'chagall-loiseau-rouge',
    artist: 'Marc Chagall',
    title: "L'oiseau Rouge",
    year: '1968-72',
    dimensions: '73 × 60 cm',
    medium: 'Oil on canvas',
    signed: 'Signed twice — once on reverse',
    viewingLocation: 'France',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/muses-lovers.mp4',
    inspirationNote: 'Late Vence years with Vava. The red bird recurring across the late canvases.',
    wing: { label: 'The Chagall Room', href: '/parlor/chagall' },
    imageUrl: '/paintings/chagall-loiseau-rouge.jpg',
  },
  {
    slug: 'chagall-lopera',
    artist: 'Marc Chagall',
    title: "L'Opéra",
    year: '1953',
    dimensions: '92 × 72.5 cm',
    medium: 'Oil on canvas',
    signed: 'Signed & dated lower left',
    viewingLocation: 'Switzerland',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/paris.mp4',
    imageUrl: '/paintings/chagall-lopera.jpg',
    inspirationNote: 'Studies related to the Paris Opéra ceiling.',
    wing: { label: 'The Chagall Room', href: '/parlor/chagall' },
  },
  {
    slug: 'chagall-amoureux-vence',
    imageUrl: '/paintings/chagall-amoureux-vence.jpeg',
    artist: 'Marc Chagall',
    title: 'Les Amoureux de Saint-Paul de Vence',
    year: '1958',
    dimensions: '50 × 72 cm',
    medium: 'Oil on canvas',
    signed: 'Signed lower left',
    viewingLocation: 'To follow',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/muses-lovers.mp4',
    inspirationNote: 'Saint-Paul de Vence, his late village in the hills. Lovers floating above the rooftops — his enduring motif.',
    wing: { label: 'The Chagall Room', href: '/parlor/chagall' },
  },
  {
    slug: 'chagall-female-nude-flowers',
    imageUrl: '/paintings/chagall-female-nude-flowers.jpg',
    artist: 'Marc Chagall',
    title: 'Female Nude with Flowers and Animals',
    year: '1940-44',
    dimensions: '68 × 51.5 cm',
    medium: 'Oil on canvas',
    signed: 'Signed lower right',
    viewingLocation: 'To follow',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/muses-lovers.mp4',
    inspirationNote: 'Wartime exile, New York. Bella sickening and dying in 1944. The bride-and-animals iconography becoming an elegy.',
    wing: { label: 'The Chagall Room', href: '/parlor/chagall' },
  },
  {
    slug: 'chagall-three-jews-talmud',
    imageUrl: '/paintings/chagall-three-jews-talmud.jpg',
    artist: 'Marc Chagall',
    title: 'Three Jews Reading the Talmud',
    year: '1918',
    dimensions: '79 × 62 cm',
    medium: 'Oil on canvas',
    signed: 'Signed lower right',
    viewingLocation: 'Latvia',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/russian-folk.mp4',
    inspirationNote: 'Early Vitebsk period. Golikov Institute analysis on file. 2003 Russian conservation scientific report.',
    wing: { label: 'The Chagall Room', href: '/parlor/chagall' },
  },
  {
    slug: 'chagall-sur-la-table-1975',
    imageUrl: '/paintings/chagall-sur-la-table.jpg',
    artist: 'Marc Chagall',
    title: 'Sur la table (On the Table)',
    year: 'c. 1975',
    dimensions: '45.09 × 32.39 cm',
    medium: 'Oil on board',
    signed: 'Stamped lower left, "Marc Chagall"',
    viewingLocation: 'To follow',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/muses-lovers.mp4',
    inspirationNote:
      'Late Vence years. Still life with flowers, the recurring lineage of floral and symbolic compositions that define Chagall’s mature work. The painting remained in Chagall’s own collection and estate until after his death in 1985.',
    wing: { label: 'The Chagall Room', href: '/parlor/chagall' },
    literature: ['Authentication — Comité Marc Chagall'],
    provenanceDoc: '/provenance/chagall-sur-la-table-1975.pdf',
    bernardStory:
      "This is Marc Chagall's *Sur la Table*, painted around 1975 in Vence. " +
      "What you see is a still life in the classical Dutch tradition — a vase of flowers, a fruit bowl, the painter's table — rendered through Chagall's late, joyful palette of cerulean blues, vermillion, and warm gold. " +
      "The painting remained in Chagall's own collection until after his death in 1985, underscoring its personal significance to him. It belongs to a lineage of floral and symbolic compositions that define his mature work. " +
      "Authenticated by the Comité Marc Chagall.",
  },
  {
    slug: 'chagall-wolf-becomes-shepherd',
    artist: 'Marc Chagall',
    title: '"The Wolf becomes a Shepherd" — La Fontaine\'s Fable',
    year: 'c. 1927',
    dimensions: '51 × 41.5 cm (83.5 × 73.5 cm with frame)',
    medium: 'Gouache on paper',
    signed: 'Signed lower right',
    viewingLocation: 'To follow',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/paris.mp4',
    inspirationNote:
      'From the La Fontaine Fables series commissioned by Ambroise Vollard in 1925 — one hundred gouaches across three years. Chagall went to live in the French countryside to absorb the rural pastoral his Vitebsk childhood had primed him for. The Marc Chagall Committee certified this work in 2020.',
    wing: { label: 'The Chagall Room', href: '/parlor/chagall' },
    literature: ['Certification — Marc Chagall Committee — 2020'],
    provenanceDoc: '/provenance/chagall-wolf-shepherd-1927.pdf',
    imageUrl: '/paintings/chagall-wolf-becomes-shepherd.jpg',
    bernardStory:
      "This is one of Marc Chagall's gouache illustrations for the Fables of Jean de La Fontaine, painted around nineteen twenty-seven. " +
      "The dealer Ambroise Vollard had commissioned one hundred gouaches from him in nineteen twenty-five. Chagall — a Russian-Jewish painter who had never spent serious time in the French countryside — moved to a village in the Auvergne for two years to absorb the pastoral world his childhood in Vitebsk had primed him for. " +
      "What you see here is the wolf, transformed into a shepherd, trying to creep among the sheep. La Fontaine's lesson is that the wolf cannot truly hide his nature; the dog in red, on the right, has already seen through him. " +
      "The piece carries certification from the Marc Chagall Committee dated twenty twenty.",
  },

  // ---------------- Modigliani (4 active — the Pacific Arts canvas is the centrepiece) ----------------
  {
    slug: 'modigliani-sitting-nude-with-crossed-hands',
    artist: 'Amedeo Modigliani',
    title: 'Sitting Nude with Crossed Hands',
    year: 'c. 1917',
    dimensions: '40.5 × 33 cm',
    medium: 'Oil on canvas',
    signed: 'Signed lower right in black paint: modigliani',
    viewingLocation: 'Institut Restellini Analyses Scientifiques, Geneva Freeport, Switzerland (under authentication, Mission Order signed 4 March 2026)',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_modigliani_cafe_5k.mp4',
    inspirationNote:
      'The Pacific Arts Collection canvas. Sixteen-year-old Alice Prin — Kiki — folded hands below the left knee on a red velvet pillow with a greenish tassel. Painted in the studio on the rue de la Grande Chaumière that Modigliani shared with the British painter C. R. W. Nevinson — a studio art history misplaced for 110 years. The painting at the centre of the entire NVAI project.',
    wing: { label: 'Cabinet de Curiosités', href: '/grand-hall/modigliani' },
    literature: [
      'Brokerage Agreement — Robert (Bratislava) + Alexander (Bratislava) + Richard Triberg (Pacific Arts Collection) — 4 March 2026',
      'Mission Order — Institut Restellini Analyses Scientifiques, signed by Xavier Pellaud, Geneva Freeport — March 2026',
      'NVAI Update #4 — Institut Restellini Paris: Unveiling Amedeo Modigliani\'s Sitting Nude w/ Crossed Hand (c.) 1917 — March 2026',
      'Authentication & Analysis Report — Prof. Otto M. Urban (DOX Centre for Contemporary Art, Prague) — 90-day evaluation, 2025',
      'Forensic Report — InsightART (Jiri Lauterkranc) — CERN-derived dual-robotic X-ray microradiography (RToo) — 2022',
      'ARSMensurae forensic analysis — Rome, 2011',
      'ART-Test s.a.s. pigment analysis — Florence, 2014',
      'Prague Municipal Court Appraisal — Modigliani expert, $70M USD, pre-Restellini — 2013',
      'Wildenstein Institute examination — Marc Restellini as curator, two-month review, 2012',
      'Berthe Weill — December 1917 Modigliani Nudes exhibition (closed opening day by Paris police for indecency) — exhibition catalogue entry "Sitting Nude with Crossed Hands"',
      'C. R. W. Nevinson — *An Artist Studio in Montparnasse* — Tate Gallery N04231, presented by H. G. Wells 1927 — Sisley Huddleston letter to New York *Herald Tribune* 24 February 1927 — the documentary trail of the shared studio',
    ],
    provenanceDoc: '/provenance/modigliani-sitting-nude-with-crossed-hands-dossier.pdf',
    imageUrl: '/paintings/modigliani-sitting-nude-with-crossed-hands.jpg',
    bernardStory:
      'This is Amedeo Modigliani\'s "Sitting Nude with Crossed Hands," painted around the autumn of nineteen seventeen. ' +
      'The sitter is Alice Ernestine Prin, sixteen years old, who within the decade would be known to the entire avant-garde of Paris as Kiki de Montparnasse. ' +
      'She had been working at a small restaurant on the rue Campagne-Première called Chez Rosalie\'s when Modigliani first began sketching her — obsessively, in pencil and chalk, on the back of menus and across the inside of cigarette boxes — over the two years between when they met in nineteen fifteen and when this canvas was painted. ' +
      'She is seated on a red velvet pillow with a greenish tassel. Her hands are folded below her left knee. The signature white shawl that appears in over two dozen of Modigliani\'s nineteen seventeen nudes is draped over the chair behind her. ' +
      'The painting was made in a studio on the rue de la Grande Chaumière that Modigliani shared with the British war painter Christopher Richard Wynne Nevinson — a fact art history misplaced for one hundred and ten years until the painter and historian Richard Triberg recognised the same red pillow in Nevinson\'s nineteen twenty-six Tate canvas, *An Artist Studio in Montparnasse.* ' +
      'The painting was exhibited at the Berthe Weill gallery in the December nineteen seventeen Modigliani nudes show — the show the Paris police closed on opening day for indecency. ' +
      'It passed quietly into private hands in the years that followed and surfaced in Bratislava in twenty-thirteen, when a Modigliani specialist filed a seventy-million-dollar appraisal with the Prague Municipal Court. ' +
      'In two thousand twelve the painting was examined at the Wildenstein Institute in Paris under Marc Restellini\'s own curatorship. Fourteen years later, on the eighteenth of March, two thousand twenty-six, the same Marc Restellini received the painting at his own Institut for full scientific authentication and catalogue raisonné review. The signature in the lower right reads modigliani in black paint. The verdict is pending.',
  },
  {
    slug: 'modigliani-nu-couche',
    artist: 'Amedeo Modigliani',
    title: 'Nu couché aux bras levés / Nu sur un divan',
    year: '1916',
    dimensions: '60 × 92 cm',
    medium: 'Oil on canvas',
    signed: 'Signed upper right',
    viewingLocation: 'To follow',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/muses-lovers.mp4',
    inspirationNote: 'The Kiki anchor. 107 years lost — the relationship discovery that drives the Kiki exposé.',
    wing: { label: 'Cabinet de Curiosités', href: '/grand-hall/modigliani' },
  },
  {
    slug: 'modigliani-ritratto-di-donna',
    artist: 'Amedeo Modigliani',
    title: 'Ritratto Di Donna',
    year: '1915',
    dimensions: '45.5 × 60 cm',
    medium: 'Oil on canvas',
    signed: 'Signed upper right',
    viewingLocation: 'Switzerland',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/african-masks.mp4',
    inspirationNote: '1915 Montparnasse. The Cycladic-and-African-mask geometry that defined his portrait formula. Beatrice Hastings as the model.',
    wing: { label: 'Cabinet de Curiosités', href: '/grand-hall/modigliani' },
  },
  {
    slug: 'modigliani-cheron',
    artist: 'Amedeo Modigliani',
    title: 'Portrait de Monsieur Chéron',
    year: '1915?',
    dimensions: '45.5 × 32.7 cm',
    medium: 'Oil on canvas',
    signed: 'Signed lower left',
    viewingLocation: 'Great Britain',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/paris.mp4',
    inspirationNote: 'The dealer-period portrait. Installation history documented.',
    wing: { label: 'Cabinet de Curiosités', href: '/grand-hall/modigliani' },
  },

  // ---------------- Da Vinci (1) ----------------
  {
    slug: 'davinci-lady-with-fur',
    imageUrl: '/paintings/davinci-lady-with-fur.jpg',
    artist: 'Leonardo da Vinci',
    title: 'Lady with a Fur',
    year: '1495-1499',
    dimensions: '61.5 × 54.5 cm',
    medium: 'Oil tempera on poplar wood',
    viewingLocation: 'Switzerland',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/milan-court.mp4',
    inspirationNote: 'The Milan-court period. Sforza-era attribution under Prague gallery review.',
    wing: { label: 'Da Vinci Workshop', href: '/grounds/davinci' },
  },

  // ---------------- Raphael (1 active) ----------------
  {
    slug: 'raphael-madonna-child',
    imageUrl: '/paintings/raphael-madonna-child.jpg',
    artist: 'Raphael',
    title: 'Madonna with Child',
    year: '1500-1510',
    dimensions: '157 × 127 cm',
    medium: 'Oil on canvas',
    viewingLocation: 'To follow',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/florence-workshop.mp4',
    inspirationNote: 'Early Florentine years. The Madonna formula being perfected.',
    wing: { label: 'Renaissance Studiolo', href: '/upstairs/raphael' },
  },

  // ---------------- Monet (1) ----------------
  {
    slug: 'monet-lavacourt-neige',
    artist: 'Claude Monet',
    title: 'La berge de Lavacourt sous la neige',
    year: 'c. 1879',
    dimensions: '55.2 × 73.5 cm',
    medium: 'Oil on canvas',
    signed: 'Signed lower left "Claude Monet"',
    viewingLocation: 'Paris',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_monet_secret_garden_5k.mp4',
    inspirationNote:
      'Lavacourt winter, 1879. The year Camille died there in September. The grief paintings made that month from his window. Catalogued by Wildenstein as no. 512.',
    wing: { label: 'Giverny', href: '/grounds/monet' },
    literature: [
      'D. Wildenstein, Claude Monet: Biographie et catalogue raisonné, vol. I, Paris, 1974, no. 512, p. 336, ill. p. 337',
      'D. Wildenstein, Claude Monet: Catalogue raisonné, vol. II, Cologne, 1996, no. 512, p. 202',
    ],
    provenanceDoc: '/provenance/monet-lavacourt-neige-1879.pdf',
    imageUrl: '/paintings/monet-lavacourt-neige.jpg',
    bernardStory:
      "This is Claude Monet's view across the Seine at Lavacourt, painted in the winter of 1879 — the worst winter of his life. His wife Camille was dying in the upstairs bedroom of the small rented house just behind us. " +
      "In September she would be gone, leaving him with two young sons and no money. He painted this from a window. " +
      "Notice the lone figure crossing the snow — there is almost no horizon line, no sky, only the cold weight of the riverbank and the dimmer behind. This is grief made into a landscape. " +
      "It is catalogued by Daniel Wildenstein as number five hundred and twelve. The signature, lower left, is faint but unmistakable. The painting has lived in private collections since.",
  },

  // ---------------- Matisse (1) ----------------
  {
    slug: 'matisse-woman-child',
    imageUrl: '/paintings/matisse-woman-child.jpg',
    artist: 'Henri Matisse',
    title: 'Woman with Child',
    year: 'undated',
    dimensions: '74.5 × 76 cm',
    medium: 'Oil on paper mounted on cardboard',
    signed: 'Pictogram signature on right side',
    viewingLocation: 'Czech Republic',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/cote-azur.mp4',
    inspirationNote: 'The pictogram-signature work. The Côte d&rsquo;Azur years.',
    wing: { label: 'Mediterranean Pavilion', href: '/matisse' },
  },

  // ---------------- Kandinsky (2) ----------------
  {
    slug: 'kandinsky-composition-russian',
    artist: 'Wassily Kandinsky',
    title: 'Composition (Cyrillic title)',
    year: 'To follow',
    dimensions: '43 × 36 cm',
    medium: 'Oil on canvas',
    signed: 'Signed',
    viewingLocation: 'To follow',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/moscow.mp4',
    inspirationNote: 'Russian-period composition. Title transliterates from Cyrillic. Likely 1915–21 Moscow return years.',
    wing: { label: 'The Creepy Room', href: '/upstairs/kandinsky' },
  },
  {
    slug: 'kandinsky-composition-1910',
    imageUrl: '/paintings/kandinsky-composition-1910.jpg',
    artist: 'Wassily Kandinsky',
    title: 'Composition (1910)',
    year: '1910',
    dimensions: '66.5 × 89 cm',
    medium: 'Oil on canvas',
    signed: 'Signed',
    viewingLocation: 'Poland',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/music-synesthesia.mp4',
    inspirationNote: '1910 Murnau period. The threshold into pure abstraction.',
    wing: { label: 'The Creepy Room', href: '/upstairs/kandinsky' },
  },

  // ---------------- Kahlo (1) ----------------
  {
    slug: 'kahlo-la-mesa-herida',
    imageUrl: '/paintings/kahlo-la-mesa-herida.jpg',
    artist: 'Frida Kahlo',
    title: 'La Mesa Herida',
    year: '1939-40',
    dimensions: '244 × 122 cm',
    medium: 'Oil on canvas',
    signed: 'Signed',
    viewingLocation: 'UAE',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/pain-suffering.mp4',
    inspirationNote: '1939-40. The largest and most contested. Prague gallery framing the disclosure.',
    wing: { label: 'Casa Azul', href: '/grounds/frida' },
  },

  // ---------------- Pollock (2 — newly added) ----------------
  {
    slug: 'pollock-number-1-1950',
    artist: 'Jackson Pollock',
    title: 'Number 1 (Lavender Mist)',
    year: '1950',
    dimensions: 'TBD',
    medium: 'Oil, enamel, and aluminium on canvas',
    viewingLocation: 'To follow',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/studio-revolution.mp4',
    inspirationNote: '1950 East Hampton — the drip-paint apex. Springs studio floor as canvas, choreography on the ground.',
    wing: { label: 'The Pollock Studio', href: '/grand-hall/pollock' },
  },
  {
    slug: 'pollock-number-2-1950',
    imageUrl: '/paintings/pollock-number-2-1950.jpg',
    artist: 'Jackson Pollock',
    title: 'Number 2 (heavy drip)',
    year: '1950',
    dimensions: 'TBD',
    medium: 'Enamel on canvas',
    viewingLocation: 'To follow',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/abstract-harmony.mp4',
    inspirationNote: '1950 East Hampton. Heavy-drip period — $17M appraisal on record.',
    wing: { label: 'The Pollock Studio', href: '/grand-hall/pollock' },
  },

  // ---------------- Bernard (1) ----------------
  {
    slug: 'bernard-passion',
    imageUrl: '/paintings/bernard-passion.jpg',
    artist: 'Émile Bernard',
    title: 'La Passion de Jésus-Christ ou Le Calvaire',
    year: 'c. 1926-1940',
    dimensions: '290 × 193 cm',
    medium: 'Oil on canvas',
    viewingLocation: 'St. Helena, California',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/nvai_raphael_chapel_5k.mp4',
    inspirationNote: 'Late religious altarpiece. Pont-Aven School inheritance turned Russian-icon hieratic.',
    wing: { label: 'Russian Enchantment Chapel', href: '/upstairs/bernard' },
  },
];

export function getPainting(slug: string): Painting | undefined {
  return PAINTINGS.find((p) => p.slug === slug);
}

export function paintingsByArtist(artist: string): Painting[] {
  return PAINTINGS.filter((p) => p.artist === artist);
}

export function paintingsByWing(wingHref: string): Painting[] {
  return PAINTINGS.filter((p) => p.wing.href === wingHref);
}
