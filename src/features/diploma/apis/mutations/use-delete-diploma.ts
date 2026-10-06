import { useMutation } from "@tanstack/react-query";
import { deleteDiplomaApI } from "../diploma.api";

export default function UseDeleteDiploma() {
  return useMutation({
    mutationFn: deleteDiplomaApI,
  });
}
