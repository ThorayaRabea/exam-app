import { useMutation } from "@tanstack/react-query";
import {  immutableDiplomaAPI } from "../diploma.api";

export default function UseImmutableDiploma() {
  return useMutation({
    mutationFn: immutableDiplomaAPI,
  });
}
