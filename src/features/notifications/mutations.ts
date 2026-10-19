import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationsApi } from "./api";
import { notificationsKeys } from "./queries";

export const useNotificationRead = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) =>
      notificationsApi.setNotificationRead(notificationId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: notificationsKeys.all });
    },
  });
};
