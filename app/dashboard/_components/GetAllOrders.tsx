"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axiosInstance from "@/lib/axios";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const GetAllOrders = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get("/api/rentals", {
          withCredentials: true,
        });

        setOrders(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-lg font-medium">
        Loading Orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold">No Orders Found</h2>
        <p className="mt-2 text-gray-500">
          You haven&apos;s rented any gear yet.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-6 py-10">
      <h1 className="mb-8 text-4xl font-bold text-center">My Orders</h1>

      {orders.map((order) => (
        <Card
          key={order.id}
          className="overflow-hidden transition-all duration-300 hover:shadow-xl"
        >
          <CardContent className="p-0">
            <div className="grid gap-6 md:grid-cols-4">
              <div className="md:col-span-1">
                <Image
                  src={order.gear.pictureLink}
                  alt={order.gear.name}
                  width={400}
                  height={300}
                  className="h-full w-full object-cover rounded-sm"
                />
              </div>

              <div className="space-y-3 p-6 md:col-span-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{order.gear.name}</h2>

                  <Badge
                    className={`${
                      order.status === "PLACED"
                        ? "bg-yellow-500"
                        : order.status === "CONFIRMED"
                          ? "bg-blue-500"
                          : order.status === "PAID"
                            ? "bg-purple-500"
                            : order.status === "PICKED_UP"
                              ? "bg-green-500"
                              : order.status === "RETURNED"
                                ? "bg-gray-500"
                                : order.status === "CANCELLED"
                                  ? "bg-red-500"
                                  : "bg-slate-500"
                    }`}
                  >
                    {order.status}
                  </Badge>
                </div>

                <p className="text-gray-600">{order.gear.description}</p>

                <div className="grid gap-4 pt-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-gray-500">Quantity</p>
                    <p className="font-semibold">{order.quantity}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold">{order.location}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Rental Date</p>
                    <p className="font-semibold">
                      {new Date(order.rentalDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Return Date</p>
                    <p className="font-semibold">
                      {new Date(order.returnDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Total Price</p>
                    <p className="text-xl font-bold text-sky-600">
                      ${order.total_price}
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  {order.status === "CONFIRMED" && (
                    <Link href={`/checkout/${order.id}`}>
                      <Button className="bg-blue-500 hover:bg-blue-600">
                        Pay Now
                      </Button>
                    </Link>
                  )}

                  {order.status === "RETURNED" && (
                    <Link href={`/dashboard/review/${order.gear.id}`}>
                      <Button className="bg-amber-500 hover:bg-amber-600">
                        Leave Review
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GetAllOrders;
