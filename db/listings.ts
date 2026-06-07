import fs from "fs";
import path from "path";
import type { Property } from "../src/types/property";

const BLOB_KEY = "all";
const LOCAL_PATH = path.join(process.cwd(), "db", "listings.json");
const IS_NETLIFY = !!process.env.NETLIFY;

async function netlifyStore() {
  const { getStore } = await import("@netlify/blobs");
  return getStore("listings");
}

export async function readListings(): Promise<Property[]> {
  if (IS_NETLIFY) {
    try {
      const store = await netlifyStore();
      return (await store.get(BLOB_KEY, { type: "json" })) ?? [];
    } catch {
      // Blobs are unavailable during the build phase — return empty so
      // generateStaticParams produces no slugs (dynamicParams = true handles them at runtime)
      return [];
    }
  }
  try {
    return JSON.parse(fs.readFileSync(LOCAL_PATH, "utf-8")) as Property[];
  } catch {
    return [];
  }
}

export async function writeListings(listings: Property[]): Promise<void> {
  if (IS_NETLIFY) {
    try {
      const store = await netlifyStore();
      await store.set(BLOB_KEY, JSON.stringify(listings));
    } catch {
      // No-op if blobs are unavailable (e.g. build phase)
    }
    return;
  }
  fs.writeFileSync(LOCAL_PATH, JSON.stringify(listings, null, 2), "utf-8");
}
