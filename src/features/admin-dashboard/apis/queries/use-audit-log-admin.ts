import { getAuditLogList } from "@/features/admin-dashboard/apis/admin.apis";
import { ADMIN_KEY } from "@/features/admin-dashboard/apis/admin.keys";
import { useQuery } from "@tanstack/react-query";


interface UseAuditLogAdminListParams {
  page: number;
  limit: number;
  search?: string;
 actorUserId?: string;
 action?: string;
 category?: string;
  sortBy: string;
  sortOrder: string;
}
export function useAuditLogAdmin({
  page,
  limit,
  search,
  actorUserId,
  action,
  category,
  sortBy,
  sortOrder,
}: UseAuditLogAdminListParams) {
    const searchParams = new URLSearchParams();
    searchParams.set("page", String(page));
    searchParams.set("limit", String(limit));
    if (search) searchParams.set("search", search);
    if (actorUserId) searchParams.set("actorUserId", actorUserId);
    if (action) searchParams.set("action", action);
    if (category) searchParams.set("category", category);
    searchParams.set("sortBy", sortBy);
    searchParams.set("sortOrder", sortOrder);
    return useQuery({
        queryKey: ADMIN_KEY.list([
          `page:${page}`,
          `limit:${limit}`,
          `search:${search ?? ""}`,
          `actorUserId:${actorUserId ?? ""}`,
          `action:${action ?? ""}`,
          `category:${category ?? ""}`,
          `sortBy:${sortBy}`,
          `sortOrder:${sortOrder}`,
        ]),
   
        queryFn:()=>getAuditLogList(searchParams)
    });
}   