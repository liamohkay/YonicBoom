import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  getArtists: publicProcedure.query(async ({ ctx }) => {
    const artists = await ctx.prisma.artist.findMany();
    return artists;
  }) 
});

export type AppRouter = typeof appRouter;
