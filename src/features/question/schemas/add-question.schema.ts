
import { z } from "zod";

export const answerSchema = z.object({
  text: z.string().min(1, "Answer text is required"),
  isCorrect: z.boolean(),
});

export const addQuestionSchema = z.object({
  examId: z.string().min(1, "Exam is required"),
  text: z.string().trim().min(2, "Question headline is required"),
  answers: z
    .array(answerSchema)
    .min(2, "At least 2 answers are required")
    .max(4, "Answers cannot be more than 4")
    .refine((answers) => answers.filter((answer) => answer.isCorrect).length === 1, {
      message: "Exactly one answer must be marked correct",
    }),
});

