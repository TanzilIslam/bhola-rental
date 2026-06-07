import { notFound } from "next/navigation";
import { getAll, getBySlug } from "@/services/listing.service";
import { Badge } from "@/components/ui/badge";
import { MapPin, BedDouble, Bath, Maximize2, Tag, CalendarDays } from "lucide-react";
import type { Metadata } from "next";
import type { PropertyStatus } from "@/types/property";

export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getAll()).map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getBySlug(slug);
  return { title: listing ? `${listing.title} — Bhola Rental` : "Not Found" };
}

const statusVariant: Record<PropertyStatus, "success" | "warning" | "muted"> = {
  available: "success",
  rented:    "warning",
  inactive:  "muted",
};

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-lg border bg-muted/40 px-4 py-3 text-center">
      <span className="text-muted-foreground">{icon}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="font-semibold text-sm">{value}</span>
    </div>
  );
}

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = await getBySlug(slug);
  if (!listing) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="w-full h-64 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground text-sm">
        No images available
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold leading-tight">{listing.title}</h1>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            <span>{listing.location}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Badge label={listing.status} variant={statusVariant[listing.status]} />
          <span className="text-xs capitalize text-muted-foreground border rounded-full px-2.5 py-0.5">
            {listing.type}
          </span>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-4 flex items-center justify-between">
        <span className="text-muted-foreground text-sm">Monthly Rent</span>
        <span className="text-2xl font-bold">
          {listing.price.toLocaleString()}{" "}
          <span className="text-sm font-normal text-muted-foreground">BDT</span>
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Stat icon={<BedDouble className="h-5 w-5" />} label="Bedrooms"  value={String(listing.bedrooms)} />
        <Stat icon={<Bath className="h-5 w-5" />}      label="Bathrooms" value={String(listing.bathrooms)} />
        <Stat icon={<Maximize2 className="h-5 w-5" />} label="Area"      value={`${listing.area} sqft`} />
        <Stat icon={<Tag className="h-5 w-5" />}       label="Type"      value={listing.type} />
      </div>

      <div className="space-y-2">
        <h2 className="font-semibold">About this property</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{listing.description}</p>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-muted-foreground border-t pt-4">
        <CalendarDays className="h-3.5 w-3.5" />
        <span>Listed on {new Date(listing.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
      </div>
    </div>
  );
}
