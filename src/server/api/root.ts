import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  getArtists: publicProcedure.query(async ({ ctx }) => {
    const artists = await ctx.prisma.artist.findMany();
    return artists;
  }),
  getBlogs: publicProcedure.query(async ({ ctx } ) => {
    const blogs = await ctx.prisma.blog.findMany();
    return blogs;
  })
});

export type AppRouter = typeof appRouter;
