import axiosInstance from "@/lib/axios";
import Image from "next/image";
import RentForm from "../../_components/rentForm";

type Props = {
  params: Promise<{
    gearId: string;
  }>;
};

const RentPage = async ({ params }: Props) => {
  const { gearId } = await params;

  const res = await axiosInstance.get(`/api/gear/${gearId}`);
  const gear = res.data.data;

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white rounded-2xl shadow-lg overflow-hidden">
        <div>
          <Image
            src={gear.pictureLink}
            alt={gear.name}
            width={700}
            height={700}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        <div className="p-8 flex flex-col">
          <h1 className="text-4xl font-bold text-gray-900">{gear.name}</h1>

          <p className="mt-4 text-gray-600 leading-7">{gear.description}</p>

          <div className="mt-8 space-y-4">
            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold text-gray-500">Brand</span>
              <span>{gear.brand}</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold text-gray-500">Availability</span>

              <span
                className={`font-semibold ${
                  gear.availability === "IN_STOCK"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {gear.availability.replace("_", " ")}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-500">Price / Day</span>

              <span className="text-2xl font-bold text-sky-600">
                ${gear.price}
              </span>
            </div>
          </div>

          <div className="mt-8">
            <RentForm
              gear={{
                id: gear.id,
                name: gear.name,
                price: Number(gear.price),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentPage;
