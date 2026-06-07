import Link from "next/link";
import { getAll } from "@/services/listing.service";

export default async function UserListingsPage() {
  const listings = await getAll();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">My Listings</h1>
      {listings.length === 0 ? (
        <p className="text-muted-foreground">No listings yet.</p>
      ) : (
        <ul className="space-y-2">
          {listings.map((l) => (
            <li key={l.id} className="border rounded-lg p-4">
              <Link href={`/properties/${l.slug}`} className="font-medium hover:underline">
                {l.title}
              </Link>
              <p className="text-sm text-muted-foreground">{l.status} · {l.price} BDT/mo</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
