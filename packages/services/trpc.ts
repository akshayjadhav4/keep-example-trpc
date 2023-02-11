import { initTRPC, inferAsyncReturnType } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { prisma } from "./db";

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({ prisma });
type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();
