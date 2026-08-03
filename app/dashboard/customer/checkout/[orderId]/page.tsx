import { cookies } from "next/headers";
import axios from "axios";
import { notFound } from "next/navigation";
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

  let paymentData = null;

  try {
    const res = await axios.post(
      "http://localhost:4000/api/payments/create",
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
