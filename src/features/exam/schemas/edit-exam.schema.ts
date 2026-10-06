import { z } from "zod";

export const editExamSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(100, "Title is too long"),
  description: z.string().min(20, "Description must be at least 20 characters").max(400, "Description is too long"),
  duration: z.number({ error: "Duration is required" }).min(1, "Duration must be at least 1 minute"),
  diplomaId: z.string().min(1, "Diploma is required"),
  image: z.string().optional(),
});

