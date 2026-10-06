import { isValidPhoneNumber } from "react-phone-number-input";
import z from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .nonempty("Username is required")
    .min(2, "Username must be at least 2 characters")
    .max(50, "Username must be at most 50 characters"),
  email: z.email({
    error: (iss) =>
      iss.input
        ? "Please enter a valid email address"
        : "enter your email address",
  }),
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
  confirmPassword: z
    .string("Confirm password is required")
    .nonempty("Confirm password is required"),
  firstName: z
    .string()
    .nonempty("Username is required")
    .min(2, "Username must be at least 2 characters")
    .max(50, "Username must be at most 50 characters"),
  lastName: z
    .string()
    .nonempty("Username is required")
    .min(2, "Username must be at least 2 characters")
    .max(50, "Username must be at most 50 characters"),
  phone: z
    .string("Phone is required")
    .nonempty("Phone is required")
    .refine((value) => isValidPhoneNumber(value, { defaultCountry: "EG" })).optional(),
});

