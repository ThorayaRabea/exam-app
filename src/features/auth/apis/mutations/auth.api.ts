import { axiosInstance } from "@/shared/lib/axios";
import type { ISuccessResponse } from "@/shared/types/api";
import type {
  IForgetPasswordResponse,
  IForgetPasswordValues,
  IResetPasswordValues,
} from "../../types/forget-password";
import type { IEmailResponse, IVerifyOtpResponse } from "../../types/register";
import type { ILoginFormValues, ILoginResponse } from "./../../types/login.d";
import type { IRegisterData } from "./../../types/register.d";
import { AUTH_ENDPOINT } from "./auth.endpoint";

export async function loginApi(values: ILoginFormValues) {
  console.log(values);
  console.log(`${AUTH_ENDPOINT}/login`);
  const response = await axiosInstance.post<ISuccessResponse<ILoginResponse>>(
    `${AUTH_ENDPOINT}/login`,
    values,
  );
  console.log(response.data);
  return response.data;
}

export async function registerApi(values: IRegisterData) {
  console.log(values);
  const response = await axiosInstance.post<ISuccessResponse<ILoginResponse>>(
    `${AUTH_ENDPOINT}/register`,
    values,
  );
  console.log(response.data);
  return response.data;
}

export async function sendOtpApi(email: Pick<IRegisterData, "email">) {
  const response = await axiosInstance.post<IEmailResponse>(
    `${AUTH_ENDPOINT}/send-email-verification`,
    email,
  );
  return response.data;
}

export async function verifyEmailApi({
  email,
  code,
}: {
  email: IRegisterData["email"];
  code: string;
}) {
  const response = await axiosInstance.post<IVerifyOtpResponse>(
    `${AUTH_ENDPOINT}/confirm-email-verification`,
    { email, code },
  );

  return response.data;
}

export async function forgetPasswordApi(values: IForgetPasswordValues) {
  const response = await axiosInstance.post<IForgetPasswordResponse>(
    `${AUTH_ENDPOINT}/forgot-password`,
    values,
  );

  return response.data;
}

export async function createNewPasswordApi(values: IResetPasswordValues) {
  const response = await axiosInstance.post<{ message: string }>(
    `${AUTH_ENDPOINT}/reset-password`,
    values,
  );

  return response.data;
}
