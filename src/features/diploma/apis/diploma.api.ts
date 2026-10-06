import { axiosInstance } from "@/shared/lib/axios";
import {
  type IPaginatedApiResponse,
  type ISuccessResponse,
} from "@/shared/types/api";
import type { IAddNewDiplomaRequest, IDiplomaItem, IOneDiplomaApiResponse, IPaginatedDiplomaApiResponse } from "../types/diploma";
import { DIPLOMA_ENDPOINT } from "./diploma.endpoint";

export async function getDiplomaListAPI(searchParams?: URLSearchParams) {
  const response = await axiosInstance.get<
    ISuccessResponse<IPaginatedApiResponse<IDiplomaItem[]>>
  >(DIPLOMA_ENDPOINT, { params: searchParams });

  //console.log(response.data);
  return response.data;
}

export async function getDiplomaByIdAPI(id: string) {
  const response = await axiosInstance.get<
    IPaginatedDiplomaApiResponse<IOneDiplomaApiResponse>
  >(`${DIPLOMA_ENDPOINT}/${id}`);
  return response.data;
}


export async function addNewDiplomaAPI(data:IAddNewDiplomaRequest) {

  const response = await axiosInstance.post<
    IPaginatedDiplomaApiResponse<IOneDiplomaApiResponse>
  >(`${DIPLOMA_ENDPOINT}`,data);
  return response.data;
}

export async function deleteDiplomaApI(id:string) {

  const response = await axiosInstance.delete<{message:string}>(`${DIPLOMA_ENDPOINT}/${id}`,);
  return response.data;
}



export async function updateDiplomaAPI(
  id: string,
  payload: { title: string; description: string; image?: string },
) {
  const response = await axiosInstance.put<ISuccessResponse<{ diploma: IDiplomaItem }>>(
    `${DIPLOMA_ENDPOINT}/${id}`,
    payload,
  );
  return response.data;
}