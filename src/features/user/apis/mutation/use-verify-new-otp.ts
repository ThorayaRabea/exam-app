import { useMutation } from "@tanstack/react-query";
import { verifyNewEmailApi } from "../user.apis";

export function useVerfiyNewOTP() {
return useMutation({
    mutationFn:verifyNewEmailApi
})

}
