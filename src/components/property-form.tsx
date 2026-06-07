"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect } from "@/components/ui/native-select";
import { Button } from "@/components/ui/button";

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  type: z.enum(["apartment", "house", "room", "office"], {
    message: "Please select a property type",
  }),
  status: z.enum(["available", "rented", "inactive"], {
    message: "Please select a status",
  }),
  price: z.number().min(1, "Price must be greater than 0"),
  bedrooms: z.number().min(0, "Cannot be negative"),
  bathrooms: z.number().min(0, "Cannot be negative"),
  area: z.number().min(1, "Area must be greater than 0"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type PropertyFormValues = z.infer<typeof schema>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-destructive mt-1">{message}</p>;
}

export default function PropertyForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PropertyFormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: PropertyFormValues) => {
    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const listing = await res.json();
      console.log("Listing created:", listing);
      toast.success("Property saved successfully!");
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Failed to save property.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
        </TabsList>

        {/* Tab 1 – Basic Info */}
        <TabsContent value="basic" className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="e.g. Spacious 2BHK Apartment"
                {...register("title")}
              />
              <FieldError message={errors.title?.message} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="type">Property Type</Label>
              <NativeSelect id="type" {...register("type")}>
                <option value="">Select type</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="room">Room</option>
                <option value="office">Office</option>
              </NativeSelect>
              <FieldError message={errors.type?.message} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="status">Status</Label>
              <NativeSelect id="status" {...register("status")}>
                <option value="">Select status</option>
                <option value="available">Available</option>
                <option value="rented">Rented</option>
                <option value="inactive">Inactive</option>
              </NativeSelect>
              <FieldError message={errors.status?.message} />
            </div>
          </div>
        </TabsContent>

        {/* Tab 2 – Details */}
        <TabsContent value="details" className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="price">Price (BDT / month)</Label>
              <Input
                id="price"
                type="number"
                min={0}
                placeholder="e.g. 15000"
                {...register("price", { valueAsNumber: true })}
              />
              <FieldError message={errors.price?.message} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="area">Area (sqft)</Label>
              <Input
                id="area"
                type="number"
                min={0}
                placeholder="e.g. 850"
                {...register("area", { valueAsNumber: true })}
              />
              <FieldError message={errors.area?.message} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input
                id="bedrooms"
                type="number"
                min={0}
                placeholder="e.g. 2"
                {...register("bedrooms", { valueAsNumber: true })}
              />
              <FieldError message={errors.bedrooms?.message} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Input
                id="bathrooms"
                type="number"
                min={0}
                placeholder="e.g. 1"
                {...register("bathrooms", { valueAsNumber: true })}
              />
              <FieldError message={errors.bathrooms?.message} />
            </div>
          </div>
        </TabsContent>

        {/* Tab 3 – Location */}
        <TabsContent value="location" className="pt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g. Mirpur, Dhaka"
                {...register("location")}
              />
              <FieldError message={errors.location?.message} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={5}
                placeholder="Describe the property..."
                {...register("description")}
              />
              <FieldError message={errors.description?.message} />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex gap-3 mt-6">
        <Button type="submit" disabled={isSubmitting}>
          Save Property
        </Button>
        <Button type="button" variant="outline" onClick={() => reset()}>
          Clear
        </Button>
      </div>
    </form>
  );
}
