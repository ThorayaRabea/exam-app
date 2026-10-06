import type z from "zod";
import type { ChangePasswordSchema } from "../schemas/change-password-schema";

export type IChangePasswordValues = z.infer<typeof ChangePasswordSchema>;
export interface IChangePasswordResponse{
    message:string
}