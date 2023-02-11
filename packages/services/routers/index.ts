import { t } from "../trpc";
import { helloRouter } from "./hello";

const router = t.router;

export const appRouter = router({
  hello: helloRouter,
});
