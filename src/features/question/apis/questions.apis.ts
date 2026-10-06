import { axiosInstance } from "@/shared/lib/axios";
import type { ISuccessResponse } from "@/shared/types/api";
import type { IAddQuestionData } from "../types/add-questions";

import type {
  IQuestion,
  IQuestionResponseById,
  IQuestionsPayload,
} from "../types/questions";

import { QUESTIONS_ENDPOINT } from "./questions.endpoint";


export async function getQuestionsAPI(examId: string) {
  const response = await axiosInstance.get<ISuccessResponse<IQuestionsPayload>>(
    `${QUESTIONS_ENDPOINT}/${examId}`,
  );
  console.log(response.data);
  return response.data;
}

export async function deleteQuestionAPI(id: string) {
  const response = await axiosInstance.delete<{ message: string }>(
    `/api/questions/${id}`,
  );
  return response.data;
}

export async function getQuestionByIdAPI(id: string) {
  const response = await axiosInstance.get<
    ISuccessResponse<IQuestionResponseById>
  >(`/api/questions/${id}`);
  console.log(response.data);
  return response.data;
}

export async function addQuestionAPI(
  examId: string,
  payload: IAddQuestionData,
) {
  const response = await axiosInstance.post<{ question: IQuestion }>(
    `/api/questions/exam/${examId}`,
    payload,
  );
  return response.data;
}

export async function addQuestionsAPI(
  examId: string,
 payload: {
    questions: { text: string; answers: { text: string; isCorrect: boolean }[] }[];
  },
) {
  const response = await axiosInstance.post<any>(
    `/api/questions/exam/${examId}/bulk`,
    payload,
  );
  console.log(response.data);
  return response.data;
}

export async function updateQuestionAPI(id: string, payload: IAddQuestionData) {
  console.log('hello from update function')
  const response = await axiosInstance.put<{ question: IQuestion }>(
    `/api/questions/${id}`,
    payload,
  );
  console.log(response.data);
  return response.data;
}
