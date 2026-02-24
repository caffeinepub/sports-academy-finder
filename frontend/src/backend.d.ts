import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface GeoLocation {
    lat: number;
    long: number;
}
export type PlaceId = bigint;
export interface Place {
    id: PlaceId;
    name: string;
    description: string;
    location: GeoLocation;
}
export interface backendInterface {
    getAllPlaces(): Promise<Array<Place>>;
    initializePlaces(): Promise<void>;
}
