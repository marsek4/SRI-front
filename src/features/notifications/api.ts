import { request } from "@/api/client";
import type {
  Notifications,
  Notification,
} from "@/features/notifications/types";

export const notificationsApi = {
  getNotifications: () => request<Notifications>("/api/v1/notifications"),

  setNotificationRead: (notificationId: string) =>
    request<Notification>(`/api/v1/notifications/${notificationId}:read`, {
      method: "POST",
    }),
};
