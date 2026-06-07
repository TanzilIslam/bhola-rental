export interface Amenity {
  id: string;
  label: string;
}

export interface Location {
  id: string;
  name: string;
  district: string;
}

export interface MasterData {
  amenities: Amenity[];
  locations: Location[];
}
