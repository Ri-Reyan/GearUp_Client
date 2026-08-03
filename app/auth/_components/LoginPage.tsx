"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import handleLoginSubmit from "../_action/handleLoginSubmit";
import { useRouter } from "next/navigation";
import { EyeClosed, EyeDashed } from "lucide-react";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [isShow, setIsShow] = useState<boolean>(false);
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-center">Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={(formData) => handleLoginSubmit(formData, router)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                name="password"
                id="password"
                type={`${isShow ? "text" : "password"}`}
                required
              />
              <div
                className="relative bottom-9 left-64 lg:left-72 "
                onClick={() => {
                  setIsShow((prev) => !prev);
                }}
              >
                {isShow ? <EyeClosed /> : <EyeDashed />}
              </div>
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Link href={"/auth/signup"}>
          <CardAction>
            <Button className="text-center" variant="link">
              Don&apos;t have an account? {""} Sign Up
            </Button>
          </CardAction>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;
