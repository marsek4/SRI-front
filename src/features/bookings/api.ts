import { request } from "@/api/client";
import type { Booking, BookingData, Bookings } from "./types";

export const bookingsApi = {
  getBookings: () => request<Bookings>("/api/v1/bookings"),

  getBooking: (bookingId: string) =>
    request<Booking>(`/api/v1/bookings/${bookingId}`),

  createBooking: (data: BookingData) =>
    request<Booking>("/api/v1/bookings", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  cancelBooking: (bookingId: string) =>
    request<Booking>(`/api/v1/bookings/${bookingId}:cancel`, {
      method: "POST",
    }),
};
