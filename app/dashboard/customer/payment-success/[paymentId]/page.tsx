import { notFound } from "next/navigation";
import axios from "axios";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axios";

type Props = {
  params: Promise<{
    paymentId: string;
  }>;
};

const PaymentSuccessPage = async ({ params }: Props) => {
  const { paymentId } = await params;

  let payment: {
    rentalOrder?: { gear?: { name?: string } };
    transactionId?: string;
    amount?: number | string;
    status?: string;
    paidAt?: string;
  } | null = null;
  let errorMessage = "";

  try {
    const res = await axiosInstance.get(`/api/payments/success/${paymentId}`, {
      withCredentials: true,
    });

    payment = res.data?.data ?? null;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      notFound();
    }

    console.error("Failed to load payment success page", error);
    errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "We could not load your payment confirmation. Please try again.";
  }

  if (!payment) {
    return (
      <div className="container mx-auto flex min-h-[80vh] items-center justify-center px-4">
        <div className="w-full max-w-2xl rounded-2xl border bg-white p-10 shadow-xl">
          <h1 className="text-center text-3xl font-bold text-slate-900">
            Payment confirmation unavailable
          </h1>
          <p className="mt-4 text-center text-gray-600">{errorMessage}</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/dashboard/customer">
              <Button variant="outline">Go to dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    );
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
            <span>{payment.rentalOrder?.gear?.name ?? "Unavailable"}</span>
          </div>

          <div className="flex justify-between">
            <span>Transaction ID</span>
            <span className="text-sm">
              {payment.transactionId ?? "Unavailable"}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Amount</span>
            <span>${payment.amount ?? "0"}</span>
          </div>

          <div className="flex justify-between">
            <span>Status</span>
            <span className="font-semibold text-green-600">
              {payment.status ?? "Pending"}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Paid At</span>
            <span>
              {payment.paidAt
                ? new Date(payment.paidAt).toLocaleString()
                : "Pending"}
            </span>
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
