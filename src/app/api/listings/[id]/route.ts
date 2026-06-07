import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import * as listingService from "@/services/listing.service";
import type { PropertyFormData } from "@/types/property";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const listing = await listingService.getById(id);
  if (!listing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(listing);
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = (await req.json()) as Partial<PropertyFormData>;
  try {
    const updated = await listingService.update(id, body);
    revalidatePath("/");
    revalidatePath(`/properties/${updated.slug}`);
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const listing = await listingService.getById(id);
  const deleted = await listingService.remove(id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  revalidatePath("/");
  if (listing) revalidatePath(`/properties/${listing.slug}`);
  return NextResponse.json({ success: true });
}
