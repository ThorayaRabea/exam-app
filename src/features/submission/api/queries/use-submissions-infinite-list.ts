import { useInfiniteQuery } from "@tanstack/react-query";
import { getSubmissionsListAPI } from "../submission.api";
import { SUBMISSION_KEY } from "../submission.keys";

export function useSubmissionsInfiniteList() {
  return useInfiniteQuery({
    queryKey: SUBMISSION_KEY.list(),
    queryFn: ({ pageParam }) => {
      const params = new URLSearchParams();
      params.set("page", String(pageParam));
      params.set("limit", "12");
      return getSubmissionsListAPI(params);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.payload.metadata;
      return page < totalPages ? page + 1 : undefined;
    },
  });
}