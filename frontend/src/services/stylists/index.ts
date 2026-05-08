import { apiClient } from "@/services/api/client";

export interface Stylist {
  id: string;
  name: string;
  title: string;
  bio: string;
  location: string;
  rating: number;
  reviewCount: number;
  experience: number;
  specialties: string[];
  available: boolean;
  nextSlot?: string;
  priceFrom: number;
  avatarUrl?: string;
}

export const stylistsService = {
  getStylists: async (specialty?: string): Promise<Stylist[]> => {
    const res = await apiClient.get<Stylist[]>("/stylists", {
      params: specialty ? { specialty } : undefined,
    });
    return res.data;
  },

  getStylistById: async (id: string): Promise<Stylist> => {
    const res = await apiClient.get<Stylist>(`/stylists/${id}`);
    return res.data;
  },
};
