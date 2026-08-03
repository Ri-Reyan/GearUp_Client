"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { toast } from "sonner";
import axios from "axios";

import axiosInstance from "@/lib/axios";
import { Button } from "@/components/ui/button";

type Props = {
  paymentId: string;
};

const CheckoutForm = ({}: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe is loading...");
      return;
    }

    setLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (error) {
        toast.error(error.message || "Payment failed");
        return;
      }

      if (!paymentIntent) {
        toast.error("Payment not completed");
        return;
      }

      if (paymentIntent.status !== "succeeded") {
        toast.error(`Payment status: ${paymentIntent.status}`);
        return;
      }

      const res = await axiosInstance.post(
        "/api/payments/confirm",
        {
          transactionId: paymentIntent.id,
        },
        {
          withCredentials: true,
        },
      );

      toast.success(res.data.message);

      const confirmedPayment = res.data.data;

      router.replace(
        `/dashboard/customer/payment-success/${confirmedPayment.id}`,
      );
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data?.message || "Payment confirmation failed",
        );
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border bg-white p-6 shadow-lg"
    >
      <PaymentElement />

      <Button
        type="submit"
        disabled={!stripe || !elements || loading}
        className="w-full"
      >
        {loading ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  );
};

export default CheckoutForm;
