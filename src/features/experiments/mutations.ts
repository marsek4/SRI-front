import { useMutation, useQueryClient } from "@tanstack/react-query";
import { experimentsApi } from "./api";
import { experimentsKeys } from "./queries";
import type { ExperimentPatch, NewExperiment } from "./types";

export const useNewExperiment = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (newExperiment: NewExperiment) =>
      experimentsApi.setExperiment(newExperiment),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: experimentsKeys.all });
    },
  });
};

export const useUpdateExperiment = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      experimentId: string;
      experimentData: ExperimentPatch;
    }) => experimentsApi.changeExperiment(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: experimentsKeys.all });
    },
  });
};
