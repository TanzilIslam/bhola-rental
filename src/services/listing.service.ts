import { v4 as uuidv4 } from "uuid";
import { readListings, writeListings } from "../../db/listings";
import type { Property, PropertyFormData } from "@/types/property";

function toSlug(title: string, id: string): string {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
  return `${base}-${id.slice(0, 8)}`;
}

export function getAll(): Property[] {
  return readListings();
}

export function getById(id: string): Property | undefined {
  return readListings().find((p) => p.id === id);
}

export function getBySlug(slug: string): Property | undefined {
  return readListings().find((p) => p.slug === slug);
}

export function create(data: PropertyFormData): Property {
  const listings = readListings();
  const id = uuidv4();
  const listing: Property = {
    ...data,
    id,
    slug: toSlug(data.title, id),
    images: [],
    ownerId: "",
    createdAt: new Date().toISOString(),
  };
  listings.push(listing);
  writeListings(listings);
  return listing;
}

export function update(id: string, data: Partial<PropertyFormData>): Property {
  const listings = readListings();
  const index = listings.findIndex((p) => p.id === id);
  if (index === -1) throw new Error(`Listing ${id} not found`);
  listings[index] = { ...listings[index], ...data };
  writeListings(listings);
  return listings[index];
}

export function remove(id: string): boolean {
  const listings = readListings();
  const next = listings.filter((p) => p.id !== id);
  if (next.length === listings.length) return false;
  writeListings(next);
  return true;
}

export function search(query: string): Property[] {
  const q = query.toLowerCase();
  return readListings().filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.type.includes(q)
  );
}
