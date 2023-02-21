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
  updateKeep: procedure
    .input(
      z.object({
        id: z.number(),
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
        const existingKeep = await ctx.prisma.keep.findUnique({
          where: {
            id: input.id,
          },
          include: {
            tags: true,
            todos: true,
          },
        });
        if (existingKeep) {
          // create a Set of existing tags and a Set of updated tags.
          const existingTagsSet = new Set(existingKeep.tags);
          const updatedTagsSet = new Set(input.tags);
          /**
           * convert the Set of existing tags and updated tags to an array,
           * and then use the map() to extract the id of each tag in the array.
           */
          const existingTagIds = [...existingTagsSet].map((tag) => tag.id);
          const updatedTagIds = [...updatedTagsSet].map((tag) => tag.id);

          /**
           * filter() to get an array of ids of the tags
           * that are in updatedTagIds but not in existingTagIds
           */
          const tagsToBeAdded = updatedTagIds.filter(
            (id) => !existingTagIds.includes(id)
          );
          const tagsToBeRemoved = existingTagIds.filter(
            (id) => !updatedTagIds.includes(id)
          );

          const existingTodoIds = existingKeep.todos.map((todo) => todo.id);
          const updatedTodos = input.todos || [];
          const updatedTodoIds = updatedTodos.map((todo) => todo.id);
          // get list of todos that needs to be deleted
          const todosToBeDeleted = existingTodoIds.filter(
            (id) => !updatedTodoIds.includes(id)
          );

          //
          const updatedTodoObjects = updatedTodos.map((updatedTodo) => {
            const existingTodo = existingKeep.todos.find(
              (todo) => todo.id === updatedTodo.id
            );
            /**
             * updates the existing todo by spreading existingTodo and updatedTodo
             * objects into a new object
             */
            if (existingTodo) {
              return {
                ...existingTodo,
                ...updatedTodo,
              };
            } else {
              return updatedTodo;
            }
          });

          await ctx.prisma.keep.update({
            where: { id: input.id },
            data: {
              title: input.title,
              note: input.note,
              tags: {
                connect: tagsToBeAdded.map((id) => {
                  return {
                    id: id,
                  };
                }),
                disconnect: tagsToBeRemoved.map((id) => {
                  return {
                    id: id,
                  };
                }),
              },
              todos: {
                upsert: updatedTodoObjects.map((todo) => ({
                  where: { id: todo.id },
                  create: {
                    id: todo.id,
                    todo: todo.todo,
                    isCompleted: todo.isCompleted,
                  },
                  update: {
                    id: todo.id,
                    todo: todo.todo,
                    isCompleted: todo.isCompleted,
                  },
                })),
                deleteMany: todosToBeDeleted.map((id) => ({
                  id,
                })),
              },
            },
            include: {
              tags: true,
              todos: true,
            },
          });
        }
        return {
          error: "Something went wrong. No Keep found",
        };
      } catch (error) {
        return {
          error: "Something went wrong. Not able to update Keep.",
        };
      }
    }),
});
