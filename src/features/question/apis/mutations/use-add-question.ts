import { useMutation } from "@tanstack/react-query";
import { addQuestionAPI } from "../questions.apis";

export default function useAddQuestion() {
  return useMutation({
    mutationFn: ({
      examId,
      payload,
    }: {
      examId: string;
      payload: { text: string; answers: { text: string; isCorrect: boolean }[] };
    }) => addQuestionAPI(examId, payload),
  });
}