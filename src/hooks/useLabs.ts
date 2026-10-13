import { useQuery } from "@tanstack/react-query";
import { type Lab } from "../types/types";
import { useAuthStore } from "@/store/authStore";

export const useLabs = () => {
  const query = useQuery({
    queryKey: ["laboratories"],
    queryFn: async (): Promise<{ labs: Lab[] }> => {
      const token = useAuthStore.getState().accessToken;

      const res = await fetch("/api/v1/labs", {
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
    laboratories: query.data?.labs ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
