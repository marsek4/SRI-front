import { request } from "@/api/client";
import { type LoginData, type RegisterData, type FullUserData } from "./types";

export const authApi = {
  login: (data: LoginData) =>
    request<FullUserData>("/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  register: (data: RegisterData) =>
    request<FullUserData>("api/v1/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
