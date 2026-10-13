// hooks/useLabSchedule.ts
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { type LabSchedule } from "@/types/types";

export const useLabSchedule = (labId: string | undefined) => {
  const query = useQuery({
    queryKey: ["lab-schedule", labId],
    queryFn: async () => {
      const token = useAuthStore.getState().accessToken;

      const res = await fetch(`/api/v1/labs/${labId}/schedule`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const response: LabSchedule = await res.json();

      return response;
    },
    enabled: !!labId,
  });

  return {
    schedule: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
