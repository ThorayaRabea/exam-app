import z from "zod";

export const ChangePasswordSchema = z.object({
 currentPassword:z
    .string("Confirm password is required")
    .nonempty("Confirm password is required"),
  newPassword: z
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
  confirmPassword: z
    .string("Confirm password is required")
    .nonempty("Confirm password is required"),
});
