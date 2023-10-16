// Path: api/src/startup/autoRoutes/index.ts

import { Elysia } from "elysia";
import Files from "@/utils/files";

export const autoRoutes = (
  options = { routesDir: "/routes", prefix: "/" } as {
    routesDir: string;
    prefix: string;
  }
) => {
  return async (app: Elysia) => {
    try {
      const { routesDir, prefix } = options;

      const files = new Files({ dir: routesDir, prefix });

      const exists = files.exists();

      if (!exists) {
        console.log("El directorio de rutas no existe.");
        return;
      }

      const filesList = files.files;

      for (const file of filesList) {
        const { isDirectory, handler, pathRoute, name, method } = file;
        if (isDirectory) {
          const { prefix } = file;
          autoRoutes({
            routesDir: routesDir + "/" + name,
            prefix,
          })(app);
        } else {
          if (method === "GET") {
            app.get(pathRoute, handler());
          } else if (method === "POST") {
            app.post(pathRoute, handler());
          } else if (method === "PUT") {
            app.put(pathRoute, handler());
          } else if (method === "DELETE") {
            app.delete(pathRoute, handler());
          }
        }
      }
    } catch (error) {
      console.log("Path: api/src/startup/autoRoutes/index.ts", error);
    }
    return app;
  };
};
