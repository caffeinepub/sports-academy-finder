import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Place } from "../backend";
import { useActor } from "./useActor";

export function useGetAllPlaces() {
  const { actor, isFetching } = useActor();

  return useQuery<Place[]>({
    queryKey: ["places"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPlaces();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPlacesBySport(sport: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Place[]>({
    queryKey: ["places", "sport", sport],
    queryFn: async () => {
      if (!actor || !sport) return [];
      return actor.getPlacesBySport(sport);
    },
    enabled: !!actor && !isFetching && sport.length > 0,
  });
}

export function useInitializePlaces() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.initializePlaces();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["places"] });
    },
  });
}
