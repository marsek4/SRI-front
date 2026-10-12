import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { type Subscription } from "@/types/types";

export const useSubscriptions = () => {
  const query = useQuery({
    queryKey: ["subscriptions"],
    queryFn: async (): Promise<Subscription[]> => {
      const token = useAuthStore.getState().accessToken;

      const res = await fetch("/api/v1/subscriptions", {
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
    subscriptions: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
