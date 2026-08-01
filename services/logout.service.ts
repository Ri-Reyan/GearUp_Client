import axiosInstance from "@/lib/axios";

export const logout = async () => {
  try {
    const res = await axiosInstance.post("/api/auth/logout");
    return res.data;
  } catch (error) {
    return error;
  }
};
