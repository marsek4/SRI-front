import { useQuery } from "@tanstack/react-query";
import { subscriptionsApi } from "./api";

export const subscriptionsKeys = {
  all: ["subscriptions"] as const,
  getSubscriptions: () => [...subscriptionsKeys.all, "list"] as const,
};

export const useSubscriptions = () => {
  const query = useQuery({
    queryKey: subscriptionsKeys.getSubscriptions(),
    queryFn: subscriptionsApi.getSubscriptions,
  });

  return {
    subscriptions: query.data?.subscriptions ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
