import { request } from "@/api/client";
import type { Reminder, FullReminder } from "@/features/reminders/types";

export const remindersApi = {
  setReminder: (data: Reminder) =>
    request<FullReminder>("/api/v1/reminders", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
