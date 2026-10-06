
import { useMutation } from "@tanstack/react-query";
import { updateDiplomaAPI } from "../diploma.api";

export default function useUpdateDiploma() {
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: { title: string; description: string; image?: string };
    }) => updateDiplomaAPI(id, payload),
  });
}