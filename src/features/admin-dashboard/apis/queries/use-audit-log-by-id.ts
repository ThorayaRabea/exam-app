import { useQuery } from "@tanstack/react-query";
import { getAuditLogByIdAPI } from "../admin.apis";
import { ADMIN_KEY } from "../admin.keys";

export default function UseAuditLogByID(id?: string) {
  return useQuery({
    queryKey: ADMIN_KEY.detail(id!),
    queryFn: () => getAuditLogByIdAPI(id!),
    enabled: !!id,
  });
}
