import { axiosInstance } from "@/shared/lib/axios";
import type { ISuccessResponse } from "@/shared/types/api";
import type { INewEmail, IOTPResponse, ISendOtpResponse } from "../types/email";
import type {
  IChangePasswordResponse,
  IChangePasswordValues,
} from "../types/password";
import type { IResponseUser } from "../types/user";
import { USER_ENDPOINT } from "./user.endpoint";

export async function getUserProfileAPI() {
  const response = await axiosInstance.get<ISuccessResponse<IResponseUser>>(
    `${USER_ENDPOINT}/profile`,
  );
  //console.log(response.data);
  return response.data;
}

export async function sendNewOtpApi(newEmail: INewEmail) {
  const response = await axiosInstance.post<ISendOtpResponse>(
    `${USER_ENDPOINT}/email/request`,
    newEmail,
  );
  console.log(response.data);
  return response.data;
}

export async function verifyNewEmailApi({ code }: { code: string }) {
  const response = await axiosInstance.post<ISuccessResponse<IOTPResponse>>(
    `${USER_ENDPOINT}/email/confirm`,
    { code },
  );
  console.log(response.data);
  return response.data;
}

export async function changePasswordApi(data: IChangePasswordValues) {
  const response = await axiosInstance.post<IChangePasswordResponse>(
    `${USER_ENDPOINT}/change-password`,
    data,
  );
  console.log(response.data);
  return response.data;
}

export async function updateProfileAPI(payload: {
  firstName?: string;
  lastName?: string;
  phone?: string;
  profilePhoto?: string;
}) {
  const response = await axiosInstance.patch<IResponseUser>(
    `${USER_ENDPOINT}/profile`,
    payload,
  );
  console.log(response.data);
  return response.data;
}