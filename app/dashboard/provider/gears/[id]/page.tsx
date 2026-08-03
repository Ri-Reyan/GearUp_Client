"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

import axiosInstance from "@/lib/axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UpdateGearPage() {
  const { id } = useParams();

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    description: "",
    pictureLink: "",
    brand: "",
    tag: "",
    availability: "IN_STOCK",
    price: "",
  });

  useEffect(() => {
    const loadGear = async () => {
      try {
        const res = await axiosInstance.get("/api/provider/gear", {
          withCredentials: true,
        });

        const gear = res.data.data.find((item: any) => item.id === id);

        if (!gear) {
          toast.error("Gear not found.");
          router.back();
          return;
        }

        setForm({
          name: gear.name,
          description: gear.description,
          pictureLink: gear.pictureLink,
          brand: gear.brand,
          price: String(gear.price),
          availability: gear.availability,
          tag: gear.categories?.[0]?.categories?.tags || "",
        });
      } catch {
        toast.error("Failed to load gear.");
      } finally {
        setLoading(false);
      }
    };

    loadGear();
  }, [id, router]);

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

    try {
      const res = await axiosInstance.put(
        `/api/provider/gear/${id}`,
        {
          ...form,
          price: Number(form.price),
        },
        {
          withCredentials: true,
        },
      );

      toast.success(res.data.message);

      router.push("dashboard/provider/gears");
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
    <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg">
      <h1 className="mb-8 text-4xl font-bold">Update Gear</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label>Name</Label>

          <Input name="name" value={form.name} onChange={handleChange} />
        </div>

        <div>
          <Label>Description</Label>

          <Textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Picture Link</Label>

          <Input
            name="pictureLink"
            value={form.pictureLink}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Brand</Label>

          <Input name="brand" value={form.brand} onChange={handleChange} />
        </div>

        <div>
          <Label>Category</Label>

          <Input name="tag" value={form.tag} onChange={handleChange} />
        </div>

        <div>
          <Label>Availability</Label>

          <Select
            value={form.availability}
            onValueChange={(value) =>
              setForm((prev) => ({
                ...prev,
                availability: value,
              }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Availability" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="IN_STOCK">IN STOCK</SelectItem>
              <SelectItem value="OUT_OF_STOCK">OUT OF STOCK</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Price</Label>

          <Input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" className="w-full">
          Save Changes
        </Button>
      </form>
    </div>
  );
}
