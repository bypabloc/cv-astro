// Path: api/src/routes/users/index.ts

import { Hono } from "hono";

import { validateSavePayload } from "./middlewares";
import { User } from "@/models/user";

const users = new Hono();

users.get("/", async (ctx: any) => {
  const userModel = new User();
  const list = await userModel.findAll();

  console.log("list", list);

  return ctx.json({
    message: "users get!",
    data: {
      list,
      quantity: list.length,
    },
  });
});

users.post("/", validateSavePayload, async (ctx: any) => {
  const { nickname, email, password } = ctx.data;
  console.log("api/src/routes/users/index.ts: { nickname, email, password }", {
    nickname,
    email,
    password,
  });

  const userModel = new User();
  const user = await userModel.create({
    nickname,
    email,
    passwordHash: password,
  });

  console.log("user", user);

  return ctx.json({
    message: `users post ${JSON.stringify({ nickname, email, password })}!`,
  });
});

// users.get("/:id", async (ctx: any) => {
//   const id = ctx.req.param("id");
//   return ctx.json({ message: `users get ${id}!` });
// });

// users.put("/:id", async (ctx: any) => {
//   const id = ctx.req.param("id");
//   return ctx.json({ message: `users put ${id}!` });
// });

// users.delete("/:id", async (ctx: any) => {
//   const id = ctx.req.param("id");
//   return ctx.json({ message: `users delete ${id}!` });
// });

export { users as users };
