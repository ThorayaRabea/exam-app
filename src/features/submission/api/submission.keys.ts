export const SUBMISSION_KEY = {
  all: ["submissions"] as const,
  list: (filter: string[] = []) => [...SUBMISSION_KEY.all, "list", ...filter],
  detail: (id: string) => [...SUBMISSION_KEY.all, "detail", id],
} as const;

export const SUBMISSION_SEARCH_PARAMS = {
  examId: (examId: string) => ["examId", examId],
  page: (page: number | string) => ["page", page.toString()],
  limit: (limit: number | string) => ["limit", limit.toString()],
  search: (search: string) => ["search", search],
} as const;