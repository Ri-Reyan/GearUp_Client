import Link from "next/link";
import { IGetMeType } from "./services/auth.service";
import { Card } from "./ui/card";

const GetMePage = ({ user }: { user: IGetMeType }) => {
  return (
    <Card className="absolute right-7 p-4 text-xl font-semibold text-gray-600">
      <h1>Name: {user.name}</h1>
      <h1>Role: {user.role}</h1>
      <Link href={""}>Dashboard</Link>
    </Card>
  );
};

export default GetMePage;
