import { useMutation } from "@tanstack/react-query";
import { deleteQuestionAPI } from "../questions.apis";

export default function useDeleteQuestion() {
  return useMutation({
    mutationFn: deleteQuestionAPI,
  });
}