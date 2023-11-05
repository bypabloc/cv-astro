// Path: api/src/routes/index.ts

import { Hono } from "hono";
import { styles } from "./styles";
import { users } from "./users";

const routes = new Hono();

routes.route("/styles", styles);
routes.route("/users", users);

export { routes };
