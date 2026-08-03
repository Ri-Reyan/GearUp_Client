"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import axiosInstance from "@/lib/axios";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

type Order = {
  id: string;
  quantity: number;
  location: string;
  rentalDate: string;
  returnDate: string;
  total_price: number;
  status: string;
  gear: {
    name: string;
    pictureLink: string;
  };
  user: {
    name: string;
    email: string;
  };
};

export default function ProviderOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get("/api/provider/orders", {
        withCredentials: true,
      });

      setOrders(res.data.data);
    } catch {
      toast.error("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrders();
  }, []);

  const updateStatus = async (orderId: string, status: string) => {
    try {
      const res = await axiosInstance.patch(
        `/api/provider/orders/${orderId}`,
        { status },
        {
          withCredentials: true,
        },
      );

      toast.success(res.data.message);

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status } : order,
        ),
      );
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
      <div className="flex h-[70vh] items-center justify-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-8 text-4xl font-bold">Orders</h1>

      <div className="grid gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-2xl border bg-white p-6 shadow-md"
          >
            <div className="flex flex-col gap-6 md:flex-row">
              <Image
                src={order.gear.pictureLink}
                alt={order.gear.name}
                width={500}
                height={500}
                className="h-44 w-full rounded-xl object-cover md:w-72"
              />

              <div className="flex-1 space-y-3">
                <h2 className="text-2xl font-bold">{order.gear.name}</h2>

                <p>
                  <strong>Customer:</strong> {order.user.name}
                </p>

                <p>
                  <strong>Email:</strong> {order.user.email}
                </p>

                <p>
                  <strong>Quantity:</strong> {order.quantity}
                </p>

                <p>
                  <strong>Location:</strong> {order.location}
                </p>

                <p>
                  <strong>Rental Date:</strong>{" "}
                  {new Date(order.rentalDate).toLocaleDateString()}
                </p>

                <p>
                  <strong>Return Date:</strong>{" "}
                  {new Date(order.returnDate).toLocaleDateString()}
                </p>

                <p className="text-lg font-bold text-sky-600">
                  ${order.total_price}
                </p>
              </div>

              <div className="space-y-4 md:w-64">
                <p className="font-semibold">Current Status</p>

                <div className="rounded-lg bg-slate-100 p-3 text-center font-bold">
                  {order.status}
                </div>

                <Select
                  value={order.status}
                  onValueChange={(value) => updateStatus(order.id, value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>

                    <SelectItem value="CONFIRMED">Confirmed</SelectItem>

                    <SelectItem value="PICKED_UP">Picked Up</SelectItem>

                    <SelectItem value="RETURNED">Returned</SelectItem>

                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
