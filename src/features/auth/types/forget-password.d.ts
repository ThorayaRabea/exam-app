import type z from "zod";
import type { PASSWORD_STEPS } from "../constants/form-constant";
import type { forgetPasswordSchema, resetPasswordSchema } from "../schemas/forgetPassword.schema";

export type IForgetPasswordValues =z.infer<typeof forgetPasswordSchema>;
export type IFrogetPasswordSteps =
  (typeof PASSWORD_STEPS)[keyof typeof PASSWORD_STEPS];

export interface IForgetPasswordResponse {
  message: string;
  resetToken: string;
}
export type IResetPasswordValues = z.infer<typeof resetPasswordSchema>;

