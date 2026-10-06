import { useInfiniteQuery } from "@tanstack/react-query";
import { getExamListAPI } from "../exam.apis";
import { EXAM_KEY } from "../exam.keys";

export function useExamInfiniteList(diplomaId: string) {
  return useInfiniteQuery({
    queryKey: EXAM_KEY.list([diplomaId]),

    queryFn: ({ pageParam }) => {
      const params = new URLSearchParams();
      params.set("diplomaId", diplomaId);
      params.set("page", String(pageParam));
      params.set("limit", "6");
      return getExamListAPI(params);
    },

    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.payload.metadata;
      return page < totalPages ? page + 1 : undefined;
    },
    enabled: !!diplomaId,
  });
}
