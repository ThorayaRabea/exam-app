import { useMutation } from "@tanstack/react-query";
import { forgetPasswordApi } from "../apis/mutations/auth.api";

export function useForgetPassword() {
   
return useMutation({
    mutationFn:forgetPasswordApi,
   
})

}