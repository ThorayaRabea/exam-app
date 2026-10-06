import { useQuery } from "@tanstack/react-query";

import { userProfileQueryOptions } from "../user.options";

export default function useUserProfile() {
  return useQuery(userProfileQueryOptions());
}