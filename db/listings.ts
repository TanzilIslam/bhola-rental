import fs from "fs";
import path from "path";
import type { Property } from "../src/types/property";

const DB_PATH = path.join(process.cwd(), "db", "listings.json");

export function readListings(): Property[] {
  try {
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw) as Property[];
  } catch {
    return [];
  }
}

export function writeListings(listings: Property[]): void {
  fs.writeFileSync(DB_PATH, JSON.stringify(listings, null, 2), "utf-8");
}
