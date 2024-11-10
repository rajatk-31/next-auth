import { z } from "zod";

export const messageSchema = z.object({
  message: z.string().min(10, { message: "Min 10 characters" }).max(1000),
});
