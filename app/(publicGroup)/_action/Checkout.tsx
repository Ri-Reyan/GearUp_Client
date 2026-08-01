"use client";

import Image from "next/image";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "../_components/checkoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

type Order = {
  id: string;
  amount: number;
  transactionId: string;
  rentalOrder: {
    id: string;
    quantity: number;
    location: string;
    returnDate: string;
    gear: {
      name: string;
      description: string;
      pictureLink: string;
    };
  };
};

type Props = {
  order: Order;
  clientSecret: string;
};

const Checkout = ({ order, clientSecret }: Props) => {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-10 text-center text-4xl font-bold">Secure Checkout</h1>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Order Summary */}
        <div className="rounded-2xl border bg-white p-6 shadow-lg">
          <Image
            src={order.rentalOrder.gear.pictureLink}
            alt={order.rentalOrder.gear.name}
            width={700}
            height={500}
            className="h-80 w-full rounded-xl object-cover"
          />

          <h2 className="mt-6 text-3xl font-bold">
            {order.rentalOrder.gear.name}
          </h2>

          <p className="mt-3 text-gray-600">
            {order.rentalOrder.gear.description}
          </p>

          <div className="mt-8 space-y-4 rounded-xl bg-slate-100 p-5">
            <div className="flex justify-between">
              <span className="font-medium">Quantity</span>
              <span>{order.rentalOrder.quantity}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Return Date</span>
              <span>
                {new Date(order.rentalOrder.returnDate).toLocaleDateString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Location</span>
              <span>{order.rentalOrder.location}</span>
            </div>

            <hr />

            <div className="flex justify-between text-2xl font-bold text-sky-600">
              <span>Total</span>
              <span>${order.amount}</span>
            </div>
          </div>
        </div>

        {/* Stripe Checkout */}
        <div className="rounded-2xl border bg-white p-6 shadow-lg">
          <h2 className="mb-6 text-2xl font-bold">Payment Details</h2>

          {clientSecret ? (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: "stripe",
                },
              }}
            >
              <CheckoutForm orderId={order.rentalOrder.id} />
            </Elements>
          ) : (
            <div className="rounded-lg bg-red-50 p-4 text-center text-red-600">
              Unable to initialize Stripe payment.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
