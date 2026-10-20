import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingsApi } from "./api";
import { bookingsKeys } from "./queries";
import type { BookingData } from "./types";

export const useCreateBooking = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: BookingData) => bookingsApi.createBooking(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: bookingsKeys.getBookings() });
    },
  });
};

export const useCancelBooking = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (bookingId: string) => bookingsApi.cancelBooking(bookingId),
    onSuccess: (_data, bookingId) => {
      qc.invalidateQueries({ queryKey: bookingsKeys.getBookings() });
      qc.invalidateQueries({ queryKey: bookingsKeys.getBooking(bookingId) });
    },
  });
};
