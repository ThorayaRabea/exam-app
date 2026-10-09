import { axiosInstance } from "@/shared/lib/axios";

import type {
  IPaginatedApiResponse,
  ISuccessResponse,
} from "@/shared/types/api";

import type {
  IEditExamFormValues,
  IExamItem,
  IPaginatedExamApiResponse,
  IResponseExamDetails,
} from "../types/exam";
import { EXAM_ENDPOINT } from "./exam.endpoint";

export async function getExamListAPI(searchParams?: URLSearchParams) {
  const response = await axiosInstance.get<
    ISuccessResponse<IPaginatedApiResponse<IExamItem[]>>
  >(EXAM_ENDPOINT, {
    params: searchParams,
  });
  //console.log(response.data);
  return response.data;
}

export async function getExamDetailsAPI(examId: string) {
  const response = await axiosInstance.get<
    IPaginatedExamApiResponse<IResponseExamDetails>
  >(`${EXAM_ENDPOINT}/${examId}`);
  console.log(response.data);
  return response.data;
}

export async function deleteExamApI(id: string) {
  const response = await axiosInstance.delete<{ message: string }>(
    `${EXAM_ENDPOINT}/${id}`,
  );
  return response.data;
}

export async function updateExamAPI(id: string, payload: IEditExamFormValues) {
  const response = await axiosInstance.put<{ exam: IExamItem }>(
    `${EXAM_ENDPOINT}/${id}`,
    payload,
  );
  return response.data;
}

export async function addExamAPI(payload: IEditExamFormValues) {
  const response = await axiosInstance.post<{ exam: IExamItem }>(
    EXAM_ENDPOINT,
    payload,
  );
  return response.data;
}

export async function immutableExamAPI(id: string) {
  const response = await axiosInstance.patch<{ immutable: boolean }>(
    `${EXAM_ENDPOINT}/${id}/immutable`,
  );

  return response.data;
}
