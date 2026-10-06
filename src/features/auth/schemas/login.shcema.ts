import z from "zod";

export const logInSchema = z.object({
  username: z
    .string()
    .nonempty("Username is required")
    .min(2, "Username must be at least 2 characters")
    .max(50, "Username must be at most 50 characters"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, " Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character",
    ),
});
