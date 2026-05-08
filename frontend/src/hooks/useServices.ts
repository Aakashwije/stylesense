import { servicesService } from "@/services/services";
import { useQuery } from "@tanstack/react-query";

const SERVICES_KEY = "services";

export function useServices(category?: string) {
  return useQuery({
    queryKey: [SERVICES_KEY, category],
    queryFn: () => servicesService.getServices(category),
  });
}

export function useService(id: string) {
  return useQuery({
    queryKey: [SERVICES_KEY, id],
    queryFn: () => servicesService.getServiceById(id),
    enabled: !!id,
  });
}
