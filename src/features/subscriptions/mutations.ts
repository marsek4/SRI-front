import { useMutation, useQueryClient } from "@tanstack/react-query";
import { subscriptionsApi } from "./api";
import { subscriptionsKeys } from "./queries";
import type { SubscriptionPayload } from "./types";

export const useSubscribe = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: SubscriptionPayload) =>
      subscriptionsApi.setSubscription(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: subscriptionsKeys.all });
    },
  });
};

export const useDeleteSubscription = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => subscriptionsApi.deleteSubscription(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: subscriptionsKeys.all });
    },
  });
};
