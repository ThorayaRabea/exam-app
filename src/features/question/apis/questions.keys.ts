export const QUESTION_KEY = {
  all: ["questions"] as const,

  list: (filter: string[] = []) => [
    ...QUESTION_KEY.all,
    "list",
    ...filter,
  ],

  detail: (id: string) => [
    ...QUESTION_KEY.all,
    "detail",
    id,
  ],
} as const;

export const QUESTION_SEARCH_PARAMS = {
  examId: (examId: string) => [
    "examId",
    examId,
  ],


} as const;