import type z from "zod";
import type { addQuestionSchema, answerSchema } from "../schemas/add-question.schema";

export type IAddQuestionFormValues = z.infer<typeof addQuestionSchema>;
export type IAnswers=z.infer<typeof answerSchema>
export interface IAddQuestionData {
  text: string;
  answers: { text: string; isCorrect: boolean }[];
}
