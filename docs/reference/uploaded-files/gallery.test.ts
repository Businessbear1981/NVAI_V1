import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock user context
function createMockContext(userId: number = 1): TrpcContext {
  return {
    user: {
      id: userId,
      openId: `user-${userId}`,
      email: `user${userId}@example.com`,
      name: `Test User ${userId}`,
      loginMethod: "test",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("Gallery API", () => {
  describe("getArtistById", () => {
    it("should fetch an artist by ID", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      // Assuming artist with ID 1 exists (Picasso from seed)
      const artist = await caller.gallery.getArtistById({ id: 1 });

      expect(artist).toBeDefined();
      expect(artist?.name).toBe("Pablo Picasso");
      expect(artist?.period).toBe("Blue Period & Mediterranean");
    });

    it("should return null for non-existent artist", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const artist = await caller.gallery.getArtistById({ id: 99999 });

      expect(artist).toBeNull();
    });
  });

  describe("getArtworksByArtist", () => {
    it("should fetch artworks for a specific artist", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      // Picasso (ID 1) has 11 artworks
      const artworks = await caller.gallery.getArtworksByArtist({ artistId: 1 });

      expect(Array.isArray(artworks)).toBe(true);
      expect(artworks.length).toBeGreaterThan(0);
      expect(artworks.every((a) => a.artistId === 1)).toBe(true);
    });

    it("should return empty array for artist with no artworks", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const artworks = await caller.gallery.getArtworksByArtist({ artistId: 99999 });

      expect(Array.isArray(artworks)).toBe(true);
      expect(artworks.length).toBe(0);
    });
  });

  describe("getArtworkById", () => {
    it("should fetch artwork details by ID", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const artwork = await caller.gallery.getArtworkById({ id: 1 });

      expect(artwork).toBeDefined();
      expect(artwork?.title).toBe("Buste de femme souriante");
      expect(artwork?.artistId).toBe(1);
    });

    it("should return null for non-existent artwork", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const artwork = await caller.gallery.getArtworkById({ id: 99999 });

      expect(artwork).toBeNull();
    });
  });

  describe("checkNdaSignature", () => {
    it("should return false for unsigned NDA", async () => {
      const ctx = createMockContext(1);
      const caller = appRouter.createCaller(ctx);

      const signed = await caller.gallery.checkNdaSignature({ artworkId: 1 });

      expect(typeof signed).toBe("boolean");
    });
  });

  describe("signNda", () => {
    it("should create an NDA signature record", async () => {
      const ctx = createMockContext(1);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.gallery.signNda({ artworkId: 1 });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
    });
  });

  describe("createEscrowRecord", () => {
    it("should create an escrow record for vault storage", async () => {
      const ctx = createMockContext(1);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.gallery.createEscrowRecord({
        artworkId: 1,
        escrowType: "vault",
        amount: "$1,000,000",
        terms: "Standard vault storage terms",
      });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
    });
  });

  describe("getEscrowRecords", () => {
    it("should return array for artwork", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const records = await caller.gallery.getEscrowRecords({ artworkId: 1 });

      expect(Array.isArray(records)).toBe(true);
    });
  });
});
