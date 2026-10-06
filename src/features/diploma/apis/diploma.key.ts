export const DIPLOMA_KEY = {
  all: ["diploma"] as const,
  list: (filter: string[] = []) => [
    ...DIPLOMA_KEY.all,
    "list",
    ...filter,
  ],
  detail: (id: string) => [...DIPLOMA_KEY.all, "detail", id],
} as const ;


export const DIPLOMA_SEARCH_PARAMS = {
  page:(page: number|string)=>["page",page.toString()],
  limit:(limit: number|string)=>["limit",limit.toString()],
} as const;