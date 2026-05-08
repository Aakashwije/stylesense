import { stylistsService } from "@/services/stylists";
import { useQuery } from "@tanstack/react-query";

const STYLISTS_KEY = "stylists";

export function useStylists(specialty?: string) {
  return useQuery({
    queryKey: [STYLISTS_KEY, specialty],
    queryFn: () => stylistsService.getStylists(specialty),
  });
}

export function useStylist(id: string) {
  return useQuery({
    queryKey: [STYLISTS_KEY, id],
    queryFn: () => stylistsService.getStylistById(id),
    enabled: !!id,
  });
}
