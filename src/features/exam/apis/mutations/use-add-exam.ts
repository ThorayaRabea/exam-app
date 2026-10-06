import { useMutation } from "@tanstack/react-query";
import { addExamAPI } from "../exam.apis";

export default function useAddExam() {
  return useMutation({
    mutationFn: addExamAPI,
  });
}