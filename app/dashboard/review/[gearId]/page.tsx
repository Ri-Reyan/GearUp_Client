"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

import axiosInstance from "@/lib/axios";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function ReviewPage() {
  const { gearId } = useParams();

  const router = useRouter();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) {
      toast.error("Comment is required.");
      return;
    }

    setLoading(true);

    try {
      const res = await axiosInstance.post(
        "/api/reviews",
        {
          gearId,
          rating,
          comment,
        },
        {
          withCredentials: true,
        },
      );

      toast.success(res.data.message);

      router.push("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex justify-center py-12 px-4">
      <div className="w-full max-w-2xl rounded-2xl border bg-white p-8 shadow-lg">
        <h1 className="mb-8 text-center text-4xl font-bold">Leave a Review</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label>Rating (1 - 5)</Label>

            <Input
              type="number"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            />
          </div>

          <div>
            <Label>Your Review</Label>

            <Textarea
              rows={6}
              placeholder="Share your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </div>
    </div>
  );
}
