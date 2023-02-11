import cors from "cors";
import express, { Response } from "express";
import { initTRPC } from "@trpc/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { z } from "zod";

// trpc
const t = initTRPC.create();
const procedure = t.procedure;
const router = t.router;
const appRouter = router({
  hello: procedure
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

// express
const app = express();
app.use(cors());
app.use("/trpc", createExpressMiddleware({ router: appRouter }));

app.get("/", (_, response: Response) => {
  response.send("Hi from express server 🥳");
});

const port = 2004;
app.listen(port, () =>
  console.log(`Listening on http://localhost:${port} 🚀🚀🚀`)
);

export type AppRouter = typeof appRouter;
