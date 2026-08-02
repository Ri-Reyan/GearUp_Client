"use client";

import { toast } from "sonner";
import axiosInstance from "@/lib/axios";
import axios from "axios";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const handleSignupSubmit = async (
  formData: FormData,
  router: AppRouterInstance,
) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role");

  try {
    const result = await axiosInstance.post(
      "/api/auth/register",
      {
        name,
        email,
        password,
        role,
      },
      {
        withCredentials: true,
      },
    );

    toast.success(result.data.message);
    if (result.data.data.role === "customer") {
      router.push("/");
    } else if (result.data.data.role === "provider") {
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

export default handleSignupSubmit;
