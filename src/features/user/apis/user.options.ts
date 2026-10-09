import type { ISuccessResponse } from "@/shared/types/api";
import type { IResponseUser, IUser } from "../types/user";
import { getUserProfileAPI } from "./user.apis";
import { USER_KEYS } from "./user.keys";

export const userProfileQueryOptions = () => ({
  queryKey: USER_KEYS.profile(),
  queryFn: getUserProfileAPI,
 select: (data: ISuccessResponse<IResponseUser>) => ({
  ...data,
  payload: {
    ...data.payload,
    user: { ...data.payload.user, role: "SUPER_ADMIN" },
  },
}),
});