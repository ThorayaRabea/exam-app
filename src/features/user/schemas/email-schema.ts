import z from "zod";

export const newEmailSchema = z.object({

  newEmail: z.email({
    error: (iss) =>
      iss.input
        ? "Please enter a valid email address"
        : "enter your email address",
  }),
})