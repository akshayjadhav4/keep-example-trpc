import { z } from "zod";
import { t } from "../trpc";

const procedure = t.procedure;
const router = t.router;

export const keepRouter = router({
  createKeep: procedure
    .input(
      z.object({
        title: z.string(),
        note: z.string(),
        tags: z
          .array(
            z.object({
              id: z.number(),
            })
          )
          .optional(),
        todos: z
          .array(
            z.object({
              id: z.string(),
              todo: z.string(),
              isCompleted: z.boolean(),
            })
          )
          .optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.keep.create({
          data: {
            title: input.title,
            note: input.note,
            tags: {
              connect: input.tags,
            },
            todos: {
              create: input.todos,
            },
          },
          include: {
            tags: true,
            todos: true,
          },
        });
      } catch (error) {
        return {
          error: "Something went wrong. Not able to create Keep.",
        };
      }
    }),
});
