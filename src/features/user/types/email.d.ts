import type z from "zod";
import type { newEmailSchema } from "../schemas/email-schema";
import type { IUser } from "./user";

export type INewEmail=z.infer<typeof newEmailSchema>
export interface IOTPResponse{
    message:string;
    user:IUser
}
export interface ISendOtpResponse {
  message: string;
  code: string;
}