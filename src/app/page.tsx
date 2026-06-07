import Link from "next/link";
import { getAll } from "@/services/listing.service";

export default function Home() {
  const listings = getAll();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Available Properties</h1>
      {listings.length === 0 ? (
        <p className="text-muted-foreground">No listings yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {listings.map((l) => (
            <Link
              key={l.id}
              href={`/properties/${l.slug}`}
              className="block border rounded-lg p-4 hover:bg-accent transition-colors"
            >
              <p className="font-medium">{l.title}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {l.location} · {l.type} · {l.price} BDT/mo
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
