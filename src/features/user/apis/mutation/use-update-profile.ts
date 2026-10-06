import { useMutation } from "@tanstack/react-query";
import { updateProfileAPI } from "../user.apis";

export default function useUpdateProfile() {
  return useMutation({
    mutationFn: updateProfileAPI,
  });
}