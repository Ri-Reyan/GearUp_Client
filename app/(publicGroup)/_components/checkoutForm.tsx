"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "sonner";

import axiosInstance from "@/lib/axios";
import { Button } from "@/components/ui/button";

type Props = {
  orderId: string;
};

const CheckoutForm = ({ orderId }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    if (!stripe || !elements) {
      toast.error("Stripe is still loading.");
      return;
    }

    setLoading(true);

    try {
      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (error) {
        toast.error(error.message || "Payment failed.");
        return;
      }

      if (!paymentIntent) {
        toast.error("Payment could not be verified.");
        return;
      }

      if (paymentIntent.status !== "succeeded") {
        toast.error(`Payment status: ${paymentIntent.status}`);
        return;
      }

      // Update payment in backend
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

      router.replace(`/payment-success/${orderId}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to confirm payment.",
        );
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border bg-white p-6 shadow-lg space-y-6"
    >
      <PaymentElement />

      <Button
        type="submit"
        disabled={!stripe || !elements || loading}
        className="w-full"
      >
        {loading ? "Processing Payment..." : "Pay Securely"}
      </Button>
    </form>
  );
};

export default CheckoutForm;
