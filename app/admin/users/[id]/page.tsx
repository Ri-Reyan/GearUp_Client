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
    <div className="mx-32 md:mx-auto w-1/2 md:w-full mt-20 max-w-lg rounded-lg border p-6">
      <h1 className="mb-8 text-md md:text-3xl whitespace-nowrap text-center md:whitespace-normal font-bold">
        Update User Status
      </h1>

      <Button onClick={handleUpdate} className="w-full">
        Toggle Status
      </Button>
    </div>
  );
}
