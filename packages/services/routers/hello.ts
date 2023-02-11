import { z } from "zod";
import { t } from "../trpc";

const procedure = t.procedure;
const router = t.router;

export const helloRouter = router({
  sayHello: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
});
