import z from "zod";
import type { registerSchema } from "../schemas/rigester.schema";
import type { REGISTER_STEPS } from "../constants/form-constant";

export type IRegisterData = z.infer<typeof registerSchema>;

export type IRegisterSteps=typeof REGISTER_STEPS[keyof typeof REGISTER_STEPS]

export interface IEmailResponse {
  message: string;
  code: string;
}

export interface IVerifyOtpResponse {
  message: string;
 
}