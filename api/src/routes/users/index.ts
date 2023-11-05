// Path: api/src/routes/users/index.ts

import { Hono } from "hono";

import { validateSavePayload } from "./middlewares";
import { User } from "@/models/user";

const users = new Hono();

users.get("/", async (ctx: any) => {
  const users = new User();
  const list = users.findAll();

  return ctx.json({ message: "users get!", list });
});

users.post("/", validateSavePayload, async (ctx: any) => {
  const { name, css, userId } = ctx.data;
  console.log("api/src/routes/users/index.ts: { name, css, userId }", {
    name,
    css,
    userId,
  });
  return ctx.json({
    message: `users post ${JSON.stringify({ name, css, userId })}!`,
  });
});

users.get("/:id", async (ctx: any) => {
  const id = ctx.req.param("id");
  return ctx.json({ message: `users get ${id}!` });
});

users.put("/:id", async (ctx: any) => {
  const id = ctx.req.param("id");
  return ctx.json({ message: `users put ${id}!` });
});

users.delete("/:id", async (ctx: any) => {
  const id = ctx.req.param("id");
  return ctx.json({ message: `users delete ${id}!` });
});

export { users as users };
