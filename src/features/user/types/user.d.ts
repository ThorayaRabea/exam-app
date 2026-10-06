import type { ROLES } from "../constants/role-constant"

export type IRole=(typeof ROLES)[keyof typeof ROLES]

export interface IUser {
   id: string,
    username: string,
    email: string|null,
    phone: string|null|undifined,
    firstName: string,
    lastName: string,
    profilePhoto: string|null,
    emailVerified: boolean,
    phoneVerified: boolean,
    role: IRole,
    createdAt: string,
    updatedAt: string
}

export interface IResponseUser{
  user: IUser
}

