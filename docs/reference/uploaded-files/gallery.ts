import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { artists, artworks, provenanceNarratives, ndaSignatures, escrowRecords, lendingEligibility } from "../../drizzle/schema";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

export const galleryRouter = router({
  // Get all artists with their basic info
  getArtists: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    return await db.select().from(artists);
  }),

  // Get a single artist by ID
  getArtistById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      const result = await db
        .select()
        .from(artists)
        .where(eq(artists.id, input.id))
        .limit(1);
      return result[0] || null;
    }),

  // Get all artworks for a specific artist
  getArtworksByArtist: publicProcedure
    .input(z.object({ artistId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      return await db
        .select()
        .from(artworks)
        .where(eq(artworks.artistId, input.artistId));
    }),

  // Get a single artwork by ID
  getArtworkById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      const result = await db
        .select()
        .from(artworks)
        .where(eq(artworks.id, input.id))
        .limit(1);
      return result[0] || null;
    }),

  // Get provenance narrative for an artwork
  getProvenanceNarrative: publicProcedure
    .input(z.object({ artworkId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      const result = await db
        .select()
        .from(provenanceNarratives)
        .where(eq(provenanceNarratives.artworkId, input.artworkId))
        .limit(1);
      return result[0] || null;
    }),

  // Check if user has signed NDA for a specific artwork
  checkNdaSignature: publicProcedure
    .input(z.object({ artworkId: z.number() }))
    .query(async ({ input, ctx }) => {
      if (!ctx.user) return false;
      
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      
      const result = await db
        .select()
        .from(ndaSignatures)
        .where(
          and(
            eq(ndaSignatures.userId, ctx.user.id),
            eq(ndaSignatures.artworkId, input.artworkId)
          )
        )
        .limit(1);
      
      return result.length > 0;
    }),

  // Sign NDA for an artwork
  signNda: publicProcedure
    .input(z.object({ artworkId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.user) throw new Error("User not authenticated");

      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const result = await db.insert(ndaSignatures).values({
        userId: ctx.user.id,
        artworkId: input.artworkId,
        ipAddress: ctx.req.ip || "unknown",
        userAgent: ctx.req.headers["user-agent"] || "unknown",
      });

      return { success: true };
    }),

  // Get escrow records for an artwork
  getEscrowRecords: publicProcedure
    .input(z.object({ artworkId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      return await db
        .select()
        .from(escrowRecords)
        .where(eq(escrowRecords.artworkId, input.artworkId));
    }),

  // Get lending eligibility for an artwork
  getLendingEligibility: publicProcedure
    .input(z.object({ artworkId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      const result = await db
        .select()
        .from(lendingEligibility)
        .where(eq(lendingEligibility.artworkId, input.artworkId))
        .limit(1);
      return result[0] || null;
    }),

  // Create an escrow record
  createEscrowRecord: publicProcedure
    .input(
      z.object({
        artworkId: z.number(),
        escrowType: z.enum(["vault", "lending", "sale"]),
        amount: z.string().optional(),
        terms: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.user) throw new Error("User not authenticated");

      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const result = await db.insert(escrowRecords).values({
        artworkId: input.artworkId,
        userId: ctx.user.id,
        escrowType: input.escrowType,
        amount: input.amount,
        terms: input.terms,
        status: "pending",
      });

      return { success: true };
    })
});
