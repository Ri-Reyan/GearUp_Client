"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

import axiosInstance from "@/lib/axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AddGearPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    pictureLink: "",
    brand: "",
    tag: "",
    price: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axiosInstance.post(
        "/api/provider/gear",
        {
          ...form,
          price: Number(form.price),
        },
        {
          withCredentials: true,
        },
      );

      toast.success(res.data.message);

      router.push("/dashboard/provider/gears");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to add gear.");
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-8 text-4xl font-bold">Add New Gear</h1>

        <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Gear Name</Label>

            <Input
              name="name"
              placeholder="Gear name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Brand</Label>

            <Input
              name="brand"
              placeholder="Gear brand"
              value={form.brand}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2 ">
            <Label>Category</Label>

            <Input
              name="tag"
              placeholder="Gear category"
              value={form.tag}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Price / Day ($)</Label>

            <Input
              type="number"
              name="price"
              placeholder="00"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Image URL</Label>

            <Input
              name="pictureLink"
              placeholder="https://..."
              value={form.pictureLink}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Description</Label>

            <Textarea
              rows={6}
              name="description"
              placeholder="Write gear description..."
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="md:col-span-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-6 text-lg"
            >
              {loading ? "Adding Gear..." : "Add Gear"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
