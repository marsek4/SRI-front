import { useQuery } from "@tanstack/react-query";
import { notificationsApi } from "./api";

export const notificationsKeys = {
  all: ["notifications"] as const,
  getNotifications: () => [...notificationsKeys.all, "list"] as const,
};

export const useNotifications = () => {
  const query = useQuery({
    queryKey: notificationsKeys.getNotifications(),
    queryFn: notificationsApi.getNotifications,
  });

  return {
    notifications: query.data?.notifications ?? [],
    unreadCount: query.data?.unreadCount ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
