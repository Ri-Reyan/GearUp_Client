import axiosInstance from "@/lib/axios";

export type IGetMeType = {
  name: string | null;
  email: string | null;
  status: string | null;
  role: string | null;
  inventory: unknown | null;
  order: unknown | null;
  reviews: unknown | null;
};

const getMe = async () => {
  const result = await axiosInstance.get("/api/auth/me");

  const user: IGetMeType = {
    name: result.data.data.name,
    email: result.data.data.email,
    status: result.data.data.accountStatus,
    role: result.data.data.role,
    inventory: result.data.data.inventory,
    order: result.data.data.order,
    reviews: result.data.data.reviews,
  };

  return user;
};

export default getMe;
