"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

import axiosInstance from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Gear = {
  id: string;
  name: string;
  price: number | string;
};

type Props = {
  gear: Gear;
};

const RentForm = ({ gear }: Props) => {
  const router = useRouter();

  const today = new Date().toISOString().split("T")[0];

  const [quantity, setQuantity] = useState(1);
  const [location, setLocation] = useState("");
  const [rentalDate, setRentalDate] = useState(today);
  const [returnDate, setReturnDate] = useState("");

  const rentalDays = useMemo(() => {
    if (!rentalDate || !returnDate) return 0;

    const start = new Date(rentalDate);
    const end = new Date(returnDate);

    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

    return diff > 0 ? Math.ceil(diff) : 0;
  }, [rentalDate, returnDate]);

  const totalPrice = useMemo(() => {
    return Number(gear.price) * quantity * rentalDays;
  }, [gear.price, quantity, rentalDays]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!location.trim()) {
      toast.error("Location is required.");
      return;
    }

    if (!rentalDate) {
      toast.error("Please select a rental date.");
      return;
    }

    if (!returnDate) {
      toast.error("Please select a return date.");
      return;
    }

    if (rentalDays <= 0) {
      toast.error("Return date must be after rental date.");
      return;
    }

    try {
      const res = await axiosInstance.post(
        "/api/rentals",
        {
          gearId: gear.id,
          quantity,
          location,
          rentalDate,
          returnDate,
        },
        {
          withCredentials: true,
        },
      );

      toast.success(res.data.message);

      router.push(`/checkout/${res.data.data.id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Failed to place rental order.",
        );
        return;
      }

      toast.error("Something went wrong.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 rounded-xl border bg-white p-6 shadow-md space-y-6"
    >
      <div>
        <Label>Quantity</Label>

        <div className="mt-2 flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
          >
            -
          </Button>

          <Input readOnly value={quantity} className="w-20 text-center" />

          <Button
            type="button"
            variant="outline"
            onClick={() => setQuantity((prev) => prev + 1)}
          >
            +
          </Button>
        </div>
      </div>

      <div>
        <Label>Rental Date</Label>

        <Input
          type="date"
          min={today}
          value={rentalDate}
          onChange={(e) => setRentalDate(e.target.value)}
        />
      </div>

      <div>
        <Label>Return Date</Label>

        <Input
          type="date"
          min={rentalDate}
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />
      </div>

      <div>
        <Label>Delivery Location</Label>

        <Input
          placeholder="Enter your delivery location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="rounded-lg bg-slate-100 p-5 space-y-3">
        <div className="flex justify-between">
          <span>Price / Day</span>
          <span>${gear.price}</span>
        </div>

        <div className="flex justify-between">
          <span>Rental Days</span>
          <span>{rentalDays}</span>
        </div>

        <div className="flex justify-between">
          <span>Quantity</span>
          <span>{quantity}</span>
        </div>

        <hr />

        <div className="flex justify-between text-2xl font-bold text-sky-600">
          <span>Total Price</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Continue to Payment
      </Button>
    </form>
  );
};

export default RentForm;
