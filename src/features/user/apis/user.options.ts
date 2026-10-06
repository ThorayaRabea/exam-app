import { getUserProfileAPI } from "./user.apis";
import { USER_KEYS } from "./user.keys";

export const userProfileQueryOptions = () => ({
  queryKey: USER_KEYS.profile(),
  queryFn: getUserProfileAPI,
});