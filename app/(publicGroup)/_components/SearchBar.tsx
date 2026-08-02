"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { Input } from "@/components/ui/input";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSearch: (data: any[]) => void;
};

const SearchBar = ({ onSearch }: Props) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        if (!search.trim()) {
          const res = await axiosInstance.get("/api/gear");
          onSearch(res.data.data);
          return;
        }

        const res = await axiosInstance.get(
          `/api/search?search=${encodeURIComponent(search)}`,
        );

        onSearch(res.data.data);
      } catch (error) {
        console.error(error);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, onSearch]);

  return (
    <div className="relative w-full max-w-lg">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        size={18}
      />

      <Input
        placeholder="Search by gear name, brand..."
        className="pl-10"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
