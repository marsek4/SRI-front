// src/store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type UserData } from "@/types/types";

type AuthState = {
  accessToken: string | null;
  expiresAt: string | null;
  user: UserData | null;
  setAuth: (data: {
    accessToken: string;
    expiresAt: string;
    user: UserData;
  }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      expiresAt: null,
      user: null,

      setAuth: ({ accessToken, expiresAt, user }) =>
        set({ accessToken, expiresAt, user }),

      logout: () => set({ accessToken: null, expiresAt: null, user: null }),
    }),
    {
      name: "auth", // ключ в localStorage
      // можно хранить только токен, а юзера подтягивать через /me
    },
  ),
);
