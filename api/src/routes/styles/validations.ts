import { z } from "zod";

export const save = z.object({
  name: z.string().min(1),
  css: z.string().min(1),
  userId: z.string().uuid(),
});
