export function mapSearchParamsToQueryKeys(searchParams?: URLSearchParams) {
  if (!searchParams) return [];
  return Object.entries(searchParams).map(([key, value]) => `${key}:${value}`);
}