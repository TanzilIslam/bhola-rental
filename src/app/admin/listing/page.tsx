import Link from "next/link";
import { getAll } from "@/services/listing.service";
import {
  Table, TableHeader, TableBody,
  TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { PropertyStatus } from "@/types/property";

const statusVariant: Record<PropertyStatus, "success" | "warning" | "muted"> = {
  available: "success",
  rented:    "warning",
  inactive:  "muted",
};

export default async function AdminListingPage() {
  const listings = await getAll();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">All Listings</h1>
        <span className="text-sm text-muted-foreground">{listings.length} total</span>
      </div>

      {listings.length === 0 ? (
        <p className="text-muted-foreground">No listings yet.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8">#</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-center">Bed / Bath</TableHead>
              <TableHead className="text-right">Area</TableHead>
              <TableHead>Added</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listings.map((l, i) => (
              <TableRow key={l.id}>
                <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                <TableCell>
                  <Link href={`/properties/${l.slug}`} className="font-medium hover:underline">
                    {l.title}
                  </Link>
                </TableCell>
                <TableCell className="capitalize">{l.type}</TableCell>
                <TableCell>
                  <Badge label={l.status} variant={statusVariant[l.status]} />
                </TableCell>
                <TableCell>{l.location}</TableCell>
                <TableCell className="text-right">
                  {l.price.toLocaleString()} <span className="text-muted-foreground text-xs">BDT</span>
                </TableCell>
                <TableCell className="text-center">{l.bedrooms} / {l.bathrooms}</TableCell>
                <TableCell className="text-right">
                  {l.area} <span className="text-muted-foreground text-xs">sqft</span>
                </TableCell>
                <TableCell className="text-muted-foreground text-xs">
                  {new Date(l.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
