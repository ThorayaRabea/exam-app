import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../apis/mutations/auth.api";

import useToken from "./use-token";

//Hooks
const { setToken } = useToken();
export function useLogin() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (response) => {
      console.log(response);
      setToken(response.payload.token);
      navigate("/user/diploma");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
      }
    },
  });


  
}
