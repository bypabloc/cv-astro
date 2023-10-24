// Path: api/src/startup/autoRoutes/index.ts

import { Elysia } from "elysia";
import Files from "@/utils/files";
import { IRequest } from "@/interfaces/request";

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
          const methods: { [key: string]: Function } = {
            GET: () => {
              app.get(pathRoute, (app) => {
                const request: IRequest = {
                  headers: app.headers,
                  cookie: app.cookie,
                  query: app.query,
                  params: app.params,
                  body: app?.body,
                };

                const respHandler = handler(request);

                return respHandler;
              });
            },
            POST: () => app.post(pathRoute, (app) => handler(app)),
            PUT: () => app.put(pathRoute, (app) => handler(app)),
            DELETE: () => app.delete(pathRoute, (app) => handler(app)),
          };
          methods[method]();
        }
      }
    } catch (error) {
      console.log("Path: api/src/startup/autoRoutes/index.ts", error);
    }
    return app;
  };
};
