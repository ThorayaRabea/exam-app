import { mapSearchParamsToQueryKeys } from "@/shared/utils/query.util";
import { EXAM_KEY } from "./exam.keys";
import { getExamListAPI } from "./exam.apis";


export const examListQueryOptions = (searchParams?: URLSearchParams) => ({
  queryKey: EXAM_KEY.list(mapSearchParamsToQueryKeys(searchParams)),
  queryFn:()=> getExamListAPI(searchParams),
});
