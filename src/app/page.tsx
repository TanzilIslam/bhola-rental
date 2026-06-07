import { getAll } from "@/services/listing.service";
import PropertyCard from "@/components/property-card";

export default function Home() {
  const listings = getAll();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Available Properties</h1>
        <span className="text-sm text-muted-foreground">{listings.length} listing{listings.length !== 1 ? "s" : ""}</span>
      </div>

      {listings.length === 0 ? (
        <p className="text-muted-foreground">No listings yet. Add one using the + button.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((l) => (
            <PropertyCard key={l.id} listing={l} />
          ))}
        </div>
      )}
    </div>
  );
}
