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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Link from "next/link";
import handleSignupSubmit from "../_action/handleSignupSubmit";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EyeClosed, EyeDashed } from "lucide-react";

const SignUpPage = () => {
  const router = useRouter();

  const [isShow, setIsShow] = useState<boolean>(false);
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-center">Create an account</CardTitle>
        <CardDescription className="text-center">
          Please provide us required info
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          action={(formData) => {
            handleSignupSubmit(formData, router);
          }}
        >
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                id="name"
                type="text"
                placeholder="Enter name here"
                required
              />
            </div>
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

            <div className="grid gap-2">
              <Label htmlFor="ROLE">Role</Label>
              <Select name="role">
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="provider">Provider</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Link href={"/login"}>
          <CardAction>
            <Button variant="link">Already have one? Login</Button>
          </CardAction>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SignUpPage;
