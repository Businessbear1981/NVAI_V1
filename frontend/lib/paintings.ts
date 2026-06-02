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
    bernardStory:
      "This is Pablo Picasso's Buste de femme souriante, painted in Paris in the spring of nineteen oh one, when the artist was nineteen years old and not yet known beyond a handful of dealers on the rue Laffitte. " +
      "He had arrived from Barcelona that May with his closest friend, the Catalan painter Carles Casagemas. By February Casagemas would shoot himself in the Hippodrome café over a woman named Germaine Pichot, who had refused him. The Blue Period is what Picasso painted to bury him. " +
      "But this canvas comes before that. The smile is still there. The palette is still warm, lit by the gas-lamp interiors of the cabarets of Montmartre where Picasso was painting prostitutes and absinthe drinkers for the dealer Pere Mañach at one hundred and fifty francs a month. The sitter is unnamed in the records, almost certainly one of the women of the quarter who modelled for him that summer for the price of a meal. " +
      "It is one of the last paintings he made before grief reshaped him. The signature, lower left, is the early Picasso flourish, before he simplified it to a single line. Within five years he would be the most spoken-of painter in Paris.",
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
    viewingLocation: 'Private collection — disclosed under DDNDA',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/antibes.mp4',
    inspirationNote: '1949 Vallauris pottery years. Madoura kiln, Françoise Gilot, the Mediterranean turn.',
    wing: { label: 'Boisgeloup', href: '/grounds/picasso/boisgeloup' },
    bernardStory:
      "This is Femme assise, painted at Vallauris on the twenty-ninth of March, nineteen forty-nine — the second canvas of that day, as the inscription upper right confirms. Picasso was sixty-seven, living above the Madoura pottery with the painter Françoise Gilot, who was twenty-six and the mother of his son Claude, then almost two. " +
      "Vallauris was a near-abandoned ceramics town when Picasso settled there in nineteen forty-six. He had walked into the Madoura kiln of Suzanne and Georges Ramié, asked for clay, and within three years revived the entire industry. The seated woman in this canvas is Françoise, the same long neck and dark eyes that fill the great Vallauris portraits of those years. " +
      "It was made the same spring he was finishing the lithograph of the dove that would become the Communist Party's peace symbol at the Paris Congress that April. Within four years Françoise would leave him, the only one of his women to do so on her own terms. Her memoir of those years, published in nineteen sixty-four, was the book he tried three times in the French courts to suppress.",
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
    viewingLocation: 'Private collection — disclosed under DDNDA',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/antibes.mp4',
    inspirationNote: '1967 Mougins. Late musketeers and nudes, Jacqueline years.',
    wing: { label: 'Mougins', href: '/grounds/picasso/mougins' },
    bernardStory:
      "This is Homme à la pipe et nu couché, painted at Notre-Dame-de-Vie, the villa above Mougins, in nineteen sixty-seven. Picasso was eighty-five. His wife Jacqueline Roque, thirty-eight years his junior, was the only person he saw on most days. The household had narrowed to the two of them and a few servants. " +
      "The musketeer with the pipe is the figure that arrived in his work in nineteen sixty-six, after a long convalescence from gallbladder surgery in which he reread Alexandre Dumas. The art critics of the Paris press were merciless about these late canvases — they called them senile, repetitive, the work of a painter who had outlived his moment. " +
      "He painted three hundred and forty-seven canvases in nineteen sixty-eight alone, the year after this. He was racing something. The nude beside the musketeer is Jacqueline, again, as every nude of that decade is Jacqueline. " +
      "When the Avignon retrospective opened the year of his death and again the year after, the same critics revised themselves. The late work, they decided, was the freest painting he had ever made. He had been dead by then for five years.",
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
    bernardStory:
      "This is Femme en bleu assise dans un fauteuil, painted at Vallauris in nineteen forty-nine. The seated figure is Françoise Gilot, twenty-seven years old, the painter who had walked into Picasso's life at a wartime restaurant called Le Catalan in May nineteen forty-three when she was twenty-one and he was sixty-one. " +
      "She came with a friend. Picasso brought a bowl of cherries to their table and asked her to come back. She did, after months. " +
      "The blue dress in this canvas is the one she wore at Vallauris that spring, the spring after their second child Paloma was born in April. The fauteuil is the wicker armchair from the upstairs room above the Madoura pottery. The whole canvas is built on the harmonics of cobalt and rose, the same key as the great Femme-fleur of nineteen forty-six. " +
      "She was the only one of his lovers who left of her own accord, in September nineteen fifty-three, taking the two children with her. He retaliated by ensuring no dealer in Paris would show her work for a decade. She painted anyway. She is the reason this canvas exists.",
  },
  {
    slug: 'picasso-personnages',
    imageUrl: '/paintings/picasso-personnages.jpg',
    artist: 'Pablo Picasso',
    title: 'Personnages',
    year: '1965',
    dimensions: '113 × 194 cm',
    medium: 'Oil on canvas',
    viewingLocation: 'Private collection — disclosed under DDNDA',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/cote-azur.mp4',
    inspirationNote: '1965 Mougins, Notre-Dame-de-Vie. The late musketeer-and-nude theatre.',
    wing: { label: 'Mougins', href: '/grounds/picasso/mougins' },
    bernardStory:
      "This is Personnages, painted at Notre-Dame-de-Vie in nineteen sixty-five — a horizontal canvas of nearly two metres, larger than almost any other work of those Mougins years. Picasso was eighty-three. " +
      "Nineteen sixty-five was the year of the gallbladder operation in the American Hospital at Neuilly, the last serious surgery of his life. He was forbidden to paint for weeks. When he returned to the easel at Mougins that autumn, the figures came back the way the late figures always came back to him — as a theatre of types rather than portraits. The musketeer, the nude, the painter, the matador. " +
      "Jacqueline Roque, his second wife and the only person allowed into the studio in those years, sat for nearly every female figure in this period. The household at Notre-Dame-de-Vie had become almost monastic, two locked gates and a small staff. He saw no one but Jacqueline and his dealer Daniel-Henry Kahnweiler. " +
      "When the Avignon Palais des Papes retrospective opened in May nineteen seventy with one hundred and sixty-seven canvases from these final years, the French press dismissed them. They are now the most contested and the most expensive of his late career.",
  },
  {
    slug: 'picasso-enfant-orange',
    imageUrl: '/paintings/picasso-enfant-orange.jpg',
    artist: 'Pablo Picasso',
    title: "L'enfant à l'orange",
    year: '1951',
    dimensions: '108 × 89 cm — PPI-5810',
    medium: 'Enamel on plywood',
    viewingLocation: 'Private collection — disclosed under DDNDA',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/antibes.mp4',
    inspirationNote: '1951 Vallauris. The Paloma portrait.',
    wing: { label: 'Mougins', href: '/grounds/picasso/mougins' },
    bernardStory:
      "This is L'enfant à l'orange, painted at Vallauris in nineteen fifty-one. The child is Paloma Picasso, two years old, born to Picasso and Françoise Gilot in April nineteen forty-nine at the height of the Madoura pottery years. Her name means dove in Spanish. " +
      "Picasso painted his children rarely and almost never in conventional portraits. The works of Claude and Paloma from these Vallauris years are the great exception, a small body of canvases done at home, on whatever surface was at hand. This one is enamel on plywood, the kind of fast industrial paint he had begun using on the ceramic kiln boards and later on the great Korean War canvas Massacre in Korea, painted that same January in the studio just below. " +
      "The catalogue number, PPI five thousand eight hundred and ten, places it in the inventory of the Picasso Project archive. " +
      "Paloma would grow up to become a jeweller and a fragrance house, and one of the most public of Picasso's heirs in the long legal battle over the estate that followed his death in nineteen seventy-three. The orange in her hand is the same colour as the studio walls at Vallauris that spring.",
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
    bernardStory:
      "This is L'enterrement de Casagemas, the wake-painting Pablo Picasso made in the summer of nineteen oh one, four months after the death of his closest friend. " +
      "On the evening of the seventeenth of February, the Catalan painter Carles Casagemas walked into the Hippodrome café on the boulevard de Clichy carrying a revolver. He fired across the table at the woman who had refused him, Germaine Pichot, then turned the pistol on himself. Germaine survived. Casagemas did not. " +
      "Picasso was in Madrid at the time. He returned to Paris that May. By July he had taken over the studio Casagemas had been using on the boulevard de Clichy and was painting in it daily. " +
      "What you see is the funeral wake transposed into the visual grammar of El Greco's Burial of the Count of Orgaz, the two registers, the earthly mourners below and the heavenly reception above. Casagemas is the figure in the white shroud. The horse at the centre is the borrowed horse of the dying. " +
      "Picasso said years later, decades later, to Pierre Daix, I started painting in blue when I realised Casagemas was dead. This is the canvas where that began. Nothing in his work before this looks like it. Almost everything in the next four years does.",
  },
  {
    slug: 'picasso-maternite',
    imageUrl: '/paintings/picasso-maternite.jpg',
    artist: 'Pablo Picasso',
    title: 'Maternité',
    year: '1901',
    dimensions: '47.4 × 34 cm',
    medium: 'Oil on canvas',
    viewingLocation: 'Private collection — disclosed under DDNDA',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/montmartre.mp4',
    inspirationNote: '1901 Blue Period. Mother and child as composite of the Casagemas grief.',
    wing: { label: 'Bateau-Lavoir', href: '/grounds/picasso/bateau-lavoir' },
    bernardStory:
      "This is Maternité, painted in Paris in the autumn of nineteen oh one, the months immediately after the Casagemas suicide and immediately before the colour drained from Picasso's palette into the long austerity of the Blue Period. " +
      "He was nineteen, sharing rooms on the boulevard de Clichy with his dealer Pere Mañach, who had put him on a stipend of one hundred and fifty francs a month. The mother-and-child motif arrived in his work that summer in the form of studies he made at the Saint-Lazare women's prison, a charity hospital where prostitutes were held with their infant children for medical treatment. Picasso obtained a permit to draw there in October. " +
      "What you see is a composite, not a portrait. The mother is built from those Saint-Lazare drawings; the child from his memory of his sister Lola's own son, born in Barcelona that year. The greenish tonality and the heavy outline are the language he would carry into the great Blue paintings of nineteen oh three, the Vie and the Tragédie. " +
      "He kept this canvas in his own collection until at least nineteen oh six. It was the foundation. Every later mother in his work, including the Vallauris ones of his own children five decades later, traces back to it.",
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
    bernardStory:
      "This is Marc Chagall's Hommage à Paris, Notre Dame, painted in nineteen fifty-three and four. " +
      "Chagall had returned to France in nineteen forty-eight after the long American exile, after the death in New York of his first wife Bella Rosenfeld in September nineteen forty-four from a streptococcal infection that the wartime hospitals refused to treat with penicillin. He was sixty-one. He could not work for nearly a year after her death. " +
      "By the time of this canvas, he had begun again, settled at Vence on the Côte d'Azur, in the company of Valentina Brodsky, called Vava, who would become his second wife in nineteen fifty-two. The Paris he is paying homage to here is the Paris he had left in nineteen forty-one ahead of the Vichy round-ups, the Paris of the Pont des Arts and the rue d'Auteuil and the floating lovers above the cathedral. " +
      "The sand mixed into the pigment is a Chagall technique of these postwar years, learned from the Dutch tradition, which gives the surface its low matte glow. The signature lower left is dated in the manner he reserved for the canvases he considered finished. " +
      "He would live another three decades in Vence, dying in his elevator at the age of ninety-seven in nineteen eighty-five.",
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
    bernardStory:
      "This is L'oiseau Rouge, painted at Saint-Paul de Vence between nineteen sixty-eight and nineteen seventy-two. Chagall was in his eighties, working in the studio he had built on the hillside above the village with his second wife Valentina Brodsky, called Vava. " +
      "The red bird is one of the motifs that recurs across the last two decades of his work, from the Paris Opéra ceiling of nineteen sixty-four to the Metropolitan Opera murals of nineteen sixty-six. He attributed it, in conversation with the critic Franz Meyer, to the rooster of his grandfather's barnyard in Vitebsk, the small Belarusian town where he was born in eighteen eighty-seven into a Hasidic family of eight children, the eldest son of a herring merchant. " +
      "The canvas is signed twice, the second signature on the reverse — a Chagall habit of these late years when assistants and family members were increasingly present at the easel. " +
      "The Marc Chagall Committee in Paris, founded by his daughter Ida and his stepdaughter Bella Meyer, is the body that certifies these late works. The recurring red bird, in Vava's reading, was the soul of Bella Rosenfeld, his first wife, who had died in upstate New York in nineteen forty-four and never left the canvases.",
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
    bernardStory:
      "This is L'Opéra, painted by Marc Chagall in nineteen fifty-three, eleven years before he was given the commission that would change the building it depicts. " +
      "In nineteen sixty-four, André Malraux, then de Gaulle's minister of culture, asked Chagall to paint a new ceiling for the Palais Garnier, the Charles Garnier opera house of eighteen seventy-five. The French press was apoplectic. A Russian Jew painting over the original Jules-Eugène Lenepveu ceiling of the Third Republic. The campaign against him in Le Figaro lasted months. " +
      "He worked anyway. The finished ceiling, two hundred and twenty square metres in twelve panels, was installed in September nineteen sixty-four. " +
      "But this canvas comes from a decade earlier. It is the painter circling his subject before he has been asked, the music and the bouquets and the angels of the operatic repertoire arranging themselves in his pictorial language the way they would later arrange themselves in the ceiling. The signature and date lower left place it firmly in nineteen fifty-three, the same year as the Hommage à Paris. " +
      "By the time he died in nineteen eighty-five, the Garnier ceiling was the most photographed ceiling in France. The critics had long since gone quiet.",
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
    viewingLocation: 'Private collection — disclosed under DDNDA',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/muses-lovers.mp4',
    inspirationNote: 'Saint-Paul de Vence, his late village in the hills. Lovers floating above the rooftops — his enduring motif.',
    wing: { label: 'The Chagall Room', href: '/parlor/chagall' },
    bernardStory:
      "This is Les Amoureux de Saint-Paul de Vence, painted in nineteen fifty-eight. Chagall had moved to the medieval hill village of Saint-Paul in nineteen forty-nine and would live there in some form for the rest of his life, the last thirty-six years. " +
      "The lovers floating above the rooftops are his oldest motif, going back to the nineteen fifteen canvas Birthday painted for his first wife Bella Rosenfeld in their courting year in Vitebsk. He continued to paint them after Bella died in upstate New York in September nineteen forty-four, after he had remarried in nineteen fifty-two to Valentina Brodsky, called Vava. Friends and critics, including Bella's daughter Ida, observed that the lovers in the later canvases sometimes have Bella's face and sometimes Vava's and occasionally a face that belongs to neither and to both. " +
      "The village rooftops below are the actual roofs of Saint-Paul, identifiable from the campanile of the Collégiale and the Vence road that climbs to the right. The signature lower left is the firm full signature of the satisfied years. " +
      "Saint-Paul gave him his last working studio and, eventually, his grave in the small cemetery at the village walls, where he was buried in March nineteen eighty-five next to Vava, who joined him eight years later.",
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
    viewingLocation: 'Private collection — disclosed under DDNDA',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/muses-lovers.mp4',
    inspirationNote: 'Wartime exile, New York. Bella sickening and dying in 1944. The bride-and-animals iconography becoming an elegy.',
    wing: { label: 'The Chagall Room', href: '/parlor/chagall' },
    bernardStory:
      "This is Female Nude with Flowers and Animals, painted between nineteen forty and nineteen forty-four — the years of the American exile. " +
      "Chagall and his wife Bella Rosenfeld had fled Marseille in May nineteen forty-one on a freighter to Lisbon, then to New York, on a rescue visa arranged by the journalist Varian Fry and the Museum of Modern Art's Alfred Barr. He was fifty-four. Bella was forty-nine. Their daughter Ida had followed with the canvases packed in crates. " +
      "The bride-and-animals iconography that runs through this canvas is the same one Chagall had been painting since the Vitebsk wedding pictures of nineteen fifteen. By the early forties it had darkened. Bella began to sicken in nineteen forty-three at the Beaver Lake summer cottage in the Adirondacks. " +
      "On the second of September nineteen forty-four, two days after the liberation of Paris, she died at the Saint-Régis hospital outside Saranac Lake of a streptococcal infection that wartime rationing had left untreated. She was fifty-three. " +
      "Chagall turned his canvases to the wall. He could not paint for nine months. When he could, the women in his work became composite figures, part-Bella, part-recollection, part-elegy. This canvas, finished in those last months before her death, is one of the bridge works — a marriage portrait that became a memorial without the painter knowing it would.",
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
    bernardStory:
      "This is Three Jews Reading the Talmud, painted in nineteen eighteen in Vitebsk, the year Marc Chagall was appointed Commissar of Fine Arts for the Vitebsk Governorate by the new Soviet government and given the eighteenth-century mansion of the banker Vishnyak to use as the People's Art School. He was thirty years old. " +
      "His friend and rival Kazimir Malevich would arrive at the school the following year, and within months would manoeuvre Chagall out of his own institution by converting the faculty to Suprematism. By nineteen twenty Chagall had left for Moscow. " +
      "But this canvas is from before that. It belongs to the small body of religious genre paintings he made in his birth city in the year after the October Revolution, the year his daughter Ida was born, the year he believed for the last time that a Russian Jewish renaissance was possible inside the new state. The three men reading are figures of his Hasidic childhood — his uncle Israel and the elders of the Lyubavitsky synagogue on Pokrovskaya street. " +
      "The Golikov Institute conservation analysis of two thousand and three, filed in the dossier, confirms the pigment and ground are consistent with the Vitebsk materials of those years. The signature lower right is the early Russian-language signature, in Cyrillic and Latin. Within five years all three of the men in this canvas would be dead or dispersed.",
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
    viewingLocation: 'Private collection — disclosed under DDNDA',
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
    viewingLocation: 'Private collection — disclosed under DDNDA',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/paris.mp4',
    inspirationNote:
      'From the La Fontaine Fables series commissioned by Ambroise Vollard in 1925 — one hundred gouaches across three years. Chagall went to live in the French countryside to absorb the rural pastoral his Vitebsk childhood had primed him for. The Marc Chagall Committee certified this work in 2020.',
    wing: { label: 'The Chagall Room', href: '/parlor/chagall' },
    literature: ['Certification — Marc Chagall Committee — 2020'],
    provenanceDoc: '/provenance/chagall-wolf-shepherd-1927.pdf',
    // imageUrl intentionally omitted — the file currently named chagall-wolf-becomes-shepherd.jpg is mislabeled (it actually shows "Sur la table" 1975). Authentic image source: C:\Users\sgill\Downloads\Marc Chagall - Wolf becomes a Shepherd - (c.) 1927 - Gouache on Paper - Signed Lower Right - Partial Provenance_Page_1.jpg — needs manual copy into public/paintings/ as chagall-wolf-becomes-shepherd.jpg (after deleting the wrong file).
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
    imageUrl: '/paintings/modigliani-nu-couche.jpg',
    viewingLocation: 'Private collection — disclosed under DDNDA',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/muses-lovers.mp4',
    inspirationNote: 'The Kiki anchor. 107 years lost — the relationship discovery that drives the Kiki exposé.',
    wing: { label: 'Cabinet de Curiosités', href: '/grand-hall/modigliani' },
    bernardStory:
      "This is Nu couché aux bras levés, also known as Nu sur un divan, painted by Amedeo Modigliani in nineteen sixteen. He was thirty-two years old, two years from his death, and had just begun the great sequence of reclining nudes that the dealer Léopold Zborowski was paying him five francs a day to produce in a studio on the rue Joseph-Bara. " +
      "The sitter is Alice Ernestine Prin, fifteen years old, the same girl who would within a decade be known as Kiki de Montparnasse. She had arrived in Paris from Châtillon-sur-Seine in nineteen fourteen to live with an aunt, had been thrown out of that household for posing nude, and had been earning a few francs a session at the academies of Montparnasse when Modigliani found her at the restaurant Chez Rosalie on the rue Campagne-Première. " +
      "What art history has misplaced for one hundred and seven years is the working relationship between them, the two years of drawings on menu cards and cigarette packets and the small body of oils, of which this is one. The discovery of that relationship, retraced in the dossier compiled by the painter Richard Triberg, is what the Kiki exposé returns to the record. " +
      "The signature upper right is in the formal Modigliani of these Zborowski years. The bracelet of the nudes show at Berthe Weill in December nineteen seventeen — the show the Paris police closed on opening day for indecency — almost certainly included this canvas in some form.",
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
    bernardStory:
      "This is Ritratto di Donna, painted by Amedeo Modigliani in nineteen fifteen, the year he set aside sculpture and returned full-time to painting. The dust of the limestone blocks he had been carving since nineteen oh nine in the Montparnasse studios of Constantin Brâncuși had begun to ruin his lungs. His tuberculosis, which he had carried since boyhood in Livorno, was no longer something a stonecarver could survive. " +
      "The sitter, almost certainly, is Beatrice Hastings, the South African-English poet who had arrived in Paris from London in May nineteen fourteen as the European correspondent for Alfred Orage's review The New Age. She was thirty-five, four years older than Modigliani, and the two of them lived together at the rue Norvins in Montmartre for the two years of their wreckage of a love affair. " +
      "What you see in this portrait is the formula crystallising — the almond Cycladic head from the carved limestone caryatids, the African mask geometry of the eyes that had no pupils in the sculptures and acquire one cobalt iris in the paintings, the long uninterrupted line from temple to chin. He would paint Beatrice fourteen times in two years. " +
      "She left him in nineteen sixteen for the sculptor Alfredo Pina. Modigliani had four years left to live. The signature upper right is the firm early Modigliani, before tuberculosis softened his hand.",
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
    bernardStory:
      "This is Portrait de Monsieur Chéron, painted by Amedeo Modigliani around nineteen fifteen. The sitter is Georges Chéron, the wine merchant turned art dealer whose gallery at thirty-six rue de la Boétie was, briefly and unhappily, the closest thing Modigliani had to a Paris dealer in those years. " +
      "The arrangement, as the painter André Salmon later described it, was wretched. Chéron, who paid the rent on a cellar studio in the gallery basement, would lock Modigliani in each morning with a bottle of brandy, a model, and a stretched canvas, and let him out at night with a few francs and the finished painting. Modigliani was thirty-one. He had been in Paris for nine years. " +
      "He repaid the indignity by painting his dealer, in this canvas, with the same Cycladic abstraction he reserved for the demimondaines and the children. The long oval head, the unfocused eyes, the suit reduced to two flat planes — Chéron treated as no more or less of a subject than the women who had passed through the same basement studio that summer. " +
      "The signature lower left dates to the early Modigliani hand. The installation history is documented in the Restellini and Parisot files. Chéron sold the painting within a year of completion and never spoke publicly of the painter who had made him.",
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
    bernardStory:
      "This is Lady with a Fur, attributed to Leonardo da Vinci and dated to the final years of his Milan court period, between fourteen ninety-five and fourteen ninety-nine. Leonardo was then in his middle forties, in the service of Ludovico Maria Sforza, called il Moro, the regent and later duke of Milan. " +
      "The sitter, if the attribution holds, is almost certainly drawn from the same Sforza court circle that produced the two undisputed Milan portraits, the Lady with an Ermine of fourteen eighty-nine and ninety, which is Cecilia Gallerani, the duke's mistress, and the Belle Ferronnière of about fourteen ninety-five, which may be Lucrezia Crivelli. The fur in this canvas, the squared shoulder, the three-quarter turn of the head — these are the visual vocabulary of those Sforza commissions. " +
      "The poplar panel and the oil-tempera mixed technique are consistent with Leonardo's documented Milan practice, recorded in the inventories of his workshop on the Corte Vecchia. The attribution is under formal review at the Prague Modern Gallery and at the technical laboratories of the Czech National Heritage Institute, with stratigraphic and infrared reflectography analysis on file. " +
      "Leonardo left Milan in fourteen ninety-nine when the French army of Louis the Twelfth deposed Ludovico Sforza. He travelled south with his pupil Salaì and the manuscripts he could carry. The painting we are looking at remained, in some form, in northern Italy until the eighteenth century. The verdict on its hand is not yet final.",
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
    viewingLocation: 'Private collection — disclosed under DDNDA',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/florence-workshop.mp4',
    inspirationNote: 'Early Florentine years. The Madonna formula being perfected.',
    wing: { label: 'Renaissance Studiolo', href: '/upstairs/raphael' },
    bernardStory:
      "This is Madonna with Child, attributed to Raffaello Sanzio of Urbino, painted in the years between fifteen hundred and fifteen ten — the decade in which he moved between his master Pietro Perugino's workshop, the city of Florence, and finally to the papal court of Julius the Second in Rome. " +
      "Raphael was seventeen at the start of this decade, twenty-seven by its end, and already in possession of the compositional formula that would make him the most reproduced painter of the next four centuries. The half-length Madonna, the Christ child turned across her lap, the soft pyramidal triangle of the two heads and the joined hand — he refined the schema over more than forty surviving versions, from the Madonna del Granduca of about fifteen oh five to the Madonna della Sedia of fifteen thirteen. " +
      "What you see here belongs to the body of the formula in its Florentine perfection, the period that overlaps with his study of Leonardo's lost cartoon for the Saint Anne. The unbroken contour from veil to shoulder is the Leonardo lesson absorbed; the warm earth-and-cobalt palette is the Umbrian inheritance from Perugino, who had trained Raphael in Perugia from about fifteen hundred. " +
      "Raphael died in Rome on his thirty-seventh birthday, the sixth of April fifteen twenty, after a brief fever. The funeral procession through the Vatican was led by the pope. Every Madonna in Western art since has been painted in answer to one of these.",
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
    bernardStory:
      "This is Henri Matisse's Woman with Child, undated, painted in the Côte d'Azur years between his arrival at Nice in nineteen seventeen and his death at the Hôtel Régina in nineteen fifty-four. The pictogram signature on the right side is the small black mark Matisse used in place of his full name on the works he did not consider finished for the market, the studio pieces and the gifts. " +
      "He had begun to use oil on paper mounted on cardboard in the nineteen thirties, when arthritis began to limit his hours at the easel and the lighter support let him reposition the work along the walls of his studio at the Hôtel Régina in Cimiez. The model in these years was almost always Lydia Delectorskaya, the young Russian émigrée who had begun as his nurse and studio assistant in nineteen thirty-five and remained with him until his death — for the last decade as the manager of the studio, the model, the keeper of the inventory, and the woman his wife Amélie had forced him to choose between in nineteen thirty-nine. " +
      "He chose Lydia. Amélie left after forty-one years of marriage. Lydia never accepted a centime from the estate; she returned to Russia in nineteen fifty-five and donated the works he had given her to the Hermitage and the Pushkin. " +
      "The mother-and-child of this canvas, in the soft Mediterranean ochres and the rose of Cimiez, belongs to the late tenderness of those Lydia years.",
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
    viewingLocation: 'Private collection — disclosed under DDNDA',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/moscow.mp4',
    inspirationNote: 'Russian-period composition. Title transliterates from Cyrillic. Likely 1915–21 Moscow return years.',
    wing: { label: 'The Creepy Room', href: '/upstairs/kandinsky' },
    bernardStory:
      "This is a Composition by Wassily Kandinsky from the Russian-return years, between nineteen fifteen and nineteen twenty-one — the period the dating evidence and the Cyrillic-titled signature place it. " +
      "Kandinsky had left Munich at the outbreak of war in August nineteen fourteen, when his German residence permit was revoked overnight along with those of every other Russian national in Bavaria. He travelled with Gabriele Münter, the painter who had been his companion since nineteen oh three, first to Zurich, then to Stockholm. In December nineteen fifteen he returned alone to Moscow, leaving Münter and the bulk of his pre-war canvases at her house at Murnau. They would never live together again. " +
      "In Moscow he met Nina Andreevskaya, then nineteen, in February nineteen seventeen, two days before the abdication of Nicholas the Second. They married within the year. Their son Vsevolod, born in nineteen seventeen, died of malnutrition in nineteen twenty during the famine years of the Civil War. " +
      "What you see in this canvas is the Russian Kandinsky, the line going harder and the colour going more dissonant under the pressure of those years. The Cyrillic title on the reverse and the signature place it before his nineteen twenty-one departure for the Bauhaus at Weimar, which Walter Gropius offered him in December of that year. He never returned to Russia.",
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
    bernardStory:
      "This is Composition, painted by Wassily Kandinsky in nineteen ten — the year that almost every history of modern art identifies, accurately or not, as the threshold into pure abstraction. " +
      "He was forty-four. He had left a law professorship in Moscow at the age of thirty to study painting in Munich, and had spent the previous summer with the painter Gabriele Münter at the small house in Murnau, in the Bavarian Alps, that she had bought for them with her own money in nineteen oh nine. The Murnau summers — landscape excursions, Russian folk icons brought back from Moscow, Theosophical reading borrowed from Marianne von Werefkin — are the laboratory in which the figures in his work dissolved into colour and line. " +
      "Within months of finishing this canvas he completed the manuscript of his treatise On the Spiritual in Art, which the Munich publisher Reinhard Piper would issue in December nineteen eleven. The book argues, with diagrams and music analogies, that colour is a force on the soul independent of representation. " +
      "Münter inherited the canvases he left at Murnau in nineteen fourteen when he was forced back to Russia. She hid them in the cellar of the Murnau house through the Nazi years, when they would have been confiscated as degenerate art, and on her eightieth birthday in nineteen fifty-seven gave them to the city of Munich. The Lenbachhaus collection of Kandinsky's pre-abstract years is built on what she kept.",
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
    bernardStory:
      "This is La Mesa Herida, the Wounded Table, painted by Frida Kahlo between the winter of nineteen thirty-nine and the spring of nineteen forty. At two metres forty-four wide and one metre twenty-two high, it is the largest canvas she ever made, and one of the most contested in the history of twentieth-century painting. " +
      "Kahlo was thirty-two. She had divorced Diego Rivera in November nineteen thirty-nine after a decade of marriage and his serial affairs, the last of which was with her younger sister Cristina. The Wounded Table is the painting she made in the months after that divorce. " +
      "Around the table she has placed her own family in surrogate form: a Judas figure with Diego's face on the right, a pre-Columbian Nayarit sculpture as a stand-in for her father Guillermo, her nephews Antonio and Isolda as the children, the small fawn-deer with her own face that she had been wounded into by the streetcar accident at eighteen. The table itself bleeds from a cut in its leg. " +
      "She exhibited the canvas at the International Exhibition of Surrealism at the Galería de Arte Mexicano in January nineteen forty, then in Moscow in nineteen fifty-five, two years after her death. After the nineteen fifty-five Moscow show it vanished. It has surfaced only in private inventories and in the disputed dossier filed at the Prague gallery framing the current disclosure. The signature is documented; the verdict on its trail through the seven Cold War decades is what the present examination is for.",
  },

  // ---------------- Pollock (2 — newly added) ----------------
  {
    slug: 'pollock-d11',
    imageUrl: '/paintings/pollock-d11.jpg',
    artist: 'Jackson Pollock',
    title: 'D-11',
    year: 'c. 1950',
    dimensions: '20 × 60 in (50.8 × 152 cm)',
    medium: 'Oil on canvas',
    viewingLocation: 'Private collection (David Cordy) — represented by DeLuca Fine Art, Clearwater, FL — disclosed under DDNDA',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/studio-revolution.mp4',
    inspirationNote: 'A horizontal drip composition from Pollock\'s apex year, 1950. Catalogued as D-11 in the private dossier maintained by DeLuca Fine Art; owned of record by David Cordy.',
    wing: { label: 'The Pollock Studio', href: '/grand-hall/pollock' },
    provenanceDoc: 'Pollock D11 Appraisal DeLuca.pdf · Certification of Art Assets — David Cordy.pdf · Jackson Pollock D-11 (c. 1950) — David Cordy Purchase Letter.pdf',
    bernardStory:
      "This is D-Eleven, a horizontal drip composition catalogued in the private dossier maintained by DeLuca Fine Art of Clearwater, Florida, on behalf of the collector David Cordy. The canvas measures fifty by one hundred and fifty-two centimetres — a long, narrow band of poured paint that reads, on inspection, like a single sustained gesture broken into colour. " +
      "Painted circa nineteen fifty, the year Pollock did not drink — the only such year of his life — and the year of the great drip canvases that the critic Clement Greenberg would later say put American painting at the centre of the world. The work was made on the floor of the converted barn at Springs, on the eastern end of Long Island, where Pollock had moved with Lee Krasner in nineteen forty-five. Krasner had effectively stopped painting her own work to manage his. The barn was unheated. The canvases were unstretched, tacked to plank floor, walked on, paint dripped from sticks and basting syringes, never the brush touching the canvas. " +
      "D-Eleven is unusual in scale and in restraint — the long horizontal format, the deliberate field rather than the all-over apex of the larger nineteen-fifty canvases. It reads as a study in choreography rather than density. The black armatures hold the white field; the yellow and the cobalt and the brown and the cadmium orange enter as accents on the body of the gesture. There is, almost uniquely in Pollock, an architecture. " +
      "Provenance is held in the DeLuca Fine Art appraisal of record. The painting comes to the Napa Valley Art Institute through a private representation arrangement with David Cordy and Pacific Arts. Pollock drove his Oldsmobile off the road at Springs and was killed on the eleventh of August, nineteen fifty-six. He was forty-four.",
  },
  {
    slug: 'pollock-number-2-1950',
    imageUrl: '/paintings/pollock-number-2-1950.jpg',
    artist: 'Jackson Pollock',
    title: 'Number 2 (heavy drip)',
    year: '1950',
    dimensions: 'TBD',
    medium: 'Enamel on canvas',
    viewingLocation: 'Private collection — disclosed under DDNDA',
    inspirationVideo: 'https://pub-f768e8b3f85442fab7c98be1d34826d3.r2.dev/abstract-harmony.mp4',
    inspirationNote: '1950 East Hampton. Heavy-drip period — $17M appraisal on record.',
    wing: { label: 'The Pollock Studio', href: '/grand-hall/pollock' },
    bernardStory:
      "This is Number Two, painted by Jackson Pollock at Springs in nineteen fifty, the same summer that produced Number One Lavender Mist and Autumn Rhythm and One Number thirty-one, the four canvases the Museum of Modern Art catalogue treats as the inner core of his drip period. " +
      "What distinguishes Number Two is the weight of the paint. Pollock had been using thinned enamel since nineteen forty-seven, the industrial Duco and aluminium house paints Lee Krasner brought home in five-gallon cans from the East Hampton hardware store. By the summer of nineteen fifty he had begun to lay the enamel down at a heavier viscosity, in some passages almost in ribbons, the dripped line giving way to a poured line that holds its own three-dimensional ridge on the surface. This canvas belongs to that thicker passage of his thinking. " +
      "He was thirty-eight. He had been sober since the previous October. He would relapse, badly, in nineteen fifty-one, after Hans Namuth's film of him working in the barn was shown at the Museum of Modern Art and the critic Robert Coates in The New Yorker savaged it as an actor's performance. " +
      "The appraisal on record for this canvas is seventeen million dollars. The auction record for a comparably scaled Pollock from the same summer, set in November twenty-fifteen, is two hundred million. The signature, where Pollock placed one in this period, is on the reverse.",
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
    bernardStory:
      "This is Émile Bernard's La Passion de Jésus-Christ ou Le Calvaire, painted between roughly nineteen twenty-six and nineteen forty — a late altarpiece of nearly three metres in height, made in the painter's last quarter-century when he had largely been written out of the modernist narrative he helped create. " +
      "Bernard was eighteen years old in eighteen eighty-six when he met Paul Gauguin at the inn of Marie-Jeanne Gloanec at Pont-Aven in Brittany. Within two years the two of them, with the painter Louis Anquetin, had invented what Bernard called cloisonnisme, the flat plane of colour bounded by a heavy contour, which became the visual grammar of the Pont-Aven School and of Synthetism, and through them, the foundation of nearly everything that came next. The dispute over which of them — Gauguin or Bernard — had invented the manner ruined the friendship by eighteen ninety-one. " +
      "Bernard left Paris for Cairo in eighteen ninety-three and spent the next ten years studying Byzantine icons, Coptic frescoes, and the Italian primitives. The painter who came back was a religious painter. The modernist circles that had followed Gauguin to the South Pacific had no use for him. " +
      "What you see here, in this altarpiece, is the Pont-Aven cloisonnism turned in old age toward the hieratic stillness of the Russian icon. He died in nineteen forty-one. The price of his erasure from the history of post-Impressionism is what this canvas, made for no living congregation, was painted in answer to.",
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
