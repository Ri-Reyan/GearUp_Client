"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import axiosInstance from "@/lib/axios";
import SearchBar from "./SearchBar";

export type IGearType = {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  pictureLink: string;
  availability: string;
};

const GearList = () => {
  const [gears, setGears] = useState<IGearType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGear = async () => {
      const res = await axiosInstance.get("/api/gear");
      setGears(res.data.data);
      setLoading(false);
    };

    fetchGear();
  }, []);

  if (loading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <SearchBar onSearch={setGears} />

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {gears.map((gear) => (
          <div
            key={gear.id}
            className="overflow-hidden rounded-xl border bg-white shadow transition hover:-translate-y-1 hover:shadow-xl"
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

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                  {gear.availability}
                </span>
              </div>

              <p className="line-clamp-2 text-gray-600">{gear.description}</p>

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

export default GearList;
