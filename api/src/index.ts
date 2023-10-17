// Path: api/src/index.ts

import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { logger, type InferContext } from "@bogeychan/elysia-logger";
import { hooksSetup } from "@/startup/hooks";
import { securitySetup } from "@/startup/security";
import { autoRoutes } from "@/startup/autoRoutes";
import { testSetup } from "@/startup/test";

export const app = new Elysia();

app.use(securitySetup);

app.use(
  logger({
    /**
     * This function will be invoked for each `log`-method called with `context`
     * where you can pass additional properties that need to be logged
     */
    customProps(ctx: InferContext<typeof app>) {
      return {
        params: ctx.params,
        query: ctx.query,
      };
    },
  })
);
app.use(cors());

app.get("/", () => ({
  message: "Hello, world! -> from ./src/index.ts",
}));

app.use(autoRoutes());

app.use(hooksSetup);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🦊 - Elysia is running at ${app.server?.hostname}:${PORT}`);
});
