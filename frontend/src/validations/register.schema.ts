import { z } from "zod";

export const registerSchema =
  z
    .object({
      name: z
        .string()
        .min(2),

      email: z
        .string(),
        // .email(),

      phone: z
        .string()
        .min(10),

      // role: z.string(),

      password: z
        .string()
        .min(6),

      confirmPassword:
        z.string(),
    })
    .refine(
      (data) =>
        data.password ===
        data.confirmPassword,
      {
        path: [
          "confirmPassword",
        ],
        message:
          "Passwords do not match",
      }
    );

export type RegisterFormData =
  z.infer<
    typeof registerSchema
  >;