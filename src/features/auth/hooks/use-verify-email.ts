import { useMutation } from "@tanstack/react-query";
import { verifyEmailApi } from "../apis/mutations/auth.api";
import axios from "axios";

export default function useVerifyEmail() {
    return useMutation({
        mutationFn: verifyEmailApi,
         onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
      }
    },
    })
}