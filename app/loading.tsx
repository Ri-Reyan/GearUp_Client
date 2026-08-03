import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-sky-600" />

        <h2 className="text-2xl font-semibold">Loading...</h2>

        <p className="text-gray-500">Please wait while we fetch the data.</p>
      </div>
    </div>
  );
}
