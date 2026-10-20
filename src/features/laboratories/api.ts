import { request } from "@/api/client";
import type { Labs, Lab, LabSchedule } from "./types";

export const labApi = {
  getLabs: () => request<Labs>("/api/v1/labs"),

  getLab: (labId: string) => request<Lab>(`/api/v1/labs/${labId}`),

  getLabSchedule: (labId: string) =>
    request<LabSchedule>(`/api/v1/labs/${labId}/schedule`),
};
