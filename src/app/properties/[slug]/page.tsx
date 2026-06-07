import { notFound } from "next/navigation";
import { getAll, getBySlug } from "@/services/listing.service";
import type { Metadata } from "next";

// New slugs not in the build are generated on first visit and then cached
export const dynamicParams = true;

export async function generateStaticParams() {
  return getAll().map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = getBySlug(slug);
  return { title: listing ? listing.title : "Property Not Found" };
}

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = getBySlug(slug);
  if (!listing) notFound();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-4">
      <h1 className="text-2xl font-semibold">{listing.title}</h1>
      <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
        <p>Type: {listing.type}</p>
        <p>Status: {listing.status}</p>
        <p>Price: {listing.price} BDT/mo</p>
        <p>Area: {listing.area} sqft</p>
        <p>Bedrooms: {listing.bedrooms}</p>
        <p>Bathrooms: {listing.bathrooms}</p>
        <p className="col-span-2">Location: {listing.location}</p>
      </div>
      <p className="text-sm">{listing.description}</p>
    </div>
  );
}
