import { useInfiniteQuery } from "@tanstack/react-query";

import { getDiplomaListAPI } from "../diploma.api";
import { DIPLOMA_KEY, DIPLOMA_SEARCH_PARAMS } from "../diploma.key";
import { mapSearchParamsToQueryKeys } from "@/shared/utils/query.util";

export function useDiplomaInfiniteList(searchParams?: URLSearchParams) {
  return useInfiniteQuery({
    queryKey: DIPLOMA_KEY.list(mapSearchParamsToQueryKeys(searchParams)),
    queryFn: ({ pageParam }) => getDiplomaListAPI(new URLSearchParams([DIPLOMA_SEARCH_PARAMS.page(pageParam),DIPLOMA_SEARCH_PARAMS.limit(6)]) ),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.payload.metadata;
      return page < totalPages ? page + 1 : undefined;
    },
  });
}