import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Enrollment, Place } from "../backend";
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

export function useSubmitEnrollment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      academyName: string;
      sport: string;
      fullName: string;
      age: string;
      phone: string;
      address: string;
    }) => {
      if (!actor) throw new Error("Actor not initialized");
      const ageBigInt = BigInt(Number.parseInt(params.age, 10));
      return actor.submitEnrollment(
        params.academyName,
        params.sport,
        params.fullName,
        ageBigInt,
        params.phone,
        params.address,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
    },
  });
}

export function useGetAllEnrollments() {
  const { actor, isFetching } = useActor();

  return useQuery<Enrollment[]>({
    queryKey: ["enrollments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllEnrollments();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetEnrollmentsByAcademy(academyName: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Enrollment[]>({
    queryKey: ["enrollments", "academy", academyName],
    queryFn: async () => {
      if (!actor || !academyName) return [];
      return actor.getEnrollmentsByAcademy(academyName);
    },
    enabled: !!actor && !isFetching && academyName.length > 0,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ["isCallerAdmin", actor ? "actor" : "no-actor"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}
