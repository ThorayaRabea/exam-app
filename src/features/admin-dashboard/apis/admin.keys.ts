export const ADMIN_KEY = {
  all: ["admin"] as const,
  list: (filter: string[] = []) => [...ADMIN_KEY.all, "list", ...filter],
  detail: (id: string) => [...ADMIN_KEY.all, "detail", id],
};
