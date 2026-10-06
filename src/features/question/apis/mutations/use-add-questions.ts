import { useMutation } from "@tanstack/react-query";
import { addQuestionsAPI } from "../questions.apis";

export default function useAddQuestions() {
  return useMutation({
    mutationFn: ({
      examId,
      payload,
    }: {
      examId: string;
      payload: {
        questions: {
          text: string;
          answers: { text: string; isCorrect: boolean }[];
        }[];
      };
    }) => addQuestionsAPI(examId, payload),
  });
}
