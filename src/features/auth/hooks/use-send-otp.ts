import { useMutation } from "@tanstack/react-query";
import {sendOtpApi } from "../apis/mutations/auth.api";

export function useSendOTP() {
return useMutation({
    mutationFn:sendOtpApi
})

}

