import { useMutation } from "@tanstack/react-query";
import { uploadImageAPI } from "../upload.api";

export function useUploadImage() {
  return useMutation({
    mutationFn: uploadImageAPI,
  });
}