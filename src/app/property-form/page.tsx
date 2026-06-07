import PropertyForm from "@/components/property-form";

export default function PropertyFormPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Add Property</h1>
      <PropertyForm />
    </div>
  );
}
