export interface IErrorResponse {
  code: number;
  message: string;
  status: false;
  errors: IError[];
}

export interface IError {
  path: string;
  message: string;
}

export interface ISuccessResponse<T> {
  status: true;
  code: number;
  payload: T;
}

export interface IPaginationMetaData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IPaginatedApiResponse<T> {
  data: T;
  metadata: IPaginationMetaData;
}

export type ApiResponse<T> = ISuccessResponse<T> | IErrorResponse;
