// Path: api/src/index.ts

import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import ConnectionDB from "@/database/connection";

import { routes } from "@/routes";

// Inicia y establece la conexión a la base de datos
ConnectionDB.getInstance().connect(process.env.DB_URI || "");

const api = new Hono();

api.use("*", logger());
api.use("*", prettyJSON());

// Configuración CORS - Ajusta según tus necesidades
api.use(
  "/*",
  cors({
    // ... tu configuración CORS ...
  })
);

// Middleware para tiempo de respuesta - Opcional
api.use("*", async (c, next) => {
  const start = Date.now();
  await next();
  const end = Date.now();
  c.res.headers.set("X-Response-Time", `${end - start}ms`);
});

// Rutas
api.route("/", routes);

// Manejo de rutas no encontradas
api.notFound((c) => c.json({ message: "Not Found" }, 404));

// Configuración del servidor
const PORT = process.env.PORT || 8000;

export default {
  port: PORT,
  fetch: api.fetch,
};
