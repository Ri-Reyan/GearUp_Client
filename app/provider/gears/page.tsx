"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import axiosInstance from "@/lib/axios";
import { Button } from "@/components/ui/button";

type Gear = {
  id: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  pictureLink: string;
  availability: string;
};

export default function ProviderGearPage() {
  const [gears, setGears] = useState<Gear[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGears = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/api/provider/gear", {
        withCredentials: true,
      });

      setGears(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load gears.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchGears();
  }, [fetchGears]);

  const handleDelete = async (gearId: string) => {
    try {
      const res = await axiosInstance.delete(`/api/provider/gear/${gearId}`, {
        withCredentials: true,
      });

      toast.success(res.data.message);

      setGears((prev) => prev.filter((gear) => gear.id !== gearId));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold">My Gears</h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {gears.map((gear) => (
          <div
            key={gear.id}
            className="overflow-hidden rounded-2xl border bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
          >
            <Image
              src={gear.pictureLink}
              alt={gear.name}
              width={500}
              height={350}
              className="h-60 w-full object-cover"
            />

            <div className="space-y-4 p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{gear.name}</h2>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    gear.availability === "IN_STOCK"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {gear.availability.replace("_", " ")}
                </span>
              </div>

              <p className="line-clamp-2 text-gray-600">{gear.description}</p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Brand</p>

                  <h3 className="font-semibold">{gear.brand}</h3>
                </div>

                <h3 className="text-3xl font-bold text-sky-600">
                  ${gear.price}
                </h3>
              </div>

              <div className="flex gap-3 pt-2">
                <Link href={`/provider/gears/${gear.id}`} className="flex-1">
                  <Button className="w-full">Update</Button>
                </Link>

                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() => handleDelete(gear.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
