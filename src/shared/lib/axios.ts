import axios, { AxiosError } from "axios";
import type { IErrorResponse } from "../types/api";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<IErrorResponse>) => {
    const message =
      error.response?.data?.errors?.[0]?.message ||
      error.response?.data?.message ||
      "Something went wrong";

    return Promise.reject(new Error(message));
  },
);
