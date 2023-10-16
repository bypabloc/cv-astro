import { Elysia } from "elysia";
import * as path from "node:path";
import * as fs from "node:fs";

export const testSetup = (options = { routesDir: "./routes", prefix: "/" }) => {
  console.log("AutoRoutes");
  return async (app: Elysia) => {
    const { routesDir, prefix } = options;
    const dirPath = path.resolve(routesDir);
    const dirFile = Bun.file(dirPath);
    app.get("/test", (ctx) => {
      ctx.log.info(ctx, "Context");

      return "with-context";
    });
  };
};
