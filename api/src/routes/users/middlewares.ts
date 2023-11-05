// Path: api/src/routes/styles/middlewares.ts

import { save } from "./validations";

export const validateSavePayload = async (c, next) => {
  const body = await c.req.json();
  const result = save.safeParse(body);

  if (!result.success) {
    // El payload no es válido, responder con un error.
    return c.json(
      { error: "Payload no válido", details: result.error.issues },
      400
    );
  }

  // Almacenar los datos validados en el contexto para su uso posterior.
  c.data = result.data;
  return next();
};
