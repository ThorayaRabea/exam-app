import { useQuery } from "@tanstack/react-query";
import { getQuestionByIdAPI } from "../questions.apis";

export function useQuestionDetails(id?: string) {
  return useQuery({
    queryKey: ["questions", "detail", id],
    queryFn: () => getQuestionByIdAPI(id!),
    enabled: !!id,
  });
}