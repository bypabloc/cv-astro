// Path: api/src/routes/index.ts

import { Hono } from "hono";
import { styles } from "./styles";

const routes = new Hono();

routes.route("/styles", styles);

export { routes };
