import Link from "next/link";
import { IGetMeType } from "../services/auth.service";
import { Card } from "./ui/card";
import { LogOut } from "lucide-react";

type GetMePageProps = {
  user: IGetMeType;
  isOpen: boolean;
  handleLogout: () => Promise<void>;
};

const GetMePage = ({ user, isOpen, handleLogout }: GetMePageProps) => {
  return (
    <Card
      className={`absolute right-7 p-4 text-xl font-semibold text-gray-600 ${isOpen ? "block" : "hidden"}`}
    >
      <h1 className="hover:bg-gray-400 hover:text-white p-1 rounded-md">
        Name: {user.name}
      </h1>
      <h1 className="hover:bg-gray-400 hover:text-white p-1 rounded-md">
        Role: {user.role}
      </h1>
      <Link
        className="hover:bg-gray-400 hover:text-white p-1 rounded-md cursor-pointer"
        href={"/dashboard"}
      >
        Dashboard
      </Link>
      <div
        onClick={handleLogout}
        className="flex flex-row items-center gap-x-2.5 hover:bg-gray-400 hover:text-white p-1 rounded-md cursor-pointer"
      >
        <LogOut />
        <h1>Sign out</h1>
      </div>
    </Card>
  );
};

export default GetMePage;
