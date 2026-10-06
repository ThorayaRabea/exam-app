import { useMutation } from "@tanstack/react-query";
import { updateQuestionAPI } from "../questions.apis";

export default function useUpdateQuestion() {
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: {
        text: string;
        answers: { text: string; isCorrect: boolean }[];
      };
    }) => {
      console.log("submitting update:", id, payload);
      return updateQuestionAPI(id, payload);
    },
  });
}
