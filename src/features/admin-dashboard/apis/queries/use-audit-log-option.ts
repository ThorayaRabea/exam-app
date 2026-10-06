import { useQuery } from "@tanstack/react-query";
import { getAuditLogList } from "../admin.apis";

export function useAuditLogOptions() {
  const params = new URLSearchParams();
  params.set("page", "1");
  params.set("limit", "100");
 


  return useQuery({
    queryKey: ["admin", "options"],
    queryFn: () => getAuditLogList(params),
  });
}