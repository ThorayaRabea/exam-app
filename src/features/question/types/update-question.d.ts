import type z from "zod";
import type { UpdateQuestionSchema } from "../schemas/update-question-schema";

export type IUpdateQuestionFormValues = z.infer<typeof UpdateQuestionSchema>;