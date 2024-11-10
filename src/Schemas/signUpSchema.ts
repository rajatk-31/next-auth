import { z } from "zod";

export const userNameValidation = z
  .string()
  .min(3)
  .max(20)
  //regex for no special character in username (generate code for regex)/^[a-zA-Z0-9_]*$/
  .regex(/^[a-zA-Z0-9_]*$/);

export const signUpSchema = z.object({
  username: userNameValidation,
  name: z.string().min(3).max(20),
  email: z.string().email(),
  password: z
    .string()
    .min(6)
    .max(20)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/),
});
