import { cookies } from "next/headers";
import axios from "axios";
import { notFound } from "next/navigation";

import Checkout from "../../_action/Checkout";

type Props = {
  params: Promise<{
    orderId: string;
  }>;
};

const CheckoutPage = async ({ params }: Props) => {
  const { orderId } = await params;

  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  let order;

  try {
    const res = await axios.get(
      `http://localhost:4000/api/payments/${orderId}`,
      {
        headers: {
          Cookie: cookieHeader,
        },
        withCredentials: true,
      },
    );

    order = res.data.data;
  } catch (error) {
    // console.error(error);
    notFound();
  }

  if (!order) {
    notFound();
  }

  return <Checkout order={order} clientSecret={order.clientSecret} />;
};

export default CheckoutPage;
