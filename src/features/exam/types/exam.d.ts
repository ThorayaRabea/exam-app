import type z from "zod";
import type { editExamSchema } from "../schemas/edit-exam.schema";

export type IEditExamFormValues = z.infer<typeof editExamSchema>;

export interface IExamItem {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: number;
  questionsCount: number;
  diplomaId: string;

  diploma: {
    id: string;
    title: string;
  };

  immutable: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface IResponseExamDetails{
  exam: IExamItem,
 
}

export interface IPaginatedExamApiResponse<T> {
 payload: T;
 code: number;
 status: boolean;
}