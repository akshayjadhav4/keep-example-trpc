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

  getAllKeeps: procedure.query(async ({ ctx }) => {
    try {
      const keeps = await ctx.prisma.keep.findMany({
        include: {
          tags: true,
          todos: true,
        },
        orderBy: {
          id: "desc",
        },
      });
      return { keeps };
    } catch (error) {
      return {
        error: "Something went wrong. Not able to fetch Keeps.",
      };
    }
  }),
  getKeep: procedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const keep = await ctx.prisma.keep.findUnique({
          where: {
            id: input.id,
          },
          include: {
            tags: true,
            todos: true,
          },
        });
        if (!!keep) {
          return { keep };
        }
        return {
          message: "No Keep found with given id.",
        };
      } catch (error) {
        return {
          error: "Something went wrong. Not able to fetch Keep.",
        };
      }
    }),
  deleteKeep: procedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.todo.deleteMany({
          where: { keepId: input.id },
        });
        await ctx.prisma.keep.delete({
          where: { id: input.id },
        });
      } catch (error) {
        return {
          error: "Something went wrong. Not able to delete Keep.",
        };
      }
    }),
});
