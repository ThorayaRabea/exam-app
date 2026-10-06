import { mapSearchParamsToQueryKeys } from "@/shared/utils/query.util";
import { getDiplomaListAPI } from "./diploma.api";
import { DIPLOMA_KEY } from "./diploma.key";

export const diplomaListQueryOptions = (searchParams?: URLSearchParams) => ({
  queryKey: DIPLOMA_KEY.list(mapSearchParamsToQueryKeys(searchParams)),
  queryFn: () => getDiplomaListAPI(searchParams),
});
