"use client";

import { UserRound } from "lucide-react";
import { CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import GetMePage from "./getMePage";
import getMe, { IGetMeType } from "@/services/auth.service";
import { logout } from "@/services/logout.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [user, setUser] = useState<IGetMeType | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await getMe();
        setUser(res);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await logout();

      toast.success(res.message);

      setUser(null);
      setIsOpen(false);

      router.push("/auth/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error("Logout failed:", err);
    }
  };

  return (
    <>
      <div className="w-full mt-6 bg-[#3091AB] flex flex-row justify-between items-center px-4 py-2 rounded-md">
        <div>
          <CardTitle
            onClick={() => {
              router.push("/");
            }}
            className="text-2xl text-white"
          >
            GEARUP.
          </CardTitle>
        </div>
        <div>
          {user ? (
            <Button
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
            >
              <UserRound color="white" />
            </Button>
          ) : (
            <Link href={"/auth/login"}>
              <Button className="text-2xl p-2">Login</Button>
            </Link>
          )}
        </div>
      </div>
      {user && (
        <GetMePage user={user} isOpen={isOpen} handleLogout={handleLogout} />
      )}
    </>
  );
};

export default Navbar;
