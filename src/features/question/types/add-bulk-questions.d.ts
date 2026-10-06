import type z from "zod";
import type { addBulkQuestionsSchema } from "../schemas/add-bulk-questions-schema";

export type IAddBulkQuestionsFormValues = z.infer<typeof addBulkQuestionsSchema>;

