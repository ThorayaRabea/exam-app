import { useQuery } from "@tanstack/react-query";
import { getExamListAPI } from "../exam.apis";
import { EXAM_KEY } from "../exam.keys";

interface UseExamsAdminListParams {
  page: number;
  limit: number;
  search?: string;
  diplomaId?: string;
  immutable?: string;
  sortBy: string;
  sortOrder: string;
}

export function useExamsAdminList({
  page,
  limit,
  search,
  diplomaId,
  immutable,
  sortBy,
  sortOrder,
}: UseExamsAdminListParams) {
  const searchParams = new URLSearchParams();
  searchParams.set("page", String(page));
  searchParams.set("limit", String(limit));
  if (search) searchParams.set("search", search);
  if (diplomaId) searchParams.set("diplomaId", diplomaId);
  if (immutable) searchParams.set("immutable", immutable);
  searchParams.set("sortBy", sortBy);
  searchParams.set("sortOrder", sortOrder);

  return useQuery({
    queryKey: EXAM_KEY.list([
      `page:${page}`,
      `limit:${limit}`,
      `search:${search ?? ""}`,
      `diplomaId:${diplomaId ?? ""}`,
      `sortBy:${sortBy}`,
      `immutable:${immutable ?? ""}`,
      `sortOrder:${sortOrder}`,
    ]),
    queryFn: () => getExamListAPI(searchParams),
  });
}
