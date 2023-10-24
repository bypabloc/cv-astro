// Path: api/src/routes/hello.ts

import { Elysia } from "elysia";

export default (context: Elysia): Object => {
  return {
    message: "Hello, world! -> from ./src/routes/hello.ts",
  };
};
