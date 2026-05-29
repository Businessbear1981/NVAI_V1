import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { addGuestBookEntry, getPublicGuestBookEntries, addFilmPledge, getPublicFilmPledges, getFilmCampaignStats, getLingerieCollection, getKikiProducts, getKikiArchive } from "./db";

const COOKIE_NAME = "session";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Kiki Backstage Experience
  kiki: router({
    // Guest Book
    guestBook: router({
      add: publicProcedure
        .input(z.object({
          visitorName: z.string().min(1),
          message: z.string().min(1),
          email: z.string().email().optional(),
        }))
        .mutation(async ({ input }) => {
          return await addGuestBookEntry({
            visitorName: input.visitorName,
            message: input.message,
            email: input.email || null,
            isPublic: 1,
          });
        }),
      list: publicProcedure.query(async () => {
        return await getPublicGuestBookEntries(100);
      }),
    }),

    // Film Crowdfunding Campaign
    filmCampaign: router({
      pledge: publicProcedure
        .input(z.object({
          supporterName: z.string().min(1),
          pledgeAmount: z.number().min(1),
          pledgeMessage: z.string().optional(),
          email: z.string().email().optional(),
        }))
        .mutation(async ({ input }) => {
          return await addFilmPledge({
            supporterName: input.supporterName,
            pledgeAmount: input.pledgeAmount,
            pledgeMessage: input.pledgeMessage || null,
            email: input.email || null,
            isPublic: 1,
          });
        }),
      pledges: publicProcedure.query(async () => {
        return await getPublicFilmPledges();
      }),
      stats: publicProcedure.query(async () => {
        return await getFilmCampaignStats();
      }),
    }),

    // Lingerie Collection
    lingerie: router({
      collection: publicProcedure.query(async () => {
        return await getLingerieCollection();
      }),
    }),

    // Kiki Products
    products: router({
      list: publicProcedure.query(async () => {
        return await getKikiProducts();
      }),
    }),

    // Kiki Archive
    archive: router({
      list: publicProcedure.query(async () => {
        return await getKikiArchive();
      }),
    }),
  }),
});

export type AppRouter = typeof appRouter;
