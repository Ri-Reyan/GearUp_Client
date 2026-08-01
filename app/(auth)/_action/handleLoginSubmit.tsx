"use client";

import axiosInstance from "@/lib/axios";
import axios from "axios";
import { toast } from "sonner";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const handleLoginSubmit = async (
  formData: FormData,
  router: AppRouterInstance,
) => {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await axiosInstance.post(
      "/api/auth/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );

    toast.success(res.data.message);
    if (res.data.data.role === "customer") {
      router.push("/");
    } else if (res.data.data.role === "provider") {
      router.push("/");
    } else {
      router.push("/");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message ?? "Registration failed.");
      return;
    }

    toast.error("Something went wrong.");
  }
};

export default handleLoginSubmit;
