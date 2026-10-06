import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { createNewPasswordApi } from "../apis/mutations/auth.api";

export function useCreateNewPassword() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createNewPasswordApi,
    onSuccess: () => {
      toast.success("Password reset successfully. Please log in.", {
        duration: 4000, 
      });
      navigate("/auth/login");
    },
  });
}
