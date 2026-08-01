"use client";

import { UserRound } from "lucide-react";
import { CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import getMe, { IGetMeType } from "./services/auth.service";
import Link from "next/link";
import GetMePage from "./getMePage";

const Navbar = () => {
  const [user, setUser] = useState<IGetMeType | null>(null);

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
  return (
    <>
      <div className="w-full mt-6 bg-[#3091AB] flex flex-row justify-between items-center px-4 py-2 rounded-md">
        <div>
          <CardTitle className="text-2xl text-white">GEARUP.</CardTitle>
        </div>
        <div>
          {user ? (
            <Button>
              <UserRound color="white" />
            </Button>
          ) : (
            <Link href={"/login"}>
              <Button className="text-2xl p-2">Login</Button>
            </Link>
          )}
        </div>
      </div>
      {user && <GetMePage user={user} />}
    </>
  );
};

export default Navbar;
