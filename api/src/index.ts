// Path: api/src/index.ts

// https://hono.dev/getting-started/bun

import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";

import { routes } from "@/routes";

const api = new Hono();

api.use("*", logger());
api.use("*", prettyJSON());

api.use(
  "/*",
  cors({
    origin: (origin) => {
      return origin.endsWith(".example.com") ? origin : "http://example.com";
    },
    allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
    maxAge: 600,
    credentials: true,
  })
);

// api.use("/*", (c) => {
//   const test = "test";
//   console.log("Middleware 1");
// });

api.route("/", routes);

api.notFound((c) => c.json({ message: "Not Found" }, 404));

const PORT = process.env.PORT || 8000;

export default {
  port: PORT,
  fetch: api.fetch,
};
