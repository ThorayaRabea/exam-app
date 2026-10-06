import {  useQuery } from "@tanstack/react-query";
import { getExamDetailsAPI } from "../exam.apis";
import { EXAM_KEY } from "../exam.keys";

export default function UseExamDetails(id?: string) {
  return useQuery({
    queryKey: EXAM_KEY.detail(id!),
    queryFn: () => getExamDetailsAPI(id!),
    enabled: !!id,
  });
}
