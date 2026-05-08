import { apiClient } from "@/services/api/client";
import type { Service } from "@/types";

interface ServiceListResponse {
  services: Service[];
  total: number;
}

export const servicesService = {
  getServices: async (category?: string): Promise<ServiceListResponse> => {
    const res = await apiClient.get<ServiceListResponse>("/services", {
      params: category ? { category } : undefined,
    });
    return res.data;
  },

  getServiceById: async (id: string): Promise<Service> => {
    const res = await apiClient.get<Service>(`/services/${id}`);
    return res.data;
  },
};
