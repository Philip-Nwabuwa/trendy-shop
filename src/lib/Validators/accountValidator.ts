import { z } from "zod";

const AddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
});

const AuthValidator = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "password must be at least 8 chaeacters long." }),
  firstName: z.string(),
  lastName: z.string(),
  zipcode: z.string().refine((val) => /^\d{5}$/.test(val)),
  address: AddressSchema,
});

export default AuthValidator;

export type TAuthValidator = z.infer<typeof AuthValidator>;
