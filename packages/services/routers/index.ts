import { t } from "../trpc";
import { helloRouter } from "./hello";
import { keepRouter } from "./keep";
import { tagsRouter } from "./tags";

const router = t.router;

export const appRouter = router({
  hello: helloRouter,
  tags: tagsRouter,
  keep: keepRouter,
});
