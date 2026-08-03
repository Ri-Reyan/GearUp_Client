"use client";

import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function UpdateUserPage() {
  const { id } = useParams();

  const router = useRouter();

  const handleUpdate = async () => {
    try {
      const res = await axiosInstance.patch(
        `/api/admin/users/${id}`,
        {},
        {
          withCredentials: true,
        },
      );

      toast.success(res.data.message);

      router.push("/admin/users");
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <div className="mx-auto mt-20 max-w-lg rounded-lg border p-8">
      <h1 className="mb-8 text-3xl font-bold">Update User Status</h1>

      <Button onClick={handleUpdate} className="w-full">
        Toggle Status
      </Button>
    </div>
  );
}
