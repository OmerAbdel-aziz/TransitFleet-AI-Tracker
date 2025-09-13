// Shared types for fleet-tracker
export type Id = string;

export type NormalizedBus = {
  id: string;          // vehicleId
  route: string;       // route number (e.g. "1")
  lat: number | null;  // latitude
  lng: number | null;  // longitude
  eta: Date | null;    // expected arrival (if available)
  delay: number;       // delay in minutes
  speed: number | null; // current speed in m/s
  status: string;      // e.g. "IN_TRANSIT_TO", "STOPPED_AT"
};
