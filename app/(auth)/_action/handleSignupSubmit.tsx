"use client";

import { toast } from "sonner";
import axiosInstance from "@/lib/axios";
import axios from "axios";

const handleSignupSubmit = async (formData: FormData) => {
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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message ?? "Registration failed.");
      return;
    }

    toast.error("Something went wrong.");
  }
};

export default handleSignupSubmit;
