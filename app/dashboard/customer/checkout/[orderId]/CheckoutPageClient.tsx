"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

import Checkout from "@/app/(publicGroup)/_action/Checkout";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axios";

type Props = {
  orderId: string;
};

type PaymentData = {
  rentalOrder: any;
  clientSecret: string;
  paymentRecord: {
    id: string;
  };
};

const CheckoutPageClient = ({ orderId }: Props) => {
  const router = useRouter();
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const createPayment = async () => {
      try {
        const res = await axiosInstance.post(
          "/api/payments/create",
          {
            rentalOrderId: orderId,
          },
          {
            withCredentials: true,
          },
        );

        if (!isCancelled) {
          setPaymentData(res.data.data);
        }
      } catch (error) {
        if (isCancelled) {
          return;
        }

        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          const message =
            error.response?.data?.message || "Unable to initialize checkout.";

          if (status === 401 || status === 403) {
            setErrorMessage(
              "Your session has expired. Please sign in again to continue.",
            );
            router.replace("/auth/login");
            return;
          }

          setErrorMessage(message);
        } else {
          setErrorMessage("Unable to initialize checkout right now.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    createPayment();

    return () => {
      isCancelled = true;
    };
  }, [orderId, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="rounded-2xl border bg-white px-8 py-10 text-center shadow-lg">
          <p className="text-lg font-semibold">Preparing your checkout…</p>
          <p className="mt-2 text-sm text-gray-600">
            This should only take a moment.
          </p>
        </div>
      </div>
    );
  }

  if (!paymentData || errorMessage) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="max-w-lg rounded-2xl border bg-white px-8 py-10 text-center shadow-lg">
          <h1 className="text-3xl font-bold text-slate-900">
            Checkout unavailable
          </h1>
          <p className="mt-4 text-gray-600">
            {errorMessage || "We could not load this checkout session."}
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button onClick={() => router.refresh()}>Try again</Button>
            <Link href="/dashboard/customer">
              <Button variant="outline">Go to dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Checkout
      order={paymentData.rentalOrder}
      clientSecret={paymentData.clientSecret}
      paymentId={paymentData.paymentRecord.id}
    />
  );
};

export default CheckoutPageClient;
