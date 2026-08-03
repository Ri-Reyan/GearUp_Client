"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users, Package, ShoppingCart, LogOut } from "lucide-react";
import { logout } from "@/services/logout.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AdminSidebar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await logout();

      toast.success(res.message);

      router.push("/auth/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error("Logout failed:", err);
    }
  };
  return (
    <aside className="fixed left-0 top-0 h-screen w-1/4 md:w-64 lg:w-64 border-r bg-white shadow-md">
      <div className="border-b p-2 md:p-6">
        <h1 className="text-2xl font-bold text-sky-600">Admin Panel</h1>
      </div>

      <nav className="flex flex-col gap-3 md:p-4">
        <Link href="/dashboard/admin/users">
          <Button variant="ghost" className="w-full justify-start">
            <Users className="mr-2 h-5 w-5" />
            Users
          </Button>
        </Link>

        <Link href="/dashboard/admin/gears">
          <Button variant="ghost" className="w-full justify-start">
            <Package className="mr-2 h-5 w-5" />
            Gears
          </Button>
        </Link>

        <Link href="/dashboard/admin/orders">
          <Button variant="ghost" className="w-full justify-start">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Orders
          </Button>
        </Link>

        <Link onClick={handleLogout} href="">
          <Button variant="ghost" className="w-full justify-start">
            <LogOut className="mr-2 h-5 w-5" />
            Log out
          </Button>
        </Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
