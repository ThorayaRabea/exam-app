import { axiosInstance } from "@/shared/lib/axios";
import { ADMIN_ENDPOINT } from "./admin.endpoint";
import type {  IPaginatedApiResponse, ISuccessResponse } from "@/shared/types/api";
import type { IAuditLog } from "../types/audit.log";
import type { IUser } from "@/features/user/types/user";

export async function getAuditLogList(searchParams?:URLSearchParams){
    const response=await axiosInstance.get<ISuccessResponse<IPaginatedApiResponse<IAuditLog[]>>>(`${ADMIN_ENDPOINT}/audit-logs`,{params:searchParams});
    console.log(response.data);
    return response.data;
}
export async function deleteAuditLogByIdAPI(id:string){
    const response=await axiosInstance.delete<{message:string}>(`${ADMIN_ENDPOINT}/audit-logs/${id}`);
    console.log(response.data);
    return response.data;
}

export async function getUsersListAPI(searchParams?: URLSearchParams){
    const response=await axiosInstance.get<ISuccessResponse<IPaginatedApiResponse<IUser[]>>>(`${ADMIN_ENDPOINT}/users`,{params:searchParams});
   // console.log(response.data);
    return response.data;
}

export async function getAuditLogByIdAPI(id:string){
    const response=await axiosInstance.get<ISuccessResponse<{auditLog:IAuditLog}>>(`${ADMIN_ENDPOINT}/audit-logs/${id}`);
    console.log(response.data);
    return response.data;
}

export async function deleteAuditLogAPI(){
    const response=await axiosInstance.delete<ISuccessResponse<{deletedCount:number}>>(`${ADMIN_ENDPOINT}/audit-logs`);
    console.log(response.data);
    return response.data;
}
