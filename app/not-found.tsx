import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="max-w-xl text-center">
        <h1 className="text-8xl font-extrabold text-sky-600">404</h1>

        <h2 className="mt-4 text-4xl font-bold">Page Not Found</h2>

        <p className="mt-4 text-gray-600">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
