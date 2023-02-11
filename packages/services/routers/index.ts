import { t } from "../trpc";
import { helloRouter } from "./hello";
import { tagsRouter } from "./tags";

const router = t.router;

export const appRouter = router({
  hello: helloRouter,
  tags: tagsRouter,
});
