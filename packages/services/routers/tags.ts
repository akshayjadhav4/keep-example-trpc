import { z } from "zod";
import { prisma } from "../db";
import { t } from "../trpc";

const procedure = t.procedure;
const router = t.router;

export const tagsRouter = router({
  getAllTags: procedure.query(async () => {
    try {
      const tags = await prisma.tag.findMany();
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
    .mutation(async ({ input }) => {
      try {
        await prisma.tag.create({
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
