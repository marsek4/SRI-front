import { request } from "@/api/client";
import type { Subscription, Subscriptions, SubscriptionPayload } from "./types";

export const subscriptionsApi = {
  getSubscriptions: () => request<Subscriptions>("api/v1/subscriptions"),

  setSubscription: (data: SubscriptionPayload) =>
    request<Subscription>("/api/v1/subscriptions", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  deleteSubscription: (id: string) =>
    request<string>(`/api/v1/subscriptions/${id}`, {
      method: "DELETE",
      // body: JSON.stringify(id),
    }),
};
