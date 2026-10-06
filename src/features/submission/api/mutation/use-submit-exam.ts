import { useMutation } from "@tanstack/react-query";
import { submitExamAPI } from "../submission.api";

export function useSubmitExam() {
  return useMutation({
    mutationFn: submitExamAPI,
  });
}
