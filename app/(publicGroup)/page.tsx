import axiosInstance from "@/lib/axios";
import Image from "next/image";
import Link from "next/link";

type IGearType = {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  pictureLink: string;
  availability: string;
  categories: string;
  ownerId?: string;
  reviews?: string;
};

const page = async () => {
  const Gears = await axiosInstance.get("/api/gear");
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4">
        {Gears.data.data.map((gear: IGearType) => (
          <div
            key={gear.id}
            className="overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <Image
              src={gear.pictureLink}
              alt={gear.name}
              width={400}
              height={250}
              className="h-60 w-full object-cover"
            />

            <div className="space-y-3 p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">{gear.name}</h2>

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  {gear.availability}
                </span>
              </div>

              <p className="line-clamp-2 text-sm text-gray-600">
                {gear.description}
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Brand</p>
                  <p className="font-semibold">{gear.brand}</p>
                </div>

                <h3 className="text-2xl font-bold text-sky-600">
                  ${gear.price}
                </h3>
              </div>

              <Link href={`/gear/${gear.id}`}>
                <button className="w-full rounded-lg bg-sky-600 py-2 text-white">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
