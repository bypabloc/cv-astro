// Path: api/src/index.ts

import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";

import ConnectionDB from "@/database/connection";
import { config } from "@/config";
import { routes } from "@/routes";

// Inicia y establece la conexión a la base de datos
ConnectionDB.getInstance().connect(config.dbUri);

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

// Solo para el entorno de pruebas, escuchamos las señales de terminación
if (config.environment === "test") {
  process.on("SIGINT", async () => {
    console.log("SIGINT signal received: closing MongoDB connection");
    await ConnectionDB.getInstance().disconnect();
    process.exit(0);
  });

  process.on("SIGTERM", async () => {
    console.log("SIGTERM signal received: closing MongoDB connection");
    await ConnectionDB.getInstance().disconnect();
    process.exit(0);
  });
}

// Configuración del servidor
const PORT = config.port || 8000;

export default {
  port: PORT,
  fetch: api.fetch,
};
