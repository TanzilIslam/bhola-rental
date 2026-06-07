import Link from "next/link";
import { Plus } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b px-6 py-4 flex items-center justify-between">
      <span className="text-lg font-semibold">Bhola Rental</span>
      <Link
        href="/property-form"
        className="rounded-md p-1.5 hover:bg-accent transition-colors"
        aria-label="Add property"
      >
        <Plus className="h-5 w-5" />
      </Link>
    </header>
  );
}
