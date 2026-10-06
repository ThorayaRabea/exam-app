import { useMutation } from "@tanstack/react-query";
import { updateExamAPI } from "../exam.apis";
import type { IEditExamFormValues } from "../../types/exam";

export default function useUpdateExam() {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: IEditExamFormValues }) =>
      updateExamAPI(id, payload),
  });
}