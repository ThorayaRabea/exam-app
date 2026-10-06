import { useMutation } from "@tanstack/react-query";
import { addNewDiplomaAPI } from "../diploma.api";

export default function UseAddNewDiploma() {
  return useMutation({
    mutationFn: addNewDiplomaAPI,
  });
}
