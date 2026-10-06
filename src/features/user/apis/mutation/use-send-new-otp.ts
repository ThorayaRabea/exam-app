import { useMutation } from "@tanstack/react-query";
import { sendNewOtpApi } from "../user.apis";

export function useSendNewOTP() {
return useMutation({
    mutationFn:sendNewOtpApi
})

}
