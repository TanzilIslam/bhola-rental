export type PropertyStatus = "available" | "rented" | "inactive";
export type PropertyType = "apartment" | "house" | "room" | "office";

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: PropertyType;
  status: PropertyStatus;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  ownerId: string;
  createdAt: string;
}

export interface PropertyFormData {
  title: string;
  description: string;
  type: PropertyType;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
}
