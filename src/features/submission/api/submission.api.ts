import type { ISubmission, ISubmissionResult,  ISubmitExamPayload } from './../types/submission.d';
import type { IPaginatedApiResponse, ISuccessResponse } from './../../../shared/types/api';
import { axiosInstance } from "@/shared/lib/axios";

import { SUBMISSIONS_ENDPOINT } from "./submission.endpoint";

export async function submitExamAPI(payload: ISubmitExamPayload) {
  const response = await axiosInstance.post
  <  ISuccessResponse<ISubmissionResult>
  >(SUBMISSIONS_ENDPOINT, payload);
  console.log(response.data);
  return response.data;
}

export async function getSubmissionsListAPI(searchParams?: URLSearchParams) {
  const response = await axiosInstance.get
   < ISuccessResponse<IPaginatedApiResponse<ISubmission[]>>
  >(SUBMISSIONS_ENDPOINT, { params: searchParams });
  return response.data;
}

export async function getSubmissionDetailsAPI(id: string) {
  const response = await axiosInstance.get
    <ISuccessResponse<ISubmissionResult>
  >(`${SUBMISSIONS_ENDPOINT}/${id}`);
  return response.data;
}