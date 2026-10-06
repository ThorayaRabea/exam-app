import { axiosInstance } from "@/shared/lib/axios";
import type { IUploadResponse } from "../types/upload";
import { UPLOAD_ENDPOINT } from "./endpoint";

export async function uploadImageAPI(file: File) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axiosInstance.post<IUploadResponse>(
    UPLOAD_ENDPOINT,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
  return response.data;
}