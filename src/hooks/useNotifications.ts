// src/hooks/useSubscriptions.ts
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { type Notifications } from "@/types/types";

export const useNotifications = () => {
  const query = useQuery({
    queryKey: ["notifications"],
    queryFn: async (): Promise<Notifications> => {
      const token = useAuthStore.getState().accessToken;

      const res = await fetch("/api/v1/notifications", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      return res.json();
    },
  });

  return {
    notifications: query?.data?.notifications ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
