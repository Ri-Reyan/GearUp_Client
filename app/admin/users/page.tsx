"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axiosInstance from "@/lib/axios";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  accountStatus: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axiosInstance.get("/api/admin/users", {
        withCredentials: true,
      });

      setUsers(res.data.data);
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-10 text-center text-4xl font-bold">All Users</h1>

        <div className="grid gap-6 xl:grid-cols-3 pl-20">
          {users.map((user) => (
            <div
              key={user.id}
              className="rounded-2xl border bg-white md:w-72 lg:w-full p-6 shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:mx-50"
            >
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">{user.name}</h2>

                  <p className="text-sm text-gray-500 break-all">
                    {user.email}
                  </p>
                </div>

                <div
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    user.accountStatus === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {user.accountStatus}
                </div>
              </div>

              <div className="space-y-3 rounded-xl bg-slate-50 p-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Role</span>

                  <span className="font-semibold uppercase">{user.role}</span>
                </div>

                <div className="flex flex-col justify-between">
                  <span className="text-gray-500">User ID:</span>

                  <span className="max-w-45 truncate text-sm">{user.id}</span>
                </div>
              </div>

              <Link
                href={`/admin/users/${user.id}`}
                className="mt-6 block rounded-xl bg-sky-600 py-3 text-center font-semibold text-white transition hover:bg-sky-700"
              >
                Update status
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
