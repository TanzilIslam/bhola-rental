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

export async function getAll(): Promise<Property[]> {
  return readListings();
}

export async function getById(id: string): Promise<Property | undefined> {
  return (await readListings()).find((p) => p.id === id);
}

export async function getBySlug(slug: string): Promise<Property | undefined> {
  return (await readListings()).find((p) => p.slug === slug);
}

export async function create(data: PropertyFormData): Promise<Property> {
  const listings = await readListings();
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
  await writeListings(listings);
  return listing;
}

export async function update(id: string, data: Partial<PropertyFormData>): Promise<Property> {
  const listings = await readListings();
  const index = listings.findIndex((p) => p.id === id);
  if (index === -1) throw new Error(`Listing ${id} not found`);
  listings[index] = { ...listings[index], ...data };
  await writeListings(listings);
  return listings[index];
}

export async function remove(id: string): Promise<boolean> {
  const listings = await readListings();
  const next = listings.filter((p) => p.id !== id);
  if (next.length === listings.length) return false;
  await writeListings(next);
  return true;
}

export async function search(query: string): Promise<Property[]> {
  const q = query.toLowerCase();
  return (await readListings()).filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.type.includes(q)
  );
}
