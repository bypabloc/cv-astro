// Path: api/src/routes/posts/[id]/index.ts

import { Elysia } from "elysia";

export default (context: Elysia): Object => {
  return {
    message: "Hello, world! -> from ./src/routes/posts/[id].ts",
  };
};
