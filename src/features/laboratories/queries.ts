import { useQuery } from "@tanstack/react-query";
import { labApi } from "./api";

export const labKeys = {
  all: ["labs"] as const,

  getLabs: () => [...labKeys.all, "list"] as const,

  getLab: (labId: string) => [...labKeys.all, "detail", labId] as const,

  getLabSchedule: (labId: string) =>
    [...labKeys.all, "labSchedule", labId] as const,
};

export const useLabs = () => {
  const query = useQuery({
    queryKey: labKeys.getLabs(),
    queryFn: labApi.getLabs,
  });

  return {
    labs: query.data?.labs ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};

export const useLab = (labId: string | undefined) => {
  const query = useQuery({
    queryKey: labKeys.getLab(labId ?? ""),
    queryFn: () => labApi.getLab(labId!),
    enabled: !!labId,
  });

  return {
    lab: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};

export const useLabSchedule = (labId: string | undefined) => {
  const query = useQuery({
    queryKey: labKeys.getLabSchedule(labId ?? ""),
    queryFn: () => labApi.getLabSchedule(labId!),
    enabled: !!labId,
  });

  return {
    schedule: query.data,
    isError: query.isError,
    isLoading: query.isLoading,
    error: query.error,
  };
};
