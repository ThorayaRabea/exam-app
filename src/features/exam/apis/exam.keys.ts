export const EXAM_KEY = {
  all: ["exams"] as const,

  list: (filter: string[] = []) => [...EXAM_KEY.all, "list", ...filter],

  detail: (id: string) => [...EXAM_KEY.all, "detail", id],
} as const;

export const EXAM_SEARCH_PARAMS = {
  diplomaId: (diplomaId: string) => ["diplomaId", diplomaId],

  page: (page: number | string) => ["page", page.toString()],

  limit: (limit: number | string) => ["limit", limit.toString()],
} as const;
