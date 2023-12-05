import { z } from "zod";

const AuthValidator = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "password must be at least 8 chaeacters long." }),
});

export default AuthValidator;

export type TAuthValidator = z.infer<typeof AuthValidator>;
