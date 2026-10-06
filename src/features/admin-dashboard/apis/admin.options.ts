import { mapSearchParamsToQueryKeys } from "@/shared/utils/query.util";
import { ADMIN_KEY } from "./admin.keys";
import { getAuditLogList } from "./admin.apis";

export const auditLogListQueryOptions=(searchParams:URLSearchParams)=>({
    queryKey:ADMIN_KEY.list(mapSearchParamsToQueryKeys(searchParams)),
    queryFn:() => getAuditLogList(searchParams)
})