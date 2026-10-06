import { useQuery } from "@tanstack/react-query";
import { getSubmissionDetailsAPI } from "../submission.api";
import { SUBMISSION_KEY } from "../submission.keys";

export function useSubmissionDetails(id?: string) {
  return useQuery({
    queryKey: SUBMISSION_KEY.detail(id!),
    queryFn: () => getSubmissionDetailsAPI(id!),
    enabled: !!id,
  });
}