import { useQuery } from "@tanstack/react-query";
import { experimentsApi } from "./api";

export const experimentsKeys = {
  all: ["experiments"] as const,
  list: () => [...experimentsKeys.all, "list"] as const,

  details: () => [...experimentsKeys.all, "detail"] as const,
  detail: (experimentId: string) =>
    [...experimentsKeys.details(), experimentId] as const,
};

export const useExperiments = () => {
  const query = useQuery({
    queryKey: experimentsKeys.list(),
    queryFn: experimentsApi.getExperiments,
  });

  return {
    experiments: query.data?.experiments ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};

export const useExperiment = (experimentId: string) => {
  const query = useQuery({
    queryKey: experimentsKeys.detail(experimentId),
    queryFn: () => experimentsApi.getExperiment(experimentId),
  });

  return {
    experiment: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
