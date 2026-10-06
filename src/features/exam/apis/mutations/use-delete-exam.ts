import { useMutation } from "@tanstack/react-query";
import { deleteExamApI } from "../exam.apis";

export default function UseDeleteExam() {
  return useMutation({
    mutationFn: deleteExamApI,
  });
}
