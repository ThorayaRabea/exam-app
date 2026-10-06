import { useQuery } from "@tanstack/react-query";
import { getDiplomaListAPI } from "../diploma.api";
import { DIPLOMA_KEY } from "../diploma.key";

interface UseDiplomasAdminListParams {
  page: number;
  limit: number;
  search?: string;
  immutable?: string;
  sortBy: string;
  sortOrder: string;
}

export function useDiplomasAdminList({
  page,
  limit,
  search,
  immutable,
  sortBy,
  sortOrder,
}: UseDiplomasAdminListParams) {
  const searchParams = new URLSearchParams();
  searchParams.set("page", String(page));
  searchParams.set("limit", String(limit));
  if (search) searchParams.set("search", search);
  if (immutable) searchParams.set("immutable", immutable);
  searchParams.set("sortBy", sortBy);
  searchParams.set("sortOrder", sortOrder);

  return useQuery({
    queryKey: DIPLOMA_KEY.list([
      `page:${page}`,
      `limit:${limit}`,
      `search:${search ?? ""}`,
      `sortBy:${sortBy}`,
      `immutable:${immutable ?? ""}`,
      `sortOrder:${sortOrder}`,
    ]),
    queryFn: () => getDiplomaListAPI(searchParams),
  });
}
