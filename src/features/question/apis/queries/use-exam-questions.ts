import { useQuery } from "@tanstack/react-query";
import { getQuestionsAPI } from "../questions.apis";

export function useExamQuestions(examId: string) {
  return useQuery({
    queryKey: ["questions", "list", examId],
    queryFn: () => getQuestionsAPI(examId),
    enabled: !!examId,
  });
}