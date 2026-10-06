import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../apis/mutations/auth.api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useRegister() {
    const navigate = useNavigate();
return useMutation({
    mutationFn:registerApi,
    onSuccess:()=>{
      toast.success("Registration successful");
      navigate("/auth/login")
    }
})

}
