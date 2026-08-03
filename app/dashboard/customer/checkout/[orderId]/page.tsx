import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import axiosInstance from "@/lib/axios";
import Checkout from "@/app/(publicGroup)/_action/Checkout";

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let paymentData: any = null;

  try {
    const res = await axiosInstance.post(
      "/api/payments/create",
      {
        rentalOrderId: orderId,
      },
      {
        headers: {
          Cookie: cookieHeader,
        },
        withCredentials: true,
      },
    );

    paymentData = res.data.data;
  } catch (error) {
    console.error(error);
    notFound();
  }

  if (!paymentData) {
    notFound();
  }

  return (
    <Checkout
      order={paymentData.rentalOrder}
      clientSecret={paymentData.clientSecret}
      paymentId={paymentData.paymentRecord.id}
    />
  );
};

export default CheckoutPage;
