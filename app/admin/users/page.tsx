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
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold">All Users</h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3">Name</th>
            <th className="border p-3">Email</th>
            <th className="border p-3">Role</th>
            <th className="border p-3">Status</th>
            <th className="border p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border p-3">{user.name}</td>

              <td className="border p-3">{user.email}</td>

              <td className="border p-3">{user.role}</td>

              <td className="border p-3">{user.accountStatus}</td>

              <td className="border p-3">
                <Link
                  href={`/admin/users/${user.id}`}
                  className="rounded bg-sky-600 px-4 py-2 text-white"
                >
                  Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
