// Path: api/src/routes/styles/index.ts

import { Hono } from "hono";

import { validateSavePayload } from "./middlewares";
import { User } from "@/models/user";

const styles = new Hono();

styles.get("/", async (ctx: any) => {
  const users = new User();
  const list = users.findAll();

  return ctx.json({ message: "Styles get!", list });
});

styles.post("/", validateSavePayload, async (ctx: any) => {
  const { name, css, userId } = ctx.data;
  console.log("api/src/routes/styles/index.ts: { name, css, userId }", {
    name,
    css,
    userId,
  });
  return ctx.json({
    message: `Styles post ${JSON.stringify({ name, css, userId })}!`,
  });
});

styles.get("/:id", async (ctx: any) => {
  const id = ctx.req.param("id");
  return ctx.json({ message: `Styles get ${id}!` });
});

styles.put("/:id", async (ctx: any) => {
  const id = ctx.req.param("id");
  return ctx.json({ message: `Styles put ${id}!` });
});

styles.delete("/:id", async (ctx: any) => {
  const id = ctx.req.param("id");
  return ctx.json({ message: `Styles delete ${id}!` });
});

export { styles };
