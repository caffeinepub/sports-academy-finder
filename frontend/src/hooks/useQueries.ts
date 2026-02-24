import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Place } from '../backend';

export function useGetAllPlaces() {
  const { actor, isFetching } = useActor();

  return useQuery<Place[]>({
    queryKey: ['places'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPlaces();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useInitializePlaces() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.initializePlaces();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['places'] });
    },
  });
}
