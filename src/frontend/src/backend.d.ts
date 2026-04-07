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
export type EnrollmentId = bigint;
export interface Enrollment {
    id: EnrollmentId;
    age: bigint;
    academyName: string;
    fullName: string;
    submittedAt: bigint;
    sport: string;
    address: string;
    phone: string;
}
export type PlaceId = bigint;
export interface UserProfile {
    name: string;
}
export interface Place {
    id: PlaceId;
    name: string;
    description: string;
    sport: string;
    location: GeoLocation;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllEnrollments(): Promise<Array<Enrollment>>;
    getAllPlaces(): Promise<Array<Place>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getEnrollmentsByAcademy(academyName: string): Promise<Array<Enrollment>>;
    getPlaceById(id: PlaceId): Promise<Place | null>;
    getPlacesBySport(sport: string): Promise<Array<Place>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    initializePlaces(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitEnrollment(academyName: string, sport: string, fullName: string, age: bigint, phone: string, address: string): Promise<EnrollmentId>;
}
