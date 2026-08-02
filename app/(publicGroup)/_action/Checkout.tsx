"use client";

import Image from "next/image";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "../_components/checkoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

type Props = {
  order: any;
  clientSecret: string;
  paymentId: string;
};

const Checkout = ({ order, clientSecret }: Props) => {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-10 text-center text-4xl font-bold">Secure Checkout</h1>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Order Summary */}
        <div className="rounded-2xl border bg-white p-6 shadow-lg">
          <Image
            src={order.gear.pictureLink}
            alt={order.gear.name}
            width={700}
            height={500}
            className="h-80 w-full rounded-xl object-cover"
          />

          <h2 className="mt-6 text-3xl font-bold">{order.gear.name}</h2>

          <p className="mt-3 text-gray-600">{order.gear.description}</p>

          <div className="mt-8 space-y-4 rounded-xl bg-slate-100 p-5">
            <div className="flex justify-between">
              <span className="font-medium">Quantity</span>
              <span>{order.quantity}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Return Date</span>
              <span>{new Date(order.returnDate).toLocaleDateString()}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Location</span>
              <span>{order.location}</span>
            </div>

            <hr />

            <div className="flex justify-between text-2xl font-bold text-sky-600">
              <span>Total</span>
              <span>${order.total_price}</span>
            </div>
          </div>
        </div>

        {/* Stripe Checkout */}
        <div className="rounded-2xl border bg-white p-6 shadow-lg">
          <h2 className="mb-6 text-2xl font-bold">Payment Details</h2>

          <div className="mt-6 rounded-lg border border-dashed bg-slate-50 p-4">
            <h3 className="mb-3 font-semibold">Stripe Test Card</h3>

            <div className="space-y-2 text-sm">
              <p>
                <span className="font-semibold">Card Number:</span>{" "}
                <code>4242 4242 4242 4242</code>
              </p>

              <p>
                <span className="font-semibold">Expiry:</span>{" "}
                <code>12/34</code>
              </p>

              <p>
                <span className="font-semibold">CVC:</span> <code>123</code>
              </p>

              <p>
                <span className="font-semibold">ZIP:</span> <code>12345</code>
              </p>
            </div>
          </div>

          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: "stripe",
              },
            }}
          >
            <CheckoutForm paymentId={order.id} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
