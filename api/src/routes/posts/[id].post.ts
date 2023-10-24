// Path: api/src/routes/posts/[id].post.ts

import { Elysia } from "elysia";

export default (context: Elysia): Object => {
  return {
    message: "Hello, world! -> from ./src/routes/posts/[id].post.ts",
  };
};
