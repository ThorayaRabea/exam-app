import z from "zod";

export const addDiplomaSchema = z.object({
  title: z
    .string()
    .nonempty("Title is required")
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title must be at most 50 characters"),
  description:z
    .string()
    .nonempty("Description is required")
    .min(20, "Description must be at least 20 characters")
    .max(400, "Description must be at most 400 characters"),
image:z.string('image is required')
  
})