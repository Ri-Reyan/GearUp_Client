import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import axios from "axios";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getApiBaseUrl } from "@/lib/axios";

type Props = {
  params: Promise<{
    paymentId: string;
  }>;
};

const PaymentSuccessPage = async ({ params }: Props) => {
  const { paymentId } = await params;

  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  let payment;

  try {
    const res = await axios.get(
      `${getApiBaseUrl()}/api/payments/success/${paymentId}`,
      {
        headers: {
          Cookie: cookieHeader,
        },
        withCredentials: true,
      },
    );

    payment = res.data.data;
  } catch {
    notFound();
  }

  return (
    <div className="container mx-auto flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-2xl rounded-2xl border bg-white p-10 shadow-xl">
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <span className="text-5xl text-green-600">✓</span>
          </div>
        </div>

        <h1 className="mt-6 text-center text-4xl font-bold text-green-600">
          Payment Successful
        </h1>

        <p className="mt-3 text-center text-gray-600">
          Thank you! Your rental order has been confirmed.
        </p>

        <div className="mt-10 space-y-4 rounded-xl bg-slate-100 p-6">
          <div className="flex justify-between">
            <span>Gear</span>
            <span>{payment.rentalOrder.gear.name}</span>
          </div>

          <div className="flex justify-between">
            <span>Transaction ID</span>
            <span className="text-sm">{payment.transactionId}</span>
          </div>

          <div className="flex justify-between">
            <span>Amount</span>
            <span>${payment.amount}</span>
          </div>

          <div className="flex justify-between">
            <span>Status</span>
            <span className="font-semibold text-green-600">
              {payment.status}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Paid At</span>
            <span>{new Date(payment.paidAt).toLocaleString()}</span>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <Link href="/">
            <Button variant="outline">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
