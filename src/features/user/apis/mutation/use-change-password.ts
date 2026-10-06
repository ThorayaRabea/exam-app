import { useMutation } from "@tanstack/react-query";
import { changePasswordApi } from "../user.apis";

export function useChangePassword() {
return useMutation({
    mutationFn:changePasswordApi
})

}