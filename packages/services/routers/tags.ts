import { z } from "zod";
import { t } from "../trpc";

const procedure = t.procedure;
const router = t.router;

export const tagsRouter = router({
  getAllTags: procedure.query(async ({ ctx }) => {
    try {
      const tags = await ctx.prisma.tag.findMany();
      return { tags };
    } catch (error) {
      return {
        error: "Something went wrong. Not able to fetch Tags.",
      };
    }
  }),
  createTag: procedure
    .input(
      z.object({
        tag: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.tag.create({
          data: {
            tag: input.tag,
          },
        });
      } catch (error) {
        return {
          error: "Something went wrong. Not able to create Tag.",
        };
      }
    }),
});
