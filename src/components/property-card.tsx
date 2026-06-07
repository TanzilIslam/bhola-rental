import Link from "next/link";
import { MapPin, BedDouble, Bath, Maximize2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Property, PropertyStatus } from "@/types/property";

const statusVariant: Record<PropertyStatus, "success" | "warning" | "muted"> = {
  available: "success",
  rented:    "warning",
  inactive:  "muted",
};

export default function PropertyCard({ listing }: { listing: Property }) {
  return (
    <Link
      href={`/properties/${listing.slug}`}
      className="group flex flex-col border rounded-xl overflow-hidden hover:shadow-md transition-shadow bg-card"
    >
      {/* Placeholder image area */}
      <div className="h-44 bg-muted flex items-center justify-center text-muted-foreground text-sm">
        No image
      </div>

      <div className="flex flex-col gap-3 p-4">
        {/* Title + status */}
        <div className="flex items-start justify-between gap-2">
          <p className="font-semibold leading-snug group-hover:underline line-clamp-2">
            {listing.title}
          </p>
          <Badge label={listing.status} variant={statusVariant[listing.status]} />
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{listing.location}</span>
        </div>

        {/* Specs */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <BedDouble className="h-3.5 w-3.5" />
            {listing.bedrooms} bed
          </span>
          <span className="flex items-center gap-1">
            <Bath className="h-3.5 w-3.5" />
            {listing.bathrooms} bath
          </span>
          <span className="flex items-center gap-1">
            <Maximize2 className="h-3.5 w-3.5" />
            {listing.area} sqft
          </span>
        </div>

        {/* Price + type */}
        <div className="flex items-center justify-between pt-1 border-t">
          <span className="font-semibold">
            {listing.price.toLocaleString()}{" "}
            <span className="text-xs font-normal text-muted-foreground">BDT/mo</span>
          </span>
          <span className="text-xs capitalize text-muted-foreground">{listing.type}</span>
        </div>
      </div>
    </Link>
  );
}
