import { useQuery } from "@tanstack/react-query";
import { getDiplomaListAPI } from "../diploma.api";

export function useDiplomaOptions() {
  const params = new URLSearchParams();
  params.set("page", "1");
  params.set("limit", "100");

  return useQuery({
    queryKey: ["diploma", "options"],
    queryFn: () => getDiplomaListAPI(params),
  });
}