// Path: api/src/routes/users/validation.ts

import { z } from "zod";

export const save = z.object({
  nickname: z.string().min(6),
  email: z.string().min(6),
  password: z.string().min(8),
});
