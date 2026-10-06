// use-user-options.ts
import { useQuery } from "@tanstack/react-query";
import { getUsersListAPI } from "../admin.apis";

export function useUserOptions() {
  return useQuery({
    queryKey: ["users", "options", "all"],
    queryFn: async () => {
      const firstPageParams = new URLSearchParams();
      firstPageParams.set("page", "1");
      firstPageParams.set("limit", "100");

      const firstPage = await getUsersListAPI(firstPageParams);
      const totalPages = firstPage.payload.metadata.totalPages;

      let allUsers = [...firstPage.payload.data];

      for (let page = 2; page <= totalPages; page++) {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", "100");
        const nextPage = await getUsersListAPI(params);
        allUsers = [...allUsers, ...nextPage.payload.data];
      }

      return allUsers;
    },
  });
}