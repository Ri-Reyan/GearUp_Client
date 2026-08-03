"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axiosInstance from "@/lib/axios";

type Gear = {
  id: string;
  name: string;
  brand: string;
  price: number;
  pictureLink: string;
};

export default function GearPage() {
  const [gears, setGears] = useState<Gear[]>([]);

  useEffect(() => {
    const fetchGear = async () => {
      const res = await axiosInstance.get("/api/admin/gear", {
        withCredentials: true,
      });

      setGears(res.data.data);
    };

    fetchGear();
  }, []);

  return (
    <div className="grid gap-6 p-8 md:grid-cols-2 lg:grid-cols-3 pl-48 md:pl-72">
      {gears.map((gear) => (
        <div
          key={gear.id}
          className="rounded-xl border shadow md:w-1/2 lg:w-1/2"
        >
          <Image
            src={gear.pictureLink}
            alt={gear.name}
            width={400}
            height={250}
            className="w-full object-cover"
          />

          <div className="space-y-2 p-5">
            <h2 className="text-xl font-bold">{gear.name}</h2>

            <p>{gear.brand}</p>

            <p className="font-bold text-sky-600">${gear.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
