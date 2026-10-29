import { request } from "@/api/client";
import type {
  Experiments,
  Experiment,
  ExperimentPatch,
  NewExperiment,
} from "./types";

export const experimentsApi = {
  getExperiments: () => request<Experiments>("/api/v1/experiments"),

  setExperiment: (experiment: NewExperiment) =>
    request("/api/v1/experiments", {
      method: "POST",
      body: JSON.stringify(experiment),
    }),

  getExperiment: (experimentId: string) =>
    request<Experiment>(`/api/v1/experiments/${experimentId}`),

  changeExperiment: (data: {
    experimentId: string;
    experimentData: ExperimentPatch;
  }) =>
    request<Experiment>(`/api/v1/experiments/${data.experimentId}`, {
      method: "PATCH",
      body: JSON.stringify(data.experimentData),
    }),
};
