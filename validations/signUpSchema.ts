import { z } from "zod";

const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 letters" })
      .regex(/^[A-Za-z]{2,}$/, {
        message: "First name must contain only letters",
      }),
    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 letters" })
      .regex(/^[A-Za-z]{2,}$/, {
        message: "Last name must contain only letters",
      }),
    email: z
      .string()
      .min(1, { message: "Email address is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
        message: "Password must include upper/lowercase and a number",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm password is required" })
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
        message: "Confirm password must match password requirements",
      }),
    gender: z
      .string()
      .min(1, { message: "Gender is required" })
      .refine((v) => ["male", "female"].includes(v), {
        message: "Invalid selection",
      }),
    terms: z
      .boolean()
      .refine((v) => v === true, { message: "You must accept the terms" }),
  })
  .refine((input) => input.password === input.confirmPassword, {
    message: "Password and confirm password do not match",
    path: ["confirmPassword"],
  });

type signUpType = z.infer<typeof signUpSchema>;

export { signUpSchema, type signUpType };
