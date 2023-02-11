import cors from "cors";
import express, { Response } from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers";
import { createContext } from "./trpc";

// express
const app = express();
app.use(cors());
app.use("/trpc", createExpressMiddleware({ router: appRouter, createContext }));

app.get("/", (_, response: Response) => {
  response.send("Hi from express server 🥳");
});

const port = 2004;
app.listen(port, () =>
  console.log(`Listening on http://localhost:${port} 🚀🚀🚀`)
);

export type AppRouter = typeof appRouter;
