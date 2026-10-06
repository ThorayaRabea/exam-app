import { useQuery } from "@tanstack/react-query";
import { getDiplomaByIdAPI } from "../diploma.api";
import { DIPLOMA_KEY } from "../diploma.key";

export function useDiplomaDetails(id?: string) {
  return useQuery({
    queryKey: DIPLOMA_KEY.detail(id!),
    queryFn: () => getDiplomaByIdAPI(id!),
    enabled: !!id,
  });
}