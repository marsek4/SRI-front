import { useMutation, useQueryClient } from "@tanstack/react-query";
import { remindersApi } from "./api";
import type { Reminder } from "./types";

export const useCreateReminder = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: Reminder) => remindersApi.setReminder(data),
    onSuccess: () => {
      //   console.log("qwezxc");
      qc.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
