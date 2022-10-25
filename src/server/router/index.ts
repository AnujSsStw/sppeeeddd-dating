// src/server/router/index.ts
import superjson from "superjson";
import { createRouter } from "./context";
import { matchRouter } from "./match";

import { userRouter } from "./user";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("users.", userRouter)
  .merge("matches.", matchRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
