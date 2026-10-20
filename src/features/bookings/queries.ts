import { useQuery } from "@tanstack/react-query";
import { bookingsApi } from "./api";

export const bookingsKeys = {
  all: ["bookings"] as const,

  getBookings: () => [...bookingsKeys.all, "list"] as const,

  getBooking: (bookingId: string) =>
    [...bookingsKeys.all, "detail", bookingId] as const,
};

export const useBookings = () => {
  const query = useQuery({
    queryKey: bookingsKeys.getBookings(),
    queryFn: bookingsApi.getBookings,
  });

  return {
    bookings: query.data?.bookings ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};

export const useBooking = (bookingId: string | undefined) => {
  const query = useQuery({
    queryKey: bookingsKeys.getBooking(bookingId ?? ""),
    queryFn: () => bookingsApi.getBooking(bookingId!),
    enabled: !!bookingId,
  });

  return {
    booking: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
