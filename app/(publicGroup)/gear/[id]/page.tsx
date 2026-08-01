import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axios";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const GearDetailsPage = async ({ params }: Props) => {
  const { id } = await params;

  const res = await axiosInstance.get(`/api/gear/${id}`);
  const gear = res.data.data;

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Image */}
        <div className="overflow-hidden rounded-2xl shadow-lg">
          <Image
            src={gear.pictureLink}
            alt={gear.name}
            width={700}
            height={600}
            className="h-125 w-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <span className="rounded-full bg-sky-100 px-4 py-1 text-sm font-medium text-sky-700">
              {gear.brand}
            </span>

            <h1 className="mt-4 text-4xl font-bold text-gray-900">
              {gear.name}
            </h1>

            <p className="mt-4 text-lg leading-8 text-gray-600">
              {gear.description}
            </p>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-gray-100 p-5">
            <div>
              <p className="text-sm text-gray-500">Rental Price</p>
              <h2 className="text-3xl font-bold text-sky-600">${gear.price}</h2>
            </div>

            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                gear.availability === "IN_STOCK"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {gear.availability === "IN_STOCK" ? "Available" : "Out of Stock"}
            </span>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-3 text-xl font-semibold">Categories</h3>

            <div className="flex flex-wrap gap-3">
              {gear.categories.map((item: any) => (
                <span
                  key={item.id}
                  className="rounded-full bg-slate-200 px-4 py-2 text-sm font-medium"
                >
                  {item.categories.tags}
                </span>
              ))}
            </div>
          </div>

          {/* Owner */}
          <div className="rounded-xl border p-5">
            <h3 className="mb-3 text-xl font-semibold">Owner</h3>

            <p>
              <span className="font-semibold">Name:</span> {gear.owner.name}
            </p>

            <p>
              <span className="font-semibold">Email:</span> {gear.owner.email}
            </p>
          </div>

          <Link href={`/rent/${gear.id}`}>
            <Button
              disabled={gear.availability !== "IN_STOCK"}
              className="w-full py-6 text-lg"
            >
              {gear.availability === "IN_STOCK" ? "Rent Now" : "Out of Stock"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GearDetailsPage;
