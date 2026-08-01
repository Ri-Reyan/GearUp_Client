"use client";

import axiosInstance from "@/lib/axios";
import axios from "axios";
import { toast } from "sonner";

const handleLoginSubmit = async (formData: FormData) => {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message ?? "Registration failed.");
      return;
    }

    toast.error("Something went wrong.");
  }
};

export default handleLoginSubmit;
