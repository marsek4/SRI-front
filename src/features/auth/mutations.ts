import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "./api";
import { type LoginData, type RegisterData } from "@/features/auth/types";

export const useLogin = () => {
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginData) => authApi.login(data),
    onSuccess: (data) => {
      setAuth({
        accessToken: data.accessToken,
        expiresAt: data.expiresAt,
        user: data.user,
      });
      navigate("/overview");
    },
  });
};

export const useRegister = () => {
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterData) => authApi.register(data),
    onSuccess: (data) => {
      setAuth({
        accessToken: data.accessToken,
        expiresAt: data.expiresAt,
        user: data.user,
      });
      navigate("/overview");
    },
  });
};
