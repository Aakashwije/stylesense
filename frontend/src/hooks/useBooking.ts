import type { BookingInput } from "@/schemas";
import { bookingService } from "@/services/booking";
import { useBookingStore } from "@/store/bookingStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const BOOKING_KEY = "bookings";

export function useBookings() {
  return useQuery({
    queryKey: [BOOKING_KEY],
    queryFn: () => bookingService.getBookings(),
  });
}

export function useCreateBooking() {
  const qc = useQueryClient();
  const { resetDraft } = useBookingStore();

  return useMutation({
    mutationFn: (data: BookingInput) => bookingService.createBooking(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [BOOKING_KEY] });
      resetDraft();
    },
  });
}

export function useCancelBooking() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (bookingId: string) => bookingService.cancelBooking(bookingId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [BOOKING_KEY] });
    },
  });
}

export function useBookingDraft() {
  const {
    draft,
    resetDraft,
    setServiceIds,
    setStylistId,
    setDate,
    setTimeSlot,
    setNotes,
  } = useBookingStore();
  return {
    draft,
    resetDraft,
    setServiceIds,
    setStylistId,
    setDate,
    setTimeSlot,
    setNotes,
  };
}
