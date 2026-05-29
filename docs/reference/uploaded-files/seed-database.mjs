import { drizzle } from "drizzle-orm/mysql2";
import { artists, artworks } from "../drizzle/schema.ts";
import mysql from "mysql2/promise";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

async function seedDatabase() {
  const db = drizzle(DATABASE_URL);

  console.log("🌱 Seeding database with 10 master artists...\n");

  // Define the 10 artists with their room themes and details
  const artistsData = [
    {
      name: "Pablo Picasso",
      period: "Blue Period & Mediterranean",
      biography: "Spanish prodigy born 1881 in Málaga. Co-invented Cubism with Braque. Blue Period (1901–04) triggered by best friend Carlos Casagemas's suicide. Lived bohemian Montmartre/Paris, then Boisgeloup château and South of France. Political (Guernica), playful innovator to age 91.",
      roomTheme: "Montmartre Studio",
      colorPalette: "#1a1a1a,#d4af37,#4a5f8f",
      doorTransition: "ornate wooden archway",
      ambientAudio: "https://example.com/audio/picasso-studio.mp3"
    },
    {
      name: "Marc Chagall",
      period: "Dreamlike Vitebsk & Vence",
      biography: "Born 1887 in Jewish Vitebsk (Belarus), Paris 1910s absorbed Cubism/Surrealism but infused with Russian folk, Hasidic mysticism. Married Bella (eternal muse). WWII exile to US; postwar Vence (France) studio. Master of stained glass, opera ceilings. Lived to 97; art as poetry in paint.",
      roomTheme: "Dreamlike Vitebsk Village",
      colorPalette: "#2d2d2d,#d4af37,#ff6b6b",
      doorTransition: "floating ethereal portal",
      ambientAudio: "https://example.com/audio/chagall-dream.mp3"
    },
    {
      name: "Amedeo Modigliani",
      period: "1910s-1920s Montparnasse",
      biography: "Italian (Livorno 1884), Paris Montparnasse bohemian. Elongated necks, almond eyes, sensuous nudes/portraits. Poverty, hashish/absinthe, tuberculosis; died at 35. Lover Jeanne Hébuterne (suicide next day). Controversial 1917 nude show raided by police. Sculptor first; ~350 paintings.",
      roomTheme: "Moulin Rouge Cabaret",
      colorPalette: "#8b0000,#d4af37,#1a1a1a",
      doorTransition: "velvet curtain entrance",
      ambientAudio: "https://example.com/audio/modigliani-jazz.mp3"
    },
    {
      name: "Leonardo da Vinci",
      period: "Renaissance Florence & Milan",
      biography: "Polymath (1452–1519), Milan/Florence/Rome. Sfumato (smoky blending), notebooks with inventions (helicopter, tanks), ~15–20 surviving paintings. Anatomical genius. Lady with a Fur (attributed rediscovered private coll., 1495–99 Milan period).",
      roomTheme: "Renaissance Palazzo Studio",
      colorPalette: "#8b7355,#d4af37,#f5f5f5",
      doorTransition: "arched stone doorway",
      ambientAudio: "https://example.com/audio/leonardo-workshop.mp3"
    },
    {
      name: "Raphael",
      period: "High Renaissance",
      biography: "(1483–1520) Urbino/Florence/Rome. Ideal beauty Madonnas, Vatican frescoes (School of Athens). Died young at 37; harmonious compositions. Master of perspective and divine proportion.",
      roomTheme: "Renaissance Palazzo Studio",
      colorPalette: "#8b7355,#d4af37,#f5f5f5",
      doorTransition: "classical marble archway",
      ambientAudio: "https://example.com/audio/raphael-chapel.mp3"
    },
    {
      name: "Henri Matisse",
      period: "Fauvism & Late Cutouts",
      biography: "Fauvism leader (1869–1954), explosive color. Later cut-outs (drawing with scissors). Nice studio/garden life; joyful, decorative. Master of color harmony and simplified forms.",
      roomTheme: "French Riviera Garden Studio",
      colorPalette: "#ff6b6b,#4a90e2,#d4af37",
      doorTransition: "garden gate entrance",
      ambientAudio: "https://example.com/audio/matisse-garden.mp3"
    },
    {
      name: "Wassily Kandinsky",
      period: "Abstract & Bauhaus",
      biography: "Russian (1866–1944), abstract pioneer. Synesthesia (colors sang like music). Bauhaus teacher; Compositions/Improvisations series. From representational to pure abstraction.",
      roomTheme: "Bauhaus Lab",
      colorPalette: "#1a1a1a,#d4af37,#4a5f8f",
      doorTransition: "geometric portal",
      ambientAudio: "https://example.com/audio/kandinsky-abstract.mp3"
    },
    {
      name: "Frida Kahlo",
      period: "Mexican Surrealism",
      biography: "Mexican (1907–1954), self-portrait queen blending surrealism, folk art, Mexicanidad. Bus accident caused lifelong pain/fertility struggles; married Diego Rivera. Casa Azul (Blue House) filled with plants, folk objects. Feminist icon.",
      roomTheme: "Casa Azul Hacienda",
      colorPalette: "#0066cc,#d4af37,#ff6b6b",
      doorTransition: "colorful folk art entrance",
      ambientAudio: "https://example.com/audio/kahlo-casa.mp3"
    },
    {
      name: "Claude Monet",
      period: "Impressionism & Water Lilies",
      biography: "French (1840–1926), Impressionism founder. Obsessed with light and color. Giverny garden (1883–1926) became his muse. Water lilies series (1890s–1920s) explored light on water, precursor to abstraction.",
      roomTheme: "Giverny Garden Pavilion",
      colorPalette: "#4a90e2,#90ee90,#d4af37",
      doorTransition: "Japanese bridge entrance",
      ambientAudio: "https://example.com/audio/monet-water.mp3"
    },
    {
      name: "Émile Bernard",
      period: "Post-Impressionism & Symbolism",
      biography: "French (1868–1941), Post-Impressionist pioneer. Friend of Van Gogh and Gauguin. Developed cloisonnism (bold outlines, flat color areas). Symbolist themes exploring spirituality and emotion.",
      roomTheme: "Symbolist Studio",
      colorPalette: "#1a1a1a,#d4af37,#8b0000",
      doorTransition: "ornate studio door",
      ambientAudio: "https://example.com/audio/bernard-symbolism.mp3"
    }
  ];

  // Insert artists
  const insertedArtists = [];
  for (const artistData of artistsData) {
    const result = await db.insert(artists).values(artistData);
    insertedArtists.push({ ...artistData, id: result.insertId });
    console.log(`✓ Added artist: ${artistData.name}`);
  }

  console.log("\n🎨 Seeding artworks for each artist...\n");

  // Sample artworks for each artist
  const artworksData = [
    // Picasso (11 works)
    { artistId: 1, title: "Buste de femme souriante", year: 1901, medium: "Oil on panel", dimensions: "78.5 x 55 cm", estimatedValue: "$2M - $4M", description: "Early Blue Period portrait of a smiling woman" },
    { artistId: 1, title: "L'enterrement de Casagemas", year: 1901, medium: "Oil on canvas", dimensions: "100 x 90.2 cm", estimatedValue: "$3M - $6M", description: "Blue Period allegory of friend's death" },
    { artistId: 1, title: "Femme en bleu assise dans un fauteuil", year: 1949, medium: "Oil on canvas", dimensions: "116 x 89 cm", estimatedValue: "$1.5M - $3M", description: "Vibrant portrait of Marie-Thérèse" },
    { artistId: 1, title: "Homme à la pipe et nu couché", year: 1967, medium: "Oil on canvas", dimensions: "146 x 114 cm", estimatedValue: "$2M - $5M", description: "Late period figurative work" },
    { artistId: 1, title: "L'enfant à l'orange", year: 1951, medium: "Enamel on plywood", dimensions: "108 x 89 cm", estimatedValue: "$1M - $2.5M", description: "Portrait of daughter Paloma" },
    { artistId: 1, title: "Tête de femme sur fond jaune", year: 1934, medium: "Oil on canvas", dimensions: "65 x 46 cm", estimatedValue: "$800K - $2M", description: "Vibrant Marie-Thérèse portrait" },
    { artistId: 1, title: "Maternité", year: 1901, medium: "Oil on canvas", dimensions: "47.4 x 34 cm", estimatedValue: "$600K - $1.5M", description: "Blue Period maternal figure" },
    { artistId: 1, title: "Still Life Nature Morte", year: 1934, medium: "Oil on canvas", dimensions: "81 x 100 cm", estimatedValue: "$1.2M - $2.8M", description: "Cubist still life composition" },
    { artistId: 1, title: "Femme à la toilette", year: 1901, medium: "Oil on canvas", dimensions: "45.7 x 33 cm", estimatedValue: "$500K - $1.2M", description: "Blue Period intimate scene" },
    { artistId: 1, title: "Femme assise", year: 1949, medium: "Oil on canvas", dimensions: "65 x 50 cm", estimatedValue: "$700K - $1.8M", description: "Post-war figurative work" },
    { artistId: 1, title: "Personnages", year: 1965, medium: "Oil on canvas", dimensions: "113 x 194 cm", estimatedValue: "$1.5M - $3.5M", description: "Late period abstract figures" },

    // Chagall (6 works)
    { artistId: 2, title: "Hommage à Paris, Notre Dame", year: 1953, medium: "Oil on canvas", dimensions: "75.2 x 98.4 cm", estimatedValue: "$1.5M - $3M", description: "Paris homage with sand texture" },
    { artistId: 2, title: "L'oiseau Rouge", year: 1970, medium: "Oil on canvas", dimensions: "73 x 60 cm", estimatedValue: "$1.2M - $2.5M", description: "Dreamlike red bird composition" },
    { artistId: 2, title: "L'Opéra", year: 1953, medium: "Oil on canvas", dimensions: "92 x 72.5 cm", estimatedValue: "$1M - $2.2M", description: "Related to Opéra ceiling studies" },
    { artistId: 2, title: "Les Amoureux de Saint-Paul de Vence", year: 1958, medium: "Oil on canvas", dimensions: "50 x 72 cm", estimatedValue: "$800K - $1.8M", description: "Lovers theme from Vence life" },
    { artistId: 2, title: "Female Nude with Flowers and Animals", year: 1942, medium: "Oil on canvas", dimensions: "68 x 51.5 cm", estimatedValue: "$600K - $1.5M", description: "Surreal composition with nature" },
    { artistId: 2, title: "Three Jews Reading the Talmud", year: 1918, medium: "Oil on canvas", dimensions: "79 x 62 cm", estimatedValue: "$700K - $1.6M", description: "Early Jewish thematic work" },

    // Modigliani (3 works)
    { artistId: 3, title: "Ritratto Di Donna", year: 1915, medium: "Oil on canvas", dimensions: "45.5 x 60 cm", estimatedValue: "$1.2M - $2.5M", description: "Portrait with characteristic elongated form" },
    { artistId: 3, title: "Portrait de Monsieur Chéron", year: 1915, medium: "Oil on canvas", dimensions: "45.5 x 32.7 cm", estimatedValue: "$800K - $1.8M", description: "Male portrait with almond eyes" },
    { artistId: 3, title: "Portrait de Mme X à la Toque", year: 1918, medium: "Oil on canvas", dimensions: "81 x 54 cm", estimatedValue: "$1.5M - $3M", description: "Woman with hat, sensuous portrait" },

    // Leonardo da Vinci (1 work)
    { artistId: 4, title: "Lady with a Fur", year: 1497, medium: "Oil tempera on poplar", dimensions: "61.5 x 54.5 cm", estimatedValue: "$5M - $10M", description: "Attributed Leonardo masterpiece with sfumato technique" },

    // Raphael (2 works)
    { artistId: 5, title: "Madonna with Child", year: 1505, medium: "Oil on canvas", dimensions: "157 x 127 cm", estimatedValue: "$3M - $7M", description: "Ideal beauty Madonna composition" },
    { artistId: 5, title: "Holy Family with Elizabeth and St. John", year: 1504, medium: "Oil on wood", dimensions: "136.5 x 107.5 cm", estimatedValue: "$2.5M - $5M", description: "Harmonious Renaissance composition" },

    // Matisse (1 work)
    { artistId: 6, title: "Woman with Child", year: 1932, medium: "Oil on paper", dimensions: "74.5 x 76 cm", estimatedValue: "$1M - $2.5M", description: "Fauvist maternal scene with vibrant colors" },

    // Kandinsky (2 works)
    { artistId: 7, title: "Composition VIII", year: 1910, medium: "Oil on canvas", dimensions: "43 x 36 cm", estimatedValue: "$800K - $2M", description: "Early abstract composition with geometric forms" },
    { artistId: 7, title: "Improvisation 28", year: 1912, medium: "Oil on canvas", dimensions: "66.5 x 89 cm", estimatedValue: "$1.2M - $2.8M", description: "Synesthetic color-music abstraction" },

    // Frida Kahlo (1 work)
    { artistId: 8, title: "La Mesa Herida (The Wounded Table)", year: 1940, medium: "Oil on canvas", dimensions: "244 x 122 cm", estimatedValue: "$4M - $8M", description: "Large surreal composition with symbolic figures" },

    // Monet (3 works)
    { artistId: 9, title: "Water Lilies at Sunset", year: 1905, medium: "Oil on canvas", dimensions: "88 x 92 cm", estimatedValue: "$2M - $5M", description: "Giverny pond series exploring light on water" },
    { artistId: 9, title: "Japanese Bridge", year: 1899, medium: "Oil on canvas", dimensions: "92 x 73 cm", estimatedValue: "$1.5M - $3.5M", description: "Iconic bridge from Giverny garden" },
    { artistId: 9, title: "Water Lilies Morning", year: 1918, medium: "Oil on canvas", dimensions: "200 x 180 cm", estimatedValue: "$3M - $7M", description: "Large-scale water lilies composition" },

    // Émile Bernard (2 works)
    { artistId: 10, title: "Breton Women in the Meadow", year: 1888, medium: "Oil on canvas", dimensions: "74 x 92 cm", estimatedValue: "$600K - $1.5M", description: "Cloisonnist work with bold outlines" },
    { artistId: 10, title: "Self-Portrait", year: 1890, medium: "Oil on canvas", dimensions: "55 x 46 cm", estimatedValue: "$400K - $1M", description: "Symbolist self-portrait with introspective mood" }
  ];

  // Insert artworks
  for (const artworkData of artworksData) {
    await db.insert(artworks).values(artworkData);
    console.log(`✓ Added artwork: ${artworkData.title} (${artworkData.artistId === 1 ? "Picasso" : artworkData.artistId === 2 ? "Chagall" : artworkData.artistId === 3 ? "Modigliani" : artworkData.artistId === 4 ? "Leonardo" : artworkData.artistId === 5 ? "Raphael" : artworkData.artistId === 6 ? "Matisse" : artworkData.artistId === 7 ? "Kandinsky" : artworkData.artistId === 8 ? "Kahlo" : artworkData.artistId === 9 ? "Monet" : "Bernard"})`);
  }

  console.log("\n✅ Artists and artworks seeded successfully!\n");

  console.log("✅ Database seeding complete!\n");
  console.log(`📊 Summary:`);
  console.log(`   - ${insertedArtists.length} artists added`);
  console.log(`   - ${artworksData.length} artworks added\n`);
}

seedDatabase().catch((error) => {
  console.error("❌ Seeding failed:", error);
  process.exit(1);
});
