import { NextRequest, NextResponse } from "next/server";
import * as listingService from "@/services/listing.service";
import type { PropertyFormData } from "@/types/property";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q");
  const listings = query
    ? listingService.search(query)
    : listingService.getAll();
  return NextResponse.json(listings);
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as PropertyFormData;
  const listing = listingService.create(body);
  return NextResponse.json(listing, { status: 201 });
}
