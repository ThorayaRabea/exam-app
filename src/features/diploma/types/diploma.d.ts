import type { addDiplomaSchema } from "../schemas/add-diploma.schema";

export type IAddDiplomaValues = z.infer<typeof addDiplomaSchema>;

export interface IDiplomaItem {
  id: string;
  title: string;
  description: string|null;
  image: string|null;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IPaginatedDiplomaApiResponse<T> {
 payload: T;
 code: number;
 status: boolean;
}
export interface IOneDiplomaApiResponse {
diploma: {
  id: string,
    title: string,
    description: string,
    image: string,
    immutable: boolean,
    createdAt: string,
    updatedAt: string
}
}

export interface IAddNewDiplomaRequest{
  title: string,
  description:string,
  image: string
}