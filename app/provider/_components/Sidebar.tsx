"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, ShoppingBag, PlusCircle, LogOut } from "lucide-react";
import { logout } from "@/services/logout.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const links = [
  {
    href: "/provider/gears",
    label: "Gears",
    icon: Package,
  },
  {
    href: "/provider/orders",
    label: "Orders",
    icon: ShoppingBag,
  },
  {
    href: "/provider/add-gear",
    label: "Add Gear",
    icon: PlusCircle,
  },
  {
    label: "Log out",
    icon: LogOut,
  },
];

export default function ProviderSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await logout();

      toast.success(res.message);

      router.push("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error("Logout failed:", err);
    }
  };

  return (
    <aside className="w-72 bg-white border-r shadow-lg">
      <div className="p-8 border-b">
        <h1 className="text-3xl font-bold">Provider Panel</h1>
      </div>

      <div className="p-5 space-y-3">
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              onClick={!item.href ? handleLogout : undefined}
              key={item.href || item.label}
              href={item.href || ""}
              className={`flex items-center gap-4 rounded-xl px-5 py-4 transition

              ${
                pathname === item.href
                  ? "bg-sky-600 text-white"
                  : "hover:bg-slate-100"
              }`}
            >
              <Icon size={22} />

              {item.label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
