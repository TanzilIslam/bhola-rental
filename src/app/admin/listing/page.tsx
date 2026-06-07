import Link from "next/link";
import { getAll } from "@/services/listing.service";

export default function AdminListingPage() {
  const listings = getAll();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">All Listings</h1>
      {listings.length === 0 ? (
        <p className="text-muted-foreground">No listings yet.</p>
      ) : (
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b text-left text-muted-foreground">
              <th className="py-2 pr-4">Title</th>
              <th className="py-2 pr-4">Type</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((l) => (
              <tr key={l.id} className="border-b">
                <td className="py-2 pr-4">
                  <Link href={`/properties/${l.slug}`} className="hover:underline font-medium">
                    {l.title}
                  </Link>
                </td>
                <td className="py-2 pr-4">{l.type}</td>
                <td className="py-2 pr-4">{l.status}</td>
                <td className="py-2">{l.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
