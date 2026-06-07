import fs from "fs";
import path from "path";
import type { Property } from "../src/types/property";

const BLOB_KEY = "all";
const LOCAL_PATH = path.join(process.cwd(), "db", "listings.json");

async function blobStore() {
  const { getStore } = await import("@netlify/blobs");
  return getStore("listings");
}

export async function readListings(): Promise<Property[]> {
  try {
    const store = await blobStore();
    return (await store.get(BLOB_KEY, { type: "json" })) ?? [];
  } catch {
    // Blobs unavailable (build phase or local dev) — fall back to filesystem
    try {
      return JSON.parse(fs.readFileSync(LOCAL_PATH, "utf-8")) as Property[];
    } catch {
      return [];
    }
  }
}

export async function writeListings(listings: Property[]): Promise<void> {
  try {
    const store = await blobStore();
    await store.set(BLOB_KEY, JSON.stringify(listings));
  } catch {
    // Blobs unavailable — fall back to filesystem (local dev only)
    fs.writeFileSync(LOCAL_PATH, JSON.stringify(listings, null, 2), "utf-8");
  }
}
