import { type Serve } from "bun";

type Middleware = (req: any, res: any, next: () => void) => void;
type RequestHandler = (req: any, res: any) => Response;

const loggerMiddleware: Middleware = (req, res, next) => {
  const url = new URL(req.url);
  const method = req.method;
  const currentTime = new Date().toISOString();

  console.log(`[${currentTime}] ${method} - ${url.pathname}`);
  next();
};

class Router {
  routes: { [method: string]: { [path: string]: RequestHandler } } = {};

  get(path: string, handler: RequestHandler) {
    this.addRoute("GET", path, handler);
  }

  post(path: string, handler: RequestHandler) {
    this.addRoute("POST", path, handler);
  }

  put(path: string, handler: RequestHandler) {
    this.addRoute("PUT", path, handler);
  }

  private addRoute(method: string, path: string, handler: RequestHandler) {
    if (!this.routes[method]) {
      this.routes[method] = {};
    }
    this.routes[method][path] = handler;
  }
}

class Server {
  middlewares: Middleware[] = [];
  routes: { [method: string]: { [path: string]: RequestHandler } } = {};

  use(middleware: Middleware) {
    this.middlewares.push(middleware);
  }

  get(path: string, handler: RequestHandler) {
    this.addRoute("GET", path, handler);
  }

  post(path: string, handler: RequestHandler) {
    this.addRoute("POST", path, handler);
  }

  // Agregar más métodos HTTP según sea necesario

  private addRoute(method: string, path: string, handler: RequestHandler) {
    if (!this.routes[method]) {
      this.routes[method] = {};
    }
    this.routes[method][path] = handler;
  }

  useRouter(path: string, router: Router) {
    for (const [method, routes] of Object.entries(router.routes)) {
      for (const [routePath, handler] of Object.entries(routes)) {
        const fullPath = path + routePath;
        this.addRoute(method, fullPath, handler);
      }
    }
  }

  async fetch(request: Request, server: Server): Promise<Response> {
    try {
      if (!request || !server) {
        console.error("Request o Server no definidos");
        return new Response("Internal Server Error", { status: 500 });
      }

      const url = new URL(request.url);
      const pathname = url.pathname;
      const method = request.method;

      let response: Response;

      // Ejecutamos los middlewares en orden
      for (const middleware of this.middlewares) {
        middleware(request, response, () => {});
      }

      if (this.routes[method] && this.routes[method][pathname]) {
        const handler = this.routes[method][pathname];
        response = handler(request, new Response(""));
      } else {
        throw new Error("Route not found"); // Lanza un error si la ruta no se encuentra
      }

      return response;
    } catch (error) {
      console.error(`Error: ${error.message}`);
      return new Response(error.message, { status: 500 });
    }
  }
}

const app = new Server();

app.use(loggerMiddleware);

// Agregar middlewares
app.use((req, res, next) => {
  console.log("Middleware 1");
  next();
});

// Agregar rutas
app.get("/", (req, res) => {
  res = new Response("Hello, world!", { status: 200 });
  return res;
});

const router = new Router();

router.get("", (req, res) => {
  return new Response(JSON.stringify({ message: "aaaaaaaaaa" }), {
    status: 200,
  });
});

router.post("", (req, res) => {
  return new Response(JSON.stringify({ message: "Router POST succeed" }), {
    status: 200,
  });
});

router.put("", (req, res) => {
  return new Response(JSON.stringify({ message: "Router PUT succeed" }), {
    status: 200,
  });
});

app.useRouter("/test", router);

// Iniciar el servidor
export default {
  port: 8000,
  fetch(req) {
    return app.fetch(req, app);
  },
  error(error: Error) {
    return new Response(`<pre>${error}\n${error.stack}</pre>`, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  },
} satisfies Serve;
