import type { IUser } from '@/features/user/types/user';
import { logInSchema } from './../schemas/login.shcema';
import type z from "zod";

export type ILoginFormValues = z.infer<typeof logInSchema>;
export interface ILoginResponse {
    user:IUser,
    token:string
}