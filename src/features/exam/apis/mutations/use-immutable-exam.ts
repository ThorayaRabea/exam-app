import { useMutation } from "@tanstack/react-query";
import { immutableExamAPI } from "../exam.apis";

export default function UseImmutableExam() {
  return useMutation({
    mutationFn: immutableExamAPI,
  });
}
