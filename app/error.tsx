"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="max-w-xl text-center">
        <h1 className="text-7xl font-extrabold text-red-500">Oops!</h1>

        <h2 className="mt-4 text-3xl font-bold">Something went wrong</h2>

        <p className="mt-4 text-gray-600">
          An unexpected error occurred. Please try again.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Button onClick={reset}>Try Again</Button>

          <Link href="/">
            <Button variant="outline">Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
