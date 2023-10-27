import { Hono } from "hono";

const styles = new Hono();

styles.get("/", async (ctx: any) => {
  return ctx.json({ message: "Styles get!" });
});

styles.post("/", async (ctx: any) => {
  const body = await ctx.body();
  return ctx.json({ message: `Styles post ${body}!` });
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
