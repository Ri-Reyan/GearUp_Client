"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { MapPin, Package, DollarSign, ClipboardList } from "lucide-react";

type Order = {
  id: string;
  quantity: number;
  location: string;
  total_price: number;
  status: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axiosInstance.get("/api/admin/rentals", {
        withCredentials: true,
      });

      setOrders(res.data.data);
    };

    fetchOrders();
  }, []);

  const statusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "CONFIRMED":
        return "bg-green-100 text-green-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="mb-8 text-center text-4xl font-bold md:mx-60 md:whitespace-nowrap">
        All Rental Orders
      </h1>

      {orders.length === 0 ? (
        <div className="rounded-xl bg-white p-10 text-center shadow">
          No Orders Found
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl w-60 md:w-80 lg:w-full mx-20 md:mx-60"
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-lg font-bold">
                  <ClipboardList className="h-5 w-5 text-sky-600" />
                  Order
                </h2>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor(
                    order.status,
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-600">
                    <Package className="h-4 w-4" />
                    Quantity
                  </span>

                  <span className="font-semibold">{order.quantity}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    Location
                  </span>

                  <span className="text-right font-medium">
                    {order.location}
                  </span>
                </div>

                <hr />

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="h-4 w-4" />
                    Total Price
                  </span>

                  <span className="text-2xl font-bold text-sky-600">
                    ${order.total_price}
                  </span>
                </div>

                <div className="mt-4 rounded-lg bg-slate-100 p-3">
                  <p className="truncate text-xs text-gray-500">
                    Order ID: {order.id}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
