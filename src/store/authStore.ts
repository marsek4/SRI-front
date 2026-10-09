import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type UserData, type FullUserData } from "@/types/types";

type AuthState = {
  accessToken: string | null;
  expiresAt: string | null;
  user: UserData | null;
  isAuthenticated: () => boolean;
  setAuth: (data: FullUserData) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      expiresAt: null,
      user: null,

      isAuthenticated: () => {
        const { accessToken, expiresAt } = get();
        if (!accessToken || !expiresAt) return false;
        return new Date(expiresAt) > new Date();
      },

      setAuth: (data) => {
        set({
          accessToken: data.accessToken,
          expiresAt: data.expiresAt,
          user: data.user,
        });
      },

      logout: () => {
        set({ accessToken: null, expiresAt: null, user: null });
      },
    }),
    { name: "auth" },
  ),
);
