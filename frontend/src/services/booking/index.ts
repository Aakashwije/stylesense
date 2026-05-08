import type { BookingInput } from "@/schemas";
import { apiClient } from "@/services/api/client";
import type { Booking as Appointment } from "@/types";

interface BookingListResponse {
  appointments: Appointment[];
  total: number;
}

export const bookingService = {
  getBookings: async (): Promise<BookingListResponse> => {
    const res = await apiClient.get<BookingListResponse>("/bookings");
    return res.data;
  },

  getBookingById: async (id: string): Promise<Appointment> => {
    const res = await apiClient.get<Appointment>(`/bookings/${id}`);
    return res.data;
  },

  createBooking: async (data: BookingInput): Promise<Appointment> => {
    const res = await apiClient.post<Appointment>("/bookings", data);
    return res.data;
  },

  cancelBooking: async (id: string): Promise<{ message: string }> => {
    const res = await apiClient.patch<{ message: string }>(
      `/bookings/${id}/cancel`,
    );
    return res.data;
  },

  rescheduleBooking: async (
    id: string,
    data: { date: string; timeSlot: string },
  ): Promise<Appointment> => {
    const res = await apiClient.patch<Appointment>(
      `/bookings/${id}/reschedule`,
      data,
    );
    return res.data;
  },

  rateBooking: async (
    id: string,
    rating: number,
    review?: string,
  ): Promise<{ message: string }> => {
    const res = await apiClient.post<{ message: string }>(
      `/bookings/${id}/rate`,
      {
        rating,
        review,
      },
    );
    return res.data;
  },
};
