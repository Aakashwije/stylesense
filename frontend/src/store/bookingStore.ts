"use client";

import type { Booking } from "@/types";
import { create } from "zustand";

interface BookingDraft {
  serviceIds: string[];
  stylistId: string | null;
  date: string | null;
  timeSlot: string | null;
  notes: string;
  addOnIds: string[];
}

interface BookingStore {
  draft: BookingDraft;
  currentBooking: Booking | null;
  step: number;
  setServiceIds: (ids: string[]) => void;
  setStylistId: (id: string) => void;
  setDate: (date: string) => void;
  setTimeSlot: (slot: string) => void;
  setNotes: (notes: string) => void;
  toggleAddOn: (id: string) => void;
  setStep: (step: number) => void;
  resetDraft: () => void;
}

const initialDraft: BookingDraft = {
  serviceIds: [],
  stylistId: null,
  date: null,
  timeSlot: null,
  notes: "",
  addOnIds: [],
};

export const useBookingStore = create<BookingStore>((set) => ({
  draft: initialDraft,
  currentBooking: null,
  step: 1,
  setServiceIds: (ids) =>
    set((s) => ({ draft: { ...s.draft, serviceIds: ids } })),
  setStylistId: (id) => set((s) => ({ draft: { ...s.draft, stylistId: id } })),
  setDate: (date) => set((s) => ({ draft: { ...s.draft, date } })),
  setTimeSlot: (slot) =>
    set((s) => ({ draft: { ...s.draft, timeSlot: slot } })),
  setNotes: (notes) => set((s) => ({ draft: { ...s.draft, notes } })),
  toggleAddOn: (id) =>
    set((s) => ({
      draft: {
        ...s.draft,
        addOnIds: s.draft.addOnIds.includes(id)
          ? s.draft.addOnIds.filter((a) => a !== id)
          : [...s.draft.addOnIds, id],
      },
    })),
  setStep: (step) => set({ step }),
  resetDraft: () => set({ draft: initialDraft, step: 1 }),
}));
