import { useQuery } from "@tanstack/react-query";
import { getExamListAPI } from "@/features/exam/apis/exam.apis";

export function useExamOptions() {
  const params = new URLSearchParams();
  params.set("page", "1");
  params.set("limit", "100");

  return useQuery({
    queryKey: ["exams", "options"],
    queryFn: () => getExamListAPI(params),
  });
}